/**
 * Partner (vevő) upsert Billingo-ban.
 *
 * Flow:
 *   1. Keresés email alapján: GET /partners?query=<email>
 *   2. Találat → meglévő partner ID-ja
 *   3. Nincs találat → POST /partners → új partner
 *
 * A 4xx-eket `BILLINGO-PARTNER-001` kódra cseréljük, hogy a hívó azonnal
 * lássa, melyik lépés bukott meg.
 */
import type {
  BillingoPartnerCreate,
  BillingoPartnerListResponse,
  BillingoPartnerResponse,
} from './types';
import { BillingoApiError, executeBillingoRequest, type BillingoConfig } from './client';
import type { OrderEmailInput } from '@/lib/order/email';

/**
 * A megrendelő adataiból összerakja a Billingo partner payload-ot.
 *
 * Magánszemélynél a `taxcode` kimarad (Billingo elfogadja); cégnél
 * (ha van `taxNumber` az orderben) felkerül.
 */
export function buildPartnerPayload(order: OrderEmailInput, fullDisplayName: string): BillingoPartnerCreate {
  const companyTrimmed = order.company.trim();
  const payload: BillingoPartnerCreate = {
    name: companyTrimmed !== '' ? companyTrimmed : fullDisplayName,
    emails: [order.email],
    address: {
      country_code: deriveCountryCode(order.country),
      post_code: order.postcode,
      city: order.city,
      address: order.street,
    },
  };
  if (order.phone) {
    payload.phone = order.phone;
  }
  if (order.taxNumber && order.taxNumber.trim() !== '') {
    payload.taxcode = order.taxNumber.trim();
  }
  return payload;
}

/** EU member states (ISO-3166-1 alpha-2). */
const EU_COUNTRIES = new Set<string>([
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR',
  'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL',
  'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
]);

/**
 * ISO-3166-1 alpha-2 kód az ország mezőből.
 *
 * A megrendelési form szabad szöveges országot fogad (pl. "Magyarország",
 * "Hungary", "HU"). A leggyakoribb európai elnevezéseket fedjük le. Ami nincs
 * benne, `null`-t adunk vissza - a hívó vagy default HU-t használ (Billingo
 * partner létrehozáshoz), vagy a VAT logika `UNKNOWN`-ként kezeli.
 */
export function deriveCountryCode(country: string): string {
  const looked = lookupCountryCode(country);
  // Billingo partner létrehozáshoz kötelező az országkód; HU az úzlet székhelye.
  return looked ?? 'HU';
}

/** Ugyanaz mint `deriveCountryCode`, de ismeretlennél `null`. VAT döntéshez. */
export function resolveCountryCode(country: string): string | null {
  return lookupCountryCode(country);
}

export function isEuCountry(countryCode: string | null | undefined): boolean {
  return !!countryCode && EU_COUNTRIES.has(countryCode.toUpperCase());
}

function lookupCountryCode(country: string): string | null {
  const trimmed = country.trim();
  if (trimmed.length === 2 && /^[A-Za-z]{2}$/.test(trimmed)) {
    return trimmed.toUpperCase();
  }
  const lower = trimmed.toLowerCase();
  const lookup: Record<string, string> = {
    // HU
    'magyarország': 'HU', magyar: 'HU', hungary: 'HU',
    // SK
    szlovákia: 'SK', slovakia: 'SK', 'slovenská republika': 'SK', slovensko: 'SK',
    // RO
    románia: 'RO', romania: 'RO', 'românia': 'RO',
    // DE
    németország: 'DE', germany: 'DE', deutschland: 'DE',
    // AT
    ausztria: 'AT', austria: 'AT', 'österreich': 'AT',
    // CZ
    csehország: 'CZ', czechia: 'CZ', 'česká republika': 'CZ', 'czech republic': 'CZ', cesko: 'CZ',
    // HR
    horvátország: 'HR', croatia: 'HR', hrvatska: 'HR',
    // RS (non-EU!)
    szerbia: 'RS', serbia: 'RS', srbija: 'RS',
    // SI
    szlovénia: 'SI', slovenia: 'SI', slovenija: 'SI',
    // PL
    lengyelország: 'PL', poland: 'PL', polska: 'PL',
    // NL
    hollandia: 'NL', netherlands: 'NL', nederland: 'NL', 'the netherlands': 'NL', holland: 'NL',
    // BE
    belgium: 'BE', belgique: 'BE', belgië: 'BE',
    // FR
    franciaország: 'FR', france: 'FR',
    // IT
    olaszország: 'IT', italy: 'IT', italia: 'IT',
    // ES
    spanyolország: 'ES', spain: 'ES', 'españa': 'ES', espana: 'ES',
    // PT
    portugália: 'PT', portugal: 'PT',
    // SE
    svédország: 'SE', sweden: 'SE', sverige: 'SE',
    // DK
    dánia: 'DK', denmark: 'DK', danmark: 'DK',
    // FI
    finnország: 'FI', finland: 'FI', suomi: 'FI',
    // IE
    írország: 'IE', ireland: 'IE', éire: 'IE', eire: 'IE',
    // BG
    bulgária: 'BG', bulgaria: 'BG',
    // GR
    görögország: 'GR', greece: 'GR', hellas: 'GR',
    // LT
    litvánia: 'LT', lithuania: 'LT', lietuva: 'LT',
    // LV
    lettország: 'LV', latvia: 'LV', latvija: 'LV',
    // EE
    észtország: 'EE', estonia: 'EE', eesti: 'EE',
    // LU
    luxemburg: 'LU', luxembourg: 'LU',
    // MT
    málta: 'MT', malta: 'MT',
    // CY
    ciprus: 'CY', cyprus: 'CY',
    // Non-EU near
    svájc: 'CH', switzerland: 'CH', schweiz: 'CH', suisse: 'CH',
    'egyesült királyság': 'GB', 'united kingdom': 'GB', 'great britain': 'GB', uk: 'GB',
    'norvégia': 'NO', norway: 'NO', norge: 'NO',
    ukrajna: 'UA', ukraine: 'UA',
  };
  return lookup[lower] ?? null;
}

/**
 * Email alapján keres partnert. Ha találat van, az első ID-t adja vissza,
 * különben `null`. Lista végpont 4xx-jét nem dobjuk fel - fallback az új
 * partner létrehozására.
 */
async function findPartnerByEmail(
  config: BillingoConfig,
  email: string,
): Promise<BillingoPartnerResponse | null> {
  try {
    const list = await executeBillingoRequest<BillingoPartnerListResponse>(config, {
      method: 'GET',
      path: '/partners',
      query: { query: email, per_page: 5 },
    });
    if (!list.data || list.data.length === 0) {
      return null;
    }
    const matched = list.data.find((p) =>
      Array.isArray(p.emails) && p.emails.some((e) => e.toLowerCase() === email.toLowerCase()),
    );
    return matched ?? list.data[0];
  } catch (caught) {
    if (caught instanceof BillingoApiError && caught.code === 'BILLINGO-AUTH-001') {
      throw caught;
    }
    // Search failure nem blokkolja a flow-t - új partnert hozunk létre.
    console.warn('[billingo] partner search failed, falling back to create:', caught);
    return null;
  }
}

/**
 * Partner upsert: keresés email alapján, ha nincs, létrehoz.
 *
 * Kifelé dob `BillingoApiError`-t - a generateProforma() fordítja le a
 * regisztrált error code-okra.
 */
export async function findOrCreatePartner(
  config: BillingoConfig,
  order: OrderEmailInput,
  fullDisplayName: string,
): Promise<BillingoPartnerResponse> {
  const existing = await findPartnerByEmail(config, order.email);
  if (existing) {
    return existing;
  }

  const payload = buildPartnerPayload(order, fullDisplayName);
  try {
    return await executeBillingoRequest<BillingoPartnerResponse>(config, {
      method: 'POST',
      path: '/partners',
      body: payload,
    });
  } catch (caught) {
    if (caught instanceof BillingoApiError && caught.statusCode !== null && caught.statusCode < 500 && caught.statusCode !== 429) {
      throw new BillingoApiError({
        code: 'BILLINGO-PARTNER-001',
        message: `Partner upsert ${caught.statusCode}`,
        statusCode: caught.statusCode,
        retryable: false,
        body: caught.body,
      });
    }
    throw caught;
  }
}
