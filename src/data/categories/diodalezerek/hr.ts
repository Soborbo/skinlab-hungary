/**
 * Stranica kategorije diodnih lasera - hrvatski tekst (prijevod ./hu.ts).
 * Cijene, snaga, specifikacije i slike dolaze iz JSON-a proizvoda.
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { compareHelp, consult, financeTexts, reviews } from '../common.hr';

const models: Record<string, ShowcaseModelCopy> = {
  athena: {
    tagline: 'kontrola i preciznost',
    forWho: 'Početak / dodatna usluga',
    desc: 'Pametni softver koji preporučuje postavke prema tipu kože i dlake. Stabilan, predvidljiv uređaj za svakoga tko tek počinje s uklanjanjem dlačica ili ga dodaje u ponudu.',
    when: [
      'tražiš isplativ, ali profesionalan početni uređaj',
      'uklanjanje dlačica bit će dodatna usluga',
      'predvidljivost ti je važnija od tempa',
    ],
  },
  olympia: {
    tagline: 'pobjednička snaga',
    forWho: 'Tempo uz kontrolu',
    desc: 'Izlazna snaga 1200W i 5 podesivih veličina spota: precizan rad na manjim površinama, brz napredak na velikim.',
    when: [
      'tražiš snažan uređaj po realnoj cijeni',
      'želiš brže tretmane, ali uz kontrolu',
      'imaš raznolike klijentice i dijelove tijela',
    ],
  },
  helios: {
    tagline: 'prava snaga svjetlosti',
    forWho: 'Klinika, velik promet',
    desc: 'Naš najsnažniji model: 1600W, dublji učinak, kraće vrijeme tretmana. Za salone i klinike s velikim prometom.',
    when: [
      'svaki dan imaš puno klijentica za uklanjanje dlačica',
      'kraćim tretmanima ponudila bi više termina',
      'tražiš vrhunsku kategoriju',
    ],
  },
  empire: {
    tagline: 'inteligentni sustav',
    forWho: 'Dijagnostika + karton klijenta',
    desc: 'Dijagnostika dlake i kože mikrokamerom, digitalni karton klijenta s fotografijama prije i poslije, a uređaj sam preporučuje parametre.',
    when: [
      'želiš dokumentirati tretmane',
      'želiš postavke temeljiti na analizi',
      'želiš raditi sa slojevitim impulsima (SHR STACK)',
    ],
  },
};

export const hr: ShowcaseCopy = {
  seo: {
    name: 'Profesionalni diodni laseri',
    nameShort: 'Diodni laseri',
    description: 'Profesionalni diodni laseri s 4 valne duljine za trajno uklanjanje dlačica.',
  },
  hero: {
    titleLines: ['Diodni laser koji', 'vraća klijentice.'],
    lead: 'Trajno uklanjanje dlačica tehnologijom s 4 valne duljine, za sve tipove kože i dlake. Pomoći ćemo ti odabrati uređaj koji odgovara tvom salonu, obučit ćemo te i, ako treba, popraviti ga.',
    imageAlt: 'Uklanjanje dlačica diodnim laserom OLYMPIA u salonu',
  },
  usp: [
    { title: '2 godine potpunog jamstva', sub: 'na svaki novi uređaj' },
    { title: '8-satna obuka na licu mjesta', sub: '+ 6 mjeseci podrške' },
    { title: 'Vlastiti servis u Mađarskoj', sub: 'brz popravak u Érdu' },
    { title: 'Obročna otplata uz 0% EKS', sub: '50% predujam + mjesečne rate' },
  ],
  models: {
    title: 'Koji odgovara tvom salonu?',
    lead: 'Sva četiri imaju 4 valne duljine. Razlika je u tempu, načinu tretmana i tome koliko dokumentiraš.',
    copy: models,
  },
  reviews,
  compare: {
    title: 'Tehnička usporedba',
    lead: 'Glavni parametri na prvi pogled',
    labels: ['Cijena', 'Snaga', 'Valne duljine', 'Veličina spota', 'Hlađenje', 'Kome preporučujemo'],
    help: compareHelp,
  },
  whyBuy: {
    title: 'Zašto se isplati kupiti diodni laser?',
    lead: 'Što je dobro promisliti prije kupnje.',
    imageAlt: 'Glava diodnog lasera OLYMPIA tijekom tretmana',
    items: [
      {
        title: 'Brz povrat investicije',
        text: 'Uz otprilike 3-4 klijentice po radnom danu, cijenu tretmana od 12 000 Ft i trošak od 2 000 Ft po tretmanu, mjesečno ti ostaje 600 000-800 000 Ft. Tako se uređaj može isplatiti za otprilike 3,3-3,7 mjeseca. Ilustrativan izračun, ne financijsko obećanje.',
      },
      {
        title: 'Klijentice koje se vraćaju',
        text: 'Klijentice kupuju paket od 6-8 tretmana, a zatim jednom godišnje dolaze na tretman održavanja.',
      },
      {
        title: 'Učinkovitiji od IPL-a',
        text: 'Ciljaniji, djeluje dublje, potrebno je manje tretmana. Klijentica ranije vidi rezultat.',
      },
      {
        title: 'Za sve tipove kože',
        text: '4 valne duljine učinkovite su na svijetloj i tamnoj koži, na tankoj i debeloj dlaci.',
      },
    ],
  },
  finance: {
    ...financeTexts,
    lead: 'Beskamatna obročna otplata uz 0% EKS: 50% predujam, ostatak u 3, 6 ili 12 mjesečnih rata. Bez naknade za obradu i bez skrivenih troškova.',
  },
  training: {
    titleLines: ['Nećeš to učiti sama.', 'Naučit ćemo te svemu.'],
    text: '8-satna obuka na licu mjesta u tvom salonu, zatim 6 mjeseci podrške. Obuka za rukovatelje s FAR certifikacijom i službenim certifikatom.',
    cta: 'Naše edukacije',
  },
  consult,
  faq: {
    title: 'Česta pitanja',
    lead: 'Najčešća pitanja o diodnim laserima. Ako ne nađeš odgovor, pitaj nas izravno.',
    items: [
      {
        question: 'Koja je razlika između uređaja s 1, 3 i 4 valne duljine?',
        answer: '1 valna duljina (808 nm) je klasika, za svijetlu do srednju kožu. 3 valne duljine tretiraju i tamniju kožu i finiju dlaku. 4 valne duljine (755 + 808 + 940 + 1064 nm) najsvestranije su i učinkovitije i na svijetloj dlaci.',
      },
      {
        question: 'Zašto je snaga (vati) važna?',
        answer: 'Veća snaga = brži tretman, više klijentica dnevno. Salonima s velikim prometom preporučujemo više od 1000W.',
      },
      {
        question: 'Boli li tretman diodnim laserom?',
        answer: 'Safirno hlađenje kože čini ga gotovo bezbolnim, većina klijentica osjeća samo blagu toplinu.',
      },
      {
        question: 'Koliko traje jedan tretman?',
        answer: 'Pazusi 5-10 minuta, noge 20-40 minuta, cijelo tijelo 60-90 minuta, ovisno o uređaju.',
      },
    ],
  },
  visit: {
    title: 'Isprobaj sve u Érdu.',
    text: 'Dođi u naš izložbeni salon i uživo isprobaj sva četiri diodna lasera prije nego što se odlučiš.',
    booking: 'Uz prethodnu najavu termina',
    demoCta: 'Želim prezentaciju',
  },
};
