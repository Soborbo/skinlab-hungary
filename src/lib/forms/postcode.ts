/**
 * Magyar irányítószám → település / megye keresés.
 *
 * Az adatforrás a `hu-postcodes.json` (GeoNames-ből generálva,
 * lásd `scripts/generate-hu-postcodes.cjs`). A `/api/postcode`
 * végpont ezt használja a megrendelés-űrlap automatikus
 * város-/ország-kitöltéséhez.
 *
 * Csak a 4 számjegyű magyar irányítószámokat ismeri fel; minden
 * más (külföldi) formátumnál `null`-t ad vissza, így a vásárló
 * kézzel tölti ki a város/ország mezőt.
 */
import postcodes from './hu-postcodes.json';

interface RawEntry {
  city: string;
  county: string;
  alt?: string[];
}

export interface HuPostcodeResult {
  /** Elsődleges település. */
  city: string;
  /** Megye (Budapestnél: "Budapest"). */
  county: string;
  /** Ország – magyar irányítószámnál mindig "Magyarország". */
  country: string;
  /** Ugyanazon az irányítószámon osztozó további települések. */
  alt: string[];
}

const DATA = postcodes as Record<string, RawEntry>;

/** Magyar irányítószámhoz tartozó ország neve. */
export const HU_COUNTRY_NAME = 'Magyarország';

/**
 * Visszaadja az adott irányítószámhoz tartozó település/megye/ország
 * adatot, vagy `null`-t, ha nem 4 jegyű magyar irányítószám, illetve
 * ismeretlen.
 */
export function lookupHuPostcode(code: string): HuPostcodeResult | null {
  const normalized = (code || '').replace(/\D/g, '');
  if (!/^\d{4}$/.test(normalized)) return null;

  const entry = DATA[normalized];
  if (!entry) return null;

  return {
    city: entry.city,
    county: entry.county,
    country: HU_COUNTRY_NAME,
    alt: Array.isArray(entry.alt) ? entry.alt : [],
  };
}
