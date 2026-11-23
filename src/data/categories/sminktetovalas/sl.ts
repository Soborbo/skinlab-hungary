/**
 * Kategorija PMU naprav - slovensko besedilo (prevod ./hu.ts).
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { compareHelp, consult, reviews } from '../common.sl';

const models: Record<string, ShowcaseModelCopy> = {
  'mast-nano-2': {
    name: 'MAST Nano 2',
    keySpec: '66 g',
    tagline: 'lahka kot pero',
    forWho: 'Črtalo za oči, natančno delo',
    desc: 'PMU naprava, ki tehta le 66 gramov, s coreless motorjem in fiksnim hodom 2,7 mm. Tiha, skoraj ne vibrira, zaradi majhne velikosti pa je še posebej primerna za črtalo za oči.',
    when: [
      'veliko delaš na vekah',
      'iščeš najlažjo napravo',
      'bi se učila s fiksnim hodom',
    ],
    compare: {
      stroke: '2,7 mm (fiksni)',
      motor: 'Coreless, 10 000 vrt./min',
      weight: '66 g',
    },
  },
  'mast-p60-premium-sminktetovalo-gep-allithato-lokethosszal': {
    name: 'MAST P60',
    keySpec: 'nastavljiv hod',
    tagline: 'vsestranska',
    forWho: 'Vsakodnevno PMU delo',
    desc: 'Brezžična PMU naprava s hodom, nastavljivim v 5 stopnjah (2,2-3,2 mm), tako da jo lahko nastaviš za vse, od obrvi z metodo dlačic do senčenja. 121 g, več kot 3 ure delovanja.',
    when: [
      'delaš obrvi, ustnice in črtalo za oči',
      'bi hod nastavljala glede na tehniko',
      'bi delala brez kabla',
    ],
    compare: {
      stroke: '5 stopenj (2,2-3,2 mm)',
      motor: 'Coreless, 11 000 vrt./min',
      weight: '121 g',
    },
  },
  'mast-p60-sminktetovalo-gep': {
    name: 'MAST P60 set',
    keySpec: '+ rezervna baterija',
    tagline: 'brez prekinitev',
    forWho: 'Profi studio, dolg delovni dan',
    desc: 'Ista naprava MAST P60 z nastavljivim hodom, v paketu z rezervno baterijo. Medtem ko se ena baterija polni, z drugo delaš naprej.',
    when: [
      'imaš več strank zaporedoma',
      'ne bi čakala na polnjenje',
      'bi začela s celotnim paketom',
    ],
    compare: {
      stroke: '5 stopenj (2,2-3,2 mm)',
      motor: 'Coreless, 11 000 vrt./min',
      weight: '121 g',
    },
  },
  'faviamo-flare': {
    name: 'Faviamo Flare',
    keySpec: 'hod 4,2 mm',
    tagline: 'luksuzna naprava za tetoviranje',
    forWho: 'Linije, barvanje, senčenje',
    desc: 'Brezžična naprava za tetoviranje z brezkrtačnim motorjem Mcore-Pro in hodom 4,2 mm. 182 g, 4-5 ur delovanja, 3 načini intenzivnosti, v izvedbi rožnato zlato s kristali.',
    when: [
      'bi tudi tetovirala, ne le delala PMU',
      'potrebuješ močnejši hod',
      'želiš, da je naprava tudi okras tvojega delovnega mesta',
    ],
    compare: {
      stroke: '4,2 mm',
      motor: 'Mcore-Pro brezkrtačni',
      weight: '182 g',
    },
  },
};

export const sl: ShowcaseCopy = {
  seo: {
    name: 'PMU naprave in naprave za trajno ličenje',
    nameShort: 'PMU naprave',
    description: 'Žične in brezžične naprave za trajno ličenje, naprave za tetoviranje in dodatki.',
  },
  hero: {
    titleLines: ['PMU naprava,', 'ki se prilagodi tvoji roki.'],
    lead: 'Lahke, tihe naprave za obrvi, ustnice in črtalo za oči. Pomagamo ti izbrati pravo in jo po potrebi popravimo.',
    imageAlt: 'Trajno ličenje z napravo MAST v salonu',
  },
  usp: [
    { title: '1 leto garancije', sub: 'za vsako napravo' },
    { title: 'Lasten servis na Madžarskem', sub: 'hitro popravilo v Érdu' },
    { title: 'Univerzalni igelni moduli', sub: 'z iglami večine proizvajalcev' },
    { title: 'Osebno svetovanje', sub: 'od ustanoviteljev' },
  ],
  models: {
    title: 'Katera ustreza tvoji roki?',
    lead: 'Tri PMU naprave in ena naprava za tetoviranje. Razlika je v teži, dolžini hoda in motorju.',
    copy: models,
  },
  reviews,
  compare: {
    title: 'Tehnična primerjava',
    lead: 'Glavne razlike na prvi pogled',
    labels: ['Cena', 'Dolžina hoda', 'Motor', 'Teža', 'Komu priporočamo'],
    help: compareHelp,
  },
  whyBuy: {
    title: 'Na kaj paziti pri izbiri naprave?',
    lead: 'Kaj je dobro premisliti pred nakupom.',
    imageAlt: 'Naprava za tetoviranje Faviamo Flare na stojalu',
    items: [
      {
        title: 'Natančne linije',
        text: 'Ob minimalnih vibracijah bodo microblading, powder brows in pigmentacija ustnic enakomerni.',
      },
      {
        title: 'Delo brez kabla',
        text: 'MAST P60 in Faviamo Flare delujeta na baterijo, zato ni kabla, ki bi motil. Kompletu MAST P60 je priložena tudi rezervna baterija.',
      },
      {
        title: 'Univerzalni igelni moduli',
        text: 'Naprave delujejo z univerzalnim cartridge sistemom in so združljive z igelnimi moduli večine proizvajalcev.',
      },
      {
        title: 'Profi naprava po vstopni ceni',
        text: 'Tudi kot začetnica ti ni treba vložiti velikega zneska, opremo pa lahko kadarkoli pozneje razširiš.',
      },
    ],
  },
  consult: {
    ...consult,
    needs: [
      'Ne veš, katero izbrati',
      'Želiš natančne informacije o napravah',
      'Imaš vprašanje o igelnih modulih',
      'Potrebuješ le dober nasvet',
    ],
  },
  faq: {
    title: 'Pogosta vprašanja',
    lead: 'Najpogostejša vprašanja o PMU napravah. Če ne najdeš odgovora, nas vprašaj neposredno.',
    items: [
      {
        question: 'Kako dolgo zdrži z enim polnjenjem?',
        answer: 'MAST P60 več kot 3 ure, Faviamo Flare 4-5 ur. Kompletu MAST P60 je priložena rezervna baterija, zato lahko, medtem ko se ena polni, z drugo delaš naprej.',
      },
      {
        question: 'Katero napravo naj izberem kot začetnica?',
        answer: 'Kot začetnica se splača izbrati enostavno in zanesljivo napravo. Fiksni hod naprave MAST Nano 2 olajša učenje, nastavljivi hod naprave MAST P60 pa se razvija skupaj s tvojo tehniko.',
      },
      {
        question: 'Kakšna je razlika med MAST P60 in kompletom MAST P60?',
        answer: 'Naprava je ista: hod, nastavljiv v 5 stopnjah, 121 g. Komplet je v barvi Tiffany in ima rezervno baterijo, zato ti niti ob dolgem delovnem dnevu ni treba čakati na polnjenje.',
      },
      {
        question: 'Katere igelne module lahko uporabljam?',
        answer: 'Naprave MAST delujejo z univerzalnim cartridge sistemom in so združljive z igelnimi moduli večine proizvajalcev. Za varno delo priporočamo kakovostne, sterilne igelne module za enkratno uporabo.',
      },
    ],
  },
  visit: {
    title: 'Primi jo v roke v Érdu.',
    text: 'Pridi v naš razstavni salon in naprave lahko primeš v roke, preden se odločiš. Prej se dogovori za termin.',
    booking: 'Po predhodnem dogovoru',
    demoCta: 'Želim predstavitev',
  },
};
