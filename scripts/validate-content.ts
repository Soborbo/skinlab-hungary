/**
 * Content Validation Script
 *
 * Scans all JSON files in src/content/product-content/
 * and validates them against the appropriate Zod schema.
 *
 * Usage: npx tsx scripts/validate-content.ts
 */

import { readdirSync, readFileSync, statSync } from 'fs';
import { join, relative, basename } from 'path';
import { fileURLToPath } from 'url';
import { productContentSchema, categoryContentSchema } from '../src/lib/schemas/product-content.schema.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');
const CONTENT_DIR = join(__dirname, '..', 'src', 'content', 'product-content');

interface ValidationResult {
  locale: string;
  file: string;
  type: 'product' | 'category';
  pass: boolean;
  errors?: string[];
}

const results: ValidationResult[] = [];

function scanDirectory(dir: string): string[] {
  const files: string[] = [];

  try {
    const entries = readdirSync(dir);
    for (const entry of entries) {
      const fullPath = join(dir, entry);
      const stat = statSync(fullPath);
      if (stat.isDirectory()) {
        files.push(...scanDirectory(fullPath));
      } else if (entry.endsWith('.json')) {
        files.push(fullPath);
      }
    }
  } catch {
    // Directory doesn't exist yet, that's OK
  }

  return files;
}

function validateFile(filePath: string): ValidationResult {
  const relPath = relative(CONTENT_DIR, filePath);
  const parts = relPath.split(/[/\\]/);
  const locale = parts[0];
  const isCategory = parts.includes('_category');
  const fileName = basename(filePath);

  const result: ValidationResult = {
    locale,
    file: relPath,
    type: isCategory ? 'category' : 'product',
    pass: false,
  };

  try {
    const raw = readFileSync(filePath, 'utf-8');
    const data = JSON.parse(raw);

    const schema = isCategory ? categoryContentSchema : productContentSchema;
    schema.parse(data);
    result.pass = true;
  } catch (err: any) {
    result.pass = false;
    if (err.issues) {
      result.errors = err.issues.map((issue: any) => {
        const path = issue.path.join('.');
        return `  ${path || '(root)'}: ${issue.message}`;
      });
    } else {
      result.errors = [`  ${err.message}`];
    }
  }

  return result;
}

// --- Main ---
console.log('Validating product content files...\n');

const files = scanDirectory(CONTENT_DIR);

if (files.length === 0) {
  console.log('No content files found in src/content/product-content/');
  console.log('(This is OK if you haven\'t created any yet.)\n');
  process.exit(0);
}

for (const file of files) {
  results.push(validateFile(file));
}

// Report
let hasFailures = false;

for (const r of results) {
  const status = r.pass ? 'PASS' : 'FAIL';
  const icon = r.pass ? '\u2713' : '\u2717';
  console.log(`${icon} [${status}] ${r.locale} / ${r.file} (${r.type})`);

  if (!r.pass && r.errors) {
    hasFailures = true;
    for (const err of r.errors) {
      console.log(err);
    }
    console.log('');
  }
}

console.log(`\n${results.length} files checked: ${results.filter(r => r.pass).length} passed, ${results.filter(r => !r.pass).length} failed`);

if (hasFailures) {
  process.exit(1);
} else {
  console.log('\nAll content files are valid!');
  process.exit(0);
}
