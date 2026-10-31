/**
 * ND:YAG lézer kategóriaoldal - nyelvfüggetlen rész: képek, ikonok, táblázat-
 * adatforrások, linkek. A szöveg nyelvenként: ./hu.ts.
 */
import type { ShowcaseCategory } from '@/lib/types/category-showcase';
import { hu } from './hu';

export const ndYagLezerek: ShowcaseCategory = {
  base: {
    slug: 'nd-yag-lezerek',
    hero: { image: '@assets/ndyag-lezer-kezeles.jpg' },
    usp: ['shield', 'academic', 'wrench', 'wallet'],
    compare: [
      { kind: 'price' },
      { kind: 'copy', key: 'waves' },
      { kind: 'copy', key: 'screen' },
      { kind: 'copy', key: 'cooling' },
      { kind: 'forWho' },
    ],
    whyBuy: {
      image: '@assets/products/pixel-design-1.jpg',
      icons: ['layers', 'sparkles', 'scan', 'banknote'],
    },
    finance: { defaultSlug: 'frame' },
    video: { id: 'dori' },
    training: { href: '/kepzesek/nd-yag-lezer-kepzes' },
  },
  copy: { hu },
};
