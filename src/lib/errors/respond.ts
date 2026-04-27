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

function statusFromCode(code: string, severity: Severity): number {
  const match = code.match(/^HTTP-(\d{3})/);
  if (match) {
    const n = Number.parseInt(match[1], 10);
    if (n >= 100 && n <= 599) return n;
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
 * Look up the descriptive message for a code without producing a Response.
 * Useful for in-process logging or composing error text.
 */
export function describeError(code: string): string {
  return ALL_CODES[code]?.message ?? DEFAULT_MESSAGE;
}
