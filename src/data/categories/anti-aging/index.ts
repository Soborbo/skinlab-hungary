/**
 * Anti-aging kategóriaoldal - nyelvfüggetlen rész: képek, ikonok, táblázat-
 * adatforrások, linkek. A szöveg nyelvenként: ./hu.ts.
 */
import type { ShowcaseCategory } from '@/lib/types/category-showcase';
import { hu } from './hu';

export const antiAging: ShowcaseCategory = {
  base: {
    slug: 'anti-aging',
    hero: { image: '@assets/products/biopen3.png' },
    usp: ['shield', 'wrench', 'wallet', 'phone'],
    compare: [
      { kind: 'price' },
      { kind: 'copy', key: 'tech' },
      { kind: 'copy', key: 'form' },
      { kind: 'copy', key: 'extra' },
      { kind: 'copy', key: 'use' },
      { kind: 'forWho' },
    ],
    whyBuy: {
      image: '@assets/products/biopen-design-1.jpg',
      icons: ['sparkles', 'clock', 'repeat', 'banknote'],
    },
    finance: { defaultSlug: 'aestiq-ai' },
    video: { id: 'anna' },
  },
  copy: { hu },
};
