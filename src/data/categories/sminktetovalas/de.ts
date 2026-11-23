/**
 * PMU-Geräte Kategorieseite - deutscher Text (Übersetzung von ./hu.ts).
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { compareHelp, consult, reviews } from '../common.de';

const models: Record<string, ShowcaseModelCopy> = {
  'mast-nano-2': {
    name: 'MAST Nano 2',
    keySpec: '66 g',
    tagline: 'das Federleichte',
    forWho: 'Lidstrich, Präzisionsarbeit',
    desc: 'Ein PMU-Gerät mit nur 66 Gramm, Coreless-Motor und festem Hub von 2,7 mm. Leise, kaum Vibration, und dank der kleinen Größe besonders gut für den Lidstrich.',
    when: [
      'du viel am Augenlid arbeitest',
      'du das leichteste Gerät suchst',
      'du mit festem Hub lernen möchtest',
    ],
    compare: {
      stroke: '2,7 mm (fest)',
      motor: 'Coreless, 10 000 U/min',
      weight: '66 g',
    },
  },
  'mast-p60-premium-sminktetovalo-gep-allithato-lokethosszal': {
    name: 'MAST P60',
    keySpec: 'einstellbarer Hub',
    tagline: 'das Vielseitige',
    forWho: 'Tägliche PMU-Arbeit',
    desc: 'Ein kabelloses PMU-Gerät mit in 5 Stufen einstellbarem Hub (2,2-3,2 mm), sodass du es von der Härchentechnik bis zum Shading für alles einstellen kannst. 121 g, mehr als 3 Stunden Laufzeit.',
    when: [
      'du Augenbrauen, Lippen und Lidstrich machst',
      'du den Hub je nach Technik einstellen möchtest',
      'du ohne Kabel arbeiten möchtest',
    ],
    compare: {
      stroke: '5 Stufen (2,2-3,2 mm)',
      motor: 'Coreless, 11 000 U/min',
      weight: '121 g',
    },
  },
  'mast-p60-sminktetovalo-gep': {
    name: 'MAST P60 Set',
    keySpec: '+ Ersatzakku',
    tagline: 'das Unterbrechungsfreie',
    forWho: 'Profistudio, lange Arbeitstage',
    desc: 'Dasselbe MAST P60 Gerät mit einstellbarem Hub, zusammen mit einem Ersatzakku in einem Paket. Während ein Akku lädt, arbeitest du mit dem anderen weiter.',
    when: [
      'du mehrere Kundinnen hintereinander hast',
      'du nicht aufs Laden warten möchtest',
      'du mit einem Komplettpaket starten möchtest',
    ],
    compare: {
      stroke: '5 Stufen (2,2-3,2 mm)',
      motor: 'Coreless, 11 000 U/min',
      weight: '121 g',
    },
  },
  'faviamo-flare': {
    name: 'Faviamo Flare',
    keySpec: '4,2 mm Hub',
    tagline: 'die Luxus-Tattoomaschine',
    forWho: 'Lining, Colouring, Shading',
    desc: 'Eine kabellose Tattoomaschine mit Mcore-Pro Brushless-Motor und 4,2 mm Hub. 182 g, 4-5 Stunden Laufzeit, 3 Intensitätsstufen, in Roségold mit Kristallverzierung.',
    when: [
      'du auch tätowieren möchtest, nicht nur PMU',
      'du einen stärkeren Hub brauchst',
      'das Gerät auch ein Schmuckstück deines Arbeitsplatzes sein soll',
    ],
    compare: {
      stroke: '4,2 mm',
      motor: 'Mcore-Pro Brushless',
      weight: '182 g',
    },
  },
};

export const de: ShowcaseCopy = {
  seo: {
    name: 'PMU- und Permanent-Make-up-Geräte',
    nameShort: 'PMU-Geräte',
    description: 'Kabelgebundene und kabellose Permanent-Make-up-Geräte, Tattoomaschinen und Zubehör.',
  },
  hero: {
    titleLines: ['Ein PMU-Gerät,', 'das sich deiner Hand anpasst.'],
    lead: 'Leichte, leise Geräte für Augenbrauen, Lippen und Lidstrich. Wir helfen dir, das passende zu finden, und reparieren es, wenn nötig.',
    imageAlt: 'Permanent Make-up mit einem MAST Gerät im Salon',
  },
  usp: [
    { title: '1 Jahr Garantie', sub: 'auf jedes Gerät' },
    { title: 'Eigener Service in Ungarn', sub: 'schnelle Reparatur in Érd' },
    { title: 'Universelle Nadelmodule', sub: 'mit den Nadeln der meisten Hersteller' },
    { title: 'Persönliche Beratung', sub: 'von den Gründern' },
  ],
  models: {
    title: 'Welches passt zu deiner Hand?',
    lead: 'Drei PMU-Geräte und eine Tattoomaschine. Der Unterschied liegt im Gewicht, in der Hublänge und im Motor.',
    copy: models,
  },
  reviews,
  compare: {
    title: 'Technischer Vergleich',
    lead: 'Die wichtigsten Unterschiede auf einen Blick',
    labels: ['Preis', 'Hublänge', 'Motor', 'Gewicht', 'Empfohlen für'],
    help: compareHelp,
  },
  whyBuy: {
    title: 'Worauf solltest du bei der Gerätewahl achten?',
    lead: 'Was du vor dem Kauf durchdenken solltest.',
    imageAlt: 'Faviamo Flare Tattoomaschine auf einem Ständer',
    items: [
      {
        title: 'Präzise Linienführung',
        text: 'Bei minimaler Vibration werden Microblading, Powder Brows und Lippenpigmentierung gleichmäßig.',
      },
      {
        title: 'Arbeiten ohne Kabel',
        text: 'Der MAST P60 und die Faviamo Flare laufen mit Akku, so stört kein Kabel. Zum MAST P60 Set gehört auch ein Ersatzakku.',
      },
      {
        title: 'Universelle Nadelmodule',
        text: 'Die Geräte arbeiten mit einem universellen Cartridge-System und sind mit den Nadelmodulen der meisten Hersteller kompatibel.',
      },
      {
        title: 'Profigerät zum Einstiegspreis',
        text: 'Auch als Anfängerin musst du keine große Summe investieren, und du kannst deinen Gerätepark später jederzeit erweitern.',
      },
    ],
  },
  consult: {
    ...consult,
    needs: [
      'Du kannst dich nicht entscheiden',
      'Du möchtest genaue Infos zu den Geräten',
      'Du hast eine Frage zu den Nadelmodulen',
      'Du brauchst einfach einen guten Rat',
    ],
  },
  faq: {
    title: 'Häufige Fragen',
    lead: 'Die häufigsten Fragen zu PMU-Geräten. Wenn du die Antwort nicht findest, frag uns direkt.',
    items: [
      {
        question: 'Wie lange hält eine Akkuladung?',
        answer: 'Der MAST P60 mehr als 3 Stunden, die Faviamo Flare 4-5 Stunden. Zum MAST P60 Set gehört ein Ersatzakku, so kannst du weiterarbeiten, während der andere lädt.',
      },
      {
        question: 'Welches Gerät soll ich als Anfängerin wählen?',
        answer: 'Als Anfängerin lohnt sich ein einfach zu bedienendes, zuverlässiges Gerät. Der feste Hub des MAST Nano 2 erleichtert das Lernen, der einstellbare Hub des MAST P60 wächst mit deiner Technik mit.',
      },
      {
        question: 'Was ist der Unterschied zwischen dem MAST P60 und dem MAST P60 Set?',
        answer: 'Das Gerät ist dasselbe: in 5 Stufen einstellbarer Hub, 121 g. Das Set ist Tiffany-farben und enthält einen Ersatzakku, so musst du auch an langen Arbeitstagen nicht aufs Laden warten.',
      },
      {
        question: 'Welche Nadelmodule kann ich verwenden?',
        answer: 'Die MAST Geräte arbeiten mit einem universellen Cartridge-System und sind mit den Nadelmodulen der meisten Hersteller kompatibel. Für sicheres Arbeiten empfehlen wir hochwertige, sterile Einweg-Nadelmodule.',
      },
    ],
  },
  visit: {
    title: 'Nimm es in Érd in die Hand.',
    text: 'Komm in unseren Showroom und nimm die Geräte in die Hand, bevor du dich entscheidest. Vereinbare vorher einen Termin.',
    booking: 'Nach vorheriger Terminvereinbarung',
    demoCta: 'Demo anfragen',
  },
};
