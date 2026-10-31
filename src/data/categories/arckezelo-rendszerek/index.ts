/**
 * Arckezelő rendszerek kategóriaoldal (egytermékes) - nyelvfüggetlen rész. Szöveg: ./hu.ts.
 */
import type { ShowcaseCategory } from '@/lib/types/category-showcase';
import { hu } from './hu';

export const arckezeloRendszerek: ShowcaseCategory = {
  base: {
    slug: 'arckezelo-rendszerek',
    hero: { image: '@assets/products/elitepod-design-3.jpg' },
    usp: ['shield', 'academic', 'wrench', 'wallet'],
    whyBuy: {
      image: '@assets/products/elitepod-design-4.jpg',
      icons: ['sparkles', 'layers', 'scan', 'bolt'],
    },
    finance: { defaultSlug: 'elitepod' },
    video: { id: 'adri', posterSrc: '/images/video/zsidai-adri-poster.jpg' },
  },
  copy: { hu },
};
