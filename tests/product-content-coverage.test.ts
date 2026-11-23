/**
 * Nem-HU termékoldalak tartalmi lefedettsége: ha egy élő (draft !== true)
 * terméknek van product-content/hu fájlja, mind a 8 nyelven is kell lennie,
 * és ahol a HU forrás ad specs / imageAlts / variáns-szöveget, ott a nyelvi
 * fájlnak is ugyanannyi (ill. ugyanazokkal a kulcsokkal) kell adnia.
 * Enélkül a ProductLayout végső esetben a magyar adatot renderelné.
 *
 * Szerződés (product-content/<locale>/<slug>.json):
 *  - specs:     lefordított kulcs-érték párok, a HU specs-szel azonos számban
 *               és sorrendben (HU forrás: product-content/hu specs, ha van,
 *               különben products/<slug>.json specs)
 *  - imageAlts: products/<slug>.json imageAlts kulcsai (fájlnevek), fordított alt
 *  - variants:  { [variant.sku]: { name?, description?, specs? } } - specs a HU
 *               variáns specs-szel azonos számban és sorrendben; description,
 *               ha a HU variánsnak van
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, it, expect } from 'vitest';

const LOCALES = ['en', 'de', 'cs', 'sk', 'ro', 'hr', 'sl', 'sr'] as const;
const root = join(__dirname, '../src/content');

type Specs = Record<string, string>;
interface Variant { sku: string; description?: string; specs?: Specs }
interface ProductJson { draft?: boolean; specs?: Specs; imageAlts?: Specs; variants?: Variant[] }
interface ContentJson {
  specs?: Specs;
  imageAlts?: Specs;
  variants?: Record<string, { name?: string; description?: string; specs?: Specs }>;
}

const readJson = <T>(path: string): T => JSON.parse(readFileSync(path, 'utf8')) as T;
const contentPath = (locale: string, slug: string) => join(root, 'product-content', locale, `${slug}.json`);
const count = (o?: Specs) => Object.keys(o ?? {}).length;

const products = readdirSync(join(root, 'products'))
  .filter((f) => f.endsWith('.json') && !f.startsWith('_'))
  .map((f) => ({ slug: f.replace(/\.json$/, ''), data: readJson<ProductJson>(join(root, 'products', f)) }))
  .filter(({ slug, data }) => data.draft !== true && existsSync(contentPath('hu', slug)));

const cases = products.flatMap(({ slug, data }) => {
  const hu = readJson<ContentJson>(contentPath('hu', slug));
  const huSpecs = count(hu.specs) > 0 ? hu.specs : data.specs;
  return LOCALES.map((locale) => ({ slug, locale, product: data, huSpecs }));
});

describe('product-content lefedettség (nem-HU)', () => {
  it.each(cases)('$locale/$slug', ({ slug, locale, product, huSpecs }) => {
    const path = contentPath(locale, slug);
    expect(existsSync(path), `hiányzik: product-content/${locale}/${slug}.json`).toBe(true);
    const c = readJson<ContentJson>(path);

    if (count(huSpecs) > 0) {
      expect(count(c.specs), 'specs darabszám ≠ HU').toBe(count(huSpecs));
    }
    if (count(product.imageAlts) > 0) {
      expect(Object.keys(c.imageAlts ?? {}).sort(), 'imageAlts kulcsok ≠ HU').toEqual(
        Object.keys(product.imageAlts!).sort(),
      );
    }
    for (const v of product.variants ?? []) {
      const lv = c.variants?.[v.sku];
      if (count(v.specs) > 0) {
        expect(count(lv?.specs), `variants.${v.sku}.specs darabszám ≠ HU`).toBe(count(v.specs));
      }
      if (v.description) {
        expect(lv?.description, `variants.${v.sku}.description hiányzik`).toBeTruthy();
      }
    }
  });
});
