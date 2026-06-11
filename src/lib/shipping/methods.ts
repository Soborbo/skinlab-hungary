/**
 * Szállítási logika - EGYETLEN FORRÁS (kliens + szerver közösen importálja).
 *
 * Kétszintű politika a kosár tartalma alapján, tételenkénti 500 000 Ft-os határral:
 *
 *  - "Kellék" ág  → ha MINDEN tétel árazott ÉS < 500 000 Ft:
 *      Foxpost automata (1 490 Ft) · MPL házhozszállítás (3 490 Ft) · személyes átvétel (ingyenes)
 *  - "Nagy értékű" ág → ha BÁRMELY tétel ≥ 500 000 Ft vagy ár egyeztetés alatt (null):
 *      nincs automatizált futár; személyes átvétel/ceremónia vagy egyeztetett kiszállítás
 *
 * A díjat és a választható módokat a SZERVER (`/api/order`) mindig újraszámolja a
 * termék-kollekcióból vett árakból - a kliens értéke csak tájékoztató.
 */

/**
 * Tételenkénti értékhatár (bruttó Ft): efölött nagy értékű gép, nincs futár.
 * (Hosszabb távon a csomag mérete dönt majd, nem az ár - egyelőre ár-alapú.)
 */
export const SHIPPING_THRESHOLD = 500_000;

export type ShippingMethodId = 'foxpost' | 'mpl' | 'personal_pickup' | 'arranged';

export interface ShippingMethodDef {
  id: ShippingMethodId;
  /** Bruttó szállítási díj Ft-ban. */
  fee: number;
  /** Igaz, ha a módhoz kötelező Foxpost automatát választani. */
  requiresPoint: boolean;
}

export const SHIPPING_METHODS: Record<ShippingMethodId, ShippingMethodDef> = {
  foxpost: { id: 'foxpost', fee: 1490, requiresPoint: true },
  mpl: { id: 'mpl', fee: 3490, requiresPoint: false },
  personal_pickup: { id: 'personal_pickup', fee: 0, requiresPoint: false },
  arranged: { id: 'arranged', fee: 0, requiresPoint: false },
};

export const SHIPPING_METHOD_IDS = Object.keys(SHIPPING_METHODS) as ShippingMethodId[];

/** A pénztárban kiválasztott Foxpost átvevő automata adatai. */
export interface FoxpostPoint {
  /** Foxpost place_id / operator_id. */
  id: string;
  name: string;
  zip: string;
  city: string;
  address: string;
}

/**
 * Szállítható-e a kosár futárral?
 * Igaz, ha legalább egy tétel van, MINDEN tétel ára szám (nincs "ár egyeztetés
 * alatt"), és MINDEGYIK a 500 000 Ft-os határ alatt van.
 */
export function isCartShippable(items: ReadonlyArray<{ price: number | null }>): boolean {
  if (items.length === 0) return false;
  return items.every((i) => typeof i.price === 'number' && i.price < SHIPPING_THRESHOLD);
}

/** Fix szállítási díj a módból (szerveroldali újraszámoláshoz). */
export function shippingFeeFor(method: ShippingMethodId): number {
  return SHIPPING_METHODS[method]?.fee ?? 0;
}

/**
 * Az automatikus futáros szállítás (Foxpost/MPL) CSAK magyar nyelvű
 * rendelésnél érhető el. Minden más nyelven kizárólag egyeztetett ("visszahívós")
 * szállítás van - a Foxpost/MPL magyar szolgáltatások.
 */
export const PARCEL_LOCALE = 'hu';
export function isParcelLocale(locale: string): boolean {
  return locale === PARCEL_LOCALE;
}

/**
 * A kosár futárral szállítható-e ÉS magyar nyelvű-e (kellék-ág / "parcel tier").
 * Csak ekkor kínálunk Foxpost/MPL opciót és önkiszolgáló (díjbekérő/utánvét) flow-t.
 */
export function isParcelTier(items: ReadonlyArray<{ price: number | null }>, locale: string): boolean {
  return isParcelLocale(locale) && isCartShippable(items);
}

/** A kosár ágához + nyelvhez engedélyezett szállítási módok. */
export function allowedMethods(shippable: boolean, locale: string): ShippingMethodId[] {
  if (!isParcelLocale(locale)) return ['personal_pickup', 'arranged'];
  return shippable ? ['foxpost', 'mpl', 'personal_pickup'] : ['personal_pickup', 'arranged'];
}

/** A mód érvényes-e az adott kosár-ágban + nyelven? (szerveroldali ellenőrzés) */
export function isMethodAllowed(method: ShippingMethodId, shippable: boolean, locale: string): boolean {
  return allowedMethods(shippable, locale).includes(method);
}

// ============================================
// FIZETÉSI MÓD (csak a kellék-ág / parcel tier)
// ============================================

export type PaymentMethodId = 'transfer' | 'cod';

/** Utánvét (cod) csak a kellék-ágon választható; egyébként előreutalás/díjbekérő. */
export const PAYMENT_METHOD_IDS: PaymentMethodId[] = ['transfer', 'cod'];

/** Magyar fizetési-mód címkék (admin e-mail, Sheets). */
export const PAYMENT_LABEL_HU: Record<PaymentMethodId, string> = {
  transfer: 'Előreutalás / bankkártya (díjbekérő e-mailben)',
  cod: 'Utánvét (fizetés átvételkor)',
};

/**
 * Magyar címkék a szerveroldali, mindig magyar nyelvű kontextusokhoz
 * (admin e-mail, Google Sheets, Billingo díjbekérő). A vevői e-mail és a
 * pénztár UI az i18n kulcsokat használja.
 */
export const SHIPPING_LABEL_HU: Record<ShippingMethodId, string> = {
  foxpost: 'Foxpost csomagautomata',
  mpl: 'MPL házhozszállítás (következő munkanapos kézbesítés)',
  personal_pickup: 'Személyes átvétel – Skinlab Showroom (Érd)',
  arranged: 'Kiszállítás személyes egyeztetés alapján',
};

/**
 * Foxpost térképes csomagautomata-választó widget (apt-finder).
 * A vásárló iframe-ben választ automatát; a kiválasztást `postMessage`-dzsel
 * adja vissza. Nem igényel API-kulcsot. Ha a Foxpost a jövőben átteszi a
 * widgetet, csak ezt a konstanst kell frissíteni.
 * Dok.: https://cdn.foxpost.hu/apt-finder/v1/documentation/
 */
export const FOXPOST_WIDGET_URL = 'https://cdn.foxpost.hu/apt-finder/v1/index.html';

/** A Foxpost widget `postMessage` üzeneteit elfogadó origin-ek. */
export const FOXPOST_WIDGET_ORIGINS = ['https://cdn.foxpost.hu', 'https://foxpost.hu'];
