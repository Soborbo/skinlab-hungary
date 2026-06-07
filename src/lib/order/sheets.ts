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

/** A rendelések füle a táblázatban. */
const ORDER_SHEET_NAME = 'Rendelések';

/**
 * Fejléc sor a "Rendelések" fülhöz - a `processOrder` által írt A:AA
 * oszlopokkal egyezik (18 rendelés-oszlop + 9 attribúció-oszlop). Csak
 * akkor íródik ki, amikor a kód maga hozza létre a hiányzó fület.
 */
const ORDER_SHEET_HEADER: string[] = [
  'Dátum', // A
  'Rendelésszám', // B
  'Nyelv', // C
  'Vezetéknév', // D
  'Keresztnév', // E
  'Cégnév', // F
  'Adószám', // G
  'E-mail', // H
  'Telefon', // I
  'Ország', // J
  'Irányítószám', // K
  'Város', // L
  'Utca, házszám', // M
  'Tételek', // N
  'Részösszeg (Ft)', // O
  'Ár egyeztetés alatt', // P
  'Megjegyzés', // Q
  'Forrás URL', // R
  'UTM source', // S
  'UTM medium', // T
  'UTM campaign', // U
  'UTM term', // V
  'UTM content', // W
  'Google Click ID', // X
  'Facebook Click ID', // Y
  'Referrer', // Z
  'User-Agent', // AA
];

/** Egy vagy több sor hozzáfűzése a "Rendelések" fül A:AA tartományához. */
async function appendRows(
  spreadsheetId: string,
  accessToken: string,
  rows: (string | number)[][],
): Promise<Response> {
  // Range A:AA covers the original 18 order columns + 9 attribution columns
  // (UTM source/medium/campaign/term/content, gclid, fbclid, referrer,
  // user-agent).
  return fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(ORDER_SHEET_NAME)}!A:AA:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values: rows }),
    },
  );
}

/**
 * A "Rendelések" fül létrehozása a táblázatban. Ha már létezik (verseny-
 * helyzet két egyidejű rendelés között), a Sheets "already exists" hibát
 * elnyeljük - a hívó ezután úgyis újrapróbálja az append-et.
 */
async function createOrderSheet(spreadsheetId: string, accessToken: string): Promise<void> {
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requests: [{ addSheet: { properties: { title: ORDER_SHEET_NAME } } }],
      }),
    },
  );

  if (!response.ok) {
    const error = await response.text();
    if (!/already exists/i.test(error)) {
      throw new Error(`Failed to create "${ORDER_SHEET_NAME}" sheet: ${error}`);
    }
  }
}

/**
 * Egy rendelés sor hozzáfűzése a "Rendelések" fülhöz.
 *
 * - Ha nincs konfigurálva a spreadsheet, csendben kihagyja (nem dob hibát).
 * - Ha a "Rendelések" fül még nem létezik (a Sheets API "Unable to parse
 *   range" 400-zal jelzi), a kód létrehozza a fület egy fejléc sorral, majd
 *   újrapróbálja a beszúrást. Így az első rendelés nem bukik el csak azért,
 *   mert a fület még senki sem hozta létre kézzel - ez volt az `ORDER-PERSIST-001`
 *   gyökéroka, mivel a Sheets az order egyetlen "tartós csatornája".
 */
export async function appendOrderRow(env: OrderEnv, row: (string | number)[]): Promise<void> {
  const spreadsheetId = getEnvValue(env, 'GOOGLE_SHEETS_SPREADSHEET_ID');
  if (!spreadsheetId) {
    console.warn('[order] GOOGLE_SHEETS_SPREADSHEET_ID not configured, skipping sheets');
    return;
  }

  const accessToken = await getGoogleAccessToken(env);

  let response = await appendRows(spreadsheetId, accessToken, [row]);

  // A hiányzó fülre az append "Unable to parse range: Rendelések!A:AA"
  // 400-zal válaszol. Ilyenkor létrehozzuk a fület + fejlécet és újrapróbáljuk.
  if (!response.ok) {
    const error = await response.text();
    const sheetMissing = response.status === 400 && /unable to parse range/i.test(error);
    if (!sheetMissing) {
      throw new Error(`Failed to save order to Google Sheets: ${error}`);
    }

    console.warn(`[order] "${ORDER_SHEET_NAME}" sheet missing - creating it now`);
    await createOrderSheet(spreadsheetId, accessToken);

    // Friss fül: előbb a fejléc, majd a tényleges sor kerül be.
    response = await appendRows(spreadsheetId, accessToken, [ORDER_SHEET_HEADER, row]);
    if (!response.ok) {
      const retryError = await response.text();
      throw new Error(
        `Failed to save order after creating "${ORDER_SHEET_NAME}" sheet: ${retryError}`,
      );
    }
  }
}
