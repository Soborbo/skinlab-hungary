/**
 * Telefonszám normalizálás kanonikus E.164 alakra (pl. "+36301234567").
 *
 * A Skinlab leadek többsége magyar, ezért Magyarország az alapértelmezett
 * ország. A leggyakoribb beírási formákat kezeli:
 *   "+36 30 123 4567" · "0036 30 …" · "06 30 …" · "30 123 4567"
 * illetve a már országkódot tartalmazó külföldi számokat (pl. UK "44…").
 *
 * A kimenet mindig csak "+" és számjegyek (szóköz / kötőjel / zárójel
 * nélkül), így egységes a Google Sheets, az e-mailek `tel:` linkjei és a
 * CRM számára. Üres / értelmezhetetlen bemenetre üres stringet ad vissza.
 */
export function normalizePhone(raw: string | null | undefined): string {
  if (raw == null) return '';
  const trimmed = String(raw).trim();
  if (!trimmed) return '';

  const hadPlus = trimmed.startsWith('+');
  const digits = trimmed.replace(/\D/g, '');
  if (!digits) return '';

  // Már explicit "+" országkód → csak a számjegyeket tartjuk meg.
  if (hadPlus) return '+' + digits;
  // Nemzetközi "00" előtag → "+".
  if (digits.startsWith('00')) return '+' + digits.slice(2);
  // Magyar "06" trönk-előtag → "+36".
  if (digits.startsWith('06')) return '+36' + digits.slice(2);
  // "36…" országkód "+" nélkül (legalább 11 számjegy: 36 + 9 nemzeti).
  if (digits.startsWith('36') && digits.length >= 11) return '+' + digits;
  // Csupasz magyar nemzeti szám (max 9 számjegy, pl. "30 123 4567") → "+36".
  if (digits.length <= 9) return '+36' + digits;
  // Egyébként feltételezzük, hogy már tartalmaz országkódot.
  return '+' + digits;
}
