/**
 * ONE-STEP REVERT — 2026-06-03 főoldali hero képcsere.
 *
 * Visszaállítja a hero forgató eredeti állapotát:
 *   - 2. slide: aios  → vissza Athena diódalézer
 *   - 3. slide: yag   → vissza Monduniq laser expert csomag
 *   - 4. slide: zold  → vissza HidraMIST Elite
 * Visszamásolja a HeroCarousel.astro és HomePage.astro fájlokat a mentésből,
 * és törli a csere során létrehozott új képeket.
 *
 * Futtatás:
 *   node scripts/revert-hero-imgswap-20260603.cjs
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const restores = [
  ['src/components/sections/HeroCarousel.astro.pre-imgswap-20260603.bak', 'src/components/sections/HeroCarousel.astro'],
  ['src/components/pages/HomePage.astro.pre-imgswap-20260603.bak', 'src/components/pages/HomePage.astro'],
];

const newImageBases = [
  'hero-aios-multifunkcios-kozmetikai-gep',
  'hero-q-kapcsolt-nd-yag-carbon-peeling',
  'hero-led-oxigenterapias-kezelogep',
];

let ok = true;

for (const [bak, target] of restores) {
  const bakPath = path.join(ROOT, bak);
  const targetPath = path.join(ROOT, target);
  if (!fs.existsSync(bakPath)) {
    console.warn(`  ⚠ Hiányzó mentés: ${bak} — ${target} kihagyva`);
    ok = false;
    continue;
  }
  fs.copyFileSync(bakPath, targetPath);
  fs.unlinkSync(bakPath);
  console.log(`  ↩ visszaállítva: ${target}`);
}

const heroDir = path.join(ROOT, 'public/hero');
for (const base of newImageBases) {
  for (const suf of ['', '-mobile']) {
    for (const ext of ['avif', 'webp', 'jpg']) {
      const f = path.join(heroDir, `${base}${suf}.${ext}`);
      if (fs.existsSync(f)) {
        fs.unlinkSync(f);
        console.log(`  ✗ törölve: ${path.relative(ROOT, f)}`);
      }
    }
  }
}

// A revert szkript törli önmagát is, hogy ne maradjon szemét.
fs.unlinkSync(__filename);
console.log(ok ? '\n✅ Visszavonás kész.' : '\n⚠ Visszavonás kész (figyelmeztetésekkel).');
