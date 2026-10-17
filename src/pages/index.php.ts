/**
 * Legacy OpenCart entrypoint: /index.php?route=…
 *
 * Cloudflare's _redirects (Workers Static Assets) can only match on the PATH,
 * never the query string, so a single `/index.php  /  301` rule sent every
 * legacy hit — including the still-well-ranking contact page
 * (?route=information/contact, GSC avg. position ~1.8, ~1.3k impressions/16mo) —
 * to the homepage and lost that signal. Branch on the `route` query param here
 * so the contact URL consolidates onto /kapcsolat/ and everything else onto /.
 *
 * Runs in the Worker (prerender = false). scripts/patch-wrangler-config.cjs
 * lists /index.php in assets.run_worker_first so the static-asset layer doesn't
 * answer first. The old path-only rule was therefore removed from _redirects.
 */
import type { APIRoute } from 'astro';

// Old OpenCart `route` value → new canonical path. Extend as more legacy
// index.php routes surface in Search Console.
const ROUTE_REDIRECTS: Record<string, string> = {
  'information/contact': '/kapcsolat/',
};

export const prerender = false;

const targetFor = (url: URL): string =>
  ROUTE_REDIRECTS[url.searchParams.get('route') ?? ''] ?? '/';

// One handler for every method (GET from crawlers/links; ALL covers HEAD/POST).
export const ALL: APIRoute = ({ url, redirect }) => redirect(targetFor(url), 301);
