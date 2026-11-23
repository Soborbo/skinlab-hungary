/**
 * Pagina categoriei lasere cu diodă - text în română (traducerea ./hu.ts).
 * Prețurile, puterea, specificațiile și imaginile vin din JSON-urile produselor.
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { compareHelp, consult, financeTexts, reviews } from '../common.ro';

const models: Record<string, ShowcaseModelCopy> = {
  athena: {
    tagline: 'control și precizie',
    forWho: 'Început / serviciu suplimentar',
    desc: 'Software inteligent care recomandă setările în funcție de tipul de piele și de păr. Un aparat stabil și previzibil pentru cine începe sau completează epilarea.',
    when: [
      'cauți un aparat de început accesibil, dar profesional',
      'epilarea va fi un serviciu suplimentar',
      'previzibilitatea contează mai mult decât viteza',
    ],
  },
  olympia: {
    tagline: 'performanța câștigătoare',
    forWho: 'Viteză cu control',
    desc: 'Putere de ieșire de 1200W și 5 dimensiuni de spot reglabile: lucru precis pe zone mici, progres rapid pe suprafețe mari.',
    when: [
      'cauți un aparat puternic la un preț realist',
      'vrei tratamente mai rapide, dar cu control',
      'ai clienți și zone ale corpului foarte diverse',
    ],
  },
  helios: {
    tagline: 'adevărata putere a luminii',
    forWho: 'Clinică, trafic mare',
    desc: 'Cel mai puternic model al nostru: 1600W, efect mai profund, timp de tratament mai scurt. Pentru saloane și clinici cu trafic mare.',
    when: [
      'ai zilnic mulți clienți pentru epilare',
      'cu tratamente mai scurte ai oferi mai multe programări',
      'cauți categoria de top',
    ],
  },
  empire: {
    tagline: 'sistemul inteligent',
    forWho: 'Diagnostic + fișa clientului',
    desc: 'Diagnostic al părului și pielii cu microcameră, fișă digitală a clientului cu fotografii înainte și după, iar aparatul recomandă parametrii.',
    when: [
      'ai documenta tratamentele',
      'ai stabili parametrii pe baza unei analize',
      'ai lucra cu impulsuri stratificate (SHR STACK)',
    ],
  },
};

export const ro: ShowcaseCopy = {
  seo: {
    name: 'Lasere cu diodă profesionale',
    nameShort: 'Lasere cu diodă',
    description: 'Lasere cu diodă profesionale cu 4 lungimi de undă pentru epilare definitivă.',
  },
  hero: {
    titleLines: ['Laserul cu diodă care', 'îți aduce clienții înapoi.'],
    lead: 'Epilare definitivă cu tehnologie cu 4 lungimi de undă, pentru orice tip de piele și de păr. Te ajutăm să alegi aparatul potrivit salonului tău, te instruim și, dacă e nevoie, îl reparăm.',
    imageAlt: 'Epilare cu laserul cu diodă OLYMPIA în salon',
  },
  usp: [
    { title: 'Garanție completă 2 ani', sub: 'pentru fiecare aparat nou' },
    { title: 'Instruire de 8 ore la fața locului', sub: '+ 6 luni de asistență' },
    { title: 'Service propriu în Ungaria', sub: 'reparații rapide la Érd' },
    { title: 'Rate cu DAE 0%', sub: 'avans 50% + rate lunare' },
  ],
  models: {
    title: 'Care se potrivește salonului tău?',
    lead: 'Toate patru au 4 lungimi de undă. Diferența este în viteză, în modul de tratament și în cât de mult documentezi.',
    copy: models,
  },
  reviews,
  compare: {
    title: 'Comparație tehnică',
    lead: 'Parametrii principali dintr-o privire',
    labels: ['Preț', 'Putere', 'Lungimi de undă', 'Dimensiune spot', 'Răcire', 'Recomandat pentru'],
    help: compareHelp,
  },
  whyBuy: {
    title: 'De ce merită să cumperi un laser cu diodă?',
    lead: 'Ce merită să gândești înainte de cumpărare.',
    imageAlt: 'Piesa de mână a laserului cu diodă OLYMPIA în timpul tratamentului',
    items: [
      {
        title: 'Amortizare rapidă',
        text: 'Cu aproximativ 3-4 clienți pe zi lucrătoare, un preț de 12 000 Ft pe tratament și un cost de 2 000 Ft pe tratament, îți rămân lunar 600 000-800 000 Ft. Astfel aparatul se poate amortiza în aproximativ 3,3-3,7 luni. Calcul ilustrativ, nu o promisiune financiară.',
      },
      {
        title: 'Clienți care revin',
        text: 'Clienții cumpără o cură de 6-8 ședințe, apoi revin anual pentru un tratament de întreținere.',
      },
      {
        title: 'Mai eficient decât IPL',
        text: 'Mai țintit, acționează mai profund, sunt necesare mai puține ședințe. Clientul vede rezultatul mai repede.',
      },
      {
        title: 'Pentru orice tip de piele',
        text: 'Cele 4 lungimi de undă sunt eficiente pe piele deschisă și închisă, pe păr fin și gros.',
      },
    ],
  },
  finance: {
    ...financeTexts,
    lead: 'Rate fără dobândă cu DAE 0%: avans 50%, restul în 3, 6 sau 12 rate lunare. Fără comision de administrare și fără costuri ascunse.',
  },
  training: {
    titleLines: ['Nu înveți singură.', 'Te învățăm tot.'],
    text: 'Instruire de 8 ore la fața locului, în propriul tău salon, apoi 6 luni de asistență. Instruire de operare certificată FAR, cu certificat oficial.',
    cta: 'Cursurile noastre',
  },
  consult,
  faq: {
    title: 'Întrebări frecvente',
    lead: 'Cele mai frecvente întrebări despre laserele cu diodă. Dacă nu găsești răspunsul, întreabă-ne direct.',
    items: [
      {
        question: 'Care este diferența dintre aparatele cu 1, 3 și 4 lungimi de undă?',
        answer: '1 lungime de undă (808 nm) este varianta clasică, pentru piele deschisă spre medie. 3 lungimi de undă tratează și pielea mai închisă și părul mai fin. 4 lungimi de undă (755 + 808 + 940 + 1064 nm) sunt cele mai versatile și mai eficiente și pe părul deschis la culoare.',
      },
      {
        question: 'De ce contează puterea (wați)?',
        answer: 'Putere mai mare = tratament mai rapid, mai mulți clienți pe zi. Pentru un salon cu trafic mare recomandăm peste 1000W.',
      },
      {
        question: 'Doare tratamentul cu laser cu diodă?',
        answer: 'Răcirea cu safir a pielii îl face aproape nedureros, majoritatea clienților simt doar o căldură ușoară.',
      },
      {
        question: 'Cât durează un tratament?',
        answer: 'Axile 5-10 minute, picioare 20-40 de minute, tot corpul 60-90 de minute, în funcție de aparat.',
      },
    ],
  },
  visit: {
    title: 'Încearcă-le la Érd.',
    text: 'Vino în showroomul nostru și încearcă pe viu toate cele patru lasere cu diodă înainte să te decizi.',
    booking: 'Cu programare prealabilă',
    demoCta: 'Cere un demo',
  },
};
