/**
 * Cloudflare runtime env reader.
 *
 * Astro v6 inlines every `import.meta.env.X` lookup at build time
 * (https://docs.astro.build/en/guides/upgrade-to/v6/#importmetaenv-inlining),
 * so secrets only set as Cloudflare Worker runtime vars never reach the
 * server-side handler. The fix is to read from the Workers binding via
 * `cloudflare:workers`, with `import.meta.env` as a fallback for dev /
 * prerender contexts.
 *
 * Every backend module (forms, order, sheets, billingo, etc.) that needs
 * a secret should call `readEnv(name)` instead of `import.meta.env.NAME`.
 */
import { env as cloudflareRuntimeEnv } from 'cloudflare:workers';

type EnvBag = Record<string, string | undefined>;

/** Cloudflare env may be a placeholder at build/prerender time. */
const cfEnv = cloudflareRuntimeEnv as unknown as EnvBag | undefined;

/**
 * Returns the value for `name` from the Cloudflare Worker runtime,
 * falling back to Astro's build-time `import.meta.env`.
 *
 * Returns `undefined` if the value is missing or an empty string —
 * callers can then short-circuit (skip the integration, log a warning,
 * etc.) instead of trying to use an empty credential.
 */
export function readEnv(name: string): string | undefined {
  const fromRuntime = cfEnv?.[name];
  if (typeof fromRuntime === 'string' && fromRuntime.length > 0) {
    return fromRuntime;
  }
  const fromInlined = (import.meta.env as unknown as EnvBag)[name];
  return typeof fromInlined === 'string' && fromInlined.length > 0
    ? fromInlined
    : undefined;
}

/** Convenience accessor for booleans (only "true" / "1" → true). */
export function readEnvBool(name: string): boolean {
  const value = readEnv(name);
  return value === 'true' || value === '1';
}
