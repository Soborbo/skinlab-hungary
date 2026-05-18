/**
 * Megrendelés feldolgozó pipeline.
 *
 * - Admin értesítő e-mail (magyar) — a csapat ezzel kapja meg a rendelést.
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
import { CONTACT } from '@/lib/constants';
import { localeConfig } from '@/i18n/ui';

export interface OrderResult {
  success: boolean;
  error?: string;
  code?: string;
}

interface ResendEmailOptions {
  env: OrderEnv;
  from: string;
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

/** Egyszerű Resend e-mail küldő (fetch — Cloudflare Workers kompatibilis) */
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

  const customer = buildCustomerEmail(input);
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

  // 2. Vevői visszaigazoló
  const customerPromise = sendResendEmail({
    env,
    from: 'Skinlab Hungary <noreply@skinlabhungary.hu>',
    to: input.email,
    subject: customer.subject,
    html: customer.html,
    replyTo: CONTACT.email,
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
    input.sourceUrl || '', // R: Forrás
  ];

  const sheetsPromise = appendOrderRow(env, sheetRow)
    .then(() => true)
    .catch((err) => {
      console.error('[order] Sheets write failed:', err instanceof Error ? err.message : err);
      return false;
    });

  const [adminOk, customerOk, sheetsOk] = await Promise.all([
    adminPromise,
    customerPromise,
    sheetsPromise,
  ]);

  if (!customerOk) {
    console.warn('[order] Customer confirmation email failed for', input.orderId);
  }

  // A rendelés akkor sikeres, ha legalább egy tartós csatorna működött
  if (adminOk || sheetsOk) {
    return { success: true };
  }

  console.error('[order] CRITICAL: admin email AND sheets both failed for', input.orderId);
  return {
    success: false,
    error: 'A megrendelést nem sikerült rögzíteni. Kérjük, próbálja újra, vagy hívjon minket.',
    code: 'ORDER-PERSIST-001',
  };
}
