/**
 * Pagina categoriei de lasere ND:YAG - Romanian copy (translation of ./hu.ts).
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { compareHelp, consult, financeTexts, reviews, visit } from '../common.ro';

const models: Record<string, ShowcaseModelCopy> = {
  pixelcarbonlezer: {
    name: 'PIXEL',
    keySpec: '4 capete · 1200 mJ',
    tagline: 'laserul carbon compact',
    forWho: 'Început compact, carbon peeling',
    desc: 'Laser ND:YAG Q-switched de masă cu 4 capete de tratament (532, 755, 1064 și 1320 nm): carbon peeling, îmbunătățirea aspectului pielii, estomparea pigmentului și a tatuajelor într-un singur sistem. Răcire cu apă în circuit închis, ecran tactil de 4,3", încape și într-un spațiu mic.',
    when: [
      'ai vrea să adaugi carbon peeling în ofertă',
      'ai puțin spațiu în cabinet',
      'ai vrea să începi cu o investiție mai mică',
    ],
    compare: {
      waves: '532 + 755 + 1064 + 1320 nm (4 capete)',
      screen: 'Ecran tactil de 4,3"',
      cooling: 'Sistem de răcire cu apă în circuit închis',
    },
  },
  frame: {
    name: 'FRAME',
    keySpec: '4 lungimi de undă',
    tagline: 'laserul inteligent cu Android',
    forWho: 'Tatuaje, pete pigmentare, carbon',
    desc: 'Laser ND:YAG cu Android, ecran tactil de 13,3", 4 lungimi de undă și răcire integrată a piesei de mână. Pentru îndepărtarea tatuajelor și a petelor pigmentare, dar și pentru carbon peeling.',
    when: [
      'ai vrea să oferi și îndepărtarea tatuajelor',
      'ai lucra cu mai multe culori',
      'ți-ai dori o interfață mare și clară',
    ],
    compare: {
      waves: '4 lungimi de undă',
      screen: 'Ecran tactil Android de 13,3"',
      cooling: 'Răcire integrată a piesei de mână',
    },
  },
};

export const ro: ShowcaseCopy = {
  seo: {
    name: 'Aparate laser ND:YAG Q-switched',
    nameShort: 'Lasere ND:YAG',
    description: 'Lasere pentru îndepărtarea tatuajelor și a petelor pigmentare.',
  },
  hero: {
    titleLines: ['Laser ND:YAG cu care', 'dispar și tatuajele.'],
    lead: 'Îndepărtarea tatuajelor și a petelor pigmentare, carbon peeling cu tehnologie Q-switched. Te ajutăm să alegi aparatul potrivit salonului tău, te instruim și, dacă e nevoie, îl reparăm.',
    imageAlt: 'Tratament carbon peeling cu laserul PIXEL ND:YAG, cu ochelari de protecție',
  },
  usp: [
    { title: 'Garanție completă 2 ani', sub: 'pentru fiecare aparat nou' },
    { title: 'Instruire certificată FAR', sub: 'în grup mic, cu model' },
    { title: 'Service propriu în Ungaria', sub: 'reparații rapide la Érd' },
    { title: 'Rate cu DAE 0%', sub: 'avans 50% + rate lunare' },
  ],
  models: {
    title: 'Care se potrivește salonului tău?',
    lead: 'Ambele sunt lasere ND:YAG Q-switched. Diferența este în numărul de lungimi de undă, în interfața de comandă și în răcire.',
    copy: models,
  },
  reviews,
  compare: {
    title: 'Comparație tehnică',
    lead: 'Diferențele principale dintr-o privire',
    labels: ['Preț', 'Lungimi de undă', 'Ecran', 'Răcirea piesei de mână', 'Recomandat pentru'],
    help: compareHelp,
  },
  whyBuy: {
    title: 'De ce merită să cumperi un laser ND:YAG?',
    lead: 'Ce merită să gândești înainte de cumpărare.',
    imageAlt: 'Aparatul laser PIXEL ND:YAG în showroom',
    items: [
      {
        title: 'Face față și culorilor dificile',
        text: 'Laserul ND:YAG Q-switched tratează și tatuajele verzi și albastre, mai greu de îndepărtat.',
      },
      {
        title: 'Carbon peeling',
        text: 'Cunoscut și ca Hollywood peeling: strălucire imediată, pori mai mici, ten gras mai echilibrat.',
      },
      {
        title: 'Tratarea petelor pigmentare',
        text: 'Estomparea petelor solare, a petelor de vârstă și a machiajului permanent, cu alegerea corectă a lungimii de undă.',
      },
      {
        title: 'Marjă mare',
        text: 'Saloanele pot cere 15-50 000 Ft pe ședință pentru îndepărtarea tatuajelor și 8-15 000 Ft pentru carbon peeling.',
      },
    ],
  },
  finance: {
    ...financeTexts,
    lead: 'Rate fără dobândă cu DAE 0%: avans 50%, restul în 3 sau 6 rate lunare. Fără comision de administrare și fără costuri ascunse.',
  },
  training: {
    titleLines: ['Nu înveți singură.', 'Te învățăm tot.'],
    text: 'Curs de operator pentru laser ND:YAG Q-switched, cu cel mult 4 participanți: alegerea corectă a lungimilor de undă și a parametrilor, carbon peeling, îndepărtarea machiajului permanent și a petelor pigmentare, cu practică pe model. Primești un certificat înregistrat FAR, cu număr B.',
    cta: 'Detaliile cursului',
  },
  consult,
  faq: {
    title: 'Întrebări frecvente',
    lead: 'Cele mai frecvente întrebări despre laserele ND:YAG. Dacă nu găsești răspunsul, întreabă-ne direct.',
    items: [
      {
        question: 'Ce aparat să aleg?',
        answer: 'PIXEL este un aparat de masă compact, de început, cu 4 capete de tratament (532, 755, 1064 și 1320 nm): carbon peeling, îmbunătățirea aspectului pielii, estomparea pigmentului și a tatuajelor într-un singur sistem. FRAME, cu 4 lungimi de undă, ecran tactil Android și răcire integrată a piesei de mână, acoperă tratamentele pentru tatuaje, pete pigmentare și carbon peeling.',
      },
      {
        question: 'Câte ședințe sunt necesare pentru îndepărtarea completă a unui tatuaj?',
        answer: 'Depinde de mărimea, culoarea și vechimea tatuajului. În medie sunt necesare 6-12 tratamente, la intervale de 6-8 săptămâni. Negrul și culorile închise dispar mai repede.',
      },
      {
        question: 'Este dureroasă îndepărtarea tatuajelor?',
        answer: 'Cu o răcire potrivită, disconfortul este moderat. Mulți îl compară cu realizarea tatuajului: neplăcut, dar suportabil. Se poate folosi și o cremă anestezică.',
      },
      {
        question: 'Ce este carbon peelingul și cui i se recomandă?',
        answer: 'La carbon peeling aplici pe față o mască de carbon, pe care o îndepărtezi cu laserul. Este recomandat pentru tenul gras, cu tendință acneică, și pentru porii dilatați. Rezultatul se vede imediat, fără timp de recuperare.',
      },
    ],
  },
  visit,
};
