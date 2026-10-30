/**
 * Shim — a meglévő `@/lib/tracking/gateway-dispatch` importok a vendorolt kitre
 * mutatnak. A kit bájtra azonos (src/lib/soborbo-tracking); SOHA ne szerkeszd,
 * vendorold újra (`npm run check:vendored` a Serverside gyökeréből).
 */
export * from '../soborbo-tracking/server/backend/gateway-dispatch';
