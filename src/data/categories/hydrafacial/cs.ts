/**
 * Stránka kategorie hydrafacial - český text (překlad ./hu.ts).
 * Ceny, specifikace a obrázky jsou z produktových JSON.
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { compareHelp, consult, financeTexts, reviews } from '../common.cs';

const models: Record<string, ShowcaseModelCopy> = {
  hydrascanpro: {
    name: 'HydraScan PRO+',
    keySpec: '8 hlavic',
    tagline: 'chytrá analýza pleti',
    forWho: 'AI analýza, prémiová kabina',
    desc: 'Multifunkční přístroj postavený na hydrodermabrazi se 4K kamerou a analýzou pleti s umělou inteligencí. Podle analýzy doporučí ošetření, produkty i domácí péči a digitální karta klienta vše zdokumentuje.',
    when: [
      'chceš ošetření začínat analýzou pleti',
      'chceš zvýšit tržby i doporučováním produktů',
      'chceš dokumentovat pokroky klientky',
    ],
    compare: {
      tech: 'Hydrodermabraze + AI analýza pleti',
      heads: '8 hlavic (včetně LED masky)',
      ai: '4K kamera se třemi spektry (cca 2 min)',
    },
  },
  'hidra-mist-elite': {
    name: 'HydraMIST Elite',
    keySpec: '11 v 1',
    tagline: 'všestranný systém',
    forWho: 'Mnoho ošetření z jednoho přístroje',
    desc: '11 možností ošetření v jednom přístroji: vakuová hydrodermabraze, kyslíková aplikace účinných látek, radiofrekvenční zpevnění a LED kyslíková kupole, ve které může během ošetření hrát hudba.',
    when: [
      'chceš nabízet mnoho ošetření pleti z jednoho přístroje',
      'chceš nabízet i kyslíková a RF ošetření',
      'chceš klientkám dopřát prémiový zážitek',
    ],
    compare: {
      tech: 'Hydrodermabraze + kyslík + RF',
      heads: '11 funkcí (vakuum, UZ, RF, kyslík, LED)',
      ai: 'Ne',
    },
  },
  hydralume: {
    name: 'HydraLUME V10',
    keySpec: '12 hlavic + LED',
    tagline: 'centrum péče o pleť',
    forWho: 'LED terapie, péče o pokožku hlavy',
    desc: 'Stojanové pojízdné centrum péče o pleť s vortex hydrodermabrazí, pěti křídlovými LED panely a 12 hlavicemi. Hloubkové čištění, zpevnění, ošetření akné a péče o pokožku hlavy z jednoho přístroje.',
    when: [
      'chceš sestavit kompletní omlazující protokol',
      'chceš nabízet i LED světelnou terapii',
      'péče o pokožku hlavy patří do tvé nabídky',
    ],
    compare: {
      tech: 'Vortex hydrodermabraze + LED',
      heads: '12 hlavic + 5 křídlových LED panelů',
      ai: 'Ne',
    },
  },
};

export const cs: ShowcaseCopy = {
  seo: {
    name: 'Hydrodermabraze a multifunkční přístroje',
    nameShort: 'Hydrafacial přístroje',
    description: 'Hydrodermabrazní a kombinované kosmetické přístroje.',
  },
  hero: {
    titleLines: ['Hydrafacial přístroj,', 'po kterém pleť září.'],
    lead: 'Hloubkové čištění, hydratace a omlazení pleti v jednom přístroji, s viditelným výsledkem hned po prvním ošetření. Pomůžeme ti vybrat přístroj, který se hodí do tvého salonu, zaškolíme tě, a když je potřeba, opravíme ho.',
    imageAlt: 'Školení obsluhy HydraScan PRO+ v showroomu Skinlab',
  },
  usp: [
    { title: 'Plná záruka 2 roky', sub: 'na každý nový přístroj' },
    { title: 'Individuální školení obsluhy', sub: 'v našem showroomu' },
    { title: 'Vlastní servis v Maďarsku', sub: 'rychlá oprava v Érdu' },
    { title: 'Splátky s 0% RPSN', sub: '50% záloha + měsíční splátky' },
  ],
  models: {
    title: 'Který se hodí do tvého salonu?',
    lead: 'Všechny tři stojí na hydrodermabrazi. Liší se počtem hlavic, doplňkovými technologiemi a tím, jestli potřebuješ analýzu pleti.',
    copy: models,
  },
  reviews,
  compare: {
    title: 'Technické srovnání',
    lead: 'Hlavní rozdíly na první pohled',
    labels: ['Cena', 'Technologie', 'Hlavice', 'AI analýza pleti', 'Záruka', 'Pro koho'],
    help: compareHelp,
  },
  whyBuy: {
    title: 'Proč se vyplatí koupit hydrafacial přístroj?',
    lead: 'Co je dobré si před nákupem promyslet.',
    imageAlt: 'Hydrodermabrazní ošetření pleti přístrojem Skinlab v salonu',
    items: [
      {
        title: 'Okamžitý výsledek',
        text: 'Hned po prvním ošetření je pleť viditelně krásnější a zářivější. Klientka rozdíl cítí okamžitě.',
      },
      {
        title: 'Všestranná ošetření',
        text: 'Čištění, hydratace, anti-aging a ošetření pigmentových skvrn jedním přístrojem.',
      },
      {
        title: 'Dobře nacenitelné ošetření',
        text: 'Za hydrafacial ošetření si salony mohou účtovat 15 000-30 000 Ft, takže se přístroj může rychle vrátit.',
      },
      {
        title: 'Analýza pleti před klientkou',
        text: '4K kamera HydraScan PRO+ ukáže stav pleti a podle něj doporučí ošetření i domácí péči.',
      },
    ],
  },
  finance: {
    ...financeTexts,
    lead: 'Bezúročné splátky s 0% RPSN: 50% záloha, zbytek ve 3 nebo 6 měsíčních splátkách. Žádný poplatek za vyřízení a žádné skryté náklady.',
  },
  training: {
    titleLines: ['Nebudeš se to učit sama.', 'Všechno tě naučíme.'],
    text: 'Individuální školení obsluhy v našem showroomu: předáme ti vlastní osvědčenou techniku a i po školení se můžeš spolehnout na naši odbornou podporu.',
    cta: 'Naše školení',
  },
  consult,
  faq: {
    title: 'Časté dotazy',
    lead: 'Nejčastější otázky o ošetření hydrafacial. Pokud nenajdeš odpověď, zeptej se nás přímo.',
    items: [
      {
        question: 'Jaký je rozdíl mezi klasickým čištěním pleti a hydrafacial?',
        answer: 'Hydrafacial pracuje s vakuovou technologií, která kromě hloubkového čištění zajišťuje i infuzi séra. Je bezbolestný, nezpůsobuje zarudnutí a klientka může hned pokračovat ve dni. Po klasickém čištění bývá obličej často několik dní červený.',
      },
      {
        question: 'Jak často lze hydrafacial ošetření provádět?',
        answer: 'Udržovací ošetření se obvykle doporučuje každé 4-6 týdnů. Jako kúru ho lze ke zlepšení stavu pleti dělat i každý týden. Je to velmi šetrný postup.',
      },
      {
        question: 'Hodí se pro všechny typy pleti?',
        answer: 'Ano. Hydrafacial je jedno z nejšetrnějších ošetření pleti, lze ho použít i na citlivou pleť a rosaceu. Nedoporučuje se pouze u aktivního zánětlivého akné.',
      },
    ],
  },
  visit: {
    title: 'Vyzkoušej si to naživo v Érdu.',
    text: 'Přijď do našeho showroomu a prohlédni si přístroje naživo, než se rozhodneš.',
    booking: 'Po předchozí rezervaci termínu',
    demoCta: 'Chci ukázku',
  },
};
