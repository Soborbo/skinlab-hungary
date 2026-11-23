/**
 * Hydrafacial kategóriaoldal - nyelvfüggetlen rész: hero-videó, képek, ikonok,
 * táblázat-adatforrások, linkek. A szöveg nyelvenként: ./hu.ts (+ ./en.ts, ./de.ts …).
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

export const hydrafacial: ShowcaseCategory = {
  base: {
    slug: 'hydrafacial',
    hero: {
      image: '@assets/hydrafacial-kezeles.jpg',
      // Asztalon is a négyzetes változat: a split hero kép-oszlopa álló vagy
      // közel négyzetes, a 16:9-es videóból 1024-1440px között csak 42-59% látszott.
      video: {
        desktop: '/videos/hydrafacial/hydrafacial-kepzes-720sq.mp4',
        poster: '/videos/hydrafacial/hydrafacial-kepzes-poster-sq',
        posterSize: { width: 720, height: 720 },
      },
    },
    usp: ['shield', 'academic', 'wrench', 'wallet'],
    compare: [
      { kind: 'price' },
      { kind: 'copy', key: 'tech' },
      { kind: 'copy', key: 'heads' },
      { kind: 'copy', key: 'ai' },
      { kind: 'spec', keys: ['Garancia'] },
      { kind: 'forWho' },
    ],
    whyBuy: {
      image: '@assets/hydrafacial-kezeles.jpg',
      icons: ['sparkles', 'layers', 'banknote', 'scan'],
    },
    finance: { defaultSlug: 'hydralume' },
    video: { id: 'adri', posterSrc: '/images/video/zsidai-adri-poster.jpg' },
    training: { href: '/kepzesek' },
  },
  copy: { hu, en, de, cs, sk, ro, hr, sl, sr },
};
