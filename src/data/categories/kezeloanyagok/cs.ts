/**
 * Kategorie ošetřujících přípravků (katalogová varianta) - český text (překlad ./hu.ts).
 * Žádné sliby k přístrojům (záruka, školení, servis) a žádná dodací lhůta.
 */
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { consult, reviews, visit } from '../common.cs';

export const cs: ShowcaseCopy = {
  seo: {
    name: "Profesionální kosmetika M'ONDUNIQ",
    nameShort: "M'ONDUNIQ",
    description: "Profesionální ošetřující přípravky M'ONDUNIQ: hydra-liquidy, koktejly účinných látek a přípravky s exozomy.",
  },
  hero: {
    titleLines: ["Přípravky M'ONDUNIQ", 'k tvým přístrojům.'],
    lead: 'Hydra-liquidy pro aqua peeling, koktejly účinných látek, přípravky s exozomy a kompletní protokol LaserIQ pro carbon peeling. Jako oficiální distributor dodáváme originální výrobky.',
    imageAlt: "Ošetřující tekutina M'ONDUNIQ AquametiQ Acid Prime na kamenné desce se zelenou větvičkou",
  },
  usp: [
    { title: 'Originální, oficiální výrobky', sub: 'od oficiálního distributora' },
    { title: 'Doprava Foxpost nebo GLS', sub: 'do boxu nebo domů' },
    { title: 'Osobní odběr v Érdu', sub: 'v našem showroomu' },
    { title: 'Kompletní protokoly', sub: 'od přípravy po domácí péči' },
  ],
  catalog: {
    title: 'Přípravky podle protokolů',
    lead: 'Podle produktových řad, v pořadí kroků ošetření, ať hned vidíš, co ti ještě v práci chybí.',
    groups: [
      {
        title: "M'ONDUNIQ LaserIQ: carbon peeling a laserový protokol",
        short: 'Protokol LaserIQ',
        subtitle: 'Ke všem našim Nd:YAG laserům (PIXEL, MOSAIC, THE FRAME), v pořadí kroků protokolu: příprava pleti, ošetření carbon peelingem, okamžitá regenerace a nakonec péče, ve které se pokračuje doma.',
      },
      {
        title: 'Hydra-liquidy AquametiQ: tekutiny pro aqua peeling',
        short: 'Liquidy AquametiQ',
        subtitle: 'Ošetřující tekutiny s účinnými látkami k plnění do přístrojů na hydrodermabrazi a aqua peeling. Čtyři varianty: kyselá příprava, hydratační, rozjasňující a osmotická oplachová voda.',
      },
      {
        title: 'Koktejly účinných látek, séra a masky',
        short: 'Koktejly, séra',
        subtitle: 'Pro mikrojehličkovou mezoterapii, nano ošetření, elektroporaci, kyslíkovou infuzi a protokoly se studenou plazmou.',
      },
      {
        title: 'Kyselinová exfoliace a anti-aging péče o pleť',
        short: 'Anti-aging péče',
        subtitle: "10% koncentrát kyseliny fytové pro exfoliaci v kabině; sérum a krém HI'FUsion Longevity, oční krém LEPIREV™, omlazující pleťová maska Vitamino'MASK a textilní maska HI'FUsion Bio-Cell k hydrataci pleti a zmírnění viditelnosti vrásek.",
      },
    ],
  },
  reviews,
  whyBuy: {
    title: 'Proč kupovat přípravky u nás?',
    lead: 'Co je dobré vědět před objednávkou.',
    imageAlt: "Sérum a pleťový krém M'ONDUNIQ HI'FUsion Longevity na salonním pultu, v pozadí přístroj na ošetření pleti",
    items: [
      {
        title: 'Originální, oficiální výrobky',
        text: 'Jako oficiální distributor nakupujeme výrobky přímo od výrobce.',
      },
      {
        title: 'Kompletní protokoly, ne jednotlivé položky',
        text: 'Od přípravy pleti po domácí péči je pro každý krok přípravek, v systému, který na sebe navazuje.',
      },
      {
        title: 'Sladěné s tvými přístroji',
        text: 'Carbon peeling, hydrodermabraze, mikrojehličkování, studená plazma, mezoterapie: všechny přípravky na jednom místě.',
      },
      {
        title: 'Pohodlné převzetí',
        text: 'Do boxu Foxpost nebo s GLS domů, případně osobně v našem showroomu v Érdu.',
      },
    ],
  },
  consult: {
    ...consult,
    title: 'Nevíš, který přípravek potřebuješ?',
    needs: [
      'Nevíš, který se hodí k tvému přístroji',
      'Chceš sestavit protokol',
      'Máš otázku k výrobku',
      'Potřebuješ jen dobrou radu',
    ],
  },
  faq: {
    title: 'Časté dotazy',
    lead: 'Nejčastější otázky o ošetřujících přípravcích. Pokud nenajdeš odpověď, zeptej se nás přímo.',
    items: [
      {
        question: 'Který přípravek se hodí k mému přístroji?',
        answer: 'Pro carbon peeling a Nd:YAG laser řada LaserIQ, pro přístroje na hydrodermabrazi a aqua peeling hydra-liquidy AquametiQ. Koktejly účinných látek jsou určeny pro mikrojehličkování, mezoterapii, elektroporaci, kyslíková ošetření a ošetření studenou plazmou.',
      },
      {
        question: 'Jak dostanu objednávku?',
        answer: 'Pošleme ji do boxu Foxpost nebo s GLS domů, ale můžeš si ji vyzvednout i osobně v našem showroomu v Érdu.',
      },
      {
        question: 'Jsou výrobky originální?',
        answer: "Ano. Jako oficiální distributor M'ONDUNIQ nakupujeme výrobky přímo od výrobce.",
      },
    ],
  },
  visit: {
    ...visit,
    title: 'Vyzvedni si ji osobně v Érdu.',
    text: 'Objednávku si můžeš vyzvednout v našem showroomu, a když máš otázky, pomůžeme ti přímo na místě.',
    demoCta: 'Chci termín',
  },
};
