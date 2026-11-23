/**
 * Anti-Aging-Kategorieseite - deutscher Text (Übersetzung von ./hu.ts).
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { compareHelp, consult, financeTexts, reviews, visit } from '../common.de';

const models: Record<string, ShowcaseModelCopy> = {
  'q2-biopen': {
    name: 'Bio Pen Q2',
    keySpec: 'EMS + LED',
    tagline: 'der mobile Microneedling-Pen',
    forWho: 'Einstieg, mobile Behandlungen',
    desc: 'Kabelloser Microneedling-Pen mit EMS-Elektroporation, blauer/roter LED-Lichttherapie und 7 ausgearbeiteten Behandlungsprogrammen. Mit einer kleinen Investition startest du Microneedling-Hauterneuerung und Wirkstoffeinschleusung.',
    when: [
      'du jetzt Microneedling-Behandlungen einführst',
      'du ihn auch zur Wirkstoffeinschleusung nutzen willst',
      'du auch Hausbesuche anbieten möchtest',
    ],
    compare: {
      tech: 'EMS-Microneedling + LED-Lichttherapie',
      form: 'Kabelloser Hand-Pen',
      extra: 'LED blau 470 nm / rot 630 nm',
      use: 'Gesicht, Augenpartie, Kopfhaut, Körper',
    },
  },
  'aestiq-ai': {
    name: 'AESTIQ AI',
    keySpec: 'Microneedling-RF',
    tagline: 'die lehrende AI-Plattform',
    forWho: 'Premium-Anti-Aging-Service',
    desc: 'Vakuum-Microneedling-RF-System: Das Vakuum stabilisiert die Haut, die Radiofrequenz arbeitet in den tieferen Schichten. Der integrierte AI Educator führt dich Schritt für Schritt, die ANG™-Nadelsteuerung arbeitet mit voreingestellter Tiefe.',
    when: [
      'du Falten-, Narben- und Dehnungsstreifen-Behandlungen anbieten willst',
      'du einen Service mit hohen Behandlungspreisen aufbauen willst',
      'dir das Gerät auch beim Lernen helfen soll',
    ],
    compare: {
      tech: 'Vakuum-Microneedling-RF',
      form: 'Tischplattform',
      extra: 'AI Educator + ANG™-Nadelsteuerung',
      use: 'Feine Linien, erschlaffte Haut, große Poren, Aknenarben, Dehnungsstreifen',
    },
  },
};

export const de: ShowcaseCopy = {
  seo: {
    name: 'Anti-Aging-Geräte',
    nameShort: 'Anti-Aging',
    description: 'Vakuum-Microneedling-RF- und EMS-Microneedling-Geräte zur Hautverjüngung.',
  },
  hero: {
    titleLines: ['Anti-Aging-Geräte', 'für Premium-Behandlungen.'],
    lead: 'Hautstraffung, Falten- und Narbenbehandlung ohne OP, mit Microneedling-RF- oder EMS-Technologie. Wir helfen dir, das passende Gerät für deinen Salon zu finden, und reparieren es, wenn nötig.',
    imageAlt: 'Microneedling-Gesichtsbehandlung mit dem Bio Pen Q2 im Salon',
  },
  usp: [
    { title: '2 Jahre Vollgarantie', sub: 'auf jedes neue Gerät' },
    { title: 'Eigener Service in Ungarn', sub: 'schnelle Reparatur in Érd' },
    { title: 'Ratenzahlung zu 0 % Zinsen', sub: 'für Geräte über 100 000 Ft' },
    { title: 'Persönliche Beratung', sub: 'von den Gründern' },
  ],
  models: {
    title: 'Welches passt zu deinem Salon?',
    lead: 'Ein mobiler Hand-Pen und eine AI-Tischplattform: für andere Zwecke, auf anderem Preisniveau.',
    copy: models,
  },
  reviews,
  compare: {
    title: 'Vergleich',
    lead: 'Die beiden Geräte gehören zu verschiedenen Kategorien, entscheide daher nach dem Einsatzzweck',
    labels: ['Preis', 'Technologie', 'Bauform', 'Extra', 'Anwendung', 'Empfohlen für'],
    help: compareHelp,
  },
  whyBuy: {
    title: 'Warum lohnt sich ein Anti-Aging-Gerät?',
    lead: 'Was du vor dem Kauf durchdenken solltest.',
    imageAlt: 'Bio Pen Q2 Microneedling-Pen',
    items: [
      {
        title: 'Gezielte Straffung',
        text: 'Microneedling-RF bringt die Wärme direkt in die tieferen Hautschichten und strafft so ohne OP.',
      },
      {
        title: 'Keine Ausfallzeit',
        text: 'Nach den meisten Behandlungen kann die Kundin sofort in ihren Alltag zurückkehren.',
      },
      {
        title: 'Wiederkehrende Kundinnen',
        text: 'Kollagen baut sich über Wochen neu auf, deshalb kommen die Kundinnen kurmäßig zu mehreren Terminen.',
      },
      {
        title: 'Premium-Behandlungspreise',
        text: 'Microneedling-RF und Microneedling-Hauterneuerung gehören zu den margenstarken Leistungen im Salon.',
      },
    ],
  },
  finance: {
    ...financeTexts,
    lead: 'Zinsfreie Ratenzahlung zu 0 % effektivem Jahreszins für Geräte über 100 000 Ft: 50 % Anzahlung, der Rest in Monatsraten. Keine Bearbeitungsgebühr und keine versteckten Kosten.',
  },
  consult,
  faq: {
    title: 'Häufige Fragen',
    lead: 'Die häufigsten Fragen zu Anti-Aging-Geräten. Wenn du die Antwort nicht findest, frag uns direkt.',
    items: [
      {
        question: 'Was ist der Unterschied zwischen AESTIQ AI und Bio Pen Q2?',
        answer: 'Der Bio Pen Q2 ist ein kompakter, kabelloser Microneedling-Pen mit EMS-Elektroporation und LED-Lichttherapie. Der AESTIQ AI ist ein Vakuum-Microneedling-RF-System der höheren Kategorie, das Radiofrequenz, Vakuum-Hautstabilisierung, das AI-Educator-System und die ANG™-Nadelsteuerung vereint.',
      },
      {
        question: 'Womit soll ich anfangen, wenn ich jetzt Microneedling einführe?',
        answer: 'Der Bio Pen Q2 ist ein guter Einstieg: kleine Investition, leicht ins bestehende Angebot integrierbar, und in einem einzigen Handgerät bekommst du Microneedling, EMS-Elektroporation und LED-Lichttherapie mit 470/630 nm.',
      },
      {
        question: 'Wann sollte ich eher den AESTIQ AI wählen?',
        answer: 'Wenn du Anti-Aging-, Hautstraffungs-, Narben- oder Texturbehandlungen der höheren Kategorie anbieten willst. Neben den Mikronadeln arbeitet er mit RF-Energie, stabilisiert die Haut per Vakuum, und AI Educator und ANG™ unterstützen auch die Arbeit der Anwenderin.',
      },
      {
        question: 'Ist der Bio Pen Q2 auch ein Radiofrequenzgerät?',
        answer: 'Nein, und das ist ein wichtiger Unterschied. Der Bio Pen Q2 nutzt EMS-Mikrostrom (Elektroporation). Echtes Microneedling-RF steckt im AESTIQ AI.',
      },
      {
        question: 'Wann ist das Ergebnis sichtbar?',
        answer: 'Direkt nach der Behandlung ist eine leichte Straffung spürbar. Bei der Microneedling-RF-Behandlung mit dem AESTIQ AI reift das eigentliche Ergebnis mit der Kollagenneubildung über 3-6 Monate, eine Kur besteht aus 3-4 Sitzungen.',
      },
    ],
  },
  visit,
};
