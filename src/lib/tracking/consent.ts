/**
 * Consent Management — CookieYes
 *
 * ┌─────────────────────┬────────────────────────────────────────────┐
 * │ Consent state       │ What is allowed                           │
 * ├─────────────────────┼────────────────────────────────────────────┤
 * │ No consent          │ NOTHING. No storage, no events, no beacon │
 * │ Analytics           │ GA4 events (scroll, steps, abandon)       │
 * │ Marketing           │ Meta, Google Ads, localStorage, PII       │
 * └─────────────────────┴────────────────────────────────────────────┘
 *
 * Every tracking function checks consent before doing anything.
 * If no CMP is detected in production → deny all (safe default).
 * Dev mode → allow all for testing convenience.
 *
 * CMP Fázis 2 (2026-09-18): `provider='sbo'` alatt (a skinlab ezen fut) a kapuk
 * a SAJÁT `sbo_consent` sütiből olvasnak, SZINKRONBAN — nincs CMP-betöltési
 * verseny (lásd a korábbi view_item-elvesztést), mert nincs mire várni. A
 * CookieYes-ág változatlan, csak rollbackre maradt meg.
 */

declare global {
  interface Window {
    getCkyConsent?: () => {
      // A CookieYes VALÓDI kategóriakészlete: { necessary, functional, analytics,
      // performance, advertisement }. Az `advertisement` AZ ads/marketing kategória
      // (Consent Mode v2: ad_storage / ad_user_data / ad_personalization). A `marketing`
      // nevet opcionálisan megtartjuk azoknak a CMP-configoknak, amelyek így hívják.
      categories: {
        analytics?: boolean;
        advertisement?: boolean;
        marketing?: boolean;
        performance?: boolean;
        functional?: boolean;
        necessary?: boolean;
      };
    };
  }
}

import { isSboConsentProvider, trackingConfig } from './config';
import { readSboConsent, SBO_CONSENT_EVENT } from './consent-sbo-state';
import { report } from './observability';

export type ConsentCategory = 'analytics' | 'marketing' | 'functional' | 'necessary';

function getCookieYesConsent(): Record<ConsentCategory, boolean> | null {
  if (typeof window === 'undefined') return null;
  if (typeof window.getCkyConsent !== 'function') return null;
  try {
    const cats = window.getCkyConsent().categories as Record<string, boolean | undefined>;
    return {
      analytics: cats.analytics === true,
      // A CookieYes „advertisement" kategóriája AZ marketing-hozzájárulás; a „marketing"
      // nevet is elfogadjuk. Korábban CSAK ez utóbbit néztük, ezért egy alapértelmezett
      // (advertisement-es) CMP-confignál a hasMarketingConsent() SOHA nem lett igaz —
      // a klikk-ID-k és a szerveroldali dispatch némán kimaradtak.
      marketing: cats.advertisement === true || cats.marketing === true,
      functional: cats.functional === true,
      necessary: cats.necessary === true,
    };
  } catch { return null; }
}

/**
 * A saját CMP állapota ugyanabban a kategória-alakban, amit a CookieYes-hívók
 * ismernek. KAPUZÓ olvasás: a policy-verzió eltérése = nincs érvényes döntés.
 */
function getSboConsent(): Record<ConsentCategory, boolean> | null {
  const s = readSboConsent(trackingConfig.policyVersion);
  if (!s) return null;
  return { analytics: s.analytics, marketing: s.marketing, functional: false, necessary: true };
}

function getProviderConsent(): Record<ConsentCategory, boolean> | null {
  return isSboConsentProvider() ? getSboConsent() : getCookieYesConsent();
}

function isDevMode(): boolean {
  try { return typeof import.meta !== 'undefined' && !!import.meta.env?.DEV; }
  catch { return false; }
}

/**
 * Ismeretlen consent (nincs döntés / nincs CMP). A sbo-ágon a kit 6.9.0 szigorú
 * szabálya él: csak explicit dev-opt-innel enged, és azt is hangosan (TRK-4003).
 * A CookieYes-ág a régi, puszta `isDevMode()` viselkedést tartja.
 */
function allowOnUnknownConsent(category: 'analytics' | 'marketing'): boolean {
  if (!isSboConsentProvider()) return isDevMode();
  const allow = isDevMode() && trackingConfig.devConsentAllow;
  if (allow) report('CONSENT_DEV_FALLBACK_ALLOW', { category });
  return allow;
}

export function hasMarketingConsent(): boolean {
  const c = getProviderConsent();
  if (!c) return allowOnUnknownConsent('marketing');
  return c.marketing === true;
}

/**
 * A marketing-döntés HÁROM állapota. A `hasMarketingConsent()` boolean-je
 * összemossa a „még nem döntött"-et a „visszavonta"-val, pedig a kettő
 * ellentétes viselkedést kíván:
 *
 *   UNKNOWN → a CMP még nem töltött be (boot-verseny minden korai
 *             oldalbetöltésen). Eszközre nem írunk, de a KORÁBBI hozzájárulás
 *             alatt kiírt tárolót sem dobjuk el és olvassuk vissza — a
 *             „nem tudom"-ot elutasításként kezelve egy hozzájárult látogató
 *             tárolt attribúcióját törölnénk a CMP inicializálása előtt.
 *   GRANTED → írhatunk és olvashatunk.
 *   DENIED  → a visszavonás nyugalmi állapotban is érvényes: nem elég nem írni
 *             többet, a már kiírtat sem olvassuk vissza.
 */
export type MarketingConsentState = 'GRANTED' | 'DENIED' | 'UNKNOWN';

export function getMarketingConsentState(): MarketingConsentState {
  const c = getProviderConsent();
  // Döntés/CMP nélkül dev módban a fejlesztői kényelem a `hasMarketingConsent()`-tel
  // egyezik; élesben a hiány nem elutasítás, hanem ismeretlen állapot (sbo alatt:
  // a látogató még nem döntött, vagy a tájékoztató verziója változott).
  if (!c) return allowOnUnknownConsent('marketing') ? 'GRANTED' : 'UNKNOWN';
  return c.marketing === true ? 'GRANTED' : 'DENIED';
}

export function hasAnalyticsConsent(): boolean {
  const c = getProviderConsent();
  if (!c) return allowOnUnknownConsent('analytics');
  return c.analytics === true;
}

/** Any non-essential tracking allowed? */
export function hasAnyConsent(): boolean {
  return hasAnalyticsConsent() || hasMarketingConsent();
}

/** A provider-helyes change-event neve. */
function consentUpdateEventName(): string {
  return isSboConsentProvider() ? SBO_CONSENT_EVENT : 'cookieyes_consent_update';
}

export function onConsentChange(
  callback: (consent: Record<ConsentCategory, boolean>) => void,
): void {
  document.addEventListener(consentUpdateEventName(), () => {
    const c = getProviderConsent();
    if (c) callback(c);
  });
}

export function waitForConsent(
  category: ConsentCategory,
  timeoutMs = 5_000,
): Promise<boolean> {
  return new Promise((resolve) => {
    const eventName = consentUpdateEventName();
    const c = getProviderConsent();
    if (c?.[category]) { resolve(true); return; }
    const handler = () => {
      if (getProviderConsent()?.[category]) {
        document.removeEventListener(eventName, handler);
        resolve(true);
      }
    };
    document.addEventListener(eventName, handler);
    setTimeout(() => {
      document.removeEventListener(eventName, handler);
      resolve(false);
    }, timeoutMs);
  });
}
