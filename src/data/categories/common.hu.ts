/**
 * A kategóriaoldalak közös magyar szövegblokkjai. Ami minden kategórián
 * szó szerint ugyanaz, az itt van, így egy szövegjavítás mindenhol egyszerre
 * jelenik meg. Kategóriánként eltérő változatot a <slug>/hu.ts felülírhat
 * (pl. `{ ...consult, needs: [...] }`).
 */
import type { ShowcaseCopy } from '@/lib/types/category-showcase';

export const reviews: NonNullable<ShowcaseCopy['reviews']> = { title: 'Akik már velünk dolgoznak' };

export const compareHelp: NonNullable<ShowcaseCopy['compare']>['help'] = {
  title: 'Nem tudod eldönteni? Segítünk kiválasztani.',
  text: 'László és Szimonetta, a Skinlab alapítói személyesen tanácsot adnak.',
};

export const financeTexts: Pick<NonNullable<ShowcaseCopy['finance']>, 'title' | 'perks' | 'cta'> = {
  title: 'Nem kell egy összegben kifizetned.',
  perks: ['0% THM', 'Nincs kezelési díj', 'Nincs rejtett költség'],
  cta: 'Pontos ajánlatot kérek',
};

export const consult: ShowcaseCopy['consult'] = {
  title: 'Nem tudod, melyik gép való neked?',
  text: 'Bármelyik is igaz rád, szeretettel segítünk. Hívj minket, vagy kérj ingyenes konzultációt, és felvesszük veled a kapcsolatot.',
  needs: [
    'Nem tudod, melyiket válaszd',
    'Pontos infót kérsz a gépekről',
    'Megbeszélnéd a vásárlás részleteit',
    'Csak egy jó tanácsra van szükséged',
  ],
  note: 'Általában 1 munkanapon belül visszahívunk.',
};

/** Egytermékes kategóriához: nem „melyik gép”, hanem „ez a gép” kérdés. */
export const consultSingle: ShowcaseCopy['consult'] = {
  ...consult,
  title: 'Kérdésed van a géppel kapcsolatban?',
  needs: [
    'Tudni szeretnéd, illik-e a szalonodhoz',
    'Pontos infót kérsz a gépről',
    'Megbeszélnéd a vásárlás részleteit',
    'Csak egy jó tanácsra van szükséged',
  ],
};

export const visit: ShowcaseCopy['visit'] = {
  title: 'Nézd meg személyesen Érden.',
  text: 'Gyere el a bemutatótermünkbe, és megmutatjuk a gépeket. Előtte egyeztessünk időpontot, hogy a választott gép biztosan ott legyen.',
  booking: 'Előzetes időpontfoglalással',
  demoCta: 'Bemutatót kérek',
};

export const visitSingle: ShowcaseCopy['visit'] = {
  ...visit,
  text: 'Gyere el a bemutatótermünkbe, és élőben megmutatjuk a gépet. Előtte egyeztessünk időpontot, hogy biztosan ott legyen.',
};
