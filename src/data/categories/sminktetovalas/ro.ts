/**
 * Pagina categoriei Aparate PMU - text în română (traducerea ./hu.ts).
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { compareHelp, consult, reviews } from '../common.ro';

const models: Record<string, ShowcaseModelCopy> = {
  'mast-nano-2': {
    name: 'MAST Nano 2',
    keySpec: '66 g',
    tagline: 'ușor ca un fulg',
    forWho: 'Tuș de ochi, lucru precis',
    desc: 'Aparat PMU de doar 66 de grame, cu motor coreless și cursă fixă de 2,7 mm. Silențios, aproape fără vibrații, iar dimensiunea mică îl face deosebit de potrivit pentru tușul de ochi.',
    when: [
      'lucrezi mult pe pleoape',
      'cauți cel mai ușor aparat',
      'ai vrea să înveți cu o cursă fixă',
    ],
    compare: {
      stroke: '2,7 mm (fixă)',
      motor: 'Coreless, 10 000 RPM',
      weight: '66 g',
    },
  },
  'mast-p60-premium-sminktetovalo-gep-allithato-lokethosszal': {
    name: 'MAST P60',
    keySpec: 'cursă reglabilă',
    tagline: 'cel versatil',
    forWho: 'Lucru PMU zilnic',
    desc: 'Aparat PMU wireless cu cursă reglabilă în 5 trepte (2,2-3,2 mm), așa că îl poți regla pentru orice, de la sprâncenele fir cu fir până la umbrire. 121 g, peste 3 ore de funcționare.',
    when: [
      'faci sprâncene, buze și tuș de ochi',
      'ai regla cursa în funcție de tehnică',
      'ai lucra fără cablu',
    ],
    compare: {
      stroke: '5 trepte (2,2-3,2 mm)',
      motor: 'Coreless, 11 000 RPM',
      weight: '121 g',
    },
  },
  'mast-p60-sminktetovalo-gep': {
    name: 'Set MAST P60',
    keySpec: '+ baterie de rezervă',
    tagline: 'cel fără întreruperi',
    forWho: 'Studio profesionist, zile lungi de lucru',
    desc: 'Același aparat MAST P60 cu cursă reglabilă, într-un pachet cu o baterie de rezervă. Cât timp o baterie se încarcă, lucrezi mai departe cu cealaltă.',
    when: [
      'ai mai multe cliente una după alta',
      'nu ai aștepta încărcarea',
      'ai începe cu un pachet complet',
    ],
    compare: {
      stroke: '5 trepte (2,2-3,2 mm)',
      motor: 'Coreless, 11 000 RPM',
      weight: '121 g',
    },
  },
  'faviamo-flare': {
    name: 'Faviamo Flare',
    keySpec: 'cursă 4,2 mm',
    tagline: 'aparatul de tatuaj de lux',
    forWho: 'Conturare, colorare, umbrire',
    desc: 'Aparat de tatuaj wireless cu motor brushless Mcore-Pro și cursă de 4,2 mm. 182 g, 4-5 ore de funcționare, 3 moduri de intensitate, în finisaj rose gold cu cristale.',
    when: [
      'ai vrea să faci și tatuaje, nu doar PMU',
      'ai nevoie de o cursă mai puternică',
      'vrei ca aparatul să fie și podoaba stației tale de lucru',
    ],
    compare: {
      stroke: '4,2 mm',
      motor: 'Mcore-Pro brushless',
      weight: '182 g',
    },
  },
};

export const ro: ShowcaseCopy = {
  seo: {
    name: 'Aparate PMU și de machiaj permanent',
    nameShort: 'Aparate PMU',
    description: 'Aparate de machiaj permanent cu fir și wireless, aparate de tatuaj și accesorii.',
  },
  hero: {
    titleLines: ['Aparat PMU', 'care se adaptează mâinii tale.'],
    lead: 'Aparate ușoare și silențioase pentru sprâncene, buze și tuș de ochi. Te ajutăm să-l alegi pe cel potrivit și, dacă e nevoie, îl reparăm.',
    imageAlt: 'Machiaj permanent cu aparat MAST în salon',
  },
  usp: [
    { title: 'Garanție 1 an', sub: 'pentru fiecare aparat' },
    { title: 'Service propriu în Ungaria', sub: 'reparații rapide la Érd' },
    { title: 'Module de ace universale', sub: 'cu acele majorității producătorilor' },
    { title: 'Consultanță personală', sub: 'de la fondatori' },
  ],
  models: {
    title: 'Care se potrivește mâinii tale?',
    lead: 'Trei aparate PMU și un aparat de tatuaj. Diferența este în greutate, lungimea cursei și motor.',
    copy: models,
  },
  reviews,
  compare: {
    title: 'Comparație tehnică',
    lead: 'Diferențele principale dintr-o privire',
    labels: ['Preț', 'Lungimea cursei', 'Motor', 'Greutate', 'Recomandat pentru'],
    help: compareHelp,
  },
  whyBuy: {
    title: 'La ce să fii atentă când alegi aparatul?',
    lead: 'Ce merită să gândești înainte de cumpărare.',
    imageAlt: 'Aparatul de tatuaj Faviamo Flare pe suport',
    items: [
      {
        title: 'Linii precise',
        text: 'Cu vibrații minime, microbladingul, powder brows și pigmentarea buzelor ies uniform.',
      },
      {
        title: 'Lucru fără cablu',
        text: 'MAST P60 și Faviamo Flare funcționează pe baterie, deci nu te încurcă niciun cablu. Setul MAST P60 vine și cu o baterie de rezervă.',
      },
      {
        title: 'Module de ace universale',
        text: 'Aparatele funcționează cu un sistem universal de cartușe și sunt compatibile cu modulele de ace ale majorității producătorilor.',
      },
      {
        title: 'Aparat profesional la preț de intrare',
        text: 'Nici ca începătoare nu trebuie să investești o sumă mare, iar mai târziu îți poți extinde oricând echipamentele.',
      },
    ],
  },
  consult: {
    ...consult,
    needs: [
      'Nu știi pe care să-l alegi',
      'Vrei informații exacte despre aparate',
      'Ai o întrebare despre modulele de ace',
      'Ai nevoie doar de un sfat bun',
    ],
  },
  faq: {
    title: 'Întrebări frecvente',
    lead: 'Cele mai frecvente întrebări despre aparatele PMU. Dacă nu găsești răspunsul, întreabă-ne direct.',
    items: [
      {
        question: 'Cât rezistă cu o singură încărcare?',
        answer: 'MAST P60 peste 3 ore, Faviamo Flare 4-5 ore. Setul MAST P60 vine cu o baterie de rezervă, așa că, cât timp una se încarcă, poți lucra mai departe cu cealaltă.',
      },
      {
        question: 'Ce aparat să aleg ca începătoare?',
        answer: 'Ca începătoare merită să alegi un aparat ușor de folosit și de încredere. Cursa fixă a MAST Nano 2 ușurează învățarea, iar cursa reglabilă a MAST P60 evoluează odată cu tehnica ta.',
      },
      {
        question: 'Care este diferența dintre MAST P60 și setul MAST P60?',
        answer: 'Aparatul este același: cursă reglabilă în 5 trepte, 121 g. Setul are culoarea Tiffany și vine cu o baterie de rezervă, așa că nici într-o zi lungă de lucru nu trebuie să aștepți încărcarea.',
      },
      {
        question: 'Ce module de ace pot folosi?',
        answer: 'Aparatele MAST funcționează cu un sistem universal de cartușe și sunt compatibile cu modulele de ace ale majorității producătorilor. Pentru un lucru sigur recomandăm module de ace de calitate, sterile, de unică folosință.',
      },
    ],
  },
  visit: {
    title: 'Ia-l în mână la Érd.',
    text: 'Vino în showroomul nostru și poți lua aparatele în mână înainte să te decizi. Stabilește înainte o programare.',
    booking: 'Cu programare prealabilă',
    demoCta: 'Cere un demo',
  },
};
