/**
 * Kezelőanyagok kategóriaoldal (katalógus-változat) - nyelvfüggetlen rész. Szöveg: ./hu.ts.
 *
 * A csoportok sorrendje a régi oldalé: a LaserIQ blokk szándékosan NEM ár
 * szerinti, hanem a kezelési protokoll valós lépéssorrendje (bőrelőkészítés,
 * kezelés, azonnali regeneráció, otthoni ápolás).
 */
import type { ShowcaseCategory } from '@/lib/types/category-showcase';
import { hu } from './hu';

export const kezeloanyagok: ShowcaseCategory = {
  base: {
    slug: 'kezeloanyagok',
    hero: { image: '@assets/products/monduniq-aquametiq-hydra-prime-a-design-1.webp' },
    usp: ['shield', 'truck', 'pin', 'layers'],
    catalog: {
      groups: [
        [
          'monduniq-laseriq-enzym-peeling',
          'monduniq-mandelic-prep-foam',
          'monduniq-carbon-gel',
          'monduniq-laseriq-calm-recovery-cocktail',
          'monduniq-laseriq-biocell-maszk',
          'monduniq-nyugtato-erfalerosito-krem',
          'monduniq-laseriq-carbon-cleanse-por',
          'monduniq-laseriq-anti-age-spf50',
        ],
        ['monduniq-aquametiq-hydra-prime'],
        [
          'monduniq-genexem-lsev-100-szerum',
          'monduniq-genexem-exobiocell-maszk',
          'monduniq-botopax-peptid-koktel',
          'monduniq-vitaminkoktel-kaviarral',
          'monduniq-illumino-pp-koktel',
          'monduniq-dragon-blood-szerum',
          'monduniq-sebobalance-pro-ampulla',
          'monduniq-dermoaktiv-borkiegyensulyozo-szerum',
          'monduniq-dermoaktiv-stabilizalo-krem',
        ],
        [
          'monduniq-vascal-10-fitinsavas-koncentratum',
          'monduniq-hifusion-longevity-arcszerum',
          'monduniq-hifusion-longevity-arckrem',
          'monduniq-lepirev-szemkornyekapolo-krem',
          'monduniq-vitamino-mask-arcmaszk',
        ],
      ],
      // Egységesen a szatén hátterű, szívecskés dizájnfotók, csoportonként más
      // háttérszínnel (zöld, rózsaszín, kék, bézs).
      tiles: [
        '@assets/products/monduniq-nyugtato-erfalerosito-krem-50ml-design-1.jpg',
        '@assets/products/monduniq-aquametiq-hydra-prime-a-1.webp',
        '@assets/products/monduniq-dermoaktiv-szerum-design-1.webp',
        '@assets/products/monduniq-vitamino-mask-arcmaszk-design-1.webp',
      ],
      photoTiles: true,
    },
    whyBuy: {
      image: '@assets/monduniq-hifusion-szalonban.jpg',
      icons: ['shield', 'layers', 'sparkles', 'truck'],
    },
    video: { id: 'anna' },
  },
  copy: { hu },
};
