/**
 * Stranica kategorije diodnih lasera - srpski tekst, latinica (prevod ./hu.ts).
 * Cene, snaga, specifikacije i slike dolaze iz JSON-a proizvoda.
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { compareHelp, consult, financeTexts, reviews } from '../common.sr';

const models: Record<string, ShowcaseModelCopy> = {
  athena: {
    tagline: 'kontrola i preciznost',
    forWho: 'Početak / dodatna usluga',
    desc: 'Pametni softver koji preporučuje podešavanja prema tipu kože i dlake. Stabilan, predvidljiv uređaj za svakoga ko tek počinje sa uklanjanjem dlačica ili ga dodaje u ponudu.',
    when: [
      'tražiš isplativ, ali profesionalan početni uređaj',
      'uklanjanje dlačica biće dodatna usluga',
      'predvidljivost ti je važnija od tempa',
    ],
  },
  olympia: {
    tagline: 'pobednička snaga',
    forWho: 'Tempo uz kontrolu',
    desc: 'Izlazna snaga 1200W i 5 podesivih veličina spota: precizan rad na manjim površinama, brz napredak na velikim.',
    when: [
      'tražiš snažan uređaj po realnoj ceni',
      'želiš brže tretmane, ali uz kontrolu',
      'imaš raznovrsne klijentkinje i delove tela',
    ],
  },
  helios: {
    tagline: 'prava snaga svetlosti',
    forWho: 'Klinika, veliki promet',
    desc: 'Naš najsnažniji model: 1600W, dublji efekat, kraće vreme tretmana. Za salone i klinike sa velikim prometom.',
    when: [
      'svakog dana imaš mnogo klijentkinja za uklanjanje dlačica',
      'kraćim tretmanima ponudila bi više termina',
      'tražiš vrhunsku kategoriju',
    ],
  },
  empire: {
    tagline: 'inteligentni sistem',
    forWho: 'Dijagnostika + karton klijenta',
    desc: 'Dijagnostika dlake i kože mikrokamerom, digitalni karton klijenta sa fotografijama pre i posle, a uređaj sam preporučuje parametre.',
    when: [
      'želiš da dokumentuješ tretmane',
      'želiš da podešavanja zasnivaš na analizi',
      'želiš da radiš sa slojevitim impulsima (SHR STACK)',
    ],
  },
};

export const sr: ShowcaseCopy = {
  seo: {
    name: 'Profesionalni diodni laseri',
    nameShort: 'Diodni laseri',
    description: 'Profesionalni diodni laseri sa 4 talasne dužine za trajno uklanjanje dlačica.',
  },
  hero: {
    titleLines: ['Diodni laser koji', 'vraća klijentkinje.'],
    lead: 'Trajno uklanjanje dlačica tehnologijom sa 4 talasne dužine, za sve tipove kože i dlake. Pomoći ćemo ti da izabereš uređaj koji odgovara tvom salonu, obučićemo te i, ako treba, popraviti ga.',
    imageAlt: 'Uklanjanje dlačica diodnim laserom OLYMPIA u salonu',
  },
  usp: [
    { title: '2 godine pune garancije', sub: 'na svaki novi uređaj' },
    { title: 'Obuka od 8 sati na licu mesta', sub: '+ 6 meseci podrške' },
    { title: 'Sopstveni servis u Mađarskoj', sub: 'brza popravka u Érdu' },
    { title: 'Plaćanje na rate uz 0% EKS', sub: '50% avans + mesečne rate' },
  ],
  models: {
    title: 'Koji odgovara tvom salonu?',
    lead: 'Sva četiri imaju 4 talasne dužine. Razlika je u tempu, načinu tretmana i tome koliko dokumentuješ.',
    copy: models,
  },
  reviews,
  compare: {
    title: 'Tehničko poređenje',
    lead: 'Glavni parametri na prvi pogled',
    labels: ['Cena', 'Snaga', 'Talasne dužine', 'Veličina spota', 'Hlađenje', 'Kome preporučujemo'],
    help: compareHelp,
  },
  whyBuy: {
    title: 'Zašto se isplati kupiti diodni laser?',
    lead: 'Šta je dobro promisliti pre kupovine.',
    imageAlt: 'Glava diodnog lasera OLYMPIA tokom tretmana',
    items: [
      {
        title: 'Brz povraćaj investicije',
        text: 'Uz otprilike 3-4 klijentkinje po radnom danu, cenu tretmana od 12 000 Ft i trošak od 2 000 Ft po tretmanu, mesečno ti ostaje 600 000-800 000 Ft. Tako se uređaj može isplatiti za otprilike 3,3-3,7 meseca. Ilustrativna računica, ne finansijsko obećanje.',
      },
      {
        title: 'Klijentkinje koje se vraćaju',
        text: 'Klijentkinje kupuju paket od 6-8 tretmana, a zatim jednom godišnje dolaze na tretman održavanja.',
      },
      {
        title: 'Efikasniji od IPL-a',
        text: 'Ciljaniji, deluje dublje, potrebno je manje tretmana. Klijentkinja ranije vidi rezultat.',
      },
      {
        title: 'Za sve tipove kože',
        text: '4 talasne dužine efikasne su na svetloj i tamnoj koži, na tankoj i debeloj dlaci.',
      },
    ],
  },
  finance: {
    ...financeTexts,
    lead: 'Beskamatno plaćanje na rate uz 0% EKS: 50% avans, ostatak u 3, 6 ili 12 mesečnih rata. Bez naknade za obradu i bez skrivenih troškova.',
  },
  training: {
    titleLines: ['Nećeš to učiti sama.', 'Naučićemo te svemu.'],
    text: 'Obuka od 8 sati na licu mesta u tvom salonu, zatim 6 meseci podrške. Obuka za rukovaoce sa FAR sertifikacijom i zvaničnim sertifikatom.',
    cta: 'Naše obuke',
  },
  consult,
  faq: {
    title: 'Česta pitanja',
    lead: 'Najčešća pitanja o diodnim laserima. Ako ne nađeš odgovor, pitaj nas direktno.',
    items: [
      {
        question: 'Koja je razlika između uređaja sa 1, 3 i 4 talasne dužine?',
        answer: '1 talasna dužina (808 nm) je klasika, za svetlu do srednju kožu. 3 talasne dužine tretiraju i tamniju kožu i finiju dlaku. 4 talasne dužine (755 + 808 + 940 + 1064 nm) najsvestranije su i efikasnije i na svetloj dlaci.',
      },
      {
        question: 'Zašto je snaga (vati) važna?',
        answer: 'Veća snaga = brži tretman, više klijentkinja dnevno. Salonima sa velikim prometom preporučujemo više od 1000W.',
      },
      {
        question: 'Da li boli tretman diodnim laserom?',
        answer: 'Safirno hlađenje kože čini ga gotovo bezbolnim, većina klijentkinja oseća samo blagu toplotu.',
      },
      {
        question: 'Koliko traje jedan tretman?',
        answer: 'Pazuh 5-10 minuta, noge 20-40 minuta, celo telo 60-90 minuta, u zavisnosti od uređaja.',
      },
    ],
  },
  visit: {
    title: 'Isprobaj sve u Érdu.',
    text: 'Dođi u naš izložbeni salon i uživo isprobaj sva četiri diodna lasera pre nego što se odlučiš.',
    booking: 'Uz prethodno zakazivanje',
    demoCta: 'Želim prezentaciju',
  },
};
