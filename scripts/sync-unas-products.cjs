/**
 * Unas Webshop API → Astro product JSON sync script
 *
 * Fetches product data (prices, names, specs) from the Unas REST API
 * and updates the local product JSON files in src/content/products/.
 *
 * Usage: UNAS_API_KEY=xxx node scripts/sync-unas-products.cjs
 * Or with .env file: node scripts/sync-unas-products.cjs
 */

const fs = require('fs');
const path = require('path');
const { XMLParser, XMLBuilder } = require('fast-xml-parser');

// --- Configuration ---

const API_BASE = 'https://api.unas.eu/shop';
const PRODUCTS_DIR = path.join(__dirname, '../src/content/products');
const REQUEST_TIMEOUT_MS = 15000;
const RETRY_COUNT = 3;
const RETRY_DELAY_MS = 2000;
const RATE_LIMIT_DELAY_MS = 5000;
const BETWEEN_REQUESTS_MS = 200;
const PAGE_SIZE = 200;

const xmlParser = new XMLParser({
  ignoreAttributes: false,
  parseTagValue: true,
  trimValues: true,
  isArray: (name) => ['Product', 'Price', 'Param', 'Image', 'Category', 'Status'].includes(name),
});

const xmlBuilder = new XMLBuilder({
  ignoreAttributes: false,
  format: true,
  suppressEmptyNode: true,
});

// --- Logging ---

function timestamp() {
  return new Date().toISOString().replace('T', ' ').slice(0, 19);
}

function logInfo(prefix, msg) {
  console.log(`[${prefix}] \u2713 ${msg}`);
}

function logWarn(prefix, msg) {
  console.warn(`[${prefix}] \u26A0 FIGYELMEZTET\u00c9S: ${msg}`);
}

function logError(prefix, msg) {
  console.error(`[${prefix}] \u2717 HIBA: ${msg}`);
}

function logStep(prefix, msg) {
  console.log(`[${prefix}] ${msg}`);
}

// --- .env loader (minimal, no dependency) ---

function loadEnv() {
  const envPath = path.join(__dirname, '../.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

// --- HTTP helpers ---

async function fetchWithTimeout(url, options, timeoutMs = REQUEST_TIMEOUT_MS) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(timer);
  }
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function apiRequest(endpoint, xmlBody, token = null, retries = RETRY_COUNT) {
  const url = `${API_BASE}/${endpoint}`;
  const headers = { 'Content-Type': 'application/xml' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetchWithTimeout(url, {
        method: 'POST',
        headers,
        body: xmlBody,
      });

      const responseText = await res.text();

      if (res.status === 429) {
        if (attempt < retries) {
          logWarn('FETCH', `Rate limit (HTTP 429), v\u00e1rakoz\u00e1s ${RATE_LIMIT_DELAY_MS / 1000}s... (pr\u00f3b\u00e1lkoz\u00e1s ${attempt}/${retries})`);
          await sleep(RATE_LIMIT_DELAY_MS);
          continue;
        }
        logError('FETCH', `Rate limit, ${retries} pr\u00f3b\u00e1lkoz\u00e1s ut\u00e1n is sikertelen`);
        process.exit(1);
      }

      if (res.status === 401 || res.status === 403) {
        logError('AUTH', `\u00c9rv\u00e9nytelen API kulcs vagy jogosults\u00e1g (HTTP ${res.status})`);
        logError('AUTH', `V\u00e1lasz: ${responseText.slice(0, 500)}`);
        process.exit(1);
      }

      if (!res.ok) {
        if (attempt < retries) {
          logWarn('FETCH', `HTTP ${res.status} - ${endpoint}, \u00fajrapr\u00f3b\u00e1l\u00e1s ${attempt}/${retries}...`);
          await sleep(RETRY_DELAY_MS);
          continue;
        }
        logError('FETCH', `${endpoint} h\u00edv\u00e1s sikertelen (HTTP ${res.status})`);
        logError('FETCH', `V\u00e1lasz: ${responseText.slice(0, 500)}`);
        process.exit(1);
      }

      let parsed;
      try {
        parsed = xmlParser.parse(responseText);
      } catch (parseErr) {
        logError('FETCH', `API v\u00e1lasz nem \u00e9rv\u00e9nyes XML (${endpoint})`);
        logError('FETCH', `Parse hiba: ${parseErr.message}`);
        logError('FETCH', `V\u00e1lasz els\u0151 500 karakter: ${responseText.slice(0, 500)}`);
        process.exit(1);
      }

      // Check for API-level error in response
      if (parsed.Error) {
        const errMsg = typeof parsed.Error === 'string' ? parsed.Error : JSON.stringify(parsed.Error);
        if (attempt < retries) {
          logWarn('FETCH', `API hiba: ${errMsg}, \u00fajrapr\u00f3b\u00e1l\u00e1s ${attempt}/${retries}...`);
          await sleep(RETRY_DELAY_MS);
          continue;
        }
        logError('FETCH', `API hiba (${endpoint}): ${errMsg}`);
        process.exit(1);
      }

      return parsed;

    } catch (err) {
      if (err.name === 'AbortError') {
        if (attempt < retries) {
          logWarn('FETCH', `Timeout (${REQUEST_TIMEOUT_MS / 1000}s) - ${endpoint}, \u00fajrapr\u00f3b\u00e1l\u00e1s ${attempt}/${retries}...`);
          await sleep(RETRY_DELAY_MS);
          continue;
        }
        logError('FETCH', `API nem v\u00e1laszol ${retries} pr\u00f3b\u00e1lkoz\u00e1s ut\u00e1n (timeout ${REQUEST_TIMEOUT_MS / 1000}s)`);
        process.exit(1);
      }

      if (err.code === 'ECONNREFUSED' || err.code === 'ENOTFOUND' || err.cause?.code === 'ECONNREFUSED') {
        if (attempt < retries) {
          logWarn('FETCH', `Kapcsol\u00f3d\u00e1si hiba (${err.code || err.cause?.code}) - \u00fajrapr\u00f3b\u00e1l\u00e1s ${attempt}/${retries}...`);
          await sleep(RETRY_DELAY_MS);
          continue;
        }
        logError('FETCH', `API nem el\u00e9rhet\u0151 (${err.code || err.cause?.code}), ${retries} pr\u00f3b\u00e1lkoz\u00e1s ut\u00e1n`);
        process.exit(1);
      }

      // Unknown error
      if (attempt < retries) {
        logWarn('FETCH', `V\u00e1ratlan hiba: ${err.message}, \u00fajrapr\u00f3b\u00e1l\u00e1s ${attempt}/${retries}...`);
        await sleep(RETRY_DELAY_MS);
        continue;
      }
      logError('FETCH', `V\u00e1ratlan hiba (${endpoint}): ${err.message}`);
      process.exit(1);
    }
  }
}

// --- Auth ---

async function authenticate(apiKey) {
  logStep('AUTH', 'Kapcsol\u00f3d\u00e1s az Unas API-hoz...');

  const loginXml = `<?xml version="1.0" encoding="UTF-8" ?>
<Params>
  <ApiKey>${apiKey}</ApiKey>
</Params>`;

  const result = await apiRequest('login', loginXml);

  if (!result?.Login?.Token) {
    logError('AUTH', 'Nem \u00e9rkezett token a login v\u00e1laszb\u00f3l');
    logError('AUTH', `V\u00e1lasz: ${JSON.stringify(result).slice(0, 500)}`);
    process.exit(1);
  }

  const token = result.Login.Token;
  logInfo('AUTH', 'Sikeres bejelentkez\u00e9s, token \u00e9rv\u00e9nyes');
  return token;
}

// --- Fetch products ---

async function fetchAllProducts(token) {
  logStep('FETCH', 'Term\u00e9kek lek\u00e9r\u00e9se...');

  const allProducts = [];
  let offset = 0;
  let page = 1;

  while (true) {
    const requestXml = `<?xml version="1.0" encoding="UTF-8" ?>
<Params>
  <StatusBase>1</StatusBase>
  <LimitStart>${offset}</LimitStart>
  <LimitNum>${PAGE_SIZE}</LimitNum>
  <ContentType>full</ContentType>
</Params>`;

    const result = await apiRequest('getProduct', requestXml, token);

    const products = result?.Products?.Product;
    if (!products || (Array.isArray(products) && products.length === 0)) {
      break;
    }

    const productList = Array.isArray(products) ? products : [products];
    allProducts.push(...productList);

    logStep('FETCH', `  ${page}. oldal: ${productList.length} term\u00e9k (eddig: ${allProducts.length})`);

    if (productList.length < PAGE_SIZE) {
      break; // Last page
    }

    offset += PAGE_SIZE;
    page++;
    await sleep(BETWEEN_REQUESTS_MS);
  }

  if (allProducts.length === 0) {
    logError('FETCH', 'Egyetlen term\u00e9k sem \u00e9rkezett az API-b\u00f3l!');
    process.exit(1);
  }

  logInfo('FETCH', `${allProducts.length} term\u00e9k lek\u00e9rve az API-b\u00f3l`);
  return allProducts;
}

// --- Parse Unas product data ---

function extractPrices(product) {
  const prices = product?.Prices?.Price;
  if (!prices) return { price: null, salePrice: null };

  const priceList = Array.isArray(prices) ? prices : [prices];

  let normalPrice = null;
  let salePrice = null;

  for (const p of priceList) {
    const gross = parseFloat(p.Gross);
    if (isNaN(gross)) continue;

    if (p.Type === 'normal' || p.Type === 'base') {
      normalPrice = Math.round(gross);
    } else if (p.Type === 'sale' || p.Type === 'special' || p.Type === 'action') {
      // Check if sale is currently active
      const now = Date.now() / 1000;
      const start = p.Start ? parseFloat(p.Start) : 0;
      const end = p.End ? parseFloat(p.End) : Infinity;
      if (now >= start && now <= end) {
        salePrice = Math.round(gross);
      }
    }
  }

  return { price: normalPrice, salePrice };
}

function extractSku(product) {
  return (product?.Sku || '').toString().trim();
}

function extractName(product) {
  return (product?.Name || '').toString().trim();
}

function extractSpecs(product) {
  const params = product?.Params?.Param;
  if (!params) return null;

  const paramList = Array.isArray(params) ? params : [params];
  const specs = {};

  for (const param of paramList) {
    const name = (param.Name || '').toString().trim();
    const value = (param.Value || '').toString().trim();
    if (name && value) {
      specs[name] = value;
    }
  }

  return Object.keys(specs).length > 0 ? specs : null;
}

// --- Build SKU lookup ---

function buildSkuLookup(unasProducts) {
  const map = new Map();

  for (const product of unasProducts) {
    const sku = extractSku(product).toLowerCase();
    if (sku) {
      map.set(sku, product);
    }
  }

  logInfo('MATCH', `${map.size} egyedi SKU tal\u00e1lva az API v\u00e1laszban`);
  return map;
}

// --- Price validation ---

function isValidPrice(price) {
  return typeof price === 'number' && price > 0 && price < 100_000_000;
}

function formatPrice(price) {
  if (price === null || price === undefined) return 'null';
  return new Intl.NumberFormat('hu-HU').format(price) + ' Ft';
}

// --- Main sync ---

async function syncProducts() {
  console.log('\n=== UNAS SYNC IND\u00cdT\u00c1S ===');
  console.log(`[${timestamp()}]\n`);

  // Step 0: Check API key
  const apiKey = process.env.UNAS_API_KEY;
  if (!apiKey) {
    logError('CONFIG', 'UNAS_API_KEY k\u00f6rnyezeti v\u00e1ltoz\u00f3 nincs be\u00e1ll\u00edtva!');
    logError('CONFIG', 'Haszn\u00e1lat: UNAS_API_KEY=xxx node scripts/sync-unas-products.cjs');
    logError('CONFIG', 'Vagy hozz l\u00e9tre egy .env f\u00e1jlt a projekt gy\u00f6k\u00e9rben: UNAS_API_KEY=xxx');
    process.exit(1);
  }
  logInfo('CONFIG', 'UNAS_API_KEY megtal\u00e1lva');

  // Step 1: Authenticate
  const token = await authenticate(apiKey);

  // Step 2: Fetch all products from Unas
  const unasProducts = await fetchAllProducts(token);

  // Step 3: Build SKU lookup
  const skuMap = buildSkuLookup(unasProducts);

  // Step 4: Read local product files
  const jsonFiles = fs.readdirSync(PRODUCTS_DIR)
    .filter(f => f.endsWith('.json') && f !== '_summary.json');

  logStep('MATCH', `${jsonFiles.length} lok\u00e1lis JSON f\u00e1jl, ${skuMap.size} API term\u00e9k`);
  logStep('MATCH', 'SKU p\u00e1ros\u00edt\u00e1s...\n');

  // Step 5: Sync each local product
  const stats = {
    total: jsonFiles.length,
    updated: 0,
    unchanged: 0,
    skipped: 0,
    warnings: 0,
  };
  const updatedFiles = [];
  const skippedSkus = [];
  const warnedSkus = [];

  for (const file of jsonFiles) {
    const filePath = path.join(PRODUCTS_DIR, file);

    let product;
    try {
      product = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (readErr) {
      logError('READ', `Nem siker\u00fclt olvasni: ${file} - ${readErr.message}`);
      process.exit(1);
    }

    const localSku = (product.sku || '').toLowerCase();
    if (!localSku) {
      logWarn('SYNC', `${file}: nincs SKU, kihagyva`);
      stats.skipped++;
      skippedSkus.push({ file, reason: 'nincs SKU' });
      continue;
    }

    const unasProduct = skuMap.get(localSku);
    if (!unasProduct) {
      logWarn('SYNC', `${file} (SKU: ${product.sku}): SKU nem tal\u00e1lhat\u00f3 az Unas API-ban, kihagyva`);
      stats.skipped++;
      skippedSkus.push({ file, sku: product.sku, reason: 'nem tal\u00e1lhat\u00f3 az API-ban' });
      continue;
    }

    let changed = false;
    const changes = [];

    // --- Sync price ---
    const { price: apiPrice, salePrice: apiSalePrice } = extractPrices(unasProduct);

    if (apiPrice !== null) {
      if (!isValidPrice(apiPrice)) {
        logWarn('SYNC', `${file} (SKU: ${product.sku}): \u00e1r \u00e9rv\u00e9nytelen (${apiPrice}), kihagyva`);
        stats.warnings++;
        warnedSkus.push({ file, sku: product.sku, reason: `\u00e9rv\u00e9nytelen \u00e1r: ${apiPrice}` });
      } else if (product.price !== apiPrice) {
        changes.push(`  price: ${formatPrice(product.price)} \u2192 ${formatPrice(apiPrice)}`);
        product.price = apiPrice;
        changed = true;
      }
    }

    // --- Sync salePrice ---
    const currentSalePrice = product.salePrice ?? null;
    const newSalePrice = (apiSalePrice !== null && isValidPrice(apiSalePrice)) ? apiSalePrice : null;
    if (currentSalePrice !== newSalePrice) {
      if (newSalePrice !== null) {
        changes.push(`  salePrice: ${formatPrice(currentSalePrice)} \u2192 ${formatPrice(newSalePrice)} (AKCI\u00d3!)`);
      } else if (currentSalePrice !== null) {
        changes.push(`  salePrice: ${formatPrice(currentSalePrice)} \u2192 null (akci\u00f3 v\u00e9ge)`);
      }
      product.salePrice = newSalePrice;
      changed = true;
    }

    // --- Sync name: DISABLED ---
    // A brosúra oldalon kézzel kurált nevek maradnak,
    // a webshop nevek nem írják felül őket.
    // const apiName = extractName(unasProduct);
    // if (apiName && product.name !== apiName) {
    //   changes.push(`  name: "${product.name}" → "${apiName}"`);
    //   product.name = apiName;
    //   changed = true;
    // }

    // --- Sync variant prices ---
    if (product.hasVariants && product.variants && product.variants.length > 0) {
      for (const variant of product.variants) {
        const varSku = (variant.sku || '').toLowerCase();
        if (!varSku) continue;

        const unasVariant = skuMap.get(varSku);
        if (!unasVariant) continue;

        const { price: varApiPrice } = extractPrices(unasVariant);
        if (varApiPrice !== null && isValidPrice(varApiPrice) && variant.price !== varApiPrice) {
          changes.push(`  vari\u00e1ns ${variant.sku} (${variant.name}): ${formatPrice(variant.price)} \u2192 ${formatPrice(varApiPrice)}`);
          variant.price = varApiPrice;
          changed = true;
        }
      }
    }

    // --- Sync specs (only if local specs are empty/missing) ---
    const apiSpecs = extractSpecs(unasProduct);
    if (apiSpecs && (!product.specs || Object.keys(product.specs).length === 0)) {
      changes.push(`  specs: \u00fcres \u2192 ${Object.keys(apiSpecs).length} param\u00e9ter hozz\u00e1adva`);
      product.specs = apiSpecs;
      changed = true;
    }

    // --- Write changes ---
    if (changed) {
      console.log(`[SYNC] ${file} (SKU: ${product.sku})`);
      changes.forEach(c => console.log(c));

      try {
        const tmpPath = filePath + '.tmp';
        fs.writeFileSync(tmpPath, JSON.stringify(product, null, 2) + '\n');
        fs.renameSync(tmpPath, filePath);
      } catch (writeErr) {
        logError('WRITE', `Nem siker\u00fclt \u00edrni: ${filePath} - ${writeErr.message}`);
        // Clean up temp file if it exists
        const tmpPath = filePath + '.tmp';
        if (fs.existsSync(tmpPath)) {
          try { fs.unlinkSync(tmpPath); } catch {}
        }
        process.exit(1);
      }

      stats.updated++;
      updatedFiles.push(file);
    } else {
      stats.unchanged++;
    }
  }

  // --- Summary ---
  console.log('\n=== \u00d6SSZEFOGLAL\u00d3 ===');
  console.log(`\u00d6sszesen:        ${stats.total} lok\u00e1lis term\u00e9k`);
  console.log(`Fr\u00edss\u00edtve:        ${stats.updated} term\u00e9k`);
  console.log(`V\u00e1ltozatlan:     ${stats.unchanged} term\u00e9k`);
  console.log(`Kihagyva:        ${stats.skipped} term\u00e9k (SKU nem tal\u00e1lhat\u00f3)`);
  console.log(`Figyelmeztet\u00e9s:  ${stats.warnings} term\u00e9k (\u00e9rv\u00e9nytelen adat)`);

  if (updatedFiles.length > 0) {
    console.log('\nM\u00f3dos\u00edtott f\u00e1jlok:');
    updatedFiles.forEach(f => console.log(`  src/content/products/${f}`));
  }

  if (skippedSkus.length > 0) {
    console.log('\nKihagyott term\u00e9kek:');
    skippedSkus.forEach(s => console.log(`  ${s.file} (SKU: ${s.sku || '-'}) - ${s.reason}`));
  }

  if (warnedSkus.length > 0) {
    console.log('\nFigyelmeztet\u00e9sek:');
    warnedSkus.forEach(w => console.log(`  ${w.file} (SKU: ${w.sku}) - ${w.reason}`));
  }

  console.log(`\n[${timestamp()}] Sync befejezve.\n`);
}

// --- Run ---

loadEnv();
syncProducts().catch(err => {
  logError('FATAL', `V\u00e1ratlan hiba: ${err.message}`);
  logError('FATAL', `Stack: ${err.stack}`);
  process.exit(1);
});
