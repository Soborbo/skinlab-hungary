/**
 * Decode a Google Drive download_file_content tool-result (JSON {content: base64,...})
 * into a binary file under src/assets/products/.
 *
 * Usage: node scripts/decode-drive-image.cjs <toolResultTxt> <outFilename>
 *   outFilename is the basename written into src/assets/products/
 */
const fs = require('fs');
const path = require('path');

const [, , srcTxt, outName] = process.argv;
if (!srcTxt || !outName) {
  console.error('Usage: node scripts/decode-drive-image.cjs <toolResultTxt> <outFilename>');
  process.exit(1);
}

const raw = fs.readFileSync(srcTxt, 'utf8');
const obj = JSON.parse(raw);
let b64 = obj.content || '';
// strip data URL prefix if present
const comma = b64.indexOf(',');
if (b64.startsWith('data:') && comma !== -1) b64 = b64.slice(comma + 1);
const buf = Buffer.from(b64, 'base64');

const outDir = path.resolve(__dirname, '../src/assets/products');
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, outName);
fs.writeFileSync(outPath, buf);
console.log(`Wrote ${outPath} (${buf.length} bytes, mime=${obj.mimeType}, title=${obj.title})`);
