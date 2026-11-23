/**
 * Stranica kategorije mezoterapije (jedan proizvod) - srpski tekst, latinica (prevod ./hu.ts).
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { consultSingle, reviews, visitSingle } from '../common.sr';

const models: Record<string, ShowcaseModelCopy> = {
  dermatechplus_noneedle_mesotherapy: {
    name: 'DermaTECH+',
    keySpec: 'bez igala, do 800 kDa',
    tagline: 'mezoterapija bez igala',
    forWho: 'Unos aktivnih supstanci, cele godine',
    desc: 'Uređaj za mezoterapiju bez igala sa tehnologijom DermoPenetrate Max: mikrostrujni impulsi i precizna vibracija unose aktivnu supstancu u kožu, do veličine molekula od 800 kDa, bez uboda, elektrolize i promene pH vrednosti.',
    when: [
      'nudila bi bezbolan unos aktivnih supstanci',
      'mezoterapiju bi nudila i leti',
      'koristila bi sopstvene serume i ampule',
    ],
  },
};

export const sr: ShowcaseCopy = {
  seo: {
    name: 'Uređaji za mezoterapiju',
    nameShort: 'Mezoterapija',
    description: 'Sistemi za mezoterapiju bez igala i klasičnu mezoterapiju za unos aktivnih supstanci.',
  },
  hero: {
    titleLines: ['Mezoterapija bez igala,', 'bez bola.'],
    lead: 'Dubinski unos aktivnih supstanci bez uboda i bez vremena oporavka, za sve tipove kože, u bilo koje doba godine. Obučićemo te i, ako treba, popraviti uređaj.',
    imageAlt: 'Nastavak DermaTECH+ za mezoterapiju bez igala u ruci',
  },
  usp: [
    { title: '2 godine pune garancije', sub: 'na svaki novi uređaj' },
    { title: 'Sopstveni servis u Mađarskoj', sub: 'brza popravka u Érdu' },
    { title: 'Kompletna obuka uključena u cenu', sub: 'obučićemo te za rad sa uređajem' },
    { title: 'Lično savetovanje', sub: 'od osnivača' },
  ],
  models: {
    title: 'Upoznaj DermaTECH+',
    lead: 'Unos aktivnih supstanci na molekularnom nivou, kroz prirodne vodene kanale kože.',
    copy: models,
  },
  reviews,
  whyBuy: {
    title: 'Zašto se isplati kupiti uređaj za mezoterapiju bez igala?',
    lead: 'Šta je dobro promisliti pre kupovine.',
    imageAlt: 'Uređaj DermaTECH+ za mezoterapiju bez igala',
    items: [
      {
        title: 'Bezbolan tretman',
        text: 'Nema uboda, mikropovreda ni krvarenja, klijentkinja posle tretmana odmah može da nastavi svoj dan.',
      },
      {
        title: 'Primenljiv cele godine',
        text: 'Pošto se koža ne povređuje, ne postaje fotoosetljiva, pa njime možeš da radiš i leti, na jakom suncu.',
      },
      {
        title: 'I veći molekuli',
        text: 'Unosi aktivne supstance do 800 kDa: hijaluronsku kiselinu, peptide, faktore rasta.',
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
    lead: 'Najčešća pitanja o mezoterapiji bez igala. Ako ne nađeš odgovor, pitaj nas direktno.',
    items: [
      {
        question: 'Šta je tehnologija DermoPenetrate Max?',
        answer: 'Koristi mikrostrujne impulse i preciznu vibraciju kako bi privremeno otvorila prirodne vodene kanale ćelija kože (akvaporine). Tako aktivna supstanca ulazi u kožu bez igle, na molekularnom nivou.',
      },
      {
        question: 'Da li je tretman bolan?',
        answer: 'Nije. Nema uboda, mikropovreda, peckanja ni bockanja. Klijentkinja dobija prijatan, opuštajući tretman i posle njega odmah može da nastavi svoj dan.',
      },
      {
        question: 'Sa kojim aktivnim supstancama može da se koristi?',
        answer: 'Sa gotovo bilo kojim kozmetičkim serumom i ampulom: hijaluronskom kiselinom, peptidima, vitaminom C, retinolom, niacinamidom, faktorima rasta, supstancama za posvetljivanje i regeneraciju.',
      },
      {
        question: 'Zašto može da se koristi i leti?',
        answer: 'Zato što tretman ne povređuje kožu, nema uboda ni ljuštenja, pa koža ne postaje fotoosetljiva. Za razliku od mezoterapije iglama, bezbedno može da se koristi i na jakom suncu.',
      },
      {
        question: 'Od koliko tretmana se sastoji paket?',
        answer: 'Paket se sastoji od 3-6 tretmana, jednom mesečno. Jedan tretman traje 25-30 minuta.',
      },
    ],
  },
  visit: visitSingle,
};
