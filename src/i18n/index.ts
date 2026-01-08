/**
 * i18n Index
 *
 * Re-exports all i18n utilities for convenient imports.
 * Usage: import { t, locales, getLocaleFromUrl } from '@/i18n';
 */

export {
  // Types
  type Locale,
  type TranslationKeys,

  // Constants
  defaultLocale,
  locales,
  localeConfig,
  DOMAINS,

  // Functions
  t,
  getLocaleFromUrl,
  getLocalizedPath,
  getLocalizedUrl,
  getHreflangLinks,
  isRTL,
  getHtmlLang,
  formatDate,
  formatPrice,
} from './ui';
