/**
 * Shim — a napi szintetikus smoke-lead a vendorolt kitből. A site-azonosító a
 * `TRACKING_SITE_ID` var (wrangler.jsonc: "skinlab"); nélküle a kit 6.14+ smoke-ja
 * NEM fut, és a gateway SMOKE_SITES-őre napi hamis riasztást adna.
 */
export * from '../soborbo-tracking/server/backend/smoke';
