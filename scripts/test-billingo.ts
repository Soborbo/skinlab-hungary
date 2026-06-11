/**
 * Billingo díjbekérő smoke test.
 *
 * Egy szintetikus tesztrendelést küld a Billingo lib-be és kiírja az eredményt.
 * Használat:
 *
 *   # .env-ben legyen: BILLINGO_API_KEY, BILLINGO_BLOCK_ID, BILLINGO_BANK_ACCOUNT_ID
 *   npx tsx scripts/test-billingo.ts
 *   npx tsx scripts/test-billingo.ts --locale=en
 *   npx tsx scripts/test-billingo.ts --b2b
 *   npx tsx scripts/test-billingo.ts --skip-email          # csak proforma create, küldés nélkül
 *
 * A script `process.env`-ből olvas — a `dotenv`-et a parent shell tölti be
 * (`npx --node-arg=-r --node-arg=dotenv/config tsx ...`) vagy kézzel:
 *   set -a; source .env; set +a; npx tsx scripts/test-billingo.ts
 */
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { generateProforma } from '../src/lib/billingo/index.js';
import type { OrderEmailInput } from '../src/lib/order/email.js';
import type { Locale } from '../src/i18n/ui.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** .env minimális betöltése (külső dep nélkül) */
function loadDotEnv(): void {
  const envPath = resolve(join(__dirname, '..'), '.env');
  let raw: string;
  try {
    raw = readFileSync(envPath, 'utf8');
  } catch {
    return;
  }
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const valueRaw = trimmed.slice(eq + 1).trim();
    const value = valueRaw.replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1');
    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

interface CliFlags {
  locale: Locale;
  b2b: boolean;
  priceOnRequest: boolean;
  zeroTotal: boolean;
}

function parseFlags(argv: readonly string[]): CliFlags {
  const flags: CliFlags = {
    locale: 'hu',
    b2b: false,
    priceOnRequest: false,
    zeroTotal: false,
  };
  for (const arg of argv) {
    if (arg.startsWith('--locale=')) {
      flags.locale = arg.slice('--locale='.length) as Locale;
    } else if (arg === '--b2b') {
      flags.b2b = true;
    } else if (arg === '--price-on-request') {
      flags.priceOnRequest = true;
    } else if (arg === '--zero-total') {
      flags.zeroTotal = true;
    }
  }
  return flags;
}

function buildFixture(flags: CliFlags): OrderEmailInput {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  return {
    orderId: `SLO-SMOKE-${timestamp}`,
    locale: flags.locale,
    lastName: 'Teszt',
    firstName: 'Anna',
    email: 'noreply+billingo-smoke@skinlabhungary.hu',
    phone: '+36301234567',
    company: flags.b2b ? 'Teszt Kft.' : '',
    taxNumber: flags.b2b ? '12345678-2-42' : '',
    country: 'Magyarország',
    postcode: '1011',
    city: 'Budapest',
    street: 'Példa utca 12.',
    notes: 'Billingo smoke test — kérjük, töröljék.',
    items: [
      {
        name: 'SkinLab Smoke Test Termék',
        variantName: '30ml',
        sku: 'SMOKE-TEST-30',
        qty: 1,
        unitPrice: flags.priceOnRequest ? null : flags.zeroTotal ? 0 : 4990,
        lineTotal: flags.priceOnRequest ? null : flags.zeroTotal ? 0 : 4990,
      },
    ],
    subtotal: flags.priceOnRequest ? 0 : flags.zeroTotal ? 0 : 4990,
    hasPriceOnRequest: flags.priceOnRequest,
    shippingMethod: 'foxpost',
    shippingFee: flags.priceOnRequest || flags.zeroTotal ? 0 : 1490,
    foxpostPoint: {
      id: 'SMOKE-APT-001',
      name: 'Teszt Csomagautomata',
      zip: '1011',
      city: 'Budapest',
      address: 'Példa utca 1.',
    },
    paymentMethod: 'transfer',
    parcelTier: true,
    sourceUrl: 'smoke-test',
  };
}

async function main(): Promise<void> {
  loadDotEnv();
  const flags = parseFlags(process.argv.slice(2));
  const fixture = buildFixture(flags);

  console.log('[smoke] config:', {
    apiKey: process.env.BILLINGO_API_KEY ? '***set***' : 'MISSING',
    blockId: process.env.BILLINGO_BLOCK_ID || 'MISSING',
    bankAccountId: process.env.BILLINGO_BANK_ACCOUNT_ID || 'MISSING',
  });
  console.log('[smoke] order fixture:', {
    orderId: fixture.orderId,
    locale: fixture.locale,
    b2b: flags.b2b,
    subtotal: fixture.subtotal,
    hasPriceOnRequest: fixture.hasPriceOnRequest,
  });
  console.log('[smoke] calling generateProforma()...');

  const startedAt = Date.now();
  const proformaResult = await generateProforma(fixture, process.env as Record<string, string | undefined>);
  const elapsed = Date.now() - startedAt;

  console.log(`[smoke] result (${elapsed}ms):`);
  console.log(JSON.stringify(proformaResult, null, 2));

  if (proformaResult.success) {
    console.log('\n✅ PROFORMA GENERATED');
    console.log(`   ID:     ${proformaResult.proformaId}`);
    console.log(`   Number: ${proformaResult.proformaNumber}`);
    console.log(`   URL:    ${proformaResult.publicUrl ?? '(no public_url returned)'}`);
    console.log(`   Email:  ${proformaResult.emailSent ? 'sent' : 'FAILED to send'}`);
    process.exit(0);
  }

  if (proformaResult.skipped) {
    console.log(`\n⚠️  SKIPPED — ${proformaResult.reason} (${proformaResult.code})`);
    process.exit(0);
  }

  console.log(`\n❌ FAILED — ${proformaResult.code}: ${proformaResult.errorMessage}`);
  process.exit(1);
}

main().catch((err) => {
  console.error('[smoke] unhandled exception:', err);
  process.exit(2);
});
