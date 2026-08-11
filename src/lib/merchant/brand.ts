/**
 * Márkanév feloldása egy termékhez.
 *
 * A termékoldali JSON-LD korábban MINDEN termékre a `Skinlab` márkát írta ki,
 * ami a viszonteladott Mast / WJX / M'ONDUNIQ tételeknél tényszerűen hamis.
 * A Merchant Center feed `brand` mezője és az oldal strukturált adata között a
 * Google konzisztenciát vár, ezért a két helyen UGYANEZ a függvény dönt.
 *
 * Sorrend: kézzel megadott `brand` mező → névprefix → alapértelmezett (Skinlab).
 */

/** Alapértelmezett márka: minden saját fejlesztésű / saját brandelt készülék. */
export const DEFAULT_BRAND = 'Skinlab';

/**
 * Viszonteladott márkák, a terméknév ELEJÉN felismerve. Csak akkor bővítsd, ha
 * a márka tényleg megjelenik a névben - kétes esetben a termék JSON-jában add
 * meg explicit a `brand` mezőt.
 */
const BRAND_PREFIXES: ReadonlyArray<readonly [RegExp, string]> = [
  [/^m['’`]onduniq\b/i, "M'ONDUNIQ"],
  [/^mast\b/i, 'Mast'],
  [/^wjx\b/i, 'WJX'],
];

export function resolveBrand(name: string, explicitBrand?: string | null): string {
  if (explicitBrand) return explicitBrand;
  const trimmed = (name ?? '').trim();
  for (const [pattern, brand] of BRAND_PREFIXES) {
    if (pattern.test(trimmed)) return brand;
  }
  return DEFAULT_BRAND;
}
