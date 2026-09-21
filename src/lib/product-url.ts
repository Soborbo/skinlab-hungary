/**
 * Termék-URL-ek egyetlen forrásból.
 *
 * Alapesetben `/kategoria/termek`. Vannak viszont kategóriák, ahol tulajdonosi
 * döntés szerint egyetlen termék lesz, és a kategória URL-je MAGA a termékoldal
 * (nincs külön `/kategoria/termek` cím) - ezeket tartja nyilván a
 * `CATEGORY_AS_PRODUCT` map. Minden linképítő helynek ezt kell használnia,
 * különben a belső linkek egy 301-re mutatnának.
 *
 * Ha egy ilyen kategória mégis több terméket kapna, vedd ki innen a sort,
 * és állítsd vissza a `[slug].astro` route-ot (lásd `pages/hidegplazma/`).
 */
export const CATEGORY_AS_PRODUCT: Record<string, string> = {
  // 2026-09-21: "nem lesz több plazma termék, csak ez az egy"
  hidegplazma: 'thefrostcoldplasma',
};

/** Az adott termék oldalának útvonala, záró perjel nélkül (pl. `/hidegplazma`). */
export function productPath(categorySlug: string, slug: string): string {
  return CATEGORY_AS_PRODUCT[categorySlug] === slug
    ? `/${categorySlug}`
    : `/${categorySlug}/${slug}`;
}

/** Igaz, ha a kategória URL-jén maga a termékoldal áll. */
export function isCategoryAsProduct(categorySlug: string, slug: string): boolean {
  return CATEGORY_AS_PRODUCT[categorySlug] === slug;
}
