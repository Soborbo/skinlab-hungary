/**
 * Form validation schemas using Zod
 * Based on astro-forms skill
 */
import { z } from 'zod';

// International phone regex - accepts various formats from HU, SK, RO, DE, AT, CZ, HR, SR, SL, etc.
// Supports: +XX XXXXXXXXX, +XXX XXXXXXXXX, 00XX XXXXXXXXX, and local formats
const phoneRegex = /^(\+|00)?[1-9][0-9]{0,3}[ -]?[0-9]{1,4}[ -]?[0-9]{2,4}[ -]?[0-9]{2,6}$/;

/**
 * Contact/Consultation form schema
 */
export const contactSchema = z.object({
  // Required contact fields
  name: z.string().min(2, 'A név megadása kötelező'),
  email: z.string().email('Érvényes email cím szükséges'),
  phone: z.string().regex(phoneRegex, 'Érvényes telefonszám szükséges'),

  // Product interest
  product: z.string().min(1, 'Válassz kategóriát'),

  // Optional message
  message: z.string().max(2000).optional(),

  // GDPR - REQUIRED
  gdprConsent: z.literal(true, {
    errorMap: () => ({ message: 'Az adatvédelmi hozzájárulás kötelező' })
  }),
  gdprTimestamp: z.string().datetime(),

  // Spam protection - honeypot
  honeypot: z.string().max(0, 'Spam detected').optional().default(''),

  // Spam protection - time check (must take >3 seconds to fill)
  formStartTime: z.coerce.number().refine(
    (start) => Date.now() - start > 3000,
    'A form túl gyorsan lett kitöltve'
  ),

  // Turnstile CAPTCHA token
  'cf-turnstile-response': z.string().min(1, 'CAPTCHA ellenőrzés szükséges'),

  // Tracking metadata
  sourceUrl: z.string().url(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;

/**
 * Newsletter subscription schema
 */
export const newsletterSchema = z.object({
  email: z.string().email('Érvényes email cím szükséges'),
  gdprConsent: z.literal(true, {
    errorMap: () => ({ message: 'Az adatvédelmi hozzájárulás kötelező' })
  }),
  gdprTimestamp: z.string().datetime(),
  honeypot: z.string().max(0).optional().default(''),
  sourceUrl: z.string().url(),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;

/**
 * Consultation wizard form schema (multi-step)
 */
export const consultationSchema = z.object({
  // Step 1: Product selection
  product: z.string().min(1, 'Válasszon kategóriát'),

  // Step 2: Timeline
  timeline: z.enum(['asap', '1-3-month', '3-6-month', 'just-looking'], {
    required_error: 'Válasszon időzítést',
  }),

  // Step 3: Business type
  businessType: z.enum(['running-salon', 'opening-soon', 'home-service', 'no-business'], {
    required_error: 'Válasszon vállalkozás típust',
  }),

  // Step 4: Experience level
  experience: z.enum(['regular', 'tried', 'trained', 'beginner'], {
    required_error: 'Válasszon tapasztalati szintet',
  }),

  // Step 5: Contact details
  name: z.string().min(2, 'A név megadása kötelező'),
  email: z.string().email('Érvényes email cím szükséges'),
  phone: z.string().regex(phoneRegex, 'Érvényes telefonszám szükséges'),

  // GDPR - REQUIRED
  gdprConsent: z.literal(true, {
    errorMap: () => ({ message: 'Az adatvédelmi hozzájárulás kötelező' }),
  }),
  gdprTimestamp: z.string().datetime(),

  // Spam protection
  honeypot: z.string().max(0, 'Spam detected').optional().default(''),
  formStartTime: z.coerce.number().refine(
    (start) => Date.now() - start > 3000,
    'A form túl gyorsan lett kitöltve'
  ),

  // Turnstile CAPTCHA token
  'cf-turnstile-response': z.string().min(1, 'CAPTCHA ellenőrzés szükséges'),

  // Tracking metadata
  sourceUrl: z.string().url(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
});

export type ConsultationFormData = z.infer<typeof consultationSchema>;

/**
 * Validate consultation wizard form data
 */
export function validateConsultationForm(data: unknown): {
  success: boolean;
  data?: ConsultationFormData;
  errors?: Record<string, string[]>;
} {
  const result = consultationSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  return {
    success: true,
    data: result.data,
  };
}

/**
 * Validate form data and return errors if any
 */
export function validateContactForm(data: unknown): {
  success: boolean;
  data?: ContactFormData;
  errors?: Record<string, string[]>;
} {
  const result = contactSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  return {
    success: true,
    data: result.data,
  };
}

/**
 * Generate unique lead ID
 */
export function generateLeadId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).slice(2, 8);
  return `SL-${timestamp}-${random}`.toUpperCase();
}

/**
 * Anonymize IP address for GDPR compliance
 */
export function anonymizeIp(ip: string): string {
  // IPv4: zero out last octet
  if (ip.includes('.') && !ip.includes(':')) {
    const parts = ip.split('.');
    if (parts.length === 4) {
      return parts.slice(0, 3).join('.') + '.0';
    }
  }
  // IPv6: zero out last 80 bits (last 5 groups)
  // Standard IPv6 has 8 groups, we keep first 3 and zero the rest
  if (ip.includes(':')) {
    // Handle compressed notation (::) by expanding first
    let fullIp = ip;
    if (ip.includes('::')) {
      const parts = ip.split('::');
      const left = parts[0] ? parts[0].split(':') : [];
      const right = parts[1] ? parts[1].split(':') : [];
      const missing = 8 - left.length - right.length;
      const middle = Array(missing).fill('0');
      fullIp = [...left, ...middle, ...right].join(':');
    }
    const groups = fullIp.split(':');
    if (groups.length === 8) {
      return groups.slice(0, 3).join(':') + ':0:0:0:0:0';
    }
  }
  return 'unknown';
}
