import { getCollection, type CollectionEntry } from 'astro:content';
import { t, formatPrice, getLocalizedUrl, type Locale } from '@/i18n';
import { loadProductContent } from '@/lib/load-product-content';
import { productPath } from '@/lib/product-url';

export interface ComparisonColumn {
  isCurrent: boolean;
  name: string;
  image: string;
  href: string;
  price: string;
}

export interface ComparisonTable {
  columns: ComparisonColumn[];
  rows: { key: string; values: string[] }[];
}

/** Ennyi testvér kerül az aktuális termék mellé. */
export const COMPARISON_SIBLINGS = 2;

/**
 * Az aktuális termék élő kategória-testvérei, kiemeltek elöl (mint a
 * RelatedProducts-ban). A `canonicalSlug`-os spin-off duplikátumok kimaradnak.
 */
export async function getCategorySiblings(slug: string, categorySlug: string) {
  const all = await getCollection('products', ({ data }) =>
    data.categorySlug === categorySlug && !data.draft && !data.canonicalSlug);
  const current = all.find((e) => e.data.slug === slug);
  const siblings = all
    .filter((e) => e.data.slug !== slug)
    .sort((a, b) => Number(b.data.featured) - Number(a.data.featured));
  return { current, siblings };
}

/**
 * Összehasonlító tábla: a sorok automatikusan a specifikációkból jönnek.
 * Csak az a sor marad, amelyiknek legalább két oszlopban van értéke ÉS az
 * értékek nem mind egyformák. `null`, ha nincs mit összehasonlítani.
 */
export function buildComparison(
  locale: Locale,
  current: CollectionEntry<'products'>,
  siblings: CollectionEntry<'products'>[],
  /** Hány testvér kerüljön az aktuális mellé (a főoldalon a teljes kategória). */
  siblingLimit: number = COMPARISON_SIBLINGS,
): ComparisonTable | null {
  const entries = [current, ...siblings.slice(0, siblingLimit)];
  if (entries.length < 2) return null;

  const specsByColumn: Record<string, string>[] = [];
  const columns = entries.map((entry) => {
    const d = entry.data;
    const { content } = loadProductContent(locale, d.slug, d.categorySlug);
    const price = d.salePrice ?? d.price;
    specsByColumn.push((content.specs || d.specs || {}) as Record<string, string>);
    return {
      isCurrent: entry === current,
      name: content.name || d.name,
      image: d.image,
      href: getLocalizedUrl(locale, productPath(d.categorySlug, d.slug)),
      price: price ? formatPrice(price, locale) : t(locale, 'product.priceOnRequest'),
    };
  });

  const keys = [...new Set(specsByColumn.flatMap((s) => Object.keys(s)))];
  const rows = keys
    .map((key) => ({ key, values: specsByColumn.map((s) => s[key]?.trim() || '') }))
    .filter(({ values }) => {
      const present = values.filter(Boolean);
      // A csak zárójeles megjegyzésben eltérő értékek (pl. "... nm (4WAVE)")
      // nem valódi különbségek.
      const core = present.map((v) => v.replace(/\s*\([^)]*\)\s*/g, ' ').trim().toLowerCase());
      return present.length >= 2 && new Set(core).size > 1;
    });

  return rows.length > 0 ? { columns, rows } : null;
}
