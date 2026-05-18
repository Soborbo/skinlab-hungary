/**
 * Cloudflare Turnstile verification.
 *
 * Astro v6 breaking change: `import.meta.env` values are now ALWAYS inlined
 * at build time and no longer read from the Cloudflare runtime env on SSR
 * pages. The new official pattern is `import { env } from 'cloudflare:workers'`
 * — see https://docs.astro.build/en/guides/upgrade-to/v6/#importmetaenv-inlining
 * and https://docs.astro.build/en/guides/integrations-guide/cloudflare/
 *
 * To stay compatible with both runtime (production) and build-time (dev,
 * prerender, tests) contexts, we read from the Workers env first and fall
 * back to `import.meta.env` if nothing was wired through the adapter.
 */
import { env as cloudflareEnv } from 'cloudflare:workers';

type WorkerEnv = Record<string, string | undefined>;

/** Safe accessor — at build time `cloudflareEnv` may be an empty placeholder. */
function readEnv(name: string): string | undefined {
  const fromRuntime = (cloudflareEnv as unknown as WorkerEnv | undefined)?.[name];
  if (fromRuntime && fromRuntime.length > 0) {
    return fromRuntime;
  }
  const fromInlined = (import.meta.env as unknown as WorkerEnv)[name];
  return fromInlined && fromInlined.length > 0 ? fromInlined : undefined;
}

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
