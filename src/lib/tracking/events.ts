/**
 * DataLayer Events
 *
 * Every event checks consent before pushing.
 * Analytics events need analytics consent.
 * Conversion events need marketing consent (checked in index.ts).
 */

import { hasAnalyticsConsent } from './consent';
import { getSessionId, getDevice, getAttribution, getPageUrl, normalizeEmail, normalizePhone, sanitizeName } from './persistence';

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

// -- Debug mode --

let debugMode = false;

export function enableDebug(): void { debugMode = true; }

function push(data: Record<string, unknown>): void {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(data);
  if (debugMode) console.log('[TRACK]', data);
}

/** Ecommerce-specific push: clears previous ecommerce data, adds standard metadata */
function pushEcommerceEvent(eventName: string, ecommerce: Record<string, unknown>): void {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ ecommerce: null }); // GA4: clear previous ecommerce state
  const payload = {
    event: eventName,
    ecommerce,
    session_id: getSessionId(),
    device: getDevice(),
    page_url: getPageUrl(),
    ...getAttribution(),
  };
  window.dataLayer.push(payload);
  if (debugMode) console.log('[TRACK:ecom]', payload);
}

// -- Event ID --

export function generateEventId(): string {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}-${Math.random().toString(36).slice(2, 10)}`;
}

// -- Calculator / Quiz --

export function trackCalculatorStart(name: string): void {
  if (!hasAnalyticsConsent()) return;
  push({ event: 'calculator_start', calculator_name: name, session_id: getSessionId(), device: getDevice() });
}

export function trackCalculatorStep(stepId: string, stepIndex: number, totalSteps?: number): void {
  if (!hasAnalyticsConsent()) return;
  push({ event: 'calculator_step', step_id: stepId, step_index: stepIndex,
    ...(totalSteps != null && { total_steps: totalSteps }), session_id: getSessionId() });
}

export function trackCalculatorOption(stepId: string, value: string | string[]): void {
  if (!hasAnalyticsConsent()) return;
  push({ event: 'calculator_option', step_id: stepId,
    option_value: Array.isArray(value) ? value.join(',') : value, session_id: getSessionId() });
}

export function trackCalculatorComplete(name: string): void {
  if (!hasAnalyticsConsent()) return;
  push({ event: 'calculator_complete', calculator_name: name, session_id: getSessionId(), device: getDevice() });
}

// -- E-commerce: GA4 Enhanced Ecommerce --

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

/** Add to cart (for webshop integration) */
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

/** Purchase completed */
export function trackPurchase(
  transactionId: string,
  items: EcommerceItem[],
  value: number,
  currency = 'HUF',
  shipping = 0,
  tax = 0,
): void {
  if (!hasAnalyticsConsent()) return;
  pushEcommerceEvent('purchase', {
    transaction_id: transactionId,
    currency,
    value,
    shipping,
    tax,
    items: items.map(item => ({ ...item, currency: item.currency || currency, quantity: item.quantity || 1 })),
  });
}

/** Lead generation for a specific product (GA4 standard event) */
export function trackGenerateLead(productName: string, productSku: string, productPrice?: number): void {
  if (!hasAnalyticsConsent()) return;
  push({
    event: 'generate_lead',
    product_name: productName,
    product_sku: productSku,
    ...(productPrice != null && { value: productPrice, currency: 'HUF' }),
    session_id: getSessionId(),
    device: getDevice(),
    page_url: getPageUrl(),
  });
}

// -- Conversions (PII) --

export interface ConversionData {
  email: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  value?: number;
  currency?: string;
  gclid?: string;
  eventId?: string;
}

function buildConversionPayload(data: ConversionData): Record<string, unknown> {
  const ud: Record<string, string> = { email: normalizeEmail(data.email) };
  if (data.phone && data.phone.length >= 8) ud.phone_number = normalizePhone(data.phone);
  if (data.firstName) ud.first_name = sanitizeName(data.firstName);
  if (data.lastName) ud.last_name = sanitizeName(data.lastName);

  return {
    user_provided_data: ud,
    event_id: data.eventId,
    session_id: getSessionId(),
    device: getDevice(),
    page_url: getPageUrl(),
    ...getAttribution(),
    ...(data.value != null && data.value > 0 && { value: data.value }),
    ...(data.currency && { currency: data.currency }),
    ...(data.gclid && { gclid: data.gclid }),
  };
}

export function pushLeadConversion(data: ConversionData): void {
  push({ event: 'lead_submit', ...buildConversionPayload(data) });
}

export function pushContactConversion(data: ConversionData): void {
  push({ event: 'contact_submit', ...buildConversionPayload(data) });
}

// -- Clicks --

const memoryClickSet = new Set<string>();

function hasClickFired(name: string): boolean {
  const k = `sb_click_${name}_${getSessionId()}`;
  if (memoryClickSet.has(k)) return true;
  if (hasAnalyticsConsent()) {
    try { return sessionStorage.getItem(k) === '1'; } catch { /* */ }
  }
  return false;
}
function markClickFired(name: string): void {
  const k = `sb_click_${name}_${getSessionId()}`;
  memoryClickSet.add(k);
  if (hasAnalyticsConsent()) {
    try { sessionStorage.setItem(k, '1'); } catch { /* */ }
  }
}

export function trackPhoneClick(): void {
  if (!hasAnalyticsConsent()) return;
  if (hasClickFired('phone')) return;
  markClickFired('phone');
  push({ event: 'phone_click', session_id: getSessionId(), device: getDevice() });
}

export function trackCallbackClick(): void {
  if (!hasAnalyticsConsent()) return;
  push({ event: 'callback_click', session_id: getSessionId(), device: getDevice() });
}

// -- Form abandonment --

export function initFormAbandonTracking(
  form: HTMLFormElement, formId = 'quote', timeoutMs = 60_000,
): () => void {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let lastField = '';
  let started = false;

  const onFocus = (e: FocusEvent) => {
    if (!hasAnalyticsConsent()) return;
    const name = (e.target as HTMLElement).getAttribute('name');
    if (!name) return;
    lastField = name;
    if (!started) {
      started = true;
      timer = setTimeout(() => {
        push({ event: 'form_abandon', form_id: formId, last_field: lastField, session_id: getSessionId() });
      }, timeoutMs);
    }
  };

  const onSubmit = () => {
    if (timer) { clearTimeout(timer); timer = null; }
    started = false;
  };

  form.addEventListener('focusin', onFocus);
  form.addEventListener('submit', onSubmit);

  return () => {
    if (timer) { clearTimeout(timer); timer = null; }
    form.removeEventListener('focusin', onFocus);
    form.removeEventListener('submit', onSubmit);
  };
}

// -- Scroll depth --

let scrollCleanup: (() => void) | null = null;

export function initScrollTracking(): void {
  if (scrollCleanup) { scrollCleanup(); scrollCleanup = null; }

  const fired = new Set<number>();
  const thresholds = [25, 50, 75, 100];

  const handler = () => {
    if (!hasAnalyticsConsent()) return;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    if (h <= 0) return;
    const pct = Math.round((window.scrollY / h) * 100);
    for (const t of thresholds) {
      if (pct >= t && !fired.has(t)) {
        fired.add(t);
        push({ event: 'scroll_depth', scroll_percentage: t });
      }
    }
  };

  window.addEventListener('scroll', handler, { passive: true });
  scrollCleanup = () => window.removeEventListener('scroll', handler);
}
