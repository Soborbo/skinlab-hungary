/**
 * A szerver-láb consent-olvasata EGY helyen — a három lead-route (`/api/contact`,
 * `/api/consultation`, `/api/order`) ugyanezt hívja.
 *
 * Miért nem elég a puszta `readConsentFromCookie(cookie)` (a 6.9.0-s fork mintája):
 *  - `expectedPolicyVersion` nélkül a szerver-láb elfogadna egy RÉGI
 *    tájékoztatóra adott „igen"-t, miközben a böngésző-láb ugyanattól a sütitől
 *    újrakérdez — a két láb ugyanarról a látogatóról mást gondolna;
 *  - `consentSources` nélkül a gateway receiptje `source_used='none'`-t mutatott
 *    minden szerver-ingress konverzió fölött (CMP pilot-review, 2026-10-30, A1).
 *
 * A `consentId` a consent_log láncra köti a konverziót: ezen keresztül oldja
 * fel az offline/replay ág a döntés AKTUÁLIS állapotát.
 */
import {
  buildConsentSources,
  consentProviderFromEnv,
  readConsentFromCookie,
  readSboConsentCookieHeader,
  type ConsentSourcesPayload,
  type ConsentState,
  type GatewayEnv,
} from './gateway-dispatch';

export interface RequestConsent {
  consent?: ConsentState;
  consentId?: string;
  consentSources: ConsentSourcesPayload;
}

export function readRequestConsent(cookieHeader: string | null, env: GatewayEnv): RequestConsent {
  const expectedPolicyVersion = env.TRACKING_POLICY_VERSION;
  return {
    consent: readConsentFromCookie(cookieHeader, {
      expectedPolicyVersion,
      provider: consentProviderFromEnv(env),
    }),
    consentId: readSboConsentCookieHeader(cookieHeader, { expectedPolicyVersion })?.consentId,
    consentSources: buildConsentSources(cookieHeader, { expectedPolicyVersion }),
  };
}
