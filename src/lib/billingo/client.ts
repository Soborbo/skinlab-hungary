/**
 * Billingo API v3 HTTP kliens.
 *
 * - `X-API-KEY` autentikáció (NEM `Authorization: Bearer`).
 * - Retry exponential backoff-fal 5xx és 429 esetén (max 3 próba).
 * - Strukturált hiba: `BillingoApiError` az error code + statusCode-dal.
 * - `fetch` natív API - Cloudflare Workers és Node 18+ kompatibilis.
 */
import type { OrderEnv } from '@/lib/order/env';
import { getEnvValue } from '@/lib/order/env';

const DEFAULT_API_URL = 'https://api.billingo.hu/v3';
const REQUEST_TIMEOUT_MS = 15_000;
// Retry backoff. Sum kept ~6s so worst-case wall clock stays well within the
// Cloudflare Workers 30s limit (was [1000, 3000, 9000] = 13s sleep alone).
const RETRY_DELAYS_MS = [500, 1_500, 4_000];

export interface BillingoConfig {
  apiKey: string;
  apiUrl: string;
  blockId: number;
  bankAccountId: number;
}

/** Strukturált hiba kód + statusCode-dal a registry-hez illesztve. */
export class BillingoApiError extends Error {
  readonly code: string;
  readonly statusCode: number | null;
  readonly retryable: boolean;
  readonly body: unknown;

  constructor(opts: {
    code: string;
    message: string;
    statusCode: number | null;
    retryable: boolean;
    body?: unknown;
  }) {
    super(opts.message);
    this.name = 'BillingoApiError';
    this.code = opts.code;
    this.statusCode = opts.statusCode;
    this.retryable = opts.retryable;
    this.body = opts.body;
  }
}

/**
 * Konfiguráció betöltése env-ből. Üres kulcs esetén `BILLINGO-CFG-*` dob.
 */
export function loadBillingoConfig(env: OrderEnv): BillingoConfig {
  const apiKey = getEnvValue(env, 'BILLINGO_API_KEY');
  if (!apiKey) {
    throw new BillingoApiError({
      code: 'BILLINGO-CFG-001',
      message: 'BILLINGO_API_KEY hiányzik',
      statusCode: null,
      retryable: false,
    });
  }

  const blockIdRaw = getEnvValue(env, 'BILLINGO_BLOCK_ID');
  const blockId = blockIdRaw ? Number.parseInt(blockIdRaw, 10) : Number.NaN;
  if (!Number.isFinite(blockId) || blockId <= 0) {
    throw new BillingoApiError({
      code: 'BILLINGO-CFG-002',
      message: 'BILLINGO_BLOCK_ID hiányzik vagy érvénytelen',
      statusCode: null,
      retryable: false,
    });
  }

  const bankIdRaw = getEnvValue(env, 'BILLINGO_BANK_ACCOUNT_ID');
  const bankAccountId = bankIdRaw ? Number.parseInt(bankIdRaw, 10) : Number.NaN;
  if (!Number.isFinite(bankAccountId) || bankAccountId <= 0) {
    throw new BillingoApiError({
      code: 'BILLINGO-CFG-003',
      message: 'BILLINGO_BANK_ACCOUNT_ID hiányzik vagy érvénytelen',
      statusCode: null,
      retryable: false,
    });
  }

  return {
    apiKey,
    apiUrl: getEnvValue(env, 'BILLINGO_API_URL') || DEFAULT_API_URL,
    blockId,
    bankAccountId,
  };
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

interface BillingoRequest {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  query?: Record<string, string | number | undefined>;
  body?: unknown;
}

function buildUrl(baseUrl: string, path: string, query?: BillingoRequest['query']): string {
  const url = new URL(path.replace(/^\//, ''), baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`);
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.set(key, String(value));
      }
    }
  }
  return url.toString();
}

/** Egy próbálkozás - visszaadja a JSON-t vagy dob `BillingoApiError`-t. */
async function executeOnce<T>(
  config: BillingoConfig,
  request: BillingoRequest,
): Promise<T> {
  const url = buildUrl(config.apiUrl, request.path, request.query);
  const controller = new AbortController();
  const timeoutHandle = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  const startedAt = Date.now();
  let httpResponse: Response;
  try {
    httpResponse = await fetch(url, {
      method: request.method,
      headers: {
        'X-API-KEY': config.apiKey,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: request.body === undefined ? undefined : JSON.stringify(request.body),
      signal: controller.signal,
    });
  } catch (caught) {
    const msg = caught instanceof Error ? caught.message : String(caught);
    const aborted = caught instanceof Error && caught.name === 'AbortError';
    throw new BillingoApiError({
      code: aborted ? 'BILLINGO-NET-002' : 'BILLINGO-NET-001',
      message: aborted ? `Billingo timeout (${Date.now() - startedAt}ms)` : `Billingo network: ${msg}`,
      statusCode: null,
      retryable: true,
    });
  } finally {
    clearTimeout(timeoutHandle);
  }

  let parsedBody: unknown = null;
  const contentType = httpResponse.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    try {
      parsedBody = await httpResponse.json();
    } catch {
      parsedBody = null;
    }
  } else {
    try {
      parsedBody = await httpResponse.text();
    } catch {
      parsedBody = null;
    }
  }

  if (httpResponse.ok) {
    return parsedBody as T;
  }

  const status = httpResponse.status;
  if (status === 401 || status === 403) {
    throw new BillingoApiError({
      code: 'BILLINGO-AUTH-001',
      message: `Billingo auth elutasítva (${status})`,
      statusCode: status,
      retryable: false,
      body: parsedBody,
    });
  }
  if (status === 429) {
    throw new BillingoApiError({
      code: 'BILLINGO-RATE-001',
      message: 'Billingo rate limit',
      statusCode: status,
      retryable: true,
      body: parsedBody,
    });
  }
  if (status >= 500) {
    throw new BillingoApiError({
      code: 'BILLINGO-SRV-001',
      message: `Billingo szerverhiba (${status})`,
      statusCode: status,
      retryable: true,
      body: parsedBody,
    });
  }

  // 4xx (nem 401/403/429): payload-hiba, nem retryable.
  // A hívó (partners/documents) dönti el a végleges kódot - itt egy generikus
  // payload-hibát dobunk, és a body-t átadjuk.
  throw new BillingoApiError({
    code: 'BILLINGO-DOC-001',
    message: `Billingo 4xx (${status})`,
    statusCode: status,
    retryable: false,
    body: parsedBody,
  });
}

/**
 * Billingo API hívás retry-jal (1s → 3s → 9s).
 * Csak retryable hibák ismétlődnek; 4xx (kivéve 429) azonnal kidobódik.
 */
export async function executeBillingoRequest<T>(
  config: BillingoConfig,
  request: BillingoRequest,
): Promise<T> {
  let lastError: BillingoApiError | null = null;

  for (let attempt = 0; attempt <= RETRY_DELAYS_MS.length; attempt += 1) {
    try {
      return await executeOnce<T>(config, request);
    } catch (caught) {
      if (!(caught instanceof BillingoApiError)) {
        throw caught;
      }
      lastError = caught;
      if (!caught.retryable || attempt === RETRY_DELAYS_MS.length) {
        throw caught;
      }
      await sleep(RETRY_DELAYS_MS[attempt]);
    }
  }

  // Elérhetetlen ág - a ciklus mindig dob vagy visszatér.
  throw lastError ?? new BillingoApiError({
    code: 'BILLINGO-NET-001',
    message: 'Billingo: ismeretlen hiba',
    statusCode: null,
    retryable: false,
  });
}
