/**
 * Mezoterápia kategóriaoldal (egytermékes) - nyelvfüggetlen rész. Szöveg: ./hu.ts.
 */
import type { ShowcaseCategory } from '@/lib/types/category-showcase';
import { hu } from './hu';
import { en } from './en';
import { de } from './de';
import { cs } from './cs';
import { sk } from './sk';
import { ro } from './ro';
import { hr } from './hr';
import { sl } from './sl';
import { sr } from './sr';

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
  copy: { hu, en, de, cs, sk, ro, hr, sl, sr },
};
