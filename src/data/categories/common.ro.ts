/**
 * Blocurile de text comune în română ale paginilor de categorie (perechea lui
 * common.hu.ts, aceleași nume de export). O categorie le poate suprascrie în <slug>/ro.ts.
 */
import type { ShowcaseCopy } from '@/lib/types/category-showcase';

export const reviews: NonNullable<ShowcaseCopy['reviews']> = { title: 'Cei care lucrează deja cu noi' };

export const compareHelp: NonNullable<ShowcaseCopy['compare']>['help'] = {
  title: 'Nu te poți decide? Te ajutăm să alegi.',
  text: 'László și Szimonetta, cofondatorii Skinlab, te sfătuiesc personal.',
};

export const financeTexts: Pick<NonNullable<ShowcaseCopy['finance']>, 'title' | 'perks' | 'cta'> = {
  title: 'Nu trebuie să plătești totul dintr-odată.',
  perks: ['DAE 0%', 'Fără comision de administrare', 'Fără costuri ascunse'],
  cta: 'Vreau o ofertă exactă',
};

export const consult: ShowcaseCopy['consult'] = {
  title: 'Nu știi ce aparat ți se potrivește?',
  text: 'Oricare dintre acestea ți se aplică, te ajutăm cu drag. Sună-ne sau cere o consultanță gratuită și te contactăm noi.',
  needs: [
    'Nu știi pe care să-l alegi',
    'Vrei informații exacte despre aparate',
    'Ai vrea să discuți detaliile achiziției',
    'Ai nevoie doar de un sfat bun',
  ],
  note: 'De obicei te sunăm înapoi în cel mult 1 zi lucrătoare.',
};

/** Pentru categoriile cu un singur produs: nu „ce aparat”, ci „acest aparat”. */
export const consultSingle: ShowcaseCopy['consult'] = {
  ...consult,
  title: 'Ai o întrebare despre aparat?',
  needs: [
    'Vrei să știi dacă se potrivește salonului tău',
    'Vrei informații exacte despre aparat',
    'Ai vrea să discuți detaliile achiziției',
    'Ai nevoie doar de un sfat bun',
  ],
};

export const visit: ShowcaseCopy['visit'] = {
  title: 'Vezi-l personal la Érd.',
  text: 'Vino în showroomul nostru și îți arătăm aparatele. Stabilește înainte o programare, ca aparatul ales să fie sigur acolo.',
  booking: 'Cu programare prealabilă',
  demoCta: 'Cere un demo',
};

export const visitSingle: ShowcaseCopy['visit'] = {
  ...visit,
  text: 'Vino în showroomul nostru și îți arătăm aparatul pe viu. Stabilește înainte o programare, ca să fie sigur acolo.',
};
