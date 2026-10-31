/**
 * Bőrdiagnosztika kategóriaoldal (egytermékes) - nyelvfüggetlen rész. Szöveg: ./hu.ts.
 */
import type { ShowcaseCategory } from '@/lib/types/category-showcase';
import { hu } from './hu';

export const bordiagnosztika: ShowcaseCategory = {
  base: {
    slug: 'bordiagnosztika',
    hero: { image: '@assets/kepzes-bordiagnosztika-gyakorlat.jpg' },
    usp: ['shield', 'academic', 'scan', 'wallet'],
    whyBuy: {
      image: '@assets/products/skinetic-ai-plus-showroom.jpg',
      icons: ['sparkles', 'repeat', 'scan', 'table'],
    },
    finance: { defaultSlug: 'skinetic-ai-plus' },
    video: { id: 'dori' },
  },
  copy: { hu },
};
