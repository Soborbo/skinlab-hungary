/**
 * Per-site market config — makes the same skill work for HU and UK sites
 * (and any other market) by changing a few PUBLIC_ env vars.
 *
 *   PUBLIC_TRACKING_COUNTRY   GB | HU            (default GB)
 *   PUBLIC_TRACKING_CURRENCY  GBP | HUF | EUR…   (default GBP)
 *   PUBLIC_TRACKING_LOCALE    en | hu            (default en)
 *
 * `country` drives phone normalization for ambiguous numbers and PhoneLink
 * formatting; `currency` is the default conversion currency; `locale` is for
 * display strings. The gateway (server) uses the per-site KV `country_code` /
 * `currency` independently — keep them in sync with these.
 */

import { parseVendors } from './consent-vendors';

export type Market = 'GB' | 'HU';

/**
 * Melyik CMP fut a site-on (soborbo-tracking 6.9.0, CMP Fázis 2). Bármely
 * nem-'sbo' érték 'cookieyes'-ként értelmeződik: egy elgépelt env-érték ne
 * kapcsolhassa ki a futó CMP-t. A skinlab 2026-09-18 óta 'sbo' (.env.production).
 */
export type ConsentProvider = 'cookieyes' | 'sbo';

export interface TrackingConfig {
  country: Market;
  currency: string;
  locale: 'en' | 'hu';
  consentProvider: ConsentProvider;
  /**
   * Az adatkezelési tájékoztató verziója (consent_log.policy_version). A
   * `sbo_consent` süti ehhez kötődik: más érték = nincs érvényes döntés, a
   * banner újra kérdez. A szerveroldali TRACKING_POLICY_VERSION-nel egyeznie kell.
   */
  policyVersion: string;
  /** A consent-szabályrendszer címkéje (consent_log.ruleset). */
  ruleset: string;
  /**
   * Ismeretlen consent mellett dev-buildben engedünk-e (explicit opt-in:
   * PUBLIC_TRACKING_DEV_CONSENT_ALLOW=1). A sbo-ágon érvényes; a CookieYes-ág a
   * régi `isDevMode()` viselkedést tartja.
   */
  devConsentAllow: boolean;
  /**
   * A site-on ténylegesen futó eszközök (PUBLIC_TRACKING_VENDORS). Ebből áll
   * össze a banner szövege és a süti-tábla (lib/consent-vendors.ts).
   */
  vendors: string[];
}

function readEnv(key: string): string | undefined {
  try {
    return (import.meta.env as Record<string, string | undefined> | undefined)?.[key];
  } catch {
    return undefined;
  }
}

/**
 * A kliens-lib verziója, ahogy a consent-payloadok jelentik
 * (`client_lib_version`). A skinlab-fork a CMP-réteget a kit 6.9.0-ból vette
 * át (a befilo vendorolt példányából), a többi modul a régebbi fork.
 */
export const CLIENT_LIB_VERSION = '6.9.0';

export const trackingConfig: TrackingConfig = {
  country: (readEnv('PUBLIC_TRACKING_COUNTRY') as Market) || 'GB',
  currency: readEnv('PUBLIC_TRACKING_CURRENCY') || 'GBP',
  locale: (readEnv('PUBLIC_TRACKING_LOCALE') as 'en' | 'hu') || 'en',
  consentProvider: readEnv('PUBLIC_TRACKING_CONSENT_PROVIDER') === 'sbo' ? 'sbo' : 'cookieyes',
  policyVersion: readEnv('PUBLIC_TRACKING_POLICY_VERSION') || 'policy-unset',
  ruleset: readEnv('PUBLIC_TRACKING_RULESET') || 'eea_uk',
  devConsentAllow: readEnv('PUBLIC_TRACKING_DEV_CONSENT_ALLOW') === '1',
  vendors: parseVendors(readEnv('PUBLIC_TRACKING_VENDORS')),
};

/** EGY helyen definiált provider-kérdés — ne szóródjon `=== 'sbo'` összehasonlítás. */
export function isSboConsentProvider(): boolean {
  return trackingConfig.consentProvider === 'sbo';
}
