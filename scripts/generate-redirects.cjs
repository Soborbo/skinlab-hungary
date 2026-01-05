/**
 * Generate 301 redirects for Cloudflare Pages
 * Maps old ShopRenter URLs to new category-based URLs
 *
 * Usage: node scripts/generate-redirects.cjs
 */

const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

const EXCEL_PATH = path.join(__dirname, '../../../skinlab-xlsx-export-2026-01-03_10_33_31.xlsx');
const PRODUCTS_DIR = path.join(__dirname, '../src/content/products');
const OUTPUT_PATH = path.join(__dirname, '../public/_redirects');

// Read Excel
const wb = XLSX.readFile(EXCEL_PATH);
const sheet = wb.Sheets[wb.SheetNames[0]];
const data = XLSX.utils.sheet_to_json(sheet, { defval: '' });

// Get all product JSON files and build slug -> categorySlug map
const productFiles = fs.readdirSync(PRODUCTS_DIR).filter(f => f.endsWith('.json') && !f.startsWith('_'));

const slugToCategory = new Map();
productFiles.forEach(file => {
  const product = JSON.parse(fs.readFileSync(path.join(PRODUCTS_DIR, file), 'utf-8'));
  slugToCategory.set(product.slug, product.categorySlug);
});

console.log(`Loaded ${slugToCategory.size} products\n`);

// Manual mappings for variants and products without JSON files
// These redirect to their parent product or category
const manualMappings = {
  // NyxQueen color variants -> main NyxQueen product
  'nxyqueenrosegold': '/diodalezerek/nyxqueen_4wave_diodalezer',
  'nyxqueen_crystalfrost': '/diodalezerek/nyxqueen_4wave_diodalezer',
  'nyxqueen_snowwhite': '/diodalezerek/nyxqueen_4wave_diodalezer',
  'nyxqueen_peony': '/diodalezerek/nyxqueen_4wave_diodalezer',
  'nyxqueen_champagnegold': '/diodalezerek/nyxqueen_4wave_diodalezer',

  // LaSeQueen variant
  'lasequeen-q-kapcsolt-ndyag-lezer-803': '/nd-yag-lezerek/yag-lasequeen',

  // Mast OceanHeart needle modules -> main product
  'mast-oceanheart-tumodul-025mm-3rl': '/kellekek/mast-oceanheart-tumodul-030mm-1rl',
  'mast-oceanheart-tumodul-025mm-1rl': '/kellekek/mast-oceanheart-tumodul-030mm-1rl',
  'mast-oceanheart-tumodul-020-1rl': '/kellekek/mast-oceanheart-tumodul-030mm-1rl',
  'mast-oceanheart-tumodul-035mm-1rl': '/kellekek/mast-oceanheart-tumodul-030mm-1rl',
  'mast-oceanheart-tumodul018-1rl': '/kellekek/mast-oceanheart-tumodul-030mm-1rl',
  'mast-oceanheart-tumodul-035mm-1rl-787': '/kellekek/mast-oceanheart-tumodul-030mm-1rl',

  // WJX needle modules -> main product
  'wjx-tumodul-025-1rl-791': '/kellekek/wjxtumodul',
  'wjx-tumodul-025-3rl-794': '/kellekek/wjxtumodul',
  'wjx-tumodul-030-1rl-797': '/kellekek/wjxtumodul',

  // Mast P60 variants
  'mast-p60-premium-sminktetovalo-gep-allithato-lokethosszal-620': '/sminktetovalas/mast-p60-premium-sminktetovalo-gep-allithato-lokethosszal',
  'mast-p60-premium-sminktetovalo-gep-allithato-lokethosszal-': '/sminktetovalas/mast-p60-premium-sminktetovalo-gep-allithato-lokethosszal',

  // OxygenX pod variants -> main pod product
  'oxygenx-pod-szett-retouch-pod-725': '/kellekek/oxygenx-pod-szett-glam-pod',
  'oxygenx-pod-szett-illuminate-pod-740': '/kellekek/oxygenx-pod-szett-glam-pod',
  'oxygenx-pod-szett-revive-pod-743': '/kellekek/oxygenx-pod-szett-glam-pod',
  'oxygenx-pod-szett-retouch-pod': '/kellekek/oxygenx-pod-szett-glam-pod',
  'oxygenx-pod-szett-hydrate-pod': '/kellekek/oxygenx-pod-szett-glam-pod',
  'oxygenx-pod-szett-detox-pod': '/kellekek/oxygenx-pod-szett-glam-pod',

  // HydraLiquid variants -> main product
  'hydraliquid_lifting': '/kellekek/hydraliquid_peeling',
  'hydraliquid_borvilagosito': '/kellekek/hydraliquid_peeling',
  'hydraliquid_hegyikristallyal': '/kellekek/hydraliquid_peeling',
  'hydraliquid_hidratalo': '/kellekek/hydraliquid_peeling',
  'hydraliquid_feltolto': '/kellekek/hydraliquid_peeling',

  // Trolley variants -> main trolley
  'arctictrolley-842': '/szalonberendezes/snowlinetrolley-839',
  'frostlinetrolley-845': '/szalonberendezes/snowlinetrolley-839',
};

// Generate redirects
const redirects = [];
const processedSlugs = new Set();

data.forEach(row => {
  const slug = row['Termék URL '] || '';
  if (!slug || processedSlugs.has(slug)) return;
  processedSlugs.add(slug);

  let newUrl;

  // Check manual mappings first
  if (manualMappings[slug]) {
    newUrl = manualMappings[slug];
  } else {
    const categorySlug = slugToCategory.get(slug);
    if (!categorySlug) {
      console.log(`⚠️  No mapping found for slug: ${slug}`);
      return;
    }
    newUrl = `/${categorySlug}/${slug}`;
  }

  // Old ShopRenter formats that might exist in Google index:
  // 1. /product/{slug}
  // 2. /termek/{slug} (Hungarian)
  // 3. /{slug} (direct - ShopRenter sometimes uses this)
  redirects.push(`/product/${slug} ${newUrl} 301`);
  redirects.push(`/termek/${slug} ${newUrl} 301`);
  redirects.push(`/${slug} ${newUrl} 301`);
});

// Add category redirects (if old shop had different category URLs)
const categoryRedirects = `
# Category redirects
/dioda-lezer /diodalezerek 301
/dioda-lezerek /diodalezerek 301
/diodalezeres-szortelenito /diodalezerek 301
/hydro-facial /hydrafacial 301
/hidrodermabrazio /hydrafacial 301
/nd-yag /nd-yag-lezerek 301
/ndyag /nd-yag-lezerek 301
/pico /pico-lezerek 301
/pico-laser /pico-lezerek 301
/smink-tetovalas /sminktetovalas 301
/smink-tetovalo /sminktetovalas 301
/tetovalo /tetovalogepek 301
/tetovalo-gep /tetovalogepek 301
/szalon /szalonberendezes 301
/szalon-berendezes /szalonberendezes 301
/anti-age /anti-aging 301
/antiaging /anti-aging 301
/kellek /kellekek 301
/termekek /diodalezerek 301
/products /diodalezerek 301
`;

// Write _redirects file for Cloudflare Pages
const redirectsContent = `# SkinLab Hungary - 301 Redirects
# Generated: ${new Date().toISOString()}
# Maps old ShopRenter URLs to new Astro category-based URLs

# Product redirects (${redirects.length} rules)
${redirects.join('\n')}
${categoryRedirects}
# Catch-all for old product paths without match (optional - comment out if not needed)
# /product/* /:splat 301
`;

fs.writeFileSync(OUTPUT_PATH, redirectsContent, 'utf-8');

console.log(`\n${'='.repeat(50)}`);
console.log(`Generated ${redirects.length} product redirects`);
console.log(`Output: ${OUTPUT_PATH}`);
