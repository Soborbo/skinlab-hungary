/**
 * Společné české textové bloky stránek kategorií (protějšek common.hu.ts,
 * stejné názvy exportů). Kategorie je může přepsat v <slug>/cs.ts.
 */
import type { ShowcaseCopy } from '@/lib/types/category-showcase';

export const reviews: NonNullable<ShowcaseCopy['reviews']> = { title: 'Ti, kdo už s námi pracují' };

export const compareHelp: NonNullable<ShowcaseCopy['compare']>['help'] = {
  title: 'Nemůžeš se rozhodnout? Pomůžeme ti vybrat.',
  text: 'László a Szimonetta, spoluzakladatelé Skinlab, ti osobně poradí.',
};

export const financeTexts: Pick<NonNullable<ShowcaseCopy['finance']>, 'title' | 'perks' | 'cta'> = {
  title: 'Nemusíš platit všechno najednou.',
  perks: ['0% RPSN', 'Žádný poplatek za vyřízení', 'Žádné skryté náklady'],
  cta: 'Chci přesnou nabídku',
};

export const consult: ShowcaseCopy['consult'] = {
  title: 'Nevíš, který přístroj je pro tebe ten pravý?',
  text: 'Ať platí cokoli z toho, rádi ti pomůžeme. Zavolej nám nebo si vyžádej konzultaci zdarma a ozveme se ti.',
  needs: [
    'Nevíš, který si vybrat',
    'Chceš přesné informace o přístrojích',
    'Chceš probrat podrobnosti nákupu',
    'Potřebuješ jen dobrou radu',
  ],
  note: 'Obvykle se ozveme do 1 pracovního dne.',
};

/** Pro kategorii s jedním produktem: ne „který přístroj“, ale „tento přístroj“. */
export const consultSingle: ShowcaseCopy['consult'] = {
  ...consult,
  title: 'Máš otázku k přístroji?',
  needs: [
    'Chceš vědět, jestli se hodí do tvého salonu',
    'Chceš přesné informace o přístroji',
    'Chceš probrat podrobnosti nákupu',
    'Potřebuješ jen dobrou radu',
  ],
};

export const visit: ShowcaseCopy['visit'] = {
  title: 'Prohlédni si ho osobně v Érdu.',
  text: 'Přijď do našeho showroomu a přístroje ti ukážeme. Předem si domluv termín, aby tam vybraný přístroj určitě byl.',
  booking: 'Po předchozí rezervaci termínu',
  demoCta: 'Chci ukázku',
};

export const visitSingle: ShowcaseCopy['visit'] = {
  ...visit,
  text: 'Přijď do našeho showroomu a přístroj ti ukážeme naživo. Předem si domluv termín, aby tam určitě byl.',
};
