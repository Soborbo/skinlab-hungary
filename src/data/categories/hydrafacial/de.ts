/**
 * Hydrafacial-Kategorieseite - deutscher Text (Übersetzung von ./hu.ts).
 * Preise, Specs und Bilder kommen aus den Produkt-JSONs.
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { compareHelp, consult, financeTexts, reviews } from '../common.de';

const models: Record<string, ShowcaseModelCopy> = {
  hydrascanpro: {
    name: 'HydraScan PRO+',
    keySpec: '8 Handstücke',
    tagline: 'die intelligente Hautanalyse',
    forWho: 'KI-Analyse, Premium-Kabine',
    desc: 'Multigerät rund um die Hydrodermabrasion mit 4K-Kamera und KI-gestützter Hautanalyse. Auf Basis der Analyse empfiehlt es Behandlung, Produkte und Heimpflege, und die digitale Kundenkartei dokumentiert alles.',
    when: [
      'du die Behandlung mit einer Hautanalyse beginnen willst',
      'du mit Produktempfehlungen zusätzlich Umsatz machen willst',
      'du den Fortschritt deiner Kundin dokumentieren willst',
    ],
    compare: {
      tech: 'Hydrodermabrasion + KI-Hautanalyse',
      heads: '8 Handstücke (inkl. LED-Maske)',
      ai: '4K-Kamera mit drei Spektren (ca. 2 Min.)',
    },
  },
  'hidra-mist-elite': {
    name: 'HydraMIST Elite',
    keySpec: '11-in-1',
    tagline: 'das vielseitige System',
    forWho: 'Viele Behandlungen, ein Gerät',
    desc: '11 Behandlungsoptionen in einem Gerät: Vakuum-Hydradermabrasion, Sauerstoff-Wirkstoffeinschleusung, Radiofrequenz-Straffung und eine LED-Sauerstoffkuppel, in der während der Behandlung auch Musik laufen kann.',
    when: [
      'du viele Gesichtsbehandlungen mit einem Gerät anbieten willst',
      'du auch Sauerstoff- und RF-Behandlungen anbieten willst',
      'du deinen Kundinnen ein Premium-Erlebnis bieten willst',
    ],
    compare: {
      tech: 'Hydradermabrasion + Sauerstoff + RF',
      heads: '11 Funktionen (Vakuum, US, RF, Sauerstoff, LED)',
      ai: 'Keine',
    },
  },
  hydralume: {
    name: 'HydraLUME V10',
    keySpec: '12 Köpfe + LED',
    tagline: 'das Gesichtspflege-Center',
    forWho: 'LED-Therapie, Kopfhautpflege',
    desc: 'Stehendes, fahrbares Gesichtspflege-Center mit Vortex-Hydrodermabrasion, fünf schwenkbaren LED-Paneelen und 12 Handstücken. Tiefenreinigung, Straffung, Aknebehandlung und Kopfhautpflege mit einem Gerät.',
    when: [
      'du ein komplettes Verjüngungsprotokoll aufbauen willst',
      'du auch LED-Lichttherapie anbieten willst',
      'Kopfhautpflege zu deinem Angebot gehört',
    ],
    compare: {
      tech: 'Vortex-Hydrodermabrasion + LED',
      heads: '12 Handstücke + 5 schwenkbare LED-Paneele',
      ai: 'Keine',
    },
  },
};

export const de: ShowcaseCopy = {
  seo: {
    name: 'Hydrodermabrasion & Multifunktionsgeräte',
    nameShort: 'Hydrafacial-Geräte',
    description: 'Hydrodermabrasions- und kombinierte kosmetische Behandlungsgeräte.',
  },
  hero: {
    titleLines: ['Hydrafacial, das die', 'Haut strahlen lässt.'],
    lead: 'Tiefenreinigung, Feuchtigkeit und Hautverjüngung in einem Gerät, mit sichtbarem Ergebnis schon nach der ersten Behandlung. Wir helfen dir, das passende Gerät für deinen Salon zu finden, schulen dich ein und reparieren es, wenn nötig.',
    imageAlt: 'HydraScan PRO+ Geräteschulung im Skinlab Showroom',
  },
  usp: [
    { title: '2 Jahre Vollgarantie', sub: 'auf jedes neue Gerät' },
    { title: 'Individuelle Geräteschulung', sub: 'in unserem Showroom' },
    { title: 'Eigener Service in Ungarn', sub: 'schnelle Reparatur in Érd' },
    { title: 'Ratenzahlung zu 0 % Zinsen', sub: '50 % Anzahlung + Monatsraten' },
  ],
  models: {
    title: 'Welches passt zu deinem Salon?',
    lead: 'Alle drei basieren auf Hydrodermabrasion. Der Unterschied liegt in der Zahl der Handstücke, den Zusatztechnologien und darin, ob du eine Hautanalyse brauchst.',
    copy: models,
  },
  reviews,
  compare: {
    title: 'Technischer Vergleich',
    lead: 'Die wichtigsten Unterschiede auf einen Blick',
    labels: ['Preis', 'Technologie', 'Handstücke', 'KI-Hautanalyse', 'Garantie', 'Empfohlen für'],
    help: compareHelp,
  },
  whyBuy: {
    title: 'Warum lohnt sich ein Hydrafacial-Gerät?',
    lead: 'Was du vor dem Kauf durchdenken solltest.',
    imageAlt: 'Hydrodermabrasions-Gesichtsbehandlung mit einem Skinlab Gerät im Salon',
    items: [
      {
        title: 'Sofortiges Ergebnis',
        text: 'Schon nach der ersten Behandlung ist die Haut sichtbar schöner und strahlender. Die Kundin spürt den Unterschied sofort.',
      },
      {
        title: 'Vielseitige Behandlungen',
        text: 'Reinigung, Feuchtigkeit, Anti-Aging und Pigmentfleckbehandlung mit einem Gerät.',
      },
      {
        title: 'Gut kalkulierbare Behandlung',
        text: 'Für eine Hydrafacial-Behandlung können Salons 15 000-30 000 Ft verlangen, so kann sich das Gerät schnell amortisieren.',
      },
      {
        title: 'Hautanalyse vor der Kundin',
        text: 'Die 4K-Kamera des HydraScan PRO+ zeigt den Hautzustand und empfiehlt danach Behandlung und Heimpflege.',
      },
    ],
  },
  finance: {
    ...financeTexts,
    lead: 'Zinsfreie Ratenzahlung zu 0 % effektivem Jahreszins: 50 % Anzahlung, der Rest in 3 oder 6 Monatsraten. Keine Bearbeitungsgebühr und keine versteckten Kosten.',
  },
  training: {
    titleLines: ['Du lernst es nicht allein.', 'Wir bringen dir alles bei.'],
    text: 'Individuelle Geräteschulung in unserem Showroom: Wir geben dir unsere eigene, bewährte Technik weiter, und auch nach der Schulung kannst du auf unsere fachliche Unterstützung zählen.',
    cta: 'Unsere Schulungen',
  },
  consult,
  faq: {
    title: 'Häufige Fragen',
    lead: 'Die häufigsten Fragen zur Hydrafacial-Behandlung. Wenn du die Antwort nicht findest, frag uns direkt.',
    items: [
      {
        question: 'Was ist der Unterschied zwischen klassischer Gesichtsreinigung und Hydrafacial?',
        answer: 'Hydrafacial arbeitet mit Vakuumtechnologie, die neben der Tiefenreinigung auch eine Serum-Infusion liefert. Schmerzfrei, keine Rötung, die Kundin kann sofort weitermachen. Nach einer klassischen Reinigung ist das Gesicht oft tagelang gerötet.',
      },
      {
        question: 'Wie oft kann eine Hydrafacial-Behandlung durchgeführt werden?',
        answer: 'Zur Erhaltung wird meist alle 4-6 Wochen eine Behandlung empfohlen. Als Kur ist sie zur Verbesserung des Hautzustands auch wöchentlich möglich. Ein sehr schonendes Verfahren.',
      },
      {
        question: 'Ist es für jeden Hauttyp geeignet?',
        answer: 'Ja. Hydrafacial ist eine der schonendsten Gesichtsbehandlungen und auch bei empfindlicher Haut und Rosazea anwendbar. Nur bei aktiver entzündlicher Akne wird sie nicht empfohlen.',
      },
    ],
  },
  visit: {
    title: 'Teste es live in Érd.',
    text: 'Komm in unseren Showroom und sieh dir die Geräte live an, bevor du dich entscheidest.',
    booking: 'Nach vorheriger Terminvereinbarung',
    demoCta: 'Demo anfragen',
  },
};
