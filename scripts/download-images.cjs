/**
 * Download product images from ShopRenter CDN
 *
 * Usage: node scripts/download-images.cjs
 */

const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Paths
const EXCEL_PATH = path.join(__dirname, '../../../skinlab-xlsx-export-2026-01-03_10_33_31.xlsx');
const OUTPUT_DIR = path.join(__dirname, '../public/images/products');

// ShopRenter CDN base URL
const CDN_BASE = 'https://skinlab.cdn.shoprenter.hu/custom/skinlab/image/cache/w800h800q100';

// Create output directory
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Download a file
function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    const file = fs.createWriteStream(destPath);

    protocol.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        file.close();
        fs.unlinkSync(destPath);
        return downloadFile(response.headers.location, destPath).then(resolve).catch(reject);
      }

      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(destPath);
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }

      response.pipe(file);

      file.on('finish', () => {
        file.close();
        resolve(true);
      });
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
      reject(err);
    });
  });
}

// Generate safe filename from path
function safeFilename(imagePath) {
  // Remove 'product/' prefix and get filename
  let filename = imagePath.replace(/^product\//, '');

  // Replace special chars
  filename = filename.replace(/[^a-zA-Z0-9._-]/g, '-');

  return filename;
}

// Main function
async function downloadImages() {
  console.log('Reading Excel file...');
  const wb = XLSX.readFile(EXCEL_PATH);
  const sheet = wb.Sheets[wb.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(sheet, { defval: '' });

  // Collect all unique image paths
  const images = new Map(); // path -> product name (for logging)

  data.forEach(row => {
    const name = row['Terméknév (hu)'] || 'Unknown';
    const primary = row['Elsődleges termékkép '];
    const additional = row['További termékképek '] || '';

    if (primary) images.set(primary, name);
    additional.split('|||').filter(Boolean).forEach(img => {
      if (!images.has(img)) images.set(img, name);
    });
  });

  console.log(`Found ${images.size} unique images to download\n`);

  let success = 0;
  let failed = 0;
  const failures = [];

  // Download images
  for (const [imagePath, productName] of images) {
    const filename = safeFilename(imagePath);
    const destPath = path.join(OUTPUT_DIR, filename);

    // Skip if already exists
    if (fs.existsSync(destPath)) {
      console.log(`⏭️  Skip (exists): ${filename}`);
      success++;
      continue;
    }

    // Build CDN URL - try with .webp first, then original
    const cdnUrl = `${CDN_BASE}/${imagePath}.webp`;

    try {
      await downloadFile(cdnUrl, destPath.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
      console.log(`✅ Downloaded: ${filename} (${productName.slice(0, 30)}...)`);
      success++;
    } catch (err) {
      // Try original format without .webp
      const cdnUrlOriginal = `${CDN_BASE}/${imagePath}`;
      try {
        await downloadFile(cdnUrlOriginal, destPath);
        console.log(`✅ Downloaded: ${filename} (${productName.slice(0, 30)}...)`);
        success++;
      } catch (err2) {
        console.log(`❌ Failed: ${filename} - ${err2.message}`);
        failures.push({ path: imagePath, product: productName, error: err2.message });
        failed++;
      }
    }

    // Small delay to be nice to the server
    await new Promise(r => setTimeout(r, 100));
  }

  console.log(`\n${'='.repeat(50)}`);
  console.log(`Done! Success: ${success}, Failed: ${failed}`);

  if (failures.length > 0) {
    console.log('\nFailed downloads:');
    failures.slice(0, 20).forEach(f => {
      console.log(`  - ${f.path} (${f.product.slice(0, 30)})`);
    });
    if (failures.length > 20) {
      console.log(`  ... and ${failures.length - 20} more`);
    }
  }
}

downloadImages().catch(console.error);
