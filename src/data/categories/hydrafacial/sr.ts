/**
 * Stranica kategorije hydrafacial - srpski tekst, latinica (prevod ./hu.ts).
 * Cene, specifikacije i slike dolaze iz JSON-a proizvoda.
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { compareHelp, consult, financeTexts, reviews } from '../common.sr';

const models: Record<string, ShowcaseModelCopy> = {
  hydrascanpro: {
    name: 'HydraScan PRO+',
    keySpec: '8 nastavaka',
    tagline: 'pametna analiza kože',
    forWho: 'AI analiza, premium kabina',
    desc: 'Višenamenski uređaj usmeren na hidrodermabraziju, sa 4K kamerom i analizom kože pomoću veštačke inteligencije. Na osnovu analize preporučuje tretman, proizvode i kućnu negu, a digitalni karton klijenta sve dokumentuje.',
    when: [
      'tretman bi započela analizom kože',
      'prihod bi povećala i preporukom proizvoda',
      'pratila bi i dokumentovala napredak klijentkinje',
    ],
    compare: {
      tech: 'Hidrodermabrazija + AI analiza kože',
      heads: '8 nastavaka (uključujući LED masku)',
      ai: '4K kamera sa tri spektra (oko 2 min)',
    },
  },
  'hidra-mist-elite': {
    name: 'HydraMIST Elite',
    keySpec: '11 u 1',
    tagline: 'svestrani sistem',
    forWho: 'Mnogo tretmana iz jednog uređaja',
    desc: '11 mogućnosti tretmana u jednom uređaju: vakuumska hidrodermabrazija, unos aktivnih supstanci kiseonikom, radiofrekventno zatezanje i LED kupola sa kiseonikom u kojoj tokom tretmana može da svira muzika.',
    when: [
      'nudila bi mnogo tretmana lica iz jednog uređaja',
      'nudila bi i tretmane kiseonikom i RF',
      'klijentkinjama bi pružila premium doživljaj',
    ],
    compare: {
      tech: 'Hidrodermabrazija + kiseonik + RF',
      heads: '11 funkcija (vakuum, UZ, RF, kiseonik, LED)',
      ai: 'Nema',
    },
  },
  hydralume: {
    name: 'HydraLUME V10',
    keySpec: '12 glava + LED',
    tagline: 'centar za negu lica',
    forWho: 'LED terapija, nega temena',
    desc: 'Samostojeći centar za negu lica na točkićima sa vortex hidrodermabrazijom, pet krilnih LED panela i 12 nastavaka. Dubinsko čišćenje, zatezanje, tretman akni i nega temena iz jednog uređaja.',
    when: [
      'gradila bi celovit protokol podmlađivanja',
      'nudila bi i LED terapiju svetlom',
      'nega temena je deo tvoje ponude',
    ],
    compare: {
      tech: 'Vortex hidrodermabrazija + LED',
      heads: '12 nastavaka + 5 krilnih LED panela',
      ai: 'Nema',
    },
  },
};

export const sr: ShowcaseCopy = {
  seo: {
    name: 'Hidrodermabrazija i multifunkcionalni uređaji',
    nameShort: 'Hydrafacial uređaji',
    description: 'Hidrodermabrazijski i kombinovani kozmetički uređaji.',
  },
  hero: {
    titleLines: ['Hydrafacial uređaj', 'od kog koža blista.'],
    lead: 'Dubinsko čišćenje, hidratacija i podmlađivanje kože u jednom uređaju, sa vidljivim rezultatom već posle prvog tretmana. Pomoći ćemo ti da izabereš uređaj koji odgovara tvom salonu, obučićemo te i, ako treba, popraviti ga.',
    imageAlt: 'Obuka za rad sa uređajem HydraScan PRO+ u Skinlab izložbenom salonu',
  },
  usp: [
    { title: '2 godine pune garancije', sub: 'na svaki novi uređaj' },
    { title: 'Individualna obuka za rad', sub: 'u našem izložbenom salonu' },
    { title: 'Sopstveni servis u Mađarskoj', sub: 'brza popravka u Érdu' },
    { title: 'Plaćanje na rate uz 0% EKS', sub: '50% avans + mesečne rate' },
  ],
  models: {
    title: 'Koji odgovara tvom salonu?',
    lead: 'Sva tri se zasnivaju na hidrodermabraziji. Razlika je u broju nastavaka, dodatnim tehnologijama i tome da li ti treba analiza kože.',
    copy: models,
  },
  reviews,
  compare: {
    title: 'Tehničko poređenje',
    lead: 'Glavne razlike na prvi pogled',
    labels: ['Cena', 'Tehnologija', 'Nastavci', 'AI analiza kože', 'Garancija', 'Kome preporučujemo'],
    help: compareHelp,
  },
  whyBuy: {
    title: 'Zašto se isplati kupiti hydrafacial uređaj?',
    lead: 'Šta je dobro promisliti pre kupovine.',
    imageAlt: 'Hidrodermabrazijski tretman lica Skinlab uređajem u salonu',
    items: [
      {
        title: 'Trenutni rezultat',
        text: 'Već posle prvog tretmana koža je vidljivo lepša i blistavija. Klijentkinja odmah oseti razliku.',
      },
      {
        title: 'Svestrani tretmani',
        text: 'Čišćenje, hidratacija, anti-aging i tretman pigmentnih fleka jednim uređajem.',
      },
      {
        title: 'Tretman koji se dobro naplaćuje',
        text: 'Saloni za hydrafacial tretman mogu da naplate 15 000-30 000 Ft, pa se uređaj može brzo isplatiti.',
      },
      {
        title: 'Analiza kože pred klijentkinjom',
        text: '4K kamera uređaja HydraScan PRO+ pokazuje stanje kože i na osnovu toga preporučuje tretman i kućnu negu.',
      },
    ],
  },
  finance: {
    ...financeTexts,
    lead: 'Beskamatno plaćanje na rate uz 0% EKS: 50% avans, ostatak u 3 ili 6 mesečnih rata. Bez naknade za obradu i bez skrivenih troškova.',
  },
  training: {
    titleLines: ['Nećeš to učiti sama.', 'Naučićemo te svemu.'],
    text: 'Individualna obuka za rad u našem izložbenom salonu: prenosimo ti sopstvenu proverenu tehniku, a i posle obuke možeš da računaš na našu stručnu podršku.',
    cta: 'Naše obuke',
  },
  consult,
  faq: {
    title: 'Česta pitanja',
    lead: 'Najčešća pitanja o hydrafacial tretmanu. Ako ne nađeš odgovor, pitaj nas direktno.',
    items: [
      {
        question: 'Koja je razlika između klasičnog čišćenja lica i hydrafaciala?',
        answer: 'Hydrafacial radi sa vakuumskom tehnologijom koja uz dubinsko čišćenje obezbeđuje i infuziju seruma. Bezbolan je, nema crvenila, a klijentkinja odmah može da nastavi svoj dan. Posle klasičnog čišćenja lice je često danima crveno.',
      },
      {
        question: 'Koliko često može da se radi hydrafacial tretman?',
        answer: 'Tretman održavanja obično se preporučuje na svakih 4-6 nedelja. Kao paket tretmana može se raditi i nedeljno radi poboljšanja stanja kože. Veoma je nežan postupak.',
      },
      {
        question: 'Da li je pogodan za sve tipove kože?',
        answer: 'Da. Hydrafacial je jedan od najnežnijih tretmana lica, može se primeniti i na osetljivoj koži i kod rozacee. Ne preporučuje se jedino kod aktivnih upalnih akni.',
      },
    ],
  },
  visit: {
    title: 'Isprobaj ga uživo u Érdu.',
    text: 'Dođi u naš izložbeni salon i pogledaj uređaje uživo pre nego što se odlučiš.',
    booking: 'Uz prethodno zakazivanje',
    demoCta: 'Želim prezentaciju',
  },
};
