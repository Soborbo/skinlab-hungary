/**
 * Pagina categoriei hydrafacial - text în română (traducerea ./hu.ts).
 * Prețurile, specificațiile și imaginile vin din JSON-urile produselor.
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { compareHelp, consult, financeTexts, reviews } from '../common.ro';

const models: Record<string, ShowcaseModelCopy> = {
  hydrascanpro: {
    name: 'HydraScan PRO+',
    keySpec: '7 piese',
    tagline: 'analiza inteligentă a pielii',
    forWho: 'Analiză AI, cabină premium',
    desc: 'Aparat multifuncțional centrat pe hidrodermabraziune, cu cameră 4K și analiză a pielii cu inteligență artificială. Pe baza analizei recomandă tratament, produse și rutină de acasă, iar fișa digitală a clientului documentează totul.',
    when: [
      'ai începe tratamentul cu o analiză a pielii',
      'ai crește încasările și prin recomandări de produse',
      'ai documenta progresul clientei',
    ],
    compare: {
      tech: 'Hidrodermabraziune + analiză AI a pielii',
      heads: '7 piese de mână',
      ai: 'Cameră 4K cu trei spectre (aprox. 2 min)',
    },
  },
  'hidra-mist-elite': {
    name: 'HydraMIST Elite',
    keySpec: '11 în 1',
    tagline: 'sistemul versatil',
    forWho: 'Multe tratamente, un singur aparat',
    desc: '11 opțiuni de tratament într-un singur aparat: hidrodermabraziune cu vacuum, infuzie de substanțe active cu oxigen, fermitate prin radiofrecvență și o cupolă LED cu oxigen, în care în timpul tratamentului poate rula și muzică.',
    when: [
      'ai oferi multe tratamente faciale cu un singur aparat',
      'ai oferi și tratamente cu oxigen și RF',
      'ai oferi clientelor o experiență premium',
    ],
    compare: {
      tech: 'Hidrodermabraziune + oxigen + RF',
      heads: '11 funcții (vacuum, US, RF, oxigen, LED)',
      ai: 'Nu',
    },
  },
  hydralume: {
    name: 'HydraLUME V10',
    keySpec: '12 piese + LED',
    tagline: 'centrul de îngrijire facială',
    forWho: 'Terapie LED, îngrijirea scalpului',
    desc: 'Centru de îngrijire facială vertical, pe roți, cu hidrodermabraziune vortex, cinci panouri LED rabatabile și 12 piese de mână. Curățare profundă, fermitate, tratarea acneei și îngrijirea scalpului cu un singur aparat.',
    when: [
      'ai construi un protocol complet de întinerire',
      'ai oferi și terapie cu lumină LED',
      'îngrijirea scalpului face parte din oferta ta',
    ],
    compare: {
      tech: 'Hidrodermabraziune vortex + LED',
      heads: '12 piese de mână + 5 panouri LED rabatabile',
      ai: 'Nu',
    },
  },
};

export const ro: ShowcaseCopy = {
  seo: {
    name: 'Hidrodermabraziune și aparate multifuncționale',
    nameShort: 'Aparate hydrafacial',
    description: 'Aparate de hidrodermabraziune și aparate cosmetice combinate.',
  },
  hero: {
    titleLines: ['Hydrafacial pentru', 'o piele care strălucește.'],
    lead: 'Curățare profundă, hidratare și întinerirea pielii într-un singur aparat, cu rezultat vizibil încă de la primul tratament. Te ajutăm să alegi aparatul potrivit salonului tău, te instruim și, dacă e nevoie, îl reparăm.',
    imageAlt: 'Instruire de operare HydraScan PRO+ în showroomul Skinlab',
  },
  usp: [
    { title: 'Garanție completă 2 ani', sub: 'pentru fiecare aparat nou' },
    { title: 'Instruire individuală de operare', sub: 'în showroomul nostru' },
    { title: 'Service propriu în Ungaria', sub: 'reparații rapide la Érd' },
    { title: 'Rate cu DAE 0%', sub: 'avans 50% + rate lunare' },
  ],
  models: {
    title: 'Care se potrivește salonului tău?',
    lead: 'Toate trei se bazează pe hidrodermabraziune. Diferența este în numărul de piese de mână, în tehnologiile suplimentare și în faptul dacă ai nevoie de analiza pielii.',
    copy: models,
  },
  reviews,
  compare: {
    title: 'Comparație tehnică',
    lead: 'Diferențele principale dintr-o privire',
    labels: ['Preț', 'Tehnologie', 'Piese de mână', 'Analiză AI a pielii', 'Garanție', 'Recomandat pentru'],
    help: compareHelp,
  },
  whyBuy: {
    title: 'De ce merită să cumperi un aparat hydrafacial?',
    lead: 'Ce merită să gândești înainte de cumpărare.',
    imageAlt: 'Tratament facial de hidrodermabraziune cu un aparat Skinlab în salon',
    items: [
      {
        title: 'Rezultat imediat',
        text: 'Încă de la primul tratament pielea este vizibil mai frumoasă și mai radiantă. Clienta simte imediat diferența.',
      },
      {
        title: 'Tratamente versatile',
        text: 'Curățare, hidratare, anti-aging și tratarea petelor pigmentare cu un singur aparat.',
      },
      {
        title: 'Tratament ușor de valorificat',
        text: 'Saloanele pot cere 15 000-30 000 Ft pentru un tratament hydrafacial, astfel aparatul se poate amortiza repede.',
      },
      {
        title: 'Analiza pielii în fața clientei',
        text: 'Camera 4K a HydraScan PRO+ arată starea pielii și pe baza ei recomandă tratament și rutină de acasă.',
      },
    ],
  },
  finance: {
    ...financeTexts,
    lead: 'Rate fără dobândă cu DAE 0%: avans 50%, restul în 3 sau 6 rate lunare. Fără comision de administrare și fără costuri ascunse.',
  },
  training: {
    titleLines: ['Nu înveți singură.', 'Te învățăm tot.'],
    text: 'Instruire individuală de operare în showroomul nostru: îți transmitem propria noastră tehnică verificată, iar și după instruire te poți baza pe sprijinul nostru profesional.',
    cta: 'Cursurile noastre',
  },
  consult,
  faq: {
    title: 'Întrebări frecvente',
    lead: 'Cele mai frecvente întrebări despre tratamentul hydrafacial. Dacă nu găsești răspunsul, întreabă-ne direct.',
    items: [
      {
        question: 'Care este diferența dintre curățarea facială clasică și hydrafacial?',
        answer: 'Hydrafacial lucrează cu tehnologie cu vacuum, care pe lângă curățarea profundă asigură și o infuzie de ser. Este nedureros, nu provoacă roșeață, iar clienta își poate continua imediat ziua. După o curățare clasică fața rămâne adesea roșie zile întregi.',
      },
      {
        question: 'Cât de des se poate face tratamentul hydrafacial?',
        answer: 'De obicei se recomandă un tratament de întreținere la 4-6 săptămâni. Sub formă de cură se poate face și săptămânal, pentru îmbunătățirea stării pielii. Este o procedură foarte blândă.',
      },
      {
        question: 'Este potrivit pentru orice tip de piele?',
        answer: 'Da. Hydrafacial este unul dintre cele mai blânde tratamente faciale, se poate folosi și pe pielea sensibilă și cu rozacee. Singura excepție este acneea inflamatorie activă.',
      },
    ],
  },
  visit: {
    title: 'Încearcă-l pe viu la Érd.',
    text: 'Vino în showroomul nostru și vezi aparatele pe viu înainte să te decizi.',
    booking: 'Cu programare prealabilă',
    demoCta: 'Cere un demo',
  },
};
