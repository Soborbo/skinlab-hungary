/**
 * Pagina categoriei mezoterapie (un singur produs) - text în română (traducerea ./hu.ts).
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { consultSingle, reviews, visitSingle } from '../common.ro';

const models: Record<string, ShowcaseModelCopy> = {
  dermatechplus_noneedle_mesotherapy: {
    name: 'DermaTECH+',
    keySpec: 'fără ace, până la 800 kDa',
    tagline: 'mezoterapia fără ace',
    forWho: 'Infuzie de substanțe active, tot anul',
    desc: 'Aparat de mezoterapie fără ace cu tehnologie DermoPenetrate Max: impulsurile de microcurent și vibrația de precizie introduc substanța activă în piele, până la o dimensiune moleculară de 800 kDa, fără înțepături, electroliză și modificarea pH-ului.',
    when: [
      'ai oferi infuzie de substanțe active fără durere',
      'ai oferi mezoterapie și vara',
      'ai folosi propriile seruri și fiole',
    ],
  },
};

export const ro: ShowcaseCopy = {
  seo: {
    name: 'Dispozitive de mezoterapie',
    nameShort: 'Mezoterapie',
    description: 'Sisteme de mezoterapie fără ace și clasice pentru introducerea substanțelor active.',
  },
  hero: {
    titleLines: ['Mezoterapie fără ace,', 'fără durere.'],
    lead: 'Introducerea profundă a substanțelor active fără înțepături și fără timp de recuperare, pentru orice tip de piele, în orice anotimp. Te instruim și, dacă e nevoie, reparăm aparatul.',
    imageAlt: 'Piesa de mână DermaTECH+ pentru mezoterapie fără ace, ținută în mână',
  },
  usp: [
    { title: 'Garanție completă 2 ani', sub: 'pentru fiecare aparat nou' },
    { title: 'Service propriu în Ungaria', sub: 'reparații rapide la Érd' },
    { title: 'Instruire completă inclusă', sub: 'te instruim pe aparat' },
    { title: 'Consultanță personală', sub: 'de la fondatori' },
  ],
  models: {
    title: 'Descoperă DermaTECH+',
    lead: 'Introducerea substanțelor active la nivel molecular, prin canalele naturale de apă ale pielii.',
    copy: models,
  },
  reviews,
  whyBuy: {
    title: 'De ce merită să investești în mezoterapia fără ace?',
    lead: 'Ce merită să gândești înainte de cumpărare.',
    imageAlt: 'Aparatul DermaTECH+ de mezoterapie fără ace',
    items: [
      {
        title: 'Tratament nedureros',
        text: 'Fără înțepături, microleziuni sau sângerare, clienta își poate continua ziua imediat după tratament.',
      },
      {
        title: 'Utilizabil tot anul',
        text: 'Pentru că pielea nu este lezată, nu devine fotosensibilă, așa că poți trata cu el și vara, la soare puternic.',
      },
      {
        title: 'Și molecule mai mari',
        text: 'Introduce substanțe active de până la 800 kDa: acid hialuronic, peptide, factori de creștere.',
      },
      {
        title: 'Tratament ușor de valorificat',
        text: 'Pentru un tratament de mezoterapie fără ace saloanele cer de obicei 10 000-25 000 Ft.',
      },
    ],
  },
  consult: consultSingle,
  faq: {
    title: 'Întrebări frecvente',
    lead: 'Cele mai frecvente întrebări despre mezoterapia fără ace. Dacă nu găsești răspunsul, întreabă-ne direct.',
    items: [
      {
        question: 'Ce este tehnologia DermoPenetrate Max?',
        answer: 'Folosește impulsuri de microcurent și vibrație de precizie pentru a deschide temporar canalele naturale de apă ale celulelor pielii (aquaporinele). Astfel substanța activă pătrunde în piele fără ac, la nivel molecular.',
      },
      {
        question: 'Este dureros tratamentul?',
        answer: 'Nu. Fără înțepături, microleziuni, senzație de arsură sau de înțepare. Clienta primește un tratament plăcut și relaxant și își poate continua ziua imediat după.',
      },
      {
        question: 'Cu ce substanțe active se poate folosi?',
        answer: 'Cu aproape orice ser și fiolă cosmetică: acid hialuronic, peptide, vitamina C, retinol, niacinamidă, factori de creștere, substanțe active de iluminare și regenerare.',
      },
      {
        question: 'De ce se poate folosi și vara?',
        answer: 'Pentru că tratamentul nu lezează pielea, nu există înțepături și descuamare, așa că pielea nu devine fotosensibilă. Spre deosebire de mezoterapia cu ace, se poate folosi în siguranță și la soare puternic.',
      },
      {
        question: 'Din câte tratamente constă o cură?',
        answer: 'O cură constă din 3-6 tratamente, o dată pe lună. Un tratament durează 25-30 de minute.',
      },
    ],
  },
  visit: visitSingle,
};
