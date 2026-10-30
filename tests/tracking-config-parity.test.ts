import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, it, expect } from 'vitest';

/**
 * A két láb (böngésző: .env.production → Vite-build; szerver: wrangler.jsonc
 * vars → Worker env) ugyanarról a `sbo_consent` sütiről nem gondolhat mást.
 *
 * Ha a policy-verzió szétcsúszik, a böngésző elfogadja a sütit, a szerver-láb
 * viszont „nincs döntés"-t lát (vagy fordítva) — minden lead-űrlap konverziója
 * NÉMÁN kimarad a hirdetési platformokról, a böngésző pedig közben zöldet mutat.
 * A provider ugyanígy: 'sbo' nélkül a szerver-láb CookieYes-sütire esne vissza.
 */

const root = (p: string) => fileURLToPath(new URL(`../${p}`, import.meta.url));

function envValue(name: string): string | undefined {
  const line = readFileSync(root('.env.production'), 'utf8')
    .split(/\r?\n/)
    .find((l) => l.startsWith(`${name}=`));
  return line?.slice(name.length + 1).trim();
}

function wranglerVar(name: string): string | undefined {
  const m = readFileSync(root('wrangler.jsonc'), 'utf8').match(new RegExp(`"${name}"\\s*:\\s*"([^"]*)"`));
  return m?.[1];
}

describe('tracking config — böngésző- és szerver-láb paritás', () => {
  it('a policy-verzió MINDKÉT helyen ugyanaz', () => {
    const browser = envValue('PUBLIC_TRACKING_POLICY_VERSION');
    expect(browser).toBeTruthy();
    expect(wranglerVar('TRACKING_POLICY_VERSION')).toBe(browser);
  });

  it('a consent-provider mindkét lábon sbo', () => {
    expect(envValue('PUBLIC_TRACKING_CONSENT_PROVIDER')).toBe('sbo');
    expect(wranglerVar('TRACKING_CONSENT_PROVIDER')).toBe('sbo');
  });

  it('a smoke site-azonosítója skinlab (a gateway SMOKE_SITES-e erre vár)', () => {
    expect(wranglerVar('TRACKING_SITE_ID')).toBe('skinlab');
  });

  it('Consent Mode: basic (2026-10-30 tulajdonosi döntés, terv §8)', () => {
    expect(envValue('PUBLIC_TRACKING_CONSENT_MODE')).toBe('basic');
  });
});
