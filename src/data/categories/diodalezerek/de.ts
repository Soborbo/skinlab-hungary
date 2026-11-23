/**
 * Diodenlaser-Kategorieseite - deutscher Text (Übersetzung von ./hu.ts).
 * Preise, Leistung, Specs und Bilder kommen aus den Produkt-JSONs.
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { compareHelp, consult, financeTexts, reviews } from '../common.de';

const models: Record<string, ShowcaseModelCopy> = {
  athena: {
    tagline: 'Kontrolle und Präzision',
    forWho: 'Einstieg / Zusatzleistung',
    desc: 'Intelligente Software, die Einstellungen nach Haut- und Haartyp empfiehlt. Ein stabiles, berechenbares Gerät für alle, die mit der Haarentfernung starten oder sie ergänzen.',
    when: [
      'du ein kostengünstiges, aber professionelles Einstiegsgerät suchst',
      'die Haarentfernung eine Zusatzleistung wird',
      'dir Berechenbarkeit wichtiger ist als Tempo',
    ],
  },
  olympia: {
    tagline: 'die Siegerleistung',
    forWho: 'Tempo mit Kontrolle',
    desc: '1200W Ausgangsleistung und 5 einstellbare Spotgrößen: präzises Arbeiten auf kleinen Flächen, schnelles Vorankommen auf großen.',
    when: [
      'du ein starkes Gerät zu einem realistischen Preis suchst',
      'du schneller behandeln willst, aber mit Kontrolle',
      'du viele verschiedene Kundinnen und Körperzonen hast',
    ],
  },
  helios: {
    tagline: 'die wahre Kraft des Lichts',
    forWho: 'Klinik, hohe Auslastung',
    desc: 'Unser stärkstes Modell: 1600W, tiefere Wirkung, kürzere Behandlungszeit. Für Salons und Kliniken mit hoher Auslastung.',
    when: [
      'du täglich viele Kundinnen zur Haarentfernung hast',
      'du mit kürzeren Behandlungen mehr Termine vergeben willst',
      'du die Oberklasse suchst',
    ],
  },
  empire: {
    tagline: 'das intelligente System',
    forWho: 'Diagnostik + Kundenkartei',
    desc: 'Haar- und Hautdiagnostik per Mikrokamera, digitale Kundenkartei mit Vorher-nachher-Fotos, und das Gerät empfiehlt die Parameter.',
    when: [
      'du die Behandlungen dokumentieren willst',
      'du die Einstellungen auf eine Analyse stützen willst',
      'du mit geschichteten Impulsen (SHR STACK) arbeiten willst',
    ],
  },
};

export const de: ShowcaseCopy = {
  seo: {
    name: 'Professionelle Diodenlaser',
    nameShort: 'Diodenlaser',
    description: 'Professionelle Diodenlaser mit 4 Wellenlängen zur dauerhaften Haarentfernung.',
  },
  hero: {
    titleLines: ['Ein Diodenlaser, der', 'Kundinnen zurückbringt.'],
    lead: 'Dauerhafte Haarentfernung mit 4-Wellenlängen-Technologie, für alle Haut- und Haartypen. Wir helfen dir, das passende Gerät für deinen Salon zu finden, schulen dich ein und reparieren es, wenn nötig.',
    imageAlt: 'Haarentfernung mit dem OLYMPIA Diodenlaser im Salon',
  },
  usp: [
    { title: '2 Jahre Vollgarantie', sub: 'auf jedes neue Gerät' },
    { title: '8 Stunden Einschulung vor Ort', sub: '+ 6 Monate Nachbetreuung' },
    { title: 'Eigener Service in Ungarn', sub: 'schnelle Reparatur in Érd' },
    { title: 'Ratenzahlung zu 0 % Zinsen', sub: '50 % Anzahlung + Monatsraten' },
  ],
  models: {
    title: 'Welcher passt zu deinem Salon?',
    lead: 'Alle vier arbeiten mit 4 Wellenlängen. Der Unterschied liegt im Tempo, im Behandlungsmodus und darin, wie viel du dokumentierst.',
    copy: models,
  },
  reviews,
  compare: {
    title: 'Technischer Vergleich',
    lead: 'Die wichtigsten Parameter auf einen Blick',
    labels: ['Preis', 'Leistung', 'Wellenlängen', 'Spotgröße', 'Kühlung', 'Empfohlen für'],
    help: compareHelp,
  },
  whyBuy: {
    title: 'Warum lohnt sich ein Diodenlaser?',
    lead: 'Was du vor dem Kauf durchdenken solltest.',
    imageAlt: 'Handstück des OLYMPIA Diodenlasers während der Behandlung',
    items: [
      {
        title: 'Schnelle Amortisation',
        text: 'Mit ca. 3-4 Kundinnen pro Arbeitstag, 12 000 Ft Behandlungspreis und 2 000 Ft Kosten pro Behandlung bleiben monatlich 600 000-800 000 Ft Deckungsbeitrag. So kann sich das Gerät in ca. 3,3-3,7 Monaten amortisieren. Beispielrechnung, kein finanzielles Versprechen.',
      },
      {
        title: 'Wiederkehrende Kundinnen',
        text: 'Kundinnen buchen eine Kur mit 6-8 Sitzungen und kommen danach jährlich zur Auffrischung.',
      },
      {
        title: 'Wirksamer als IPL',
        text: 'Gezielter, wirkt tiefer, braucht weniger Sitzungen. Die Kundin sieht schneller Ergebnisse.',
      },
      {
        title: 'Für jeden Hauttyp',
        text: 'Die 4 Wellenlängen wirken auf heller und dunkler Haut, bei feinem und dickem Haar.',
      },
    ],
  },
  finance: {
    ...financeTexts,
    lead: 'Zinsfreie Ratenzahlung zu 0 % effektivem Jahreszins: 50 % Anzahlung, der Rest in 3, 6 oder 12 Monatsraten. Keine Bearbeitungsgebühr und keine versteckten Kosten.',
  },
  training: {
    titleLines: ['Du lernst es nicht allein.', 'Wir bringen dir alles bei.'],
    text: '8 Stunden Einschulung vor Ort in deinem eigenen Salon, danach 6 Monate Nachbetreuung. FAR-zertifizierte Geräteschulung mit offiziellem Zertifikat.',
    cta: 'Unsere Schulungen',
  },
  consult,
  faq: {
    title: 'Häufige Fragen',
    lead: 'Die häufigsten Fragen zu Diodenlasern. Wenn du die Antwort nicht findest, frag uns direkt.',
    items: [
      {
        question: 'Was ist der Unterschied zwischen Geräten mit 1, 3 und 4 Wellenlängen?',
        answer: '1 Wellenlänge (808 nm) ist der Klassiker für helle bis mittlere Haut. 3 Wellenlängen behandeln auch dunklere Haut und feineres Haar. 4 Wellenlängen (755 + 808 + 940 + 1064 nm) sind am vielseitigsten und auch bei hellem Haar wirksamer.',
      },
      {
        question: 'Warum ist die Leistung (Watt) wichtig?',
        answer: 'Mehr Leistung = schnellere Behandlung, mehr Kundinnen pro Tag. Für Salons mit hoher Auslastung empfehlen wir über 1000W.',
      },
      {
        question: 'Tut die Behandlung mit dem Diodenlaser weh?',
        answer: 'Die Saphir-Hautkühlung macht sie nahezu schmerzfrei, die meisten Kundinnen spüren nur eine leichte Wärme.',
      },
      {
        question: 'Wie lange dauert eine Behandlung?',
        answer: 'Achseln 5-10 Minuten, Beine 20-40 Minuten, Ganzkörper 60-90 Minuten, je nach Gerät.',
      },
    ],
  },
  visit: {
    title: 'Probier alle in Érd aus.',
    text: 'Komm in unseren Showroom und teste alle vier Diodenlaser live, bevor du dich entscheidest.',
    booking: 'Nach vorheriger Terminvereinbarung',
    demoCta: 'Demo anfragen',
  },
};
