/**
 * Kategorieseite Behandlungsprodukte (Katalog-Variante) - deutscher Text (Übersetzung von ./hu.ts).
 * Keine Geräteversprechen (Garantie, Schulung, Service) und keine Lieferfrist.
 */
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { consult, reviews, visit } from '../common.de';

export const de: ShowcaseCopy = {
  seo: {
    name: "M'ONDUNIQ professionelle Kosmetik",
    nameShort: "M'ONDUNIQ",
    description: "M'ONDUNIQ professionelle Behandlungsprodukte: Hydra-Liquids, Wirkstoffcocktails und Exosomen-Präparate.",
  },
  hero: {
    titleLines: ["M'ONDUNIQ Pflegeprodukte", 'für deine Geräte.'],
    lead: 'Hydra-Liquids für das Aqua-Peeling, Wirkstoffcocktails, Exosomen-Präparate und das komplette LaserIQ-Carbon-Peeling-Protokoll. Als offizieller Vertriebspartner liefern wir Originalprodukte.',
    imageAlt: "M'ONDUNIQ AquametiQ Acid Prime Behandlungsflüssigkeit auf einer Steinplatte mit grünem Zweig",
  },
  usp: [
    { title: 'Originale, offizielle Produkte', sub: 'vom offiziellen Vertriebspartner' },
    { title: 'Versand mit Foxpost oder GLS', sub: 'an die Packstation oder nach Hause' },
    { title: 'Abholung in Érd', sub: 'in unserem Showroom' },
    { title: 'Komplette Protokolle', sub: 'von der Vorbereitung bis zur Heimpflege' },
  ],
  catalog: {
    title: 'Behandlungsprodukte nach Protokoll',
    lead: 'Nach Produktlinie, in der Reihenfolge der Behandlungsschritte, damit du siehst, was dir für deine Arbeit noch fehlt.',
    groups: [
      {
        title: "M'ONDUNIQ LaserIQ: Carbon-Peeling- und Laserprotokoll",
        short: 'LaserIQ-Protokoll',
        subtitle: 'Für alle unsere Nd:YAG-Laser (PIXEL, MOSAIC, THE FRAME), in der Reihenfolge des Behandlungsprotokolls: Hautvorbereitung, die Carbon-Peeling-Behandlung, die sofortige Regeneration und schließlich die Pflege für zu Hause.',
      },
      {
        title: 'AquametiQ Hydra-Liquids: Behandlungsflüssigkeiten für das Aqua-Peeling',
        short: 'AquametiQ Liquids',
        subtitle: 'Wirkstoffhaltige Behandlungsflüssigkeiten zum Befüllen von Hydrodermabrasions- und Aqua-Peeling-Geräten. Vier Varianten: saure Vorbereitung, feuchtigkeitsspendend, aufhellend und osmotisches Spülwasser.',
      },
      {
        title: 'Wirkstoffcocktails, Seren und Masken',
        short: 'Cocktails, Seren',
        subtitle: 'Für Microneedling-Mesotherapie, Nano-Behandlungen, Elektroporation, Sauerstoffinfusion und Kaltplasma-Protokolle.',
      },
      {
        title: 'Säurepeeling und Anti-Aging-Gesichtspflege',
        short: 'Anti-Aging-Pflege',
        subtitle: "Das 10%ige Phytinsäure-Konzentrat für das Peeling in der Kabine; das HI'FUsion Longevity Serum und die Creme, die LEPIREV™ Augenpflege, die verjüngende Vitamino'MASK Gesichtsmaske und die HI'FUsion Bio-Cell Tuchmaske, um die Haut mit Feuchtigkeit zu versorgen und die Sichtbarkeit von Falten zu mindern.",
      },
    ],
  },
  reviews,
  whyBuy: {
    title: 'Warum Behandlungsprodukte bei uns kaufen?',
    lead: 'Was du vor der Bestellung wissen solltest.',
    imageAlt: "M'ONDUNIQ HI'FUsion Longevity Serum und Gesichtscreme auf dem Salontresen, im Hintergrund ein Gesichtsbehandlungsgerät",
    items: [
      {
        title: 'Originale, offizielle Produkte',
        text: 'Als offizieller Vertriebspartner beziehen wir die Produkte direkt vom Hersteller.',
      },
      {
        title: 'Komplette Protokolle statt Einzelartikel',
        text: 'Von der Hautvorbereitung bis zur Pflege zu Hause gibt es für jeden Schritt ein Präparat, in einem aufeinander aufbauenden System.',
      },
      {
        title: 'Auf deine Geräte abgestimmt',
        text: 'Carbon Peeling, Hydrodermabrasion, Microneedling, Kaltplasma, Mesotherapie: alle Behandlungsprodukte an einem Ort.',
      },
      {
        title: 'Bequeme Lieferung',
        text: 'An eine Foxpost-Packstation oder mit GLS nach Hause, oder persönlich in unserem Showroom in Érd.',
      },
    ],
  },
  consult: {
    ...consult,
    title: 'Du weißt nicht, welches Behandlungsprodukt du brauchst?',
    needs: [
      'Du weißt nicht, welches zu deinem Gerät passt',
      'Du möchtest ein Protokoll zusammenstellen',
      'Du hast eine Frage zu einem Produkt',
      'Du brauchst einfach einen guten Rat',
    ],
  },
  faq: {
    title: 'Häufige Fragen',
    lead: 'Die häufigsten Fragen zu Behandlungsprodukten. Wenn du die Antwort nicht findest, frag uns direkt.',
    items: [
      {
        question: 'Welches Behandlungsprodukt passt zu meinem Gerät?',
        answer: 'Für Carbon Peeling und Nd:YAG-Laser die LaserIQ-Linie, für Hydrodermabrasions- und Aqua-Peeling-Geräte die AquametiQ Hydra-Liquids. Die Wirkstoffcocktails sind für Microneedling, Mesotherapie, Elektroporation, Sauerstoff- und Kaltplasma-Behandlungen gemacht.',
      },
      {
        question: 'Wie bekomme ich meine Bestellung?',
        answer: 'Wir schicken sie an eine Foxpost-Packstation oder mit GLS nach Hause, du kannst sie aber auch persönlich in unserem Showroom in Érd abholen.',
      },
      {
        question: 'Sind die Produkte original?',
        answer: "Ja. Als offizieller Vertriebspartner von M'ONDUNIQ beziehen wir die Produkte direkt vom Hersteller.",
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
