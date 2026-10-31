/**
 * Hidegplazma kategóriaoldal (egytermékes) - nyelvfüggetlen rész. Szöveg: ./hu.ts.
 */
import type { ShowcaseCategory } from '@/lib/types/category-showcase';
import { hu } from './hu';

export const hidegplazma: ShowcaseCategory = {
  base: {
    slug: 'hidegplazma',
    hero: { image: '@assets/products/thefrost-design-3.jpg' },
    usp: ['shield', 'academic', 'wrench', 'wallet'],
    whyBuy: {
      image: '@assets/products/thefrost-design-1.jpg',
      icons: ['sparkles', 'layers', 'shield', 'banknote'],
    },
    finance: { defaultSlug: 'thefrostcoldplasma' },
    video: { id: 'anna' },
    training: { href: '/kepzesek/hidegplazma-kepzes' },
  },
  copy: { hu },
};
