import { describe, it, expect } from 'vitest';
import { contactSchema, consultationSchema } from './schemas';
import {
  leadToCrmBody,
  leadToGatewayAttribution,
  GATEWAY_ATTRIBUTION_KEYS,
  type GatewayAttributionSource,
} from './submit';
import { orderSchema } from '../order/schema';
import { orderToCrmAttribution } from '../order/submit';
import { buildGatewayPayload } from '../tracking/gateway-dispatch';

/**
 * A CSENDES KULCS-ELDOBÁS elleni védőháló.
 *
 * A Zod `z.object()` alapértelmezésben LEDOBJA az ismeretlen kulcsokat — nem
 * hibázik, nem figyelmeztet. Ugyanígy némán hagy ki egy mezőt a kézzel írt
 * `attribution` mapping is, ha valaki elfelejti felvenni. Mindkét hiba csak
 * hónapokkal később, egy üres CRM-oszlopon látszik.
 *
 * A skinlab útján HÁROM ilyen határ van sorban:
 *
 *   böngésző (rejtett mezők) → zod séma → `leadToCrmBody()` → CRM
 *                                       ↘ `leadToGatewayAttribution()` → gateway
 *
 * A harmadik határ a GATEWAY (szerver-láb): a zod után a lead a CRM MELLETT
 * a konverzió-gatewaynek is megy (offline Google Ads / Meta CAPI). Ott más a
 * kulcskészlet neve (`landing_page`, nem `landing_url`), és 2026-10-ig a
 * kézzel írt mapping csak öt kulcsot vitt a tizenkettőből.
 *
 * Ezért ez a fájl nem egy-egy mezőt ellenőriz, hanem a TELJES készlet
 * túlélését minden határon. Egy új attribúciós mező felvétele addig nem kész,
 * amíg ez a teszt zöld nem lesz — nem addig, amíg valaki észreveszi.
 *
 * A hibaüzenetek MEGNEVEZIK a kiesett mezőt: egy piros teszt, ami csak annyit
 * mond, hogy „nem egyenlő", ugyanolyan néma, mint maga a hiba.
 */

/** A kliens által küldött, teljes attribúciós készlet (form-mezőnevekkel). */
const CLIENT_ATTRIBUTION = {
  sourceUrl: 'https://skinlabhungary.hu/diodalezerek/',
  referrer: 'https://www.google.com/search',
  utmSource: 'google',
  utmMedium: 'cpc',
  utmCampaign: 'diodalezer-2026',
  utmTerm: 'diodalezer gep',
  utmContent: 'ad-variant-b',
  gclid: 'CJ_GCLID_1',
  fbclid: 'FB_1',
  gbraid: 'GB_1',
  wbraid: 'WB_1',
  msclkid: 'MS_1',
  fbc: 'fb.1.1700000000000.FB_1',
  fbp: 'fb.1.1700000000000.1234567890',
} as const;

/** Ugyanaz a készlet a CRM `attribution` blokkjának kulcsneveivel. */
const CRM_ATTRIBUTION_KEYS = [
  'landing_url',
  'referrer',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'gclid',
  'fbclid',
  'gbraid',
  'wbraid',
  'msclkid',
  'fbc',
  'fbp',
] as const;

/** A sémák közös, nem-attribúciós törzse. A `formStartTime` 3s-nél régebbi kell. */
const FORM_BASE = {
  gdprConsent: true as const,
  gdprTimestamp: new Date().toISOString(),
  honeypot: '',
  formStartTime: Date.now() - 10_000,
  'cf-turnstile-response': 'test-token',
};

const CONTACT_BASE = {
  ...FORM_BASE,
  name: 'Teszt Elek',
  email: 'teszt@example.com',
  phone: '+36301234567',
  message: 'Érdeklődnék a diódalézer iránt.',
  product: 'diodalezerek',
};

const CONSULTATION_BASE = {
  ...FORM_BASE,
  product: 'diodalezerek',
  timeline: 'asap' as const,
  businessType: 'running-salon' as const,
  experience: 'regular' as const,
  name: 'Teszt Elek',
  email: 'teszt@example.com',
  phone: '+36301234567',
};

/** Érvényes rendelés-törzs az `orderSchema`-hoz (attribúció nélkül). */
const ORDER_BASE = {
  firstName: 'Elek',
  lastName: 'Teszt',
  email: 'teszt@example.com',
  phone: '+36301234567',
  country: 'HU',
  postcode: '1011',
  city: 'Budapest',
  street: 'Fő utca 1.',
  gdpr: true,
  items: [{
    slug: 'dioda-lezer',
    sku: 'DL-1',
    categorySlug: 'diodalezerek',
    name: 'Dióda lézer',
    variantName: '',
    price: 1_000_000,
    qty: 1,
  }],
  subtotal: 1_000_000,
  hasPriceOnRequest: false,
  shippingMethod: 'personal_pickup',
  shippingFee: 0,
  paymentMethod: 'transfer',
  formStartTime: Date.now() - 10_000,
  website: '',
  turnstileToken: 'test-token',
};

/** A kulcsonkénti ellenőrzés, ami MEGNEVEZI a kiesett mezőket. */
function expectNoneDropped(
  parsed: Record<string, unknown>,
  expected: Record<string, unknown>,
  hint: string,
): void {
  const dropped = Object.keys(expected).filter(
    (k) => !(k in parsed) || parsed[k] === '' || parsed[k] === undefined,
  );
  expect(dropped, hint).toEqual([]);
}

describe('1. határ — a zod séma nem dobja el az attribúciós mezőket', () => {
  it.each([
    ['contactSchema', contactSchema, CONTACT_BASE],
    ['consultationSchema', consultationSchema, CONSULTATION_BASE],
  ])('%s', (name, schema, base) => {
    const result = schema.safeParse({ ...base, ...CLIENT_ATTRIBUTION });
    expect(result.success, `a ${name} elutasította az érvényes beküldést: `
      + JSON.stringify(result.success ? {} : result.error.issues)).toBe(true);

    expectNoneDropped(
      result.data as Record<string, unknown>,
      CLIENT_ATTRIBUTION,
      `a(z) ${name} csendben ledobta ezeket a mezőket — vedd fel őket a sémába, `
        + 'különben a böngésző hiába küldi, sosem érnek a szerverre',
    );
  });

  it('orderSchema', () => {
    const result = orderSchema.safeParse({ ...ORDER_BASE, ...CLIENT_ATTRIBUTION });
    expect(result.success, `az orderSchema elutasította az érvényes rendelést: `
      + JSON.stringify(result.success ? {} : result.error.issues)).toBe(true);

    expectNoneDropped(
      result.data as Record<string, unknown>,
      CLIENT_ATTRIBUTION,
      'az orderSchema csendben ledobta ezeket a mezőket — a webshop-rendelés a '
        + 'legmagasabb szándékú lead, pont ott nem szabad elveszni az attribúciónak',
    );
  });
});

describe('2. határ — a CRM-payload-építő minden mezőt átvisz', () => {
  it('leadToCrmBody', () => {
    const body = leadToCrmBody({
      leadId: 'lead-1',
      timestamp: new Date().toISOString(),
      name: 'Teszt Elek',
      email: 'teszt@example.com',
      phone: '+36301234567',
      product: 'diodalezerek',
      sourceUrl: CLIENT_ATTRIBUTION.sourceUrl,
      ipHash: 'hash',
      gdprConsent: true,
      gdprTimestamp: new Date().toISOString(),
      referrer: CLIENT_ATTRIBUTION.referrer,
      utmSource: CLIENT_ATTRIBUTION.utmSource,
      utmMedium: CLIENT_ATTRIBUTION.utmMedium,
      utmCampaign: CLIENT_ATTRIBUTION.utmCampaign,
      utmTerm: CLIENT_ATTRIBUTION.utmTerm,
      utmContent: CLIENT_ATTRIBUTION.utmContent,
      gclid: CLIENT_ATTRIBUTION.gclid,
      fbclid: CLIENT_ATTRIBUTION.fbclid,
      gbraid: CLIENT_ATTRIBUTION.gbraid,
      wbraid: CLIENT_ATTRIBUTION.wbraid,
      msclkid: CLIENT_ATTRIBUTION.msclkid,
      fbc: CLIENT_ATTRIBUTION.fbc,
      fbp: CLIENT_ATTRIBUTION.fbp,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    const attribution = (body as { attribution: Record<string, unknown> }).attribution;
    const missing = CRM_ATTRIBUTION_KEYS.filter((k) => !attribution[k]);
    expect(
      missing,
      'a `leadToCrmBody()` nem tette bele ezeket a mezőket a CRM `attribution` '
        + 'blokkjába — a séma elfogadta őket, a mapping mégis eldobta',
    ).toEqual([]);

    // A belépési oldal a `landing_url`-be megy, nem a `source_type`-ba.
    expect(attribution.landing_url).toBe(CLIENT_ATTRIBUTION.sourceUrl);
    expect(attribution.referrer).toBe(CLIENT_ATTRIBUTION.referrer);
  });

  it('orderToCrmAttribution', () => {
    const attribution = orderToCrmAttribution({
      sourceUrl: CLIENT_ATTRIBUTION.sourceUrl,
      referrer: CLIENT_ATTRIBUTION.referrer,
      utmSource: CLIENT_ATTRIBUTION.utmSource,
      utmMedium: CLIENT_ATTRIBUTION.utmMedium,
      utmCampaign: CLIENT_ATTRIBUTION.utmCampaign,
      utmTerm: CLIENT_ATTRIBUTION.utmTerm,
      utmContent: CLIENT_ATTRIBUTION.utmContent,
      gclid: CLIENT_ATTRIBUTION.gclid,
      fbclid: CLIENT_ATTRIBUTION.fbclid,
      gbraid: CLIENT_ATTRIBUTION.gbraid,
      wbraid: CLIENT_ATTRIBUTION.wbraid,
      msclkid: CLIENT_ATTRIBUTION.msclkid,
      fbc: CLIENT_ATTRIBUTION.fbc,
      fbp: CLIENT_ATTRIBUTION.fbp,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    const missing = CRM_ATTRIBUTION_KEYS.filter((k) => !attribution[k]);
    expect(
      missing,
      'az `orderToCrmAttribution()` nem tette bele ezeket a mezőket a CRM '
        + '`attribution` blokkjába',
    ).toEqual([]);
  });
});

describe('3. határ — a gateway (szerver-láb) attribúciós blokkja minden mezőt átvisz', () => {
  /**
   * A TELJES készlet a gateway kulcsneveivel. Ha egy kulcs innen hiányzik,
   * az a gateway felé NEM megy ki — a CRM-ben még látszódhat, az offline
   * Ads-/Meta-illesztésnél viszont már nem.
   */
  const EXPECTED_GATEWAY_ATTRIBUTION = {
    gclid: CLIENT_ATTRIBUTION.gclid,
    gbraid: CLIENT_ATTRIBUTION.gbraid,
    wbraid: CLIENT_ATTRIBUTION.wbraid,
    fbclid: CLIENT_ATTRIBUTION.fbclid,
    msclkid: CLIENT_ATTRIBUTION.msclkid,
    utm_source: CLIENT_ATTRIBUTION.utmSource,
    utm_medium: CLIENT_ATTRIBUTION.utmMedium,
    utm_campaign: CLIENT_ATTRIBUTION.utmCampaign,
    utm_term: CLIENT_ATTRIBUTION.utmTerm,
    utm_content: CLIENT_ATTRIBUTION.utmContent,
    landing_page: CLIENT_ATTRIBUTION.sourceUrl,
    referrer: CLIENT_ATTRIBUTION.referrer,
  };

  /** Minden forrásmező üres string — így jön a rejtett mező, ha nincs jel. */
  const ALL_EMPTY: Required<GatewayAttributionSource> = {
    sourceUrl: '',
    referrer: '',
    utmSource: '',
    utmMedium: '',
    utmCampaign: '',
    utmTerm: '',
    utmContent: '',
    gclid: '',
    fbclid: '',
    gbraid: '',
    wbraid: '',
    msclkid: '',
  };

  it('a kulcskészlet pontosan a 12 gateway-kulcs', () => {
    expect([...GATEWAY_ATTRIBUTION_KEYS].sort()).toEqual(
      Object.keys(EXPECTED_GATEWAY_ATTRIBUTION).sort(),
    );
  });

  it('leadToGatewayAttribution — lead-űrlap (LeadData-alakú forrás)', () => {
    const attribution = leadToGatewayAttribution({ ...CLIENT_ATTRIBUTION });

    const missing = GATEWAY_ATTRIBUTION_KEYS.filter((k) => !attribution[k]);
    expect(
      missing,
      'a `leadToGatewayAttribution()` nem tette bele ezeket a mezőket a gateway '
        + '`attribution` blokkjába — a CRM megkapja, az offline konverzió-illesztés nem',
    ).toEqual([]);
    expect(attribution).toEqual(EXPECTED_GATEWAY_ATTRIBUTION);
  });

  it('leadToGatewayAttribution — rendelés (az orderSchema valódi kimenete)', () => {
    const parsed = orderSchema.safeParse({ ...ORDER_BASE, ...CLIENT_ATTRIBUTION });
    expect(parsed.success, 'az orderSchema elutasította az érvényes rendelést').toBe(true);
    if (!parsed.success) return;

    // Ugyanaz az egy mapping eszi az OrderData-t is — a rendelés-ág nem
    // tarthat külön, rövidebb listát.
    expect(leadToGatewayAttribution(parsed.data)).toEqual(EXPECTED_GATEWAY_ATTRIBUTION);
  });

  it('a belépési oldal `landing_page` néven megy (gateway), nem `landing_url`-ként (CRM)', () => {
    const attribution = leadToGatewayAttribution({ sourceUrl: CLIENT_ATTRIBUTION.sourceUrl });
    expect(attribution.landing_page).toBe(CLIENT_ATTRIBUTION.sourceUrl);
    expect('landing_url' in attribution).toBe(false);
  });

  it('üres string → undefined, és a payload-építő az üres blokkot egészében kihagyja', () => {
    const empty = leadToGatewayAttribution(ALL_EMPTY);
    for (const key of GATEWAY_ATTRIBUTION_KEYS) {
      expect(empty[key], `üres \`${key}\` nem lehet üres string a drótra`).toBeUndefined();
    }

    const payload = buildGatewayPayload({
      eventName: 'contact_form_submitted',
      eventId: 'evt-empty',
      attribution: empty,
    });
    expect(payload.attribution, 'üres attribúció mellett nem mehet ki `attribution: {}`')
      .toBeUndefined();
  });

  it('a gateway payloadban a kitöltött kulcsok mind kimennek, csak az üresek maradnak ki', () => {
    // A `msclkid` a rejtett mezőben ma mindig üres (ismert korlát), az
    // `utmContent` pedig gyakran — ezek kiesnek, a többi 10 mind kimegy.
    const partial = leadToGatewayAttribution({ ...CLIENT_ATTRIBUTION, msclkid: '', utmContent: '' });
    const payload = buildGatewayPayload({
      eventName: 'order_request_submitted',
      eventId: 'evt-partial',
      attribution: partial,
    });
    const sent = payload.attribution as Record<string, unknown>;

    expect(Object.keys(sent).sort()).toEqual(
      GATEWAY_ATTRIBUTION_KEYS.filter((k) => k !== 'msclkid' && k !== 'utm_content').sort(),
    );
    expect(sent.gbraid).toBe(CLIENT_ATTRIBUTION.gbraid);
    expect(sent.wbraid).toBe(CLIENT_ATTRIBUTION.wbraid);
    expect(sent.utm_term).toBe(CLIENT_ATTRIBUTION.utmTerm);
    expect(sent.landing_page).toBe(CLIENT_ATTRIBUTION.sourceUrl);
    expect(sent.referrer).toBe(CLIENT_ATTRIBUTION.referrer);
  });
});

describe('a belépési oldal formátuma átmegy a séma URL-ellenőrzésén', () => {
  // A `sourceUrl: z.url()` ABSZOLÚT URL-t követel. Az `entry-attribution`
  // `getEntryLandingUrl()`-je ezért `origin + pathname`-et ad, nem puszta
  // útvonalat — egy path-only érték itt bukna, és a beküldés 400-at kapna.
  it.each([
    ['abszolút URL (amit a getEntryLandingUrl ad)', 'https://skinlabhungary.hu/diodalezerek/', true],
    ['puszta útvonal', '/diodalezerek/', false],
  ])('%s', (_label, value, shouldPass) => {
    const result = contactSchema.safeParse({
      ...CONTACT_BASE,
      ...CLIENT_ATTRIBUTION,
      sourceUrl: value,
    });
    expect(result.success).toBe(shouldPass);
  });
});
