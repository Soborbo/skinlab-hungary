/**
 * A saját CMP (sbo) két parsere UGYANARRÓL a sütiről ugyanazt kell gondolja:
 * a böngésző-lib (consent-sbo-state.ts — ez írja a sütit és ez kapuzza a GTM-et)
 * és a backend (gateway-dispatch.ts — ez adja a form-POST-ok szerver-lábának a
 * consentet). Ha szétcsúsznak, a szerver-láb némán kihagyja a hirdetési
 * platformokat (require_consent fail closed) — ahogy a kitben egyszer már megtörtént.
 */
import { encodeSboConsentCookie, parseSboConsentCookie, type SboConsentState } from './consent-sbo-state';
import { readSboConsentCookieHeader, readConsentFromCookie } from './gateway-dispatch';

const POLICY = 'test-policy-1';
const now = Math.floor(Date.now() / 1000);

function state(overrides: Partial<SboConsentState> = {}): SboConsentState {
  return {
    analytics: true,
    marketing: true,
    revision: 1,
    decision: 'accept_all',
    consentId: 'add3a66a-3f37-4e08-b6e1-6658825d0d38',
    decidedAtSec: now,
    policyVersion: POLICY,
    ...overrides,
  };
}

const header = (s: SboConsentState) => `foo=bar; sbo_consent=${encodeURIComponent(encodeSboConsentCookie(s))}; x=1`;

describe('sbo_consent: böngésző ↔ backend paritás', () => {
  const cases: Array<[string, SboConsentState]> = [
    ['accept_all', state()],
    ['reject_all', state({ analytics: false, marketing: false, decision: 'reject_all' })],
    ['custom (csak statisztika)', state({ marketing: false, decision: 'custom' })],
    ['withdrawn', state({ analytics: false, marketing: false, decision: 'withdrawn', revision: 3 })],
  ];

  it.each(cases)('%s: a két parser ugyanazt olvassa', (_name, s) => {
    const cookie = encodeSboConsentCookie(s);
    const browser = parseSboConsentCookie(cookie, POLICY);
    const server = readSboConsentCookieHeader(header(s), { expectedPolicyVersion: POLICY, nowSec: now });
    expect(browser?.analytics).toBe(s.analytics);
    expect(server?.analytics).toBe(s.analytics);
    expect(browser?.marketing).toBe(s.marketing);
    expect(server?.marketing).toBe(s.marketing);
    expect(server?.consentId).toBe(s.consentId);
  });

  it('más policy-verzióhoz adott döntés = nincs döntés (mindkét oldalon)', () => {
    const s = state({ policyVersion: 'regi-szoveg' });
    expect(parseSboConsentCookie(encodeSboConsentCookie(s), POLICY)).toBeNull();
    expect(readSboConsentCookieHeader(header(s), { expectedPolicyVersion: POLICY, nowSec: now })).toBeNull();
  });

  it('lejárt (180 napnál régebbi) döntés = nincs döntés a szerveren', () => {
    const s = state({ decidedAtSec: now - 181 * 24 * 60 * 60 });
    expect(readSboConsentCookieHeader(header(s), { expectedPolicyVersion: POLICY, nowSec: now })).toBeNull();
  });

  it('a szerver-láb Consent Mode jelei a saját sütiből jönnek', () => {
    const s = state({ marketing: false, decision: 'custom' });
    expect(readConsentFromCookie(header(s), { expectedPolicyVersion: POLICY, nowSec: now })).toEqual({
      ad_user_data: 'DENIED',
      ad_personalization: 'DENIED',
      ad_storage: 'DENIED',
      analytics_storage: 'GRANTED',
    });
  });
});
