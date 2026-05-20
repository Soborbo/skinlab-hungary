// src/components/schema/helpers/types.ts
// Strict TypeScript types for Schema.org structured data

// ============================================
// COMMON
// ============================================

export type Currency = 'HUF' | 'GBP' | 'EUR' | 'USD';
export type Language = 'hu-HU' | 'en-GB' | 'en-US' | 'de-DE';
export type Country = 'HU' | 'GB' | 'US' | 'DE';

export type Availability =
  | 'InStock'
  | 'OutOfStock'
  | 'PreOrder'
  | 'BackOrder'
  | 'Discontinued'
  | 'LimitedAvailability';

export type ItemCondition =
  | 'NewCondition'
  | 'RefurbishedCondition'
  | 'UsedCondition'
  | 'DamagedCondition';

export type LocalBusinessType =
  | 'LocalBusiness'
  | 'MovingCompany'
  | 'HealthAndBeautyBusiness'
  | 'HomeAndConstructionBusiness'
  | 'Electrician'
  | 'Plumber'
  | 'Dentist'
  | 'AccountingService'
  | 'Attorney'
  | 'Restaurant'
  | 'Store'
  | 'HVACBusiness'
  | 'RealEstateAgent';

// ============================================
// BREADCRUMB
// ============================================

export interface BreadcrumbItem {
  name: string;
  url?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  currentUrl: string;
}

// ============================================
// FAQ
// ============================================

export interface FAQQuestion {
  question: string;
  answer: string;
}

export interface FAQProps {
  url: string;
  questions: FAQQuestion[];
}

// ============================================
// LOCAL BUSINESS
// ============================================

export interface OpeningHoursSpec {
  days: string | string[];
  opens: string;
  closes: string;
}

export interface AreaServedSpec {
  type: string;
  name: string;
}

export interface LocalBusinessProps {
  name: string;
  url: string;
  telephone: string;
  streetAddress: string;
  city: string;
  postalCode: string;
  type?: LocalBusinessType;
  country?: Country;
  region?: string;
  latitude?: number;
  longitude?: number;
  email?: string;
  logo?: string;
  image?: string | string[];
  priceRange?: string;
  currency?: Currency;
  paymentAccepted?: string[];
  openingHours?: OpeningHoursSpec[];
  areaServed?: AreaServedSpec[];
  sameAs?: string[];
  mapUrl?: string;
  locale?: Language;
}

// ============================================
// ORGANIZATION
// ============================================

export interface OrganizationProps {
  name: string;
  url: string;
  logo: string;
  legalName?: string;
  slogan?: string;
  foundingDate?: string;
  email?: string;
  telephone?: string;
  image?: string | string[];
  sameAs?: string[];
  locale?: Language;
}

// ============================================
// PRODUCT
// ============================================

export interface BrandSpec {
  name: string;
  url?: string;
  logo?: string;
}

export interface ProductPropertySpec {
  name: string;
  value: string | number;
}

export interface ProductRatingSpec {
  value: number;
  count: number;
}

export interface ProductReviewSpec {
  author: string;
  date: string;
  rating: number;
  text: string;
}

export interface ProductShippingSpec {
  price: number;
  country: string;
  handlingDays?: number;
  transitDays?: number;
}

export interface ProductProps {
  name: string;
  description: string;
  url: string;
  images: string[];
  sku: string;
  brand: string | BrandSpec;
  seller: string;
  price: number;
  currency: Currency;
  availability?: Availability;
  condition?: ItemCondition;
  priceValidUntil?: string;
  sellerId?: string;
  gtin13?: string;
  mpn?: string;
  category?: string;
  color?: string;
  material?: string;
  weight?: number;
  properties?: ProductPropertySpec[];
  rating?: ProductRatingSpec;
  reviews?: ProductReviewSpec[];
  shipping?: ProductShippingSpec;
  returnDays?: number;
  salePrice?: number;
  salePriceValidUntil?: string;
  locale?: Language;
}

// ============================================
// VIDEO
// ============================================

export interface VideoProps {
  url: string;
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  contentUrl?: string;
  embedUrl?: string;
  duration?: string;
  publisherName?: string;
  publisherUrl?: string;
  interactionCount?: number;
  locale?: Language;
}
