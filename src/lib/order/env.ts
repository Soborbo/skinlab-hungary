/**
 * Order pipeline env access.
 *
 * History: this module used to read `Astro.locals.runtime.env` (Astro v5
 * pattern), then fall back to `import.meta.env`. Both are broken on Astro
 * v6 + Cloudflare adapter for runtime-only secrets:
 *   - `import.meta.env.X` is inlined at build time — empty if the var
 *     wasn't set as a build variable.
 *   - `Astro.locals.runtime.env` was removed in Astro v6 per the official
 *     upgrade docs; reading it in a server handler can throw.
 *
 * The new approach: read directly from the `cloudflare:workers` virtual
 * module via the shared `@/lib/env#readEnv` helper. The `OrderEnv` type
 * and `resolveOrderEnv` signature are kept for backwards compatibility
 * with existing call sites; `locals` is now ignored.
 */
import { readEnv } from '@/lib/env';

export type OrderEnv = Record<string, string | undefined>;

/**
 * Backwards-compatible shim. Older code calls `resolveOrderEnv(locals)`
 * expecting an env bag. We hand back a Proxy that lazily resolves each
 * key via `readEnv`, so the existing `env[key]` and `getEnvValue(env, key)`
 * call sites keep working without changes.
 */
export function resolveOrderEnv(_locals: unknown): OrderEnv {
  return new Proxy({} as OrderEnv, {
    get: (_target, prop: string) => readEnv(prop),
    has: (_target, prop: string) => readEnv(prop) !== undefined,
  });
}

/** Egy env változó értéke (üres stringet undefined-ként kezel). */
export function getEnvValue(_env: OrderEnv, key: string): string | undefined {
  return readEnv(key);
}
