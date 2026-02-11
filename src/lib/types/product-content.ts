/**
 * Product Content Types
 *
 * TypeScript interfaces for per-locale product content.
 * Used by the content loader and all product section components.
 */

export interface ProductContentStat {
  value: string;
  unit?: string;
  label: string;
  icon?: string;
}

export interface ProductContentFeature {
  title: string;
  description: string;
  highlight?: string;
  image?: string;
}

export interface ProductContentReview {
  name: string;
  date?: string;
  text: string;
  rating?: number;
}

export interface ProductContentFeatureRows {
  headline: string;
  subtitle: string;
  review?: ProductContentReview;
  features: ProductContentFeature[];
}

export interface ProductContentTraining {
  headline: string;
  badge: string;
  intro: string;
  items: string[];
  closingParagraphs?: string[];
  price: string;
  priceNote: string;
  freeText?: string;
  duration: string;
  ctaText: string;
}

export interface ProductContentTestimonial {
  name: string;
  role?: string;
  location?: string;
  date?: string;
  text: string;
  rating?: number;
  image?: string;
}

export interface ProductContentExpertQuote {
  quote: string;
  author: string;
  role: string;
  image?: string;
}

export interface ProductContentFunctionCard {
  icon: string;
  name: string;
  description: string;
}

export interface ProductContentFAQItem {
  question: string;
  answer: string;
}

export interface ProductContentBuyerChecklist {
  headline?: string;
  subtitle?: string;
  items: string[];
}

export interface ProductContentCTA {
  afterVideo?: { text: string; buttonLabel: string; phoneLabel?: string };
  afterFeatures?: { headline: string; subtitle: string; buttonLabel: string };
  final?: { headline: string; subtitle: string; buttonLabel: string };
}

export interface ProductContentVideoDescription {
  headline: string;
  paragraphs: string[];
}

export interface ProductContent {
  name: string;
  shortDescription: string;
  description: string;
  metaTitle?: string;
  metaDescription?: string;
  stats?: ProductContentStat[];
  roi?: { defaultTreatmentPrice: number };
  videoDescription?: ProductContentVideoDescription;
  cta?: ProductContentCTA;
  featureRows?: ProductContentFeatureRows;
  training?: ProductContentTraining;
  testimonials?: ProductContentTestimonial[];
  expertQuote?: ProductContentExpertQuote;
  specs?: Record<string, string>;
  functionCards?: ProductContentFunctionCard[];
  faq?: ProductContentFAQItem[];
  buyerChecklist?: ProductContentBuyerChecklist;
  whatsIncluded?: string[];
}

export interface CategoryContent {
  testimonials?: ProductContentTestimonial[];
  expertQuote?: ProductContentExpertQuote;
  featureRows?: ProductContentFeatureRows;
  training?: ProductContentTraining;
  functionCards?: ProductContentFunctionCard[];
  faq?: ProductContentFAQItem[];
  buyerChecklist?: ProductContentBuyerChecklist;
  whatsIncluded?: string[];
  stats?: ProductContentStat[];
}
