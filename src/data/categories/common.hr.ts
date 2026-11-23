/**
 * Zajednički hrvatski tekstni blokovi stranica kategorija (par common.hu.ts,
 * isti nazivi izvoza). Kategorija ih može nadjačati u <slug>/hr.ts.
 */
import type { ShowcaseCopy } from '@/lib/types/category-showcase';

export const reviews: NonNullable<ShowcaseCopy['reviews']> = { title: 'Oni koji već rade s nama' };

export const compareHelp: NonNullable<ShowcaseCopy['compare']>['help'] = {
  title: 'Ne možeš se odlučiti? Pomoći ćemo ti odabrati.',
  text: 'László i Szimonetta, suosnivači Skinlaba, osobno će te savjetovati.',
};

export const financeTexts: Pick<NonNullable<ShowcaseCopy['finance']>, 'title' | 'perks' | 'cta'> = {
  title: 'Ne moraš sve platiti odjednom.',
  perks: ['0% EKS', 'Bez naknade za obradu', 'Bez skrivenih troškova'],
  cta: 'Želim točnu ponudu',
};

export const consult: ShowcaseCopy['consult'] = {
  title: 'Ne znaš koji je uređaj pravi za tebe?',
  text: 'Što god od ovoga vrijedi za tebe, rado ćemo pomoći. Nazovi nas ili zatraži besplatnu konzultaciju i javit ćemo ti se.',
  needs: [
    'Ne znaš koji odabrati',
    'Želiš točne informacije o uređajima',
    'Želiš razgovarati o detaljima kupnje',
    'Treba ti samo dobar savjet',
  ],
  note: 'Obično se javimo u roku od 1 radnog dana.',
};

/** Za kategoriju s jednim proizvodom: ne „koji uređaj”, nego „ovaj uređaj”. */
export const consultSingle: ShowcaseCopy['consult'] = {
  ...consult,
  title: 'Imaš pitanje o uređaju?',
  needs: [
    'Želiš znati odgovara li tvom salonu',
    'Želiš točne informacije o uređaju',
    'Želiš razgovarati o detaljima kupnje',
    'Treba ti samo dobar savjet',
  ],
};

export const visit: ShowcaseCopy['visit'] = {
  title: 'Pogledaj ga uživo u Érdu.',
  text: 'Dođi u naš izložbeni salon i pokazat ćemo ti uređaje. Prije toga dogovori termin kako bi odabrani uređaj sigurno bio tamo.',
  booking: 'Uz prethodnu najavu termina',
  demoCta: 'Želim prezentaciju',
};

export const visitSingle: ShowcaseCopy['visit'] = {
  ...visit,
  text: 'Dođi u naš izložbeni salon i pokazat ćemo ti uređaj uživo. Prije toga dogovori termin kako bi sigurno bio tamo.',
};
