/**
 * Showcase kategóriaoldalak tartalmi ellenőrzése: minden kategória minden
 * meglévő nyelve összefésülhető, a szöveg a valódi termékekre hivatkozik, és
 * betartja a házszabályokat. A vizuális ellenőrzés: scripts/check-showcase.mjs.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, it, expect } from 'vitest';
import { SHOWCASE_CATEGORIES } from '@/data/categories';
import { buildShowcaseConfig } from '@/lib/category-showcase';
import { CATEGORY_AS_PRODUCT } from '@/lib/product-url';
import { showcaseUi } from '@/i18n/showcase';
import type { Locale } from '@/i18n/ui';
import type { ShowcaseCategory } from '@/lib/types/category-showcase';

const productsDir = join(__dirname, '../src/content/products');
const products = readdirSync(productsDir)
  .filter((f) => f.endsWith('.json') && !f.startsWith('_'))
  .map((f) => {
    const data = JSON.parse(readFileSync(join(productsDir, f), 'utf8')) as { slug?: string; categorySlug: string; draft?: boolean };
    return { ...data, slug: data.slug || f.replace(/\.json$/, '') };
  });

/** Minden szöveges érték egy objektumból (em-dash kereséshez). */
function strings(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === 'object') return Object.values(value).flatMap(strings);
  return [];
}

const cases = Object.entries(SHOWCASE_CATEGORIES).flatMap(([slug, category]) =>
  (Object.keys(category.copy) as Locale[]).map((locale) => ({ slug, locale, category })),
);

describe.each(cases)('$slug / $locale', ({ slug, locale, category }) => {
  const page = buildShowcaseConfig(category, locale)!;
  const live = products.filter((p) => p.categorySlug === slug && !p.draft).map((p) => p.slug);

  it('összefésülhető, és van hozzá felirat-fordítás', () => {
    expect(page.slug).toBe(slug);
    expect(() => showcaseUi(locale)).not.toThrow();
  });

  it('csak létező, publikált termékre hivatkozik', () => {
    const modelSlugs = Object.keys(page.models?.copy ?? {});
    for (const model of modelSlugs) expect(live).toContain(model);
    if (page.finance) expect(modelSlugs).toContain(page.finance.defaultSlug);
    for (const model of Object.keys(page.thumbs ?? {})) expect(modelSlugs).toContain(model);
    for (const slug of (page.catalog?.groups ?? []).flatMap((g) => g.slugs)) expect(live, `katalógus: ${slug}`).toContain(slug);
  });

  it('minden modellnél megvan a táblázat szöveges cellája', () => {
    const keys = (page.compare?.rows ?? []).flatMap((r) => (r.source.kind === 'copy' ? [r.source.key] : []));
    for (const [model, copy] of Object.entries(page.models?.copy ?? {})) {
      for (const key of keys) expect(copy.compare?.[key], `${model}.compare.${key}`).toBeTruthy();
    }
  });

  it('nincs benne em-dash (gondolatjel helyett kötőjel)', () => {
    expect(strings(category.copy[locale]).filter((s) => s.includes('—'))).toEqual([]);
  });
});

describe('SHOWCASE_CATEGORIES', () => {
  it('nem tartalmaz olyan kategóriát, amelynek URL-jén a termékoldal áll', () => {
    // CATEGORY_AS_PRODUCT: ott a kategória URL-je maga a termékoldal (kosárral);
    // a showcase elérhetetlenné tenné a terméket.
    expect(Object.keys(SHOWCASE_CATEGORIES).filter((slug) => slug in CATEGORY_AS_PRODUCT)).toEqual([]);
  });
});

describe('buildShowcaseConfig', () => {
  const [first] = Object.values(SHOWCASE_CATEGORIES);

  it('hiányzó nyelvnél null (az oldal a régi layouton marad)', () => {
    expect(buildShowcaseConfig({ ...first, copy: {} }, 'en')).toBeNull();
  });

  it('eltérő elemszámnál build-hiba', () => {
    const broken: ShowcaseCategory = { ...first, base: { ...first.base, usp: first.base.usp.slice(1) } };
    expect(() => buildShowcaseConfig(broken, 'hu')).toThrow(/usp/);
  });

  it('csak az egyik oldalon meglévő szekciónál build-hiba', () => {
    const broken: ShowcaseCategory = { ...first, base: { ...first.base, whyBuy: undefined } };
    expect(() => buildShowcaseConfig(broken, 'hu')).toThrow(/whyBuy/);
  });
});
