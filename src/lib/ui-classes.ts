/**
 * Mobilon (640px alatt) a képek és videók legfeljebb 12px-re vannak a képernyő
 * szélétől (tulajdonosi kérés, 2026-09-19): a tartalom-konténer 16px-es (`px-4`)
 * margójából 4px-lel kilépnek, a szöveg marad 16px-en.
 *
 * Csak `px-4`-es konténerben álló, teljes oszlopszélességű média-elemre tedd
 * (a szélesség a szülő 100%-a + 8px). Tailwind a stringet innen is kiolvassa.
 */
export const MOBILE_MEDIA_BLEED = 'max-sm:-mx-1 max-sm:w-[calc(100%+0.5rem)] max-sm:max-w-none';
