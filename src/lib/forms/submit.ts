/**
 * Form submission handling
 * Based on astro-forms skill
 *
 * Uses Google Sheets API for lead storage
 */
import type { ContactFormData, ConsultationFormData } from './schemas';
import { generateLeadId, anonymizeIp } from './schemas';

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
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
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
 * Process form submission
 */
export async function processFormSubmission(
  data: ContactFormData,
  ip: string
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
  };

  try {
    // 1. Send to Google Sheets (primary storage)
    await sendToGoogleSheets(leadData);

    // 2. Send confirmation email
    await sendConfirmationEmail(leadData);

    // 3. Send notification email to team
    await sendNotificationEmail(leadData);

    return { success: true, leadId };
  } catch (error) {
    console.error('Form submission failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Submission failed'
    };
  }
}

/**
 * Get Google OAuth2 access token using service account
 */
async function getGoogleAccessToken(): Promise<string> {
  // Check cached token
  if (cachedToken && cachedToken.expires_at > Date.now() + 60000) {
    return cachedToken.access_token;
  }

  const clientEmail = import.meta.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = import.meta.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n');

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
async function sendToGoogleSheets(data: LeadData): Promise<void> {
  const spreadsheetId = import.meta.env.GOOGLE_SHEETS_SPREADSHEET_ID;

  if (!spreadsheetId) {
    console.warn('GOOGLE_SHEETS_SPREADSHEET_ID not configured, skipping sheets');
    return;
  }

  const accessToken = await getGoogleAccessToken();

  // Prepare row data (order must match sheet columns)
  const rowData = [
    data.leadId,
    data.timestamp,
    data.name,
    data.email,
    data.phone,
    data.product,
    data.message || '',
    data.sourceUrl,
    data.ipHash,
    data.gdprConsent ? 'Igen' : 'Nem',
    data.gdprTimestamp,
    data.utmSource || '',
    data.utmMedium || '',
    data.utmCampaign || '',
  ];

  // Append to sheet (sheet name: "Kapcsolat")
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Kapcsolat!A:N:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
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
    throw new Error(`Failed to save to Google Sheets: ${error}`);
  }
}

/**
 * Send confirmation email to customer
 */
async function sendConfirmationEmail(data: LeadData): Promise<void> {
  const resendApiKey = import.meta.env.RESEND_API_KEY;

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
      from: 'SkinLab Hungary <noreply@skinlabhungary.hu>',
      to: [data.email],
      subject: 'Köszönjük megkeresését - SkinLab Hungary',
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
async function sendNotificationEmail(data: LeadData): Promise<void> {
  const resendApiKey = import.meta.env.RESEND_API_KEY;
  const notifyEmail = import.meta.env.NOTIFY_EMAIL || 'info@skinlabhungary.hu';

  if (!resendApiKey) {
    return;
  }

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'SkinLab Forms <forms@skinlabhungary.hu>',
      to: [notifyEmail],
      subject: `Új érdeklődő: ${data.name} - ${data.product}`,
      html: generateNotificationEmailHtml(data),
    }),
  });
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
    <h1 style="color: #0070c4; margin: 0;">SkinLab Hungary</h1>
    <p style="color: #666; margin: 5px 0 0;">laser&beauty equipment</p>
  </div>

  <h2 style="color: #333;">Kedves ${escapeHtml(data.name)}!</h2>

  <p>Köszönjük, hogy felkereste a SkinLab Hungary-t!</p>

  <p>Megkaptuk az érdeklődését és hamarosan felvesszük Önnel a kapcsolatot
  a megadott telefonszámon: <strong>${escapeHtml(data.phone)}</strong></p>

  <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <h3 style="margin-top: 0; color: #333;">Az Ön által megadott adatok:</h3>
    <p><strong>Érdeklődés tárgya:</strong> ${escapeHtml(data.product)}</p>
    ${data.message ? `<p><strong>Üzenet:</strong> ${escapeHtml(data.message)}</p>` : ''}
  </div>

  <p>Amennyiben sürgős kérdése van, hívjon minket bátran:</p>
  <p style="font-size: 20px; font-weight: bold; color: #0070c4;">
    <a href="tel:+36704136819" style="color: #0070c4; text-decoration: none;">+36 70 413 6819</a>
  </p>

  <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">

  <p style="color: #888; font-size: 12px;">
    Ez az email automatikusan lett küldve. Kérjük, ne válaszoljon rá.<br>
    SkinLab Beauty Equipment Kft. | 2030 Érd, Budai út 28.<br>
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
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
</head>
<body style="font-family: Arial, sans-serif; padding: 20px;">
  <h2 style="color: #0070c4;">Új érdeklődő!</h2>

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
      <td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></td>
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
    ${data.utmSource ? `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>UTM:</strong></td>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${escapeHtml(data.utmSource)} / ${data.utmMedium ? escapeHtml(data.utmMedium) : '-'} / ${data.utmCampaign ? escapeHtml(data.utmCampaign) : '-'}</td>
    </tr>
    ` : ''}
  </table>

  <p style="margin-top: 20px;">
    <a href="tel:${escapeHtml(data.phone)}" style="display: inline-block; background: #0070c4; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px;">
      Hívás indítása
    </a>
  </p>
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
  ip: string
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
  };

  try {
    // 1. Send to Google Sheets
    await sendConsultationToGoogleSheets(leadData);

    // 2. Send confirmation email
    await sendConsultationConfirmationEmail(leadData);

    // 3. Send notification email to team
    await sendConsultationNotificationEmail(leadData);

    return { success: true, leadId };
  } catch (error) {
    console.error('Consultation form submission failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Submission failed',
    };
  }
}

/**
 * Send consultation lead data to Google Sheets
 */
async function sendConsultationToGoogleSheets(data: ConsultationLeadData): Promise<void> {
  const spreadsheetId = import.meta.env.GOOGLE_SHEETS_SPREADSHEET_ID;

  if (!spreadsheetId) {
    console.warn('GOOGLE_SHEETS_SPREADSHEET_ID not configured, skipping sheets');
    return;
  }

  const accessToken = await getGoogleAccessToken();

  // Prepare row data for Konzultáció sheet
  const rowData = [
    data.leadId,
    data.timestamp,
    data.name,
    data.email,
    data.phone,
    data.product,
    TIMELINE_LABELS[data.timeline] || data.timeline,
    BUSINESS_LABELS[data.businessType] || data.businessType,
    EXPERIENCE_LABELS[data.experience] || data.experience,
    data.sourceUrl,
    data.ipHash,
    data.gdprConsent ? 'Igen' : 'Nem',
    data.gdprTimestamp,
    data.utmSource || '',
    data.utmMedium || '',
    data.utmCampaign || '',
  ];

  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Konzultáció!A:P:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
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
    throw new Error(`Failed to save to Google Sheets: ${error}`);
  }
}

/**
 * Send consultation confirmation email to customer
 */
async function sendConsultationConfirmationEmail(data: ConsultationLeadData): Promise<void> {
  const resendApiKey = import.meta.env.RESEND_API_KEY;

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
      from: 'SkinLab Hungary <noreply@skinlabhungary.hu>',
      to: [data.email],
      subject: 'Köszönjük konzultáció kérését - SkinLab Hungary',
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
async function sendConsultationNotificationEmail(data: ConsultationLeadData): Promise<void> {
  const resendApiKey = import.meta.env.RESEND_API_KEY;
  const notifyEmail = import.meta.env.NOTIFY_EMAIL || 'info@skinlabhungary.hu';

  if (!resendApiKey) {
    return;
  }

  // Determine priority based on timeline
  const isHot = data.timeline === 'asap';
  const subject = isHot
    ? `🔥 FORRÓ LEAD: ${data.name} - ${data.product}`
    : `Új konzultáció: ${data.name} - ${data.product}`;

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'SkinLab Forms <forms@skinlabhungary.hu>',
      to: [notifyEmail],
      subject,
      html: generateConsultationNotificationEmailHtml(data),
    }),
  });
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
      <h1 style="color: #db2777; margin: 0; font-size: 24px;">SkinLab Hungary</h1>
      <p style="color: #9ca3af; margin: 4px 0 0; font-size: 14px;">laser&beauty equipment</p>
    </div>

    <h2 style="color: #1f2937; text-align: center; font-size: 20px;">Köszönjük, ${escapeHtml(data.name)}!</h2>

    <p style="color: #4b5563; text-align: center; line-height: 1.6;">
      Megkaptuk konzultáció kérését.<br>
      <strong>Hamarosan felvesszük Önnel a kapcsolatot!</strong>
    </p>

    <div style="background: #fdf2f8; padding: 20px; border-radius: 12px; margin: 24px 0;">
      <h3 style="margin: 0 0 16px; color: #1f2937; font-size: 16px;">Az Ön által megadott adatok:</h3>
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

    <p style="color: #4b5563; text-align: center;">Sürgős kérdés esetén hívjon minket:</p>
    <p style="text-align: center;">
      <a href="tel:+36704136819" style="color: #db2777; font-size: 22px; font-weight: bold; text-decoration: none;">
        +36 70 413 6819
      </a>
    </p>

    <hr style="border: none; border-top: 1px solid #f3e8ff; margin: 24px 0;">

    <p style="color: #9ca3af; font-size: 11px; text-align: center; line-height: 1.5;">
      Ez az email automatikusan lett küldve. Kérjük, ne válaszoljon rá.<br>
      SkinLab Beauty Equipment Kft. | 2030 Érd, Budai út 28.<br>
      Hivatkozási szám: ${data.leadId}
    </p>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Generate consultation notification email HTML for team
 */
function generateConsultationNotificationEmailHtml(data: ConsultationLeadData): string {
  const isHot = data.timeline === 'asap';
  const priorityBadge = isHot
    ? '<span style="background: #ef4444; color: white; padding: 4px 12px; border-radius: 999px; font-size: 12px; font-weight: bold;">FORRÓ LEAD</span>'
    : '';

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

  <table style="border-collapse: collapse; width: 100%; max-width: 500px;">
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #f3e8ff; font-weight: bold; color: #6b7280; width: 130px;">Lead ID:</td>
      <td style="padding: 10px; border-bottom: 1px solid #f3e8ff;">${escapeHtml(data.leadId)}</td>
    </tr>
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #f3e8ff; font-weight: bold; color: #6b7280;">Név:</td>
      <td style="padding: 10px; border-bottom: 1px solid #f3e8ff; font-weight: bold; font-size: 16px;">${escapeHtml(data.name)}</td>
    </tr>
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #f3e8ff; font-weight: bold; color: #6b7280;">Telefon:</td>
      <td style="padding: 10px; border-bottom: 1px solid #f3e8ff;">
        <a href="tel:${escapeHtml(data.phone)}" style="color: #db2777; font-weight: bold; font-size: 16px;">${escapeHtml(data.phone)}</a>
      </td>
    </tr>
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #f3e8ff; font-weight: bold; color: #6b7280;">Email:</td>
      <td style="padding: 10px; border-bottom: 1px solid #f3e8ff;">
        <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a>
      </td>
    </tr>
    <tr style="background: #fdf2f8;">
      <td style="padding: 10px; border-bottom: 1px solid #f3e8ff; font-weight: bold; color: #6b7280;">Termék:</td>
      <td style="padding: 10px; border-bottom: 1px solid #f3e8ff; font-weight: bold;">${escapeHtml(data.product)}</td>
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
      <td style="padding: 10px; border-bottom: 1px solid #f3e8ff; font-weight: bold; color: #6b7280;">Forrás:</td>
      <td style="padding: 10px; border-bottom: 1px solid #f3e8ff; font-size: 12px; color: #6b7280;">${escapeHtml(data.sourceUrl)}</td>
    </tr>
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #f3e8ff; font-weight: bold; color: #6b7280;">Időpont:</td>
      <td style="padding: 10px; border-bottom: 1px solid #f3e8ff;">${new Date(data.timestamp).toLocaleString('hu-HU')}</td>
    </tr>
    ${data.utmSource ? `
    <tr>
      <td style="padding: 10px; font-weight: bold; color: #6b7280;">UTM:</td>
      <td style="padding: 10px; font-size: 12px; color: #6b7280;">
        ${escapeHtml(data.utmSource)} / ${data.utmMedium ? escapeHtml(data.utmMedium) : '-'} / ${data.utmCampaign ? escapeHtml(data.utmCampaign) : '-'}
      </td>
    </tr>
    ` : ''}
  </table>

  <p style="margin-top: 24px;">
    <a href="tel:${escapeHtml(data.phone)}" style="display: inline-block; background: linear-gradient(135deg, #ec4899, #f43f5e); color: white; padding: 14px 28px; text-decoration: none; border-radius: 12px; font-weight: bold;">
      📞 Hívás indítása
    </a>
  </p>
</body>
</html>
  `.trim();
}
