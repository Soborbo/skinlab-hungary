/**
 * Update product JSON files with local image paths
 *
 * Usage: node scripts/update-image-paths.cjs
 */

const fs = require('fs');
const path = require('path');

const PRODUCTS_DIR = path.join(__dirname, '../src/content/products');
const IMAGES_DIR = path.join(__dirname, '../public/images/products');

// Get list of downloaded images (lowercase for case-insensitive matching)
const downloadedImagesRaw = fs.readdirSync(IMAGES_DIR);
const downloadedImages = new Map();
downloadedImagesRaw.forEach(f => {
  downloadedImages.set(f.toLowerCase(), f); // Map lowercase -> actual filename
});

// Helper: convert UNAS path to local filename
function toLocalFilename(unasPath) {
  if (!unasPath) return null;

  // Remove 'product/' prefix
  let filename = unasPath.replace(/^product\//, '');

  // Replace special chars (same logic as download script)
  filename = filename.replace(/[^a-zA-Z0-9._-]/g, '-');

  return filename;
}

// Helper: find matching local image (case-insensitive)
function findLocalImage(unasPath) {
  if (!unasPath) return null;

  const filename = toLocalFilename(unasPath);
  if (!filename) return null;

  const filenameLower = filename.toLowerCase();

  // Check if exact filename exists (case-insensitive)
  if (downloadedImages.has(filenameLower)) {
    return `/images/products/${downloadedImages.get(filenameLower)}`;
  }

  // Try with .webp extension (we downloaded some as webp)
  const webpFilename = filenameLower.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  if (downloadedImages.has(webpFilename)) {
    return `/images/products/${downloadedImages.get(webpFilename)}`;
  }

  // Try just the filename without product/ prefix (for paths like /DAME4.png)
  const justFilename = unasPath.split('/').pop().toLowerCase();
  if (downloadedImages.has(justFilename)) {
    return `/images/products/${downloadedImages.get(justFilename)}`;
  }

  // Try webp version of just filename
  const justFilenameWebp = justFilename.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  if (downloadedImages.has(justFilenameWebp)) {
    return `/images/products/${downloadedImages.get(justFilenameWebp)}`;
  }

  // Not found
  return null;
}

// Main function
function updateImagePaths() {
  const files = fs.readdirSync(PRODUCTS_DIR).filter(f => f.endsWith('.json') && !f.startsWith('_'));

  console.log(`Processing ${files.length} product files...\n`);

  let updated = 0;
  let unchanged = 0;

  files.forEach(file => {
    const filePath = path.join(PRODUCTS_DIR, file);
    const product = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    let modified = false;

    // Update main image
    if (product.image) {
      const localImage = findLocalImage(product.image.replace(/^\//, ''));
      if (localImage) {
        if (product.image !== localImage) {
          product.image = localImage;
          modified = true;
        }
      }
    }

    // Update gallery images
    if (product.gallery && product.gallery.length > 0) {
      const newGallery = product.gallery.map(img => {
        const localImage = findLocalImage(img.replace(/^\//, ''));
        if (localImage && localImage !== img) {
          modified = true;
          return localImage;
        }
        return img;
      }).filter(img => img && !img.includes('placeholder'));

      product.gallery = newGallery;
    }

    // Update variant images
    if (product.variants && product.variants.length > 0) {
      product.variants.forEach(variant => {
        if (variant.image) {
          const localImage = findLocalImage(variant.image.replace(/^\//, ''));
          if (localImage && variant.image !== localImage) {
            variant.image = localImage;
            modified = true;
          }
        }
      });
    }

    if (modified) {
      fs.writeFileSync(filePath, JSON.stringify(product, null, 2), 'utf-8');
      console.log(`✅ Updated: ${file}`);
      updated++;
    } else {
      unchanged++;
    }
  });

  console.log(`\n${'='.repeat(50)}`);
  console.log(`Done! Updated: ${updated}, Unchanged: ${unchanged}`);
}

updateImagePaths();
