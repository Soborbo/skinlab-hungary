/**
 * Testkezelő kategóriaoldal - nyelvfüggetlen rész: képek, ikonok, táblázat-
 * adatforrások, linkek. A szöveg nyelvenként: ./hu.ts.
 */
import type { ShowcaseCategory } from '@/lib/types/category-showcase';
import { hu } from './hu';

export const testkezeles: ShowcaseCategory = {
  base: {
    slug: 'testkezeles',
    hero: { image: '@assets/products/the-shaper-design-1.jpg' },
    usp: ['shield', 'academic', 'wrench', 'wallet'],
    compare: [
      { kind: 'price' },
      { kind: 'copy', key: 'tech' },
      { kind: 'spec', keys: ['Kezelőfejek száma'] },
      { kind: 'copy', key: 'area' },
      { kind: 'forWho' },
    ],
    whyBuy: {
      image: '@assets/products/the-shaper-design-4.jpg',
      icons: ['layers', 'clock', 'repeat', 'academic'],
    },
    finance: { defaultSlug: 'freeze-me-slim' },
    video: { id: 'adri', posterSrc: '/images/video/zsidai-adri-poster.jpg' },
  },
  copy: { hu },
};
