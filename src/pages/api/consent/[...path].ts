/**
 * Saját CMP (sbo) — a consent-végpontok továbbítása az event-gateway felé.
 *
 *   POST /api/consent/        — egy döntés rögzítése (consent_log, append-only)
 *   POST /api/consent/shown/  — banner-megjelenés (ID-mentes UX-mérés)
 *   GET  /api/consent/<id>/   — az aktuális állapot
 *
 * A banner (lib/tracking/consent-sbo.ts) same-origin ír ide. A befilónál ezt egy
 * zóna-route viszi közvetlenül a gatewayre; skinlabon a MEGLÉVŐ `GATEWAY`
 * service bindingon adjuk tovább a kérést változatlanul — így a gateway ugyanazt
 * látja: a hostnévből oldja fel a site-ot, az `Origin` fejlécet ellenőrzi, és a
 * `CF-Connecting-IP` szerint korlátoz. A gateway a záró perjelet levágja.
 *
 * A gateway válaszát (204 / 400 / 403 / 429 / 503) SZÓ SZERINT adjuk vissza: a
 * kliens ebből dönti el, hogy a döntés bizonyítékát megtartsa és újraküldje-e.
 * Binding hiányában 503 — a kliens ilyenkor megőrzi és később újraküldi.
 */
import type { APIRoute } from 'astro';
import { env as workerEnv } from 'cloudflare:workers';

export const prerender = false;

interface GatewayBinding {
  fetch: (request: Request) => Promise<Response>;
}

export const ALL: APIRoute = async ({ request }) => {
  const gateway = (workerEnv as unknown as { GATEWAY?: GatewayBinding }).GATEWAY;
  if (!gateway) {
    console.error('[consent] GATEWAY service binding missing — 503 so the client retries');
    return new Response('gateway_unavailable', { status: 503, headers: { 'Retry-After': '60' } });
  }
  try {
    return await gateway.fetch(request);
  } catch (err) {
    console.error('[consent] gateway forward failed:', err instanceof Error ? err.message : err);
    return new Response('gateway_unavailable', { status: 503, headers: { 'Retry-After': '60' } });
  }
};
