/**
 * Excel to JSON Product Importer for SkinLab Hungary
 *
 * Usage: node scripts/import-products.js
 *
 * This script reads the UNAS export Excel file and generates
 * JSON files for Astro content collections.
 */

const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Path to Excel file
const EXCEL_PATH = path.join(__dirname, '../../..', 'skinlab-xlsx-export-2026-01-03_10_33_31.xlsx');
const OUTPUT_DIR = path.join(__dirname, '../src/content/products');

// Category mapping from UNAS to our slugs
const CATEGORY_MAP = {
  'HIEMT Alakformáló gépek': 'hiemt',
  'Diódalézeres szőrtelenítő készülékek': 'diodalezerek',
  'Diódalézeres szőrtelenítő készülékek;Q-kapcsolt ND:YAG lézerkészülékek': 'diodalezerek', // LUNOX 2in1
  'Q-kapcsolt ND:YAG lézerkészülékek': 'nd-yag-lezerek',
  'Q-kapcsolt ND:YAG lézerkészülékek/Kiegészítő eszközök lézerkészülékekhez': 'kellekek',
  'Picosekundumos lézerkészülékek': 'pico-lezerek',
  'Hidrodermabrázió, multifunkcionális kozmetikai kezelőgépek': 'hydrafacial',
  'Hidrodermabrázió, multifunkcionális kozmetikai kezelőgépek/Hydrofacial oldatok és kozmetikai kezelőanyagok': 'kellekek',
  'Anti-aging és bőrmegújító készülékek': 'anti-aging',
  'MAST sminktetováló eszközök': 'sminktetovalas',
  'MAST sminktetováló eszközök/MAST sminktetováló készülékek': 'sminktetovalas',
  'MAST sminktetováló eszközök/Sminktetováló tűmodulok': 'kellekek',
  'Tetoválógépek': 'tetovalogepek',
  'Mesterséges intelligencia bőranalízis (AI)': 'anti-aging',
  'Egyéb kozmetikai készülékek': 'hydrafacial', // OxyGenX
  'Kezelés és utóápolás ': 'kellekek',
  'Szalonberendezés/Kozmetikai ágyak': 'szalonberendezes',
  'Szalonberendezés/Eszközkocsi': 'szalonberendezes',
  'Szalonberendezés/Székek': 'szalonberendezes',
};

// Product variations - group these into single products
const VARIATION_GROUPS = {
  'nyxqueen-diodalezer': {
    baseName: 'NyxQueen Diódalézer',
    skus: ['NQ001', 'NQ02', 'NQ003', 'NQ004', 'NQ005', 'NQ006'],
  },
  'mast-p60-sminktetovalo': {
    baseName: 'MAST P60 Sminktetováló',
    skus: ['MP60gold', 'MP60rosegold', 'MP60PURPLE'],
  },
  'lasequeen-ndyag': {
    baseName: 'LaseQueen ND:YAG',
    skus: ['LASQUE001white', 'LASQUE001black'],
  },
  'mast-oceanheart-tumodulok': {
    baseName: 'Mast Oceanheart Tűmodulok',
    skus: ['MOH0301RL', 'MOH0253RL', 'MOH0251RL', 'MOH0201RL', 'MOH0351RL', 'MOH0181RL', 'MOH0303RL'],
  },
  'wjx-tumodulok': {
    baseName: 'WJX Tűmodulok',
    skus: ['wjx0251rl', 'wjx0253rl', 'wjx0301rl', 'wjx0351rl'],
  },
  'oxygenx-pod-szettek': {
    baseName: 'OxyGenX Pod Szettek',
    skus: ['oxyglam001', 'oxyretouch001', 'oxyillumh001', 'oxyrevive001', 'oxybalance001', 'oxyhydrate001', 'oxydetox001'],
  },
  'hydraliquid-oldatok': {
    baseName: 'HydraLiquid Oldatok',
    skus: ['FHLP1', 'HLB2', 'HLCV', 'HLRH', 'HLH3', 'HLH4'],
  },
  'kozmetikai-trolleyk': {
    baseName: 'Kozmetikai Trolley-k',
    skus: ['ST001', 'AT001', 'FLT001'],
  },
};

// Create reverse lookup: SKU -> group slug
const SKU_TO_GROUP = {};
Object.entries(VARIATION_GROUPS).forEach(([slug, group]) => {
  group.skus.forEach(sku => {
    SKU_TO_GROUP[sku] = slug;
  });
});

// Clean HTML from description
function cleanHtml(html) {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

// Generate slug from name
function generateSlug(name, existingSlugs) {
  let slug = name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  // Ensure uniqueness
  let finalSlug = slug;
  let counter = 1;
  while (existingSlugs.has(finalSlug)) {
    finalSlug = `${slug}-${counter}`;
    counter++;
  }
  existingSlugs.add(finalSlug);
  return finalSlug;
}

// Parse price string to number
function parsePrice(priceStr) {
  if (!priceStr) return null;
  const num = parseFloat(String(priceStr).replace(/[^\d.]/g, ''));
  return isNaN(num) ? null : num;
}

// Get availability status
function getAvailability(status) {
  if (status === 'Raktáron') return 'in_stock';
  if (status === 'Előrendelhető') return 'preorder';
  return 'out_of_stock';
}

// Extract variant info from product name
function extractVariant(name, sku) {
  // Color variants in parentheses
  const colorMatch = name.match(/\(([^)]+)\)$/);
  if (colorMatch) {
    return {
      type: 'color',
      name: colorMatch[1],
      value: colorMatch[1].toLowerCase().replace(/\s+/g, '-'),
    };
  }

  // Size variants for needle modules
  const sizeMatch = name.match(/(\d+\.\d+mm?\s*\d*R?L?)/i);
  if (sizeMatch) {
    return {
      type: 'size',
      name: sizeMatch[1],
      value: sizeMatch[1].toLowerCase().replace(/\s+/g, ''),
    };
  }

  // Pod type variants
  if (name.includes('POD')) {
    const podMatch = name.match(/(\w+)\s+POD/);
    if (podMatch) {
      return {
        type: 'variant',
        name: podMatch[1],
        value: podMatch[1].toLowerCase(),
      };
    }
  }

  // HydraLiquid variants
  if (name.includes('HydraLiquid')) {
    const varMatch = name.match(/\(([^)]+)\)/);
    if (varMatch) {
      return {
        type: 'variant',
        name: varMatch[1],
        value: varMatch[1].toLowerCase().replace(/[^a-z0-9]/g, '-'),
      };
    }
  }

  return null;
}

// Main import function
async function importProducts() {
  console.log('Reading Excel file...');
  const wb = XLSX.readFile(EXCEL_PATH);
  const sheet = wb.Sheets[wb.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(sheet, { defval: '' });

  console.log(`Found ${data.length} rows in Excel`);

  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const existingSlugs = new Set();
  const products = [];
  const variationProducts = {}; // For grouped variants
  const processedSkus = new Set();

  // First pass: identify and group variations
  data.forEach(row => {
    const sku = row['Cikkszám '] || '';
    const groupSlug = SKU_TO_GROUP[sku];

    if (groupSlug) {
      if (!variationProducts[groupSlug]) {
        variationProducts[groupSlug] = {
          ...VARIATION_GROUPS[groupSlug],
          slug: groupSlug,
          variants: [],
          rows: [],
        };
      }
      variationProducts[groupSlug].rows.push(row);
      processedSkus.add(sku);
    }
  });

  // Process variation groups
  Object.entries(variationProducts).forEach(([slug, group]) => {
    const firstRow = group.rows[0];
    const category = CATEGORY_MAP[firstRow['Kategória név/nevek ']] || 'egyeb';

    const variants = group.rows.map(row => {
      const name = row['Terméknév (hu)'] || '';
      const variant = extractVariant(name, row['Cikkszám ']);
      return {
        sku: row['Cikkszám '] || '',
        name: variant?.name || name,
        value: variant?.value || row['Cikkszám '],
        price: parsePrice(row['Bruttó ár']),
        image: row['Elsődleges termékkép '] || '',
      };
    });

    const product = {
      slug: slug,
      sku: group.skus[0], // Primary SKU
      name: group.baseName,
      categorySlug: category,
      shortDescription: cleanHtml(firstRow['Rövid leírás (hu)']).slice(0, 200),
      description: cleanHtml(firstRow['Hosszú leírás (hu)']),
      metaTitle: firstRow['Meta title (hu)'] || group.baseName,
      metaDescription: firstRow['Meta leírás (meta description) (hu)'] || '',
      price: parsePrice(firstRow['Bruttó ár']),
      image: firstRow['Elsődleges termékkép '] || '/images/placeholder.jpg',
      gallery: (firstRow['További termékképek '] || '').split('|||').filter(Boolean),
      availability: getAvailability(firstRow['Minden raktárkészleten állapot ']),
      hasVariants: true,
      variants: variants,
      featured: false,
    };

    products.push(product);
    existingSlugs.add(slug);
  });

  // Process standalone products
  data.forEach(row => {
    const sku = row['Cikkszám '] || '';
    if (processedSkus.has(sku)) return; // Skip already processed variations

    const name = row['Terméknév (hu)'] || '';
    if (!name) return;

    const category = CATEGORY_MAP[row['Kategória név/nevek ']] || 'egyeb';
    const urlSlug = row['Termék URL '] || '';
    const slug = urlSlug || generateSlug(name, existingSlugs);

    const product = {
      slug: slug,
      sku: sku,
      name: name.replace(/^'|'$/g, ''), // Remove quotes
      categorySlug: category,
      shortDescription: cleanHtml(row['Rövid leírás (hu)']).slice(0, 200),
      description: cleanHtml(row['Hosszú leírás (hu)']),
      metaTitle: row['Meta title (hu)'] || name,
      metaDescription: row['Meta leírás (meta description) (hu)'] || '',
      price: parsePrice(row['Bruttó ár']),
      image: row['Elsődleges termékkép '] ? `/${row['Elsődleges termékkép ']}` : '/images/placeholder.jpg',
      gallery: (row['További termékképek '] || '').split('|||').filter(Boolean).map(img => `/${img}`),
      youtubeVideos: (row['Youtube videók (hu)'] || '').split('|||').filter(Boolean),
      availability: getAvailability(row['Minden raktárkészleten állapot ']),
      hasVariants: false,
      variants: [],
      featured: ['NQ001', 'evos001', 'HYD001', 'NLCL001'].includes(sku), // Featured products
    };

    products.push(product);
    existingSlugs.add(slug);
  });

  console.log(`\nProcessed ${products.length} products:`);

  // Group by category for summary
  const byCategory = {};
  products.forEach(p => {
    byCategory[p.categorySlug] = (byCategory[p.categorySlug] || 0) + 1;
  });
  Object.entries(byCategory).sort().forEach(([cat, count]) => {
    console.log(`  - ${cat}: ${count} products`);
  });

  // Write individual JSON files
  console.log('\nWriting JSON files...');
  products.forEach(product => {
    const filePath = path.join(OUTPUT_DIR, `${product.slug}.json`);
    fs.writeFileSync(filePath, JSON.stringify(product, null, 2), 'utf-8');
  });

  console.log(`\nDone! Created ${products.length} product files in ${OUTPUT_DIR}`);

  // Also write a summary file
  const summary = {
    totalProducts: products.length,
    byCategory: byCategory,
    generatedAt: new Date().toISOString(),
  };
  fs.writeFileSync(
    path.join(OUTPUT_DIR, '_summary.json'),
    JSON.stringify(summary, null, 2),
    'utf-8'
  );
}

// Run
importProducts().catch(console.error);
