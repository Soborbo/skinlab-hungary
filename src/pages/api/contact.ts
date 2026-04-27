/**
 * Contact form API endpoint
 * POST /api/contact
 *
 * Based on astro-forms skill
 */
import type { APIRoute } from 'astro';
import { validateContactForm } from '@/lib/forms/schemas';
import { verifyTurnstile } from '@/lib/forms/turnstile';
import { processFormSubmission } from '@/lib/forms/submit';
import { errorResponse } from '@/lib/errors/respond';

export const prerender = false;

/**
 * GET handler - returns method not allowed
 * Required to prevent build warnings about missing GET handler
 */
export const GET: APIRoute = async () => {
  return errorResponse('FORM-METHOD-001', {
    userMessage: 'Ez a végpont csak POST kéréseket fogad (kapcsolati űrlap beküldés).',
    context: { endpoint: '/api/contact', method: 'GET' },
    extraHeaders: { Allow: 'POST' },
  });
};

export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
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
    const validation = validateContactForm(data);

    if (!validation.success) {
      return errorResponse('FORM-ZOD-002', {
        userMessage: 'Kérjük, ellenőrizze a megadott adatokat — néhány mező hibás vagy hiányzik.',
        errors: validation.errors,
        context: { formId: 'contact' },
      });
    }

    // Verify Turnstile CAPTCHA
    const turnstileToken = data['cf-turnstile-response'] as string;
    const turnstileResult = await verifyTurnstile(turnstileToken, clientAddress);

    if (!turnstileResult.success) {
      return errorResponse('TURN-VERIFY-001', {
        userMessage: 'CAPTCHA ellenőrzés sikertelen — kérjük, végezze el újra.',
        errors: { 'cf-turnstile-response': ['CAPTCHA ellenőrzés sikertelen'] },
        context: { formId: 'contact' },
      });
    }

    // Process form submission
    const result = await processFormSubmission(validation.data!, clientAddress);

    if (!result.success) {
      return errorResponse(result.code ?? 'FORM-SUBMIT-001', {
        userMessage: result.error
          ? `Nem sikerült elküldeni az űrlapot: ${result.error}`
          : 'Nem sikerült elküldeni az űrlapot. Kérjük, próbálja újra később.',
        context: { formId: 'contact', errorMessage: result.error ?? 'unknown' },
      });
    }

    // Success response
    return new Response(
      JSON.stringify({
        success: true,
        leadId: result.leadId,
        message: 'Köszönjük! Hamarosan felvesszük Önnel a kapcsolatot.',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Contact form error:', error);

    return errorResponse('FORM-SUBMIT-001', {
      userMessage: `Váratlan hiba történt a kapcsolati űrlap feldolgozása közben: ${message}`,
      context: { formId: 'contact', errorMessage: message },
    });
  }
};
