/**
 * Megrendelés API végpont - POST /api/order
 *
 * A kosárból érkező megrendelést fogadja. Nincs kártyás fizetés: a
 * megrendelést rögzítjük (admin e-mail + vevői visszaigazoló + Google
 * Sheets), majd a csapat visszahívja a vásárlót és e-mailben küldi a
 * fizetési linket - a trapézlemezes.hu logikáját követve.
 *
 * Top-level try/catch + SRV-FUNC-001 / ORDER-SUBMIT-001 naplózással,
 * hogy a handler ne "csendben" 500-azzon.
 */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { validateOrder, generateOrderId } from '@/lib/order/schema';
import { processOrder } from '@/lib/order/submit';
import { resolveOrderEnv } from '@/lib/order/env';
import type { OrderEmailItem, OrderEmailInput } from '@/lib/order/email';
import { errorResponse } from '@/lib/errors/respond';
import { verifyTurnstile } from '@/lib/forms/turnstile';
import { isFormRateLimited, recordFormSubmission } from '@/lib/forms/rate-limit';
import type { Locale } from '@/i18n/ui';

export const prerender = false;

/** GET - csak POST-ot fogad */
export const GET: APIRoute = async () => {
  return errorResponse('FORM-METHOD-001', {
    userMessage: 'Ez a végpont csak POST kéréseket fogad (megrendelés beküldés).',
    context: { endpoint: '/api/order', method: 'GET' },
    extraHeaders: { Allow: 'POST' },
  });
};

export const POST: APIRoute = async ({ request, locals, clientAddress }) => {
  try {
    // 0. Rate limit - max 5 feldolgozott megrendelés / IP / óra
    if (isFormRateLimited(clientAddress, 'order')) {
      return errorResponse('HTTP-429-001', {
        userMessage: 'Túl sok beküldés érkezett erről a címről. Kérjük, próbálja újra később.',
        context: { endpoint: '/api/order', ip: clientAddress },
        extraHeaders: { 'Retry-After': '3600' },
      });
    }

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

    // 2-3. Spam védelem - honeypot + time-check (>3 mp kitöltési idő).
    //    Csendes elutasítás: a botnak hamis sikert adunk vissza, hogy ne
    //    tudja kitanulni, melyik védelem buktatta le.
    const honeypotTripped = typeof raw.website === 'string' && raw.website.length > 0;
    const startTime = Number(raw.formStartTime || 0);
    const tooFast = startTime > 0 && Date.now() - startTime < 3000;
    if (honeypotTripped || tooFast) {
      console.warn('[order] spam guard tripped - returning fake success', {
        ip: clientAddress,
        guard: honeypotTripped ? 'honeypot' : 'time-check',
      });
      return new Response(
        JSON.stringify({ success: true, orderId: generateOrderId(), proforma: { sent: false } }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      );
    }

    // 4. Validáció (a normalizált `raw`-ot validáljuk, hogy a fenti
    //    honeypot/timing őrök ne látszólag más adatot tisztítsanak)
    const validation = validateOrder(raw);
    if (!validation.success || !validation.data) {
      return errorResponse('ORDER-ZOD-001', {
        userMessage: 'Kérjük, ellenőrizze a megadott adatokat - néhány mező hibás vagy hiányzik.',
        errors: validation.errors,
        context: { formId: 'order' },
      });
    }
    const data = validation.data;

    if (data.items.length === 0) {
      return errorResponse('ORDER-EMPTY-001', {
        userMessage: 'A kosár üres - kérjük, adjon hozzá terméket a megrendeléshez.',
        context: { formId: 'order' },
      });
    }

    // 5. Env feloldás (Cloudflare runtime → import.meta.env fallback)
    const env = resolveOrderEnv(locals);

    // 6. Turnstile - feltétel nélkül a központi `verifyTurnstile`-on keresztül,
    //    ami dev-ben hiányzó secret mellett átenged, prod-ban viszont
    //    fail-closed (hiányzó secret = minden beküldés elutasítva), ugyanúgy,
    //    mint a contact/consultation végpontokon.
    {
      const result = await verifyTurnstile(data.turnstileToken, clientAddress || '');
      if (!result.success) {
        return errorResponse('ORDER-TURN-001', {
          userMessage: 'A biztonsági ellenőrzés sikertelen - kérjük, próbálja újra.',
          errors: { turnstile: ['A biztonsági ellenőrzés sikertelen.'] },
          context: { formId: 'order', turnstileError: result.error ?? 'unknown' },
        });
      }
    }

    // 7. Szerveroldali ár-újraszámolás a termék-kollekcióból
    //    (a kliens által küldött ár csak tájékoztató - nem megbízható)
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
      // Attribution stack - captured by the checkout form
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

    recordFormSubmission(clientAddress, 'order');
    const result = await processOrder(orderInput, env);
    if (!result.success) {
      // Belső hibarészletet csak logba, generikus üzenetet a kliensnek.
      return errorResponse(result.code || 'ORDER-PERSIST-001', {
        userMessage: 'A megrendelést nem sikerült rögzíteni. Kérjük, próbálja újra, vagy hívjon minket.',
        context: { orderId, errorMessage: result.error ?? 'unknown' },
      });
    }

    // 9. Siker - proforma státusz visszaadva, hogy a success page jelezhesse
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
