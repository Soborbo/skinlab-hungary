/**
 * Gemeinsame deutsche Textblöcke der Kategorieseiten (Gegenstück zu
 * common.hu.ts, gleiche Exportnamen). Eine Kategorie kann sie in <slug>/de.ts überschreiben.
 */
import type { ShowcaseCopy } from '@/lib/types/category-showcase';

export const reviews: NonNullable<ShowcaseCopy['reviews']> = { title: 'Die schon mit uns arbeiten' };

export const compareHelp: NonNullable<ShowcaseCopy['compare']>['help'] = {
  title: 'Du kannst dich nicht entscheiden? Wir helfen dir bei der Auswahl.',
  text: 'László und Szimonetta, die Mitgründer von Skinlab, beraten dich persönlich.',
};

export const financeTexts: Pick<NonNullable<ShowcaseCopy['finance']>, 'title' | 'perks' | 'cta'> = {
  title: 'Du musst nicht alles auf einmal bezahlen.',
  perks: ['0 % effektiver Jahreszins', 'Keine Bearbeitungsgebühr', 'Keine versteckten Kosten'],
  cta: 'Ich möchte ein genaues Angebot',
};

export const consult: ShowcaseCopy['consult'] = {
  title: 'Du weißt nicht, welches Gerät zu dir passt?',
  text: 'Was auch immer auf dich zutrifft, wir helfen dir gern. Ruf uns an oder fordere eine kostenlose Beratung an, und wir melden uns bei dir.',
  needs: [
    'Du kannst dich nicht entscheiden',
    'Du möchtest genaue Infos zu den Geräten',
    'Du möchtest die Details des Kaufs besprechen',
    'Du brauchst einfach einen guten Rat',
  ],
  note: 'Wir rufen in der Regel innerhalb von 1 Werktag zurück.',
};

/** Für Kategorien mit einem Produkt: nicht „welches Gerät“, sondern „dieses Gerät“. */
export const consultSingle: ShowcaseCopy['consult'] = {
  ...consult,
  title: 'Hast du eine Frage zum Gerät?',
  needs: [
    'Du möchtest wissen, ob es zu deinem Salon passt',
    'Du möchtest genaue Infos zum Gerät',
    'Du möchtest die Details des Kaufs besprechen',
    'Du brauchst einfach einen guten Rat',
  ],
};

export const visit: ShowcaseCopy['visit'] = {
  title: 'Sieh es dir in Érd an.',
  text: 'Komm in unseren Showroom, und wir zeigen dir die Geräte. Vereinbare vorher einen Termin, damit das gewünschte Gerät sicher vor Ort ist.',
  booking: 'Nach vorheriger Terminvereinbarung',
  demoCta: 'Demo anfragen',
};

export const visitSingle: ShowcaseCopy['visit'] = {
  ...visit,
  text: 'Komm in unseren Showroom, und wir zeigen dir das Gerät live. Vereinbare vorher einen Termin, damit es sicher vor Ort ist.',
};
