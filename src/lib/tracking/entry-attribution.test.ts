// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

/**
 * BELÉPÉSI OLDAL ÉS HIVATKOZÓ — a lead honnan jött, nem az, hol nyomott submitot.
 *
 * ── A hiba, amit ez a fájl lezár ─────────────────────────────────────────────
 * A CRM `lead_attribution` 95 élő skinlab-sorából 94 a SUBMIT-oldalt jelentette
 * belépési oldalnak (`/kapcsolat/`, `/konzultacio/`, `/megrendeles/`), a
 * `referrer` oszlop pedig 89 kitöltött értékéből 86 BELSŐ volt és 0 külső. Két
 * független ok:
 *
 *   1. A `sourceUrl` rejtett mező szerveroldalon `Astro.url.href` — az az oldal,
 *      ahol az űrlap van, nem az, ahol a látogató belépett.
 *   2. A `referrer` mező nyers `document.referrer`-re esett vissza, ami a 2.
 *      oldaltól a saját előző oldalunk.
 *
 * ── Miért `vi.resetModules()` ────────────────────────────────────────────────
 * NEM kényelmi eszköz. Az `entry` puffer MODUL-SZINTŰ memória, tehát egy hard
 * page loadot csak modul-újratöltéssel lehet hűen reprodukálni. Egy azonos
 * modulpéldányon futó teszt pont azt a hibát nem látná meg, amiért ez a munka
 * elindult: hogy a jel az oldalváltásnál elvész.
 */

// A jsdom SAJÁT originje — nem a prod hostname. A „belső hivatkozó" ága azt
// nézi, hogy a `document.referrer` hostja megegyezik-e az OLDALÉVAL, tehát a
// tesztnek is ezt kell használnia, különben a saját oldalunk külsőnek látszik és
// pont a vizsgált szabály nem fut le.
const ORIGIN = window.location.origin;

type ConsentState = 'GRANTED' | 'DENIED' | 'UNKNOWN';

/**
 * A CookieYes JS API-ja, amit a `consent.ts` olvas. UNKNOWN = a CMP még nem
 * töltött be, tehát a globális egyáltalán nincs ott.
 */
function setConsent(state: ConsentState): void {
  const w = window as unknown as Record<string, unknown>;
  if (state === 'UNKNOWN') {
    delete w.getCkyConsent;
    return;
  }
  w.getCkyConsent = () => ({ categories: { advertisement: state === 'GRANTED' } });
}

function setReferrer(value: string): void {
  Object.defineProperty(document, 'referrer', { value, configurable: true });
}

/**
 * Egy teljes oldalbetöltés: friss modulpéldány (a memória-puffer meghal), új
 * URL, új `document.referrer` — majd a capture, amit az `initTracking()` minden
 * oldalon elsőként hív.
 */
async function pageLoad(url: string, referrer: string) {
  vi.resetModules();
  window.history.replaceState({}, '', url);
  setReferrer(referrer);
  const mod = await import('./entry-attribution');
  mod.captureEntrySignals();
  return mod;
}

/** Amit a kattintás-dekorátor csinál a cél-URL-lel. */
function carry(path: string, params: Record<string, string>): string {
  const url = new URL(path, ORIGIN);
  for (const [k, v] of Object.entries(params)) {
    if (!url.searchParams.has(k)) url.searchParams.set(k, v);
  }
  return url.pathname + url.search;
}

/**
 * Egy látogatás: belépés valahol, majd végigkattintás az útvonalon úgy, ahogy a
 * böngésző teszi — minden ugrás ÚJ oldalbetöltés, a hivatkozó az előző oldalunk,
 * és az űrlap-oldalra vezető kattintás viszi a belépési jeleket az URL-ben.
 *
 * A visszaadott érték az, amit a submit a CRM-nek küldene.
 */
async function journey(entryUrl: string, referrer: string, path: string[]) {
  let mod = await pageLoad(entryUrl, referrer);
  let previous = ORIGIN + new URL(entryUrl, ORIGIN).pathname;

  for (const next of path) {
    // A dekorátor CSAK az űrlap-oldalakra menő linkeket írja át — a
    // marketing-oldalak közti navigáció tiszta URL-lel megy, ahogy élesben is.
    const params = mod.entryParamsForNavigation();
    const carried = isFormPage(next) ? carry(next, params) : next;
    mod = await pageLoad(carried, previous);
    previous = ORIGIN + next;
  }

  return {
    landing_url: mod.getEntryLandingUrl(),
    referrer: mod.getEntryReferrer(),
  };
}

function isFormPage(path: string): boolean {
  return ['kapcsolat', 'konzultacio', 'megrendeles', 'kosar', 'kepzesek'].some((s) =>
    path.split('/').filter(Boolean).includes(s),
  );
}

beforeEach(() => {
  localStorage.clear();
  setConsent('UNKNOWN');
  setReferrer('');
  // A `consent.ts` CMP hiányában dev módban GRANTED-et ad (fejlesztői kényelem).
  // A tesztek az ÉLES viselkedést mérik, ahol a hiányzó CMP „még nem döntött".
  vi.stubEnv('DEV', false);
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('a belépési oldal túléli az űrlap-oldalra kattintást', () => {
  // A hirdetés termékoldalra visz, a látogató onnan kattint a kapcsolat-oldalra.
  // EZ a valós fizetett út — a `/kapcsolat/` URL-je "tiszta".
  const LANDING = '/diodalezerek/';
  const PAID = `${LANDING}?gclid=CJ_TEST_123&utm_source=google&utm_medium=cpc`;

  it.each([
    ['döntés nélkül (UNKNOWN)', 'UNKNOWN' as const],
    ['megadott hozzájárulással (GRANTED)', 'GRANTED' as const],
    ['visszavont hozzájárulással (DENIED)', 'DENIED' as const],
  ])('fizetett kattintás %s → a belépési oldal a termékoldal', async (_label, state) => {
    setConsent(state);

    const out = await journey(PAID, 'https://www.google.com/search?q=diodalezer', [
      '/kapcsolat/',
    ]);

    expect(
      out.landing_url,
      'a submit-oldal került a belépési oldal helyére — pont ez adta a 94/95 hibás sort',
    ).toBe(`${ORIGIN}${LANDING}`);
    expect(out.landing_url).not.toBe(`${ORIGIN}/kapcsolat/`);
  });

  it('a konzultációs és a pénztár-oldalra is átér', async () => {
    const konzultacio = await journey('/mezoterapia/', '', ['/konzultacio/']);
    expect(konzultacio.landing_url).toBe(`${ORIGIN}/mezoterapia/`);

    const megrendeles = await journey('/hydrafacial/', '', ['/kosar/', '/megrendeles/']);
    expect(megrendeles.landing_url).toBe(`${ORIGIN}/hydrafacial/`);
  });

  it('nyelvi prefix mögötti űrlap-oldalra is (a [locale] route-ok ugyanezek a slugok)', async () => {
    const out = await journey('/en/diodalezerek/', '', ['/en/kapcsolat/']);

    expect(out.landing_url).toBe(`${ORIGIN}/en/diodalezerek/`);
  });

  it('közvetlenül az űrlap-oldalra érkezve a belépési oldal AZ az oldal', async () => {
    const out = await journey('/kapcsolat/', 'https://www.bing.com/search', []);

    expect(out.landing_url).toBe(`${ORIGIN}/kapcsolat/`);
  });
});

describe('hivatkozó (referrer)', () => {
  it('organikus látogatás döntés nélkül: valódi belépési oldal ÉS külső hivatkozó', async () => {
    const out = await journey('/rolunk/', 'https://www.google.com/search?q=skinlab', [
      '/kapcsolat/',
    ]);

    expect(out.landing_url).toBe(`${ORIGIN}/rolunk/`);
    // Query-string nélkül: a hivatkozó paraméterei az Ő dolga.
    expect(out.referrer).toBe('https://www.google.com/search');
  });

  it('a BELSŐ hivatkozó nem írja felül a külsőt', async () => {
    // Az űrlap-oldalon a `document.referrer` a saját előző oldalunk. Ha ezt
    // beengednénk, minden lead hivatkozója `skinlab.hu` lenne — élesben
    // 89 kitöltött értékből 86 pontosan ez volt.
    const out = await journey('/kepzesek/', 'https://chatgpt.com/', ['/kapcsolat/']);

    expect(out.referrer).toBe('https://chatgpt.com/');
  });

  it('csak belső hivatkozó → egyáltalán nincs hivatkozó, nem üres string', async () => {
    const out = await journey('/', `${ORIGIN}/valami-mas/`, ['/kapcsolat/']);

    // A `''` HIÁNYZÓ értéket jelentene a CRM írási határán; a mező maradjon el.
    expect(out.referrer).toBeUndefined();
  });

  it('közvetlen látogatásnál nincs hivatkozó', async () => {
    const out = await journey('/', '', ['/kapcsolat/']);

    expect(out.landing_url).toBe(`${ORIGIN}/`);
    expect(out.referrer).toBeUndefined();
  });

  it('idegen originra mutató `_referrer` NEM lép be szanitálás nélkül', async () => {
    // Az URL-ben átvitt jel a felhasználó által szerkeszthető, és a CRM
    // lead-kartonján jelenik meg. A `javascript:` séma sosem mehet át.
    const mod = await pageLoad('/kapcsolat/?_referrer=javascript:alert(1)', '');

    expect(mod.getEntryReferrer()).toBeUndefined();
  });

  it('idegen originra mutató `_landing` NEM lép be — csak saját útvonal', async () => {
    const mod = await pageLoad('/kapcsolat/?_landing=https://evil.example/x', '');

    expect(mod.getEntryLandingUrl()).toBe(`${ORIGIN}/kapcsolat/`);
  });

  it('protokoll-relatív `_landing` sem — a `//evil.example` idegen origin', async () => {
    const mod = await pageLoad('/kapcsolat/?_landing=//evil.example/x', '');

    expect(mod.getEntryLandingUrl()).toBe(`${ORIGIN}/kapcsolat/`);
  });
});

describe('consent', () => {
  it('GRANTED: a belépési jel a store-ba is bekerül — ez hidalja át a tetszőleges útvonalat', async () => {
    setConsent('GRANTED');
    await pageLoad('/diodalezerek/', 'https://www.google.com/');

    const stored = JSON.parse(localStorage.getItem('__sb_attribution') || '{}');
    expect(stored.landing_page).toBe(`${ORIGIN}/diodalezerek/`);
    expect(stored.referrer).toBe('https://www.google.com/');

    // Két tetszőleges (NEM űrlap-)oldal után is a store-ból jön a belépés.
    const mod = await pageLoad('/rolunk/', `${ORIGIN}/diodalezerek/`);
    expect(mod.getEntryLandingUrl()).toBe(`${ORIGIN}/diodalezerek/`);
    expect(mod.getEntryReferrer()).toBe('https://www.google.com/');
  });

  it('UNKNOWN: az eszközre semmi nem íródik', async () => {
    await pageLoad('/diodalezerek/', 'https://www.google.com/');

    expect(localStorage.getItem('__sb_attribution')).toBeNull();
  });

  it('DENIED: az eszközre semmi nem íródik, és a MÁR KIÍRT store-t sem olvassuk vissza', async () => {
    setConsent('GRANTED');
    await pageLoad('/diodalezerek/', 'https://www.google.com/');
    expect(localStorage.getItem('__sb_attribution')).not.toBeNull();

    setConsent('DENIED');
    const mod = await pageLoad('/kapcsolat/', `${ORIGIN}/diodalezerek/`);

    // A visszavonás nyugalmi állapotban is érvényes: a tárolt belépési oldal
    // nem szivároghat vissza az olvasatba.
    expect(mod.getEntryLandingUrl()).toBe(`${ORIGIN}/kapcsolat/`);
  });

  it('DENIED alatt is átér a belépési jel az URL-en — az nem eszközre írás', async () => {
    setConsent('DENIED');

    const out = await journey('/diodalezerek/', 'https://www.google.com/', ['/kapcsolat/']);

    expect(out.landing_url).toBe(`${ORIGIN}/diodalezerek/`);
    expect(out.referrer).toBe('https://www.google.com/');
    expect(localStorage.getItem('__sb_attribution')).toBeNull();
  });

  it('a belépési jelek közé SOSEM kerül klikk-azonosító', async () => {
    setConsent('GRANTED');
    const mod = await pageLoad('/diodalezerek/?gclid=CJ_TEST_123&fbclid=FB_1', '');
    const params = mod.entryParamsForNavigation();

    const serialized = JSON.stringify(params);
    expect(serialized).not.toContain('CJ_TEST_123');
    expect(serialized).not.toContain('FB_1');
    expect(Object.keys(params).sort()).toEqual(['_landing']);
  });
});

describe('first touch', () => {
  it('a második capture nem írja felül az elsőt ugyanazon az oldalbetöltésen', async () => {
    const mod = await pageLoad('/diodalezerek/', 'https://www.google.com/');

    // Soft navigáció (view transitions): az URL változik, a modul memóriája nem.
    window.history.replaceState({}, '', '/kapcsolat/');
    mod.captureEntrySignals();

    expect(mod.getEntryLandingUrl()).toBe(`${ORIGIN}/diodalezerek/`);
  });

  it('GRANTED alatt a store-ba írt belépési oldalt egy későbbi oldal nem írja felül', async () => {
    setConsent('GRANTED');
    await pageLoad('/diodalezerek/', 'https://www.google.com/');
    await pageLoad('/rolunk/', `${ORIGIN}/diodalezerek/`);
    await pageLoad('/kapcsolat/', `${ORIGIN}/rolunk/`);

    const stored = JSON.parse(localStorage.getItem('__sb_attribution') || '{}');
    expect(
      stored.landing_page,
      'a `{...stored, ...fresh}` merge felülírta a tárolt belépési oldalt az aktuálissal',
    ).toBe(`${ORIGIN}/diodalezerek/`);
  });
});

describe('a címsor takarítása', () => {
  it('az `initEntryAttribution` kiolvassa, majd eltünteti a belépési paramétereket', async () => {
    vi.resetModules();
    window.history.replaceState({}, '', '/kapcsolat/?_landing=%2Fdiodalezerek%2F&utm_source=google');
    setReferrer('');
    const mod = await import('./entry-attribution');

    mod.initEntryAttribution();

    expect(mod.getEntryLandingUrl()).toBe(`${ORIGIN}/diodalezerek/`);
    // A `_landing` nem kerülhet a GA4 `page_location`-be — az három
    // legfontosabb oldalunk riportját szedné darabokra.
    expect(window.location.search).not.toContain('_landing');
    // A kampánycímkéket viszont nem bántjuk: azok a felhasználó URL-je.
    expect(window.location.search).toContain('utm_source=google');
  });
});
