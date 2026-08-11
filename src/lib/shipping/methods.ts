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

// ============================================
// STRUKTURÁLT SZÁLLÍTÁSI ADAT (schema.org + Merchant Center feed)
// ============================================

/**
 * Feldolgozási idő (munkanap) a rendelés leadása és a futárnak átadás között.
 *
 * A handling + transit összege a szállítási oldalon ígért "jellemzően 1-4
 * munkanap" sávba kell essen (i18n: `shipping.parcelIntro`), különben a
 * strukturált adat mást mond, mint az oldal szövege.
 */
export const HANDLING_DAYS = { min: 1, max: 2 } as const;

/** Kézbesítési idő (munkanap) a feladástól, futáros módonként. */
export const TRANSIT_DAYS: Record<'foxpost' | 'mpl', { min: number; max: number }> = {
  foxpost: { min: 1, max: 2 },
  // "következő munkanapos kézbesítés" - lásd SHIPPING_LABEL_HU.mpl
  mpl: { min: 1, max: 1 },
};

export interface CourierOption {
  id: 'foxpost' | 'mpl';
  fee: number;
  handling: { min: number; max: number };
  transit: { min: number; max: number };
}

/**
 * Egy TERMÉK futáros szállítási opciói az ára alapján.
 *
 * A kosárszintű `isCartShippable()` termékszintű megfelelője: egyetlen tétel
 * ára dönt. Üres tömb = nincs automatizált futár (nagy értékű gép vagy "ár
 * egyeztetés alatt"), ilyenkor személyes átvétel / egyeztetett kiszállítás van.
 *
 * A termékoldal JSON-LD-je és a Merchant Center feed EBBŐL a függvényből
 * dolgozik, hogy a strukturált adat ne mondhasson mást, mint a pénztár.
 */
export function courierOptionsForPrice(price: number | null | undefined): CourierOption[] {
  if (typeof price !== 'number' || price >= SHIPPING_THRESHOLD) return [];
  return (['foxpost', 'mpl'] as const).map((id) => ({
    id,
    fee: SHIPPING_METHODS[id].fee,
    handling: { ...HANDLING_DAYS },
    transit: { ...TRANSIT_DAYS[id] },
  }));
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
  transfer: 'Előre utalás (díjbekérő e-mailben)',
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
 * Foxpost térképes csomagautomata-választó widget (apt-finder v3).
 * A vásárló iframe-ben választ automatát; a kiválasztást `postMessage`-dzsel
 * adja vissza (origin: cdn.foxpost.hu, formátum: { place_id, name, zip, city,
 * address, ... } — azonos a v1-gyel). Nem igényel API-kulcsot.
 *
 * v1 → v3 (2026-06): a v1 "app" 1024px alatt egy törött kinézetű mobil
 * alsó-lap (piros sáv) elrendezésre váltott, és sok helyet pazarolt egy nagy
 * címsorral + jelmagyarázattal. A v3 kompakt, "térkép-először" elrendezés egy
 * kereső + "Lista nézet" kapcsolóval; nincs töréspont-szakadás, mobilon is
 * használható. A kiválasztó üzenet formátuma változatlan, így a handler nem
 * igényel módosítást.
 */
export const FOXPOST_WIDGET_URL = 'https://cdn.foxpost.hu/apt-finder-v3/app/?lang=hu';

/** A Foxpost widget `postMessage` üzeneteit elfogadó origin-ek. */
export const FOXPOST_WIDGET_ORIGINS = ['https://cdn.foxpost.hu', 'https://foxpost.hu'];
