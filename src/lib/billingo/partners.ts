/**
 * Partner (vevő) upsert Billingo-ban.
 *
 * Flow:
 *   1. Keresés email alapján: GET /partners?query=<email>
 *   2. Találat → meglévő partner ID-ja
 *   3. Nincs találat → POST /partners → új partner
 *
 * A 4xx-eket `BILLINGO-PARTNER-001` kódra cseréljük, hogy a hívó azonnal
 * lássa, melyik lépés bukott meg.
 */
import type {
  BillingoPartnerCreate,
  BillingoPartnerListResponse,
  BillingoPartnerResponse,
} from './types';
import { BillingoApiError, executeBillingoRequest, type BillingoConfig } from './client';
import type { OrderEmailInput } from '@/lib/order/email';

/**
 * A megrendelő adataiból összerakja a Billingo partner payload-ot.
 *
 * Magánszemélynél a `taxcode` kimarad (Billingo elfogadja); cégnél
 * (ha van `taxNumber` az orderben) felkerül.
 */
export function buildPartnerPayload(order: OrderEmailInput, fullDisplayName: string): BillingoPartnerCreate {
  const companyTrimmed = order.company.trim();
  const payload: BillingoPartnerCreate = {
    name: companyTrimmed !== '' ? companyTrimmed : fullDisplayName,
    emails: [order.email],
    address: {
      country_code: deriveCountryCode(order.country),
      post_code: order.postcode,
      city: order.city,
      address: order.street,
    },
  };
  if (order.phone) {
    payload.phone = order.phone;
  }
  if (order.taxNumber && order.taxNumber.trim() !== '') {
    payload.taxcode = order.taxNumber.trim();
  }
  return payload;
}

/**
 * ISO-3166-1 alpha-2 kód az ország mezőből.
 *
 * A megrendelési form jelenleg szabad szöveges országot fogad (pl. "Magyarország",
 * "Hungary", "HU"). A leggyakoribb középeurópai elnevezéseket fedjük le; ami
 * nincs benne, default `HU`. A Billingo elfogadja az `HU` alapértelmezést.
 */
function deriveCountryCode(country: string): string {
  const trimmed = country.trim();
  if (trimmed.length === 2) {
    return trimmed.toUpperCase();
  }
  const lower = trimmed.toLowerCase();
  const lookup: Record<string, string> = {
    'magyarország': 'HU',
    'magyar': 'HU',
    hungary: 'HU',
    szlovákia: 'SK',
    slovakia: 'SK',
    'slovenská republika': 'SK',
    románia: 'RO',
    romania: 'RO',
    'românia': 'RO',
    németország: 'DE',
    germany: 'DE',
    deutschland: 'DE',
    ausztria: 'AT',
    austria: 'AT',
    'österreich': 'AT',
    csehország: 'CZ',
    czechia: 'CZ',
    'česká republika': 'CZ',
    horvátország: 'HR',
    croatia: 'HR',
    hrvatska: 'HR',
    szerbia: 'RS',
    serbia: 'RS',
    srbija: 'RS',
    szlovénia: 'SI',
    slovenia: 'SI',
    slovenija: 'SI',
  };
  return lookup[lower] ?? 'HU';
}

/**
 * Email alapján keres partnert. Ha találat van, az első ID-t adja vissza,
 * különben `null`. Lista végpont 4xx-jét nem dobjuk fel — fallback az új
 * partner létrehozására.
 */
async function findPartnerByEmail(
  config: BillingoConfig,
  email: string,
): Promise<BillingoPartnerResponse | null> {
  try {
    const list = await executeBillingoRequest<BillingoPartnerListResponse>(config, {
      method: 'GET',
      path: '/partners',
      query: { query: email, per_page: 5 },
    });
    if (!list.data || list.data.length === 0) {
      return null;
    }
    const matched = list.data.find((p) =>
      Array.isArray(p.emails) && p.emails.some((e) => e.toLowerCase() === email.toLowerCase()),
    );
    return matched ?? list.data[0];
  } catch (caught) {
    if (caught instanceof BillingoApiError && caught.code === 'BILLINGO-AUTH-001') {
      throw caught;
    }
    // Search failure nem blokkolja a flow-t — új partnert hozunk létre.
    console.warn('[billingo] partner search failed, falling back to create:', caught);
    return null;
  }
}

/**
 * Partner upsert: keresés email alapján, ha nincs, létrehoz.
 *
 * Kifelé dob `BillingoApiError`-t — a generateProforma() fordítja le a
 * regisztrált error code-okra.
 */
export async function findOrCreatePartner(
  config: BillingoConfig,
  order: OrderEmailInput,
  fullDisplayName: string,
): Promise<BillingoPartnerResponse> {
  const existing = await findPartnerByEmail(config, order.email);
  if (existing) {
    return existing;
  }

  const payload = buildPartnerPayload(order, fullDisplayName);
  try {
    return await executeBillingoRequest<BillingoPartnerResponse>(config, {
      method: 'POST',
      path: '/partners',
      body: payload,
    });
  } catch (caught) {
    if (caught instanceof BillingoApiError && caught.statusCode !== null && caught.statusCode < 500 && caught.statusCode !== 429) {
      throw new BillingoApiError({
        code: 'BILLINGO-PARTNER-001',
        message: `Partner upsert ${caught.statusCode}`,
        statusCode: caught.statusCode,
        retryable: false,
        body: caught.body,
      });
    }
    throw caught;
  }
}
