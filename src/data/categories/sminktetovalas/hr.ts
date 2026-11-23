/**
 * Kategorija PMU uređaja - hrvatski tekst (prijevod ./hu.ts).
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { compareHelp, consult, reviews } from '../common.hr';

const models: Record<string, ShowcaseModelCopy> = {
  'mast-nano-2': {
    name: 'MAST Nano 2',
    keySpec: '66 g',
    tagline: 'lagan kao pero',
    forWho: 'Eyeliner, precizan rad',
    desc: 'PMU uređaj težak samo 66 grama, s coreless motorom i fiksnim hodom od 2,7 mm. Tih, gotovo ne vibrira, a zbog male veličine posebno je dobar za eyeliner.',
    when: [
      'puno radiš na kapcima',
      'tražiš najlakši uređaj',
      'želiš učiti s fiksnim hodom',
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
    desc: 'Bežični PMU uređaj s hodom podesivim u 5 stupnjeva (2,2-3,2 mm), pa ga možeš podesiti za sve, od obrva dlačicu po dlačicu do sjenčanja. 121 g, više od 3 sata rada.',
    when: [
      'radiš obrve, usne i eyeliner',
      'želiš podešavati hod prema tehnici',
      'želiš raditi bez kabela',
    ],
    compare: {
      stroke: '5 stupnjeva (2,2-3,2 mm)',
      motor: 'Coreless, 11 000 o/min',
      weight: '121 g',
    },
  },
  'mast-p60-sminktetovalo-gep': {
    name: 'MAST P60 set',
    keySpec: '+ rezervna baterija',
    tagline: 'bez prekida',
    forWho: 'Profi studio, dug radni dan',
    desc: 'Isti MAST P60 uređaj s podesivim hodom, u paketu s rezervnom baterijom. Dok se jedna baterija puni, s drugom radiš dalje.',
    when: [
      'imaš više klijentica zaredom',
      'ne želiš čekati punjenje',
      'želiš početi s kompletnim paketom',
    ],
    compare: {
      stroke: '5 stupnjeva (2,2-3,2 mm)',
      motor: 'Coreless, 11 000 o/min',
      weight: '121 g',
    },
  },
  'faviamo-flare': {
    name: 'Faviamo Flare',
    keySpec: 'hod 4,2 mm',
    tagline: 'luksuzni uređaj za tetoviranje',
    forWho: 'Linije, bojanje, sjenčanje',
    desc: 'Bežični uređaj za tetoviranje s Mcore-Pro brushless motorom i hodom od 4,2 mm. 182 g, 4-5 sati rada, 3 načina intenziteta, u izvedbi rose gold s kristalima.',
    when: [
      'želiš i tetovirati, ne samo raditi PMU',
      'treba ti jači hod',
      'želiš da uređaj bude i ukras tvog radnog mjesta',
    ],
    compare: {
      stroke: '4,2 mm',
      motor: 'Mcore-Pro brushless',
      weight: '182 g',
    },
  },
};

export const hr: ShowcaseCopy = {
  seo: {
    name: 'PMU uređaji i uređaji za trajnu šminku',
    nameShort: 'PMU uređaji',
    description: 'Žičani i bežični uređaji za trajnu šminku, uređaji za tetoviranje i pribor.',
  },
  hero: {
    titleLines: ['PMU uređaj', 'koji se prilagođava tvojoj ruci.'],
    lead: 'Lagani, tihi uređaji za obrve, usne i eyeliner. Pomoći ćemo ti odabrati pravi, a ako treba, i popraviti ga.',
    imageAlt: 'Trajna šminka MAST uređajem u salonu',
  },
  usp: [
    { title: '1 godina jamstva', sub: 'na svaki uređaj' },
    { title: 'Vlastiti servis u Mađarskoj', sub: 'brz popravak u Érdu' },
    { title: 'Univerzalni moduli igala', sub: 's iglama većine proizvođača' },
    { title: 'Osobno savjetovanje', sub: 'od osnivača' },
  ],
  models: {
    title: 'Koji odgovara tvojoj ruci?',
    lead: 'Tri PMU uređaja i jedan uređaj za tetoviranje. Razlika je u težini, duljini hoda i motoru.',
    copy: models,
  },
  reviews,
  compare: {
    title: 'Tehnička usporedba',
    lead: 'Glavne razlike na prvi pogled',
    labels: ['Cijena', 'Duljina hoda', 'Motor', 'Težina', 'Kome preporučujemo'],
    help: compareHelp,
  },
  whyBuy: {
    title: 'Na što paziti pri odabiru uređaja?',
    lead: 'Što je dobro promisliti prije kupnje.',
    imageAlt: 'Faviamo Flare uređaj za tetoviranje na postolju',
    items: [
      {
        title: 'Precizne linije',
        text: 'Uz minimalne vibracije microblading, powder brows i pigmentacija usana bit će ujednačeni.',
      },
      {
        title: 'Rad bez kabela',
        text: 'MAST P60 i Faviamo Flare rade na bateriju, pa nema kabela koji smeta. Uz MAST P60 set dobivaš i rezervnu bateriju.',
      },
      {
        title: 'Univerzalni moduli igala',
        text: 'Uređaji rade s univerzalnim cartridge sustavom i kompatibilni su s modulima igala većine proizvođača.',
      },
      {
        title: 'Profi uređaj po početnoj cijeni',
        text: 'Ni kao početnica ne moraš ulagati velik iznos, a opremu kasnije možeš proširiti kad god želiš.',
      },
    ],
  },
  consult: {
    ...consult,
    needs: [
      'Ne znaš koji odabrati',
      'Želiš točne informacije o uređajima',
      'Imaš pitanje o modulima igala',
      'Treba ti samo dobar savjet',
    ],
  },
  faq: {
    title: 'Česta pitanja',
    lead: 'Najčešća pitanja o PMU uređajima. Ako ne pronađeš odgovor, pitaj nas izravno.',
    items: [
      {
        question: 'Koliko dugo traje jedno punjenje?',
        answer: 'MAST P60 više od 3 sata, Faviamo Flare 4-5 sati. Uz MAST P60 set dobivaš rezervnu bateriju, pa dok se jedna puni, s drugom možeš raditi dalje.',
      },
      {
        question: 'Koji uređaj odabrati kao početnica?',
        answer: 'Kao početnica isplati se odabrati jednostavan i pouzdan uređaj. Fiksni hod MAST Nano 2 olakšava učenje, a podesivi hod MAST P60 razvija se zajedno s tvojom tehnikom.',
      },
      {
        question: 'Koja je razlika između MAST P60 i MAST P60 seta?',
        answer: 'Uređaj je isti: hod podesiv u 5 stupnjeva, 121 g. Set je u Tiffany boji i uz njega dobivaš rezervnu bateriju, pa ni tijekom dugog radnog dana ne moraš čekati punjenje.',
      },
      {
        question: 'Koje module igala mogu koristiti?',
        answer: 'MAST uređaji rade s univerzalnim cartridge sustavom i kompatibilni su s modulima igala većine proizvođača. Za siguran rad preporučujemo kvalitetne, sterilne module igala za jednokratnu upotrebu.',
      },
    ],
  },
  visit: {
    title: 'Uzmi ga u ruke u Érdu.',
    text: 'Dođi u naš izložbeni salon i uzmi uređaje u ruke prije nego što odlučiš. Prije toga dogovori termin.',
    booking: 'Uz prethodnu najavu termina',
    demoCta: 'Želim prezentaciju',
  },
};
