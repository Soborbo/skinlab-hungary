/**
 * Stranica kategorije mezoterapije (jedan proizvod) - hrvatski tekst (prijevod ./hu.ts).
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { consultSingle, reviews, visitSingle } from '../common.hr';

const models: Record<string, ShowcaseModelCopy> = {
  dermatechplus_noneedle_mesotherapy: {
    name: 'DermaTECH+',
    keySpec: 'bez igala, do 800 kDa',
    tagline: 'mezoterapija bez igala',
    forWho: 'Unos aktivnih tvari, cijele godine',
    desc: 'Uređaj za mezoterapiju bez igala s tehnologijom DermoPenetrate Max: mikrostrujni impulsi i precizna vibracija unose aktivnu tvar u kožu, do veličine molekule od 800 kDa, bez uboda, elektrolize i promjene pH vrijednosti.',
    when: [
      'nudila bi bezbolan unos aktivnih tvari',
      'mezoterapiju bi nudila i ljeti',
      'koristila bi vlastite serume i ampule',
    ],
  },
};

export const hr: ShowcaseCopy = {
  seo: {
    name: 'Uređaji za mezoterapiju',
    nameShort: 'Mezoterapija',
    description: 'Sustavi za mezoterapiju bez igala i klasičnu mezoterapiju za unos aktivnih tvari.',
  },
  hero: {
    titleLines: ['Mezoterapija bez igala,', 'bez boli.'],
    lead: 'Dubinski unos aktivnih tvari bez uboda i bez vremena oporavka, za sve tipove kože, u bilo koje doba godine. Obučit ćemo te i, ako treba, popraviti uređaj.',
    imageAlt: 'Nastavak DermaTECH+ za mezoterapiju bez igala u ruci',
  },
  usp: [
    { title: '2 godine potpunog jamstva', sub: 'na svaki novi uređaj' },
    { title: 'Vlastiti servis u Mađarskoj', sub: 'brz popravak u Érdu' },
    { title: 'Potpuna obuka uključena u cijenu', sub: 'obučit ćemo te za rad s uređajem' },
    { title: 'Osobno savjetovanje', sub: 'od osnivača' },
  ],
  models: {
    title: 'Upoznaj DermaTECH+',
    lead: 'Unos aktivnih tvari na molekularnoj razini, kroz prirodne vodene kanale kože.',
    copy: models,
  },
  reviews,
  whyBuy: {
    title: 'Zašto se isplati kupiti uređaj za mezoterapiju bez igala?',
    lead: 'Što je dobro promisliti prije kupnje.',
    imageAlt: 'Uređaj DermaTECH+ za mezoterapiju bez igala',
    items: [
      {
        title: 'Bezbolan tretman',
        text: 'Nema uboda, mikroozljeda ni krvarenja, klijentica nakon tretmana odmah može nastaviti sa svojim danom.',
      },
      {
        title: 'Primjenjiv cijele godine',
        text: 'Budući da se koža ne ozljeđuje, ne postaje fotoosjetljiva, pa njime možeš raditi i ljeti, na jakom suncu.',
      },
      {
        title: 'I veće molekule',
        text: 'Unosi aktivne tvari do 800 kDa: hijaluronsku kiselinu, peptide, faktore rasta.',
      },
      {
        title: 'Tretman koji se dobro naplaćuje',
        text: 'Za tretman mezoterapije bez igala saloni obično naplaćuju 10 000-25 000 Ft.',
      },
    ],
  },
  consult: consultSingle,
  faq: {
    title: 'Česta pitanja',
    lead: 'Najčešća pitanja o mezoterapiji bez igala. Ako ne nađeš odgovor, pitaj nas izravno.',
    items: [
      {
        question: 'Što je tehnologija DermoPenetrate Max?',
        answer: 'Koristi mikrostrujne impulse i preciznu vibraciju kako bi privremeno otvorila prirodne vodene kanale stanica kože (akvaporine). Tako aktivna tvar ulazi u kožu bez igle, na molekularnoj razini.',
      },
      {
        question: 'Je li tretman bolan?',
        answer: 'Nije. Nema uboda, mikroozljeda, peckanja ni bockanja. Klijentica dobiva ugodan, opuštajući tretman i nakon njega odmah može nastaviti sa svojim danom.',
      },
      {
        question: 'S kojim se aktivnim tvarima može koristiti?',
        answer: 'S gotovo bilo kojim kozmetičkim serumom i ampulom: hijaluronskom kiselinom, peptidima, vitaminom C, retinolom, niacinamidom, faktorima rasta, tvarima za posvjetljivanje i regeneraciju.',
      },
      {
        question: 'Zašto se može koristiti i ljeti?',
        answer: 'Zato što tretman ne ozljeđuje kožu, nema uboda ni ljuštenja, pa koža ne postaje fotoosjetljiva. Za razliku od mezoterapije iglama, sigurno se može koristiti i na jakom suncu.',
      },
      {
        question: 'Od koliko se tretmana sastoji paket?',
        answer: 'Paket se sastoji od 3-6 tretmana, jednom mjesečno. Jedan tretman traje 25-30 minuta.',
      },
    ],
  },
  visit: visitSingle,
};
