// ============================================
// SKINLAB HUNGARY - Internationalization (i18n)
// ============================================

import hu from './hu.json';
import en from './en.json';
import sk from './sk.json';
import ro from './ro.json';
import de from './de.json';
import cs from './cs.json';
import hr from './hr.json';
import sr from './sr.json';
import sl from './sl.json';

// All available translations
const translations = { hu, en, sk, ro, de, cs, hr, sr, sl } as const;

// Domain configuration
export const DOMAINS = {
  hungarian: 'https://skinlabhungary.hu',
  europe: 'https://skinlabeurope.com',
} as const;

// Type definitions
export type Locale = keyof typeof translations;
export type TranslationKeys = keyof typeof hu;

// Default locale is Hungarian (base language)
export const defaultLocale: Locale = 'hu';

// All supported locales
export const locales = Object.keys(translations) as Locale[];

// Locale metadata for display
export const localeConfig: Record<Locale, {
  name: string;
  nativeName: string;
  flag: string;
  hreflang: string;
  dateLocale: string;
}> = {
  hu: {
    name: 'Hungarian',
    nativeName: 'Magyar',
    flag: '🇭🇺',
    hreflang: 'hu',
    dateLocale: 'hu-HU',
  },
  en: {
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
    hreflang: 'en',
    dateLocale: 'en-GB',
  },
  sk: {
    name: 'Slovak',
    nativeName: 'Slovenčina',
    flag: '🇸🇰',
    hreflang: 'sk',
    dateLocale: 'sk-SK',
  },
  ro: {
    name: 'Romanian',
    nativeName: 'Română',
    flag: '🇷🇴',
    hreflang: 'ro',
    dateLocale: 'ro-RO',
  },
  de: {
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    hreflang: 'de',
    dateLocale: 'de-DE',
  },
  cs: {
    name: 'Czech',
    nativeName: 'Čeština',
    flag: '🇨🇿',
    hreflang: 'cs',
    dateLocale: 'cs-CZ',
  },
  hr: {
    name: 'Croatian',
    nativeName: 'Hrvatski',
    flag: '🇭🇷',
    hreflang: 'hr',
    dateLocale: 'hr-HR',
  },
  sr: {
    name: 'Serbian',
    nativeName: 'Srpski',
    flag: '🇷🇸',
    hreflang: 'sr',
    dateLocale: 'sr-RS',
  },
  sl: {
    name: 'Slovenian',
    nativeName: 'Slovenščina',
    flag: '🇸🇮',
    hreflang: 'sl',
    dateLocale: 'sl-SI',
  },
};

/**
 * Get nested value from object using dot notation
 * @example getValue({ nav: { home: 'Főoldal' } }, 'nav.home') => 'Főoldal'
 */
function getValue(obj: Record<string, unknown>, path: string): string | undefined {
  const keys = path.split('.');
  let value: unknown = obj;

  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = (value as Record<string, unknown>)[key];
    } else {
      return undefined;
    }
  }

  return typeof value === 'string' ? value : undefined;
}

/**
 * Get translation for a key in the specified locale
 * Falls back to default locale (Hungarian) if key not found
 * @param locale - The locale to get translation for
 * @param key - Dot-notation key (e.g., 'nav.home', 'hero.title')
 * @param params - Optional parameters for interpolation
 * @returns The translated string or the key if not found
 */
export function t(
  locale: Locale,
  key: string,
  params?: Record<string, string | number>
): string {
  // Try to get value from requested locale
  let value = getValue(translations[locale] as Record<string, unknown>, key);

  // Fallback to default locale if not found
  if (!value && locale !== defaultLocale) {
    value = getValue(translations[defaultLocale] as Record<string, unknown>, key);
  }

  // Return key if still not found
  if (!value) {
    console.warn(`Translation missing: ${key} (locale: ${locale})`);
    return key;
  }

  // Interpolate parameters if provided
  if (params) {
    return value.replace(/\{(\w+)\}/g, (_, paramKey) => {
      return params[paramKey]?.toString() ?? `{${paramKey}}`;
    });
  }

  return value;
}

/**
 * Extract locale from URL pathname
 * @param url - The URL object
 * @returns The locale from the URL or default locale
 */
export function getLocaleFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split('/');

  // Check if the first path segment is a valid locale (except default)
  if (lang && locales.includes(lang as Locale) && lang !== defaultLocale) {
    return lang as Locale;
  }

  return defaultLocale;
}

/**
 * Get localized path for a given locale
 * @param locale - Target locale
 * @param path - Current path
 * @returns Localized path (relative, without domain)
 */
export function getLocalizedPath(locale: Locale, path: string): string {
  // Remove any existing locale prefix
  const localePattern = new RegExp(`^/(${locales.join('|')})`);
  const cleanPath = path.replace(localePattern, '') || '/';

  // Default locale doesn't have prefix
  if (locale === defaultLocale) {
    return cleanPath;
  }

  // Add locale prefix for non-default locales
  return `/${locale}${cleanPath === '/' ? '' : cleanPath}`;
}

/**
 * Get full URL for a given locale (with correct domain)
 * Hungarian → skinlabhungary.hu
 * Other languages → skinlabeurope.com/[lang]
 * @param locale - Target locale
 * @param path - Current path
 * @returns Full URL with correct domain
 */
export function getLocalizedUrl(locale: Locale, path: string): string {
  // Remove any existing locale prefix
  const localePattern = new RegExp(`^/(${locales.join('|')})`);
  const cleanPath = path.replace(localePattern, '') || '/';

  // Hungarian uses skinlabhungary.hu without prefix
  if (locale === defaultLocale) {
    return `${DOMAINS.hungarian}${cleanPath}`;
  }

  // Other languages use skinlabeurope.com with prefix
  return `${DOMAINS.europe}/${locale}${cleanPath === '/' ? '' : cleanPath}`;
}

/**
 * Get all localized paths for hreflang tags
 * Uses correct domains: skinlabhungary.hu for HU, skinlabeurope.com for others
 * @param currentPath - Current page path
 * @returns Array of hreflang objects
 */
export function getHreflangLinks(currentPath: string): Array<{
  locale: Locale;
  hreflang: string;
  href: string;
}> {
  return locales.map((locale) => ({
    locale,
    hreflang: localeConfig[locale].hreflang,
    href: getLocalizedUrl(locale, currentPath),
  }));
}

/**
 * Check if a locale is RTL (Right-to-Left)
 * Currently all supported languages are LTR
 */
export function isRTL(_locale: Locale): boolean {
  return false;
}

/**
 * Get HTML lang attribute value for a locale
 */
export function getHtmlLang(locale: Locale): string {
  return localeConfig[locale].hreflang;
}

/**
 * Format a date according to locale
 */
export function formatDate(date: Date, locale: Locale): string {
  return date.toLocaleDateString(localeConfig[locale].dateLocale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format a price according to locale
 */
export function formatPrice(price: number, locale: Locale, currency: string = 'HUF'): string {
  return new Intl.NumberFormat(localeConfig[locale].dateLocale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}
