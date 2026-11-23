/**
 * Stranica kategorije hydrafacial - hrvatski tekst (prijevod ./hu.ts).
 * Cijene, specifikacije i slike dolaze iz JSON-a proizvoda.
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { compareHelp, consult, financeTexts, reviews } from '../common.hr';

const models: Record<string, ShowcaseModelCopy> = {
  hydrascanpro: {
    name: 'HydraScan PRO+',
    keySpec: '8 nastavaka',
    tagline: 'pametna analiza kože',
    forWho: 'AI analiza, premium kabina',
    desc: 'Višenamjenski uređaj usmjeren na hidrodermabraziju, s 4K kamerom i analizom kože pomoću umjetne inteligencije. Na temelju analize preporučuje tretman, proizvode i kućnu njegu, a digitalni karton klijenta sve dokumentira.',
    when: [
      'tretman bi započela analizom kože',
      'prihod bi povećala i preporukom proizvoda',
      'pratila bi i dokumentirala napredak klijentice',
    ],
    compare: {
      tech: 'Hidrodermabrazija + AI analiza kože',
      heads: '8 nastavaka (uključujući LED masku)',
      ai: '4K kamera s tri spektra (oko 2 min)',
    },
  },
  'hidra-mist-elite': {
    name: 'HydraMIST Elite',
    keySpec: '11 u 1',
    tagline: 'svestrani sustav',
    forWho: 'Puno tretmana iz jednog uređaja',
    desc: '11 mogućnosti tretmana u jednom uređaju: vakuumska hidrodermabrazija, unos aktivnih tvari kisikom, radiofrekventno zatezanje i LED kupola s kisikom u kojoj tijekom tretmana može svirati glazba.',
    when: [
      'nudila bi puno tretmana lica iz jednog uređaja',
      'nudila bi i tretmane kisikom i RF',
      'klijenticama bi pružila premium doživljaj',
    ],
    compare: {
      tech: 'Hidrodermabrazija + kisik + RF',
      heads: '11 funkcija (vakuum, UZV, RF, kisik, LED)',
      ai: 'Nema',
    },
  },
  hydralume: {
    name: 'HydraLUME V10',
    keySpec: '12 glava + LED',
    tagline: 'centar za njegu lica',
    forWho: 'LED terapija, njega vlasišta',
    desc: 'Samostojeći centar za njegu lica na kotačima s vortex hidrodermabrazijom, pet krilnih LED panela i 12 nastavaka. Dubinsko čišćenje, zatezanje, tretman akni i njega vlasišta iz jednog uređaja.',
    when: [
      'gradila bi cjeloviti protokol pomlađivanja',
      'nudila bi i LED terapiju svjetlom',
      'njega vlasišta dio je tvoje ponude',
    ],
    compare: {
      tech: 'Vortex hidrodermabrazija + LED',
      heads: '12 nastavaka + 5 krilnih LED panela',
      ai: 'Nema',
    },
  },
};

export const hr: ShowcaseCopy = {
  seo: {
    name: 'Hidrodermabrazija i multifunkcionalni uređaji',
    nameShort: 'Hydrafacial uređaji',
    description: 'Hidrodermabrazijski i kombinirani kozmetički uređaji.',
  },
  hero: {
    titleLines: ['Hydrafacial uređaj', 'od kojeg koža blista.'],
    lead: 'Dubinsko čišćenje, hidratacija i pomlađivanje kože u jednom uređaju, s vidljivim rezultatom već nakon prvog tretmana. Pomoći ćemo ti odabrati uređaj koji odgovara tvom salonu, obučit ćemo te i, ako treba, popraviti ga.',
    imageAlt: 'Obuka za rad s uređajem HydraScan PRO+ u Skinlab izložbenom salonu',
  },
  usp: [
    { title: '2 godine potpunog jamstva', sub: 'na svaki novi uređaj' },
    { title: 'Individualna obuka za rad', sub: 'u našem izložbenom salonu' },
    { title: 'Vlastiti servis u Mađarskoj', sub: 'brz popravak u Érdu' },
    { title: 'Obročna otplata uz 0% EKS', sub: '50% predujam + mjesečne rate' },
  ],
  models: {
    title: 'Koji odgovara tvom salonu?',
    lead: 'Sva tri temelje se na hidrodermabraziji. Razlika je u broju nastavaka, dodatnim tehnologijama i tome treba li ti analiza kože.',
    copy: models,
  },
  reviews,
  compare: {
    title: 'Tehnička usporedba',
    lead: 'Glavne razlike na prvi pogled',
    labels: ['Cijena', 'Tehnologija', 'Nastavci', 'AI analiza kože', 'Jamstvo', 'Kome preporučujemo'],
    help: compareHelp,
  },
  whyBuy: {
    title: 'Zašto se isplati kupiti hydrafacial uređaj?',
    lead: 'Što je dobro promisliti prije kupnje.',
    imageAlt: 'Hidrodermabrazijski tretman lica Skinlab uređajem u salonu',
    items: [
      {
        title: 'Trenutačan rezultat',
        text: 'Već nakon prvog tretmana koža je vidljivo ljepša i blistavija. Klijentica odmah osjeti razliku.',
      },
      {
        title: 'Svestrani tretmani',
        text: 'Čišćenje, hidratacija, anti-aging i tretman pigmentnih mrlja jednim uređajem.',
      },
      {
        title: 'Tretman koji se dobro naplaćuje',
        text: 'Saloni za hydrafacial tretman mogu naplatiti 15 000-30 000 Ft, pa se uređaj može brzo isplatiti.',
      },
      {
        title: 'Analiza kože pred klijenticom',
        text: '4K kamera uređaja HydraScan PRO+ pokazuje stanje kože i na temelju toga preporučuje tretman i kućnu njegu.',
      },
    ],
  },
  finance: {
    ...financeTexts,
    lead: 'Beskamatna obročna otplata uz 0% EKS: 50% predujam, ostatak u 3 ili 6 mjesečnih rata. Bez naknade za obradu i bez skrivenih troškova.',
  },
  training: {
    titleLines: ['Nećeš to učiti sama.', 'Naučit ćemo te svemu.'],
    text: 'Individualna obuka za rad u našem izložbenom salonu: prenosimo ti vlastitu provjerenu tehniku, a i nakon obuke možeš računati na našu stručnu podršku.',
    cta: 'Naše edukacije',
  },
  consult,
  faq: {
    title: 'Česta pitanja',
    lead: 'Najčešća pitanja o hydrafacial tretmanu. Ako ne nađeš odgovor, pitaj nas izravno.',
    items: [
      {
        question: 'Koja je razlika između klasičnog čišćenja lica i hydrafaciala?',
        answer: 'Hydrafacial radi s vakuumskom tehnologijom koja uz dubinsko čišćenje osigurava i infuziju seruma. Bezbolan je, nema crvenila, a klijentica odmah može nastaviti sa svojim danom. Nakon klasičnog čišćenja lice je često danima crveno.',
      },
      {
        question: 'Koliko se često može raditi hydrafacial tretman?',
        answer: 'Tretman održavanja obično se preporučuje svakih 4-6 tjedana. Kao paket tretmana može se raditi i tjedno radi poboljšanja stanja kože. Vrlo je nježan postupak.',
      },
      {
        question: 'Je li prikladan za sve tipove kože?',
        answer: 'Da. Hydrafacial je jedan od najnježnijih tretmana lica, može se primijeniti i na osjetljivoj koži i kod rozaceje. Ne preporučuje se jedino kod aktivnih upalnih akni.',
      },
    ],
  },
  visit: {
    title: 'Isprobaj ga uživo u Érdu.',
    text: 'Dođi u naš izložbeni salon i pogledaj uređaje uživo prije nego što se odlučiš.',
    booking: 'Uz prethodnu najavu termina',
    demoCta: 'Želim prezentaciju',
  },
};
