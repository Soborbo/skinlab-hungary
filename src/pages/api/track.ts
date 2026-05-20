/**
 * /api/track — Meta CAPI + GA4 Measurement Protocol + beacon endpoint
 *
 * Security layers:
 *   1. Payload size limit (32 KB)
 *   2. Zod discriminated union schema (lead | contact | purchase)
 *   3. Origin/Referer allowlist
 *   4. Optional HMAC token (TRACK_TOKEN env var)
 *   5. In-memory rate limiting
 *
 * Env vars:
 *   META_ACCESS_TOKEN, META_PIXEL_ID       — required for Meta CAPI
 *   GA4_MEASUREMENT_ID, GA4_MP_API_SECRET  — required for GA4 MP server-side
 *   ALLOWED_ORIGINS                        — required (comma-separated)
 *   TRACK_TOKEN                            — optional (shared secret header)
 *   TRACKING_SHEETS_WEBHOOK                — optional
 */

import type { APIRoute } from 'astro';
import { z } from 'zod';
import { normalizeEmail, normalizePhone } from '@/lib/tracking/persistence';
import { errorResponse } from '@/lib/errors/respond';

export const prerender = false;

// -- Schema --

const S = 256;

const BaseFields = {
  eventId: z.string().min(8).max(64),
  sessionId: z.string().min(8).max(64).optional(),
  sourceType: z.string().max(20).optional(),
  pageUrl: z.string().max(2048).optional(),
  timestamp: z.string().max(64).optional(),
  url: z.string().max(2048).optional(),
  userAgent: z.string().max(512).optional(),
  gclid: z.string().max(S).nullable().optional(),
  fbclid: z.string().max(S).nullable().optional(),
  fbp: z.string().max(S).nullable().optional(),
  fbc: z.string().max(S).nullable().optional(),
  utm_source: z.string().max(S).optional(),
  utm_medium: z.string().max(S).optional(),
  utm_campaign: z.string().max(S).optional(),
  utm_content: z.string().max(S).optional(),
  utm_term: z.string().max(S).optional(),
  first_utm_source: z.string().max(S).optional(),
  first_utm_medium: z.string().max(S).optional(),
  first_utm_campaign: z.string().max(S).optional(),
  first_gclid: z.string().max(S).optional(),
  last_utm_source: z.string().max(S).optional(),
  last_utm_medium: z.string().max(S).optional(),
  last_utm_campaign: z.string().max(S).optional(),
  last_gclid: z.string().max(S).optional(),
};

const LeadSchema = z.object({
  type: z.literal('lead'),
  email: z.email().max(254),
  phone: z.string().max(20).optional(),
  firstName: z.string().max(100).optional(),
  lastName: z.string().max(100).optional(),
  value: z.number().positive().max(999_999_999).optional(),
  currency: z.string().length(3).optional(),
  contentName: z.string().max(S).optional(),
  ...BaseFields,
}).strict();

const ContactSchema = z.object({
  type: z.literal('contact'),
  email: z.email().max(254).optional(),
  phone: z.string().max(20).optional(),
  ...BaseFields,
}).strict();

const PurchaseItemSchema = z.object({
  item_id: z.string().max(S),
  item_name: z.string().max(S),
  item_category: z.string().max(S).optional(),
  item_category2: z.string().max(S).optional(),
  item_brand: z.string().max(S).optional(),
  item_variant: z.string().max(S).optional(),
  price: z.number().nonnegative().max(999_999_999).optional(),
  quantity: z.number().int().positive().max(10_000).optional(),
  currency: z.string().length(3).optional(),
  index: z.number().int().nonnegative().optional(),
  affiliation: z.string().max(S).optional(),
  coupon: z.string().max(S).optional(),
  discount: z.number().nonnegative().max(999_999_999).optional(),
}).strict();

const PurchaseSchema = z.object({
  type: z.literal('purchase'),
  transactionId: z.string().min(1).max(64),
  items: z.array(PurchaseItemSchema).min(1).max(100),
  value: z.number().nonnegative().max(999_999_999),
  currency: z.string().length(3),
  shipping: z.number().nonnegative().max(999_999_999).optional(),
  tax: z.number().nonnegative().max(999_999_999).optional(),
  email: z.email().max(254).optional(),
  phone: z.string().max(20).optional(),
  firstName: z.string().max(100).optional(),
  lastName: z.string().max(100).optional(),
  ...BaseFields,
}).strict();

const BeaconSchema = z.discriminatedUnion('type', [LeadSchema, ContactSchema, PurchaseSchema]);

type BeaconPayload = z.infer<typeof BeaconSchema>;

// -- SHA-256 --

async function sha256(value: string): Promise<string> {
  const data = new TextEncoder().encode(value.trim().toLowerCase());
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// -- Rate limit --

const rlMap = new Map<string, number[]>();
const RL_WINDOW = 60_000;
const RL_MAX = 10;
const RL_MAP_MAX = 5_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const ts = (rlMap.get(ip) || []).filter(t => now - t < RL_WINDOW);
  if (ts.length >= RL_MAX) return true;
  ts.push(now);
  rlMap.set(ip, ts);
  if (rlMap.size > RL_MAP_MAX) {
    for (const [k, v] of rlMap) { if (v.every(t => now - t > RL_WINDOW)) rlMap.delete(k); }
  }
  return false;
}

// -- Origin check --

function isOriginAllowed(req: Request, env: Record<string, string>): boolean {
  const origin = req.headers.get('Origin') || '';
  const referer = req.headers.get('Referer') || '';
  const raw = env.ALLOWED_ORIGINS;
  // Fail-closed: if no allowlist configured, reject in prod and dev alike.
  // Configure ALLOWED_ORIGINS=https://skinlabhungary.hu,http://localhost:4321 to enable.
  if (!raw) {
    console.error('[Track] ALLOWED_ORIGINS not set — rejecting request (fail-closed).');
    return false;
  }
  const allowed = raw.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
  const check = (origin || referer).toLowerCase();
  if (!check) return false;
  return allowed.some(a => check.startsWith(a));
}

// -- Meta CAPI --

async function sendMeta(p: BeaconPayload, ip: string, env: Record<string, string>): Promise<boolean> {
  const pid = env.META_PIXEL_ID, tok = env.META_ACCESS_TOKEN;
  if (!pid || !tok) return false;

  const ud: Record<string, unknown> = {
    client_ip_address: ip,
    client_user_agent: p.userAgent || '',
  };
  if ('email' in p && p.email) ud.em = [await sha256(normalizeEmail(p.email))];
  if ('phone' in p && p.phone && p.phone.length >= 8) {
    ud.ph = [await sha256(normalizePhone(p.phone))];
  }
  if ('firstName' in p && p.firstName) ud.fn = [await sha256(p.firstName.trim().toLowerCase())];
  if ('lastName' in p && p.lastName) ud.ln = [await sha256(p.lastName.trim().toLowerCase())];
  if (p.fbp) ud.fbp = p.fbp;
  if (p.fbc) ud.fbc = p.fbc;

  const evName = p.type === 'contact' ? 'Contact'
               : p.type === 'purchase' ? 'Purchase'
               : 'Lead';
  const cd: Record<string, unknown> = {};

  if (p.type === 'purchase') {
    cd.value = p.value;
    cd.currency = p.currency;
    cd.content_type = 'product';
    cd.content_ids = p.items.map(i => i.item_id);
    cd.contents = p.items.map(i => ({
      id: i.item_id,
      quantity: i.quantity || 1,
      item_price: i.price || 0,
    }));
    cd.num_items = p.items.length;
    cd.order_id = p.transactionId;
  } else {
    if ('value' in p && p.value && p.value > 0) {
      cd.value = p.value;
      cd.currency = ('currency' in p && p.currency) || 'HUF';
    }
    if ('contentName' in p && p.contentName) cd.content_name = p.contentName;
  }

  const ev: Record<string, unknown> = {
    event_name: evName,
    event_time: Math.floor(Date.now() / 1000),
    action_source: 'website',
    event_source_url: p.url || p.pageUrl || '',
    event_id: p.eventId,
    user_data: ud,
  };
  if (Object.keys(cd).length) ev.custom_data = cd;

  try {
    // Token moved to request body (Meta CAPI supports either query OR body field).
    // Body-based avoids leaking the access_token via URL into CF logs / response error text.
    const r = await fetch(
      `https://graph.facebook.com/v24.0/${pid}/events`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: [ev], access_token: tok }),
        signal: AbortSignal.timeout(5_000),
      },
    );
    if (!r.ok) {
      // Read the response, but redact any echoed token before logging.
      const errBody = (await r.text()).replace(tok, '[REDACTED]');
      console.error('[Track] Meta CAPI:', r.status, errBody);
      return false;
    }
    return true;
  } catch (e) { console.error('[Track] Meta CAPI failed:', e); return false; }
}

// -- GA4 Measurement Protocol --
//
// Mirrors the client-side gtag conversion via GA4 MP. Uses the same `event_id`
// so GA4 dedups against the client-side hit. Enhanced Conversions matching:
// hashed `sha256_email_address` + `sha256_phone_number` in user_data.
// Docs: https://developers.google.com/analytics/devguides/collection/protocol/ga4

async function sendGA4MP(p: BeaconPayload, env: Record<string, string>): Promise<boolean> {
  const mid = env.GA4_MEASUREMENT_ID, sec = env.GA4_MP_API_SECRET;
  if (!mid || !sec) return false;

  // client_id ideally comes from the _ga cookie (read it from the request and
  // forward via the beacon if you want stitching with client GA4 hits). Until
  // then sessionId is the most stable per-session identity available server-side.
  const clientId = p.sessionId || `srv-${p.eventId}`;

  const evName = p.type === 'purchase' ? 'purchase'
               : p.type === 'lead'     ? 'lead_submit'
               : 'contact_submit';

  const params: Record<string, unknown> = {
    event_id: p.eventId,
    engagement_time_msec: 100,
  };
  if (p.sessionId) params.session_id = p.sessionId;

  if (p.type === 'purchase') {
    params.transaction_id = p.transactionId;
    params.value = p.value;
    params.currency = p.currency;
    if (p.shipping != null) params.shipping = p.shipping;
    if (p.tax != null) params.tax = p.tax;
    params.items = p.items;
  } else {
    if ('value' in p && p.value != null) params.value = p.value;
    if ('currency' in p && p.currency) params.currency = p.currency;
    if ('contentName' in p && p.contentName) params.content_name = p.contentName;
  }

  // Enhanced Conversions: SHA-256 hashed PII in user_data
  const userData: Record<string, unknown> = {};
  if ('email' in p && p.email) {
    userData.sha256_email_address = [await sha256(normalizeEmail(p.email))];
  }
  if ('phone' in p && p.phone && p.phone.length >= 8) {
    userData.sha256_phone_number = [await sha256(normalizePhone(p.phone))];
  }
  const address: Record<string, string> = {};
  if ('firstName' in p && p.firstName) {
    address.sha256_first_name = await sha256(p.firstName.trim().toLowerCase());
  }
  if ('lastName' in p && p.lastName) {
    address.sha256_last_name = await sha256(p.lastName.trim().toLowerCase());
  }
  if (Object.keys(address).length) userData.address = [address];

  const body: Record<string, unknown> = {
    client_id: clientId,
    events: [{ name: evName, params }],
  };
  if (Object.keys(userData).length) body.user_data = userData;

  try {
    const r = await fetch(
      `https://www.google-analytics.com/mp/collect?measurement_id=${encodeURIComponent(mid)}&api_secret=${encodeURIComponent(sec)}`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body), signal: AbortSignal.timeout(5_000) },
    );
    // MP returns 204 on success; any 2xx is OK.
    if (!r.ok) {
      console.error('[Track] GA4 MP:', r.status, await r.text().catch(() => ''));
      return false;
    }
    return true;
  } catch (e) { console.error('[Track] GA4 MP failed:', e); return false; }
}

// -- Route --

const MAX_BODY = 32 * 1024;

export const POST: APIRoute = async ({ request, clientAddress, locals }) => {
  const ip = clientAddress || 'unknown';
  const runtime = (locals as unknown as {
    runtime?: {
      env: Record<string, string>;
      ctx?: { waitUntil: (p: Promise<unknown>) => void };
    };
  }).runtime;
  const env = runtime?.env ?? {} as Record<string, string>;
  const ctx = runtime?.ctx;

  // Fast-fail on shared token (if configured) BEFORE doing any expensive work.
  const token = env.TRACK_TOKEN;
  if (token && request.headers.get('x-track-token') !== token) {
    return errorResponse('HTTP-401-002', {
      userMessage: 'A tracking végpont tokenje hiányzik vagy érvénytelen.',
      context: { endpoint: '/api/track', keyPrefix: 'x-track-token' },
      extraHeaders: { 'Cache-Control': 'no-store' },
    });
  }

  // NOTE: this is an in-memory rate limit which does NOT survive across Workers
  // isolates. It's best-effort only. For production move to KV/Durable Object.
  if (isRateLimited(ip)) {
    return errorResponse('HTTP-429-001', {
      userMessage: 'Túl sok tracking kérés rövid időn belül — 60 másodperc után próbálja újra.',
      context: { endpoint: '/api/track', ip },
      extraHeaders: { 'Cache-Control': 'no-store' },
    });
  }

  const cl = parseInt(request.headers.get('Content-Length') || '0', 10);
  if (cl > MAX_BODY) {
    return errorResponse('HTTP-413-001', {
      userMessage: `A tracking payload túl nagy (>${Math.round(MAX_BODY / 1024)} KB).`,
      context: { endpoint: '/api/track', bodySize: cl },
      extraHeaders: { 'Cache-Control': 'no-store' },
    });
  }

  let text: string;
  try { text = await request.text(); } catch {
    return errorResponse('SRV-PARSE-003', {
      userMessage: 'A tracking kérés törzse nem olvasható (encoding hiba).',
      context: { endpoint: '/api/track' },
      extraHeaders: { 'Cache-Control': 'no-store' },
    });
  }
  if (text.length > MAX_BODY) {
    return errorResponse('HTTP-413-001', {
      userMessage: `A tracking payload túl nagy (>${Math.round(MAX_BODY / 1024)} KB).`,
      context: { endpoint: '/api/track', bodySize: text.length },
      extraHeaders: { 'Cache-Control': 'no-store' },
    });
  }

  let raw: unknown;
  try { raw = JSON.parse(text); } catch {
    return errorResponse('SRV-PARSE-001', {
      userMessage: 'A tracking kérés JSON formátuma érvénytelen.',
      context: { endpoint: '/api/track', contentType: request.headers.get('Content-Type') || 'unknown' },
      extraHeaders: { 'Cache-Control': 'no-store' },
    });
  }

  const parsed = BeaconSchema.safeParse(raw);
  if (!parsed.success) {
    return errorResponse('FORM-ZOD-002', {
      userMessage: 'A tracking payload nem felel meg a sémának — nézze meg a details mezőt.',
      details: z.flattenError(parsed.error).fieldErrors,
      context: { endpoint: '/api/track' },
      extraHeaders: { 'Cache-Control': 'no-store' },
    });
  }

  const payload = parsed.data;

  if (!isOriginAllowed(request, env)) {
    return errorResponse('SRV-CORS-002', {
      userMessage: 'Tiltott forrás (origin nem szerepel az allowlistán).',
      context: {
        endpoint: '/api/track',
        origin: request.headers.get('Origin') || 'unknown',
      },
      extraHeaders: { 'Cache-Control': 'no-store' },
    });
  }

  // Fire both forwarders in parallel — independent destinations.
  const [metaOk, ga4Ok] = await Promise.all([
    sendMeta(payload, ip, env),
    sendGA4MP(payload, env),
  ]);

  const sheets = env.TRACKING_SHEETS_WEBHOOK;
  if (sheets) {
    // Use waitUntil to ensure the request completes even after the response is sent.
    // Without it, CF may terminate the worker before the fetch finishes.
    const sheetsPromise = fetch(sheets, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, receivedAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(5_000),
    }).catch((e) => { console.error('[Track] Sheets webhook failed:', e); });
    if (ctx?.waitUntil) ctx.waitUntil(sheetsPromise);
  }

  return new Response(
    JSON.stringify({ ok: true, meta_sent: metaOk, ga4_sent: ga4Ok, event_id: payload.eventId }),
    { status: 200, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } }
  );
};

export const GET: APIRoute = () =>
  errorResponse('FORM-METHOD-001', {
    userMessage: 'Ez a végpont csak POST kéréseket fogad (tracking beacon).',
    context: { endpoint: '/api/track', method: 'GET' },
    extraHeaders: { Allow: 'POST' },
  });
