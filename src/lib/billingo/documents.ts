/**
 * Díjbekérő (proforma) létrehozás és kiküldés.
 *
 * - Tételenként bruttó egységár, fix 27% ÁFA (felhasználói döntés szerint).
 * - 8 nap fizetési határidő.
 * - `payment_method: 'online_bankcard'` — Billingo-ban beállított SimplePay
 *   integráció így kínálja fel a kártyás fizetés gombot a vevőnek.
 * - Hozzáfűzi a rendelésszámot a `comment` mezőbe és minden tételhez
 *   `item_comment`-ben a SKU-t, hogy a vevő utánakövethesse.
 */
import type { OrderEmailInput, OrderEmailItem } from '@/lib/order/email';
import type {
  BillingoDocumentCreate,
  BillingoDocumentItem,
  BillingoDocumentResponse,
  BillingoLanguage,
  BillingoSendPayload,
} from './types';
import { BillingoApiError, executeBillingoRequest, type BillingoConfig } from './client';
import { isEuCountry, resolveCountryCode } from './partners';
import type { BillingoVat } from './types';

const PROFORMA_DUE_DAYS = 8;
const DEFAULT_UNIT = 'db';

/**
 * Order-szintű ÁFA kulcs eldöntése a számlázási ország + adószám alapján.
 *
 *   HU                            → '27%'   (belföldi)
 *   EU-tag + van adószám (B2B)    → 'EU'    (reverse charge / fordított adózás)
 *   EU-tag B2C                    → '27%'   (HU OSS-szabály — a 10k EUR küszöb alatt
 *                                            HU ÁFA; nagyobb forgalomnál külön rendezni!)
 *   EU-n kívüli (CH, GB, NO …)    → 'EUK'   (Európán/EU-n kívüli export)
 *   Ismeretlen ország             → '27%'   (konzervatív; jobb HU ÁFA-t fizetni, mint
 *                                            csendben rosszul számlázni)
 */
export function resolveVatCode(country: string, taxNumber: string | undefined): BillingoVat {
  const cc = resolveCountryCode(country);
  if (!cc) return '27%';
  if (cc === 'HU') return '27%';
  const hasTaxNumber = !!(taxNumber && taxNumber.trim() !== '');
  if (isEuCountry(cc)) {
    return hasTaxNumber ? 'EU' : '27%';
  }
  return 'EUK';
}
function isoDate(date: Date): string {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function addDaysIso(base: Date, days: number): string {
  const target = new Date(base.getTime());
  target.setUTCDate(target.getUTCDate() + days);
  return isoDate(target);
}

/**
 * Order tétel → Billingo bizonylat tétel.
 *
 * Dob, ha bármelyik tétel egységára null (ár egyeztetés alatt) — a hívó
 * (generateProforma) ezt a `hasPriceOnRequest` flaggel előzetesen kiszűri.
 */
function mapItem(orderItem: OrderEmailItem, orderId: string, vat: BillingoVat): BillingoDocumentItem {
  if (orderItem.unitPrice === null) {
    throw new BillingoApiError({
      code: 'BILLINGO-MAP-001',
      message: `Tétel "${orderItem.sku}" egységár nélkül a ${orderId} rendelésben`,
      statusCode: null,
      retryable: false,
    });
  }
  const variantSuffix = orderItem.variantName ? ` — ${orderItem.variantName}` : '';
  return {
    name: `${orderItem.name}${variantSuffix}`,
    unit_price: orderItem.unitPrice,
    unit_price_type: 'gross',
    quantity: orderItem.qty,
    unit: DEFAULT_UNIT,
    vat,
    item_comment: orderItem.sku || undefined,
  };
}

/**
 * Díjbekérő payload összeállítása a megrendelés-inputból.
 *
 * Megj.: szállítási díj sort jelenleg nem ad hozzá — az `OrderEmailInput`
 * sémában nincs `shippingFee` mező. Ha később bekerül, itt csak `if`-fel
 * lehet kiegészíteni (a `SHIPPING_FEE_ITEM_NAME` lokalizációk készen állnak).
 */
export function buildProformaPayload(opts: {
  order: OrderEmailInput;
  partnerId: number;
  config: BillingoConfig;
  language: BillingoLanguage;
}): BillingoDocumentCreate {
  const { order, partnerId, config, language } = opts;
  const today = new Date();
  const vat = resolveVatCode(order.country, order.taxNumber);
  return {
    partner_id: partnerId,
    block_id: config.blockId,
    bank_account_id: config.bankAccountId,
    type: 'proforma',
    fulfillment_date: isoDate(today),
    due_date: addDaysIso(today, PROFORMA_DUE_DAYS),
    payment_method: 'online_bankcard',
    language,
    currency: 'HUF',
    electronic: false,
    paid: false,
    items: order.items.map((it) => mapItem(it, order.orderId, vat)),
    comment: `Rendelésszám: ${order.orderId}${order.notes ? ` — ${order.notes}` : ''}`,
  };
}

/**
 * POST /v3/documents — proforma létrehozása.
 * 4xx-et `BILLINGO-DOC-001`-re, 5xx-et `BILLINGO-DOC-002`-re fordít.
 */
export async function createProforma(
  config: BillingoConfig,
  payload: BillingoDocumentCreate,
  _orderId: string,
): Promise<BillingoDocumentResponse> {
  try {
    return await executeBillingoRequest<BillingoDocumentResponse>(config, {
      method: 'POST',
      path: '/documents',
      body: payload,
    });
  } catch (caught) {
    if (caught instanceof BillingoApiError) {
      if (caught.statusCode !== null && caught.statusCode < 500 && caught.statusCode !== 429) {
        throw new BillingoApiError({
          code: 'BILLINGO-DOC-001',
          message: `Díjbekérő create ${caught.statusCode}`,
          statusCode: caught.statusCode,
          retryable: false,
          body: caught.body,
        });
      }
      throw caught;
    }
    throw new BillingoApiError({
      code: 'BILLINGO-DOC-002',
      message: `Díjbekérő create exception: ${caught instanceof Error ? caught.message : String(caught)}`,
      statusCode: null,
      retryable: false,
    });
  }
}

/**
 * POST /v3/documents/{id}/send — proforma kiküldése e-mailben.
 *
 * Ha a küldés meghiúsul, a proforma akkor is létrejött — a hívó eldönti,
 * hogyan kezeli (jellemzően: log + folytatás, mert a dokumentum publicUrl-en
 * elérhető és a csapat manuálisan újraküldheti).
 */
export async function sendProformaEmail(
  config: BillingoConfig,
  proformaId: number,
  recipientEmail: string,
): Promise<boolean> {
  const sendBody: BillingoSendPayload = {
    emails: [recipientEmail],
    block_id: config.blockId,
  };
  try {
    await executeBillingoRequest<unknown>(config, {
      method: 'POST',
      path: `/documents/${proformaId}/send`,
      body: sendBody,
    });
    return true;
  } catch (caught) {
    console.warn(
      '[billingo] proforma email send failed for',
      proformaId,
      caught instanceof Error ? caught.message : caught,
    );
    return false;
  }
}
