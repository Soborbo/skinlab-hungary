/**
 * In-memory sliding-window rate limiter a form végpontokhoz
 * (astro-security skill: max 5 beküldés / IP / óra).
 *
 * Cloudflare Workers izolátumonként külön Map él, így a limit izolátum
 * szintű - egyetlen forrásból érkező flood (a tipikus spam minta) ellen véd
 * KV/Durable Object függőség nélkül; ugyanaz a trade-off, mint a
 * /api/track saját limiterénél.
 *
 * Két lépésben használjuk, hogy a validációs hibán elhasaló (majd javító)
 * valódi látogató ne égesse el a keretét:
 *  - `isFormRateLimited()` a handler elején csak ELLENŐRIZ,
 *  - `recordFormSubmission()` közvetlenül a tényleges feldolgozás
 *    (Sheets/email/Billingo) előtt SZÁMOL.
 */
const buckets = new Map<string, number[]>();

const WINDOW_MS = 60 * 60 * 1000; // 1 óra
const MAX_PER_WINDOW = 5;
const MAP_MAX = 5_000;

function liveTimestamps(key: string, now: number): number[] {
  return (buckets.get(key) || []).filter((t) => now - t < WINDOW_MS);
}

/** True, ha az IP az adott formon már elérte az órás keretet. */
export function isFormRateLimited(ip: string, formId: string): boolean {
  return liveTimestamps(`${formId}:${ip}`, Date.now()).length >= MAX_PER_WINDOW;
}

/** Egy ténylegesen feldolgozásra kerülő beküldés elkönyvelése. */
export function recordFormSubmission(ip: string, formId: string): void {
  const key = `${formId}:${ip}`;
  const now = Date.now();
  const ts = liveTimestamps(key, now);
  ts.push(now);
  buckets.set(key, ts);
  if (buckets.size > MAP_MAX) {
    for (const [k, v] of buckets) {
      if (v.every((t) => now - t > WINDOW_MS)) buckets.delete(k);
    }
  }
}
