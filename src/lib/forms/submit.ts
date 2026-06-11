/**
 * Form submission handling
 * Based on astro-forms skill
 *
 * Uses Google Sheets API for lead storage. Reads runtime env via
 * `readEnv` so secrets set as Cloudflare Worker runtime vars are
 * picked up correctly (Astro v6 inlines `import.meta.env.X` at build
 * time, which silently broke every integration before this refactor).
 */
import type { ContactFormData, ConsultationFormData } from './schemas';
import { generateLeadId, anonymizeIp } from './schemas';
import { readEnv } from '@/lib/env';

/**
 * Escape HTML special characters to prevent XSS in email templates
 */
function escapeHtml(str: string): string {
  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return str.replace(/[&<>"']/g, (char) => htmlEscapes[char]);
}

interface SubmissionResult {
  success: boolean;
  leadId?: string;
  error?: string;
  /** Optional error code from src/lib/errors/codes.ts for descriptive reporting */
  code?: string;
}

interface LeadData {
  leadId: string;
  timestamp: string;
  name: string;
  email: string;
  phone: string;
  product: string;
  message?: string;
  sourceUrl: string;
  ipHash: string;
  gdprConsent: boolean;
  gdprTimestamp: string;
  // Attribution / tracking - captured at submit time from URL params,
  // persisted tracking storage, and document.referrer
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

interface ConsultationLeadData extends LeadData {
  timeline: string;
  businessType: string;
  experience: string;
}

interface GoogleAuthToken {
  access_token: string;
  expires_at: number;
}

let cachedToken: GoogleAuthToken | null = null;

/**
 * Run one submission channel as best-effort. NEVER rejects: any failure is
 * logged and resolved to `false`. This is what makes the pipeline resilient -
 * a single channel's failure can no longer blow up the whole submission (the
 * old code awaited each channel in sequence, so the first throw failed the
 * form even when the lead had already been stored elsewhere).
 */
function settleChannel(p: Promise<boolean>, label: string): Promise<boolean> {
  return p.catch((err) => {
    console.error(`${label}:`, err instanceof Error ? err.message : err);
    return false;
  });
}

/**
 * Process contact form submission.
 *
 * Resilient pipeline (mirrors lib/order/submit.ts): Google Sheets, the team
 * notification email and the customer confirmation email all run independently
 * and in parallel. The lead counts as CAPTURED if at least one *durable*
 * channel persisted it - Google Sheets OR the team notification email. The
 * customer confirmation email is best-effort and never fails the submission.
 */
export async function processFormSubmission(
  data: ContactFormData,
  ip: string,
  userAgent?: string,
  /** Google Sheets tab to append to. Defaults to "Kapcsolat"; training
   *  signups pass "Képzések". Both tabs share the A–S column layout. */
  sheetName: string = 'Kapcsolat',
): Promise<SubmissionResult> {
  const leadId = generateLeadId();
  const timestamp = new Date().toISOString();

  const leadData: LeadData = {
    leadId,
    timestamp,
    name: data.name,
    email: data.email,
    phone: data.phone,
    product: data.product,
    message: data.message,
    sourceUrl: data.sourceUrl,
    ipHash: anonymizeIp(ip),
    gdprConsent: data.gdprConsent,
    gdprTimestamp: data.gdprTimestamp,
    utmSource: data.utmSource,
    utmMedium: data.utmMedium,
    utmCampaign: data.utmCampaign,
    utmTerm: data.utmTerm,
    utmContent: data.utmContent,
    gclid: data.gclid,
    fbclid: data.fbclid,
    referrer: data.referrer,
    userAgent,
  };

  // Durable channels (Sheets, team notification) + best-effort confirmation.
  const channels = await Promise.all([
    settleChannel(sendToGoogleSheets(leadData, sheetName), `[contact] Sheets write failed (${sheetName})`),
    settleChannel(sendNotificationEmail(leadData), '[contact] Notification email failed'),
    settleChannel(sendConfirmationEmail(leadData).then(() => true), '[contact] Confirmation email failed'),
  ]);
  const sheetsOk = channels[0];
  const notifyOk = channels[1];

  if (sheetsOk || notifyOk) {
    return { success: true, leadId };
  }

  console.error('[contact] CRITICAL: every durable channel failed for', leadId);
  return {
    success: false,
    error: 'Egyik tartós csatorna sem mentette el a leadet (Sheets és értesítő email is hibázott).',
    code: 'FORM-SUBMIT-001',
  };
}

/**
 * Get Google OAuth2 access token using service account
 */
async function getGoogleAccessToken(): Promise<string> {
  // Check cached token
  if (cachedToken && cachedToken.expires_at > Date.now() + 60000) {
    return cachedToken.access_token;
  }

  const clientEmail = readEnv('GOOGLE_SERVICE_ACCOUNT_EMAIL');
  const privateKey = readEnv('GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY')?.replace(/\\n/g, '\n');

  if (!clientEmail || !privateKey) {
    throw new Error('Google service account credentials not configured');
  }

  // Create JWT header and claim
  const header = {
    alg: 'RS256',
    typ: 'JWT',
  };

  const now = Math.floor(Date.now() / 1000);
  const claim = {
    iss: clientEmail,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  };

  // Base64url encode
  const base64url = (obj: object) =>
    btoa(JSON.stringify(obj))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

  const unsignedToken = `${base64url(header)}.${base64url(claim)}`;

  // Sign with private key using Web Crypto API
  const encoder = new TextEncoder();
  const keyData = privateKey
    .replace('-----BEGIN PRIVATE KEY-----', '')
    .replace('-----END PRIVATE KEY-----', '')
    .replace(/\s/g, '');

  const binaryKey = Uint8Array.from(atob(keyData), (c) => c.charCodeAt(0));

  const cryptoKey = await crypto.subtle.importKey(
    'pkcs8',
    binaryKey,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    cryptoKey,
    encoder.encode(unsignedToken)
  );

  const signatureBase64 = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const jwt = `${unsignedToken}.${signatureBase64}`;

  // Exchange JWT for access token
  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });

  if (!tokenResponse.ok) {
    const error = await tokenResponse.text();
    throw new Error(`Failed to get Google access token: ${error}`);
  }

  const tokenData = await tokenResponse.json();

  // Cache the token
  cachedToken = {
    access_token: tokenData.access_token,
    expires_at: Date.now() + tokenData.expires_in * 1000,
  };

  return tokenData.access_token;
}

/**
 * Send lead data to Google Sheets via API
 */
async function sendToGoogleSheets(data: LeadData, sheetName: string = 'Kapcsolat'): Promise<boolean> {
  const spreadsheetId = readEnv('GOOGLE_SHEETS_SPREADSHEET_ID');

  if (!spreadsheetId) {
    console.warn('GOOGLE_SHEETS_SPREADSHEET_ID not configured, skipping sheets');
    return false;
  }

  const accessToken = await getGoogleAccessToken();

  // Prepare row data (order must match sheet columns)
  // Columns A–S (19). Update the sheet header row to match:
  // A Beküldés dátuma | B Név | C Email | D Telefon | E Termék |
  // F Üzenet | G Forrás URL | H IP hash | I GDPR | J UTM source |
  // K UTM medium | L UTM campaign | M UTM term | N UTM content |
  // O gclid | P fbclid | Q Referrer | R User-Agent | S Lead ID
  //
  // A beküldés dátuma csak egyszer szerepel (a `gdprTimestamp` korábban egy
  // második dátum-oszlopot duplikált). A Lead ID a sor végére került.
  const rowData = [
    data.timestamp,                    // A: Beküldés dátuma
    data.name,                         // B: Név
    data.email,                        // C: Email
    data.phone,                        // D: Telefon
    data.product,                      // E: Termék
    data.message || '',                // F: Üzenet
    data.sourceUrl,                    // G: Forrás URL
    data.ipHash,                       // H: IP hash
    data.gdprConsent ? 'Igen' : 'Nem', // I: GDPR
    data.utmSource || '',              // J: UTM source
    data.utmMedium || '',              // K: UTM medium
    data.utmCampaign || '',            // L: UTM campaign
    data.utmTerm || '',                // M: UTM term
    data.utmContent || '',             // N: UTM content
    data.gclid || '',                  // O: gclid
    data.fbclid || '',                 // P: fbclid
    data.referrer || '',               // Q: Referrer
    data.userAgent || '',              // R: User-Agent
    data.leadId,                       // S: Lead ID (a sor végén)
  ];

  // Append to the given tab (default "Kapcsolat"; training signups → "Képzések").
  // fetch percent-encodes the accented tab name automatically (same as the
  // "Konzultáció" append below).
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}!A:S:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [rowData],
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    console.error(`[contact] Sheets append failed (${sheetName}):`, response.status, error);
    return false;
  }

  return true;
}

/**
 * Send confirmation email to customer
 */
async function sendConfirmationEmail(data: LeadData): Promise<void> {
  const resendApiKey = readEnv('RESEND_API_KEY');

  if (!resendApiKey) {
    console.warn('RESEND_API_KEY not configured, skipping confirmation email');
    return;
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Skinlab Hungary <noreply@skinlabhungary.hu>',
      to: [data.email],
      subject: 'Köszönjük a megkeresésed - Skinlab Hungary',
      html: generateConfirmationEmailHtml(data),
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to send confirmation email: ${error}`);
  }
}

/**
 * Send notification email to team
 */
async function sendNotificationEmail(data: LeadData): Promise<boolean> {
  const resendApiKey = readEnv('RESEND_API_KEY');
  const notifyEmail = readEnv('NOTIFY_EMAIL') || 'hello@skinlabhungary.hu';

  if (!resendApiKey) {
    console.warn('RESEND_API_KEY not configured, skipping notification email');
    return false;
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Skinlab Forms <forms@skinlabhungary.hu>',
      to: [notifyEmail],
      subject: `Új érdeklődő: ${data.name} - ${data.product}`,
      html: generateNotificationEmailHtml(data),
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('[contact] Notification email failed:', response.status, error);
    return false;
  }

  return true;
}

/**
 * Generate confirmation email HTML
 */
function generateConfirmationEmailHtml(data: LeadData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #724890; margin: 0;">Skinlab Hungary</h1>
    <p style="color: #666; margin: 5px 0 0;">laser&beauty equipment</p>
  </div>

  <h2 style="color: #333;">Kedves ${escapeHtml(data.name)}!</h2>

  <p>Köszönjük, hogy felkerested a Skinlab Hungary-t!</p>

  <p>Megkaptuk az érdeklődésed, és hamarosan felvesszük veled a kapcsolatot
  a megadott telefonszámon: <strong>${escapeHtml(data.phone)}</strong></p>

  <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <h3 style="margin-top: 0; color: #333;">Az általad megadott adatok:</h3>
    <p><strong>Érdeklődés tárgya:</strong> ${escapeHtml(data.product)}</p>
    ${data.message ? `<p><strong>Üzenet:</strong> ${escapeHtml(data.message)}</p>` : ''}
  </div>

  <p>Ha sürgős kérdésed van, hívj minket bátran:</p>
  <p style="font-size: 20px; font-weight: bold; color: #724890;">
    <a href="tel:+3613009280" style="color: #724890; text-decoration: none;">+36 1 300 9280</a>
  </p>

  <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">

  <p style="color: #888; font-size: 12px;">
    Ez az email automatikusan lett küldve. Kérjük, ne válaszolj rá.<br>
    Skinlab Beauty Equipment Kft. | 2030 Érd, Budai út 28.<br>
    Hivatkozási szám: ${data.leadId}
  </p>
</body>
</html>
  `.trim();
}

/**
 * Generate notification email HTML for team
 */
function generateNotificationEmailHtml(data: LeadData): string {
  // Normalized tel: URI — strip spaces/formatting that break the dialer link.
  const telHref = `tel:${data.phone.replace(/[^\d+]/g, '')}`;
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
</head>
<body style="font-family: Arial, sans-serif; padding: 20px;">
  <h2 style="color: #724890;">Új érdeklődő!</h2>

  <table style="border-collapse: collapse; width: 100%;">
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Lead ID:</strong></td>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${escapeHtml(data.leadId)}</td>
    </tr>
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Név:</strong></td>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${escapeHtml(data.name)}</td>
    </tr>
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
      <td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td>
    </tr>
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Telefon:</strong></td>
      <td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="${telHref}">${escapeHtml(data.phone)}</a></td>
    </tr>
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Termék:</strong></td>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${escapeHtml(data.product)}</td>
    </tr>
    ${data.message ? `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Üzenet:</strong></td>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${escapeHtml(data.message)}</td>
    </tr>
    ` : ''}
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Forrás:</strong></td>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${escapeHtml(data.sourceUrl)}</td>
    </tr>
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Időpont:</strong></td>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${new Date(data.timestamp).toLocaleString('hu-HU')}</td>
    </tr>
    ${data.referrer ? `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Referrer:</strong></td>
      <td style="padding: 8px; border-bottom: 1px solid #eee; word-break: break-all; font-size: 12px;">${escapeHtml(data.referrer)}</td>
    </tr>
    ` : ''}
    ${data.utmSource || data.utmMedium || data.utmCampaign ? `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>UTM:</strong></td>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${escapeHtml(data.utmSource || '-')} / ${escapeHtml(data.utmMedium || '-')} / ${escapeHtml(data.utmCampaign || '-')}</td>
    </tr>
    ` : ''}
    ${data.utmTerm || data.utmContent ? `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>UTM term/content:</strong></td>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${escapeHtml(data.utmTerm || '-')} / ${escapeHtml(data.utmContent || '-')}</td>
    </tr>
    ` : ''}
    ${data.gclid ? `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>gclid:</strong></td>
      <td style="padding: 8px; border-bottom: 1px solid #eee; font-family: 'Courier New', monospace; font-size: 11px; word-break: break-all;">${escapeHtml(data.gclid)}</td>
    </tr>
    ` : ''}
    ${data.fbclid ? `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>fbclid:</strong></td>
      <td style="padding: 8px; border-bottom: 1px solid #eee; font-family: 'Courier New', monospace; font-size: 11px; word-break: break-all;">${escapeHtml(data.fbclid)}</td>
    </tr>
    ` : ''}
  </table>

  <!-- Bulletproof, centered call button -->
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin: 20px auto 0;">
    <tr>
      <td align="center" bgcolor="#724890" style="border-radius: 8px;">
        <a href="${telHref}" style="display: inline-block; padding: 12px 24px; color: #ffffff; text-decoration: none; font-weight: bold; border-radius: 8px;">📞 Hívás indítása</a>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

// ============================================
// CONSULTATION WIZARD SUBMISSION
// ============================================

// Human-readable labels for consultation options
const TIMELINE_LABELS: Record<string, string> = {
  'asap': 'Most azonnal',
  '1-3-month': '1-3 hónapon belül',
  '3-6-month': '3-6 hónapon belül',
  'just-looking': 'Csak tájékozódom',
};

const BUSINESS_LABELS: Record<string, string> = {
  'running-salon': 'Működő szalon',
  'opening-soon': 'Most nyitok szalont',
  'home-service': 'Otthoni szolgáltatás',
  'no-business': 'Még nincs vállalkozás',
};

const EXPERIENCE_LABELS: Record<string, string> = {
  'regular': 'Rendszeresen használ',
  'tried': 'Kipróbálta már',
  'trained': 'Képzett, de nem használt',
  'beginner': 'Kezdő',
};

/**
 * Process consultation wizard form submission
 */
export async function processConsultationSubmission(
  data: ConsultationFormData,
  ip: string,
  userAgent?: string,
  waitUntil?: (p: Promise<unknown>) => void,
): Promise<SubmissionResult> {
  const leadId = generateLeadId();
  const timestamp = new Date().toISOString();

  const leadData: ConsultationLeadData = {
    leadId,
    timestamp,
    name: data.name,
    email: data.email,
    phone: data.phone,
    product: data.product,
    timeline: data.timeline,
    businessType: data.businessType,
    experience: data.experience,
    sourceUrl: data.sourceUrl,
    ipHash: anonymizeIp(ip),
    gdprConsent: data.gdprConsent,
    gdprTimestamp: data.gdprTimestamp,
    utmSource: data.utmSource,
    utmMedium: data.utmMedium,
    utmCampaign: data.utmCampaign,
    utmTerm: data.utmTerm,
    utmContent: data.utmContent,
    gclid: data.gclid,
    fbclid: data.fbclid,
    referrer: data.referrer,
    userAgent,
  };

  // Durable channels (Sheets, team notification) + best-effort confirmation,
  // all in parallel. Lead counts as captured if at least one durable channel
  // persisted it.
  const channels = await Promise.all([
    settleChannel(sendConsultationToGoogleSheets(leadData), '[consultation] Sheets write failed'),
    settleChannel(sendConsultationNotificationEmail(leadData), '[consultation] Notification email failed'),
    settleChannel(sendConsultationConfirmationEmail(leadData).then(() => true), '[consultation] Confirmation email failed'),
  ]);
  const sheetsOk = channels[0];
  const notifyOk = channels[1];

  // CRM webhook (non-blocking - never affects submission success).
  // On Cloudflare Workers fire-and-forget fetches can be terminated before the
  // response resolves. If the caller passes ctx.waitUntil, register the promise;
  // otherwise fall back to await so the work isn't dropped.
  const crmPromise = sendToCrm(leadData).catch((err) => {
    console.error('CRM webhook failed:', err instanceof Error ? err.message : err);
  });
  if (waitUntil) {
    waitUntil(crmPromise);
  } else {
    await crmPromise;
  }

  if (sheetsOk || notifyOk) {
    return { success: true, leadId };
  }

  console.error('[consultation] CRITICAL: every durable channel failed for', leadId);
  return {
    success: false,
    error: 'Egyik tartós csatorna sem mentette el a leadet (Sheets és értesítő email is hibázott).',
    code: 'FORM-SUBMIT-001',
  };
}

/**
 * Send consultation lead data to Google Sheets
 */
async function sendConsultationToGoogleSheets(data: ConsultationLeadData): Promise<boolean> {
  const spreadsheetId = readEnv('GOOGLE_SHEETS_SPREADSHEET_ID');

  if (!spreadsheetId) {
    console.warn('GOOGLE_SHEETS_SPREADSHEET_ID not configured, skipping sheets');
    return false;
  }

  const accessToken = await getGoogleAccessToken();

  // Prepare row data for Konzultáció sheet
  // Columns A–U (21). Update the sheet header row to match:
  // A Beküldés dátuma | B Név | C Email | D Telefon | E Termék |
  // F Időzítés | G Vállalkozás | H Tapasztalat | I Forrás URL |
  // J IP hash | K GDPR | L UTM source | M UTM medium | N UTM campaign |
  // O UTM term | P UTM content | Q gclid | R fbclid | S Referrer |
  // T User-Agent | U Lead ID
  //
  // A beküldés dátuma csak egyszer szerepel (korábban a `gdprTimestamp`
  // gyakorlatilag ugyanazt a beküldési időt ismételte egy második
  // oszlopban). A Lead ID a sor végére került – a hívható kontakt- és
  // lead-adatok kerülnek előre. A GDPR-hozzájárulás idejét a beküldés
  // dátuma (A) + a "GDPR: Igen/Nem" (K) együtt rögzíti.
  const rowData = [
    data.timestamp,                                          // A: Beküldés dátuma
    data.name,                                               // B: Név
    data.email,                                              // C: Email
    data.phone,                                              // D: Telefon
    data.product,                                            // E: Termék
    TIMELINE_LABELS[data.timeline] || data.timeline,         // F: Időzítés
    BUSINESS_LABELS[data.businessType] || data.businessType, // G: Vállalkozás
    EXPERIENCE_LABELS[data.experience] || data.experience,   // H: Tapasztalat
    data.sourceUrl,                                          // I: Forrás URL
    data.ipHash,                                             // J: IP hash
    data.gdprConsent ? 'Igen' : 'Nem',                       // K: GDPR
    data.utmSource || '',                                    // L: UTM source
    data.utmMedium || '',                                    // M: UTM medium
    data.utmCampaign || '',                                  // N: UTM campaign
    data.utmTerm || '',                                      // O: UTM term
    data.utmContent || '',                                   // P: UTM content
    data.gclid || '',                                        // Q: gclid
    data.fbclid || '',                                       // R: fbclid
    data.referrer || '',                                     // S: Referrer
    data.userAgent || '',                                    // T: User-Agent
    data.leadId,                                             // U: Lead ID (a sor végén)
  ];

  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Konzultáció!A:U:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [rowData],
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    console.error('[consultation] Sheets append failed:', response.status, error);
    return false;
  }

  return true;
}

/**
 * Send consultation confirmation email to customer
 */
async function sendConsultationConfirmationEmail(data: ConsultationLeadData): Promise<void> {
  const resendApiKey = readEnv('RESEND_API_KEY');

  if (!resendApiKey) {
    console.warn('RESEND_API_KEY not configured, skipping confirmation email');
    return;
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Skinlab Hungary <noreply@skinlabhungary.hu>',
      to: [data.email],
      subject: 'Köszönjük a konzultációkérésed - Skinlab Hungary',
      html: generateConsultationConfirmationEmailHtml(data),
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to send confirmation email: ${error}`);
  }
}

/**
 * Send consultation notification email to team
 */
async function sendConsultationNotificationEmail(data: ConsultationLeadData): Promise<boolean> {
  const resendApiKey = readEnv('RESEND_API_KEY');
  const notifyEmail = readEnv('NOTIFY_EMAIL') || 'hello@skinlabhungary.hu';

  if (!resendApiKey) {
    console.warn('RESEND_API_KEY not configured, skipping notification email');
    return false;
  }

  // Determine priority based on timeline
  const isHot = data.timeline === 'asap';
  const subject = isHot
    ? `🔥 FORRÓ LEAD: ${data.name} - ${data.product}`
    : `Új konzultáció: ${data.name} - ${data.product}`;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Skinlab Forms <forms@skinlabhungary.hu>',
      to: [notifyEmail],
      subject,
      html: generateConsultationNotificationEmailHtml(data),
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('[consultation] Notification email failed:', response.status, error);
    return false;
  }

  return true;
}

/**
 * Generate consultation confirmation email HTML
 */
function generateConsultationConfirmationEmailHtml(data: ConsultationLeadData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #fdf2f8;">
  <div style="background: white; border-radius: 16px; padding: 32px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
    <div style="text-align: center; margin-bottom: 24px;">
      <h1 style="color: #db2777; margin: 0; font-size: 24px;">Skinlab Hungary</h1>
      <p style="color: #9ca3af; margin: 4px 0 0; font-size: 14px;">laser&beauty equipment</p>
    </div>

    <h2 style="color: #1f2937; text-align: center; font-size: 20px;">Kedves ${escapeHtml(data.name)}!</h2>

    <p style="color: #4b5563; text-align: center; line-height: 1.6;">
      Köszönjük, hogy érdeklődtél a Skinlab Hungary kínálata iránt!<br>
      <strong>Amint lehetséges, visszahívunk a megadott telefonszámon.</strong>
    </p>

    <div style="background: #fdf2f8; padding: 20px; border-radius: 12px; margin: 24px 0;">
      <h3 style="margin: 0 0 16px; color: #1f2937; font-size: 16px;">Az általad megadott adatok:</h3>
      <table style="width: 100%; font-size: 14px;">
        <tr>
          <td style="padding: 6px 0; color: #6b7280;">Érdeklődés:</td>
          <td style="padding: 6px 0; color: #1f2937; font-weight: 500;">${escapeHtml(data.product)}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #6b7280;">Vásárlás:</td>
          <td style="padding: 6px 0; color: #1f2937; font-weight: 500;">${escapeHtml(TIMELINE_LABELS[data.timeline] || data.timeline)}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #6b7280;">Szalon:</td>
          <td style="padding: 6px 0; color: #1f2937; font-weight: 500;">${escapeHtml(BUSINESS_LABELS[data.businessType] || data.businessType)}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #6b7280;">Tapasztalat:</td>
          <td style="padding: 6px 0; color: #1f2937; font-weight: 500;">${escapeHtml(EXPERIENCE_LABELS[data.experience] || data.experience)}</td>
        </tr>
      </table>
    </div>

    <div style="background: #f0fdf4; padding: 16px 20px; border-radius: 12px; margin: 24px 0; border-left: 4px solid #22c55e;">
      <p style="color: #166534; font-size: 14px; margin: 0; line-height: 1.5;">
        <strong>Tudtad?</strong> Az esztétikai lézertechnológia piaca évente átlagosan 15-20%-kal növekszik világszerte.
        Egyre több szépségszalon ismeri fel, hogy a professzionális lézereszközök nemcsak hatékonyabbak,
        hanem az ügyfelek is egyre tudatosabban keresik az ilyen kezeléseket. Te is jó úton jársz!
      </p>
    </div>

    <div style="background: #fef3c7; padding: 20px; border-radius: 12px; margin: 24px 0; text-align: center;">
      <p style="color: #92400e; font-size: 14px; margin: 0 0 12px; font-weight: 600;">
        Ha gyorsabban van ránk szükséged:
      </p>
      <p style="margin: 0 0 8px;">
        <a href="tel:+3613009280" style="color: #db2777; font-size: 20px; font-weight: bold; text-decoration: none;">
          +36 1 300 9280
        </a>
      </p>
      <p style="color: #78716c; font-size: 13px; margin: 0;">
        Skinlab SHOWROOM: 2030 Érd, Budai út 28.<br>
        Email: <a href="mailto:hello@skinlabhungary.hu" style="color: #db2777;">hello@skinlabhungary.hu</a>
      </p>
    </div>

    <hr style="border: none; border-top: 1px solid #f3e8ff; margin: 24px 0;">

    <p style="color: #9ca3af; font-size: 11px; text-align: center; line-height: 1.5;">
      Ez az email automatikusan lett küldve. Kérjük, ne válaszolj rá.<br>
      Skinlab Beauty Equipment Kft. | 2030 Érd, Budai út 28.<br>
      Hivatkozási szám: ${data.leadId}
    </p>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Generate consultation notification email HTML for team
 * Name, phone, interest are shown first for quick action
 */
function generateConsultationNotificationEmailHtml(data: ConsultationLeadData): string {
  const isHot = data.timeline === 'asap';
  const priorityBadge = isHot
    ? '<span style="background: #ef4444; color: white; padding: 4px 12px; border-radius: 999px; font-size: 12px; font-weight: bold;">FORRÓ LEAD</span>'
    : '';

  // Normalized tel: URI — strip spaces/formatting that break the dialer link
  // in Gmail. Keep only digits and a leading "+".
  const telHref = `tel:${data.phone.replace(/[^\d+]/g, '')}`;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
</head>
<body style="font-family: Arial, sans-serif; padding: 20px;">
  <h2 style="color: #db2777;">
    Új konzultáció kérés! ${priorityBadge}
  </h2>

  <!-- Key info at the top for quick action -->
  <div style="background: #fdf2f8; border: 2px solid #f9a8d4; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
    <table style="border-collapse: collapse; width: 100%;">
      <tr>
        <td style="padding: 8px 10px; font-weight: bold; color: #6b7280; width: 130px;">Név:</td>
        <td style="padding: 8px 10px; font-weight: bold; font-size: 18px; color: #1f2937;">${escapeHtml(data.name)}</td>
      </tr>
      <tr>
        <td style="padding: 8px 10px; font-weight: bold; color: #6b7280;">Telefon:</td>
        <td style="padding: 8px 10px;">
          <a href="${telHref}" style="color: #db2777; font-weight: bold; font-size: 18px; text-decoration: none;">${escapeHtml(data.phone)}</a>
        </td>
      </tr>
      <tr>
        <td style="padding: 8px 10px; font-weight: bold; color: #6b7280;">Érdeklődés:</td>
        <td style="padding: 8px 10px; font-weight: bold; font-size: 16px; color: #7c3aed;">${escapeHtml(data.product)}</td>
      </tr>
    </table>
  </div>

  <!-- Bulletproof, centered call button (bgcolor fallback for clients that strip gradients) -->
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin: 0 auto 16px;">
    <tr>
      <td align="center" bgcolor="#ec4899" style="border-radius: 12px; background: linear-gradient(135deg, #ec4899, #f43f5e);">
        <a href="${telHref}" style="display: inline-block; padding: 14px 28px; color: #ffffff; text-decoration: none; font-weight: bold; font-size: 16px; border-radius: 12px;">📞 Hívás indítása</a>
      </td>
    </tr>
  </table>
  <div style="clear: both; height: 0; line-height: 0;">&nbsp;</div>

  <!-- Full details -->
  <table style="border-collapse: collapse; width: 100%; max-width: 500px;">
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #f3e8ff; font-weight: bold; color: #6b7280; width: 130px;">Lead ID:</td>
      <td style="padding: 10px; border-bottom: 1px solid #f3e8ff;">${escapeHtml(data.leadId)}</td>
    </tr>
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #f3e8ff; font-weight: bold; color: #6b7280;">Email:</td>
      <td style="padding: 10px; border-bottom: 1px solid #f3e8ff;">
        <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a>
      </td>
    </tr>
    <tr style="background: ${isHot ? '#fef2f2' : '#fdf2f8'};">
      <td style="padding: 10px; border-bottom: 1px solid #f3e8ff; font-weight: bold; color: #6b7280;">Vásárlás időzítése:</td>
      <td style="padding: 10px; border-bottom: 1px solid #f3e8ff; font-weight: bold; color: ${isHot ? '#dc2626' : '#1f2937'};">
        ${escapeHtml(TIMELINE_LABELS[data.timeline] || data.timeline)} ${isHot ? '🔥' : ''}
      </td>
    </tr>
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #f3e8ff; font-weight: bold; color: #6b7280;">Szalon típus:</td>
      <td style="padding: 10px; border-bottom: 1px solid #f3e8ff;">${escapeHtml(BUSINESS_LABELS[data.businessType] || data.businessType)}</td>
    </tr>
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #f3e8ff; font-weight: bold; color: #6b7280;">Tapasztalat:</td>
      <td style="padding: 10px; border-bottom: 1px solid #f3e8ff;">${escapeHtml(EXPERIENCE_LABELS[data.experience] || data.experience)}</td>
    </tr>
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #f3e8ff; font-weight: bold; color: #6b7280;">GDPR hozzájárulás:</td>
      <td style="padding: 10px; border-bottom: 1px solid #f3e8ff;">${data.gdprConsent ? 'Igen' : 'Nem'} (${data.gdprTimestamp})</td>
    </tr>
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #f3e8ff; font-weight: bold; color: #6b7280;">Forrás:</td>
      <td style="padding: 10px; border-bottom: 1px solid #f3e8ff; font-size: 12px; color: #6b7280;">${escapeHtml(data.sourceUrl)}</td>
    </tr>
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #f3e8ff; font-weight: bold; color: #6b7280;">Időpont:</td>
      <td style="padding: 10px; border-bottom: 1px solid #f3e8ff;">${new Date(data.timestamp).toLocaleString('hu-HU')}</td>
    </tr>
    ${data.referrer ? `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #f3e8ff; font-weight: bold; color: #6b7280;">Referrer:</td>
      <td style="padding: 10px; border-bottom: 1px solid #f3e8ff; font-size: 12px; word-break: break-all;">${escapeHtml(data.referrer)}</td>
    </tr>
    ` : ''}
    ${data.utmSource || data.utmMedium || data.utmCampaign ? `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #f3e8ff; font-weight: bold; color: #6b7280;">UTM:</td>
      <td style="padding: 10px; border-bottom: 1px solid #f3e8ff; font-size: 12px;">
        ${escapeHtml(data.utmSource || '-')} / ${escapeHtml(data.utmMedium || '-')} / ${escapeHtml(data.utmCampaign || '-')}
      </td>
    </tr>
    ` : ''}
    ${data.utmTerm || data.utmContent ? `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #f3e8ff; font-weight: bold; color: #6b7280;">UTM term/content:</td>
      <td style="padding: 10px; border-bottom: 1px solid #f3e8ff; font-size: 12px;">${escapeHtml(data.utmTerm || '-')} / ${escapeHtml(data.utmContent || '-')}</td>
    </tr>
    ` : ''}
    ${data.gclid ? `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #f3e8ff; font-weight: bold; color: #6b7280;">gclid:</td>
      <td style="padding: 10px; border-bottom: 1px solid #f3e8ff; font-family: 'Courier New', monospace; font-size: 11px; word-break: break-all;">${escapeHtml(data.gclid)}</td>
    </tr>
    ` : ''}
    ${data.fbclid ? `
    <tr>
      <td style="padding: 10px; font-weight: bold; color: #6b7280;">fbclid:</td>
      <td style="padding: 10px; font-family: 'Courier New', monospace; font-size: 11px; word-break: break-all;">${escapeHtml(data.fbclid)}</td>
    </tr>
    ` : ''}
  </table>
</body>
</html>
  `.trim();
}

// ============================================
// CRM WEBHOOK INTEGRATION
// ============================================

/**
 * Send consultation lead data to CRM via webhook
 * Uses the same schema as the CRM's /api/webhook/lead endpoint
 */
async function sendToCrm(data: ConsultationLeadData): Promise<void> {
  const crmWebhookUrl = readEnv('CRM_WEBHOOK_URL');
  const crmWebhookSecret = readEnv('CRM_WEBHOOK_SECRET');

  if (!crmWebhookUrl || !crmWebhookSecret) {
    console.warn('CRM_WEBHOOK_URL or CRM_WEBHOOK_SECRET not configured, skipping CRM');
    return;
  }

  const response = await fetch(crmWebhookUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${crmWebhookSecret}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: data.name,
      phone: data.phone,
      email: data.email,
      need_type: data.product,
      utm_source: data.utmSource || 'skinlabhungary.hu',
      marketing_consent: data.gdprConsent,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`CRM webhook returned ${response.status}: ${error}`);
  }
}
