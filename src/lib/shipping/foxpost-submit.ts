/**
 * Foxpost automatikus csomagfeladás (FoxWEB API) - ELŐKÉSZÍTVE, MÉG NEM BEKÖTVE.
 *
 * ⚠️  Ez a modul SZÁNDÉKOSAN nincs meghívva sehonnan. A jelenlegi flow-ban a
 *     Foxpost csomagot a csapat kézzel adja fel; ez a scaffold akkor lép
 *     életbe, amikor a Foxpost partner API-hozzáférés (FoxWEB) elérhető.
 *
 * Bekötés (amikor jön a hozzáférés):
 *   1. Állítsd be a titkokat: FOXPOST_API_URL, FOXPOST_API_USERNAME, FOXPOST_API_PASSWORD.
 *   2. A `processOrder` (lib/order/submit.ts) végén, SIKERES rendelés után hívd meg:
 *        if (input.shippingMethod === 'foxpost') {
 *          const r = await submitFoxpostParcel(input, env);
 *          // r.clfNumber → mentsd a Sheetbe / admin emailbe (csomagszám)
 *        }
 *   3. Erősítsd meg a pontos végpontot és mezőneveket a Foxpost dokumentációból
 *      (IT-integration@foxpost.hu) - lent TODO-val jelölve.
 *
 * Megj.: a vevő OLDALI automataválasztó (térkép-widget) MÁR működik a pénztárban;
 * ez a modul kizárólag a háttér-feladást (címke/CLF szám generálás) automatizálja.
 */
import type { OrderEmailInput } from '@/lib/order/email';
import type { OrderEnv } from '@/lib/order/env';
import { getEnvValue } from '@/lib/order/env';

export interface FoxpostSubmitConfig {
  apiUrl: string;
  username: string;
  password: string;
}

export type FoxpostSubmitResult =
  | { success: true; clfNumber: string; trackingUrl: string | null }
  | { success: false; skipped: true; reason: 'not_foxpost' | 'no_point' | 'config_missing' }
  | { success: false; skipped: false; code: string; errorMessage: string };

/** Titkok beolvasása; ha bármelyik hiányzik, a feladás kihagyható (skip). */
export function loadFoxpostConfig(env: OrderEnv): FoxpostSubmitConfig | null {
  const apiUrl = getEnvValue(env, 'FOXPOST_API_URL');
  const username = getEnvValue(env, 'FOXPOST_API_USERNAME');
  const password = getEnvValue(env, 'FOXPOST_API_PASSWORD');
  if (!apiUrl || !username || !password) return null;
  return { apiUrl, username, password };
}

/**
 * FoxWEB parcel payload a megrendelésből.
 * TODO(foxpost): a mezőneveket a hivatalos FoxWEB API doc szerint pontosítani
 * (recipientName/recipient_name, destination/operator_id, cod/codAmount, stb.).
 */
function buildParcelPayload(order: OrderEmailInput) {
  const point = order.foxpostPoint;
  // Utánvét összeg: a teljes fizetendő (tételek + szállítás), ha a fizetés cod.
  const codAmount =
    order.paymentMethod === 'cod' ? order.subtotal + order.shippingFee : 0;
  return {
    refCode: order.orderId, // saját rendelésszám visszakövetéshez
    recipientName: `${order.lastName} ${order.firstName}`.trim(),
    recipientPhone: order.phone,
    recipientEmail: order.email,
    // A vevő által a pénztárban kiválasztott automata azonosítója:
    destination: point?.id ?? '',
    size: 's', // TODO(foxpost): kellék-csomag mérete (s/m/l) - üzleti döntés/becslés
    cod: codAmount,
  };
}

/**
 * Egy Foxpost csomag feladása. Soha nem dob - a hívó a result alapján dönt.
 * Jelenleg SEHONNAN nincs meghívva (lásd a fájl tetején).
 */
export async function submitFoxpostParcel(
  order: OrderEmailInput,
  env: OrderEnv,
): Promise<FoxpostSubmitResult> {
  if (order.shippingMethod !== 'foxpost') {
    return { success: false, skipped: true, reason: 'not_foxpost' };
  }
  if (!order.foxpostPoint) {
    return { success: false, skipped: true, reason: 'no_point' };
  }
  const config = loadFoxpostConfig(env);
  if (!config) {
    return { success: false, skipped: true, reason: 'config_missing' };
  }

  const payload = buildParcelPayload(order);
  const auth = btoa(`${config.username}:${config.password}`);

  try {
    // TODO(foxpost): a pontos végpont és a body-séma megerősítése a FoxWEB doc-ból.
    //   Jellemzően: POST {apiUrl}/parcel  Basic auth-tal, { parcels: [payload] }.
    const res = await fetch(`${config.apiUrl.replace(/\/$/, '')}/parcel`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ parcels: [payload] }),
    });

    if (!res.ok) {
      const body = await res.text();
      return {
        success: false,
        skipped: false,
        code: `FOXPOST-SUBMIT-${res.status}`,
        errorMessage: body.slice(0, 500),
      };
    }

    const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
    // TODO(foxpost): a válasz mezőnevének megerősítése (clfNumber / trackingNumber).
    const clfNumber = String(
      (data.clfNumber as string) ||
        (data.trackingNumber as string) ||
        (Array.isArray(data.parcels) ? (data.parcels[0] as Record<string, unknown>)?.clfNumber : '') ||
        '',
    );
    return {
      success: true,
      clfNumber,
      trackingUrl: clfNumber ? `https://www.foxpost.hu/csomagkovetes?clfoxnums=${clfNumber}` : null,
    };
  } catch (err) {
    return {
      success: false,
      skipped: false,
      code: 'FOXPOST-SUBMIT-EXCEPTION',
      errorMessage: err instanceof Error ? err.message : String(err),
    };
  }
}
