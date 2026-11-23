/**
 * Localized user-facing form error texts (i18n namespace `formErrors`).
 *
 * Server: the form APIs pick the locale from the body (`locale`, order) or from
 * the same-origin Referer path (/de/…), falling back to HU.
 * Client: `clientErrorMessages(locale)` is rendered into a data attribute and
 * passed to `describeClientError` (submit-client.ts), keyed by error code.
 */
import { t, getLocaleFromUrl, locales, defaultLocale, type Locale } from '@/i18n/ui';

export function requestLocale(request: Request, explicit?: unknown): Locale {
  if (typeof explicit === 'string' && locales.includes(explicit as Locale)) return explicit as Locale;
  const referer = request.headers.get('referer');
  if (!referer) return defaultLocale;
  try {
    return getLocaleFromUrl(new URL(referer));
  } catch {
    return defaultLocale;
  }
}

export function formError(locale: Locale, key: string): string {
  return t(locale, `formErrors.${key}`);
}

/** Client-side error code -> localized message (consumed by describeClientError). */
export function clientErrorMessages(locale: Locale): Record<string, string> {
  return {
    'FORM-SUBMIT-001': formError(locale, 'serverError'),
    'FORM-FETCH-002': formError(locale, 'unexpectedResponse'),
    'NET-OFFLINE-001': formError(locale, 'offline'),
    'FORM-FETCH-003': formError(locale, 'timeout'),
    'FORM-FETCH-001': formError(locale, 'network'),
  };
}
