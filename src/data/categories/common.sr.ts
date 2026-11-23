/**
 * Zajednički srpski (latinica) tekstualni blokovi stranica kategorija (par
 * common.hu.ts, isti nazivi izvoza). Kategorija ih može zameniti u <slug>/sr.ts.
 */
import type { ShowcaseCopy } from '@/lib/types/category-showcase';

export const reviews: NonNullable<ShowcaseCopy['reviews']> = { title: 'Oni koji već rade sa nama' };

export const compareHelp: NonNullable<ShowcaseCopy['compare']>['help'] = {
  title: 'Ne možeš da se odlučiš? Pomoći ćemo ti da izabereš.',
  text: 'László i Szimonetta, suosnivači Skinlaba, lično će te posavetovati.',
};

export const financeTexts: Pick<NonNullable<ShowcaseCopy['finance']>, 'title' | 'perks' | 'cta'> = {
  title: 'Ne moraš sve da platiš odjednom.',
  perks: ['0% EKS', 'Bez naknade za obradu', 'Bez skrivenih troškova'],
  cta: 'Želim tačnu ponudu',
};

export const consult: ShowcaseCopy['consult'] = {
  title: 'Ne znaš koji uređaj je pravi za tebe?',
  text: 'Šta god od ovoga važi za tebe, rado ćemo pomoći. Pozovi nas ili zatraži besplatne konsultacije i javićemo ti se.',
  needs: [
    'Ne znaš koji da izabereš',
    'Želiš tačne informacije o uređajima',
    'Želiš da razgovaraš o detaljima kupovine',
    'Treba ti samo dobar savet',
  ],
  note: 'Obično se javimo u roku od 1 radnog dana.',
};

/** Za kategoriju sa jednim proizvodom: ne „koji uređaj”, nego „ovaj uređaj”. */
export const consultSingle: ShowcaseCopy['consult'] = {
  ...consult,
  title: 'Imaš pitanje o uređaju?',
  needs: [
    'Želiš da znaš da li odgovara tvom salonu',
    'Želiš tačne informacije o uređaju',
    'Želiš da razgovaraš o detaljima kupovine',
    'Treba ti samo dobar savet',
  ],
};

export const visit: ShowcaseCopy['visit'] = {
  title: 'Pogledaj ga uživo u Érdu.',
  text: 'Dođi u naš izložbeni salon i pokazaćemo ti uređaje. Pre toga zakaži termin kako bi izabrani uređaj sigurno bio tamo.',
  booking: 'Uz prethodno zakazivanje',
  demoCta: 'Želim prezentaciju',
};

export const visitSingle: ShowcaseCopy['visit'] = {
  ...visit,
  text: 'Dođi u naš izložbeni salon i pokazaćemo ti uređaj uživo. Pre toga zakaži termin kako bi sigurno bio tamo.',
};
