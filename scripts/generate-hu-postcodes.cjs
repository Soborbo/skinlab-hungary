#!/usr/bin/env node
/**
 * Magyar irányítószám → település / megye adat generálása.
 *
 * Forrás: GeoNames szabad (CC-BY) postai irányítószám adatbázis.
 *   https://download.geonames.org/export/zip/HU.zip  →  HU.txt
 *
 * Az HU.txt tab-tagolt oszlopai (GeoNames "postal code" séma):
 *   0 országkód  1 irányítószám  2 településnév  3 megye(admin1)  4 admin1-kód
 *   5 admin2     6 admin2-kód    7 admin3        8 admin3-kód     9 lat 10 lon 11 pontosság
 *
 * Használat:
 *   1) Töltsd le és csomagold ki: https://download.geonames.org/export/zip/HU.zip
 *   2) node scripts/generate-hu-postcodes.cjs <HU.txt elérési útja>
 *      (alapértelmezés: ./HU.txt a repó gyökerében)
 *
 * Kimenet: src/lib/forms/hu-postcodes.json
 *   { "1051": { "city": "Budapest", "county": "Budapest" },
 *     "2655": { "city": "Kétbodony", "county": "Nógrád", "alt": ["Kisecset","Szente"] } }
 *
 * A `city` az adott irányítószámhoz tartozó elsődleges település; `alt` (ha van)
 * a további, ugyanazon irányítószámon osztozó települések. A `county` a megye.
 */
const fs = require('fs');
const path = require('path');

const srcPath = process.argv[2] || path.join(process.cwd(), 'HU.txt');
const outPath = path.join(__dirname, '..', 'src', 'lib', 'forms', 'hu-postcodes.json');

if (!fs.existsSync(srcPath)) {
  console.error(`[hu-postcodes] Nem található a forrásfájl: ${srcPath}`);
  console.error('Töltsd le innen: https://download.geonames.org/export/zip/HU.zip (HU.txt a zipben)');
  process.exit(1);
}

const lines = fs.readFileSync(srcPath, 'utf8').split(/\r?\n/).filter(Boolean);

/** @type {Record<string, { city: string; county: string; alt?: string[] }>} */
const map = {};

for (const line of lines) {
  const cols = line.split('\t');
  const code = (cols[1] || '').trim();
  const place = (cols[2] || '').trim();
  const county = (cols[3] || '').trim();
  if (!/^\d{4}$/.test(code) || !place) continue;

  if (!map[code]) {
    map[code] = { city: place, county };
  } else if (place !== map[code].city && !(map[code].alt || []).includes(place)) {
    // Ugyanazon irányítószámon osztozó további település.
    (map[code].alt = map[code].alt || []).push(place);
  }
}

// Determinisztikus rendezés (irányítószám szerint), hogy a diff stabil legyen.
const sorted = {};
for (const code of Object.keys(map).sort()) sorted[code] = map[code];

fs.writeFileSync(outPath, JSON.stringify(sorted) + '\n', 'utf8');

const total = Object.keys(sorted).length;
const shared = Object.values(sorted).filter((v) => v.alt && v.alt.length).length;
console.log(`[hu-postcodes] ${total} irányítószám kiírva (${shared} osztott) → ${path.relative(process.cwd(), outPath)}`);
