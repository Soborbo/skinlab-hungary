/**
 * Spoločné slovenské textové bloky stránok kategórií (náprotivok common.hu.ts,
 * rovnaké názvy exportov). Kategória ich môže prepísať v <slug>/sk.ts.
 */
import type { ShowcaseCopy } from '@/lib/types/category-showcase';

export const reviews: NonNullable<ShowcaseCopy['reviews']> = { title: 'Tí, ktorí už s nami pracujú' };

export const compareHelp: NonNullable<ShowcaseCopy['compare']>['help'] = {
  title: 'Nevieš sa rozhodnúť? Pomôžeme ti vybrať.',
  text: 'László a Szimonetta, spoluzakladatelia Skinlab, ti osobne poradia.',
};

export const financeTexts: Pick<NonNullable<ShowcaseCopy['finance']>, 'title' | 'perks' | 'cta'> = {
  title: 'Nemusíš platiť všetko naraz.',
  perks: ['0 % RPMN', 'Žiadny poplatok za vybavenie', 'Žiadne skryté náklady'],
  cta: 'Chcem presnú ponuku',
};

export const consult: ShowcaseCopy['consult'] = {
  title: 'Nevieš, ktoré zariadenie je pre teba to pravé?',
  text: 'Nech platí čokoľvek z toho, radi ti pomôžeme. Zavolaj nám alebo si vyžiadaj bezplatnú konzultáciu a ozveme sa ti.',
  needs: [
    'Nevieš, ktoré si vybrať',
    'Chceš presné informácie o zariadeniach',
    'Chceš prebrať podrobnosti nákupu',
    'Potrebuješ len dobrú radu',
  ],
  note: 'Zvyčajne sa ozveme do 1 pracovného dňa.',
};

/** Pre kategóriu s jedným produktom: nie „ktoré zariadenie“, ale „toto zariadenie“. */
export const consultSingle: ShowcaseCopy['consult'] = {
  ...consult,
  title: 'Máš otázku k zariadeniu?',
  needs: [
    'Chceš vedieť, či sa hodí do tvojho salónu',
    'Chceš presné informácie o zariadení',
    'Chceš prebrať podrobnosti nákupu',
    'Potrebuješ len dobrú radu',
  ],
};

export const visit: ShowcaseCopy['visit'] = {
  title: 'Pozri si ho osobne v Érde.',
  text: 'Príď do nášho showroomu a zariadenia ti ukážeme. Vopred si dohodni termín, aby tam vybrané zariadenie určite bolo.',
  booking: 'Po predchádzajúcej rezervácii termínu',
  demoCta: 'Chcem ukážku',
};

export const visitSingle: ShowcaseCopy['visit'] = {
  ...visit,
  text: 'Príď do nášho showroomu a zariadenie ti ukážeme naživo. Vopred si dohodni termín, aby tam určite bolo.',
};
