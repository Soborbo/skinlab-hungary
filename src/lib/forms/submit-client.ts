/**
 * Shared client-side helpers for form submission error handling.
 *
 * Background: every form used to call `await response.json()` directly inside a
 * try block and then label ANY thrown error `[NET-OFFLINE-001]` ("offline") in
 * the catch. That mislabels server 5xx, HTML redirect bodies (e.g. a
 * trailing-slash 308 the browser followed), Cloudflare WAF/error pages and
 * empty-body responses as connectivity problems — exactly the failure that hid
 * a broken `/api/consultation` POST behind a phantom "offline" message.
 *
 * These helpers classify the real failure so the user (and the debug console)
 * get an accurate code from the registry in `src/lib/errors/codes.ts`.
 *
 * Browser-only module: relies on `Response`, `navigator`, `DOMException`. Do not
 * import server-only code here.
 */

/** Permissive shape of the JSON envelope every form API returns. */
export interface FormApiResult {
  success?: boolean;
  code?: string;
  error?: string;
  errors?: Record<string, string[]>;
  leadId?: string;
  orderId?: string;
  [key: string]: unknown;
}

export interface ClientErrorInfo {
  /** Error code from the shared registry (src/lib/errors/codes.ts). */
  code: string;
  /** User-facing Hungarian message, prefixed with the code. */
  message: string;
}

/** Property used to tag errors thrown by readJsonResponse so the catch can read the code back. */
const CODE_TAG = '__slCode';

function tagError(code: string, detail: string): Error {
  const err = new Error(`[${code}] ${detail}`);
  (err as unknown as Record<string, unknown>)[CODE_TAG] = code;
  return err;
}

/**
 * Parse a fetch Response as JSON, raising a *classified* error when the server
 * did not return the expected JSON envelope. Prevents an opaque
 * `SyntaxError: Unexpected end of JSON input` (from an HTML redirect page,
 * empty 5xx, or WAF block) from bubbling into the catch and being mislabeled
 * as "offline".
 *
 * - 5xx + non-JSON  -> FORM-SUBMIT-001 (server error)
 * - other non-JSON  -> FORM-FETCH-002 (unexpected non-JSON response)
 */
export async function readJsonResponse(response: Response): Promise<FormApiResult> {
  const contentType = response.headers.get('content-type') || '';
  const looksJson = contentType.includes('application/json');
  const serverCode = response.status >= 500 ? 'FORM-SUBMIT-001' : 'FORM-FETCH-002';

  if (!looksJson) {
    throw tagError(
      serverCode,
      `Non-JSON response (status ${response.status}, content-type "${contentType || 'none'}")`,
    );
  }

  try {
    return (await response.json()) as FormApiResult;
  } catch {
    // Declared JSON but the body was empty or truncated.
    throw tagError(serverCode, `Malformed JSON body (status ${response.status})`);
  }
}

/**
 * Classify a thrown submit error into a user-facing code + Hungarian message.
 * "Offline" is only reported when the browser is actually offline; everything
 * else maps to the appropriate network / server code.
 *
 * For multilingual forms, use only `.code` and keep your own localized text.
 */
export function describeClientError(error: unknown): ClientErrorInfo {
  const tagged = (error as Record<string, unknown> | null | undefined)?.[CODE_TAG];

  if (tagged === 'FORM-SUBMIT-001') {
    return {
      code: 'FORM-SUBMIT-001',
      message: '[FORM-SUBMIT-001] A szerver hibát jelzett a feldolgozás során. Kérlek, próbáld újra később.',
    };
  }
  if (tagged === 'FORM-FETCH-002') {
    return {
      code: 'FORM-FETCH-002',
      message: '[FORM-FETCH-002] Váratlan szerverválasz érkezett. Kérlek, próbáld újra később.',
    };
  }

  // Genuinely offline.
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    return {
      code: 'NET-OFFLINE-001',
      message: '[NET-OFFLINE-001] Nincs internetkapcsolat. Ellenőrizd a hálózatot, és próbáld újra.',
    };
  }

  // Request aborted (e.g. AbortSignal.timeout).
  if (error instanceof DOMException && error.name === 'AbortError') {
    return {
      code: 'FORM-FETCH-003',
      message: '[FORM-FETCH-003] A kérés időtúllépés miatt megszakadt. Kérlek, próbáld újra.',
    };
  }

  // fetch() TypeError while online: DNS / connection refused / CORS.
  return {
    code: 'FORM-FETCH-001',
    message: '[FORM-FETCH-001] Hálózati hiba történt a beküldés során. Kérlek, próbáld újra.',
  };
}
