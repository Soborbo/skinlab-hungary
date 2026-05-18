/**
 * Billingo díjbekérő orchestrator.
 *
 * Bemenet: a megrendelés `OrderEmailInput`-ja (az `/api/order` handler már
 * validálta és újraszámolta az árakat). Kimenet: strukturált eredmény, soha
 * nem dob — a hívó eldönti, hogyan kezeli (logolás, admin email mező, stb.).
 *
 * Skip szabályok:
 *   - `hasPriceOnRequest === true` — nem tudunk árazott díjbekérőt kiállítani.
 *   - `subtotal <= 0` — Billingo nem ad ki 0 Ft-os bizonylatot.
 *   - Config hiányzik — BILLINGO-CFG-* skipként visszaadjuk.
 *
 * Flow:
 *   1. Skip ellenőrzés
 *   2. Config betöltés
 *   3. Locale → Billingo nyelv leképezés
 *   4. Partner upsert (email-alapú keresés, különben create)
 *   5. Díjbekérő create
 *   6. E-mail küldés (best effort)
 */
import type { OrderEmailInput } from '@/lib/order/email';
import type { OrderEnv } from '@/lib/order/env';
import { BillingoApiError, loadBillingoConfig } from './client';
import { findOrCreatePartner } from './partners';
import { buildProformaPayload, createProforma, sendProformaEmail } from './documents';
import { mapLocaleToBillingo } from './language';
import type { BillingoProformaResult } from './types';

function buildDisplayName(order: OrderEmailInput): string {
  return order.locale === 'hu'
    ? `${order.lastName} ${order.firstName}`.trim()
    : `${order.firstName} ${order.lastName}`.trim();
}

/**
 * Díjbekérő generálása egy rendeléshez. Soha nem dob — a sikertelenség
 * is a visszatérési típusban van.
 */
export async function generateProforma(
  order: OrderEmailInput,
  env: OrderEnv,
): Promise<BillingoProformaResult> {
  if (order.hasPriceOnRequest) {
    console.info('[billingo] skip BILLINGO-SKIP-001 — price on request:', order.orderId);
    return { success: false, skipped: true, reason: 'price_on_request', code: 'BILLINGO-SKIP-001' };
  }
  if (order.subtotal <= 0) {
    console.info('[billingo] skip BILLINGO-SKIP-002 — zero subtotal:', order.orderId);
    return { success: false, skipped: true, reason: 'zero_total', code: 'BILLINGO-SKIP-002' };
  }

  let config;
  try {
    config = loadBillingoConfig(env);
  } catch (caught) {
    if (caught instanceof BillingoApiError) {
      console.error(`[billingo] config missing (${caught.code}):`, caught.message);
      return {
        success: false,
        skipped: true,
        reason: 'config_missing',
        code: caught.code,
      };
    }
    throw caught;
  }

  const languageMapping = mapLocaleToBillingo(order.locale);
  if (languageMapping.fellBack) {
    console.info(
      `[billingo] BILLINGO-LOCALE-001 — ${languageMapping.requested} → ${languageMapping.language} fallback`,
    );
  }

  const displayName = buildDisplayName(order);

  try {
    const partner = await findOrCreatePartner(config, order, displayName);
    const documentPayload = buildProformaPayload({
      order,
      partnerId: partner.id,
      config,
      language: languageMapping.language,
    });
    const proforma = await createProforma(config, documentPayload, order.orderId);
    const emailSent = await sendProformaEmail(config, proforma.id, order.email);

    if (!emailSent) {
      console.warn(
        `[billingo] BILLINGO-EMAIL-001 — proforma ${proforma.invoice_number} létrejött, de email küldés bukott`,
      );
    }

    return {
      success: true,
      proformaId: proforma.id,
      proformaNumber: proforma.invoice_number,
      publicUrl: proforma.public_url ?? null,
      emailSent,
    };
  } catch (caught) {
    if (caught instanceof BillingoApiError) {
      console.error(
        `[billingo] ${caught.code} for ${order.orderId}:`,
        caught.message,
        caught.body ?? '',
      );
      return {
        success: false,
        skipped: false,
        code: caught.code,
        errorMessage: caught.message,
      };
    }
    const message = caught instanceof Error ? caught.message : String(caught);
    console.error(`[billingo] unexpected error for ${order.orderId}:`, message);
    return {
      success: false,
      skipped: false,
      code: 'BILLINGO-PARTNER-002',
      errorMessage: message,
    };
  }
}

export type { BillingoProformaResult } from './types';
