/**
 * Site extension — GA4 Enhanced Ecommerce dataLayer events (browser-only).
 *
 * Ported unchanged from the previous tracking generation so the live GA4
 * event history (view_item / view_item_list / select_item / add_to_cart /
 * begin_checkout) keeps its names — these are canonical ecommerce names in
 * events.json (`channels: ["browser"]`), the gateway never sees them.
 *
 * `trackOrderRequestSubmit` is the ONE conversion here: the lead-style
 * checkout (price confirmed later on a phone consultation) fires
 * `order_request_submitted` (Meta Lead) — NEVER `purchase`. Browser leg only;
 * the server leg is dispatched by /api/order via gateway-dispatch with the
 * same event_id (server-ingress-only contract).
 */
import { hasAnalyticsConsent, hasMarketingConsent } from './consent';
import {
  getSessionId, getDevice, getAttribution, getPageUrl, getGclid, getFbclid,
  normalizeEmail, normalizePhone, sanitizeName,
} from './persistence';
import { generateEventId, setUserDataForEC } from './events';
import { trackingConfig } from './config';

function pushRaw(data: Record<string, unknown>): void {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(data);
}

/** Ecommerce-specific push: clears previous ecommerce data, adds standard metadata */
function pushEcommerceEvent(
  eventName: string,
  ecommerce: Record<string, unknown>,
  extra?: Record<string, unknown>,
): void {
  pushRaw({ ecommerce: null }); // GA4: clear previous ecommerce state
  pushRaw({
    event: eventName,
    ecommerce,
    session_id: getSessionId(),
    device: getDevice(),
    page_url: getPageUrl(),
    ...getAttribution(),
    ...extra,
  });
}

export interface EcommerceItem {
  item_id: string;
  item_name: string;
  item_category?: string;
  item_category2?: string;
  item_brand?: string;
  price?: number;
  currency?: string;
  item_variant?: string;
  index?: number;
  quantity?: number;
  affiliation?: string;
  coupon?: string;
  discount?: number;
}

/** Product page view */
export function trackViewItem(item: EcommerceItem): void {
  if (!hasAnalyticsConsent()) return;
  pushEcommerceEvent('view_item', {
    currency: item.currency || 'HUF',
    value: item.price || 0,
    items: [{ ...item, currency: item.currency || 'HUF', quantity: 1 }],
  });
}

/** Category page view */
export function trackViewItemList(listId: string, listName: string, items: EcommerceItem[]): void {
  if (!hasAnalyticsConsent()) return;
  pushEcommerceEvent('view_item_list', {
    item_list_id: listId,
    item_list_name: listName,
    items: items.map((item, i) => ({
      ...item,
      currency: item.currency || 'HUF',
      index: item.index ?? i,
      quantity: 1,
    })),
  });
}

/** Click on product card from list */
export function trackSelectItem(listId: string, listName: string, item: EcommerceItem): void {
  if (!hasAnalyticsConsent()) return;
  pushEcommerceEvent('select_item', {
    item_list_id: listId,
    item_list_name: listName,
    items: [{ ...item, currency: item.currency || 'HUF', quantity: 1 }],
  });
}

/** Add to cart */
export function trackAddToCart(item: EcommerceItem): void {
  if (!hasAnalyticsConsent()) return;
  pushEcommerceEvent('add_to_cart', {
    currency: item.currency || 'HUF',
    value: (item.price || 0) * (item.quantity || 1),
    items: [{ ...item, currency: item.currency || 'HUF', quantity: item.quantity || 1 }],
  });
}

/** Begin checkout */
export function trackBeginCheckout(items: EcommerceItem[], value: number, currency = 'HUF'): void {
  if (!hasAnalyticsConsent()) return;
  pushEcommerceEvent('begin_checkout', {
    currency,
    value,
    items: items.map(item => ({ ...item, currency: item.currency || currency, quantity: item.quantity || 1 })),
  });
}

/** Lead generation funnel signal for a specific product (GA4 standard event) */
export function trackGenerateLead(productName: string, productSku: string, productPrice?: number): void {
  if (!hasAnalyticsConsent()) return;
  pushRaw({
    event: 'generate_lead',
    product_name: productName,
    product_sku: productSku,
    ...(productPrice != null && { value: productPrice, currency: 'HUF' }),
    session_id: getSessionId(),
    device: getDevice(),
    page_url: getPageUrl(),
  });
}

// ── Order request (lead-style checkout, model A) ───────────────────

export interface OrderRequestSubmitParams {
  orderId: string;
  items: EcommerceItem[];
  value: number;
  currency?: string;
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  /**
   * Pre-generated event id. The checkout generates it BEFORE the /api/order
   * POST (the payload carries it for the server leg) and fires this browser
   * leg only after the order succeeds — both legs share the one id.
   */
  eventId?: string;
}

export interface OrderRequestSubmitResult {
  success: boolean;
  consentBlocked: boolean;
  eventId: string;
  gclid: string | null;
  fbclid: string | null;
}

/**
 * Order request submitted → BROWSER LEG ONLY (dataLayer → GTM → Meta Pixel
 * Lead / GA4). `order_request_submitted` is server-ingress-only on the
 * gateway: /api/order must dispatch the server leg with this event_id (it
 * arrives in the order payload's `event_id` field). PII goes through the
 * hidden Enhanced-Conversions side-channel, never the dataLayer.
 */
export function trackOrderRequestSubmit(params: OrderRequestSubmitParams): OrderRequestSubmitResult {
  const gclid = getGclid(), fbclid = getFbclid();
  const eventId = params.eventId || generateEventId();
  if (!hasMarketingConsent()) return { success: false, consentBlocked: true, eventId, gclid, fbclid };

  const currency = params.currency || trackingConfig.currency;
  const ud: Record<string, string> = {};
  if (params.email) ud.email = normalizeEmail(params.email);
  if (params.phone && params.phone.length >= 8) ud.phone_number = normalizePhone(params.phone);
  if (params.firstName) ud.first_name = sanitizeName(params.firstName);
  if (params.lastName) ud.last_name = sanitizeName(params.lastName);
  if (Object.keys(ud).length > 0) setUserDataForEC(ud);

  pushEcommerceEvent('order_request_submitted', {
    transaction_id: params.orderId,
    currency,
    value: params.value,
    items: params.items.map(item => ({ ...item, currency: item.currency || currency, quantity: item.quantity || 1 })),
  }, {
    event_id: eventId,
    ...(gclid && { gclid }),
  });

  return { success: true, consentBlocked: false, eventId, gclid, fbclid };
}
