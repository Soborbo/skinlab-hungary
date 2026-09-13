/**
 * BELÉPÉSI JELEK — hol lépett be a látogató a webhelyre, és ki küldte.
 *
 * ── A hiba, ami miatt ez a modul létezik ─────────────────────────────────────
 * A CRM `lead_attribution.landing_url` oszlopa 94/95 sorban a SUBMIT-oldalt
 * tartalmazta (`/kapcsolat/`, `/konzultacio/`, `/megrendeles/`), mert az űrlapok
 * a saját oldaluk `Astro.url.href`-jét küldték. A `referrer` pedig nyers
 * `document.referrer` volt, külső-host szűrő nélkül: 95 sorból 86 a SAJÁT
 * előző oldalunkra mutatott, 0 külsőre. Egy tele oszlop, ami nem hordoz
 * információt — rosszabb, mint a bevallott NULL, mert nem hívja fel magára a
 * figyelmet.
 *
 * ── Két szabály ──────────────────────────────────────────────────────────────
 * 1. FIRST TOUCH. Az első oldalbetöltésen rögzül, és utána soha nem íródik
 *    felül. Ezért nem elég a store-t olvasni: a `{...stored, ...fresh}` merge
 *    minden oldalon felülírná a tároltat az aktuálissal.
 * 2. A hivatkozó CSAK KÜLSŐ lehet. Belső hivatkozó nem jel, hanem zaj — elfedi
 *    a valódi forrást. A query-stringet is eldobjuk: a hivatkozó URL
 *    paraméterei a hivatkozó dolga, hordozhatják az Ő azonosítóikat.
 *
 * ── Consent ──────────────────────────────────────────────────────────────────
 * A belépési jel NEM consent-esemény, a klikk-azonosító IGEN. Egy útvonal és egy
 * külső origin nem felhasználó-azonosító, az URL pedig nem terminál-tároló —
 * ezért a belépési jelek mindhárom consent-állapotban gyűjthetők, és az oldalak
 * között az URL-ben átvihetők. A PECR/ICO szabály a TÁROLÁSRÓL szól: eszközre
 * (localStorage) csak GRANTED alatt írunk. A klikk-azonosítók (gclid/gbraid/
 * wbraid/fbclid/msclkid) változatlanul a consent-kapu mögött maradnak — ezt a
 * szétválasztást ne mosd össze.
 *
 * Ezért NINCS második, pre-consent tároló: döntés nélküli látogatónál a jel az
 * URL-ben utazik (`entryParamsForNavigation`), nem a lemezen.
 */

import { getMarketingConsentState, type MarketingConsentState } from './consent';

/** A gateway attribúciós blobja — SZÁNDÉKOSAN ugyanaz a kulcs. Egy store, egy
 *  consent-osztály; a belépési jelek `landing_page`/`referrer` néven ülnek
 *  benne, ahogy a `collectAttribution()` is várja őket. */
const STORAGE_KEY = '__sb_attribution';

/** Aláhúzás-prefix, hogy ne keveredjenek a kampánycímkékkel, és látszódjon:
 *  belső mechanika, nem a felhasználónak szól. */
export const LANDING_PARAM = '_landing';
export const REFERRER_PARAM = '_referrer';

/** A CRM `referrer` oszlopa max 500 (lib/forms/schemas.ts). */
const MAX_LEN = 500;

/**
 * AZOK AZ ÚTVONALAK, AHOVÁ A BELÉPÉSI JELET ÁT KELL VINNI az URL-ben.
 *
 * A lead-űrlapok oldalai. A látogató ritkán ezekre érkezik: valahol máshol lép
 * be, böngész, és csak utána kattint ide — ez az a hop, ahol a belépési jel
 * elveszne. Consent mellett a store áthidalja; consent nélkül csak ez.
 *
 * Az illesztés útvonal-SZEGMENSRE megy, ezért a nyelvi prefixekkel (`/en/…`,
 * `/de/…`) is működik — a `[locale]` route-ok ugyanezeket a slugokat használják.
 *
 * ÚJ ŰRLAP-OLDAL = ÚJ BEJEGYZÉS ITT. Enélkül az oda vezető kattintás megint a
 * submit-oldalt fogja belépésnek jelenteni.
 */
export const ENTRY_CARRY_SEGMENTS = [
  'kapcsolat',
  'konzultacio',
  'megrendeles',
  'kosar',
  'kepzesek',
] as const;

/**
 * A modul memóriaállapota. Astro view transitions mellett a soft navigáció ezt
 * NEM nullázza — ami helyes: a first touch a látogatóé, nem az oldalé. Hard page
 * loadon elvész, és ott lép be a store (GRANTED) vagy az URL-átvitel (minden
 * más állapotban).
 */
let entry: { landing?: string; referrer?: string } = {};

/** A link-átíró delegátumot egyszer szabad felkötni. */
let linkCarryInstalled = false;

// ── Szanitálás ─────────────────────────────────────────────────────

/**
 * `document.referrer` külső hivatkozóként: origin + útvonal, query nélkül.
 * Belső hivatkozóra és értelmezhetetlen értékre `undefined`.
 */
export function externalReferrer(): string | undefined {
  if (typeof document === 'undefined') return undefined;
  return sanitizeReferrer(document.referrer);
}

/**
 * Bejövő hivatkozó-érték szűrése. Ugyanaz a szabály a `document.referrer`-re és
 * az URL-ben átvitt `_referrer`-re: az utóbbi a felhasználó által szerkeszthető,
 * és a CRM lead-kartonján jelenik meg — nem bízhatunk benne jobban.
 */
function sanitizeReferrer(raw: string | null | undefined): string | undefined {
  if (!raw) return undefined;
  if (typeof window === 'undefined' || !window.location?.href) return undefined;
  try {
    const u = new URL(raw, window.location.href);
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return undefined;
    if (u.host === window.location.host) return undefined;
    return `${u.origin}${u.pathname}`.slice(0, MAX_LEN);
  } catch {
    // A `document.referrer` elvileg mindig abszolút URL, de egy elrontott érték
    // nem buktathatja a capture-t.
    return undefined;
  }
}

/**
 * Bejövő belépési-útvonal szűrése: SAJÁT, abszolút útvonal kell.
 *
 * A `//evil.com` protokoll-relatív alak `new URL()`-lel idegen originná válik,
 * a `https://evil.com/x` pedig nyíltan az — mindkettő a CRM lead-kartonjára
 * kerülne. Csak a `/`-rel kezdődő, nem `//` alak megy át.
 */
function sanitizeLandingPath(raw: string | null | undefined): string | undefined {
  if (!raw) return undefined;
  if (raw[0] !== '/' || raw[1] === '/') return undefined;
  return raw.slice(0, MAX_LEN);
}

// ── Store (csak GRANTED alatt írunk) ───────────────────────────────

function readStore(): Record<string, string | undefined> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, string | undefined>) : {};
  } catch {
    return {};
  }
}

/**
 * A belépési jelek beírása a hozzájárult store-ba. Ez az EGYETLEN réteg, ami a
 * marketing-oldal → űrlap-oldal átkattintást URL-átvitel nélkül áthidalja;
 * cserébe csak GRANTED alatt létezik.
 */
function persistEntry(): void {
  if (!entry.landing && !entry.referrer) return;
  if (typeof window === 'undefined' || !window.location?.origin) return;
  try {
    const stored = readStore();
    // FIRST TOUCH a lemezen is: ami már ott van, azt nem írjuk felül.
    const next = { ...stored };
    if (!next.landing_page && entry.landing) {
      next.landing_page = `${window.location.origin}${entry.landing}`;
    }
    if (!next.referrer && entry.referrer) next.referrer = entry.referrer;
    if (next.landing_page === stored.landing_page && next.referrer === stored.referrer) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // localStorage tiltva (privát mód / kvóta) — best-effort.
  }
}

// ── Capture ────────────────────────────────────────────────────────

/**
 * A BELÉPÉSI JELEK feloldása. Idempotens: az első érintés nyer, a további
 * hívások nem írják felül.
 *
 * A sorrend a bizonyíték erőssége szerint megy: amit már feloldottunk ezen az
 * oldalbetöltésen → a hozzájárult store → az URL-ben átvitt jel → és csak
 * legvégül maga ez az oldal.
 */
export function captureEntrySignals(consent?: MarketingConsentState): void {
  // Nem elég a `typeof window === 'undefined'` őr: a `window` létezhet
  // RÉSZLEGES `location`-nel is (SSR-shim, teszt-stub, beágyazott kontextus).
  // Egy dobás itt a teljes űrlap-beküldést vinné magával — a belépési jel
  // hiánya viszont csak egy üres mező.
  if (typeof window === 'undefined' || !window.location) return;
  const state = consent ?? getMarketingConsentState();
  const params = new URLSearchParams(window.location.search || '');

  // DENIED alatt a store-t nem olvassuk vissza: a visszavonás a memóriában lévő
  // olvasatra is álljon, ne csak az írásra.
  const stored = state === 'DENIED' ? {} : readStore();

  if (!entry.landing) {
    entry.landing =
      storedLandingPath(stored.landing_page) ||
      sanitizeLandingPath(params.get(LANDING_PARAM)) ||
      (window.location.pathname || '/').slice(0, MAX_LEN);
  }
  if (!entry.referrer) {
    entry.referrer =
      sanitizeReferrer(stored.referrer) ||
      sanitizeReferrer(params.get(REFERRER_PARAM)) ||
      externalReferrer();
  }

  if (state === 'GRANTED') persistEntry();
}

/** A store abszolút `landing_page`-éből a saját útvonal. Idegen originra
 *  `undefined` — a store-t a gateway is írja, és a formátuma változhat. */
function storedLandingPath(raw: string | undefined): string | undefined {
  if (!raw) return undefined;
  if (typeof window === 'undefined' || !window.location?.href) return sanitizeLandingPath(raw);
  try {
    const u = new URL(raw, window.location.href);
    if (u.host !== window.location.host) return undefined;
    return u.pathname.slice(0, MAX_LEN);
  } catch {
    return sanitizeLandingPath(raw);
  }
}

// ── Olvasók ────────────────────────────────────────────────────────

/** A belépési oldal ÚTVONALA (`/blog/valami`). URL-átvitelhez. */
export function getEntryLandingPath(): string {
  captureEntrySignals();
  if (entry.landing) return entry.landing;
  if (typeof window === 'undefined' || !window.location) return '/';
  return window.location.pathname || '/';
}

/**
 * A belépési oldal ABSZOLÚT URL-je. A CRM `landing_url`-je ezt kapja, és a
 * `lib/forms/schemas.ts` `sourceUrl: z.url()`-je abszolút alakot követel.
 */
export function getEntryLandingUrl(): string {
  if (typeof window === 'undefined' || !window.location?.origin) return '';
  return `${window.location.origin}${getEntryLandingPath()}`;
}

/** A KÜLSŐ hivatkozó, vagy `undefined`. Sosem a saját domainünk. */
export function getEntryReferrer(): string | undefined {
  captureEntrySignals();
  return entry.referrer;
}

/**
 * Az űrlap `sourceUrl` és `referrer` rejtett mezőinek feltöltése.
 *
 * A `sourceUrl` szerveroldalon `Astro.url.href`-fel renderelődik — az a
 * SUBMIT-oldal, nem a belépési. Az a kitöltés csak akkor marad érvényben, ha ez
 * a script nem fut le (JS letiltva); egyébként a belépési oldal írja felül.
 *
 * A `referrer` mezőnek NINCS szerveroldali kitöltése, és nem is szabad
 * `document.referrer`-re visszaesnie: az a 2. oldaltól a saját előző oldalunk.
 * Ha nincs külső hivatkozó, a mező ÜRESEN marad — a CRM megkülönbözteti a
 * „nem rögzült"-et a „nincs adat"-tól, és ki is írja az okát.
 */
export function applyEntryAttributionToForm(form: HTMLFormElement): void {
  const landing = form.querySelector<HTMLInputElement>('input[name="sourceUrl"]');
  if (landing) landing.value = getEntryLandingUrl();
  const referrer = form.querySelector<HTMLInputElement>('input[name="referrer"]');
  if (referrer) referrer.value = getEntryReferrer() || '';
}

// ── Átvitel oldalak között ─────────────────────────────────────────

/**
 * A belépési jelek URL-paraméterként, a következő navigációhoz.
 *
 * MINDHÁROM consent-állapotban utaznak — a DENIED-et is beleértve. A
 * visszavonás azt tiltja, hogy a felhasználó ESZKÖZÉRE írjunk; az útvonal és a
 * küldő origin nem azonosítja a felhasználót, és az URL nem terminál-tároló.
 * Klikk-azonosító innen SOHA nem kerül az URL-be.
 */
export function entryParamsForNavigation(): Record<string, string> {
  if (typeof window === 'undefined' || !window.location) return {};
  captureEntrySignals();
  const out: Record<string, string> = {};
  if (entry.landing) out[LANDING_PARAM] = entry.landing;
  if (entry.referrer) out[REFERRER_PARAM] = entry.referrer;
  return out;
}

/** Ugyanarra a webhelyre mutat-e a href, és melyik útvonalra. Idegen originra,
 *  `tel:`/`mailto:`-ra és értelmezhetetlen hrefre `null`. */
function sameSitePathname(href: string): string | null {
  try {
    const url = new URL(href, window.location.origin);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;
    if (url.hostname !== window.location.hostname) return null;
    return url.pathname;
  } catch {
    return null;
  }
}

/** Űrlap-oldalra mutat-e az útvonal (lásd ENTRY_CARRY_SEGMENTS). */
function isEntryCarryTarget(pathname: string): boolean {
  const segments = pathname.split('/').filter(Boolean);
  return segments.some((s) => (ENTRY_CARRY_SEGMENTS as readonly string[]).includes(s));
}

/**
 * A belépési jelek átvitele az űrlap-oldalra vezető kattintáson.
 *
 * A href-et a CAPTURE fázisban írjuk át, közvetlenül az általa indított
 * navigáció előtt. Az `auxclick` is fel van kötve, hogy a középső kattintás /
 * új lapon megnyitás ugyanezt a kontextust vigye.
 *
 * Delegátum a `document`-en, ezért az Astro view transitions DOM-cseréje után
 * is él — nem kell újrakötni oldalanként.
 */
export function initEntryLinkCarry(): void {
  if (linkCarryInstalled || typeof document === 'undefined') return;
  linkCarryInstalled = true;
  document.addEventListener('click', onEntryLinkActivate, true);
  document.addEventListener('auxclick', onEntryLinkActivate, true);
}

function onEntryLinkActivate(e: Event): void {
  const link = (e.target as HTMLElement | null)?.closest?.('a');
  if (!link) return;
  const href = link.getAttribute('href') || '';
  const path = sameSitePathname(href);
  if (!path || !isEntryCarryTarget(path)) return;
  try {
    const url = new URL(href, window.location.origin);
    for (const [k, v] of Object.entries(entryParamsForNavigation())) {
      // A linken már ott lévő explicit paraméter nyer — sosem írjuk felül.
      if (!url.searchParams.has(k)) url.searchParams.set(k, v);
    }
    link.setAttribute('href', url.pathname + url.search + url.hash);
  } catch {
    // Egy hibás href sosem blokkolhatja a navigációt.
  }
}

/**
 * A belépési paraméterek eltüntetése a címsorból, MIUTÁN kiolvastuk őket.
 *
 * Enélkül a `?_landing=…&_referrer=…` bekerülne a GA4 `page_location`-be, és a
 * három legfontosabb oldalunk riportját darabokra szedné — ugyanaz az oldal
 * annyiféle sorként jelenne meg, ahányféle úton érkeztek rá. A `replaceState`
 * nem navigál és nem növeli a history-t.
 */
function stripEntryParamsFromUrl(): void {
  try {
    const url = new URL(window.location.href);
    if (!url.searchParams.has(LANDING_PARAM) && !url.searchParams.has(REFERRER_PARAM)) return;
    url.searchParams.delete(LANDING_PARAM);
    url.searchParams.delete(REFERRER_PARAM);
    history.replaceState(history.state, '', url.pathname + url.search + url.hash);
  } catch {
    // replaceState sandboxolt iframe-ben dobhat; a capture ekkor már megtörtént.
  }
}

/**
 * Boot: a jelek feloldása, a link-átvitel felkötése és a címsor takarítása.
 * Idempotens — a first-touch szabály miatt a második hívás no-op.
 */
export function initEntryAttribution(): void {
  if (typeof window === 'undefined' || !window.location) return;
  captureEntrySignals();
  initEntryLinkCarry();
  stripEntryParamsFromUrl();
}

/**
 * Teszt-horog: a modul memóriaállapotának ürítése. Az `entry` modul-szintű,
 * ezért egy hard page loadot csak modul-újratöltéssel VAGY ezzel lehet hűen
 * reprodukálni.
 */
export function __resetEntryForTest(): void {
  entry = {};
  linkCarryInstalled = false;
}
