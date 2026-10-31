/**
 * Hydrafacial kategóriaoldal - nyelvfüggetlen rész: hero-videó, képek, ikonok,
 * táblázat-adatforrások, linkek. A szöveg nyelvenként: ./hu.ts (+ később ./en.ts …).
 */
import type { ShowcaseCategory } from '@/lib/types/category-showcase';
import { hu } from './hu';

export const hydrafacial: ShowcaseCategory = {
  base: {
    slug: 'hydrafacial',
    hero: {
      image: '@assets/hydrafacial-kezeles.jpg',
      video: {
        desktop: '/videos/hydrafacial/hydrafacial-kepzes-1280.mp4',
        mobile: '/videos/hydrafacial/hydrafacial-kepzes-720sq.mp4',
        poster: '/videos/hydrafacial/hydrafacial-kepzes-poster',
        posterMobile: '/videos/hydrafacial/hydrafacial-kepzes-poster-sq',
        posterSize: { width: 1280, height: 720 },
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
  copy: { hu },
};
