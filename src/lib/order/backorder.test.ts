/**
 * Készlethiányos ("rendelésre") tétel a rendelési láncon végig: a készlet-
 * szabály, a díjbekérő-kihagyás és a két e-mail jelölése. Ha valamelyik némán
 * elmarad, a vevő egy nem szállítható termékre kap azonnali fizetési linket.
 */
import { isBackorder } from '@/lib/stock';
import { generateProforma } from '@/lib/billingo';
import { buildAdminEmail, buildCustomerEmail, type OrderEmailInput } from './email';

function order(overrides: Partial<OrderEmailInput> = {}): OrderEmailInput {
  return {
    orderId: 'SLO-TEST-0001',
    locale: 'hu',
    lastName: 'Teszt',
    firstName: 'Elek',
    email: 'teszt@example.com',
    phone: '+36301234567',
    company: '',
    taxNumber: '',
    country: 'Magyarország',
    postcode: '2030',
    city: 'Érd',
    street: 'Fő utca 1.',
    notes: '',
    items: [
      {
        name: 'MAST P60 Premium sminktetováló gép',
        variantName: 'Tiffany - Limited Edition',
        sku: 'MP60menta',
        qty: 1,
        unitPrice: 79990,
        lineTotal: 79990,
        backorder: true,
      },
    ],
    subtotal: 79990,
    hasPriceOnRequest: false,
    hasBackorder: true,
    shippingMethod: 'foxpost',
    shippingFee: 1490,
    foxpostPoint: null,
    paymentMethod: 'transfer',
    parcelTier: true,
    sourceUrl: '',
    ...overrides,
  };
}

describe('isBackorder', () => {
  it('a variáns `available` jelzője dönt, ha meg van adva', () => {
    expect(isBackorder({ availability: 'in_stock' }, { available: false })).toBe(true);
    expect(isBackorder({ availability: 'out_of_stock' }, { available: true })).toBe(false);
  });

  it('variáns nélkül csak az out_of_stock készlethiány - a preorder (gyártásra) NEM', () => {
    expect(isBackorder({ availability: 'out_of_stock' })).toBe(true);
    expect(isBackorder({ availability: 'preorder' })).toBe(false);
    expect(isBackorder({ availability: 'in_stock' }, {})).toBe(false);
  });
});

describe('előrendelés a rendelési láncon', () => {
  it('nem állít ki automatikus díjbekérőt', async () => {
    const result = await generateProforma(order(), {} as never);
    expect(result).toMatchObject({ skipped: true, reason: 'backorder' });
  });

  it('az admin e-mail tárgya és törzse jelzi az előrendelést', () => {
    const { subject, html } = buildAdminEmail(order());
    expect(subject).toContain('ELŐRENDELÉS');
    expect(html).toContain('ELŐRENDELÉS - NINCS RAKTÁRON');
    expect(html).toContain('Díjbekérő NEM ment ki automatikusan');
  });

  it('a vevői e-mail előrendelés-lépéseket ad, díjbekérős lépés és banki blokk nélkül', () => {
    const { html } = buildCustomerEmail(order());
    expect(html).toContain('előrendelésként rögzítettük');
    expect(html).toContain('Rendelésre - jelenleg nincs raktáron');
    expect(html).not.toContain('A díjbekérőt e-mailben elküldtük');
    expect(html).not.toContain('Banki átutalás adatai');
  });

  it('raktári rendelésnél minden marad a régiben', () => {
    const inStock = order({
      hasBackorder: false,
      items: [{ ...order().items[0], backorder: false }],
    });
    expect(buildAdminEmail(inStock).subject).not.toContain('ELŐRENDELÉS');
    const { html } = buildCustomerEmail(inStock);
    expect(html).toContain('A díjbekérőt e-mailben elküldtük');
    expect(html).not.toContain('Rendelésre - jelenleg nincs raktáron');
  });
});
