// src/lib/errors/respond.ts
// Small helper turning an error code into a descriptive JSON response.
// Uses the registry in codes.ts to attach a specific message + severity
// so users (and logs) see what actually went wrong instead of a generic
// "Hiba történt..." string.

import { ALL_CODES } from './codes';
import type { ErrorContext, Severity } from './types';

export interface ErrorResponseBody {
  success: false;
  code: string;
  severity: Severity;
  error: string;
  retryable: boolean;
  userImpact: 'blocked' | 'degraded' | 'none';
  errors?: Record<string, string[]>;
  details?: unknown;
}

export interface ErrorResponseOptions {
  status?: number;
  userMessage?: string;
  errors?: Record<string, string[]>;
  details?: unknown;
  context?: ErrorContext;
  extraHeaders?: Record<string, string>;
}

const DEFAULT_MESSAGE = 'Ismeretlen hiba történt.';

// Code-prefix → HTTP status mapping for semantic correctness.
// Falls back to severity-based defaults if no prefix match.
const PREFIX_STATUS: Array<[RegExp, number]> = [
  [/^SRV-CORS-/, 403],          // Forbidden origin
  [/^FORM-METHOD-/, 405],       // Method Not Allowed
  [/^ORDER-EMPTY-/, 422],       // Unprocessable entity
  [/^FORM-ZOD-/, 422],          // Validation failed
  [/^ORDER-ZOD-/, 422],
  [/^FORM-TURNSTILE-/, 403],    // CAPTCHA rejected
  [/^FORM-HONEYPOT-/, 400],
  [/^FORM-SPAMTIME-/, 400],
];

function statusFromCode(code: string, severity: Severity): number {
  const httpMatch = code.match(/^HTTP-(\d{3})/);
  if (httpMatch) {
    const n = Number.parseInt(httpMatch[1], 10);
    if (n >= 100 && n <= 599) return n;
  }
  for (const [pattern, status] of PREFIX_STATUS) {
    if (pattern.test(code)) return status;
  }
  if (severity === 'CRITICAL' || severity === 'ERROR') return 500;
  if (severity === 'WARN') return 400;
  return 200;
}

function logSeverity(severity: Severity, payload: unknown): void {
  if (severity === 'CRITICAL' || severity === 'ERROR') {
    console.error('[err]', payload);
  } else if (severity === 'WARN') {
    console.warn('[err]', payload);
  } else {
    console.info('[err]', payload);
  }
}

/**
 * Build a descriptive error response from a registered error code.
 * Unknown codes fall back to a generic 500 so the site still responds.
 */
export function errorResponse(
  code: string,
  options: ErrorResponseOptions = {}
): Response {
  const def = ALL_CODES[code];
  const severity = def?.severity ?? 'ERROR';
  const retryable = def?.retryable ?? false;
  const userImpact = def?.userImpact ?? 'degraded';
  const registryMessage = def?.message ?? DEFAULT_MESSAGE;
  const userMessage = options.userMessage ?? registryMessage;
  const status = options.status ?? statusFromCode(code, severity);

  const body: ErrorResponseBody = {
    success: false,
    code,
    severity,
    error: userMessage,
    retryable,
    userImpact,
  };
  if (options.errors) body.errors = options.errors;
  if (options.details !== undefined) body.details = options.details;

  logSeverity(severity, {
    code,
    status,
    message: registryMessage,
    context: options.context,
  });

  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...(options.extraHeaders ?? {}),
    },
  });
}

/**
 * Strukturált hibalog HTTP válasz nélkül - observability-hez.
 *
 * Ugyanazt a `[err]` payload-formátumot és severity-alapú console-szintet
 * használja, mint az `errorResponse` (így a Cloudflare Workers Logs /
 * Logpush ugyanúgy szűrhető rá), de NEM épít Response-t. Olyan
 * háttér-csatornákhoz való, amelyek nem a kérés-választ blokkolják, de a
 * hibát/kihagyást látni akarjuk a logban - pl. a Billingo díjbekérő
 * csendes kihagyása hiányzó konfig miatt.
 */
export function logError(code: string, context?: ErrorContext): void {
  const def = ALL_CODES[code];
  const severity = def?.severity ?? 'ERROR';
  logSeverity(severity, {
    code,
    severity,
    message: def?.message ?? DEFAULT_MESSAGE,
    context,
  });
}

/**
 * Look up the descriptive message for a code without producing a Response.
 * Useful for in-process logging or composing error text.
 */
export function describeError(code: string): string {
  return ALL_CODES[code]?.message ?? DEFAULT_MESSAGE;
}
