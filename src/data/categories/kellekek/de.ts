/**
 * Zubehör-Kategorieseite (Katalog-Variante) - deutscher Text (Übersetzung von ./hu.ts).
 */
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { consult, reviews, visit } from '../common.de';

export const de: ShowcaseCopy = {
  seo: {
    name: 'Verbrauchsmaterial und Zubehör',
    nameShort: 'Zubehör',
    description: 'Nadelmodule und Rauchabsauger.',
  },
  hero: {
    titleLines: ['Nadelmodule und Zubehör', 'für die tägliche Arbeit.'],
    lead: 'Sterile Einweg-Nadelmodule für PMU-Geräte und ein Rauchabsauger für das Carbon Peeling. Originalprodukte der Hersteller, mit Lieferung nach Hause oder Abholung vor Ort.',
    imageAlt: 'Faviamo Nadelmodule in der Geschenkbox',
  },
  usp: [
    { title: 'Originalprodukte der Hersteller', sub: 'keine Nachbauten' },
    { title: 'Versand mit Foxpost oder GLS', sub: 'an die Packstation oder nach Hause' },
    { title: 'Abholung in Érd', sub: 'in unserem Showroom' },
    { title: 'Persönliche Beratung', sub: 'von den Gründern' },
  ],
  catalog: {
    title: 'Zubehör',
    lead: 'Nadelmodule und Zubehör für deine Geräte.',
    groups: [
      {
        title: 'Nadelmodule',
        short: 'Nadelmodule',
        subtitle: 'Sterile, einzeln verpackte Einweg-Nadelmodule für PMU-Geräte, in mehreren Größen, als 1RL und 3RL.',
      },
      {
        title: 'Carbon-Peeling-Zubehör',
        short: 'Rauchabsauger',
        subtitle: 'Rauchabsauger für Laser- und Carbon-Peeling-Behandlungen, mit HEPA- und Aktivkohlefilter.',
      },
    ],
  },
  reviews,
  whyBuy: {
    title: 'Warum Zubehör bei uns kaufen?',
    lead: 'Was du vor der Bestellung wissen solltest.',
    imageAlt: 'Faviamo Nadelmodule in ihrer Box',
    items: [
      {
        title: 'Original-Nadelmodule',
        text: 'Mast Oceanheart und Faviamo, Originalprodukte der Hersteller, keine Nachbauten.',
      },
      {
        title: 'Steril, für den Einmalgebrauch',
        text: 'Die Nadelmodule sind einzeln und steril verpackt, so öffnest du für jede Kundin ein neues.',
      },
      {
        title: 'Bequeme Lieferung',
        text: 'An eine Foxpost-Packstation oder mit GLS nach Hause, oder persönlich in unserem Showroom in Érd.',
      },
      {
        title: 'Wir helfen bei der Auswahl',
        text: 'Wenn du nicht weißt, welche Nadelgröße zu deiner Technik passt, frag uns.',
      },
    ],
  },
  consult: {
    ...consult,
    title: 'Du weißt nicht, welches Nadelmodul du brauchst?',
    needs: [
      'Du weißt nicht, welche Größe du brauchst',
      'Du hast eine Frage zur Kompatibilität',
      'Du möchtest genaue Infos zu einem Produkt',
      'Du brauchst einfach einen guten Rat',
    ],
  },
  faq: {
    title: 'Häufige Fragen',
    lead: 'Die häufigsten Fragen zum Zubehör. Wenn du die Antwort nicht findest, frag uns direkt.',
    items: [
      {
        question: 'Welche Nadelmodule führt ihr?',
        answer: 'Nadelmodule von Mast Oceanheart und Faviamo, mit Nadelstärken von 0,18 bis 0,35 mm, als 1RL und 3RL. Die verfügbaren Größen wählst du auf der Produktseite aus.',
      },
      {
        question: 'Wofür ist der Rauchabsauger?',
        answer: 'Er saugt den Rauch ab, der bei Laser- und Carbon-Peeling-Behandlungen entsteht. Er arbeitet mit HEPA- und Aktivkohlefilter und hat eine eingebaute LED-Beleuchtung.',
      },
      {
        question: 'Wie bekomme ich meine Bestellung?',
        answer: 'Wir schicken sie an eine Foxpost-Packstation oder mit GLS nach Hause, du kannst sie aber auch persönlich in unserem Showroom in Érd abholen.',
      },
    ],
  },
  visit: {
    ...visit,
    title: 'Hol sie persönlich in Érd ab.',
    text: 'Du kannst deine Bestellung in unserem Showroom abholen, und wenn du Fragen hast, helfen wir dir direkt vor Ort.',
    demoCta: 'Termin anfragen',
  },
};
