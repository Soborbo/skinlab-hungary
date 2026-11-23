/**
 * Kategória ošetrujúcich prípravkov (katalógová varianta) - slovenský text (preklad ./hu.ts).
 * Žiadne sľuby k zariadeniam (záruka, školenie, servis) a žiadna dodacia lehota.
 */
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { consult, reviews, visit } from '../common.sk';

export const sk: ShowcaseCopy = {
  seo: {
    name: "Profesionálna kozmetika M'ONDUNIQ",
    nameShort: "M'ONDUNIQ",
    description: "Profesionálne ošetrujúce prípravky M'ONDUNIQ: hydra-liquidy, koktaily účinných látok a prípravky s exozómami.",
  },
  hero: {
    titleLines: ["Prípravky M'ONDUNIQ", 'k prístrojom.'],
    lead: 'Hydra-liquidy na aqua peeling, koktaily účinných látok, prípravky s exozómami a kompletný protokol LaserIQ na carbon peeling. Ako oficiálny distribútor dodávame originálne výrobky.',
    imageAlt: "Ošetrujúca tekutina M'ONDUNIQ AquametiQ Acid Prime na kamennej doske so zelenou vetvičkou",
  },
  usp: [
    { title: 'Originálne, oficiálne výrobky', sub: 'od oficiálneho distribútora' },
    { title: 'Doprava Foxpost alebo GLS', sub: 'do boxu alebo domov' },
    { title: 'Osobný odber v Érde', sub: 'v našom showroome' },
    { title: 'Kompletné protokoly', sub: 'od prípravy po domácu starostlivosť' },
  ],
  catalog: {
    title: 'Prípravky podľa protokolov',
    lead: 'Podľa produktových radov, v poradí krokov ošetrenia, nech hneď vidíš, čo ti ešte v práci chýba.',
    groups: [
      {
        title: "M'ONDUNIQ LaserIQ: carbon peeling a laserový protokol",
        short: 'Protokol LaserIQ',
        subtitle: 'Ku všetkým našim Nd:YAG laserom (PIXEL, MOSAIC, THE FRAME), v poradí krokov protokolu: príprava pleti, ošetrenie carbon peelingom, okamžitá regenerácia a nakoniec starostlivosť, v ktorej sa pokračuje doma.',
      },
      {
        title: 'Hydra-liquidy AquametiQ: tekutiny na aqua peeling',
        short: 'Liquidy AquametiQ',
        subtitle: 'Ošetrujúce tekutiny s účinnými látkami na plnenie do zariadení na hydrodermabráziu a aqua peeling. Štyri varianty: kyslá príprava, hydratačná, rozjasňujúca a osmotická oplachová voda.',
      },
      {
        title: 'Koktaily účinných látok, séra a masky',
        short: 'Koktaily, séra',
        subtitle: 'Na mikroihličkovú mezoterapiu, nano ošetrenia, elektroporáciu, kyslíkovú infúziu a protokoly so studenou plazmou.',
      },
      {
        title: 'Kyselinová exfoliácia a anti-aging starostlivosť o pleť',
        short: 'Anti-aging starostlivosť',
        subtitle: "10 % koncentrát kyseliny fytovej na exfoliáciu v kabíne; sérum a krém HI'FUsion Longevity, očný krém LEPIREV™ a omladzujúca pleťová maska Vitamino'MASK na hydratáciu pleti a zmiernenie viditeľnosti vrások.",
      },
    ],
  },
  reviews,
  whyBuy: {
    title: 'Prečo nakupovať u nás?',
    lead: 'Čo je dobré vedieť pred objednávkou.',
    imageAlt: "Sérum a pleťový krém M'ONDUNIQ HI'FUsion Longevity na salónnom pulte, v pozadí zariadenie na ošetrenie pleti",
    items: [
      {
        title: 'Originálne, oficiálne výrobky',
        text: 'Ako oficiálny distribútor nakupujeme výrobky priamo od výrobcu.',
      },
      {
        title: 'Kompletné protokoly, nie jednotlivé položky',
        text: 'Od prípravy pleti po domácu starostlivosť je na každý krok prípravok, v systéme, ktorý na seba nadväzuje.',
      },
      {
        title: 'Zladené s tvojimi zariadeniami',
        text: 'Carbon peeling, hydrodermabrázia, mikroihličkovanie, studená plazma, mezoterapia: všetky prípravky na jednom mieste.',
      },
      {
        title: 'Pohodlné prevzatie',
        text: 'Do boxu Foxpost alebo s GLS domov, prípadne osobne v našom showroome v Érde.',
      },
    ],
  },
  consult: {
    ...consult,
    title: 'Nevieš, ktorý prípravok potrebuješ?',
    needs: [
      'Nevieš, ktorý sa hodí k tvojmu zariadeniu',
      'Chceš zostaviť protokol',
      'Máš otázku k výrobku',
      'Potrebuješ len dobrú radu',
    ],
  },
  faq: {
    title: 'Časté otázky',
    lead: 'Najčastejšie otázky o ošetrujúcich prípravkoch. Ak nenájdeš odpoveď, opýtaj sa nás priamo.',
    items: [
      {
        question: 'Ktorý prípravok sa hodí k môjmu zariadeniu?',
        answer: 'Na carbon peeling a Nd:YAG laser rad LaserIQ, na zariadenia na hydrodermabráziu a aqua peeling hydra-liquidy AquametiQ. Koktaily účinných látok sú určené na mikroihličkovanie, mezoterapiu, elektroporáciu, kyslíkové ošetrenia a ošetrenia studenou plazmou.',
      },
      {
        question: 'Ako dostanem objednávku?',
        answer: 'Pošleme ju do boxu Foxpost alebo s GLS domov, ale môžeš si ju vyzdvihnúť aj osobne v našom showroome v Érde.',
      },
      {
        question: 'Sú výrobky originálne?',
        answer: "Áno. Ako oficiálny distribútor M'ONDUNIQ nakupujeme výrobky priamo od výrobcu.",
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
