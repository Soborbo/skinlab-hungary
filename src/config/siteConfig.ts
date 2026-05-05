// ============================================
// siteConfig.ts — Single source of truth for schema.org entity graph
// All schema generators in schema.ts derive from this config.
// Business data is imported from lib/constants.ts (the existing UI source).
// ============================================

import { z } from 'zod';
import { SITE, COMPANY, CONTACT, LOCATIONS, SOCIAL, FOUNDERS } from '../lib/constants';

// ============================================
// Zod schema — validates at build time
// ============================================

const PersonSchema = z.object({
  name: z.string(),
  slug: z.string(),
  jobTitle: z.string(),
  image: z.string(),
  sameAs: z.array(z.string().url()).default([]),
});

const ReviewPlatformSchema = z.object({
  platform: z.enum(['google', 'facebook', 'trustpilot']),
  rating: z.number().min(1).max(5),
  count: z.number().int().nonnegative(),
  url: z.string().url(),
  primary: z.boolean().default(false),
});

const OpeningHoursSchema = z.object({
  days: z.array(z.string()),
  opens: z.string().regex(/^\d{2}:\d{2}$/),
  closes: z.string().regex(/^\d{2}:\d{2}$/),
});

const SiteConfigSchema = z.object({
  // Identity
  name: z.string(),
  legalName: z.string(),
  brand: z.string(),
  description: z.string(),
  url: z.string().url(),
  locale: z.string(),
  currency: z.string(),
  schemaType: z.string(),
  googleMapsCid: z.string(),
  priceRange: z.string(),
  paymentAccepted: z.array(z.string()),
  foundingDate: z.string(),
  slogan: z.string(),
  registrationNumber: z.string().optional(),
  taxId: z.string().optional(),
  vatId: z.string().optional(),

  // People
  people: z.array(PersonSchema),

  // Contact
  contact: z.object({
    phone: z.string(),
    phoneDisplay: z.string(),
    email: z.string().email(),
  }),

  // Address (showroom / primary location)
  address: z.object({
    street: z.string(),
    city: z.string(),
    postalCode: z.string(),
    country: z.string(),
    geo: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
  }),

  // Service area
  areaServed: z.array(z.object({
    type: z.string(),
    name: z.string(),
  })),

  // Assets
  logo: z.string(),
  image: z.string(),

  // Hours
  hours: z.array(OpeningHoursSchema),

  // Social
  social: z.object({
    facebook: z.string().url().optional(),
    instagram: z.string().url().optional(),
    tiktok: z.string().url().optional(),
    youtube: z.string().url().optional(),
    linkedin: z.string().url().optional(),
  }),

  // Reviews (empty until reviews exist)
  reviews: z.array(ReviewPlatformSchema).default([]),
});

export type SiteConfig = z.infer<typeof SiteConfigSchema>;

// ============================================
// Assembled config — derived from constants.ts
// ============================================

const siteUrl = SITE.url;

export const config: SiteConfig = SiteConfigSchema.parse({
  name: COMPANY.name,
  legalName: COMPANY.legalName,
  brand: COMPANY.brand,
  description: COMPANY.description,
  url: siteUrl,
  locale: SITE.locale,
  currency: 'HUF',
  schemaType: 'HealthAndBeautyBusiness',
  googleMapsCid: '870915258625072656',
  priceRange: COMPANY.priceRange,
  paymentAccepted: COMPANY.paymentAccepted,
  foundingDate: COMPANY.foundingDate,
  slogan: COMPANY.slogan,
  registrationNumber: COMPANY.registrationNumber,
  taxId: COMPANY.taxId,
  vatId: COMPANY.vatId,

  people: [
    {
      name: 'Gaszler Simonetta',
      slug: 'gaszler-simonetta',
      jobTitle: 'Társalapító',
      image: `${siteUrl}/about/gaszler-simonetta-skinlab-alapito.jpg`,
      sameAs: [
        'https://www.linkedin.com/in/szimonetta-gaszler-551997193/',
        'https://www.instagram.com/skinlabhungary/',
        'https://www.facebook.com/skinlabhungary',
      ],
    },
    {
      name: 'Horváth László',
      slug: 'horvath-laszlo',
      jobTitle: 'Társalapító',
      image: `${siteUrl}/about/horvath-laszlo-skinlab-alapito.jpg`,
      sameAs: [],
    },
  ],

  contact: {
    phone: CONTACT.phone,
    phoneDisplay: CONTACT.phoneDisplay,
    email: CONTACT.email,
  },

  address: {
    street: LOCATIONS.showroom.streetAddress,
    city: LOCATIONS.showroom.city,
    postalCode: LOCATIONS.showroom.postalCode,
    country: LOCATIONS.showroom.country,
    geo: {
      lat: LOCATIONS.showroom.geo.latitude,
      lng: LOCATIONS.showroom.geo.longitude,
    },
  },

  areaServed: [{ type: 'Country', name: 'HU' }],

  logo: `${siteUrl}/logo.png`,
  image: `${siteUrl}/showroom.jpg`,

  hours: [
    {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
  ],

  social: {
    facebook: SOCIAL.facebook.url,
    instagram: SOCIAL.instagram.url,
    tiktok: SOCIAL.tiktok.url,
  },

  reviews: [],
});
