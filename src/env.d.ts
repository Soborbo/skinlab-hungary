/// <reference path="../.astro/types.d.ts" />

/**
 * Ambient declaration for the `cloudflare:workers` virtual module provided
 * by `@astrojs/cloudflare`. It exists at runtime (and at Vite build time),
 * but the adapter does not ship a type declaration for it, so `tsc` alone
 * reports TS2307. Astro/Vite resolves the module fine — this is type-only.
 *
 * `env` is the Workers binding object: env vars, secrets, KV namespaces,
 * D1 databases, etc. We type it loosely as a string record because the
 * project reads only string secrets/vars (BILLINGO_*, TURNSTILE_*, GOOGLE_*).
 */
declare module 'cloudflare:workers' {
  export const env: Record<string, string | undefined>;
}
