/**
 * Pagina categoriei de consumabile (varianta catalog) - text în limba română (traducerea ./hu.ts).
 */
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { consult, reviews, visit } from '../common.ro';

export const ro: ShowcaseCopy = {
  seo: {
    name: 'Consumabile și accesorii',
    nameShort: 'Consumabile',
    description: 'Cartușe cu ace și extractor de fum.',
  },
  hero: {
    titleLines: ['Cartușe și consumabile', 'pentru munca de zi cu zi.'],
    lead: 'Cartușe cu ace sterile, de unică folosință, pentru aparatele de machiaj permanent și un extractor de fum pentru carbon peeling. Produse originale de la producător, cu livrare la domiciliu sau ridicare personală.',
    imageAlt: 'Cartușe cu ace Faviamo în cutie de prezentare',
  },
  usp: [
    { title: 'Produse originale de la producător', sub: 'nu imitații' },
    { title: 'Livrare Foxpost sau GLS', sub: 'la locker sau la domiciliu' },
    { title: 'Ridicare personală la Érd', sub: 'în showroomul nostru' },
    { title: 'Consultanță personală', sub: 'de la fondatori' },
  ],
  catalog: {
    title: 'Consumabile',
    lead: 'Cartușe cu ace și accesorii pentru aparatele tale.',
    groups: [
      {
        title: 'Cartușe cu ace',
        short: 'Cartușe cu ace',
        subtitle: 'Cartușe cu ace sterile, ambalate individual, de unică folosință, pentru aparatele de machiaj permanent, în mai multe mărimi, în variantele 1RL și 3RL.',
      },
      {
        title: 'Accesorii pentru carbon peeling',
        short: 'Extractor de fum',
        subtitle: 'Extractor de fum pentru tratamente laser și carbon peeling, cu filtru HEPA și filtru cu cărbune activ.',
      },
    ],
  },
  reviews,
  whyBuy: {
    title: 'De ce să cumperi consumabile de la noi?',
    lead: 'Ce merită să știi înainte de comandă.',
    imageAlt: 'Cartușe cu ace Faviamo în cutia lor',
    items: [
      {
        title: 'Cartușe cu ace originale',
        text: 'Mast Oceanheart și Faviamo, produse originale de la producător, nu imitații.',
      },
      {
        title: 'Sterile, de unică folosință',
        text: 'Cartușele cu ace sunt ambalate individual și steril, astfel deschizi unul nou pentru fiecare clientă.',
      },
      {
        title: 'Livrare comodă',
        text: 'La un locker Foxpost sau la domiciliu cu GLS, ori personal în showroomul nostru de la Érd.',
      },
      {
        title: 'Te ajutăm să alegi',
        text: 'Dacă nu știi ce mărime de ac se potrivește tehnicii tale, întreabă-ne.',
      },
    ],
  },
  consult: {
    ...consult,
    title: 'Nu știi ce cartuș cu ace îți trebuie?',
    needs: [
      'Nu știi ce mărime îți trebuie',
      'Ai o întrebare despre compatibilitate',
      'Vrei informații exacte despre un produs',
      'Ai nevoie doar de un sfat bun',
    ],
  },
  faq: {
    title: 'Întrebări frecvente',
    lead: 'Cele mai frecvente întrebări despre consumabile. Dacă nu găsești răspunsul, întreabă-ne direct.',
    items: [
      {
        question: 'Ce cartușe cu ace comercializați?',
        answer: 'Cartușe cu ace Mast Oceanheart și Faviamo, cu grosimea acului între 0,18 și 0,35 mm, în variantele 1RL și 3RL. Mărimile disponibile le alegi pe pagina produsului.',
      },
      {
        question: 'La ce folosește extractorul de fum?',
        answer: 'La tratamentele laser și de carbon peeling aspiră fumul care se formează. Funcționează cu filtru HEPA și filtru cu cărbune activ și are iluminare LED încorporată.',
      },
      {
        question: 'Cum primesc comanda?',
        answer: 'O trimitem la un locker Foxpost sau la domiciliu cu GLS, dar o poți ridica și personal din showroomul nostru de la Érd.',
      },
    ],
  },
  visit: {
    ...visit,
    title: 'Ridic-o personal la Érd.',
    text: 'Îți poți ridica comanda din showroomul nostru, iar dacă ai întrebări, te ajutăm pe loc.',
    demoCta: 'Cer o programare',
  },
};
