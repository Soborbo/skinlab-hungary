/**
 * Kategóriaoldal „showcase” elrendezés (CategoryShowcaseLayout) adatréteg.
 *
 * A szerkesztői szöveg (tagline, kinek való, leírás) az oldal konfigjából jön,
 * minden mérhető adat (ár, watt, specifikáció, képek) a termék-JSON-ból - így a
 * kategóriaoldal sosem mondhat mást, mint a termékoldal.
 * Első felhasználó: src/pages/diodalezerek/index.astro (konfig: src/data/categories/).
 */
import type { CollectionEntry } from 'astro:content';
import { getInstallmentInfo, type InstallmentMonths } from './installment';
import { productPath } from './product-url';
import { getLocalizedUrl } from '@/i18n/ui';
import { showcaseUi } from '@/i18n/showcase';
import { getImageAlt } from './resolve-image';
import type { Locale } from '@/i18n/ui';
import type { ShowcaseCategory, ShowcaseConfig } from './types/category-showcase';

type Product = CollectionEntry<'products'>;

/** Termékenkénti szerkesztői szöveg (a mérhető adat a JSON-ból jön). */
export interface ShowcaseModelCopy {
  /** Megjelenített név; alapból a termék nevének első szava (pl. „ATHENA”). */
  name?: string;
  /** Kulcsadat a csempén és a sorcímben; alapból a watt a specs-ből. */
  keySpec?: string;
  /** Rövid, dőlt alcím a modellnév mellett (pl. „a kontroll és precizitás”). */
  tagline: string;
  /** Kinek való, egy sorban (csempén, táblázatban). */
  forWho: string;
  desc: string;
  /** „Neked való, ha…” pontok. */
  when: string[];
  /**
   * Összehasonlító cellák, amelyek a specs-ből nem jönnek ki tömören
   * (pl. 11 kezelőfej felsorolása helyett „11 funkció”). Kulcs = CompareRow
   * `copy` forrásának kulcsa.
   */
  compare?: Record<string, string>;
}

export interface ShowcaseImage {
  src: string;
  alt: string;
  /** Fehér hátterű termékfotó: contain; hangulatfotó: cover. */
  fit: 'contain' | 'cover';
}

export interface ShowcaseModel extends Omit<ShowcaseModelCopy, 'keySpec'> {
  slug: string;
  /** Rövid név a termék nevéből (pl. „ATHENA”). */
  name: string;
  /** A termék teljes neve (pl. „ATHENA 1000W diódalézer”), képek alt szövegéhez. */
  fullName: string;
  sku: string;
  price: number | null;
  /** Kulcsadat (csempe, sorcím): a konfig `keySpec`-je, vagy a watt a specs-ből (pl. „1000W”). */
  keySpec: string | null;
  specs: Record<string, string>;
  href: string;
  thumb: string;
  images: ShowcaseImage[];
  /** Leghosszabb futamidő havi részlete (teaser), ha van részletfizetés. */
  installment: { months: InstallmentMonths; monthly: number; downPayment: number } | null;
}

/** Egy összehasonlító sor: honnan jön az érték. */
export type CompareSource =
  | { kind: 'price' }
  | { kind: 'forWho' }
  /** A modell szerkesztői `compare[key]` értéke. */
  | { kind: 'copy'; key: string }
  /** Az első létező specs-kulcs értéke; a `strip` mintát kitörli belőle. */
  | { kind: 'spec'; keys: string[]; strip?: RegExp };

export interface CompareRow {
  label: string;
  source: CompareSource;
}

const huNumber = new Intl.NumberFormat('hu-HU');
/** Ár formázása nem törhető szóközzel (a „Ft” ne kerüljön új sorba). */
export const formatHuf = (value: number): string => `${huNumber.format(value)} Ft`;

/** A specs első létező kulcsának értéke. */
export function specValue(specs: Record<string, string>, keys: string[]): string | null {
  for (const key of keys) {
    if (specs[key]) return specs[key];
  }
  return null;
}

function wattFromSpecs(specs: Record<string, string>): string | null {
  const raw = specValue(specs, ['Teljesítmény']);
  const match = raw?.match(/\d[\d\s.]*\s?W/);
  return match ? match[0].replace(/\s/g, '') : null;
}

/** A termék nevének első szava (márkanév), pl. „EMPIRE 4WAVE 1200W …” → „EMPIRE”. */
function shortName(product: Product): string {
  return product.data.name.split(/\s+/)[0];
}

/**
 * Galéria a termékoldal herójával azonos sorrendben: elöl a design fotók
 * (cover), utánuk a fehér hátterű főkép és packshotok (contain). Így a nagy kép
 * ugyanaz, mint a termékoldal hero-képe (ProductLayout: designImages[0] ?? image).
 * A kategória-hero csempéi ettől függetlenül a fehér hátterű `image`-et kapják.
 * Alt a képmanifestből.
 */
function buildImages(product: Product, fallbackAlt: (name: string, n: number) => string): ShowcaseImage[] {
  const { data } = product;
  const seen = new Set<string>();
  const out: ShowcaseImage[] = [];
  const push = (src: string, fit: ShowcaseImage['fit'], index: number) => {
    if (!src || seen.has(src)) return;
    seen.add(src);
    out.push({ src, fit, alt: getImageAlt(src, fallbackAlt(shortName(product), index)) });
  };
  (data.designImages ?? []).forEach((src) => push(src, 'cover', out.length + 1));
  [data.image, ...(data.images ?? [])].forEach((src) => push(src, 'contain', out.length + 1));
  return out;
}

/**
 * Modell-lista ár szerint növekvő sorrendben (mint a régi kategóriaoldalon).
 * Csak az a termék kerül be, amelyhez van szerkesztői szöveg - így egy új,
 * még szöveg nélküli termék nem jelenik meg félkészen.
 */
export function buildShowcaseModels(
  products: Product[],
  copy: Record<string, ShowcaseModelCopy>,
  locale: Locale,
  thumbs: Record<string, string> = {},
): ShowcaseModel[] {
  const ui = showcaseUi(locale);
  return products
    .filter((p) => copy[p.data.slug || p.id])
    .sort((a, b) => (a.data.price ?? Infinity) - (b.data.price ?? Infinity))
    .map((product) => {
      const { data } = product;
      const slug = data.slug || product.id;
      const specs = data.specs ?? {};
      const info = getInstallmentInfo(data.price);
      const longest = info.available ? info.months[info.months.length - 1] : null;
      return {
        ...copy[slug],
        slug,
        name: copy[slug].name ?? shortName(product),
        fullName: data.name,
        sku: data.sku || product.id,
        price: data.price ?? null,
        keySpec: copy[slug].keySpec ?? wattFromSpecs(specs),
        specs,
        href: getLocalizedUrl(locale, productPath(data.categorySlug, slug)),
        thumb: thumbs[slug] ?? data.image,
        images: buildImages(product, ui.gallery.image),
        installment: longest
          ? { months: longest, monthly: info.monthly[longest], downPayment: info.downPayment }
          : null,
      };
    });
}

/** Egy összehasonlító cella értéke. */
export function compareValue(model: ShowcaseModel, source: CompareSource, askPrice: string): string {
  switch (source.kind) {
    case 'price':
      return model.price ? formatHuf(model.price) : askPrice;
    case 'forWho':
      return model.forWho;
    case 'copy':
      return model.compare?.[source.key] ?? '-';
    case 'spec': {
      const raw = specValue(model.specs, source.keys) ?? '-';
      return source.strip ? raw.replace(source.strip, '').trim() : raw;
    }
  }
}

/**
 * Nyitvatartás egy sorban az OPENING_HOURS-ból, az egymást követő azonos
 * napokat összevonva: „H–P 10:00–18:00 · Szo 10:00–14:00 · V zárva”.
 * `days`: magyar napnév → rövid nap az oldal nyelvén; `closed`: „zárva”.
 */
export function compactOpeningHours(
  rows: { day: string; hours: string }[],
  days: Record<string, string>,
  closed: string,
): string {
  const groups: { from: string; to: string; hours: string }[] = [];
  for (const row of rows) {
    const day = days[row.day] ?? row.day;
    const last = groups[groups.length - 1];
    if (last && last.hours === row.hours) last.to = day;
    else groups.push({ from: day, to: day, hours: row.hours });
  }
  return groups
    .map((g) => {
      const span = g.from === g.to ? g.from : `${g.from}–${g.to}`;
      const hours = g.hours.toLowerCase() === 'zárva' ? closed : g.hours;
      return `${span} ${hours}`;
    })
    .join(' · ');
}

/** Két párhuzamos tömb összefésülése; eltérő hossznál build-hiba. */
function zip<A, B, R>(where: string, a: A[], b: B[], join: (a: A, b: B) => R): R[] {
  if (a.length !== b.length) {
    throw new Error(`[showcase] ${where}: a közös részben ${a.length}, a szövegben ${b.length} elem van`);
  }
  return a.map((item, i) => join(item, b[i]));
}

/** Az opcionális szekció mindkét oldalon megvan, vagy egyiken sem. */
function pair<A, B>(where: string, a: A | undefined, b: B | undefined): [A, B] | undefined {
  if (!a !== !b) {
    throw new Error(`[showcase] ${where}: csak az egyik oldalon szerepel (közös rész / szöveg)`);
  }
  return a && b ? [a, b] : undefined;
}

/**
 * Kategóriaoldal tartalma egy nyelven: a nyelvfüggetlen ShowcaseBase és az
 * adott nyelvű ShowcaseCopy összefésülve. Ha az adott nyelvhez nincs szöveg,
 * null (az oldal ilyenkor a régi CategoryLayouton marad).
 */
export function buildShowcaseConfig(category: ShowcaseCategory, locale: Locale): ShowcaseConfig | null {
  const { base } = category;
  const copy = category.copy[locale];
  if (!copy) return null;
  const at = (section: string) => `${base.slug}/${locale} ${section}`;

  const compare = pair(at('compare'), base.compare, copy.compare);
  const whyBuy = pair(at('whyBuy'), base.whyBuy, copy.whyBuy);
  const finance = pair(at('finance'), base.finance, copy.finance);
  const training = pair(at('training'), base.training, copy.training);
  const catalog = pair(at('catalog'), base.catalog, copy.catalog);
  if (!copy.models === !catalog) {
    throw new Error(`[showcase] ${at('models/catalog')}: pontosan az egyik kell (gépsor vagy katalógus)`);
  }

  return {
    slug: base.slug,
    thumbs: base.thumbs,
    seo: copy.seo,
    hero: { ...copy.hero, ...base.hero },
    usp: zip(at('usp'), base.usp, copy.usp, (icon, text) => ({ icon, ...text })),
    models: copy.models,
    catalog: catalog && {
      title: catalog[1].title,
      lead: catalog[1].lead,
      groups: zip(at('catalog'), catalog[0].groups, catalog[1].groups, (slugs, text) => ({ ...text, slugs })),
    },
    reviews: copy.reviews,
    compare: compare && {
      title: compare[1].title,
      lead: compare[1].lead,
      help: compare[1].help,
      rows: zip(at('compare'), compare[0], compare[1].labels, (source, label) => ({ label, source })),
    },
    whyBuy: whyBuy && {
      title: whyBuy[1].title,
      lead: whyBuy[1].lead,
      image: whyBuy[0].image,
      imageAlt: whyBuy[1].imageAlt,
      items: zip(at('whyBuy'), whyBuy[0].icons, whyBuy[1].items, (icon, text) => ({ icon, ...text })),
    },
    finance: finance && { ...finance[1], ...finance[0] },
    video: base.video,
    training: training && { ...training[1], ...training[0] },
    consult: copy.consult,
    faq: copy.faq,
    visit: copy.visit,
  };
}

/** Egy katalóguskártya: a termék adatai a kosárba gombhoz és a listához. */
export interface CatalogItem {
  slug: string;
  name: string;
  sku: string;
  price: number | null;
  href: string;
  image: string;
  categorySlug: string;
  availability: Product['data']['availability'];
  variants: { sku: string; available?: boolean }[];
}

/**
 * Katalógus-csoportok a konfig sorrendjében, csak publikált termékkel. A
 * csoportba nem sorolt termékek a végén egy `restTitle` című csoportba
 * kerülnek (ár szerint), így egy új termék sem tűnik el az oldalról.
 */
export function buildCatalogGroups(
  products: Product[],
  groups: { title: string; subtitle?: string; slugs: string[] }[],
  locale: Locale,
  restTitle: string,
): { title: string; subtitle?: string; items: CatalogItem[] }[] {
  const bySlug = new Map(products.map((p) => [p.data.slug || p.id, p]));
  const toItem = (product: Product): CatalogItem => {
    const { data } = product;
    const slug = data.slug || product.id;
    return {
      slug,
      name: data.name,
      sku: data.sku || product.id,
      price: data.price ?? null,
      href: getLocalizedUrl(locale, productPath(data.categorySlug, slug)),
      image: data.image,
      categorySlug: data.categorySlug,
      availability: data.availability,
      variants: data.variants ?? [],
    };
  };
  const placed = new Set(groups.flatMap((g) => g.slugs));
  const rest = products
    .filter((p) => !placed.has(p.data.slug || p.id))
    .sort((a, b) => (a.data.price ?? Infinity) - (b.data.price ?? Infinity));
  return [
    ...groups.map((g) => ({
      title: g.title,
      subtitle: g.subtitle,
      items: g.slugs.flatMap((slug) => {
        const product = bySlug.get(slug);
        return product ? [toItem(product)] : [];
      }),
    })),
    ...(rest.length ? [{ title: restTitle, items: rest.map(toItem) }] : []),
  ].filter((g) => g.items.length > 0);
}
