/**
 * Megrendelés feldolgozó pipeline.
 *
 * - Admin értesítő e-mail (magyar) - a csapat ezzel kapja meg a rendelést.
 * - Vevői visszaigazoló e-mail (a vásárló nyelvén).
 * - Google Sheets sor a "Rendelések" fülre.
 *
 * A megrendelés akkor sikeres, ha legalább egy "tartós" csatorna működött
 * (admin e-mail VAGY Sheets), így a lead nem vész el. A vevői e-mail vagy a
 * Sheets önálló hibája csak naplózódik.
 */
import type { OrderEnv } from './env';
import { getEnvValue } from './env';
import { buildCustomerEmail, buildAdminEmail, type OrderEmailInput } from './email';
import { appendOrderRow } from './sheets';
import { generateProforma, type BillingoProformaResult } from '@/lib/billingo';
import { CONTACT } from '@/lib/constants';
import { SHIPPING_LABEL_HU, PAYMENT_LABEL_HU } from '@/lib/shipping/methods';
import { localeConfig } from '@/i18n/ui';

export interface OrderResult {
  success: boolean;
  error?: string;
  code?: string;
  /** Billingo díjbekérő eredménye - null, ha nem futott le (skip vagy hiba). */
  proforma?: BillingoProformaResult;
}

interface ResendEmailOptions {
  env: OrderEnv;
  from: string;
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

/** Egyszerű Resend e-mail küldő (fetch - Cloudflare Workers kompatibilis) */
async function sendResendEmail(opts: ResendEmailOptions): Promise<boolean> {
  const apiKey = getEnvValue(opts.env, 'RESEND_API_KEY');
  if (!apiKey) {
    console.warn('[order] RESEND_API_KEY not configured, skipping email');
    return false;
  }
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: opts.from,
        to: [opts.to],
        subject: opts.subject,
        html: opts.html,
        ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      console.error('[order] Resend email error:', res.status, body);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[order] Resend email exception:', err);
    return false;
  }
}

/** Tételek egysoros összefoglalója a Sheets sorhoz */
function itemsSummary(items: OrderEmailInput['items']): string {
  return items
    .map((i) => {
      const variant = i.variantName ? ` (${i.variantName})` : '';
      return `${i.name}${variant} ×${i.qty}`;
    })
    .join(' | ');
}

/**
 * Megrendelés feldolgozása: e-mailek + Google Sheets.
 */
export async function processOrder(input: OrderEmailInput, env: OrderEnv): Promise<OrderResult> {
  const notifyEmail = getEnvValue(env, 'NOTIFY_EMAIL') || CONTACT.email;

  const admin = buildAdminEmail(input);

  // 1. Admin értesítő (tartós csatorna #1)
  const adminPromise = sendResendEmail({
    env,
    from: 'Skinlab Webshop <forms@skinlabhungary.hu>',
    to: notifyEmail,
    subject: admin.subject,
    html: admin.html,
    replyTo: input.email,
  });

  // 3. Google Sheets (tartós csatorna #2)
  const dateStr = new Date().toLocaleString('hu-HU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
  const sheetRow: (string | number)[] = [
    dateStr, // A: Dátum
    input.orderId, // B: Rendelésszám
    localeConfig[input.locale]?.nativeName || input.locale, // C: Nyelv
    input.lastName, // D: Vezetéknév
    input.firstName, // E: Keresztnév
    input.company || '', // F: Cégnév
    input.taxNumber || '', // G: Adószám
    input.email, // H: E-mail
    input.phone, // I: Telefon
    input.country, // J: Ország
    input.postcode, // K: Irányítószám
    input.city, // L: Város
    input.street, // M: Utca, házszám
    itemsSummary(input.items), // N: Tételek
    input.subtotal > 0 ? String(input.subtotal) : '', // O: Részösszeg (Ft)
    input.hasPriceOnRequest ? 'Igen' : '', // P: Ár egyeztetés alatt
    input.notes || '', // Q: Megjegyzés
    input.sourceUrl || '', // R: Forrás URL
    // Attribution / tracking (S–Z, AA): update the "Rendelések" sheet header
    // to label these columns when extending the spreadsheet.
    input.utmSource || '', // S: UTM source
    input.utmMedium || '', // T: UTM medium
    input.utmCampaign || '', // U: UTM campaign
    input.utmTerm || '', // V: UTM term
    input.utmContent || '', // W: UTM content
    input.gclid || '', // X: Google Click ID
    input.fbclid || '', // Y: Facebook Click ID
    input.referrer || '', // Z: Referrer
    input.userAgent || '', // AA: User-Agent
    SHIPPING_LABEL_HU[input.shippingMethod], // AB: Szállítási mód
    input.foxpostPoint
      ? `${input.foxpostPoint.name} – ${input.foxpostPoint.zip} ${input.foxpostPoint.city}, ${input.foxpostPoint.address}`
      : '', // AC: Foxpost automata
    input.shippingFee > 0 ? String(input.shippingFee) : '', // AD: Szállítási díj (Ft)
    input.parcelTier ? PAYMENT_LABEL_HU[input.paymentMethod] : 'Egyeztetés szerint', // AE: Fizetési mód
  ];

  const sheetsPromise = appendOrderRow(env, sheetRow)
    .then(() => true)
    .catch((err) => {
      console.error('[order] Sheets write failed:', err instanceof Error ? err.message : err);
      return false;
    });

  // 4. Billingo díjbekérő (tartós csatorna #3) — ezt VÁRJUK MEG ELŐSZÖR, hogy a
  //    vevői visszaigazolóba beágyazhassuk a Billingo fizetési linkjét (publicUrl).
  //    Az admin email és a Sheets közben párhuzamosan fut.
  //    - Skip: ár egyeztetés alatt vagy 0 Ft-os rendelés esetén
  //    - Hiba esetén: logolt + folytatás, nem akadályozza a sikeres rendelést
  //    A `generateProforma` szerződés szerint soha nem dob; a try/catch csak
  //    végső védőháló egy váratlan throw esetére.
  let proformaResult: BillingoProformaResult;
  try {
    proformaResult = await generateProforma(input, env);
  } catch (reason) {
    proformaResult = {
      success: false,
      skipped: false,
      code: 'BILLINGO-EXCEPTION',
      errorMessage: reason instanceof Error ? reason.message : String(reason),
    };
  }

  // 2. Vevői visszaigazoló — most már a fizetési link birtokában épül. Ha a
  //    proforma sikeres, a `publicUrl`-re mutató "Fizetés" gomb is bekerül;
  //    skip/hiba esetén a gomb kimarad (a "mi történik most" lépések állnak).
  const paymentUrl = proformaResult.success ? proformaResult.publicUrl : undefined;
  const customer = buildCustomerEmail(input, { paymentUrl });
  const customerOk = await sendResendEmail({
    env,
    from: 'Skinlab Hungary <noreply@skinlabhungary.hu>',
    to: input.email,
    subject: customer.subject,
    html: customer.html,
    replyTo: CONTACT.email,
  });

  // Az admin email és a Sheets párhuzamosan futott a proformával; itt zárjuk le.
  const [adminSettled, sheetsSettled] = await Promise.allSettled([adminPromise, sheetsPromise]);
  const adminOk = adminSettled.status === 'fulfilled' && adminSettled.value === true;
  const sheetsOk = sheetsSettled.status === 'fulfilled' && sheetsSettled.value === true;

  if (adminSettled.status === 'rejected') {
    console.error('[order] channel rejected: admin', adminSettled.reason);
  }
  if (sheetsSettled.status === 'rejected') {
    console.error('[order] channel rejected: sheets', sheetsSettled.reason);
  }
  if (!customerOk) {
    console.warn('[order] Customer confirmation email failed for', input.orderId);
  }

  if (proformaResult.success) {
    console.info(
      '[order] billingo proforma generated:',
      input.orderId,
      '→',
      proformaResult.proformaNumber,
      `(email: ${proformaResult.emailSent ? 'sent' : 'failed'})`,
    );
  }

  // CRM lead-webhook — a VÁSÁRLÁS (legmagasabb szándékú lead) is bekerül a CRM-be, teljes
  // attribúcióval (gclid/fbclid/utm) a Google Ads / Meta offline-konverzió-illesztéshez.
  // Best-effort: sosem buktatja a rendelést.
  const crmUrl = getEnvValue(env, 'CRM_WEBHOOK_URL');
  const crmSecret = getEnvValue(env, 'CRM_WEBHOOK_SECRET');
  if (crmUrl && crmSecret) {
    try {
      const res = await fetch(crmUrl, {
        method: 'POST',
        headers: { Authorization: `Bearer ${crmSecret}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${input.lastName} ${input.firstName}`.trim(),
          phone: input.phone,
          email: input.email,
          city: input.city,
          need_type: 'Webshop rendelés',
          message: `Webshop rendelés – ${input.items.length} tétel, ${input.subtotal} Ft`,
          source_type: 'form',
          consent_given: true,
          marketing_consent: false,
          attribution: {
            landing_url: input.sourceUrl,
            referrer: input.referrer,
            utm_source: input.utmSource,
            utm_medium: input.utmMedium,
            utm_campaign: input.utmCampaign,
            utm_content: input.utmContent,
            utm_term: input.utmTerm,
            gclid: input.gclid,
            fbclid: input.fbclid,
            gbraid: input.gbraid,
            wbraid: input.wbraid,
            msclkid: input.msclkid,
            fbc: input.fbc,
            fbp: input.fbp,
          },
        }),
      });
      if (!res.ok) console.error('[order] CRM forward non-2xx:', res.status);
    } catch (err) {
      console.error('[order] CRM forward failed:', err instanceof Error ? err.message : err);
    }
  }

  // Siker, ha legalább egy tartós csatorna működött - Billingo most már az is
  const billingoOk = proformaResult.success;
  if (adminOk || sheetsOk || billingoOk) {
    return { success: true, proforma: proformaResult };
  }

  console.error('[order] CRITICAL: admin email, sheets AND billingo all failed for', input.orderId);
  return {
    success: false,
    error: 'A megrendelést nem sikerült rögzíteni. Kérjük, próbáld újra, vagy hívj minket.',
    code: 'ORDER-PERSIST-001',
    proforma: proformaResult,
  };
}
