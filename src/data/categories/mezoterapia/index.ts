/**
 * Mezoterápia kategóriaoldal (egytermékes) - nyelvfüggetlen rész. Szöveg: ./hu.ts.
 */
import type { ShowcaseCategory } from '@/lib/types/category-showcase';
import { hu } from './hu';

export const mezoterapia: ShowcaseCategory = {
  base: {
    slug: 'mezoterapia',
    hero: { image: '@assets/products/dermatechplus-3.png' },
    usp: ['shield', 'wrench', 'wallet', 'phone'],
    whyBuy: {
      image: '@assets/products/dermatechplus-1.png',
      icons: ['sparkles', 'calendar', 'layers', 'banknote'],
    },
    finance: { defaultSlug: 'dermatechplus_noneedle_mesotherapy' },
    video: { id: 'hajnalka' },
  },
  copy: { hu },
};
