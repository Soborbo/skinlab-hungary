const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const xlsxPath = process.argv[2]
  || process.env.SKINLAB_PRICES_XLSX
  || 'd:/dev/Skinlab/skinlab-xlsx-export-2026-01-03_10_33_31.xlsx';
if (!fs.existsSync(xlsxPath)) {
  console.error(`[update-variants-status] XLSX not found: ${xlsxPath}`);
  console.error('Pass the path as a CLI arg or set SKINLAB_PRICES_XLSX.');
  process.exit(1);
}
const workbook = XLSX.readFile(xlsxPath);
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const data = XLSX.utils.sheet_to_json(sheet);

// Create a map of SKU to status
const skuStatus = {};
data.forEach(row => {
  const sku = (row['Cikkszám '] || '').toString().trim().toLowerCase();
  const status = row['Státusz (engedélyezett (1) v. letiltott (0) v. kifutott (2)) '];
  skuStatus[sku] = status;
});

// Check all products with variants
const productsDir = './src/content/products';
const jsonFiles = fs.readdirSync(productsDir).filter(f => f.endsWith('.json') && f !== '_summary.json');

console.log('=== VARIÁNSOK ELLENŐRZÉSE ===');

jsonFiles.forEach(file => {
  const filePath = path.join(productsDir, file);
  const product = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  if (product.variants && product.variants.length > 0) {
    let hasDisabled = false;

    product.variants.forEach(variant => {
      const sku = variant.sku.toLowerCase();
      const status = skuStatus[sku];
      const isDisabled = status === 0 || status === '0';

      if (isDisabled && variant.available !== false) {
        variant.available = false;
        hasDisabled = true;
        console.log(file + ' -> ' + variant.name + ' (SKU: ' + variant.sku + ') - LETILTVA');
      }
    });

    if (hasDisabled) {
      fs.writeFileSync(filePath, JSON.stringify(product, null, 2));
    }
  }
});

console.log('Kész!');
