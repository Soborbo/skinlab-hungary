/**
 * Add additional product images from Excel to JSON files
 * Reads "További termékképek" column and adds images array to each product
 *
 * Usage: node scripts/add-product-images.cjs
 */

const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

const EXCEL_PATH = 'd:/dev/Skinlab/skinlab-xlsx-export-2026-01-03_10_33_31.xlsx';
const PRODUCTS_DIR = path.join(__dirname, '../src/content/products');
const IMAGES_DIR = path.join(__dirname, '../public/images/products');

// Read Excel
const wb = XLSX.readFile(EXCEL_PATH);
const sheet = wb.Sheets[wb.SheetNames[0]];
const data = XLSX.utils.sheet_to_json(sheet, { defval: '' });

// Get list of downloaded images (store base name without extension for matching)
// Images were converted to .webp when downloaded
const downloadedImages = new Map(); // basename (lowercase) -> actual filename
if (fs.existsSync(IMAGES_DIR)) {
  fs.readdirSync(IMAGES_DIR).forEach(file => {
    // Store mapping: basename (without ext, lowercase) -> actual file
    const basename = file.replace(/\.[^.]+$/, '').toLowerCase();
    downloadedImages.set(basename, file);
  });
}
console.log(`Found ${downloadedImages.size} downloaded images\n`);

// Build slug -> images map from Excel
const slugToImages = new Map();

data.forEach(row => {
  const slug = (row['Termék URL '] || '').trim();
  if (!slug) return;

  const primaryImage = (row['Elsődleges termékkép '] || '').trim();
  const additionalImages = (row['További termékképek '] || '').trim();

  const images = [];

  // Helper to find the actual downloaded file
  const findImage = (excelPath) => {
    const filename = excelPath.split('/').pop();
    const basename = filename.replace(/\.[^.]+$/, '').toLowerCase();
    const actualFile = downloadedImages.get(basename);
    if (actualFile) {
      return `/images/products/${actualFile}`;
    }
    return null;
  };

  // Add primary image first
  if (primaryImage) {
    const imagePath = findImage(primaryImage);
    if (imagePath) {
      images.push(imagePath);
    }
  }

  // Add additional images
  if (additionalImages) {
    const extraImages = additionalImages.split('|||').map(s => s.trim()).filter(Boolean);
    extraImages.forEach(img => {
      const imagePath = findImage(img);
      if (imagePath) {
        images.push(imagePath);
      }
    });
  }

  if (images.length > 0) {
    slugToImages.set(slug, images);
  }
});

console.log(`Mapped images for ${slugToImages.size} products\n`);

// Update product JSON files
const productFiles = fs.readdirSync(PRODUCTS_DIR).filter(f => f.endsWith('.json') && !f.startsWith('_'));

let updated = 0;
let noImages = 0;

productFiles.forEach(file => {
  const filePath = path.join(PRODUCTS_DIR, file);
  const product = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const images = slugToImages.get(product.slug);

  if (images && images.length > 0) {
    // Keep primary image as 'image', add all as 'images' array
    product.images = images;

    fs.writeFileSync(filePath, JSON.stringify(product, null, 2), 'utf-8');
    console.log(`✅ ${product.slug}: ${images.length} images`);
    updated++;
  } else {
    console.log(`⚠️  ${product.slug}: no additional images found`);
    noImages++;
  }
});

console.log(`\n${'='.repeat(50)}`);
console.log(`Updated: ${updated} products`);
console.log(`No images: ${noImages} products`);
