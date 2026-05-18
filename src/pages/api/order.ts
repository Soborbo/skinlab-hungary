/**
 * Megrendelés API végpont — POST /api/order
 *
 * A kosárból érkező megrendelést fogadja. Nincs kártyás fizetés: a
 * megrendelést rögzítjük (admin e-mail + vevői visszaigazoló + Google
 * Sheets), majd a csapat visszahívja a vásárlót és e-mailben küldi a
 * fizetési linket — a trapézlemezes.hu logikáját követve.
 *
 * Top-level try/catch + SRV-FUNC-001 / ORDER-SUBMIT-001 naplózással,
 * hogy a handler ne "csendben" 500-azzon.
 */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { validateOrder, generateOrderId } from '@/lib/order/schema';
import { processOrder } from '@/lib/order/submit';
import { resolveOrderEnv, getEnvValue } from '@/lib/order/env';
import type { OrderEmailItem, OrderEmailInput } from '@/lib/order/email';
import { errorResponse } from '@/lib/errors/respond';
import type { Locale } from '@/i18n/ui';

export const prerender = false;

/** GET — csak POST-ot fogad */
export const GET: APIRoute = async () => {
  return errorResponse('FORM-METHOD-001', {
    userMessage: 'Ez a végpont csak POST kéréseket fogad (megrendelés beküldés).',
    context: { endpoint: '/api/order', method: 'GET' },
    extraHeaders: { Allow: 'POST' },
  });
};

/** Turnstile ellenőrzés — explicit env-vel (Cloudflare runtime kompatibilis) */
async function verifyTurnstile(
  secret: string,
  token: string,
  ip: string,
): Promise<boolean> {
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret, response: token, remoteip: ip }),
    });
    const result = (await res.json()) as { success?: boolean };
    return result.success === true;
  } catch (err) {
    console.error('[order] Turnstile verification failed:', err);
    return false;
  }
}

export const POST: APIRoute = async ({ request, locals, clientAddress }) => {
  try {
    // 1. Body parse
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return errorResponse('SRV-PARSE-001', {
        userMessage: 'Hibás kérés. Kérjük, frissítse az oldalt és próbálja újra.',
        context: { contentType: request.headers.get('content-type') || 'unknown' },
      });
    }
    const raw = (body || {}) as Record<string, unknown>;

    // 2. Spam védelem — honeypot
    if (typeof raw.website === 'string' && raw.website.length > 0) {
      return errorResponse('ORDER-SPAM-001', {
        status: 400,
        userMessage: 'A megrendelést nem sikerült feldolgozni.',
        context: { formId: 'order' },
      });
    }

    // 3. Spam védelem — time-check (>3 mp kitöltési idő)
    const startTime = Number(raw.formStartTime || 0);
    if (startTime > 0 && Date.now() - startTime < 3000) {
      return errorResponse('ORDER-SPAM-001', {
        status: 400,
        userMessage: 'A megrendelést nem sikerült feldolgozni.',
        context: { formId: 'order' },
      });
    }

    // 4. Validáció
    const validation = validateOrder(body);
    if (!validation.success || !validation.data) {
      return errorResponse('ORDER-ZOD-001', {
        userMessage: 'Kérjük, ellenőrizze a megadott adatokat — néhány mező hibás vagy hiányzik.',
        errors: validation.errors,
        context: { formId: 'order' },
      });
    }
    const data = validation.data;

    if (data.items.length === 0) {
      return errorResponse('ORDER-EMPTY-001', {
        userMessage: 'A kosár üres — kérjük, adjon hozzá terméket a megrendeléshez.',
        context: { formId: 'order' },
      });
    }

    // 5. Env feloldás (Cloudflare runtime → import.meta.env fallback)
    const env = resolveOrderEnv(locals);

    // 6. Turnstile (csak ha be van állítva a secret)
    const turnstileSecret = getEnvValue(env, 'TURNSTILE_SECRET_KEY');
    if (turnstileSecret) {
      const ok = await verifyTurnstile(turnstileSecret, data.turnstileToken, clientAddress || '');
      if (!ok) {
        return errorResponse('ORDER-TURN-001', {
          userMessage: 'A biztonsági ellenőrzés sikertelen — kérjük, próbálja újra.',
          errors: { turnstile: ['A biztonsági ellenőrzés sikertelen.'] },
          context: { formId: 'order' },
        });
      }
    }

    // 7. Szerveroldali ár-újraszámolás a termék-kollekcióból
    //    (a kliens által küldött ár csak tájékoztató — nem megbízható)
    const products = await getCollection('products');
    const items: OrderEmailItem[] = data.items.map((item) => {
      const product = products.find((p) => p.data.slug === item.slug);
      let name = item.name;
      let variantName = item.variantName || '';
      let sku = item.sku;
      let unitPrice: number | null = null;

      if (product) {
        name = product.data.name;
        const variant = product.data.variants?.find((v) => v.sku === item.sku);
        if (variant) {
          variantName = variant.name;
          sku = variant.sku;
          unitPrice =
            typeof variant.price === 'number'
              ? variant.price
              : typeof product.data.price === 'number'
                ? product.data.price
                : null;
        } else {
          variantName = '';
          sku = product.data.sku;
          unitPrice = typeof product.data.price === 'number' ? product.data.price : null;
        }
      }

      return {
        name,
        variantName,
        sku,
        qty: item.qty,
        unitPrice,
        lineTotal: unitPrice === null ? null : unitPrice * item.qty,
      };
    });

    const subtotal = items.reduce((sum, i) => sum + (i.lineTotal || 0), 0);
    const hasPriceOnRequest = items.some((i) => i.unitPrice === null);

    // 8. Megrendelés feldolgozása
    const orderId = generateOrderId();
    const orderInput: OrderEmailInput = {
      orderId,
      locale: data.locale as Locale,
      lastName: data.lastName,
      firstName: data.firstName,
      email: data.email,
      phone: data.phone,
      company: data.company || '',
      taxNumber: data.taxNumber || '',
      country: data.country,
      postcode: data.postcode,
      city: data.city,
      street: data.street,
      notes: data.notes || '',
      items,
      subtotal,
      hasPriceOnRequest,
      sourceUrl: data.sourceUrl || '',
      // Attribution stack — captured by the checkout form
      utmSource: data.utmSource || '',
      utmMedium: data.utmMedium || '',
      utmCampaign: data.utmCampaign || '',
      utmTerm: data.utmTerm || '',
      utmContent: data.utmContent || '',
      gclid: data.gclid || '',
      fbclid: data.fbclid || '',
      referrer: data.referrer || '',
      userAgent: request.headers.get('user-agent') ?? undefined,
    };

    const result = await processOrder(orderInput, env);
    if (!result.success) {
      return errorResponse(result.code || 'ORDER-PERSIST-001', {
        userMessage: result.error || 'A megrendelést nem sikerült rögzíteni. Kérjük, próbálja újra.',
        context: { orderId },
      });
    }

    // 9. Siker — proforma státusz visszaadva, hogy a success page jelezhesse
    //    a vevőnek, várjon-e külön fizetési e-mailre
    const proformaStatus = result.proforma?.success
      ? { sent: true as const, number: result.proforma.proformaNumber }
      : { sent: false as const };

    return new Response(
      JSON.stringify({ success: true, orderId, proforma: proformaStatus }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[SRV-FUNC-001] /api/order top-level exception:', message, err);
    return errorResponse('ORDER-SUBMIT-001', {
      userMessage: 'Váratlan hiba történt a megrendelés feldolgozása közben. Kérjük, próbálja újra később.',
      context: { errorMessage: message },
    });
  }
};
