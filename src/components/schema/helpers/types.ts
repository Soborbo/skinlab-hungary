// src/components/schema/helpers/types.ts
// Strict TypeScript types for Schema.org structured data

// ============================================
// COMMON
// ============================================

export type Currency = 'HUF' | 'GBP' | 'EUR' | 'USD';
export type Language = 'hu-HU' | 'en-GB' | 'en-US' | 'de-DE';
export type Country = 'HU' | 'GB' | 'US' | 'DE' | 'SK' | 'RO';

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

export type WebPageType =
  | 'WebPage'
  | 'AboutPage'
  | 'ContactPage'
  | 'FAQPage'
  | 'CollectionPage'
  | 'ItemPage';

export type ArticleType =
  | 'Article'
  | 'BlogPosting'
  | 'NewsArticle';

// ============================================
// PRODUCT
// ============================================

export interface Brand {
  name: string;
  url?: string;
  logo?: string;
}

export interface ProductOffer {
  price: number;
  currency: Currency;
  availability?: Availability;
  condition?: ItemCondition;
  priceValidUntil?: string;
  url?: string;
}

export interface ProductRating {
  value: number;
  count: number;
}

export interface ProductReview {
  author: string;
  date: string;
  rating: number;
  text: string;
}

export interface ProductShipping {
  price: number;
  country: Country;
  handlingDays?: number;
  transitDays?: number;
}

export interface ProductProps {
  name: string;
  description: string;
  url: string;
  images: string[];
  sku: string;
  brand: string | Brand;
  seller: string;
  price: number;
  currency: Currency;

  availability?: Availability;
  condition?: ItemCondition;
  priceValidUntil?: string;
  sellerId?: string;
  gtin13?: string;
  mpn?: string;

  salePrice?: number;
  salePriceValidUntil?: string;

  category?: string;
  color?: string;
  material?: string;
  weight?: number;
  properties?: { name: string; value: string }[];
  rating?: ProductRating;
  reviews?: ProductReview[];
  shipping?: ProductShipping;
  returnDays?: number;

  locale?: Language;
}

// ============================================
// LOCAL BUSINESS
// ============================================

export interface OpeningHours {
  days: string | string[];
  opens: string;
  closes: string;
}

export interface AreaServed {
  type: 'City' | 'AdministrativeArea' | 'Country' | 'State';
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
  image?: string;
  priceRange?: '£' | '££' | '£££' | '££££' | '$' | '$$' | '$$$' | '$$$$' | '€' | '€€' | '€€€' | '€€€€' | 'Ft' | 'FtFt' | 'FtFtFt' | 'FtFtFtFt';
  currency?: Currency;

  paymentAccepted?: string[];
  openingHours?: OpeningHours[];
  areaServed?: AreaServed[];
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
  image?: string;
  sameAs?: string[];

  locale?: Language;
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
// WEB PAGE
// ============================================

export interface WebPageProps {
  url: string;
  name: string;
  siteUrl: string;

  description?: string;
  type?: WebPageType;
  mainEntityId?: string;
  speakable?: string[];
  datePublished?: string;
  dateModified?: string;

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
