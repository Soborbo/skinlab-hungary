/**
 * Kategorija pribora (katalog) - hrvatski tekst (prijevod ./hu.ts).
 */
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { consult, reviews, visit } from '../common.hr';

export const hr: ShowcaseCopy = {
  seo: {
    name: 'Potrošni materijal i pribor',
    nameShort: 'Pribor',
    description: 'Moduli s iglama i odsisivač dima.',
  },
  hero: {
    titleLines: ['Moduli s iglama i pribor', 'za svakodnevni rad.'],
    lead: 'Sterilni jednokratni moduli s iglama za uređaje za trajnu šminku i odsisivač dima za carbon peeling. Originalni proizvodi proizvođača, s dostavom na kućnu adresu ili osobnim preuzimanjem.',
    imageAlt: 'Faviamo moduli s iglama u poklon kutiji',
  },
  usp: [
    { title: 'Originalni proizvodi proizvođača', sub: 'bez kopija' },
    { title: 'Dostava Foxpost ili GLS', sub: 'u paketomat ili na adresu' },
    { title: 'Osobno preuzimanje u Érdu', sub: 'u našem izložbenom salonu' },
    { title: 'Osobno savjetovanje', sub: 'od osnivača' },
  ],
  catalog: {
    title: 'Pribor',
    lead: 'Moduli s iglama i dodaci za tvoje uređaje.',
    groups: [
      {
        title: 'Moduli s iglama',
        short: 'Moduli s iglama',
        subtitle: 'Sterilni, pojedinačno pakirani jednokratni moduli s iglama za uređaje za trajnu šminku, u više veličina, u izvedbi 1RL i 3RL.',
      },
      {
        title: 'Dodaci za carbon peeling',
        short: 'Odsisivač dima',
        subtitle: 'Odsisivač dima za laserske tretmane i carbon peeling, s HEPA filtrom i filtrom s aktivnim ugljenom.',
      },
    ],
  },
  reviews,
  whyBuy: {
    title: 'Zašto kupiti kod nas?',
    lead: 'Što je dobro znati prije narudžbe.',
    imageAlt: 'Faviamo moduli s iglama u kutiji',
    items: [
      {
        title: 'Originalni moduli s iglama',
        text: 'Mast Oceanheart i Faviamo, originalni proizvodi proizvođača, a ne kopije.',
      },
      {
        title: 'Sterilni, jednokratni',
        text: 'Moduli s iglama pakirani su pojedinačno i sterilno, pa za svaku klijenticu otvaraš novi.',
      },
      {
        title: 'Praktično preuzimanje',
        text: 'U Foxpost paketomat ili s GLS-om na adresu, odnosno osobno u našem izložbenom salonu u Érdu.',
      },
      {
        title: 'Pomoći ćemo ti odabrati',
        text: 'Ako ne znaš koja veličina igle odgovara tvojoj tehnici, pitaj nas.',
      },
    ],
  },
  consult: {
    ...consult,
    title: 'Ne znaš koji modul s iglama trebaš?',
    needs: [
      'Ne znaš koja ti veličina treba',
      'Imaš pitanje o kompatibilnosti',
      'Želiš točne informacije o proizvodu',
      'Treba ti samo dobar savjet',
    ],
  },
  faq: {
    title: 'Česta pitanja',
    lead: 'Najčešća pitanja o priboru. Ako ne nađeš odgovor, pitaj nas izravno.',
    items: [
      {
        question: 'Koje module s iglama prodajete?',
        answer: 'Module s iglama Mast Oceanheart i Faviamo, debljine igle od 0,18 do 0,35 mm, u izvedbi 1RL i 3RL. Dostupne veličine biraš na stranici proizvoda.',
      },
      {
        question: 'Čemu služi odsisivač dima?',
        answer: 'Kod laserskih tretmana i carbon peelinga odsisava nastali dim. Radi s HEPA filtrom i filtrom s aktivnim ugljenom te ima ugrađenu LED rasvjetu.',
      },
      {
        question: 'Kako ću dobiti narudžbu?',
        answer: 'Šaljemo je u Foxpost paketomat ili s GLS-om na adresu, a možeš je preuzeti i osobno u našem izložbenom salonu u Érdu.',
      },
    ],
  },
  visit: {
    ...visit,
    title: 'Preuzmi je osobno u Érdu.',
    text: 'Narudžbu možeš preuzeti u našem izložbenom salonu, a ako imaš pitanja, pomoći ćemo ti na licu mjesta.',
    demoCta: 'Želim termin',
  },
};
