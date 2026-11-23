/**
 * ND:YAG-Laser-Kategorieseite - German copy (translation of ./hu.ts).
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { compareHelp, consult, financeTexts, reviews, visit } from '../common.de';

const models: Record<string, ShowcaseModelCopy> = {
  pixelcarbonlezer: {
    name: 'PIXEL',
    keySpec: '4 Köpfe · 1200 mJ',
    tagline: 'der kompakte Carbon-Laser',
    forWho: 'Kompakter Einstieg, Carbon Peeling',
    desc: 'Gütegeschalteter ND:YAG-Tischlaser mit 4 Behandlungsköpfen (532, 755, 1064 und 1320 nm): Carbon Peeling, Hautbildverbesserung, Pigment- und Tattoo-Aufhellung in einem System. Geschlossene Wasserkühlung, 4,3"-Touchscreen, passt auch auf wenig Platz.',
    when: [
      'du dein Angebot um Carbon Peeling erweitern möchtest',
      'dein Behandlungsraum wenig Platz hat',
      'du mit einer kleineren Investition starten möchtest',
    ],
    compare: {
      waves: '532 + 755 + 1064 + 1320 nm (4 Köpfe)',
      screen: '4,3"-Touchscreen',
      cooling: 'Geschlossenes Wasserkühlsystem',
    },
  },
  frame: {
    name: 'FRAME',
    keySpec: '4 Wellenlängen',
    tagline: 'der Android-Smart-Laser',
    forWho: 'Tattoos, Pigmentflecken, Carbon',
    desc: 'ND:YAG-Laser mit Android, 13,3"-Touchscreen, 4 Wellenlängen und integrierter Handstückkühlung. Für Tattoo- und Pigmentfleckentfernung ebenso wie für Carbon Peeling.',
    when: [
      'du auch Tattooentfernung anbieten möchtest',
      'du mit mehreren Farben arbeiten möchtest',
      'du eine große, übersichtliche Bedienoberfläche möchtest',
    ],
    compare: {
      waves: '4 Wellenlängen',
      screen: '13,3"-Android-Touchscreen',
      cooling: 'Integrierte Handstückkühlung',
    },
  },
};

export const de: ShowcaseCopy = {
  seo: {
    name: 'Gütegeschaltete ND:YAG-Lasergeräte',
    nameShort: 'ND:YAG-Laser',
    description: 'Laser zur Tattoo- und Pigmentfleckentfernung.',
  },
  hero: {
    titleLines: ['ND:YAG-Laser, mit dem', 'Tattoos verschwinden.'],
    lead: 'Tattoo- und Pigmentfleckentfernung sowie Carbon Peeling mit gütegeschalteter Technologie. Wir helfen dir, das passende Gerät für deinen Salon zu finden, schulen dich ein und reparieren es, wenn nötig.',
    imageAlt: 'Carbon-Peeling-Behandlung mit dem PIXEL ND:YAG-Laser, mit Schutzbrille',
  },
  usp: [
    { title: '2 Jahre Vollgarantie', sub: 'auf jedes neue Gerät' },
    { title: 'FAR-zertifizierte Schulung', sub: 'in kleiner Gruppe, mit Modell' },
    { title: 'Eigener Service in Ungarn', sub: 'schnelle Reparatur in Érd' },
    { title: 'Ratenzahlung zu 0 % Zinsen', sub: '50 % Anzahlung + Monatsraten' },
  ],
  models: {
    title: 'Welches passt zu deinem Salon?',
    lead: 'Beide sind gütegeschaltete ND:YAG-Laser. Der Unterschied liegt in der Zahl der Wellenlängen, der Bedienoberfläche und der Kühlung.',
    copy: models,
  },
  reviews,
  compare: {
    title: 'Technischer Vergleich',
    lead: 'Die wichtigsten Unterschiede auf einen Blick',
    labels: ['Preis', 'Wellenlängen', 'Display', 'Handstückkühlung', 'Empfohlen für'],
    help: compareHelp,
  },
  whyBuy: {
    title: 'Warum lohnt sich ein ND:YAG-Laser?',
    lead: 'Was du vor dem Kauf durchdenken solltest.',
    imageAlt: 'PIXEL ND:YAG-Lasergerät im Showroom',
    items: [
      {
        title: 'Auch schwierige Farben',
        text: 'Der gütegeschaltete ND:YAG-Laser behandelt auch grüne und blaue Tattoos, die schwerer zu entfernen sind.',
      },
      {
        title: 'Carbon Peeling',
        text: 'Auch als Hollywood Peeling bekannt: sofortiger Glow, kleinere Poren, ausgeglichenere fettige Haut.',
      },
      {
        title: 'Pigmentfleckbehandlung',
        text: 'Aufhellung von Sonnenflecken, Altersflecken und Permanent Make-up, bei richtiger Wahl der Wellenlänge.',
      },
      {
        title: 'Hohe Marge',
        text: 'Salons können pro Sitzung 15-50 000 Ft für Tattooentfernung und 8-15 000 Ft für Carbon Peeling verlangen.',
      },
    ],
  },
  finance: {
    ...financeTexts,
    lead: 'Zinsfreie Ratenzahlung zu 0 % effektivem Jahreszins: 50 % Anzahlung, der Rest in 3 oder 6 Monatsraten. Keine Bearbeitungsgebühr und keine versteckten Kosten.',
  },
  training: {
    titleLines: ['Du lernst es nicht allein.', 'Wir bringen dir alles bei.'],
    text: 'Anwenderschulung für gütegeschaltete ND:YAG-Laser mit höchstens 4 Teilnehmenden: richtige Wahl von Wellenlängen und Parametern, Carbon Peeling, Entfernung von Permanent Make-up und Pigmentflecken, mit Praxis am Modell. Du erhältst ein FAR-registriertes Zertifikat mit B-Nummer.',
    cta: 'Details zur Schulung',
  },
  consult,
  faq: {
    title: 'Häufige Fragen',
    lead: 'Die häufigsten Fragen zu ND:YAG-Lasern. Wenn du die Antwort nicht findest, frag uns direkt.',
    items: [
      {
        question: 'Welches Gerät soll ich wählen?',
        answer: 'Der PIXEL ist ein kompaktes Einstiegs-Tischgerät mit 4 Behandlungsköpfen (532, 755, 1064 und 1320 nm): Carbon Peeling, Hautbildverbesserung, Pigment- und Tattoo-Aufhellung in einem System. Der FRAME mit 4 Wellenlängen, Android-Touchscreen und integrierter Handstückkühlung deckt Tattoo-, Pigmentfleck- und Carbon-Behandlungen ab.',
      },
      {
        question: 'Wie viele Sitzungen braucht es, um ein Tattoo vollständig zu entfernen?',
        answer: 'Das hängt von Größe, Farbe und Alter des Tattoos ab. Im Durchschnitt sind 6-12 Behandlungen nötig, im Abstand von 6-8 Wochen. Schwarz und dunkle Farben verblassen schneller.',
      },
      {
        question: 'Ist die Tattooentfernung schmerzhaft?',
        answer: 'Mit passender Kühlung ist das Unbehagen mäßig. Viele vergleichen es mit dem Stechen des Tattoos: unangenehm, aber erträglich. Auch eine Betäubungscreme kann verwendet werden.',
      },
      {
        question: 'Was ist Carbon Peeling, und für wen eignet es sich?',
        answer: 'Beim Carbon Peeling trägst du eine Kohlemaske auf das Gesicht auf und entfernst sie mit dem Laser. Es eignet sich für fettige, zu Unreinheiten neigende Haut und vergrößerte Poren. Das Ergebnis ist sofort sichtbar, eine Erholungszeit gibt es nicht.',
      },
    ],
  },
  visit,
};
