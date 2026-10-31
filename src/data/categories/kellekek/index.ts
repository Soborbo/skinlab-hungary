/**
 * Kellékek kategóriaoldal (katalógus-változat) - nyelvfüggetlen rész. Szöveg: ./hu.ts.
 */
import type { ShowcaseCategory } from '@/lib/types/category-showcase';
import { hu } from './hu';

export const kellekek: ShowcaseCategory = {
  base: {
    slug: 'kellekek',
    hero: { image: '@assets/products/faviamo-tumodul-design-1.jpg' },
    usp: ['shield', 'truck', 'pin', 'phone'],
    catalog: {
      groups: [
        ['faviamo-tumodul', 'mast-oceanheart-tumodul-030mm-1rl'],
        ['carbon-peeling-fust-elszivo-keszulek-815'],
      ],
    },
    whyBuy: {
      image: '@assets/products/faviamo-tumodul-design-3.jpg',
      icons: ['shield', 'sparkles', 'truck', 'phone'],
    },
    video: { id: 'hajnalka' },
  },
  copy: { hu },
};
