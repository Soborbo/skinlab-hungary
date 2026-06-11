/**
 * Consultation wizard form API endpoint
 * POST /api/consultation
 *
 * Multi-step wizard submission handler
 */
import type { APIRoute } from 'astro';
import { validateConsultationForm, generateLeadId } from '@/lib/forms/schemas';
import { verifyTurnstile } from '@/lib/forms/turnstile';
import { processConsultationSubmission } from '@/lib/forms/submit';
import { isFormRateLimited, recordFormSubmission } from '@/lib/forms/rate-limit';
import { errorResponse } from '@/lib/errors/respond';

export const prerender = false;

/**
 * GET handler - returns method not allowed
 */
export const GET: APIRoute = async () => {
  return errorResponse('FORM-METHOD-001', {
    userMessage: 'Ez a végpont csak POST kéréseket fogad (konzultációs űrlap beküldés).',
    context: { endpoint: '/api/consultation', method: 'GET' },
    extraHeaders: { Allow: 'POST' },
  });
};

export const POST: APIRoute = async ({ request, clientAddress, locals }) => {
  // Astro v6 removed `locals.runtime.ctx` (it is now a *throwing* getter) and
  // moved the Cloudflare execution context to `locals.cfContext`. Resolve the
  // `waitUntil` hook defensively so a missing/renamed binding can never crash
  // the handler - falling back to `undefined` simply awaits the CRM webhook
  // inline instead of fire-and-forget.
  let waitUntil: ((p: Promise<unknown>) => void) | undefined;
  try {
    const cfContext = (locals as unknown as {
      cfContext?: { waitUntil?: (p: Promise<unknown>) => void };
    }).cfContext;
    if (typeof cfContext?.waitUntil === 'function') {
      waitUntil = cfContext.waitUntil.bind(cfContext);
    }
  } catch {
    waitUntil = undefined;
  }

  try {
    // Rate limit - max 5 feldolgozott beküldés / IP / óra
    if (isFormRateLimited(clientAddress, 'consultation')) {
      return errorResponse('HTTP-429-001', {
        userMessage: 'Túl sok beküldés érkezett erről a címről. Kérjük, próbáld újra később.',
        context: { endpoint: '/api/consultation', ip: clientAddress },
        extraHeaders: { 'Retry-After': '3600' },
      });
    }

    // Parse form data
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());

    // Convert gdprConsent string to boolean
    if (data.gdprConsent === 'true') {
      (data as Record<string, unknown>).gdprConsent = true;
    }

    // Convert formStartTime to number
    if (typeof data.formStartTime === 'string') {
      (data as Record<string, unknown>).formStartTime = parseInt(data.formStartTime, 10);
    }

    // Validate form data
    const validation = validateConsultationForm(data);

    if (!validation.success) {
      // Honeypot: csendes elutasítás - a botnak hamis sikert adunk vissza,
      // hogy ne tudja kitanulni, melyik mező buktatta le.
      if (validation.errors?.honeypot) {
        console.warn('[consultation] honeypot tripped - returning fake success', { ip: clientAddress });
        return new Response(
          JSON.stringify({
            success: true,
            leadId: generateLeadId(),
            message: 'Köszönjük! Hamarosan felvesszük veled a kapcsolatot.',
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      }
      return errorResponse('FORM-ZOD-002', {
        userMessage: 'Kérjük, ellenőrizd a megadott adatokat - néhány mező hibás vagy hiányzik.',
        errors: validation.errors,
        context: { formId: 'consultation' },
      });
    }

    // Verify Turnstile CAPTCHA
    const turnstileToken = data['cf-turnstile-response'] as string;
    const turnstileResult = await verifyTurnstile(turnstileToken, clientAddress);

    if (!turnstileResult.success) {
      return errorResponse('TURN-VERIFY-001', {
        userMessage: 'CAPTCHA ellenőrzés sikertelen - kérjük, végezd el újra.',
        errors: { 'cf-turnstile-response': ['CAPTCHA ellenőrzés sikertelen'] },
        context: { formId: 'consultation' },
      });
    }

    // Process form submission - capture User-Agent for the Sheets row too
    recordFormSubmission(clientAddress, 'consultation');
    const userAgent = request.headers.get('user-agent') ?? undefined;
    const result = await processConsultationSubmission(validation.data!, clientAddress, userAgent, waitUntil);

    if (!result.success) {
      // Keep internal error details server-side only - userMessage is generic
      // so we don't leak stack/host/IP info into the browser response.
      return errorResponse(result.code ?? 'FORM-SUBMIT-001', {
        userMessage: 'Nem sikerült elküldeni a konzultációs kérést. Kérjük, próbáld újra később.',
        context: { formId: 'consultation', errorMessage: result.error ?? 'unknown' },
      });
    }

    // Success response
    return new Response(
      JSON.stringify({
        success: true,
        leadId: result.leadId,
        message: 'Köszönjük! Hamarosan felvesszük veled a kapcsolatot.',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Consultation form error:', error);

    // Internal error details stay in the log context - do not echo into userMessage.
    return errorResponse('FORM-SUBMIT-001', {
      userMessage: 'Váratlan hiba történt a konzultációs űrlap feldolgozása közben. Kérjük, próbáld újra később.',
      context: { formId: 'consultation', errorMessage: message },
    });
  }
};
