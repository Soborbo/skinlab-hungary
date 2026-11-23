/**
 * Kategória PMU prístrojov - slovenský text (preklad ./hu.ts).
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { compareHelp, consult, reviews } from '../common.sk';

const models: Record<string, ShowcaseModelCopy> = {
  'mast-nano-2': {
    name: 'MAST Nano 2',
    keySpec: '66 g',
    tagline: 'ľahký ako pierko',
    forWho: 'Očné linky, precízna práca',
    desc: 'PMU prístroj s hmotnosťou iba 66 gramov, coreless motorom a pevným zdvihom 2,7 mm. Tichý, takmer nevibruje a vďaka malej veľkosti je mimoriadne vhodný na očné linky.',
    when: [
      'veľa pracuješ na viečkach',
      'hľadáš najľahší prístroj',
      'chceš sa učiť s pevným zdvihom',
    ],
    compare: {
      stroke: '2,7 mm (pevný)',
      motor: 'Coreless, 10 000 ot./min',
      weight: '66 g',
    },
  },
  'mast-p60-premium-sminktetovalo-gep-allithato-lokethosszal': {
    name: 'MAST P60',
    keySpec: 'nastaviteľný zdvih',
    tagline: 'všestranný',
    forWho: 'Každodenná PMU práca',
    desc: 'Bezdrôtový PMU prístroj so zdvihom nastaviteľným v 5 stupňoch (2,2-3,2 mm), takže si ho nastavíš na všetko od chĺpkovej metódy obočia po tieňovanie. 121 g, viac ako 3 hodiny prevádzky.',
    when: [
      'robíš obočie, pery aj očné linky',
      'chceš nastavovať zdvih podľa techniky',
      'chceš pracovať bez kábla',
    ],
    compare: {
      stroke: '5 stupňov (2,2-3,2 mm)',
      motor: 'Coreless, 11 000 ot./min',
      weight: '121 g',
    },
  },
  'mast-p60-sminktetovalo-gep': {
    name: 'MAST P60 sada',
    keySpec: '+ náhradná batéria',
    tagline: 'bez prerušenia',
    forWho: 'Profi štúdio, dlhý pracovný deň',
    desc: 'Rovnaký prístroj MAST P60 s nastaviteľným zdvihom, v balení s náhradnou batériou. Kým sa jedna batéria nabíja, s druhou pracuješ ďalej.',
    when: [
      'máš niekoľko klientok za sebou',
      'nechceš čakať na nabitie',
      'chceš začať s kompletným balením',
    ],
    compare: {
      stroke: '5 stupňov (2,2-3,2 mm)',
      motor: 'Coreless, 11 000 ot./min',
      weight: '121 g',
    },
  },
  'faviamo-flare': {
    name: 'Faviamo Flare',
    keySpec: 'zdvih 4,2 mm',
    tagline: 'luxusný tetovací strojček',
    forWho: 'Linky, farbenie, tieňovanie',
    desc: 'Bezdrôtový tetovací strojček s bezkefovým motorom Mcore-Pro a zdvihom 4,2 mm. 182 g, 4-5 hodín prevádzky, 3 režimy intenzity, vo vyhotovení ružové zlato s kryštálmi.',
    when: [
      'chceš aj tetovať, nielen robiť PMU',
      'potrebuješ silnejší zdvih',
      'chceš, aby bol prístroj ozdobou tvojho pracoviska',
    ],
    compare: {
      stroke: '4,2 mm',
      motor: 'Mcore-Pro bezkefový',
      weight: '182 g',
    },
  },
};

export const sk: ShowcaseCopy = {
  seo: {
    name: 'PMU prístroje a prístroje na permanentný make-up',
    nameShort: 'PMU prístroje',
    description: 'Káblové a bezdrôtové prístroje na permanentný make-up, tetovacie strojčeky a príslušenstvo.',
  },
  hero: {
    titleLines: ['PMU prístroj,', 'ktorý sa prispôsobí tvojej ruke.'],
    lead: 'Ľahké, tiché prístroje na obočie, pery a očné linky. Pomôžeme ti vybrať ten pravý, a keď treba, opravíme ho.',
    imageAlt: 'Permanentný make-up prístrojom MAST v salóne',
  },
  usp: [
    { title: 'Záruka 1 rok', sub: 'na každý prístroj' },
    { title: 'Vlastný servis v Maďarsku', sub: 'rýchla oprava v Érde' },
    { title: 'Univerzálne ihlové moduly', sub: 's ihlami väčšiny výrobcov' },
    { title: 'Osobné poradenstvo', sub: 'od zakladateľov' },
  ],
  models: {
    title: 'Ktorý sa hodí do tvojej ruky?',
    lead: 'Tri PMU prístroje a jeden tetovací strojček. Líšia sa hmotnosťou, dĺžkou zdvihu a motorom.',
    copy: models,
  },
  reviews,
  compare: {
    title: 'Technické porovnanie',
    lead: 'Hlavné rozdiely na prvý pohľad',
    labels: ['Cena', 'Dĺžka zdvihu', 'Motor', 'Hmotnosť', 'Pre koho'],
    help: compareHelp,
  },
  whyBuy: {
    title: 'Na čo sa pri výbere prístroja zamerať?',
    lead: 'Čo je dobré si pred kúpou premyslieť.',
    imageAlt: 'Tetovací strojček Faviamo Flare na stojane',
    items: [
      {
        title: 'Precízne línie',
        text: 'Pri minimálnych vibráciách bude rovnomerný microblading, púdrové obočie aj pigmentácia pier.',
      },
      {
        title: 'Práca bez kábla',
        text: 'MAST P60 a Faviamo Flare idú na batériu, takže neprekáža žiadny kábel. K sade MAST P60 patrí aj náhradná batéria.',
      },
      {
        title: 'Univerzálne ihlové moduly',
        text: 'Prístroje fungujú s univerzálnym cartridge systémom a sú kompatibilné s ihlovými modulmi väčšiny výrobcov.',
      },
      {
        title: 'Profi prístroj za vstupnú cenu',
        text: 'Ani ako začiatočníčka nemusíš investovať veľkú sumu a svoje vybavenie môžeš kedykoľvek neskôr rozšíriť.',
      },
    ],
  },
  consult: {
    ...consult,
    needs: [
      'Nevieš, ktorý si vybrať',
      'Chceš presné informácie o prístrojoch',
      'Máš otázku k ihlovým modulom',
      'Potrebuješ len dobrú radu',
    ],
  },
  faq: {
    title: 'Časté otázky',
    lead: 'Najčastejšie otázky o PMU prístrojoch. Ak nenájdeš odpoveď, opýtaj sa nás priamo.',
    items: [
      {
        question: 'Ako dlho vydrží na jedno nabitie?',
        answer: 'MAST P60 viac ako 3 hodiny, Faviamo Flare 4-5 hodín. K sade MAST P60 patrí náhradná batéria, takže kým sa jedna nabíja, s druhou môžeš pracovať ďalej.',
      },
      {
        question: 'Ktorý prístroj si mám vybrať ako začiatočníčka?',
        answer: 'Ako začiatočníčka je dobré zvoliť ľahko ovládateľný, spoľahlivý prístroj. Pevný zdvih MAST Nano 2 uľahčuje učenie, nastaviteľný zdvih MAST P60 sa zas vyvíja spolu s tvojou technikou.',
      },
      {
        question: 'Aký je rozdiel medzi MAST P60 a sadou MAST P60?',
        answer: 'Prístroj je rovnaký: zdvih nastaviteľný v 5 stupňoch, 121 g. Sada je vo farbe Tiffany a patrí k nej náhradná batéria, takže ani počas dlhého pracovného dňa nemusíš čakať na nabitie.',
      },
      {
        question: 'Aké ihlové moduly môžem používať?',
        answer: 'Prístroje MAST fungujú s univerzálnym cartridge systémom a sú kompatibilné s ihlovými modulmi väčšiny výrobcov. Pre bezpečnú prácu odporúčame kvalitné, sterilné ihlové moduly na jedno použitie.',
      },
    ],
  },
  visit: {
    title: 'Vezmi si ho do ruky v Érde.',
    text: 'Príď do nášho showroomu a prístroje si môžeš vziať do ruky skôr, ako sa rozhodneš. Vopred si dohodni termín.',
    booking: 'Po predchádzajúcej rezervácii termínu',
    demoCta: 'Chcem ukážku',
  },
};
