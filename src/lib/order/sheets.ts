/**
 * Google Sheets mentés a megrendelésekhez.
 *
 * A meglévő kapcsolati űrlap (`src/lib/forms/submit.ts`) ugyanezt a
 * service-account JWT auth mintát használja; itt az env-et explicit
 * átadjuk (Cloudflare Workers runtime kompatibilitás miatt), és a
 * rendelések egy külön "Rendelések" fülre kerülnek.
 */
import type { OrderEnv } from './env';
import { getEnvValue } from './env';

interface GoogleAuthToken {
  access_token: string;
  expires_at: number;
}

let cachedToken: GoogleAuthToken | null = null;

/** Google OAuth2 access token service-account JWT-vel (Web Crypto, CF-kompatibilis) */
async function getGoogleAccessToken(env: OrderEnv): Promise<string> {
  if (cachedToken && cachedToken.expires_at > Date.now() + 60000) {
    return cachedToken.access_token;
  }

  const clientEmail = getEnvValue(env, 'GOOGLE_SERVICE_ACCOUNT_EMAIL');
  const privateKeyRaw = getEnvValue(env, 'GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY');
  if (!clientEmail || !privateKeyRaw) {
    throw new Error('Google service account credentials not configured');
  }
  const privateKey = privateKeyRaw.replace(/\\n/g, '\n');

  const header = { alg: 'RS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const claim = {
    iss: clientEmail,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  };

  const base64url = (obj: object) =>
    btoa(JSON.stringify(obj)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

  const unsignedToken = `${base64url(header)}.${base64url(claim)}`;

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
    ['sign'],
  );
  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    cryptoKey,
    new TextEncoder().encode(unsignedToken),
  );
  const signatureBase64 = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const jwt = `${unsignedToken}.${signatureBase64}`;

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

  const tokenData: { access_token: string; expires_in: number } = await tokenResponse.json();
  cachedToken = {
    access_token: tokenData.access_token,
    expires_at: Date.now() + tokenData.expires_in * 1000,
  };
  return tokenData.access_token;
}

/**
 * Egy rendelés sor hozzáfűzése a "Rendelések" fülhöz.
 * Ha nincs konfigurálva a spreadsheet, csendben kihagyja (nem dob hibát).
 */
export async function appendOrderRow(env: OrderEnv, row: (string | number)[]): Promise<void> {
  const spreadsheetId = getEnvValue(env, 'GOOGLE_SHEETS_SPREADSHEET_ID');
  if (!spreadsheetId) {
    console.warn('[order] GOOGLE_SHEETS_SPREADSHEET_ID not configured, skipping sheets');
    return;
  }

  const accessToken = await getGoogleAccessToken(env);

  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent('Rendelések')}!A:R:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values: [row] }),
    },
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to save order to Google Sheets: ${error}`);
  }
}
