/**
 * Mezoterápia kategóriaoldal (egytermékes) - nyelvfüggetlen rész. Szöveg: ./hu.ts.
 */
import type { ShowcaseCategory } from '@/lib/types/category-showcase';
import { hu } from './hu';

export const mezoterapia: ShowcaseCategory = {
  base: {
    slug: 'mezoterapia',
    hero: { image: '@assets/products/dermatechplus-3.png' },
    usp: ['shield', 'wrench', 'academic', 'phone'],
    whyBuy: {
      image: '@assets/products/dermatechplus-1.png',
      icons: ['sparkles', 'calendar', 'layers', 'banknote'],
    },
    video: { id: 'hajnalka' },
  },
  copy: { hu },
};
