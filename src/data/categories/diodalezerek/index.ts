/**
 * Diódalézer kategóriaoldal - nyelvfüggetlen rész: képek, ikonok, táblázat-
 * adatforrások, linkek. A szöveg nyelvenként: ./hu.ts (+ ./en.ts, ./de.ts …).
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

export const diodalezerek: ShowcaseCategory = {
  base: {
    slug: 'diodalezerek',
    hero: { image: '@assets/diodalezer-kezeles.jpg' },
    usp: ['shield', 'academic', 'wrench', 'wallet'],
    compare: [
      { kind: 'price' },
      { kind: 'spec', keys: ['Teljesítmény'], strip: /\s*\(kimeneti\)/ },
      { kind: 'spec', keys: ['Hullámhossz'], strip: /\s*\(4WAVE\)/ },
      { kind: 'spec', keys: ['Spotméret', 'Spot méret'] },
      { kind: 'spec', keys: ['Hűtési rendszer'] },
      { kind: 'forWho' },
    ],
    whyBuy: {
      image: '@assets/products/olympia-oktatas-2.jpg',
      icons: ['banknote', 'repeat', 'bolt', 'layers'],
    },
    finance: { defaultSlug: 'olympia' },
    video: { id: 'adri', posterSrc: '/images/video/zsidai-adri-poster.jpg' },
    training: { href: '/kepzesek' },
  },
  copy: { hu, en, de, cs, sk, ro, hr, sl, sr },
};
