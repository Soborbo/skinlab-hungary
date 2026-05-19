/**
 * Post-build patch for dist/server/wrangler.json
 *
 * The @astrojs/cloudflare adapter generates a SESSION KV binding without an `id`,
 * which works for Pages auto-provisioning but fails on `wrangler deploy` for Workers.
 * It also generates an empty `vars: {}`, so non-secret plaintext config that the
 * Worker reads via `cloudflare:workers#env` (e.g. the Google Sheets spreadsheet
 * id used by every form handler) silently resolves to undefined unless the
 * dashboard binding survives `wrangler deploy --keep-vars` — which it does not
 * reliably do across versions. This script injects both after every build.
 *
 * KV namespace `skinlab-hungary-session` is provisioned once; ID is stable.
 * GOOGLE_SHEETS_SPREADSHEET_ID is a public identifier (it appears in the
 * spreadsheet URL), so it is safe to commit here. Secrets (RESEND_API_KEY,
 * service-account private key, etc.) stay in the Cloudflare dashboard.
 */
const fs = require('fs');
const path = require('path');

const SESSION_KV_ID = '8e0cf4b9bc294757aebc764a9e7f9a57';
const GOOGLE_SHEETS_SPREADSHEET_ID = '1uvGHcXBMmf-nkYCHC9gigrFuiVQgVWuvqKtCG_KhPWE';
const CONFIG_PATH = path.resolve(__dirname, '../dist/server/wrangler.json');

if (!fs.existsSync(CONFIG_PATH)) {
  console.warn(`[patch-wrangler-config] ${CONFIG_PATH} not found — skipping (run after astro build).`);
  process.exit(0);
}

const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));

const patched = [];
for (const ns of config.kv_namespaces ?? []) {
  if (ns.binding === 'SESSION' && !ns.id) {
    ns.id = SESSION_KV_ID;
    patched.push(`SESSION KV id (${SESSION_KV_ID})`);
  }
}
for (const ns of config.previews?.kv_namespaces ?? []) {
  if (ns.binding === 'SESSION' && !ns.id) {
    ns.id = SESSION_KV_ID;
  }
}

config.vars = config.vars ?? {};
if (config.vars.GOOGLE_SHEETS_SPREADSHEET_ID !== GOOGLE_SHEETS_SPREADSHEET_ID) {
  config.vars.GOOGLE_SHEETS_SPREADSHEET_ID = GOOGLE_SHEETS_SPREADSHEET_ID;
  patched.push(`GOOGLE_SHEETS_SPREADSHEET_ID (${GOOGLE_SHEETS_SPREADSHEET_ID})`);
}

if (patched.length > 0) {
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config));
  console.log(`[patch-wrangler-config] Injected: ${patched.join(', ')}.`);
} else {
  console.log('[patch-wrangler-config] No patching needed.');
}
