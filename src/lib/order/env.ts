/**
 * Order endpoint környezeti változók feloldása.
 *
 * Cloudflare Workers futásidőben a titkok az `Astro.locals.runtime.env`
 * objektumon érhetők el — ez a dokumentált, megbízható út. Dev / build
 * környezetben az `import.meta.env`-re esik vissza.
 */
export type OrderEnv = Record<string, string | undefined>;

export function resolveOrderEnv(locals: unknown): OrderEnv {
  const runtime = (locals as { runtime?: { env?: unknown } })?.runtime;
  if (runtime && runtime.env && typeof runtime.env === 'object') {
    return runtime.env as OrderEnv;
  }
  return import.meta.env as unknown as OrderEnv;
}

/** Egy env változó értéke (üres stringet undefined-ként kezel) */
export function getEnvValue(env: OrderEnv, key: string): string | undefined {
  const v = env[key];
  return typeof v === 'string' && v.length > 0 ? v : undefined;
}
