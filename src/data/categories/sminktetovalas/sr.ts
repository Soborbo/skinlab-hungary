/**
 * Kategorija PMU uređaja - srpski tekst, latinica (prevod ./hu.ts).
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { compareHelp, consult, reviews } from '../common.sr';

const models: Record<string, ShowcaseModelCopy> = {
  'mast-nano-2': {
    name: 'MAST Nano 2',
    keySpec: '66 g',
    tagline: 'lagan kao pero',
    forWho: 'Ajlajner, precizan rad',
    desc: 'PMU uređaj težak samo 66 grama, sa coreless motorom i fiksnim hodom od 2,7 mm. Tih, gotovo ne vibrira, a zbog male veličine posebno je dobar za ajlajner.',
    when: [
      'mnogo radiš na kapcima',
      'tražiš najlakši uređaj',
      'želiš da učiš sa fiksnim hodom',
    ],
    compare: {
      stroke: '2,7 mm (fiksni)',
      motor: 'Coreless, 10 000 o/min',
      weight: '66 g',
    },
  },
  'mast-p60-premium-sminktetovalo-gep-allithato-lokethosszal': {
    name: 'MAST P60',
    keySpec: 'podesivi hod',
    tagline: 'svestrani',
    forWho: 'Svakodnevni PMU rad',
    desc: 'Bežični PMU uređaj sa hodom podesivim u 5 stepeni (2,2-3,2 mm), pa ga možeš podesiti za sve, od obrva dlačicu po dlačicu do senčenja. 121 g, više od 3 sata rada.',
    when: [
      'radiš obrve, usne i ajlajner',
      'želiš da podešavaš hod prema tehnici',
      'želiš da radiš bez kabla',
    ],
    compare: {
      stroke: '5 stepeni (2,2-3,2 mm)',
      motor: 'Coreless, 11 000 o/min',
      weight: '121 g',
    },
  },
  'mast-p60-sminktetovalo-gep': {
    name: 'MAST P60 set',
    keySpec: '+ rezervna baterija',
    tagline: 'bez prekida',
    forWho: 'Profi studio, dug radni dan',
    desc: 'Isti MAST P60 uređaj sa podesivim hodom, u paketu sa rezervnom baterijom. Dok se jedna baterija puni, sa drugom radiš dalje.',
    when: [
      'imaš više klijentkinja zaredom',
      'ne želiš da čekaš punjenje',
      'želiš da počneš sa kompletnim paketom',
    ],
    compare: {
      stroke: '5 stepeni (2,2-3,2 mm)',
      motor: 'Coreless, 11 000 o/min',
      weight: '121 g',
    },
  },
  'faviamo-flare': {
    name: 'Faviamo Flare',
    keySpec: 'hod 4,2 mm',
    tagline: 'luksuzna mašina za tetoviranje',
    forWho: 'Linije, bojenje, senčenje',
    desc: 'Bežična mašina za tetoviranje sa Mcore-Pro brushless motorom i hodom od 4,2 mm. 182 g, 4-5 sati rada, 3 režima intenziteta, u izvedbi rose gold sa kristalima.',
    when: [
      'želiš i da tetoviraš, ne samo da radiš PMU',
      'treba ti jači hod',
      'želiš da uređaj bude i ukras tvog radnog mesta',
    ],
    compare: {
      stroke: '4,2 mm',
      motor: 'Mcore-Pro brushless',
      weight: '182 g',
    },
  },
};

export const sr: ShowcaseCopy = {
  seo: {
    name: 'PMU uređaji i uređaji za trajnu šminku',
    nameShort: 'PMU uređaji',
    description: 'Žičani i bežični uređaji za trajnu šminku, mašine za tetoviranje i pribor.',
  },
  hero: {
    titleLines: ['PMU uređaj', 'koji se prilagođava tvojoj ruci.'],
    lead: 'Lagani, tihi uređaji za obrve, usne i ajlajner. Pomoći ćemo ti da izabereš pravi, a ako treba, i da ga popravimo.',
    imageAlt: 'Trajna šminka MAST uređajem u salonu',
  },
  usp: [
    { title: '1 godina garancije', sub: 'na svaki uređaj' },
    { title: 'Sopstveni servis u Mađarskoj', sub: 'brza popravka u Érdu' },
    { title: 'Univerzalni moduli igala', sub: 'sa iglama većine proizvođača' },
    { title: 'Lično savetovanje', sub: 'od osnivača' },
  ],
  models: {
    title: 'Koji odgovara tvojoj ruci?',
    lead: 'Tri PMU uređaja i jedna mašina za tetoviranje. Razlika je u težini, dužini hoda i motoru.',
    copy: models,
  },
  reviews,
  compare: {
    title: 'Tehničko poređenje',
    lead: 'Glavne razlike na prvi pogled',
    labels: ['Cena', 'Dužina hoda', 'Motor', 'Težina', 'Kome preporučujemo'],
    help: compareHelp,
  },
  whyBuy: {
    title: 'Na šta da paziš pri izboru uređaja?',
    lead: 'Šta je dobro promisliti pre kupovine.',
    imageAlt: 'Faviamo Flare mašina za tetoviranje na postolju',
    items: [
      {
        title: 'Precizne linije',
        text: 'Uz minimalne vibracije microblading, powder brows i pigmentacija usana biće ujednačeni.',
      },
      {
        title: 'Rad bez kabla',
        text: 'MAST P60 i Faviamo Flare rade na bateriju, pa nema kabla koji smeta. Uz MAST P60 set dobijaš i rezervnu bateriju.',
      },
      {
        title: 'Univerzalni moduli igala',
        text: 'Uređaji rade sa univerzalnim cartridge sistemom i kompatibilni su sa modulima igala većine proizvođača.',
      },
      {
        title: 'Profi uređaj po početnoj ceni',
        text: 'Ni kao početnica ne moraš da uložiš veliki iznos, a opremu kasnije možeš da proširiš kad god želiš.',
      },
    ],
  },
  consult: {
    ...consult,
    needs: [
      'Ne znaš koji da izabereš',
      'Želiš tačne informacije o uređajima',
      'Imaš pitanje o modulima igala',
      'Treba ti samo dobar savet',
    ],
  },
  faq: {
    title: 'Česta pitanja',
    lead: 'Najčešća pitanja o PMU uređajima. Ako ne pronađeš odgovor, pitaj nas direktno.',
    items: [
      {
        question: 'Koliko dugo traje jedno punjenje?',
        answer: 'MAST P60 više od 3 sata, Faviamo Flare 4-5 sati. Uz MAST P60 set dobijaš rezervnu bateriju, pa dok se jedna puni, sa drugom možeš da radiš dalje.',
      },
      {
        question: 'Koji uređaj da izaberem kao početnica?',
        answer: 'Kao početnica isplati se da izabereš jednostavan i pouzdan uređaj. Fiksni hod MAST Nano 2 olakšava učenje, a podesivi hod MAST P60 razvija se zajedno sa tvojom tehnikom.',
      },
      {
        question: 'Koja je razlika između MAST P60 i MAST P60 seta?',
        answer: 'Uređaj je isti: hod podesiv u 5 stepeni, 121 g. Set je u Tiffany boji i uz njega dobijaš rezervnu bateriju, pa ni tokom dugog radnog dana ne moraš da čekaš punjenje.',
      },
      {
        question: 'Koje module igala mogu da koristim?',
        answer: 'MAST uređaji rade sa univerzalnim cartridge sistemom i kompatibilni su sa modulima igala većine proizvođača. Za bezbedan rad preporučujemo kvalitetne, sterilne module igala za jednokratnu upotrebu.',
      },
    ],
  },
  visit: {
    title: 'Uzmi ga u ruke u Érdu.',
    text: 'Dođi u naš izložbeni salon i uzmi uređaje u ruke pre nego što odlučiš. Pre toga zakaži termin.',
    booking: 'Uz prethodno zakazivanje',
    demoCta: 'Želim prezentaciju',
  },
};
