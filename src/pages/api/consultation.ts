/**
 * Consultation wizard form API endpoint
 * POST /api/consultation
 *
 * Multi-step wizard submission handler
 */
import type { APIRoute } from 'astro';
import { validateConsultationForm } from '@/lib/forms/schemas';
import { verifyTurnstile } from '@/lib/forms/turnstile';
import { processConsultationSubmission } from '@/lib/forms/submit';

export const prerender = false;

/**
 * GET handler - returns method not allowed
 */
export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({
      success: false,
      error: 'Method not allowed. Use POST to submit consultation form.',
    }),
    {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
        Allow: 'POST',
      },
    }
  );
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
    const validation = validateConsultationForm(data);

    if (!validation.success) {
      return new Response(
        JSON.stringify({
          success: false,
          errors: validation.errors,
          error: 'Kérjük, ellenőrizze a megadott adatokat.',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Verify Turnstile CAPTCHA
    const turnstileToken = data['cf-turnstile-response'] as string;
    const turnstileResult = await verifyTurnstile(turnstileToken, clientAddress);

    if (!turnstileResult.success) {
      return new Response(
        JSON.stringify({
          success: false,
          errors: { 'cf-turnstile-response': ['CAPTCHA ellenőrzés sikertelen'] },
          error: 'Kérjük, végezze el újra a CAPTCHA ellenőrzést.',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Process form submission
    const result = await processConsultationSubmission(validation.data!, clientAddress);

    if (!result.success) {
      return new Response(
        JSON.stringify({
          success: false,
          error: result.error || 'Hiba történt a küldés során.',
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
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
    console.error('Consultation form error:', error);

    return new Response(
      JSON.stringify({
        success: false,
        error: 'Váratlan hiba történt. Kérjük, próbálja újra később.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
