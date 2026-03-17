/**
 * Cloudflare Turnstile verification
 * Based on astro-forms skill
 */

interface TurnstileResult {
  success: boolean;
  error?: string;
}

/**
 * Verify Turnstile CAPTCHA token
 */
export async function verifyTurnstile(
  token: string,
  ip: string
): Promise<TurnstileResult> {
  const secretKey = import.meta.env.TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    console.error('TURNSTILE_SECRET_KEY not configured');
    // In development, allow form submission without Turnstile
    if (import.meta.env.DEV) {
      return { success: true };
    }
    return { success: false, error: 'CAPTCHA not configured' };
  }

  try {
    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: secretKey,
          response: token,
          remoteip: ip,
        }),
      }
    );

    const result = await response.json();

    return {
      success: result.success === true,
      error: result['error-codes']?.[0],
    };
  } catch (error) {
    console.error('Turnstile verification failed:', error);
    return { success: false, error: 'Verification request failed' };
  }
}

/**
 * Get Turnstile site key for frontend
 */
export function getTurnstileSiteKey(): string {
  return import.meta.env.PUBLIC_TURNSTILE_SITE_KEY || '';
}
