/**
 * Körperbehandlungs-Kategorieseite - deutscher Text (Übersetzung von ./hu.ts).
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { compareHelp, consult, financeTexts, reviews, visit } from '../common.de';

const models: Record<string, ShowcaseModelCopy> = {
  'freeze-me-slim': {
    name: 'FREEZE ME SLIM',
    keySpec: '4 Köpfe gleichzeitig',
    tagline: 'das Kryolipolyse-Gerät',
    forWho: 'Gezielte Fettreduktion',
    desc: 'Kryolipolyse (Fettvereisung) mit 4 gleichzeitig nutzbaren Handstücken, gekühlt bis -10 °C. Im Paket ist auch eine Körperanalysewaage mit Bioimpedanz, so verfolgst du den Fortschritt deiner Kundin in Zahlen.',
    when: [
      'du die Behandlung hartnäckiger Fettpolster anbieten möchtest',
      'du mehrere Körperzonen gleichzeitig behandeln möchtest',
      'du das Ergebnis mit Messungen zeigen möchtest',
    ],
    compare: {
      tech: 'Kryolipolyse (Fettvereisung)',
      area: 'Bauch, Taille, Oberschenkel, Po, Arme, Rücken',
    },
  },
  'the-shaper': {
    name: 'THE SHAPER',
    keySpec: '4 Technologien',
    tagline: 'die komplette Körperformung',
    forWho: 'Körperformung, Cellulite, Straffung',
    desc: 'Vier Technologien in einem Gerät: Vakuum-Rollenmassage, Radiofrequenz, 940-nm-Infrarotlaser und 40-kHz-Ultraschallkavitation. Für Gesicht und Körper, mit separaten Applikatoren.',
    when: [
      'du auch Cellulite-Behandlungen anbieten möchtest',
      'du Gesicht und Körper mit einem Gerät behandeln möchtest',
      'du mehrere Technologien an einem Ort möchtest',
    ],
    compare: {
      tech: 'Vakuum + Rolle, RF, IR-Laser, Kavitation',
      area: 'Körper und Gesicht',
    },
  },
};

export const de: ShowcaseCopy = {
  seo: {
    name: 'Geräte zur Körperformung',
    nameShort: 'Körperbehandlung',
    description: 'Kryolipolyse, Konturformung und weitere Geräte zur Körper- und Figurformung.',
  },
  hero: {
    titleLines: ['Ein Körpergerät, mit dem', 'du ohne OP formst.'],
    lead: 'Fettvereisung, Körperformung und Cellulite-Behandlung ohne Schmerzen und ohne Ausfallzeit. Wir helfen dir, das passende Gerät für deinen Salon zu finden, und reparieren es, wenn nötig.',
    imageAlt: 'THE SHAPER Körperbehandlungsgerät',
  },
  usp: [
    { title: '2 Jahre Vollgarantie', sub: 'auf jedes neue Gerät' },
    { title: 'Schulungspaket', sub: 'Lehrmaterial und Protokolle' },
    { title: 'Eigener Service in Ungarn', sub: 'schnelle Reparatur in Érd' },
    { title: 'Ratenzahlung zu 0 % Zinsen', sub: '50 % Anzahlung + Monatsraten' },
  ],
  models: {
    title: 'Welches passt zu deinem Salon?',
    lead: 'Der FREEZE ME SLIM arbeitet gezielt an Fettpolstern, der THE SHAPER mit vier Technologien an der kompletten Körperformung.',
    copy: models,
  },
  reviews,
  compare: {
    title: 'Vergleich',
    lead: 'Die wichtigsten Unterschiede auf einen Blick',
    labels: ['Preis', 'Technologie', 'Handstücke', 'Behandlungszone', 'Empfohlen für'],
    help: compareHelp,
  },
  whyBuy: {
    title: 'Warum lohnt sich ein Bodyforming-Gerät?',
    lead: 'Was du vor dem Kauf durchdenken solltest.',
    imageAlt: 'THE SHAPER Handstück in der Hand',
    items: [
      {
        title: 'Mehrere Technologien, ein Gerät',
        text: 'Der THE SHAPER vereint Vakuum-Rollenmassage, RF, Infrarotlaser und Kavitation, so musst du keine separaten Geräte kaufen.',
      },
      {
        title: 'Mehrere Zonen gleichzeitig',
        text: 'Die vier Handstücke des FREEZE ME SLIM arbeiten gleichzeitig, so behandelst du mehrere Körperzonen parallel.',
      },
      {
        title: 'Kundinnen, die zur Kur kommen',
        text: 'Fettvereisung ist meist eine Kur mit 3, Körperformung mit 6-10 Sitzungen, so kommt die Kundin immer wieder zu dir.',
      },
      {
        title: 'Fertiges Schulungspaket',
        text: 'Lehrmaterial, Behandlungsprotokolle und Infomaterial für Kundinnen gehören zum Gerät, so arbeitest du ab der ersten Kundin fachgerecht.',
      },
    ],
  },
  finance: {
    ...financeTexts,
    lead: 'Zinsfreie Ratenzahlung zu 0 % effektivem Jahreszins: 50 % Anzahlung, der Rest in 3 oder 6 Monatsraten. Keine Bearbeitungsgebühr und keine versteckten Kosten.',
  },
  consult,
  faq: {
    title: 'Häufige Fragen',
    lead: 'Die häufigsten Fragen zu Körperbehandlungsgeräten. Wenn du die Antwort nicht findest, frag uns direkt.',
    items: [
      {
        question: 'Wie funktioniert die Fettvereisung?',
        answer: 'Der FREEZE ME SLIM kühlt die Fettzellen kontrolliert auf bis zu -10 °C. Die Zellen kristallisieren, und der Körper baut sie auf natürlichem Weg nach und nach ab und scheidet sie aus. Das Ergebnis zeigt sich nicht sofort, sondern im Laufe von Wochen.',
      },
      {
        question: 'Wie viele Sitzungen hat eine Kur?',
        answer: 'Bei der Fettvereisung werden 3 Sitzungen im Monatsabstand empfohlen. Mit dem THE SHAPER sind es meist 6-10 Sitzungen, das genaue Protokoll hängt von der behandelten Zone und dem Zustand der Kundin ab.',
      },
      {
        question: 'An welchen Körperstellen kann der THE SHAPER eingesetzt werden?',
        answer: 'An Gesicht und Hals zur Straffung und Faltenreduktion. Am Körper an Bauch, Taille, Hüfte, Po, Oberschenkeln, Oberarmen und Rücken zur Körperformung, Cellulite-Reduktion und Hautstraffung.',
      },
      {
        question: 'Wann ist die Fettvereisung nicht empfohlen?',
        answer: 'Bei Schwangerschaft, Kälteallergie und bestimmten Erkrankungen. Vor der Behandlung muss jede Kundin beurteilt werden, dabei helfen die Kundenkarten und Protokolle aus dem Paket.',
      },
      {
        question: 'Was ist im Preis enthalten?',
        answer: 'Zu beiden Geräten gehören das komplette Schulungspaket (Lehrmaterial, Behandlungsprotokolle, Infomaterial für Kundinnen) und 2 Jahre Garantie, zum FREEZE ME SLIM außerdem das Körperanalysesystem. Ein Praxistraining mit lebenden Modellen ist gegen Aufpreis möglich.',
      },
    ],
  },
  visit,
};
