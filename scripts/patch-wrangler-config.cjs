/**
 * Post-build patch for dist/server/wrangler.json
 *
 * The @astrojs/cloudflare adapter generates a SESSION KV binding without an `id`,
 * which works for Pages auto-provisioning but fails on `wrangler deploy` for Workers.
 * This script injects the production KV namespace ID after every build.
 *
 * KV namespace `skinlab-hungary-session` is provisioned once; ID is stable.
 */
const fs = require('fs');
const path = require('path');

const SESSION_KV_ID = '8e0cf4b9bc294757aebc764a9e7f9a57';
const CONFIG_PATH = path.resolve(__dirname, '../dist/server/wrangler.json');

if (!fs.existsSync(CONFIG_PATH)) {
  console.warn(`[patch-wrangler-config] ${CONFIG_PATH} not found — skipping (run after astro build).`);
  process.exit(0);
}

const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));

let patched = false;
for (const ns of config.kv_namespaces ?? []) {
  if (ns.binding === 'SESSION' && !ns.id) {
    ns.id = SESSION_KV_ID;
    patched = true;
  }
}
for (const ns of config.previews?.kv_namespaces ?? []) {
  if (ns.binding === 'SESSION' && !ns.id) {
    ns.id = SESSION_KV_ID;
    patched = true;
  }
}

if (patched) {
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config));
  console.log(`[patch-wrangler-config] Injected SESSION KV id (${SESSION_KV_ID}).`);
} else {
  console.log('[patch-wrangler-config] No patching needed (SESSION binding already has id).');
}
