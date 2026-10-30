import { describe, it, expect } from 'vitest';
import { readRequestConsent } from '@/lib/tracking/request-consent';
import type { GatewayEnv } from '@/lib/tracking/gateway-dispatch';

/**
 * A szerver-láb consent-olvasata (src/lib/tracking/request-consent.ts) — a CMP
 * pilot-review (2026-10-30) A1/A2 leletei: a 6.9.0-s fork szerver-receiptjei
 * `source_used='none'`-t mutattak, és a policy-verziót sem ellenőrizték.
 */

const POLICY = '2026-09-18-a';
const ENV: GatewayEnv = { TRACKING_POLICY_VERSION: POLICY, TRACKING_CONSENT_PROVIDER: 'sbo' };
const ID = '74412686-71b9-494c-8b8b-044969b7ed66';
const now = () => Math.floor(Date.now() / 1000);
// A 6.9.0-s fork pontosan ezt a formátumot írta (consent-sbo-state.ts — a
// kittel bájtra azonos): v2.<a>.<m>.<rev>.<decision>.<id>.<ts>.<policy>.
const sbo = (a: 0 | 1, m: 0 | 1, policy = POLICY, decision = 'accept_all') =>
  `sbo_consent=v2.${a}.${m}.1.${decision}.${ID}.${now() - 3600}.${policy}`;

describe('readRequestConsent', () => {
  it('érvényes sbo-döntés → GRANTED + consentId + source_used=sbo_cookie', () => {
    const r = readRequestConsent(`_ga=GA1.1.1.2; ${sbo(1, 1)}`, ENV);
    expect(r.consent?.ad_user_data).toBe('GRANTED');
    expect(r.consent?.analytics_storage).toBe('GRANTED');
    expect(r.consentId).toBe(ID);
    expect(r.consentSources.source_used).toBe('sbo_cookie');
    expect(r.consentSources.consent_age_s).toBeGreaterThanOrEqual(3600);
    expect(r.consentSources.client_lib_version).toBe('6.17.4');
  });

  it('reject_all → DENIED (a nem ≠ a nincs)', () => {
    const r = readRequestConsent(sbo(0, 0, POLICY, 'reject_all'), ENV);
    expect(r.consent?.ad_user_data).toBe('DENIED');
  });

  it('RÉGI tájékoztatóra adott igen → nincs döntés (fail-closed), és nincs consentId', () => {
    const r = readRequestConsent(sbo(1, 1, '2026-08-a'), ENV);
    expect(r.consent).toBeUndefined();
    expect(r.consentId).toBeUndefined();
  });

  it('sbo alatt a régi CookieYes-süti NEM evidencia', () => {
    const r = readRequestConsent(
      'cookieyes-consent=consentid%3Aabc%2Cconsent%3Ayes%2Canalytics%3Ayes%2Cadvertisement%3Ayes',
      ENV,
    );
    expect(r.consent).toBeUndefined();
    expect(r.consentId).toBeUndefined();
  });

  it('nincs süti → nincs döntés; a gateway a require_consent szerint dönt', () => {
    const r = readRequestConsent(null, ENV);
    expect(r.consent).toBeUndefined();
    expect(r.consentSources.source_used).toBe('none');
  });
});
