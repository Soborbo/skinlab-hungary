/**
 * Megrendelés (order) validációs séma - Zod.
 *
 * A `/api/order` végpont ezzel ellenőrzi a kosárból érkező beküldést.
 * Az árakat a végpont a termék-kollekcióból újraszámolja (a kliens által
 * küldött `price` mező csak tájékoztató jellegű, nem megbízható).
 */
import { z } from 'zod';
import { normalizePhone } from '@/lib/phone';
import {
  SHIPPING_METHOD_IDS,
  PAYMENT_METHOD_IDS,
  type ShippingMethodId,
  type PaymentMethodId,
} from '@/lib/shipping/methods';

// Nemzetközi telefonszám - HU (06...), SK, RO, DE, AT, CZ, HR, RS, SI formátumok.
// A vezető 0 opcionális, hogy a HU "06 70 …" lokális forma is átmenjen.
const phoneRegex = /^(\+|00|0)?[1-9][0-9]{0,3}[ -]?[0-9]{1,4}[ -]?[0-9]{2,4}[ -]?[0-9]{2,6}$/;

const SUPPORTED_LOCALES = ['hu', 'en', 'sk', 'ro', 'de', 'cs', 'hr', 'sr', 'sl'] as const;

export const orderItemSchema = z.object({
  slug: z.string().min(1),
  sku: z.string().min(1),
  categorySlug: z.string().default(''),
  name: z.string().min(1),
  variantName: z.string().optional().default(''),
  // A kliens által küldött ár - a szerver újraszámolja
  price: z.number().nullable(),
  qty: z.number().int().positive().max(99),
});

export type OrderItem = z.infer<typeof orderItemSchema>;

export const orderSchema = z.object({
  locale: z.enum(SUPPORTED_LOCALES).default('hu'),

  // Kontakt adatok
  lastName: z.string().min(2, 'A vezetéknév megadása kötelező').max(100),
  firstName: z.string().min(2, 'A keresztnév megadása kötelező').max(100),
  email: z.email('Érvényes e-mail cím szükséges').max(200),
  phone: z.string().regex(phoneRegex, 'Érvényes telefonszám szükséges').max(40).transform(normalizePhone),

  // Céges adatok (opcionális)
  company: z.string().max(200).optional().default(''),
  taxNumber: z.string().max(60).optional().default(''),

  // Cím
  country: z.string().min(2, 'Az ország megadása kötelező').max(100),
  postcode: z.string().min(1, 'Az irányítószám megadása kötelező').max(20),
  city: z.string().min(1, 'A város megadása kötelező').max(120),
  street: z.string().min(1, 'Az utca, házszám megadása kötelező').max(200),

  // Megjegyzés
  notes: z.string().max(2000).optional().default(''),

  // Kosár tételek
  items: z.array(orderItemSchema).min(1, 'A kosár üres'),
  subtotal: z.number().min(0).default(0),
  hasPriceOnRequest: z.boolean().default(false),

  // Szállítás - a módot és a díjat a szerver újraszámolja a kosár ágából
  // (lib/shipping/methods); a Foxpost automatát a térkép-widget tölti fel.
  shippingMethod: z
    .enum(SHIPPING_METHOD_IDS as [ShippingMethodId, ...ShippingMethodId[]])
    .default('personal_pickup'),
  shippingFee: z.number().min(0).max(100000).default(0),
  foxpostPoint: z
    .object({
      id: z.string().max(64),
      name: z.string().max(200),
      zip: z.string().max(16),
      city: z.string().max(120),
      address: z.string().max(300),
    })
    .nullable()
    .optional()
    .default(null),
  // Fizetési mód - utánvét (cod) csak a kellék-ágon; a szerver ellenőrzi
  paymentMethod: z
    .enum(PAYMENT_METHOD_IDS as [PaymentMethodId, ...PaymentMethodId[]])
    .default('transfer'),

  // GDPR - kötelező
  gdpr: z.literal(true, { message: 'Az adatkezelési hozzájárulás kötelező' }),

  // Spam védelem
  website: z.string().max(0, 'Spam detected').optional().default(''),
  formStartTime: z.coerce.number().optional().default(0),

  // Turnstile (opcionális - csak ha be van állítva a site key)
  turnstileToken: z.string().optional().default(''),

  // Követés / attribúció - a checkout client-side feltölti URL paramokból
  // és localStorage-ben tárolt persistent trackingből (lib/tracking/persistence).
  sourceUrl: z.string().optional().default(''),
  utmSource: z.string().max(200).optional().default(''),
  utmMedium: z.string().max(200).optional().default(''),
  utmCampaign: z.string().max(200).optional().default(''),
  utmTerm: z.string().max(200).optional().default(''),
  utmContent: z.string().max(200).optional().default(''),
  gclid: z.string().max(300).optional().default(''),
  fbclid: z.string().max(300).optional().default(''),
  gbraid: z.string().max(300).optional().default(''),
  wbraid: z.string().max(300).optional().default(''),
  referrer: z.string().max(500).optional().default(''),
});

export type OrderData = z.infer<typeof orderSchema>;

export function validateOrder(data: unknown): {
  success: boolean;
  data?: OrderData;
  errors?: Record<string, string[]>;
} {
  const result = orderSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      errors: z.flattenError(result.error).fieldErrors as Record<string, string[]>,
    };
  }
  return { success: true, data: result.data };
}

/** Egyedi rendelésszám: SLO-<base36 idő>-<random> */
export function generateOrderId(): string {
  const timestamp = Date.now().toString(36);
  const random = crypto.randomUUID().replace(/-/g, '').slice(0, 4);
  return `SLO-${timestamp}-${random}`.toUpperCase();
}
