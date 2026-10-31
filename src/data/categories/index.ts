/**
 * Az új (showcase) elrendezésű kategóriák. Ami itt szerepel, az a
 * CategoryShowcaseLayouton jelenik meg minden olyan nyelven, amelyhez van
 * szövegfájl; a többi nyelv és kategória a régi CategoryLayouton marad.
 *
 * NEM kerülhet ide a CATEGORY_AS_PRODUCT kategória (src/lib/product-url.ts:
 * hidegplazma, bordiagnosztika, arckezelo-rendszerek): ott a kategória URL-jén
 * maga a termékoldal áll (tulajdonosi döntés), a showcase elvenné a vásárlást.
 * A teszt (tests/showcase-config.test.ts) ezt ellenőrzi.
 *
 * Új nyelv egy kategóriához:
 *   1. src/i18n/showcase.ts: a nyelv fix feliratai (egyszer, minden kategóriának).
 *   2. src/data/categories/<slug>/<nyelv>.ts: a hu.ts lefordítva (ShowcaseCopy).
 *   3. src/data/categories/<slug>/index.ts: `copy: { hu, <nyelv> }`.
 * Változatok (automatikusan): több gép = modellsorok + táblázat; 1 gép =
 * egytermékes hero; `catalog` = csoportosított termékrács kosárba gombbal.
 * Minden kategórián azonos magyar blokk: ./common.hu.ts.
 * Új kategória: <slug>/index.ts (ShowcaseBase) + hu.ts, felvétel ide, és a
 * src/pages/<slug>/index.astro + [locale] oldal a CategoryPage-et kapja.
 * Ellenőrzés: npm test (tartalom) és npm run check:showcase (H1, túlcsordulás).
 */
import type { ShowcaseCategory } from '@/lib/types/category-showcase';
import { antiAging } from './anti-aging';
import { diodalezerek } from './diodalezerek';
import { hydrafacial } from './hydrafacial';
import { kellekek } from './kellekek';
import { kezeloanyagok } from './kezeloanyagok';
import { mezoterapia } from './mezoterapia';
import { ndYagLezerek } from './nd-yag-lezerek';
import { sminktetovalas } from './sminktetovalas';
import { testkezeles } from './testkezeles';

export const SHOWCASE_CATEGORIES: Record<string, ShowcaseCategory> = {
  'anti-aging': antiAging,
  diodalezerek,
  hydrafacial,
  kellekek,
  kezeloanyagok,
  mezoterapia,
  'nd-yag-lezerek': ndYagLezerek,
  sminktetovalas,
  testkezeles,
};
