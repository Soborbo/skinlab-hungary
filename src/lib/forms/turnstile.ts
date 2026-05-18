/**
 * Cloudflare Turnstile verification.
 *
 * Env reading is delegated to the central `readEnv()` (see lib/env.ts) so we
 * have a single source of truth for the Cloudflare-runtime + import.meta.env
 * fallback chain.
 */
import { readEnv } from '@/lib/env';

interface TurnstileResult {
  success: boolean;
  error?: string;
}

/**
 * Verify Turnstile CAPTCHA token (server-side).
 *
 * In dev (`import.meta.env.DEV`), if no secret is configured, allows the
 * submission through — this matches the prior behaviour.
 */
export async function verifyTurnstile(
  token: string,
  ip: string,
): Promise<TurnstileResult> {
  const secretKey = readEnv('TURNSTILE_SECRET_KEY');

  if (!secretKey) {
    console.error('TURNSTILE_SECRET_KEY not configured');
    if (import.meta.env.DEV) {
      return { success: true };
    }
    return { success: false, error: 'CAPTCHA not configured' };
  }

  try {
    const verifyResponse = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: secretKey,
          response: token,
          remoteip: ip,
        }),
      },
    );

    const verifyBody = (await verifyResponse.json()) as {
      success?: boolean;
      'error-codes'?: string[];
    };

    return {
      success: verifyBody.success === true,
      error: verifyBody['error-codes']?.[0],
    };
  } catch (caught) {
    console.error('Turnstile verification failed:', caught);
    return { success: false, error: 'Verification request failed' };
  }
}

/**
 * Get Turnstile site key for the frontend widget.
 *
 * Called from `.astro` frontmatter (SSR). Reads the Cloudflare runtime env
 * via `cloudflare:workers`, with `import.meta.env` fallback so local `astro
 * dev` and prerendered contexts continue to work as long as the value is in
 * the `.env` file.
 */
export function getTurnstileSiteKey(): string {
  return readEnv('PUBLIC_TURNSTILE_SITE_KEY') ?? '';
}
