/**
 * Kategorija pribora (katalog) - srpski tekst, latinica (prevod ./hu.ts).
 */
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { consult, reviews, visit } from '../common.sr';

export const sr: ShowcaseCopy = {
  seo: {
    name: 'Potrošni materijal i pribor',
    nameShort: 'Pribor',
    description: 'Moduli sa iglama i usisivač dima.',
  },
  hero: {
    titleLines: ['Moduli sa iglama i pribor', 'za svakodnevni rad.'],
    lead: 'Sterilni jednokratni moduli sa iglama za uređaje za trajnu šminku i usisivač dima za carbon peeling. Originalni proizvodi proizvođača, sa dostavom na kućnu adresu ili ličnim preuzimanjem.',
    imageAlt: 'Faviamo moduli sa iglama u poklon kutiji',
  },
  usp: [
    { title: 'Originalni proizvodi proizvođača', sub: 'bez kopija' },
    { title: 'Dostava Foxpost ili GLS', sub: 'u paketomat ili na adresu' },
    { title: 'Lično preuzimanje u Érdu', sub: 'u našem izložbenom salonu' },
    { title: 'Lično savetovanje', sub: 'od osnivača' },
  ],
  catalog: {
    title: 'Pribor',
    lead: 'Moduli sa iglama i dodaci za tvoje uređaje.',
    groups: [
      {
        title: 'Moduli sa iglama',
        short: 'Moduli sa iglama',
        subtitle: 'Sterilni, pojedinačno pakovani jednokratni moduli sa iglama za uređaje za trajnu šminku, u više veličina, u izvedbi 1RL i 3RL.',
      },
      {
        title: 'Dodaci za carbon peeling',
        short: 'Usisivač dima',
        subtitle: 'Usisivač dima za laserske tretmane i carbon peeling, sa HEPA filterom i filterom sa aktivnim ugljem.',
      },
    ],
  },
  reviews,
  whyBuy: {
    title: 'Zašto da kupiš pribor kod nas?',
    lead: 'Šta je dobro znati pre porudžbine.',
    imageAlt: 'Faviamo moduli sa iglama u kutiji',
    items: [
      {
        title: 'Originalni moduli sa iglama',
        text: 'Mast Oceanheart i Faviamo, originalni proizvodi proizvođača, a ne kopije.',
      },
      {
        title: 'Sterilni, jednokratni',
        text: 'Moduli sa iglama pakovani su pojedinačno i sterilno, pa za svaku klijentkinju otvaraš novi.',
      },
      {
        title: 'Praktično preuzimanje',
        text: 'U Foxpost paketomat ili sa GLS-om na adresu, odnosno lično u našem izložbenom salonu u Érdu.',
      },
      {
        title: 'Pomoći ćemo ti da izabereš',
        text: 'Ako ne znaš koja veličina igle odgovara tvojoj tehnici, pitaj nas.',
      },
    ],
  },
  consult: {
    ...consult,
    title: 'Ne znaš koji modul sa iglama ti treba?',
    needs: [
      'Ne znaš koja ti veličina treba',
      'Imaš pitanje o kompatibilnosti',
      'Želiš tačne informacije o proizvodu',
      'Treba ti samo dobar savet',
    ],
  },
  faq: {
    title: 'Česta pitanja',
    lead: 'Najčešća pitanja o priboru. Ako ne nađeš odgovor, pitaj nas direktno.',
    items: [
      {
        question: 'Koje module sa iglama prodajete?',
        answer: 'Module sa iglama Mast Oceanheart i Faviamo, debljine igle od 0,18 do 0,35 mm, u izvedbi 1RL i 3RL. Dostupne veličine biraš na stranici proizvoda.',
      },
      {
        question: 'Čemu služi usisivač dima?',
        answer: 'Kod laserskih tretmana i carbon peelinga usisava nastali dim. Radi sa HEPA filterom i filterom sa aktivnim ugljem i ima ugrađeno LED osvetljenje.',
      },
      {
        question: 'Kako ću dobiti porudžbinu?',
        answer: 'Šaljemo je u Foxpost paketomat ili sa GLS-om na adresu, a možeš je preuzeti i lično u našem izložbenom salonu u Érdu.',
      },
    ],
  },
  visit: {
    ...visit,
    title: 'Preuzmi je lično u Érdu.',
    text: 'Porudžbinu možeš da preuzmeš u našem izložbenom salonu, a ako imaš pitanja, pomoći ćemo ti na licu mesta.',
    demoCta: 'Želim termin',
  },
};
