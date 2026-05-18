/**
 * One-off: regenerate founder portrait assets from full-res sources in references/
 *   references/laszlo.jpeg     → public/about/horvath-laszlo-skinlab-alapito.{avif,webp,jpg}
 *   references/szimonetta.jpeg → public/about/gaszler-simonetta-skinlab-alapito.{avif,webp,jpg}
 *
 * Run: node scripts/regen-founder-portraits.cjs
 */
const sharp = require('sharp');
const path = require('path');

const root = path.resolve(__dirname, '..');
const targets = [
  {
    src: path.join(root, 'references/laszlo.jpeg'),
    out: path.join(root, 'public/about/horvath-laszlo-skinlab-alapito'),
  },
  {
    src: path.join(root, 'references/szimonetta.jpeg'),
    out: path.join(root, 'public/about/gaszler-simonetta-skinlab-alapito'),
  },
];

const SIZE = 960;

(async () => {
  for (const { src, out } of targets) {
    const base = sharp(src).resize(SIZE, SIZE, { fit: 'cover', position: 'top' });
    await base.clone().avif({ quality: 60 }).toFile(`${out}.avif`);
    await base.clone().webp({ quality: 82 }).toFile(`${out}.webp`);
    await base.clone().jpeg({ quality: 86, mozjpeg: true }).toFile(`${out}.jpg`);
    console.log(`Generated: ${path.basename(out)}.{avif,webp,jpg}`);
  }
})();
