/**
 * Megrendelés e-mail sablonok.
 *
 * - Vevői visszaigazoló e-mail: a vásárló nyelvén (mind a 9 nyelv, i18n).
 * - Admin értesítő e-mail: magyarul (a csapat magyar), a vásárló nyelvét
 *   külön mezőben jelzi, hogy tudják, milyen nyelven hívják vissza.
 *
 * Nincs kártyás fizetés - az e-mail jelzi, hogy visszahívjuk a vásárlót,
 * majd e-mailben küldjük a fizetési linket.
 */
import { t, formatPrice, localeConfig, type Locale } from '@/i18n/ui';
import { COMPANY, CONTACT, BANK } from '@/lib/constants';

export interface OrderEmailItem {
  name: string;
  variantName: string;
  sku: string;
  qty: number;
  /** Egységár - null = ár egyeztetés alatt */
  unitPrice: number | null;
  /** Sorösszeg - null, ha az egységár ismeretlen */
  lineTotal: number | null;
}

export interface OrderEmailInput {
  orderId: string;
  locale: Locale;
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  company: string;
  taxNumber: string;
  country: string;
  postcode: string;
  city: string;
  street: string;
  notes: string;
  items: OrderEmailItem[];
  subtotal: number;
  hasPriceOnRequest: boolean;
  sourceUrl: string;
  // Attribution / tracking - captured at checkout time from URL params,
  // persisted tracking storage, and request headers (user-agent)
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  gclid?: string;
  fbclid?: string;
  referrer?: string;
  userAgent?: string;
}

function escapeHtml(str: string): string {
  return String(str).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] || c),
  );
}

const ACCENT = '#ce2252';
const ACCENT_DARK = '#a01c42';

/** A teljes név a nyelvi konvenció szerint összerakva */
function fullName(input: { lastName: string; firstName: string; locale: Locale }): string {
  // Magyarban a vezetéknév van elöl; a többi nyelvnél keresztnév + vezetéknév
  return input.locale === 'hu'
    ? `${input.lastName} ${input.firstName}`.trim()
    : `${input.firstName} ${input.lastName}`.trim();
}

// ============================================
// VEVŐI VISSZAIGAZOLÓ E-MAIL (lokalizált)
// ============================================

export function buildCustomerEmail(
  input: OrderEmailInput,
  opts: { paymentUrl?: string | null } = {},
): { subject: string; html: string } {
  const { locale, orderId } = input;
  const name = fullName(input);
  const tr = (key: string, params?: Record<string, string | number>) =>
    t(locale, `checkout.email.${key}`, params);

  const subject = `${tr('subject')} – ${orderId}`;

  const itemsRows = input.items
    .map((item) => {
      const variant = item.variantName
        ? `<br /><span style="color:#999;font-size:13px;">${escapeHtml(item.variantName)}</span>`
        : '';
      const priceText =
        item.lineTotal === null
          ? tr('priceOnRequest')
          : `${item.qty} ${tr('qty')} × ${formatPrice(item.unitPrice || 0, locale)}`;
      const lineText =
        item.lineTotal === null ? tr('priceOnRequest') : formatPrice(item.lineTotal, locale);
      return `
        <tr>
          <td style="padding:12px 0;border-top:1px solid #f0f0f0;font-family:Arial,sans-serif;font-size:14px;color:#333;">
            <strong>${escapeHtml(item.name)}</strong>${variant}
            <br /><span style="color:#999;font-size:13px;">${escapeHtml(priceText)}</span>
          </td>
          <td style="padding:12px 0;border-top:1px solid #f0f0f0;font-family:Arial,sans-serif;font-size:14px;color:#333;text-align:right;white-space:nowrap;vertical-align:top;">
            ${escapeHtml(lineText)}
          </td>
        </tr>`;
    })
    .join('');

  const totalText =
    input.subtotal > 0
      ? formatPrice(input.subtotal, locale) + (input.hasPriceOnRequest ? ' +' : '')
      : tr('priceOnRequest');

  const steps = [tr('step1'), tr('step2'), tr('step3')]
    .map(
      (s, i) => `
      <tr>
        <td style="vertical-align:top;padding:0 10px 12px 0;font-family:Arial,sans-serif;">
          <span style="display:inline-block;width:24px;height:24px;background:${ACCENT};color:#fff;border-radius:50%;text-align:center;line-height:24px;font-size:13px;font-weight:bold;">${i + 1}</span>
        </td>
        <td style="vertical-align:top;padding:0 0 12px;font-family:Arial,sans-serif;font-size:14px;color:#555;line-height:1.6;">${escapeHtml(s)}</td>
      </tr>`,
    )
    .join('');

  // Optional Billingo payment CTA: rendered only when the proforma was issued
  // and we have its public payment URL. Skip/fail → no button (the "what next"
  // steps below still explain that the payment link arrives separately).
  const payBlock = opts.paymentUrl
    ? `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 24px;">
      <tr><td style="font-family:Arial,sans-serif;font-size:14px;color:#555;line-height:1.6;padding:0 0 14px;">${escapeHtml(tr('payIntro'))}</td></tr>
      <tr><td align="center">
        <a href="${escapeHtml(opts.paymentUrl)}" style="display:inline-block;background:${ACCENT};color:#ffffff;font-size:16px;font-weight:bold;text-decoration:none;padding:15px 30px;border-radius:8px;">${escapeHtml(tr('payButton'))}</a>
      </td></tr>
    </table>`
    : '';

  // Banki utalási adatok - mindig megjelenik, hogy a vevő az egyeztetés után
  // tudja, hová utalja az összeget (a Billingo díjbekérőtől függetlenül is).
  const bankLabel = (label: string) =>
    `<td style="padding:5px 12px 5px 0;font-family:Arial,sans-serif;font-size:13px;color:#888;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td>`;
  const bankValue = (value: string, mono = true) =>
    `<td style="padding:5px 0;font-family:${mono ? "'Courier New',monospace" : 'Arial,sans-serif'};font-size:14px;color:#222;font-weight:bold;word-break:break-all;">${escapeHtml(value)}</td>`;
  const bankBlock = `
    <div style="border:2px solid ${ACCENT};background:#fff0f4;border-radius:10px;padding:18px 20px;margin:0 0 24px;">
      <p style="margin:0 0 6px;font-size:15px;font-weight:bold;color:${ACCENT_DARK};">${escapeHtml(t(locale, 'bank.title'))}</p>
      <p style="margin:0 0 14px;font-size:14px;color:#555;line-height:1.6;">${escapeHtml(t(locale, 'bank.emailIntro'))}</p>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#ffffff;border-radius:8px;">
        <tr>${bankLabel(t(locale, 'bank.accountHolder'))}${bankValue(BANK.accountHolder, false)}</tr>
        <tr>${bankLabel(t(locale, 'bank.bankName'))}${bankValue(BANK.bankName, false)}</tr>
        <tr>${bankLabel(t(locale, 'bank.accountNumber'))}${bankValue(BANK.accountNumber)}</tr>
        <tr>${bankLabel(t(locale, 'bank.iban'))}${bankValue(BANK.iban)}</tr>
        <tr>${bankLabel(t(locale, 'bank.swift'))}${bankValue(BANK.swift)}</tr>
      </table>
      <p style="margin:12px 0 0;font-size:12px;color:#999;">${escapeHtml(t(locale, 'bank.referenceNote'))}</p>
    </div>`;

  const html = `<!DOCTYPE html>
<html lang="${localeConfig[locale].hreflang}">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background-color:#fff0f4;font-family:Arial,Helvetica,sans-serif;color:#333;">
<div style="max-width:580px;margin:0 auto;padding:30px 15px;">
  <div style="text-align:center;margin-bottom:24px;">
    <div style="font-size:22px;font-weight:bold;color:${ACCENT};">Skinlab Hungary</div>
    <div style="font-size:12px;color:#b8a8a6;letter-spacing:1px;">${escapeHtml(COMPANY.slogan)}</div>
  </div>

  <div style="background:#ffffff;border-radius:12px;padding:30px 28px;border:1px solid #eee;">
    <p style="margin:0 0 16px;font-size:15px;">${escapeHtml(tr('greeting', { name }))}</p>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.7;">${escapeHtml(tr('intro'))}</p>

    <div style="background:#fff0f4;border-left:3px solid ${ACCENT};padding:12px 16px;border-radius:0 6px 6px 0;margin:0 0 22px;">
      <p style="margin:0 0 2px;font-size:12px;color:#888;">${escapeHtml(tr('orderNumber'))}</p>
      <p style="margin:0;font-family:'Courier New',monospace;font-size:16px;color:${ACCENT_DARK};font-weight:bold;">${escapeHtml(orderId)}</p>
    </div>

    <p style="margin:0 0 8px;font-size:12px;color:#999;text-transform:uppercase;letter-spacing:1px;font-weight:bold;">${escapeHtml(tr('itemsTitle'))}</p>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-bottom:1px solid #eee;margin-bottom:16px;">
      ${itemsRows}
    </table>

    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:22px;">
      <tr>
        <td style="padding:14px 16px;background-color:${ACCENT};font-family:Arial,sans-serif;font-size:14px;color:#fff;font-weight:bold;text-transform:uppercase;letter-spacing:1px;border-radius:6px 0 0 6px;">${escapeHtml(tr('total'))}</td>
        <td style="padding:14px 16px;background-color:${ACCENT};font-family:Arial,sans-serif;font-size:20px;color:#fff;font-weight:bold;text-align:right;white-space:nowrap;border-radius:0 6px 6px 0;">${escapeHtml(totalText)}</td>
      </tr>
    </table>

    ${payBlock}

    ${bankBlock}

    <p style="margin:0 0 18px;font-size:13px;color:#999;font-style:italic;">${escapeHtml(tr('priceDisclaimer'))}</p>

    <p style="margin:0 0 10px;font-size:13px;color:#999;text-transform:uppercase;letter-spacing:1px;font-weight:bold;">${escapeHtml(tr('whatNextTitle'))}</p>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:22px;">
      ${steps}
    </table>

    <p style="margin:0 0 4px;font-size:14px;color:#555;">${escapeHtml(tr('questions'))}</p>
    <p style="margin:0 0 22px;">
      <a href="${CONTACT.phoneTel}" style="color:${ACCENT};font-size:20px;font-weight:bold;text-decoration:none;">${escapeHtml(CONTACT.phoneDisplay)}</a>
    </p>

    <p style="margin:0;font-size:14px;color:#555;">${escapeHtml(tr('regards'))}<br /><strong>${escapeHtml(tr('team'))}</strong></p>
  </div>

  <p style="text-align:center;font-size:11px;color:#b8a8a6;margin:18px 0 0;line-height:1.6;">
    ${escapeHtml(COMPANY.legalName)}<br />
    ${escapeHtml(orderId)}
  </p>
</div>
</body>
</html>`.trim();

  return { subject, html };
}

// ============================================
// ADMIN ÉRTESÍTŐ E-MAIL (magyar)
// ============================================

export function buildAdminEmail(input: OrderEmailInput): { subject: string; html: string } {
  const name = `${input.lastName} ${input.firstName}`.trim();
  const langName = localeConfig[input.locale].nativeName;

  const totalText =
    input.subtotal > 0
      ? formatPrice(input.subtotal, 'hu') + (input.hasPriceOnRequest ? ' + (egyeztetés alatt)' : '')
      : 'Ár egyeztetés alatt';

  const itemsRows = input.items
    .map((item) => {
      const variant = item.variantName ? ` <span style="color:#888;">(${escapeHtml(item.variantName)})</span>` : '';
      const line =
        item.lineTotal === null ? 'Ár egyeztetés alatt' : formatPrice(item.lineTotal, 'hu');
      return `
        <tr>
          <td style="padding:10px 0;border-top:1px solid #f0f0f0;font-family:Arial,sans-serif;font-size:14px;color:#333;">
            <strong>${escapeHtml(item.name)}</strong>${variant}<br />
            <span style="color:#888;font-size:13px;">${escapeHtml(item.sku)} - ${item.qty} db</span>
          </td>
          <td style="padding:10px 0;border-top:1px solid #f0f0f0;font-family:Arial,sans-serif;font-size:14px;color:#333;text-align:right;white-space:nowrap;vertical-align:top;">${escapeHtml(line)}</td>
        </tr>`;
    })
    .join('');

  const row = (label: string, value: string, mono = false) =>
    value
      ? `<tr>
          <td style="padding:8px 0;width:150px;font-size:13px;color:#999;vertical-align:top;border-top:1px solid #f5f5f5;font-family:Arial,sans-serif;">${escapeHtml(label)}</td>
          <td style="padding:8px 0;font-size:14px;color:#333;border-top:1px solid #f5f5f5;font-family:${mono ? "'Courier New',monospace" : 'Arial,sans-serif'};">${value}</td>
        </tr>`
      : '';

  const subject = `🛒 Új megrendelés: ${name} – ${input.orderId}`;

  const html = `<!DOCTYPE html>
<html lang="hu">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
<body style="margin:0;padding:0;background-color:#f7f7f7;font-family:Arial,Helvetica,sans-serif;color:#333;">
<div style="max-width:600px;margin:0 auto;padding:24px 14px;">
  <div style="background:#fff;border-radius:8px;border:1px solid #e8e8e8;overflow:hidden;">
    <div style="height:4px;background:${ACCENT};"></div>
    <div style="padding:20px 26px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="font-size:14px;font-weight:bold;color:${ACCENT};font-family:Arial,sans-serif;">Skinlab Hungary</td>
          <td style="text-align:right;">
            <span style="display:inline-block;background:${ACCENT};color:#fff;font-size:11px;font-weight:bold;padding:3px 10px;border-radius:3px;letter-spacing:0.5px;">MEGRENDELÉS</span>
          </td>
        </tr>
      </table>

      <h1 style="margin:14px 0 4px;font-size:19px;color:#333;font-family:Arial,sans-serif;">Új megrendelés: ${escapeHtml(name)}</h1>
      <p style="margin:0 0 18px;font-size:13px;color:#999;">Rendelésszám: <strong style="color:${ACCENT_DARK};font-family:'Courier New',monospace;">${escapeHtml(input.orderId)}</strong></p>

      <p style="margin:0 0 20px;padding:12px 15px;background:#fff0f4;border-left:3px solid ${ACCENT};border-radius:0 4px 4px 0;font-size:14px;color:${ACCENT_DARK};">
        Végösszeg: <strong style="font-size:18px;">${escapeHtml(totalText)}</strong>
      </p>

      <p style="margin:0 0 6px;font-size:12px;color:#999;text-transform:uppercase;letter-spacing:1px;font-weight:bold;">Ügyfél</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-bottom:1px solid #eee;margin-bottom:20px;">
        <tr>
          <td style="padding:8px 0;width:150px;font-size:13px;color:#999;font-family:Arial,sans-serif;">Név</td>
          <td style="padding:8px 0;font-size:15px;color:#333;font-weight:bold;font-family:Arial,sans-serif;">${escapeHtml(name)}</td>
        </tr>
        ${row('Telefon', `<a href="tel:${escapeHtml(input.phone.replace(/\s/g, ''))}" style="color:${ACCENT};text-decoration:none;font-weight:bold;">${escapeHtml(input.phone)}</a>`)}
        ${row('E-mail', `<a href="mailto:${escapeHtml(input.email)}" style="color:${ACCENT};text-decoration:none;">${escapeHtml(input.email)}</a>`)}
        ${row('Nyelv (visszahíváshoz)', escapeHtml(langName))}
        ${row('Cégnév', escapeHtml(input.company))}
        ${row('Adószám', escapeHtml(input.taxNumber), true)}
      </table>

      <p style="margin:0 0 6px;font-size:12px;color:#999;text-transform:uppercase;letter-spacing:1px;font-weight:bold;">Szállítási cím</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-bottom:1px solid #eee;margin-bottom:20px;">
        ${row('Ország', escapeHtml(input.country))}
        ${row('Irányítószám', escapeHtml(input.postcode))}
        ${row('Város', escapeHtml(input.city))}
        ${row('Utca, házszám', escapeHtml(input.street))}
      </table>

      <p style="margin:0 0 6px;font-size:12px;color:#999;text-transform:uppercase;letter-spacing:1px;font-weight:bold;">Tételek</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-bottom:1px solid #eee;margin-bottom:8px;">
        ${itemsRows}
      </table>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
        <tr>
          <td style="padding:8px 0;font-size:15px;color:${ACCENT_DARK};font-weight:bold;font-family:Arial,sans-serif;">Végösszeg</td>
          <td style="padding:8px 0;font-size:15px;color:${ACCENT_DARK};font-weight:bold;text-align:right;font-family:Arial,sans-serif;">${escapeHtml(totalText)}</td>
        </tr>
      </table>

      ${
        input.notes
          ? `<p style="margin:0 0 6px;font-size:12px;color:#999;text-transform:uppercase;letter-spacing:1px;font-weight:bold;">Megjegyzés</p>
             <div style="padding:12px 15px;background:#fafafa;border-left:3px solid #ddd;border-radius:0 4px 4px 0;font-size:14px;color:#333;white-space:pre-wrap;margin-bottom:16px;">${escapeHtml(input.notes)}</div>`
          : ''
      }

      ${
        input.sourceUrl || input.utmSource || input.gclid || input.fbclid || input.referrer
          ? `<p style="margin:0 0 6px;font-size:12px;color:#999;text-transform:uppercase;letter-spacing:1px;font-weight:bold;">Attribúció</p>
             <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px;font-size:12px;color:#666;font-family:Arial,sans-serif;">
               ${input.sourceUrl ? `<tr><td style="padding:3px 0;width:130px;color:#999;">Forrás URL:</td><td style="padding:3px 0;word-break:break-all;">${escapeHtml(input.sourceUrl)}</td></tr>` : ''}
               ${input.referrer ? `<tr><td style="padding:3px 0;color:#999;">Referrer:</td><td style="padding:3px 0;word-break:break-all;">${escapeHtml(input.referrer)}</td></tr>` : ''}
               ${input.utmSource || input.utmMedium || input.utmCampaign ? `<tr><td style="padding:3px 0;color:#999;">UTM:</td><td style="padding:3px 0;">${escapeHtml(input.utmSource || '-')} / ${escapeHtml(input.utmMedium || '-')} / ${escapeHtml(input.utmCampaign || '-')}</td></tr>` : ''}
               ${input.utmTerm || input.utmContent ? `<tr><td style="padding:3px 0;color:#999;">UTM term/content:</td><td style="padding:3px 0;">${escapeHtml(input.utmTerm || '-')} / ${escapeHtml(input.utmContent || '-')}</td></tr>` : ''}
               ${input.gclid ? `<tr><td style="padding:3px 0;color:#999;">gclid:</td><td style="padding:3px 0;font-family:'Courier New',monospace;font-size:11px;">${escapeHtml(input.gclid)}</td></tr>` : ''}
               ${input.fbclid ? `<tr><td style="padding:3px 0;color:#999;">fbclid:</td><td style="padding:3px 0;font-family:'Courier New',monospace;font-size:11px;">${escapeHtml(input.fbclid)}</td></tr>` : ''}
             </table>`
          : ''
      }
    </div>
  </div>
</div>
</body>
</html>`.trim();

  return { subject, html };
}
