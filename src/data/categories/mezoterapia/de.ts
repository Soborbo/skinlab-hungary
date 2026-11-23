/**
 * Mesotherapie-Kategorieseite (ein Produkt) - deutscher Text (Übersetzung von ./hu.ts).
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { consultSingle, reviews, visitSingle } from '../common.de';

const models: Record<string, ShowcaseModelCopy> = {
  dermatechplus_noneedle_mesotherapy: {
    name: 'DermaTECH+',
    keySpec: 'nadelfrei, bis 800 kDa',
    tagline: 'die nadelfreie Mesotherapie',
    forWho: 'Wirkstoffeinschleusung, ganzjährig',
    desc: 'Nadelfreies Mesotherapiegerät mit DermoPenetrate-Max-Technologie: Mikrostromimpulse und Präzisionsvibration schleusen den Wirkstoff in die Haut ein, bis zu einer Molekülgröße von 800 kDa, ohne Einstich, Elektrolyse und pH-Veränderung.',
    when: [
      'du eine schmerzfreie Wirkstoffeinschleusung anbieten willst',
      'du auch im Sommer Mesotherapie anbieten willst',
      'du deine eigenen Seren und Ampullen verwenden willst',
    ],
  },
};

export const de: ShowcaseCopy = {
  seo: {
    name: 'Mesotherapie-Geräte',
    nameShort: 'Mesotherapie',
    description: 'Nadelfreie und klassische Mesotherapie-Systeme zur Wirkstoffeinschleusung.',
  },
  hero: {
    titleLines: ['Mesotherapie ohne Nadeln,', 'ohne Schmerzen.'],
    lead: 'Tiefe Wirkstoffeinschleusung ohne Einstich und ohne Ausfallzeit, für jeden Hauttyp, zu jeder Jahreszeit. Wir schulen dich ein und reparieren das Gerät, wenn nötig.',
    imageAlt: 'Nadelfreies DermaTECH+ Mesotherapie-Handstück in der Hand',
  },
  usp: [
    { title: '2 Jahre Vollgarantie', sub: 'auf jedes neue Gerät' },
    { title: 'Eigener Service in Ungarn', sub: 'schnelle Reparatur in Érd' },
    { title: 'Komplette Schulung im Preis', sub: 'wir schulen dich am Gerät ein' },
    { title: 'Persönliche Beratung', sub: 'von den Gründern' },
  ],
  models: {
    title: 'Lerne das DermaTECH+ kennen',
    lead: 'Wirkstoffeinschleusung auf molekularer Ebene, über die natürlichen Wasserkanäle der Haut.',
    copy: models,
  },
  reviews,
  whyBuy: {
    title: 'Warum lohnt sich ein nadelfreies Mesotherapiegerät?',
    lead: 'Was du vor dem Kauf durchdenken solltest.',
    imageAlt: 'Nadelfreies DermaTECH+ Mesotherapiegerät',
    items: [
      {
        title: 'Schmerzfreie Behandlung',
        text: 'Kein Einstich, keine Mikroverletzung, keine Blutung, die Kundin kann nach der Behandlung sofort weitermachen.',
      },
      {
        title: 'Ganzjährig einsetzbar',
        text: 'Da die Haut nicht verletzt wird, wird sie nicht lichtempfindlich, deshalb kannst du auch im Sommer bei starker Sonne damit behandeln.',
      },
      {
        title: 'Auch größere Moleküle',
        text: 'Es schleust Wirkstoffe bis 800 kDa ein: Hyaluronsäure, Peptide, Wachstumsfaktoren.',
      },
      {
        title: 'Gut kalkulierbare Behandlung',
        text: 'Für eine nadelfreie Mesotherapie verlangen Salons typischerweise 10 000-25 000 Ft.',
      },
    ],
  },
  consult: consultSingle,
  faq: {
    title: 'Häufige Fragen',
    lead: 'Die häufigsten Fragen zur nadelfreien Mesotherapie. Wenn du die Antwort nicht findest, frag uns direkt.',
    items: [
      {
        question: 'Was ist die DermoPenetrate-Max-Technologie?',
        answer: 'Sie nutzt Mikrostromimpulse und Präzisionsvibration, um die natürlichen Wasserkanäle der Hautzellen (Aquaporine) vorübergehend zu öffnen. So gelangt der Wirkstoff ohne Nadel auf molekularer Ebene in die Haut.',
      },
      {
        question: 'Ist die Behandlung schmerzhaft?',
        answer: 'Nein. Kein Einstich, keine Mikroverletzung, kein Brennen oder Stechen. Die Kundin bekommt eine angenehme, entspannende Behandlung und kann danach sofort weitermachen.',
      },
      {
        question: 'Mit welchen Wirkstoffen ist es verwendbar?',
        answer: 'Mit fast jedem kosmetischen Serum und jeder Ampulle: Hyaluronsäure, Peptide, Vitamin C, Retinol, Niacinamid, Wachstumsfaktoren, aufhellende und regenerierende Wirkstoffe.',
      },
      {
        question: 'Warum ist es auch im Sommer einsetzbar?',
        answer: 'Weil die Behandlung die Haut nicht verletzt, es gibt keinen Einstich und kein Schälen, daher wird die Haut nicht lichtempfindlich. Anders als die Nadel-Mesotherapie ist sie auch bei starker Sonne sicher anwendbar.',
      },
      {
        question: 'Aus wie vielen Behandlungen besteht eine Kur?',
        answer: 'Eine Kur besteht aus 3-6 Behandlungen, einmal im Monat. Eine Behandlung dauert 25-30 Minuten.',
      },
    ],
  },
  visit: visitSingle,
};
