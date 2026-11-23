/**
 * Kategorie přístrojů na tělo - český text (překlad ./hu.ts).
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { compareHelp, consult, financeTexts, reviews, visit } from '../common.cs';

const models: Record<string, ShowcaseModelCopy> = {
  'freeze-me-slim': {
    name: 'FREEZE ME SLIM',
    keySpec: '4 hlavice najednou',
    tagline: 'přístroj na kryolipolýzu',
    forWho: 'Cílená redukce tuku',
    desc: 'Kryolipolýza (zmrazování tuku) se 4 současně použitelnými hlavicemi, chlazení až na -10 °C. V balení je i bioimpedanční analyzační váha, takže pokrok klientky můžeš sledovat v číslech.',
    when: [
      'chceš nabízet ošetření odolných tukových polštářů',
      'chceš ošetřovat více partií těla najednou',
      'chceš výsledek ukázat měřením',
    ],
    compare: {
      tech: 'Kryolipolýza (zmrazování tuku)',
      area: 'Břicho, pas, stehna, hýždě, paže, záda',
    },
  },
  'the-shaper': {
    name: 'THE SHAPER',
    keySpec: '4 technologie',
    tagline: 'kompletní tvarování postavy',
    forWho: 'Tvarování postavy, celulitida, zpevnění',
    desc: 'Čtyři technologie v jednom přístroji: vakuová válečková masáž, radiofrekvence, infračervený laser 940 nm a ultrazvuková kavitace 40 kHz. Na obličej i tělo, se samostatnými aplikátory.',
    when: [
      'chceš nabízet i ošetření celulitidy',
      'chceš ošetřovat obličej i tělo jedním přístrojem',
      'chceš více technologií na jednom místě',
    ],
    compare: {
      tech: 'Vakuum + válečky, RF, IR laser, kavitace',
      area: 'Tělo a obličej',
    },
  },
};

export const cs: ShowcaseCopy = {
  seo: {
    name: 'Přístroje na tvarování těla a postavy',
    nameShort: 'Ošetření těla',
    description: 'Kryolipolýza, tvarování kontur a další přístroje na tvarování těla a postavy.',
  },
  hero: {
    titleLines: ['Přístroj na tělo, kterým', 'tvaruješ bez operace.'],
    lead: 'Zmrazování tuku, tvarování postavy a ošetření celulitidy bez bolesti a bez rekonvalescence. Pomůžeme ti vybrat přístroj, který se hodí do tvého salonu, a když je potřeba, opravíme ho.',
    imageAlt: 'Přístroj na ošetření těla THE SHAPER',
  },
  usp: [
    { title: 'Plná záruka 2 roky', sub: 'na každý nový přístroj' },
    { title: 'Školicí balíček', sub: 'studijní materiály a protokoly' },
    { title: 'Vlastní servis v Maďarsku', sub: 'rychlá oprava v Érdu' },
    { title: 'Splátky s 0% RPSN', sub: '50% záloha + měsíční splátky' },
  ],
  models: {
    title: 'Který se hodí do tvého salonu?',
    lead: 'FREEZE ME SLIM cílí na tukové polštáře, THE SHAPER se čtyřmi technologiemi na kompletní tvarování postavy.',
    copy: models,
  },
  reviews,
  compare: {
    title: 'Srovnání',
    lead: 'Hlavní rozdíly na první pohled',
    labels: ['Cena', 'Technologie', 'Hlavice', 'Ošetřovaná oblast', 'Pro koho'],
    help: compareHelp,
  },
  whyBuy: {
    title: 'Proč se vyplatí koupit přístroj na tělo?',
    lead: 'Co je dobré si před nákupem promyslet.',
    imageAlt: 'Hlavice THE SHAPER v ruce',
    items: [
      {
        title: 'Více technologií v jednom přístroji',
        text: 'THE SHAPER spojuje vakuovou válečkovou masáž, RF, infračervený laser a kavitaci, takže nemusíš kupovat samostatné přístroje.',
      },
      {
        title: 'Více partií najednou',
        text: 'Čtyři hlavice FREEZE ME SLIM pracují současně, takže můžeš ošetřovat více partií těla paralelně.',
      },
      {
        title: 'Klientky, které chodí na kúru',
        text: 'Zmrazování tuku je obvykle kúra o 3 sezeních, tvarování postavy o 6-10 sezeních, takže se klientka k tobě vrací.',
      },
      {
        title: 'Hotový školicí balíček',
        text: 'K přístroji patří studijní materiály, protokoly ošetření a edukační materiály pro klientky, takže od první klientky pracuješ odborně.',
      },
    ],
  },
  finance: {
    ...financeTexts,
    lead: 'Bezúročné splátky s 0% RPSN: 50% záloha, zbytek ve 3 nebo 6 měsíčních splátkách. Žádný poplatek za vyřízení a žádné skryté náklady.',
  },
  consult,
  faq: {
    title: 'Časté dotazy',
    lead: 'Nejčastější otázky o přístrojích na tělo. Pokud nenajdeš odpověď, zeptej se nás přímo.',
    items: [
      {
        question: 'Jak funguje zmrazování tuku?',
        answer: 'FREEZE ME SLIM kontrolovaně ochlazuje tukové buňky až na -10 °C. Buňky krystalizují a tělo je přirozenou cestou postupně odbourá a vyloučí. Výsledek není okamžitý, projeví se během několika týdnů.',
      },
      {
        question: 'Kolik sezení má kúra?',
        answer: 'U zmrazování tuku se doporučují 3 sezení s měsíčním odstupem. S THE SHAPER obvykle 6-10 sezení, přesný protokol závisí na ošetřované oblasti a stavu klientky.',
      },
      {
        question: 'Na kterých částech těla lze THE SHAPER použít?',
        answer: 'Na obličeji a krku ke zpevnění a redukci vrásek. Na těle na břiše, pase, bocích, hýždích, stehnech, pažích a zádech k tvarování postavy, redukci celulitidy a zpevnění pokožky.',
      },
      {
        question: 'Kdy se zmrazování tuku nedoporučuje?',
        answer: 'V těhotenství, při alergii na chlad a u některých onemocnění. Před ošetřením je nutné každou klientku posoudit, s tím pomáhají karty klientek a protokoly z balíčku.',
      },
      {
        question: 'Co je v ceně?',
        answer: 'K oběma přístrojům patří kompletní školicí balíček (studijní materiály, protokoly ošetření, edukační materiály pro klientky) a 2 roky záruka, k FREEZE ME SLIM navíc systém analýzy těla. Praktické školení s živými modely je možné za příplatek.',
      },
    ],
  },
  visit,
};
