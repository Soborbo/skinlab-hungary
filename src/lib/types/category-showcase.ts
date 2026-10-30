import type { CompareRow, ShowcaseModelCopy } from '@/lib/category-showcase';
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
  | 'check';

/**
 * Egy kategóriaoldal teljes szerkesztői tartalma a CategoryShowcaseLayouthoz.
 * Szekciót kihagyni úgy lehet, hogy a kulcs elmarad (ahol opcionális).
 */
export interface ShowcaseConfig {
  slug: string;
  seo: { name: string; nameShort: string; description: string };
  hero: {
    /** Pontosan 2 sor; asztalon nem törik tovább. */
    titleLines: [string, string];
    lead: string;
    /** @assets/… kép (képmanifestben). */
    image: string;
    imageAlt: string;
  };
  usp: { icon: ShowcaseIconName; title: string; sub: string }[];
  models: { title: string; lead: string; copy: Record<string, ShowcaseModelCopy> };
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
  finance?: {
    title: string;
    lead: string;
    perks: string[];
    /** Alapból kiválasztott gép a kalkulátorban. */
    defaultSlug: string;
    cta: string;
  };
  video?: { id: VideoTestimonial['id']; posterSrc?: string };
  training?: { titleLines: [string, string]; text: string; cta: string; href: string };
  consult: { title: string; text: string; needs: string[]; note: string };
  faq?: { title: string; lead: string; items: { question: string; answer: string }[] };
  visit: { title: string; text: string; booking: string; demoCta: string };
}
