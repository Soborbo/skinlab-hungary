// ============================================
// schema.ts — JSON-LD entity graph generators
//
// Architecture (per skill):
//   - ONE entity gets declared once with full @id
//   - All other pages reference it via @id only
//   - Homepage declares: full LocalBusiness + WebSite + Organization
//   - Other pages: reference business via @id, add page-specific entities
// ============================================

import type { SiteConfig } from './siteConfig';

// ============================================
// Helpers
// ============================================

/** Build full URL with hash fragment — never bare #fragments */
function id(base: string, suffix: string): string {
  const clean = base.replace(/\/+$/, '');
  return `${clean}#${suffix}`;
}

/** Reference to an entity declared elsewhere */
function ref(base: string, suffix: string): { '@id': string } {
  return { '@id': id(base, suffix) };
}

/** Build canonical URL */
function fullUrl(config: SiteConfig, path = ''): string {
  return `${config.url}${path}`;
}

/** Assemble sameAs array from social + Google Maps CID */
function buildSameAs(config: SiteConfig): string[] {
  const links: string[] = [];
  if (config.social.facebook) links.push(config.social.facebook);
  if (config.social.instagram) links.push(config.social.instagram);
  if (config.social.tiktok) links.push(config.social.tiktok);
  if (config.social.youtube) links.push(config.social.youtube);
  if (config.social.linkedin) links.push(config.social.linkedin);
  if (config.googleMapsCid) {
    links.push(`https://www.google.com/maps?cid=${config.googleMapsCid}`);
  }
  return links;
}

/** Build PostalAddress */
function buildAddress(config: SiteConfig) {
  return {
    '@type': 'PostalAddress',
    streetAddress: config.address.street,
    addressLocality: config.address.city,
    postalCode: config.address.postalCode,
    addressCountry: config.address.country,
  };
}

/** Build GeoCoordinates */
function buildGeo(config: SiteConfig) {
  return {
    '@type': 'GeoCoordinates',
    latitude: config.address.geo.lat,
    longitude: config.address.geo.lng,
  };
}

/** Build OpeningHoursSpecification array */
function buildHours(config: SiteConfig) {
  return config.hours.map((h) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: h.days,
    opens: h.opens,
    closes: h.closes,
  }));
}

/** Build areaServed */
function buildAreaServed(config: SiteConfig) {
  return config.areaServed.map((a) => ({
    '@type': a.type,
    name: a.name,
  }));
}

/** Remove undefined/null/empty values recursively */
function clean(obj: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined || value === null || value === '') continue;
    if (Array.isArray(value) && value.length === 0) continue;
    if (typeof value === 'object' && !Array.isArray(value)) {
      const cleaned = clean(value as Record<string, unknown>);
      if (Object.keys(cleaned).length > 0) result[key] = cleaned;
      continue;
    }
    result[key] = value;
  }
  return result;
}

// ============================================
// Entity builders
// ============================================

/** Full LocalBusiness entity — declared ONLY on homepage */
function buildLocalBusiness(config: SiteConfig) {
  return clean({
    '@type': config.schemaType,
    '@id': id(config.url, 'localbusiness'),
    name: config.name,
    legalName: config.legalName,
    description: config.description,
    url: config.url,
    telephone: config.contact.phone,
    email: config.contact.email,
    logo: config.logo,
    image: config.image,
    priceRange: config.priceRange,
    currenciesAccepted: config.currency,
    paymentAccepted: config.paymentAccepted.join(', '),
    foundingDate: config.foundingDate,
    slogan: config.slogan,
    inLanguage: config.locale,
    address: buildAddress(config),
    geo: buildGeo(config),
    hasMap: `https://www.google.com/maps?cid=${config.googleMapsCid}`,
    openingHoursSpecification: buildHours(config),
    areaServed: buildAreaServed(config),
    sameAs: buildSameAs(config),
    parentOrganization: ref(config.url, 'organization'),
    founder: config.people
      .filter((p) => p.jobTitle.toLowerCase().includes('alapító'))
      .map((p) => ref(config.url, `person-${p.slug}`)),
  });
}

/** Organization entity — declared on homepage */
function buildOrganization(config: SiteConfig) {
  return clean({
    '@type': 'Organization',
    '@id': id(config.url, 'organization'),
    name: config.name,
    legalName: config.legalName,
    url: config.url,
    logo: config.logo,
    image: config.image,
    slogan: config.slogan,
    foundingDate: config.foundingDate,
    email: config.contact.email,
    telephone: config.contact.phone,
    inLanguage: config.locale,
    sameAs: buildSameAs(config),
  });
}

/** WebSite entity — declared on homepage */
function buildWebSite(config: SiteConfig) {
  return {
    '@type': 'WebSite',
    '@id': id(config.url, 'website'),
    name: config.name,
    url: config.url,
    inLanguage: config.locale,
    publisher: ref(config.url, 'organization'),
  };
}

/** Person entity */
function buildPerson(config: SiteConfig, slug: string) {
  const person = config.people.find((p) => p.slug === slug);
  if (!person) throw new Error(`Person not found: ${slug}`);
  return clean({
    '@type': 'Person',
    '@id': id(config.url, `person-${person.slug}`),
    name: person.name,
    jobTitle: person.jobTitle,
    image: person.image,
    worksFor: ref(config.url, 'organization'),
    sameAs: person.sameAs,
  });
}

// ============================================
// Page-level generators
// Each returns a full JSON-LD object with @context + @graph
// ============================================

/** Homepage — declares full LocalBusiness + WebSite + Organization */
export function homepageSchema(config: SiteConfig) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildLocalBusiness(config),
      buildOrganization(config),
      buildWebSite(config),
      // Declare all people
      ...config.people.map((p) => buildPerson(config, p.slug)),
    ],
  };
}

/** Contact page — ContactPage entity + LocalBusiness ref */
export function contactPageSchema(config: SiteConfig, pageUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ContactPage',
        '@id': id(pageUrl, 'webpage'),
        url: pageUrl,
        name: 'Kapcsolat',
        isPartOf: ref(config.url, 'website'),
        about: ref(config.url, 'localbusiness'),
        mainEntity: ref(config.url, 'localbusiness'),
        inLanguage: config.locale,
      },
    ],
  };
}

/** About page — AboutPage entity + Person entities */
export function aboutPageSchema(config: SiteConfig, pageUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': id(pageUrl, 'webpage'),
        url: pageUrl,
        name: 'Rólunk',
        isPartOf: ref(config.url, 'website'),
        about: ref(config.url, 'organization'),
        mainEntity: ref(config.url, 'organization'),
        inLanguage: config.locale,
      },
      // Re-declare persons on about page for richer context
      ...config.people.map((p) => buildPerson(config, p.slug)),
    ],
  };
}

/** Category/collection page — CollectionPage + ItemList */
export function collectionPageSchema(
  config: SiteConfig,
  pageUrl: string,
  categoryName: string,
  productUrls: string[],
) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': id(pageUrl, 'webpage'),
        url: pageUrl,
        name: categoryName,
        isPartOf: ref(config.url, 'website'),
        about: ref(config.url, 'localbusiness'),
        inLanguage: config.locale,
        mainEntity: {
          '@type': 'ItemList',
          '@id': id(pageUrl, 'itemlist'),
          name: categoryName,
          numberOfItems: productUrls.length,
          itemListElement: productUrls.map((url, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url,
          })),
        },
      },
    ],
  };
}

/** Blog post — aligns existing BlogPosting with entity graph */
export function articleSchema(
  config: SiteConfig,
  pageUrl: string,
  article: {
    title: string;
    description: string;
    image?: string;
    datePublished: string;
    dateModified: string;
    author?: string;
  },
) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': id(pageUrl, 'article'),
        headline: article.title,
        description: article.description,
        image: article.image,
        datePublished: article.datePublished,
        dateModified: article.dateModified,
        url: pageUrl,
        isPartOf: ref(config.url, 'website'),
        publisher: ref(config.url, 'organization'),
        author: article.author
          ? { '@type': 'Person', name: article.author }
          : ref(config.url, 'organization'),
        mainEntityOfPage: { '@id': pageUrl },
        inLanguage: config.locale,
      },
    ],
  };
}

/** Breadcrumb — reusable, can be pushed into any page's @graph */
export function breadcrumbSchema(
  pageUrl: string,
  items: { name: string; url?: string }[],
) {
  return {
    '@type': 'BreadcrumbList',
    '@id': id(pageUrl, 'breadcrumb'),
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url || undefined,
    })),
  };
}

/** FAQ — can be pushed into any page's @graph */
export function faqSchema(
  pageUrl: string,
  questions: { question: string; answer: string }[],
) {
  return {
    '@type': 'FAQPage',
    '@id': id(pageUrl, 'faq'),
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };
}

/** Generic WebPage — for pages that don't have a specific type */
export function webPageSchema(config: SiteConfig, pageUrl: string, name: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': id(pageUrl, 'webpage'),
        url: pageUrl,
        name,
        isPartOf: ref(config.url, 'website'),
        about: ref(config.url, 'localbusiness'),
        inLanguage: config.locale,
      },
    ],
  };
}
