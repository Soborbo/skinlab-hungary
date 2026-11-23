/**
 * ND:YAG lézer kategóriaoldal - nyelvfüggetlen rész: képek, ikonok, táblázat-
 * adatforrások, linkek. A szöveg nyelvenként: ./hu.ts.
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

export const ndYagLezerek: ShowcaseCategory = {
  base: {
    slug: 'nd-yag-lezerek',
    hero: { image: '@assets/ndyag-carbon-peeling-pixel.jpg' },
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
  copy: { hu, en, de, cs, sk, ro, hr, sl, sr },
};
