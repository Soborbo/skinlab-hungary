/**
 * Stranica kategorije anti-aging - srpski tekst, latinica (prevod ./hu.ts).
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { compareHelp, consult, financeTexts, reviews, visit } from '../common.sr';

const models: Record<string, ShowcaseModelCopy> = {
  'q2-biopen': {
    name: 'Bio Pen Q2',
    keySpec: 'EMS + LED',
    tagline: 'mobilna olovka sa mikroiglicama',
    forWho: 'Početni, mobilni tretmani',
    desc: 'Bežična olovka sa mikroiglicama, EMS elektroporacijom, plavom/crvenom LED fototerapijom i 7 razrađenih programa tretmana. Uz malo ulaganje možeš da pokreneš tretmane obnove kože mikroiglicama i unošenja aktivnih supstanci.',
    when: [
      'sada uvodiš tretmane mikroiglicama',
      'koristila bi je i za unošenje aktivnih supstanci',
      'tretman bi nudila i kod klijentkinja kod kuće',
    ],
    compare: {
      tech: 'EMS mikroiglice + LED fototerapija',
      form: 'Bežična ručna olovka',
      extra: 'Plavi 470 nm / crveni 630 nm LED',
      use: 'Lice, predeo oko očiju, koža glave, telo',
    },
  },
  'aestiq-ai': {
    name: 'AESTIQ AI',
    keySpec: 'RF sa mikroiglicama',
    tagline: 'AI platforma koja podučava',
    forWho: 'Premium anti-aging usluga',
    desc: 'Vakuumski RF sistem sa mikroiglicama: vakuum stabilizuje kožu, a radiofrekvencija radi u dubljim slojevima. Ugrađeni AI Educator vodi te korak po korak, a ANG™ upravljanje iglama radi sa unapred podešenom dubinom.',
    when: [
      'nudila bi tretmane bora, ožiljaka i strija',
      'gradila bi uslugu sa visokom cenom tretmana',
      'želiš da ti uređaj pomaže i u učenju',
    ],
    compare: {
      tech: 'Vakuumski RF sa mikroiglicama',
      form: 'Stona platforma',
      extra: 'AI Educator + ANG™ upravljanje iglama',
      use: 'Sitne bore, opuštena koža, proširene pore, ožiljci od akni, strije',
    },
  },
};

export const sr: ShowcaseCopy = {
  seo: {
    name: 'Anti-aging uređaji',
    nameShort: 'Anti-aging',
    description: 'Vakuumski RF uređaji sa mikroiglicama i EMS uređaji sa mikroiglicama za podmlađivanje kože.',
  },
  hero: {
    titleLines: ['Anti-aging uređaj', 'za premium tretmane.'],
    lead: 'Zatezanje kože, tretman bora i ožiljaka bez operacije, RF tehnologijom sa mikroiglicama ili EMS tehnologijom. Pomoći ćemo ti da izabereš uređaj koji odgovara tvom salonu i, ako treba, popraviti ga.',
    imageAlt: 'Tretman lica mikroiglicama uređajem Bio Pen Q2 u salonu',
  },
  usp: [
    { title: '2 godine pune garancije', sub: 'na svaki novi uređaj' },
    { title: 'Sopstveni servis u Mađarskoj', sub: 'brza popravka u Érdu' },
    { title: 'Plaćanje na rate uz 0% EKS', sub: 'za uređaje preko 100 000 Ft' },
    { title: 'Lično savetovanje', sub: 'od osnivača' },
  ],
  models: {
    title: 'Koji odgovara tvom salonu?',
    lead: 'Mobilna ručna olovka i stona AI platforma: za drugu namenu, u drugom cenovnom rangu.',
    copy: models,
  },
  reviews,
  compare: {
    title: 'Poređenje',
    lead: 'Ova dva uređaja pripadaju različitim kategorijama, pa je najbolje odlučiti prema nameni',
    labels: ['Cena', 'Tehnologija', 'Izvedba', 'Dodatno', 'Primena', 'Kome preporučujemo'],
    help: compareHelp,
  },
  whyBuy: {
    title: 'Zašto se isplati kupiti anti-aging uređaj?',
    lead: 'Šta je dobro promisliti pre kupovine.',
    imageAlt: 'Bio Pen Q2 olovka sa mikroiglicama',
    items: [
      {
        title: 'Ciljano zatezanje',
        text: 'RF sa mikroiglicama dovodi toplotu direktno u dublje slojeve kože i tako zateže bez operacije.',
      },
      {
        title: 'Bez oporavka',
        text: 'Posle većine tretmana klijentkinja odmah može da se vrati svakodnevnim aktivnostima.',
      },
      {
        title: 'Klijentkinje koje se vraćaju',
        text: 'Kolagen se obnavlja nedeljama, zato klijentkinje dolaze na seriju od više tretmana.',
      },
      {
        title: 'Premium cene tretmana',
        text: 'RF sa mikroiglicama i obnova kože mikroiglicama spadaju među usluge salona sa visokom maržom.',
      },
    ],
  },
  finance: {
    ...financeTexts,
    lead: 'Beskamatno plaćanje na rate uz 0% EKS za uređaje preko 100 000 Ft: 50% avans, ostatak u mesečnim ratama. Bez naknade za obradu i bez skrivenih troškova.',
  },
  consult,
  faq: {
    title: 'Česta pitanja',
    lead: 'Najčešća pitanja o anti-aging uređajima. Ako ne nađeš odgovor, pitaj nas direktno.',
    items: [
      {
        question: 'Koja je razlika između AESTIQ AI i Bio Pen Q2?',
        answer: 'Bio Pen Q2 je kompaktna bežična olovka sa mikroiglicama, EMS elektroporacijom i LED fototerapijom. AESTIQ AI je vakuumski RF sistem sa mikroiglicama više kategorije koji objedinjuje radiofrekvenciju, vakuumsku stabilizaciju kože, sistem AI Educator i ANG™ upravljanje iglama.',
      },
      {
        question: 'Sa kojim da počnem ako sada uvodim tretmane mikroiglicama?',
        answer: 'Bio Pen Q2 je dobar početak: malo ulaganje, lako se uklapa u postojeću ponudu, a u jednom ručnom uređaju dobijaš microneedling, EMS elektroporaciju i LED fototerapiju od 470/630 nm.',
      },
      {
        question: 'Kada je bolje izabrati AESTIQ AI?',
        answer: 'Ako bi nudila anti-aging tretmane, zatezanje kože, tretmane ožiljaka ili poboljšanje teksture više kategorije. Pored mikroiglica radi sa RF energijom, stabilizuje kožu vakuumom, a AI Educator i ANG™ pomažu i u radu terapeutkinje.',
      },
      {
        question: 'Da li je i Bio Pen Q2 radiofrekventni uređaj?',
        answer: 'Nije, i to je važna razlika. Bio Pen Q2 koristi EMS mikrostruju (elektroporaciju). Pravi RF sa mikroiglicama ima AESTIQ AI.',
      },
      {
        question: 'Kada je vidljiv rezultat?',
        answer: 'Odmah posle tretmana oseća se blago zatezanje. Kod RF tretmana sa mikroiglicama uređajem AESTIQ AI pravi rezultat sazreva obnovom kolagena tokom 3-6 meseci, a serija se sastoji od 3-4 tretmana.',
      },
    ],
  },
  visit,
};
