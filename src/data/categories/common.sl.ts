/**
 * Skupni slovenski besedilni bloki strani kategorij (par common.hu.ts,
 * enaka imena izvozov). Kategorija jih lahko preglasi v <slug>/sl.ts.
 */
import type { ShowcaseCopy } from '@/lib/types/category-showcase';

export const reviews: NonNullable<ShowcaseCopy['reviews']> = { title: 'Tisti, ki že delajo z nami' };

export const compareHelp: NonNullable<ShowcaseCopy['compare']>['help'] = {
  title: 'Se ne moreš odločiti? Pomagamo ti izbrati.',
  text: 'László in Szimonetta, soustanovitelja Skinlaba, ti bosta osebno svetovala.',
};

export const financeTexts: Pick<NonNullable<ShowcaseCopy['finance']>, 'title' | 'perks' | 'cta'> = {
  title: 'Ni ti treba plačati vsega naenkrat.',
  perks: ['0 % EOM', 'Brez stroškov obdelave', 'Brez skritih stroškov'],
  cta: 'Želim natančno ponudbo',
};

export const consult: ShowcaseCopy['consult'] = {
  title: 'Ne veš, katera naprava je prava zate?',
  text: 'Karkoli od tega velja zate, z veseljem ti pomagamo. Pokliči nas ali zahtevaj brezplačno svetovanje in oglasili se ti bomo.',
  needs: [
    'Ne veš, katero izbrati',
    'Želiš natančne informacije o napravah',
    'Želiš se pogovoriti o podrobnostih nakupa',
    'Potrebuješ le dober nasvet',
  ],
  note: 'Običajno te pokličemo nazaj v 1 delovnem dnevu.',
};

/** Za kategorijo z enim izdelkom: ne „katera naprava”, ampak „ta naprava”. */
export const consultSingle: ShowcaseCopy['consult'] = {
  ...consult,
  title: 'Imaš vprašanje o napravi?',
  needs: [
    'Želiš vedeti, ali ustreza tvojemu salonu',
    'Želiš natančne informacije o napravi',
    'Želiš se pogovoriti o podrobnostih nakupa',
    'Potrebuješ le dober nasvet',
  ],
};

export const visit: ShowcaseCopy['visit'] = {
  title: 'Oglej si jo v živo v Érdu.',
  text: 'Pridi v naš razstavni salon in pokazali ti bomo naprave. Prej se dogovori za termin, da bo izbrana naprava zagotovo tam.',
  booking: 'Po predhodnem dogovoru',
  demoCta: 'Želim predstavitev',
};

export const visitSingle: ShowcaseCopy['visit'] = {
  ...visit,
  text: 'Pridi v naš razstavni salon in pokazali ti bomo napravo v živo. Prej se dogovori za termin, da bo zagotovo tam.',
};
