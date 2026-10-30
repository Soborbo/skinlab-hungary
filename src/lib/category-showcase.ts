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
import { withTrailingSlash } from '@/i18n/ui';
import { getImageAlt } from './resolve-image';

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

export interface ShowcaseModel extends ShowcaseModelCopy {
  slug: string;
  /** Rövid név a termék nevéből (pl. „ATHENA”). */
  name: string;
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
function buildImages(product: Product): ShowcaseImage[] {
  const { data } = product;
  const seen = new Set<string>();
  const out: ShowcaseImage[] = [];
  const push = (src: string, fit: ShowcaseImage['fit'], index: number) => {
    if (!src || seen.has(src)) return;
    seen.add(src);
    out.push({ src, fit, alt: getImageAlt(src, `${shortName(product)} - ${index}. kép`) });
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
): ShowcaseModel[] {
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
        sku: data.sku || product.id,
        price: data.price ?? null,
        keySpec: copy[slug].keySpec ?? wattFromSpecs(specs),
        specs,
        href: withTrailingSlash(productPath(data.categorySlug, slug)),
        thumb: data.image,
        images: buildImages(product),
        installment: longest
          ? { months: longest, monthly: info.monthly[longest], downPayment: info.downPayment }
          : null,
      };
    });
}

/** Egy összehasonlító cella értéke. */
export function compareValue(model: ShowcaseModel, source: CompareSource): string {
  switch (source.kind) {
    case 'price':
      return model.price ? formatHuf(model.price) : 'Kérj ajánlatot';
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

const SHORT_DAY: Record<string, string> = {
  Hétfő: 'H',
  Kedd: 'K',
  Szerda: 'Sze',
  Csütörtök: 'Cs',
  Péntek: 'P',
  Szombat: 'Szo',
  Vasárnap: 'V',
};

/**
 * Nyitvatartás egy sorban az OPENING_HOURS-ból, az egymást követő azonos
 * napokat összevonva: „H–P 10:00–18:00 · Szo 10:00–14:00 · V zárva”.
 */
export function compactOpeningHours(rows: { day: string; hours: string }[]): string {
  const groups: { from: string; to: string; hours: string }[] = [];
  for (const row of rows) {
    const day = SHORT_DAY[row.day] ?? row.day;
    const last = groups[groups.length - 1];
    if (last && last.hours === row.hours) last.to = day;
    else groups.push({ from: day, to: day, hours: row.hours });
  }
  return groups
    .map((g) => {
      const days = g.from === g.to ? g.from : `${g.from}–${g.to}`;
      const hours = g.hours.toLowerCase() === 'zárva' ? 'zárva' : g.hours;
      return `${days} ${hours}`;
    })
    .join(' · ');
}
