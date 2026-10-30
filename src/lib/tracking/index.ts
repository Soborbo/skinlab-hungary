/**
 * Site tracking barrel over the vendored soborbo-tracking kit
 * (src/lib/soborbo-tracking — byte-identical to the release; never edit it,
 * re-vendor it and run `npm run check:vendored` from the Serverside root).
 *
 * The kit owns consent (own CMP, `sbo`), attribution storage, click ids, the
 * dataLayer event vocabulary, the browser gateway leg and the backend dispatch.
 * This folder owns only what is SkinLab-specific:
 *   - ecommerce.ts          — GA4 Enhanced Ecommerce + order_request_submitted
 *   - entry-attribution.ts  — first-touch landing page / external referrer
 *   - refreshMetaMatchKeys  — submit-time re-read of fbp/fbc/external_id (below)
 *   - request-consent.ts    — the server leg's consent read (API routes)
 */
import { getExternalId, getFbc, getFbp } from '../soborbo-tracking/lib';

export * from '../soborbo-tracking/lib';
export * from './ecommerce';
export {
  initEntryAttribution,
  applyEntryAttributionToForm,
  getEntryLandingUrl,
  getEntryReferrer,
} from './entry-attribution';

/**
 * Re-reads the Meta match keys into a form's hidden inputs at SUBMIT time.
 *
 * MUST be called immediately before `new FormData(form)`. The hidden fields are
 * filled once on page load, but the Meta Pixel writes `_fbp` (and `_fbc`) only
 * AFTER the visitor grants marketing consent — on production that lands long
 * after the fill. Without this the form POSTed an empty `fbp` even for a
 * visitor who had a good one by the time they hit send, and the CAPI leg lost
 * the Browser ID.
 *
 * Only overwrites when we actually have a value — never blanks a populated field.
 */
export function refreshMetaMatchKeys(form: HTMLFormElement): void {
  const set = (name: string, value: string | null | undefined): void => {
    if (!value) return;
    const el = form.querySelector<HTMLInputElement>(`input[name="${name}"]`);
    if (el) el.value = value;
  };
  set('fbc', getFbc());
  set('fbp', getFbp());
  set('external_id', getExternalId());
}
