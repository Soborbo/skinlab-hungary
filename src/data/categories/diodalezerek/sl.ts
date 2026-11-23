/**
 * Stran kategorije diodnih laserjev - slovensko besedilo (prevod ./hu.ts).
 * Cene, moč, specifikacije in slike prihajajo iz JSON-ov izdelkov.
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { compareHelp, consult, financeTexts, reviews } from '../common.sl';

const models: Record<string, ShowcaseModelCopy> = {
  athena: {
    tagline: 'nadzor in natančnost',
    forWho: 'Začetek / dodatna storitev',
    desc: 'Pametna programska oprema, ki priporoči nastavitve glede na tip kože in dlak. Stabilna, predvidljiva naprava za vse, ki z odstranjevanjem dlak šele začenjajo ali ga dodajajo v ponudbo.',
    when: [
      'iščeš cenovno ugodno, a profesionalno začetno napravo',
      'odstranjevanje dlak bo dodatna storitev',
      'predvidljivost ti je pomembnejša od tempa',
    ],
  },
  olympia: {
    tagline: 'zmagovalna moč',
    forWho: 'Tempo z nadzorom',
    desc: 'Izhodna moč 1200W in 5 nastavljivih velikosti spota: natančno delo na manjših površinah, hiter napredek na velikih.',
    when: [
      'iščeš zmogljivo napravo po realni ceni',
      'želiš hitrejše tretmaje, a z nadzorom',
      'imaš raznolike stranke in predele telesa',
    ],
  },
  helios: {
    tagline: 'prava moč svetlobe',
    forWho: 'Klinika, velik promet',
    desc: 'Naš najzmogljivejši model: 1600W, globlji učinek, krajši čas tretmaja. Za salone in klinike z velikim prometom.',
    when: [
      'imaš vsak dan veliko strank za odstranjevanje dlak',
      's krajšimi tretmaji bi ponudila več terminov',
      'iščeš vrhunski razred',
    ],
  },
  empire: {
    tagline: 'inteligentni sistem',
    forWho: 'Diagnostika + kartoteka strank',
    desc: 'Diagnostika dlak in kože z mikrokamero, digitalna kartoteka strank s fotografijami pred in po, naprava pa sama priporoči parametre.',
    when: [
      'želiš dokumentirati tretmaje',
      'želiš nastavitve utemeljiti na analizi',
      'želiš delati s plastnimi impulzi (SHR STACK)',
    ],
  },
};

export const sl: ShowcaseCopy = {
  seo: {
    name: 'Profesionalni diodni laserji',
    nameShort: 'Diodni laserji',
    description: 'Profesionalni diodni laserji s 4 valovnimi dolžinami za trajno odstranjevanje dlak.',
  },
  hero: {
    titleLines: ['Diodni laser, ki', 'pripelje stranke nazaj.'],
    lead: 'Trajno odstranjevanje dlak s tehnologijo 4 valovnih dolžin, za vse tipe kože in dlak. Pomagamo ti izbrati napravo, ki ustreza tvojemu salonu, te usposobimo in jo po potrebi popravimo.',
    imageAlt: 'Odstranjevanje dlak z diodnim laserjem OLYMPIA v salonu',
  },
  usp: [
    { title: '2 leti polne garancije', sub: 'za vsako novo napravo' },
    { title: '8-urno usposabljanje na kraju samem', sub: '+ 6 mesecev podpore' },
    { title: 'Lasten servis na Madžarskem', sub: 'hitro popravilo v Érdu' },
    { title: 'Obroki z 0 % EOM', sub: '50 % predplačilo + mesečni obroki' },
  ],
  models: {
    title: 'Kateri ustreza tvojemu salonu?',
    lead: 'Vsi štirje imajo 4 valovne dolžine. Razlika je v tempu, načinu tretmaja in v tem, koliko dokumentiraš.',
    copy: models,
  },
  reviews,
  compare: {
    title: 'Tehnična primerjava',
    lead: 'Glavni parametri na prvi pogled',
    labels: ['Cena', 'Moč', 'Valovne dolžine', 'Velikost spota', 'Hlajenje', 'Komu priporočamo'],
    help: compareHelp,
  },
  whyBuy: {
    title: 'Zakaj se splača kupiti diodni laser?',
    lead: 'Kaj je dobro premisliti pred nakupom.',
    imageAlt: 'Glava diodnega laserja OLYMPIA med tretmajem',
    items: [
      {
        title: 'Hitro povračilo naložbe',
        text: 'Pri približno 3-4 strankah na delovni dan, ceni tretmaja 12 000 Ft in strošku 2 000 Ft na tretma ti mesečno ostane 600 000-800 000 Ft. Tako se naprava lahko povrne v približno 3,3-3,7 meseca. Ponazoritveni izračun, ne finančna obljuba.',
      },
      {
        title: 'Stranke, ki se vračajo',
        text: 'Stranke kupijo paket 6-8 tretmajev, nato pa enkrat letno pridejo na vzdrževalni tretma.',
      },
      {
        title: 'Učinkovitejši od IPL',
        text: 'Bolj ciljan, deluje globlje, potrebnih je manj tretmajev. Stranka prej vidi rezultat.',
      },
      {
        title: 'Za vse tipe kože',
        text: '4 valovne dolžine so učinkovite na svetli in temni koži, na tankih in debelih dlakah.',
      },
    ],
  },
  finance: {
    ...financeTexts,
    lead: 'Brezobrestni obroki z 0 % EOM: 50 % predplačilo, preostanek v 3, 6 ali 12 mesečnih obrokih. Brez stroškov obdelave in brez skritih stroškov.',
  },
  training: {
    titleLines: ['Tega se ne boš učila sama.', 'Naučimo te vsega.'],
    text: '8-urno usposabljanje na kraju samem v tvojem salonu, nato 6 mesecev podpore. Usposabljanje za upravljavce s certifikacijo FAR in uradnim certifikatom.',
    cta: 'Naša usposabljanja',
  },
  consult,
  faq: {
    title: 'Pogosta vprašanja',
    lead: 'Najpogostejša vprašanja o diodnih laserjih. Če ne najdeš odgovora, nas vprašaj neposredno.',
    items: [
      {
        question: 'Kakšna je razlika med napravami z 1, 3 in 4 valovnimi dolžinami?',
        answer: '1 valovna dolžina (808 nm) je klasika za svetlo do srednje temno kožo. 3 valovne dolžine obravnavajo tudi temnejšo kožo in tanjše dlake. 4 valovne dolžine (755 + 808 + 940 + 1064 nm) so najvsestranskejše in učinkovitejše tudi pri svetlih dlakah.',
      },
      {
        question: 'Zakaj je moč (vati) pomembna?',
        answer: 'Večja moč = hitrejši tretma, več strank na dan. Salonom z velikim prometom priporočamo več kot 1000W.',
      },
      {
        question: 'Ali tretma z diodnim laserjem boli?',
        answer: 'Safirno hlajenje kože ga naredi skoraj nebolečega, večina strank čuti le blago toploto.',
      },
      {
        question: 'Koliko časa traja en tretma?',
        answer: 'Pazduhe 5-10 minut, noge 20-40 minut, celo telo 60-90 minut, odvisno od naprave.',
      },
    ],
  },
  visit: {
    title: 'Preizkusi vse v Érdu.',
    text: 'Pridi v naš razstavni salon in v živo preizkusi vse štiri diodne laserje, preden se odločiš.',
    booking: 'Po predhodnem dogovoru',
    demoCta: 'Želim predstavitev',
  },
};
