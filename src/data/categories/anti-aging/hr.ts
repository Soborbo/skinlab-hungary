/**
 * Stranica kategorije anti-aging - hrvatski tekst (prijevod ./hu.ts).
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { compareHelp, consult, financeTexts, reviews, visit } from '../common.hr';

const models: Record<string, ShowcaseModelCopy> = {
  'q2-biopen': {
    name: 'Bio Pen Q2',
    keySpec: 'EMS + LED',
    tagline: 'mobilna olovka s mikroiglicama',
    forWho: 'Početni, mobilni tretmani',
    desc: 'Bežična olovka s mikroiglicama, EMS elektroporacijom, plavom/crvenom LED fototerapijom i 7 razrađenih programa tretmana. Uz malo ulaganje možeš pokrenuti tretmane obnove kože mikroiglicama i unošenja aktivnih tvari.',
    when: [
      'sada uvodiš tretmane mikroiglicama',
      'koristila bi je i za unošenje aktivnih tvari',
      'tretman bi nudila i kod klijentica kući',
    ],
    compare: {
      tech: 'EMS mikroiglice + LED fototerapija',
      form: 'Bežična ručna olovka',
      extra: 'Plavi 470 nm / crveni 630 nm LED',
      use: 'Lice, područje oko očiju, vlasište, tijelo',
    },
  },
  'aestiq-ai': {
    name: 'AESTIQ AI',
    keySpec: 'RF s mikroiglicama',
    tagline: 'AI platforma koja podučava',
    forWho: 'Premium anti-aging usluga',
    desc: 'Vakuumski RF sustav s mikroiglicama: vakuum stabilizira kožu, a radiofrekvencija radi u dubljim slojevima. Ugrađeni AI Educator vodi te korak po korak, a ANG™ upravljanje iglama radi s unaprijed postavljenom dubinom.',
    when: [
      'nudila bi tretmane bora, ožiljaka i strija',
      'gradila bi uslugu s visokom cijenom tretmana',
      'želiš da ti uređaj pomaže i u učenju',
    ],
    compare: {
      tech: 'Vakuumski RF s mikroiglicama',
      form: 'Stolna platforma',
      extra: 'AI Educator + ANG™ upravljanje iglama',
      use: 'Sitne bore, opuštena koža, prošireni pori, ožiljci od akni, strije',
    },
  },
};

export const hr: ShowcaseCopy = {
  seo: {
    name: 'Anti-aging uređaji',
    nameShort: 'Anti-aging',
    description: 'Vakuumski RF uređaji s mikroiglicama i EMS uređaji s mikroiglicama za pomlađivanje kože.',
  },
  hero: {
    titleLines: ['Anti-aging uređaj', 'za premium tretmane.'],
    lead: 'Zatezanje kože, tretman bora i ožiljaka bez operacije, RF tehnologijom s mikroiglicama ili EMS tehnologijom. Pomoći ćemo ti odabrati uređaj koji odgovara tvom salonu i, ako treba, popraviti ga.',
    imageAlt: 'Tretman lica mikroiglicama uređajem Bio Pen Q2 u salonu',
  },
  usp: [
    { title: '2 godine potpunog jamstva', sub: 'na svaki novi uređaj' },
    { title: 'Vlastiti servis u Mađarskoj', sub: 'brz popravak u Érdu' },
    { title: 'Obročna otplata uz 0% EKS', sub: 'za uređaje iznad 100 000 Ft' },
    { title: 'Osobno savjetovanje', sub: 'od osnivača' },
  ],
  models: {
    title: 'Koji odgovara tvom salonu?',
    lead: 'Mobilna ručna olovka i stolna AI platforma: za drugu namjenu, u drugom cjenovnom razredu.',
    copy: models,
  },
  reviews,
  compare: {
    title: 'Usporedba',
    lead: 'Ta dva uređaja pripadaju različitim kategorijama, pa je najbolje odlučiti prema namjeni',
    labels: ['Cijena', 'Tehnologija', 'Izvedba', 'Dodatno', 'Primjena', 'Kome preporučujemo'],
    help: compareHelp,
  },
  whyBuy: {
    title: 'Zašto se isplati kupiti anti-aging uređaj?',
    lead: 'Što je dobro promisliti prije kupnje.',
    imageAlt: 'Bio Pen Q2 olovka s mikroiglicama',
    items: [
      {
        title: 'Ciljano zatezanje',
        text: 'RF s mikroiglicama dovodi toplinu izravno u dublje slojeve kože i tako zateže bez operacije.',
      },
      {
        title: 'Bez oporavka',
        text: 'Nakon većine tretmana klijentica se odmah može vratiti svakodnevnim aktivnostima.',
      },
      {
        title: 'Klijentice koje se vraćaju',
        text: 'Kolagen se obnavlja tjednima, zato klijentice dolaze na seriju od više tretmana.',
      },
      {
        title: 'Premium cijene tretmana',
        text: 'RF s mikroiglicama i obnova kože mikroiglicama ubrajaju se među usluge salona s visokom maržom.',
      },
    ],
  },
  finance: {
    ...financeTexts,
    lead: 'Beskamatna obročna otplata uz 0% EKS za uređaje iznad 100 000 Ft: 50% predujam, ostatak u mjesečnim ratama. Bez naknade za obradu i bez skrivenih troškova.',
  },
  consult,
  faq: {
    title: 'Česta pitanja',
    lead: 'Najčešća pitanja o anti-aging uređajima. Ako ne nađeš odgovor, pitaj nas izravno.',
    items: [
      {
        question: 'Koja je razlika između AESTIQ AI i Bio Pen Q2?',
        answer: 'Bio Pen Q2 kompaktna je bežična olovka s mikroiglicama, EMS elektroporacijom i LED fototerapijom. AESTIQ AI vakuumski je RF sustav s mikroiglicama više kategorije koji objedinjuje radiofrekvenciju, vakuumsku stabilizaciju kože, sustav AI Educator i ANG™ upravljanje iglama.',
      },
      {
        question: 'S kojim da počnem ako sada uvodim tretmane mikroiglicama?',
        answer: 'Bio Pen Q2 dobar je početak: malo ulaganje, lako se uklapa u postojeću ponudu, a u jednom ručnom uređaju dobivaš microneedling, EMS elektroporaciju i LED fototerapiju od 470/630 nm.',
      },
      {
        question: 'Kada je bolje odabrati AESTIQ AI?',
        answer: 'Ako bi nudila anti-aging tretmane, zatezanje kože, tretmane ožiljaka ili poboljšanje teksture više kategorije. Osim mikroiglica radi s RF energijom, stabilizira kožu vakuumom, a AI Educator i ANG™ pomažu i u radu terapeutkinje.',
      },
      {
        question: 'Je li i Bio Pen Q2 radiofrekventni uređaj?',
        answer: 'Nije, i to je važna razlika. Bio Pen Q2 koristi EMS mikrostruju (elektroporaciju). Pravi RF s mikroiglicama ima AESTIQ AI.',
      },
      {
        question: 'Kada je vidljiv rezultat?',
        answer: 'Odmah nakon tretmana osjeti se blago zatezanje. Kod RF tretmana s mikroiglicama uređajem AESTIQ AI pravi rezultat sazrijeva obnovom kolagena tijekom 3-6 mjeseci, a serija se sastoji od 3-4 tretmana.',
      },
    ],
  },
  visit,
};
