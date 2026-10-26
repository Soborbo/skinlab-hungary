// @vitest-environment jsdom
/**
 * Azonosító-csupaszítás (advanced Consent Mode) — Codex #94:
 *  - a marketing-kapus konverzió marketing-hozzájárulással megtartja a hirdetési
 *    azonosítókat (gclid, attribúció), analytics nélkül is; a session_id
 *    (analytics-hatókör, csak a GA4 olvassa) ilyenkor is lekerül;
 *  - a süti nélküli kivétellel engedett push-ok csupaszok maradnak;
 *  - a generate_lead is a csupaszító úton megy.
 * A Serverside kit 6.16.1-es javításával egy irányú.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

const consent = vi.hoisted(() => ({ analytics: false, marketing: false, cookieless: true }));

vi.mock('./consent', () => ({
  hasAnalyticsConsent: () => consent.analytics,
  hasMarketingConsent: () => consent.marketing,
  isCookielessPingAllowed: () => consent.cookieless,
}));
vi.mock('./persistence', () => ({
  getSessionId: () => 'sess-1',
  getDevice: () => 'desktop',
  getPageUrl: () => 'https://example.test/p',
  getAttribution: () => ({ first_gclid: 'G-FIRST', last_utm_source: 'google' }),
  getGclid: () => 'G-CLICK',
  getFbclid: () => null,
  normalizeEmail: (e: string) => e.trim().toLowerCase(),
  normalizePhone: (p: string) => p,
  sanitizeName: (n: string) => n,
  registerMarketingPurgeHook: () => {},
}));

type DL = Array<Record<string, unknown>>;
const dl = () => (window as unknown as { dataLayer: DL }).dataLayer;
const find = (name: string) => dl().find((e) => e.event === name)!;

beforeEach(() => {
  (window as unknown as { dataLayer: DL }).dataLayer = [];
  Object.assign(consent, { analytics: false, marketing: false, cookieless: true });
});

describe('marketing-hozzájárulás analytics NÉLKÜL', () => {
  it('a lead-konverzió megtartja a gclid-et és az attribúciót, a session_id lekerül', async () => {
    consent.marketing = true;
    const { pushLeadConversion } = await import('./events');
    pushLeadConversion({ email: 'a@b.hu', gclid: 'G-CLICK', eventId: 'e1' });
    const ev = find('quote_calculator_submitted');
    expect(ev.gclid).toBe('G-CLICK');
    expect(ev.first_gclid).toBe('G-FIRST');
    expect(ev.last_utm_source).toBe('google');
    expect(ev).not.toHaveProperty('session_id');
    expect(ev.event_id).toBe('e1');
  });

  it('a rendelés-konverzió (trackOrderRequestSubmit) is megtartja a gclid-et', async () => {
    consent.marketing = true;
    const { trackOrderRequestSubmit } = await import('./ecommerce');
    trackOrderRequestSubmit({ orderId: 'o1', items: [], value: 100, eventId: 'e2' });
    const ev = find('order_request_submitted');
    expect(ev.gclid).toBe('G-CLICK');
    expect(ev.first_gclid).toBe('G-FIRST');
    expect(ev).not.toHaveProperty('session_id');
  });

  it('a süti nélküli kivétellel engedett esemény (kalkulátor) csupasz marad', async () => {
    consent.marketing = true;
    const { trackCalculatorStart } = await import('./events');
    trackCalculatorStart('quote');
    expect(find('quote_calculator_opened')).not.toHaveProperty('session_id');
  });
});

describe('hozzájárulás nélkül (advanced)', () => {
  it('a süti nélküli lead-konverzió csupasz', async () => {
    const { pushLeadConversion } = await import('./events');
    pushLeadConversion({ email: '', eventId: 'e3' });
    const ev = find('quote_calculator_submitted');
    for (const k of ['session_id', 'gclid', 'first_gclid', 'last_utm_source']) expect(ev, k).not.toHaveProperty(k);
  });

  it('a generate_lead a csupaszító úton megy: nincs session_id', async () => {
    const { trackGenerateLead } = await import('./ecommerce');
    trackGenerateLead('Termék', 'SKU1', 1000);
    const ev = find('generate_lead');
    expect(ev).toBeDefined();
    expect(ev).not.toHaveProperty('session_id');
    expect(ev.product_sku).toBe('SKU1');
  });
});

describe('analytics-hozzájárulással', () => {
  it('minden azonosító marad (a generate_lead session_id-je is)', async () => {
    consent.analytics = true;
    const { trackGenerateLead } = await import('./ecommerce');
    trackGenerateLead('Termék', 'SKU1');
    expect(find('generate_lead').session_id).toBe('sess-1');
  });
});
