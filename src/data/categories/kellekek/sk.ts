/**
 * Kategória príslušenstva (katalógová varianta) - slovenský text (preklad ./hu.ts).
 */
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { consult, reviews, visit } from '../common.sk';

export const sk: ShowcaseCopy = {
  seo: {
    name: 'Spotrebný materiál a príslušenstvo',
    nameShort: 'Príslušenstvo',
    description: 'Ihlové moduly a odsávač dymu.',
  },
  hero: {
    titleLines: ['Ihlové moduly a doplnky', 'na každodennú prácu.'],
    lead: 'Sterilné jednorazové ihlové moduly pre zariadenia na permanentný make-up a odsávač dymu na carbon peeling. Originálne výrobky od výrobcu, s doručením domov alebo osobným odberom.',
    imageAlt: 'Ihlové moduly Faviamo v darčekovej krabičke',
  },
  usp: [
    { title: 'Originálne výrobky od výrobcu', sub: 'žiadne napodobeniny' },
    { title: 'Doprava Foxpost alebo GLS', sub: 'do boxu alebo domov' },
    { title: 'Osobný odber v Érde', sub: 'v našom showroome' },
    { title: 'Osobné poradenstvo', sub: 'od zakladateľov' },
  ],
  catalog: {
    title: 'Príslušenstvo',
    lead: 'Ihlové moduly a príslušenstvo k tvojim zariadeniam.',
    groups: [
      {
        title: 'Ihlové moduly',
        short: 'Ihlové moduly',
        subtitle: 'Sterilné, jednotlivo balené jednorazové ihlové moduly pre zariadenia na permanentný make-up, vo viacerých veľkostiach, vo vyhotovení 1RL a 3RL.',
      },
      {
        title: 'Príslušenstvo na carbon peeling',
        short: 'Odsávač dymu',
        subtitle: 'Odsávač dymu na laserové ošetrenia a carbon peeling, s filtrom HEPA a filtrom s aktívnym uhlím.',
      },
    ],
  },
  reviews,
  whyBuy: {
    title: 'Prečo nakupovať u nás?',
    lead: 'Čo je dobré vedieť pred objednávkou.',
    imageAlt: 'Ihlové moduly Faviamo v krabičke',
    items: [
      {
        title: 'Originálne ihlové moduly',
        text: 'Mast Oceanheart a Faviamo, originálne výrobky od výrobcu, žiadne napodobeniny.',
      },
      {
        title: 'Sterilné, jednorazové',
        text: 'Ihlové moduly sú balené jednotlivo a sterilne, takže pre každú klientku otvoríš nový.',
      },
      {
        title: 'Pohodlné prevzatie',
        text: 'Do boxu Foxpost alebo s GLS domov, prípadne osobne v našom showroome v Érde.',
      },
      {
        title: 'Pomôžeme ti vybrať',
        text: 'Ak nevieš, ktorá veľkosť ihly sa hodí k tvojej technike, opýtaj sa nás.',
      },
    ],
  },
  consult: {
    ...consult,
    title: 'Nevieš, ktorý ihlový modul potrebuješ?',
    needs: [
      'Nevieš, akú veľkosť potrebuješ',
      'Máš otázku ku kompatibilite',
      'Chceš presné informácie o výrobku',
      'Potrebuješ len dobrú radu',
    ],
  },
  faq: {
    title: 'Časté otázky',
    lead: 'Najčastejšie otázky o príslušenstve. Ak nenájdeš odpoveď, opýtaj sa nás priamo.',
    items: [
      {
        question: 'Aké ihlové moduly predávate?',
        answer: 'Ihlové moduly Mast Oceanheart a Faviamo, s hrúbkou ihly od 0,18 do 0,35 mm, vo vyhotovení 1RL a 3RL. Dostupné veľkosti si vyberieš na stránke produktu.',
      },
      {
        question: 'Na čo slúži odsávač dymu?',
        answer: 'Pri laserových ošetreniach a carbon peelingu odsáva vznikajúci dym. Pracuje s filtrom HEPA a filtrom s aktívnym uhlím a má zabudované LED osvetlenie.',
      },
      {
        question: 'Ako dostanem objednávku?',
        answer: 'Pošleme ju do boxu Foxpost alebo s GLS domov, ale môžeš si ju vyzdvihnúť aj osobne v našom showroome v Érde.',
      },
    ],
  },
  visit: {
    ...visit,
    title: 'Vyzdvihni si ju osobne v Érde.',
    text: 'Objednávku si môžeš vyzdvihnúť v našom showroome, a ak máš otázky, pomôžeme ti priamo na mieste.',
    demoCta: 'Chcem termín',
  },
};
