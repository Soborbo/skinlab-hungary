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

/** HU zod message (schemas.ts / order/schema.ts) -> formErrors.fields.* key. */
const FIELD_MESSAGE_KEYS: Record<string, string> = {
  'A név megadása kötelező': 'name',
  'A vezetéknév megadása kötelező': 'lastName',
  'A keresztnév megadása kötelező': 'firstName',
  'Érvényes email cím szükséges': 'email',
  'Érvényes e-mail cím szükséges': 'email',
  'Érvényes telefonszám szükséges': 'phone',
  'Az adatvédelmi hozzájárulás kötelező': 'consent',
  'Az adatkezelési hozzájárulás kötelező': 'consent',
  'A form túl gyorsan lett kitöltve': 'tooFast',
  'CAPTCHA ellenőrzés szükséges': 'captcha',
  'Válasszon kategóriát': 'category',
  'Válasszon időzítést': 'timing',
  'Válasszon vállalkozás típust': 'businessType',
  'Válasszon tapasztalati szintet': 'experience',
  'Az ország megadása kötelező': 'country',
  'Az irányítószám megadása kötelező': 'postcode',
  'A város megadása kötelező': 'city',
  'Az utca, házszám megadása kötelező': 'street',
  'A kosár üres': 'cartEmpty',
};

/** Zod field errors -> the visitor's language (unknown messages -> generic validation text). */
export function localizeFieldErrors(
  locale: Locale,
  errors: Record<string, string[]> | undefined,
): Record<string, string[]> | undefined {
  if (!errors || locale === defaultLocale) return errors;
  return Object.fromEntries(
    Object.entries(errors).map(([field, messages]) => [
      field,
      messages.map((m) => {
        const key = FIELD_MESSAGE_KEYS[m];
        return key ? formError(locale, `fields.${key}`) : formError(locale, 'validation');
      }),
    ]),
  );
}
