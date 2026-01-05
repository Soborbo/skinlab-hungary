const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const workbook = XLSX.readFile('d:/dev/Skinlab/skinlab-xlsx-export-2026-01-03_10_33_31.xlsx');
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const data = XLSX.utils.sheet_to_json(sheet);

// Create a map of SKU to price
const skuPrices = {};
data.forEach(row => {
  const sku = (row['Cikkszám '] || '').toString().trim().toLowerCase();
  const price = row['Bruttó ár '];
  if (sku && price) {
    // Round to nearest integer
    skuPrices[sku] = Math.round(price);
  }
});

// Update all JSON files
const productsDir = './src/content/products';
const jsonFiles = fs.readdirSync(productsDir).filter(f => f.endsWith('.json') && f !== '_summary.json');

console.log('=== ÁRAK FRISSÍTÉSE ===\n');

let updated = 0;

jsonFiles.forEach(file => {
  const filePath = path.join(productsDir, file);
  const product = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const sku = (product.sku || '').toLowerCase();

  let changed = false;

  // Update main product price
  if (skuPrices[sku] && product.price !== skuPrices[sku]) {
    console.log(`${file}: ${product.price} -> ${skuPrices[sku]} Ft`);
    product.price = skuPrices[sku];
    changed = true;
  }

  // Update variant prices
  if (product.variants && product.variants.length > 0) {
    product.variants.forEach(variant => {
      const variantSku = (variant.sku || '').toLowerCase();
      if (skuPrices[variantSku] && variant.price !== skuPrices[variantSku]) {
        console.log(`  - ${variant.name}: ${variant.price} -> ${skuPrices[variantSku]} Ft`);
        variant.price = skuPrices[variantSku];
        changed = true;
      }
    });
  }

  if (changed) {
    fs.writeFileSync(filePath, JSON.stringify(product, null, 2));
    updated++;
  }
});

console.log(`\nFrissítve: ${updated} fájl`);
