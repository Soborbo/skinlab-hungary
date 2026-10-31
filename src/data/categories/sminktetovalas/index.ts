/**
 * Sminktetováló kategóriaoldal - nyelvfüggetlen rész: képek, ikonok, táblázat-
 * adatforrások, linkek. A szöveg nyelvenként: ./hu.ts.
 *
 * Nincs kalkulátor (a gépek többsége a 100 000 Ft-os részletfizetési határ
 * alatt van) és nincs képzés-sáv (src/content/trainings alatt nincs sminktetováló képzés).
 */
import type { ShowcaseCategory } from '@/lib/types/category-showcase';
import { hu } from './hu';

export const sminktetovalas: ShowcaseCategory = {
  base: {
    slug: 'sminktetovalas',
    hero: { image: '@assets/sminktetovalas-mast.jpg' },
    // A termékek fő képe színes designfotó; a csempére fehér hátterű packshot kell.
    thumbs: {
      'faviamo-flare': '@assets/products/faviamo-flare-1.jpg',
      'mast-nano-2': '@assets/products/mastnano2.webp',
      'mast-p60-premium-sminktetovalo-gep-allithato-lokethosszal': '@assets/products/mast-p60-arany-allvany.png',
      'mast-p60-sminktetovalo-gep': '@assets/products/mast-p60-3in1-tiffany-elol.jpg',
    },
    usp: ['shield', 'wrench', 'layers', 'phone'],
    compare: [
      { kind: 'price' },
      { kind: 'copy', key: 'stroke' },
      { kind: 'copy', key: 'motor' },
      { kind: 'copy', key: 'weight' },
      { kind: 'forWho' },
    ],
    whyBuy: {
      image: '@assets/products/faviamo-flare-design-3.jpg',
      icons: ['scan', 'bolt', 'layers', 'banknote'],
    },
    video: { id: 'hajnalka' },
  },
  copy: { hu },
};
