/**
 * Cart Store - localStorage-alapú kosár kezelés (Skinlab Hungary)
 *
 * A trapézlemezes webshop kosár-mintáját követi, a Skinlab termékkatalógusához
 * igazítva: nincs kártyás fizetés a végén - a vásárló beküldi az adatait,
 * majd visszahívjuk és e-mailben elküldjük a fizetési linket.
 *
 * - Egyetlen forrás: a böngésző `localStorage`-a (kulcs: `skinlab_cart`)
 * - CustomEvent-ekkel szinkronizálja a UI-t (fejléc badge, mini-kosár fiók)
 * - Az `price === null` termékek "ár egyeztetés alatt" tételként kerülnek be;
 *   ezek nem számítanak bele a részösszegbe.
 */

import { isCartShippable } from '@/lib/shipping/methods';

// ============================================
// TÍPUSOK
// ============================================

/** Egy kosár tétel (egy termék vagy termék-variáns adott darabszámmal) */
export interface CartItem {
  /** Egyedi sor-azonosító (nem a termék SKU-ja) */
  id: string;
  /** Termék slug (a termékoldalra mutató linkhez) */
  slug: string;
  /** Termék vagy variáns cikkszám (SKU) */
  sku: string;
  /** Kategória slug (termékoldal URL-hez) */
  categorySlug: string;
  /** Termék megnevezése */
  name: string;
  /** Variáns megnevezése, ha van (pl. "1600W") */
  variantName?: string;
  /** Termékkép útvonal */
  image: string;
  /** Bruttó ár Ft-ban - `null` esetén "ár egyeztetés alatt" */
  price: number | null;
  /** Darabszám */
  qty: number;
}

export interface CartSummary {
  items: CartItem[];
  /** Külön sorok száma */
  itemCount: number;
  /** Összes darabszám */
  totalQty: number;
  /** Részösszeg - csak az árazott tételek összege */
  subtotal: number;
  /** Van-e a kosárban "ár egyeztetés alatt" tétel */
  hasPriceOnRequest: boolean;
  /**
   * Futárral szállítható-e a kosár? Igaz, ha minden tétel árazott és a
   * 500 000 Ft-os tételhatár alatt van (lásd `lib/shipping/methods`). Hamis
   * esetén csak személyes átvétel / egyeztetett kiszállítás kínálható.
   */
  shippable: boolean;
  /** Végösszeg (a szállítási díj a pénztárban, a mód kiválasztásakor adódik hozzá) */
  grandTotal: number;
}

// ============================================
// CONSTANTS
// ============================================

const CART_STORAGE_KEY = 'skinlab_cart';
const CART_UPDATED_EVENT = 'cart:updated';
const CART_ADDED_EVENT = 'cart:added';
const CART_OPEN_EVENT = 'cart:open';

// ============================================
// INTERNAL HELPERS
// ============================================

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
}

function emitCartUpdate(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(CART_UPDATED_EVENT));
  }
}

/** Nyers localStorage érték → valid CartItem (vagy null, ha hibás) */
function normalizeItem(raw: unknown): CartItem | null {
  if (!raw || typeof raw !== 'object') return null;
  const r = raw as Record<string, unknown>;
  if (typeof r.slug !== 'string' || typeof r.sku !== 'string') return null;
  const qty = typeof r.qty === 'number' && r.qty > 0 ? Math.floor(r.qty) : 1;
  return {
    id: typeof r.id === 'string' ? r.id : generateId(),
    slug: r.slug,
    sku: r.sku,
    categorySlug: typeof r.categorySlug === 'string' ? r.categorySlug : '',
    name: typeof r.name === 'string' ? r.name : r.sku,
    variantName: typeof r.variantName === 'string' && r.variantName ? r.variantName : undefined,
    image: typeof r.image === 'string' ? r.image : '',
    price: typeof r.price === 'number' ? r.price : null,
    qty,
  };
}

// ============================================
// CART OPERATIONS
// ============================================

/** Kosár lekérése localStorage-ból */
export function getCartItems(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown[];
    if (!Array.isArray(parsed)) return [];
    return parsed.map(normalizeItem).filter((i): i is CartItem => i !== null);
  } catch {
    return [];
  }
}

/** Kosár mentése + `cart:updated` esemény */
function saveCart(items: CartItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.warn('[Cart] localStorage mentés sikertelen:', e);
  }
  emitCartUpdate();
}

/**
 * Tétel hozzáadása a kosárhoz. Ha ugyanaz a termék+variáns már bent van,
 * csak a darabszámot növeli. `cart:added` eseményt is küld (mini-kosár nyitásához).
 */
export function addToCart(
  data: Omit<CartItem, 'id' | 'qty'> & { qty?: number },
): CartItem {
  const items = getCartItems();
  const qty = data.qty && data.qty > 0 ? Math.floor(data.qty) : 1;

  // Azonos termék+variáns összevonása
  const existing = items.find(
    (i) => i.sku === data.sku && i.variantName === (data.variantName || undefined),
  );

  let result: CartItem;
  if (existing) {
    existing.qty += qty;
    result = existing;
  } else {
    result = {
      id: generateId(),
      slug: data.slug,
      sku: data.sku,
      categorySlug: data.categorySlug,
      name: data.name,
      variantName: data.variantName || undefined,
      image: data.image,
      price: data.price,
      qty,
    };
    items.push(result);
  }

  saveCart(items);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(CART_ADDED_EVENT, { detail: { item: result } }));
  }
  return result;
}

/** Tétel eltávolítása */
export function removeFromCart(id: string): void {
  const items = getCartItems().filter((item) => item.id !== id);
  saveCart(items);
}

/** Darabszám frissítése (minimum 1) */
export function updateQty(id: string, qty: number): void {
  const items = getCartItems();
  const item = items.find((i) => i.id === id);
  if (!item) return;
  item.qty = Math.max(1, Math.floor(qty));
  saveCart(items);
}

/** Kosár kiürítése */
export function clearCart(): void {
  saveCart([]);
}

/** Külön sorok száma (fejléc badge-hez) */
export function getItemCount(): number {
  return getCartItems().length;
}

/** Teljes összesítő */
export function getCartSummary(): CartSummary {
  const items = getCartItems();
  const totalQty = items.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = items.reduce(
    (sum, i) => sum + (typeof i.price === 'number' ? i.price * i.qty : 0),
    0,
  );
  const hasPriceOnRequest = items.some((i) => typeof i.price !== 'number');

  return {
    items,
    itemCount: items.length,
    totalQty,
    subtotal,
    hasPriceOnRequest,
    shippable: isCartShippable(items),
    grandTotal: subtotal,
  };
}

/** A mini-kosár fiók kinyitásának kérése (fejléc ikonról) */
export function openCartDrawer(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(CART_OPEN_EVENT));
  }
}

// ============================================
// FORMÁZÁS
// ============================================

const LOCALE_TAGS: Record<string, string> = {
  hu: 'hu-HU',
  en: 'en-GB',
  sk: 'sk-SK',
  ro: 'ro-RO',
  de: 'de-DE',
  cs: 'cs-CZ',
  hr: 'hr-HR',
  sr: 'sr-RS',
  sl: 'sl-SI',
};

/** Ár formázása a megadott nyelvhez (HUF, tört rész nélkül) */
export function formatPrice(price: number, locale: string = 'hu'): string {
  const tag = LOCALE_TAGS[locale] || 'hu-HU';
  return new Intl.NumberFormat(tag, {
    style: 'currency',
    currency: 'HUF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export const CART_EVENTS = {
  updated: CART_UPDATED_EVENT,
  added: CART_ADDED_EVENT,
  open: CART_OPEN_EVENT,
} as const;
