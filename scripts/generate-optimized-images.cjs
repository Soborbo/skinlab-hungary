/**
 * Image Pre-Generation Script
 *
 * Generates optimized image variants (avif, webp, jpeg) at multiple widths
 * from source images in src/assets/. Outputs to public/images/opt/ with
 * SEO-friendly filenames derived from product slugs.
 *
 * Also generates a manifest JSON used by OptimizedPicture.astro at build time.
 *
 * Usage: node scripts/generate-optimized-images.cjs
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// ── Config ──────────────────────────────────────────────────────────────────

const SRC_DIR = path.resolve(__dirname, '../src/assets');
const PRODUCTS_DIR = path.join(SRC_DIR, 'products');
const CONTENT_DIR = path.resolve(__dirname, '../src/content/products');
const OUT_DIR = path.resolve(__dirname, '../public/images/opt');
const MANIFEST_PATH = path.resolve(__dirname, '../src/lib/image-manifest.json');

// Width sets per usage context — union of all component patterns
const WIDTHS = [160, 320, 480, 640, 828, 960, 1080, 1200, 1600, 1920, 2560];

const FORMATS = ['avif', 'webp', 'jpeg'];

const QUALITY = {
  avif: 50,
  webp: 60,
  jpeg: 65,
};

// ── Helpers ─────────────────────────────────────────────────────────────────

function slugify(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // strip accents
    .replace(/[''"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}

/**
 * Build a map: original filename → { seoSlug, alt, productSlug, imageIndex }
 * by reading all product JSON files.
 */
function buildImageMapping() {
  const mapping = {}; // filename → { seoSlug, alt, productSlug, imageIndex }

  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.json') && !f.startsWith('_'));

  for (const file of files) {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8');
    const product = JSON.parse(raw);
    const productSlug = product.slug;
    const productName = product.name;
    const baseSlug = slugify(productName);

    // Collect all image paths for this product (main + gallery + variant images)
    const allImageEntries = []; // { filename, context }

    // Main image
    if (product.image) {
      const fn = product.image.split('/').pop();
      allImageEntries.push({ filename: fn, context: 'main' });
    }

    // Gallery images
    if (product.images && product.images.length > 0) {
      for (const imgPath of product.images) {
        const fn = imgPath.split('/').pop();
        // Skip if already added as main
        if (!allImageEntries.some(e => e.filename === fn)) {
          allImageEntries.push({ filename: fn, context: 'gallery' });
        }
      }
    }

    // Variant images
    if (product.variants) {
      for (const variant of product.variants) {
        const variantSlug = slugify(variant.value || variant.name || '');
        if (variant.image) {
          const fn = variant.image.split('/').pop();
          if (!allImageEntries.some(e => e.filename === fn)) {
            allImageEntries.push({ filename: fn, context: 'variant', variantSlug });
          }
        }
        if (variant.images) {
          for (const imgPath of variant.images) {
            const fn = imgPath.split('/').pop();
            if (!allImageEntries.some(e => e.filename === fn)) {
              allImageEntries.push({ filename: fn, context: 'variant', variantSlug });
            }
          }
        }
      }
    }

    // Assign SEO slug and alt to each image
    let imageIndex = 1;
    for (const entry of allImageEntries) {
      // Skip if already mapped (another product references same file — keep first)
      if (mapping[entry.filename]) continue;

      let seoSlug;
      let alt;

      if (entry.context === 'variant' && entry.variantSlug) {
        seoSlug = `${baseSlug}-${entry.variantSlug}-${imageIndex}`;
        alt = `${productName} ${entry.variantSlug}`;
      } else {
        seoSlug = `${baseSlug}-${imageIndex}`;
        alt = imageIndex === 1
          ? productName
          : `${productName} - ${imageIndex}. kép`;
      }

      mapping[entry.filename] = {
        seoSlug,
        alt,
        productSlug,
        imageIndex,
        subfolder: 'products',
      };

      imageIndex++;
    }
  }

  return mapping;
}

/**
 * Map non-product images (banners, brands, misc, root assets)
 */
function buildNonProductMapping() {
  const mapping = {};

  // Banners
  const bannersDir = path.join(SRC_DIR, 'banners');
  if (fs.existsSync(bannersDir)) {
    for (const file of fs.readdirSync(bannersDir)) {
      const name = path.parse(file).name;
      mapping[`banners/${file}`] = {
        seoSlug: slugify(name),
        alt: name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) + ' banner',
        subfolder: 'banners',
        srcSubdir: 'banners',
      };
    }
  }

  // Brands
  const brandsDir = path.join(SRC_DIR, 'brands');
  if (fs.existsSync(brandsDir)) {
    for (const file of fs.readdirSync(brandsDir)) {
      const name = path.parse(file).name;
      mapping[`brands/${file}`] = {
        seoSlug: slugify(name),
        alt: name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        subfolder: 'brands',
        srcSubdir: 'brands',
      };
    }
  }

  // Misc
  const miscDir = path.join(SRC_DIR, 'misc');
  if (fs.existsSync(miscDir)) {
    for (const file of fs.readdirSync(miscDir)) {
      const name = path.parse(file).name;
      mapping[`misc/${file}`] = {
        seoSlug: slugify(name),
        alt: name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        subfolder: 'misc',
        srcSubdir: 'misc',
      };
    }
  }

  // Root assets (hero, training, logo)
  const rootFiles = fs.readdirSync(SRC_DIR).filter(f => {
    const ext = path.extname(f).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.webp', '.avif'].includes(ext) && fs.statSync(path.join(SRC_DIR, f)).isFile();
  });
  for (const file of rootFiles) {
    const name = path.parse(file).name;
    mapping[file] = {
      seoSlug: slugify(name),
      alt: name.replace(/-/g, ' ').replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      subfolder: 'site',
      srcSubdir: null, // root of SRC_DIR
    };
  }

  return mapping;
}

/**
 * Generate optimized variants for a single source image
 */
async function generateVariants(srcPath, seoSlug, outSubfolder) {
  const outDir = path.join(OUT_DIR, outSubfolder);
  fs.mkdirSync(outDir, { recursive: true });

  let metadata;
  try {
    metadata = await sharp(srcPath).metadata();
  } catch (err) {
    console.warn(`  ⚠ Cannot read: ${srcPath} (${err.message})`);
    return null;
  }

  const srcWidth = metadata.width || 800;
  const srcHeight = metadata.height || 600;

  // Only generate widths up to source width (+ one larger for 2x screens if source allows)
  const applicableWidths = WIDTHS.filter(w => w <= srcWidth);
  // Always include the original width if not in the list
  if (!applicableWidths.includes(srcWidth)) {
    applicableWidths.push(srcWidth);
  }
  applicableWidths.sort((a, b) => a - b);

  const generated = {};

  for (const width of applicableWidths) {
    for (const format of FORMATS) {
      const filename = `${seoSlug}-${width}w.${format === 'jpeg' ? 'jpg' : format}`;
      const outPath = path.join(outDir, filename);

      // Skip if already exists (incremental)
      if (fs.existsSync(outPath)) {
        generated[`${width}-${format}`] = `/${path.relative(path.resolve(__dirname, '../public'), outPath).replace(/\\/g, '/')}`;
        continue;
      }

      try {
        let pipeline = sharp(srcPath).resize(width, null, { withoutEnlargement: true });

        if (format === 'avif') {
          pipeline = pipeline.avif({ quality: QUALITY.avif, effort: 4 });
        } else if (format === 'webp') {
          pipeline = pipeline.webp({ quality: QUALITY.webp });
        } else {
          pipeline = pipeline.jpeg({ quality: QUALITY.jpeg, progressive: true });
        }

        await pipeline.toFile(outPath);
        generated[`${width}-${format}`] = `/${path.relative(path.resolve(__dirname, '../public'), outPath).replace(/\\/g, '/')}`;
      } catch (err) {
        console.warn(`  ⚠ Failed: ${filename} (${err.message})`);
      }
    }
  }

  return {
    width: srcWidth,
    height: srcHeight,
    widths: applicableWidths,
    basePath: `/images/opt/${outSubfolder}/${seoSlug}`,
  };
}

// ── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🖼  SkinLab Image Pre-Generator\n');

  // Clean output dir
  if (fs.existsSync(OUT_DIR)) {
    console.log('Cleaning output directory...');
    fs.rmSync(OUT_DIR, { recursive: true });
  }
  fs.mkdirSync(OUT_DIR, { recursive: true });

  // Build mappings
  console.log('Building image mappings from product data...');
  const productMapping = buildImageMapping();
  const nonProductMapping = buildNonProductMapping();

  const manifest = {};
  let totalImages = 0;
  let totalVariants = 0;

  // ── Process product images ────────────────────────────────────────────
  console.log(`\nProcessing ${Object.keys(productMapping).length} product images...`);

  const productFiles = fs.readdirSync(PRODUCTS_DIR);
  for (const file of productFiles) {
    const srcPath = path.join(PRODUCTS_DIR, file);
    const info = productMapping[file];

    if (!info) {
      // Orphan image — still generate with filename-based slug
      const name = path.parse(file).name;
      const seoSlug = slugify(name);
      console.log(`  [orphan] ${file} → ${seoSlug}`);

      const result = await generateVariants(srcPath, seoSlug, 'products');
      if (result) {
        const key = `@assets/products/${file}`;
        manifest[key] = {
          seoSlug,
          alt: name.replace(/-/g, ' ').replace(/_/g, ' '),
          ...result,
        };
        totalImages++;
        totalVariants += result.widths.length * FORMATS.length;
      }
      continue;
    }

    console.log(`  ${file} → ${info.seoSlug}`);

    const result = await generateVariants(srcPath, info.seoSlug, info.subfolder);
    if (result) {
      const key = `@assets/products/${file}`;
      manifest[key] = {
        seoSlug: info.seoSlug,
        alt: info.alt,
        ...result,
      };
      totalImages++;
      totalVariants += result.widths.length * FORMATS.length;
    }
  }

  // ── Process non-product images ────────────────────────────────────────
  console.log(`\nProcessing ${Object.keys(nonProductMapping).length} non-product images...`);

  for (const [relPath, info] of Object.entries(nonProductMapping)) {
    const srcPath = info.srcSubdir
      ? path.join(SRC_DIR, info.srcSubdir, path.basename(relPath))
      : path.join(SRC_DIR, relPath);

    if (!fs.existsSync(srcPath)) {
      console.warn(`  ⚠ Not found: ${srcPath}`);
      continue;
    }

    console.log(`  ${relPath} → ${info.seoSlug}`);

    const result = await generateVariants(srcPath, info.seoSlug, info.subfolder);
    if (result) {
      // Build the @assets/ key for the manifest
      const key = info.srcSubdir
        ? `@assets/${info.srcSubdir}/${path.basename(relPath)}`
        : `@assets/${relPath}`;
      manifest[key] = {
        seoSlug: info.seoSlug,
        alt: info.alt,
        ...result,
      };
      totalImages++;
      totalVariants += result.widths.length * FORMATS.length;
    }
  }

  // ── Write manifest ────────────────────────────────────────────────────
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf8');

  console.log(`\n✅ Done!`);
  console.log(`   Images processed: ${totalImages}`);
  console.log(`   Variants generated: ${totalVariants}`);
  console.log(`   Manifest: ${MANIFEST_PATH}`);
  console.log(`   Output: ${OUT_DIR}`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
