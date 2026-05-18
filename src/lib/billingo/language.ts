/**
 * Astro locale → Billingo számlanyelv leképezés.
 *
 * A webshop 9 lokálban fut (hu/en/sk/ro/de/cs/hr/sr/sl), Billingo viszont
 * nem támogat szerb és szlovén nyelvet. Ezeket angolra fordítjuk át (lásd
 * a tervezett user-döntést: `sr`, `sl` → `en` fallback).
 */
import type { Locale } from '@/i18n/ui';
import type { BillingoLanguage } from './types';

const DIRECT_MAP: Partial<Record<Locale, BillingoLanguage>> = {
  hu: 'hu',
  en: 'en',
  de: 'de',
  cs: 'cs',
  sk: 'sk',
  ro: 'ro',
  hr: 'hr',
};

export interface LanguageMappingResult {
  language: BillingoLanguage;
  /** Igaz, ha a kért lokál nem volt közvetlenül támogatott. */
  fellBack: boolean;
  requested: Locale;
}

/**
 * Visszaadja a Billingo-kompatibilis nyelvet egy Astro locale-hoz.
 *
 * Nem támogatott (`sr`, `sl`) → `en` fallback. A `fellBack` mező jelzi,
 * hogy érdemes loggolni (BILLINGO-LOCALE-001).
 */
export function mapLocaleToBillingo(locale: Locale): LanguageMappingResult {
  const direct = DIRECT_MAP[locale];
  if (direct) {
    return { language: direct, fellBack: false, requested: locale };
  }
  return { language: 'en', fellBack: true, requested: locale };
}
