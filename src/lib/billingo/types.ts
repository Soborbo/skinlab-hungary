/**
 * Billingo API v3 típusok.
 *
 * Csak azokat a mezőket modellezzük, amiket a díjbekérő flow ténylegesen
 * használ. A teljes API surface jóval szélesebb - referencia:
 * https://billingo.docs.apiary.io/
 */

/** Billingo által támogatott számlanyelvek (v3 API). */
export type BillingoLanguage =
  | 'hu'
  | 'en'
  | 'de'
  | 'fr'
  | 'it'
  | 'hr'
  | 'cs'
  | 'sk'
  | 'ro'
  | 'sl'
  | 'es';

/** Billingo ÁFA kulcsok - magyar 27% a kozmetikumokra. */
export type BillingoVat = '27%' | '18%' | '5%' | '0%' | 'AAM' | 'TAM' | 'EU' | 'EUK';

/** Bizonylat típusok közül itt csak a proforma érdekel. */
export type BillingoDocumentType = 'proforma' | 'invoice' | 'advance' | 'receipt';

export type BillingoPaymentMethod =
  | 'cash'
  | 'bank_transfer'
  | 'online_bankcard'
  | 'simplepay'
  | 'barion'
  | 'paypal'
  | 'cash_on_delivery';

export type BillingoCurrency = 'HUF' | 'EUR' | 'USD' | 'GBP';

export type BillingoUnitPriceType = 'gross' | 'net';

/** Partner létrehozó payload (POST /partners). */
export interface BillingoPartnerCreate {
  name: string;
  emails?: string[];
  taxcode?: string;
  address?: {
    country_code: string;
    post_code: string;
    city: string;
    address: string;
  };
  phone?: string;
}

/** Partner válasz (GET/POST /partners). */
export interface BillingoPartnerResponse {
  id: number;
  name: string;
  emails: string[] | null;
  taxcode: string | null;
}

/** Lista válasz a GET /partners?query=… keresésre. */
export interface BillingoPartnerListResponse {
  data: BillingoPartnerResponse[];
  current_page: number;
  total: number;
}

/** Egy tétel a bizonylaton. */
export interface BillingoDocumentItem {
  name: string;
  unit_price: number;
  unit_price_type: BillingoUnitPriceType;
  quantity: number;
  unit: string;
  vat: BillingoVat;
  item_comment?: string;
}

/** Bizonylat létrehozó payload (POST /documents). */
export interface BillingoDocumentCreate {
  partner_id: number;
  block_id: number;
  bank_account_id: number;
  type: BillingoDocumentType;
  fulfillment_date: string;
  due_date: string;
  payment_method: BillingoPaymentMethod;
  language: BillingoLanguage;
  currency: BillingoCurrency;
  conversion_rate?: number;
  electronic: boolean;
  paid: boolean;
  items: BillingoDocumentItem[];
  comment?: string;
}

/** Bizonylat válasz (POST /documents). */
export interface BillingoDocumentResponse {
  id: number;
  invoice_number: string;
  type: BillingoDocumentType;
  language: BillingoLanguage;
  currency: BillingoCurrency;
  conversion_rate: number;
  gross_total: number;
  net_total: number;
  paid: boolean;
  public_url?: string;
}

/** Body a POST /documents/{id}/send végponthoz. */
export interface BillingoSendPayload {
  emails: string[];
  block_id: number;
}

/**
 * A `generateProforma()` orchestrator visszatérési típusa.
 *
 * Soha nem dob - minden eredményt struktúráltan ad vissza, hogy a hívó
 * (processOrder) eldönthesse, sikerült-e, és logolhassa a részleteket.
 */
export type BillingoProformaResult =
  | {
      success: true;
      proformaId: number;
      proformaNumber: string;
      publicUrl: string | null;
      emailSent: boolean;
    }
  | {
      success: false;
      skipped: true;
      reason: 'price_on_request' | 'zero_total' | 'config_missing' | 'cod';
      code: string;
    }
  | {
      success: false;
      skipped: false;
      code: string;
      errorMessage: string;
    };
