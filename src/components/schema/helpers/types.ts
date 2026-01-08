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
