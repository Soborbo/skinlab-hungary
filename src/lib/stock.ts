/**
 * Készlethiány ("rendelésre") megállapítása.
 *
 * Két KÜLÖN fogalom van a termékadatokban, ne keverd össze őket:
 *
 *  - `availability: 'preorder'` (termékszint) = a gép gyártásra/rendelésre
 *    készül, a szokásos 15-20 munkanapos átfutással. Ez a normál állapot a
 *    nagygépeknél (HELIOS, OLYMPIA, ...), NEM készlethiány - nem jár figyelmeztetéssel.
 *  - Készlethiány = a termék most NINCS raktáron, csak előrendelhető, és a
 *    beérkezés ideje bizonytalan. Ezt a vevőnek a kosárba tétel UTÁN, de a
 *    rendelés elküldése ELŐTT látnia kell. Forrásai:
 *      - variáns: `available: false` (pl. MAST P60 Tiffany),
 *      - variáns nélküli termék: `availability: 'out_of_stock'`.
 *
 * A kliens (kosár) és a szerver (/api/order) ugyanezt a függvényt használja; a
 * szerver a termék-kollekcióból újraszámolja, így a kosárban tárolt jelző csak
 * megjelenítésre szolgál.
 */

interface StockProduct {
  availability: 'in_stock' | 'preorder' | 'out_of_stock';
}

interface StockVariant {
  available?: boolean;
}

export function isBackorder(product: StockProduct, variant?: StockVariant | null): boolean {
  if (variant && typeof variant.available === 'boolean') return !variant.available;
  return product.availability === 'out_of_stock';
}
