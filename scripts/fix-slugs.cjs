/**
 * Fix product slugs to match original ShopRenter URLs
 *
 * Usage: node scripts/fix-slugs.cjs
 */

const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const EXCEL_PATH = path.join(__dirname, '../../../skinlab-xlsx-export-2026-01-03_10_33_31.xlsx');
const PRODUCTS_DIR = path.join(__dirname, '../src/content/products');

// Read Excel
const wb = XLSX.readFile(EXCEL_PATH);
const sheet = wb.Sheets[wb.SheetNames[0]];
const data = XLSX.utils.sheet_to_json(sheet, { defval: '' });

// Build SKU -> URL map from Excel
const skuToUrl = new Map();
data.forEach(row => {
  const sku = row['Cikkszám '] || '';
  const url = row['Termék URL '] || '';
  if (sku && url) {
    skuToUrl.set(sku, url);
  }
});

console.log('Loaded', skuToUrl.size, 'SKU->URL mappings from Excel\n');

// Process each JSON file
const files = fs.readdirSync(PRODUCTS_DIR).filter(f => f.endsWith('.json') && !f.startsWith('_'));

let renamed = 0;
let updated = 0;

files.forEach(file => {
  const filePath = path.join(PRODUCTS_DIR, file);
  const product = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  // Get the correct URL from Excel based on SKU
  const correctSlug = skuToUrl.get(product.sku);

  if (!correctSlug) {
    console.log(`⚠️  No Excel URL found for SKU: ${product.sku} (${file})`);
    return;
  }

  const currentSlug = product.slug;
  const currentFilename = file.replace('.json', '');

  // Check if slug needs updating
  if (currentSlug !== correctSlug) {
    console.log(`📝 Updating slug: ${currentSlug} -> ${correctSlug}`);
    product.slug = correctSlug;
    updated++;
  }

  // Check if filename needs renaming
  if (currentFilename !== correctSlug) {
    const newFilePath = path.join(PRODUCTS_DIR, correctSlug + '.json');

    // Write updated content to new file
    fs.writeFileSync(newFilePath, JSON.stringify(product, null, 2), 'utf-8');

    // Delete old file if different
    if (filePath !== newFilePath) {
      fs.unlinkSync(filePath);
      console.log(`📁 Renamed: ${file} -> ${correctSlug}.json`);
      renamed++;
    }
  } else if (updated > 0) {
    // Just update content if slug changed but filename is same
    fs.writeFileSync(filePath, JSON.stringify(product, null, 2), 'utf-8');
  }
});

console.log(`\n${'='.repeat(50)}`);
console.log(`Done! Renamed: ${renamed} files, Updated: ${updated} slugs`);
