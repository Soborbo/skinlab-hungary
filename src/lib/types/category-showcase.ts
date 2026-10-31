import type { CompareRow, CompareSource, ShowcaseModelCopy } from '@/lib/category-showcase';
import type { Locale } from '@/i18n/ui';
import type { VideoTestimonial } from '@/data/video-testimonials';

/** Egyszínű ikonok a showcase-komponensekben (src/components/category/ShowcaseIcon.astro). */
export type ShowcaseIconName =
  | 'shield'
  | 'academic'
  | 'wrench'
  | 'wallet'
  | 'banknote'
  | 'repeat'
  | 'bolt'
  | 'layers'
  | 'table'
  | 'phone'
  | 'pin'
  | 'clock'
  | 'calendar'
  | 'play'
  | 'check'
  | 'sparkles'
  | 'scan';

/** Néma, ismétlődő hero-videó (HeroVideo.astro). Útvonalak a public/ alól. */
export interface ShowcaseHeroVideo {
  desktop: string;
  mobile?: string;
  /** Kiterjesztés nélkül; mellette .avif/.webp/.jpg. */
  poster: string;
  posterMobile?: string;
  posterSize: { width: number; height: number };
}

/**
 * Egy kategóriaoldal nyelvfüggetlen része: képek, ikonok, adatforrások,
 * linkek. Kategóriánként EGY van (src/data/categories/<slug>/index.ts), így
 * egy képcsere vagy új táblázatsor minden nyelven egyszerre jelenik meg.
 *
 * A tömbök (usp, compare, whyBuy.icons) elemszámának egyeznie kell a
 * szövegfájl megfelelő tömbjével; eltérésnél a build elbukik (buildShowcaseConfig).
 */
export interface ShowcaseBase {
  slug: string;
  hero: {
    /** @assets/… kép (képmanifestben). */
    image: string;
    video?: ShowcaseHeroVideo;
  };
  /**
   * Csempekép termékenként (slug → @assets/… fehér hátterű packshot), ha a
   * termék fő képe (`image`) nem fehér hátterű. Ez megy a hero-csempére, a
   * táblázat mobilkártyájára és a kalkulátorra.
   */
  thumbs?: Record<string, string>;
  /** USP-pontok ikonjai, sorrendben. */
  usp: ShowcaseIconName[];
  /** Összehasonlító sorok adatforrása, sorrendben (a címkék a szövegfájlban). */
  compare?: CompareSource[];
  whyBuy?: { image: string; icons: ShowcaseIconName[] };
  /** Alapból kiválasztott gép a kalkulátorban. */
  finance?: { defaultSlug: string };
  video?: { id: VideoTestimonial['id']; posterSrc?: string };
  training?: { href: string };
}

/**
 * Egy kategóriaoldal szövege EGY nyelven (src/data/categories/<slug>/<nyelv>.ts).
 * Opcionális szekció csak akkor jelenik meg, ha a ShowcaseBase-ben is megvan
 * a párja (compare, whyBuy, finance, training); az eltérés build-hiba.
 */
export interface ShowcaseCopy {
  seo: { name: string; nameShort: string; description: string };
  hero: {
    /** Pontosan 2 sor; asztalon nem törik tovább. */
    titleLines: [string, string];
    lead: string;
    imageAlt: string;
  };
  usp: { title: string; sub: string }[];
  models: { title: string; lead: string; copy: Record<string, ShowcaseModelCopy> };
  reviews?: { title: string };
  compare?: {
    title: string;
    lead: string;
    /** Sorcímkék a ShowcaseBase.compare sorrendjében. */
    labels: string[];
    help: { title: string; text: string };
  };
  whyBuy?: {
    title: string;
    lead: string;
    imageAlt: string;
    items: { title: string; text: string }[];
  };
  finance?: { title: string; lead: string; perks: string[]; cta: string };
  training?: { titleLines: [string, string]; text: string; cta: string };
  consult: { title: string; text: string; needs: string[]; note: string };
  faq?: { title: string; lead: string; items: { question: string; answer: string }[] };
  visit: { title: string; text: string; booking: string; demoCta: string };
}

/** Egy kategória: a közös rész + a meglévő fordítások. */
export interface ShowcaseCategory {
  base: ShowcaseBase;
  copy: Partial<Record<Locale, ShowcaseCopy>>;
}

/**
 * Egy oldal összefésült tartalma a CategoryShowcaseLayouthoz
 * (buildShowcaseConfig állítja elő a ShowcaseBase-ből és a ShowcaseCopy-ból).
 */
export interface ShowcaseConfig {
  slug: string;
  thumbs?: ShowcaseBase['thumbs'];
  seo: ShowcaseCopy['seo'];
  hero: ShowcaseCopy['hero'] & ShowcaseBase['hero'];
  usp: { icon: ShowcaseIconName; title: string; sub: string }[];
  models: ShowcaseCopy['models'];
  reviews?: { title: string };
  compare?: {
    title: string;
    lead: string;
    rows: CompareRow[];
    help: { title: string; text: string };
  };
  whyBuy?: {
    title: string;
    lead: string;
    image: string;
    imageAlt: string;
    items: { icon: ShowcaseIconName; title: string; text: string }[];
  };
  finance?: ShowcaseCopy['finance'] & { defaultSlug: string };
  video?: ShowcaseBase['video'];
  training?: { titleLines: [string, string]; text: string; cta: string; href: string };
  consult: ShowcaseCopy['consult'];
  faq?: ShowcaseCopy['faq'];
  visit: ShowcaseCopy['visit'];
}
