/**
 * Build-time guard: a Turnstile widget TÉNYLEG benne van-e a legenerált HTML-ben.
 *
 * Miért kell: a site key build-időben inline-olódik
 * (`import.meta.env.PUBLIC_TURNSTILE_SITE_KEY`, lásd src/lib/forms/turnstile.ts),
 * az űrlap-komponensek pedig `{turnstileSiteKey && …}` feltétellel renderelik a
 * widgetet. Ha a kulcs hiányzik a build környezetéből (lokális `.env` VAGY a
 * Cloudflare Workers Build variable), a build HIBA NÉLKÜL lefut, csak épp
 * widget nélküli oldalak születnek — a szerver viszont fail-closed:
 *   kapcsolat/konzultáció → 422 FORM-ZOD-002 (cf-turnstile-response kötelező)
 *   megrendelés           → ORDER-TURN-001
 * Vagyis EGYETLEN lead sem jut át, némán. Ez már kétszer megtörtént
 * (2026-07-12/13-i deploy: 11 napnyi lead elveszett).
 *
 * Ezért az OUTPUTOT ellenőrizzük, nem az env-változót: bármi is okozza a widget
 * eltűnését, itt bukik el a build a deploy ELŐTT.
 */
const fs = require('fs');
const path = require('path');

const clientDir = path.join(__dirname, '..', 'dist', 'client');

/** [fájl, mit kell tartalmaznia, emberi név] */
const CHECKS = [
  ['kapcsolat/index.html', 'data-sitekey="0x', 'kapcsolati űrlap'],
  ['konzultacio/index.html', 'data-sitekey="0x', 'konzultáció wizard'],
  ['megrendeles/index.html', '"hasTurnstile":true', 'megrendelés (checkout)'],
];

const failures = [];

for (const [relPath, needle, label] of CHECKS) {
  const filePath = path.join(clientDir, relPath);
  if (!fs.existsSync(filePath)) {
    failures.push(`${label}: nincs meg a legenerált oldal (${relPath})`);
    continue;
  }
  if (!fs.readFileSync(filePath, 'utf8').includes(needle)) {
    failures.push(`${label}: hiányzik a Turnstile widget (${relPath} nem tartalmazza: ${needle})`);
  }
}

if (failures.length > 0) {
  console.error('\n[verify-turnstile-build] BUILD MEGÁLLÍTVA — a Turnstile widget hiányzik:');
  for (const failure of failures) console.error(`  ✗ ${failure}`);
  console.error(
    '\n  Ok szinte biztosan: PUBLIC_TURNSTILE_SITE_KEY nincs a build környezetében.\n' +
      '  - lokális build: tedd be a .env-be (lásd .env.example)\n' +
      '  - Cloudflare Workers Build: Settings → Build → Variables and secrets\n' +
      '  Widget nélkül MINDEN űrlapbeküldést elutasít a szerver (422 / ORDER-TURN-001),\n' +
      '  ezért ez a build nem deployolható.\n',
  );
  process.exit(1);
}

console.log('[verify-turnstile-build] OK — Turnstile widget megvan mindhárom űrlapon.');
