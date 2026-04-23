// ============================================
// SKINLAB HUNGARY - Konstansok és cégadatok
// ============================================

const siteUrl = import.meta.env.DEV ? 'http://localhost:4321' : 'https://skinlabhungary.hu';

export const SITE = {
  name: 'Skinlab Hungary',
  url: siteUrl,
  locale: 'hu-HU',
  language: 'hu',
};

export const COMPANY = {
  name: 'Skinlab Beauty Equipment Kft.',
  legalName: 'Skinlab Beauty Equipment Kft.',
  foundingDate: '2024',
  registrationNumber: '13-09-2420',
  taxId: '32871580-2-13',
  vatId: 'HU32871580',
  slogan: 'laser&beauty equipment',
  description: 'Professzionális kozmetikai berendezések forgalmazása Magyarországon. Diódalézerek, sminktetováló gépek, ND:YAG lézerek és multifunkcionális kezelőgépek 2 év garanciával, ingyenes betanítással és azonnali szervizháttérrel.',
  descriptionShort: 'Professzionális kozmetikai gépek és lézerek forgalmazása 2 év garanciával.',
  priceRange: '€€€€',
  areaServed: ['HU', 'SK', 'RO'],
  currenciesAccepted: ['HUF', 'EUR'],
  paymentAccepted: ['Készpénz', 'Bankkártya', 'Átutalás', 'Részletfizetés'],
};

export const FOUNDERS = [
  { name: 'Horváth László', roleKey: 'technical', image: '/about/horvath-laszlo-skinlab-alapito' },
  { name: 'Gaszler Simonetta', roleKey: 'treatment', image: '/about/gaszler-simonetta-skinlab-alapito' },
];

export const CONTACT = {
  phone: '+3613009280',
  phoneFormatted: '+36 1 300 9280',
  phoneDisplay: '+36 1 300 9280',
  phoneTel: 'tel:+3613009280',
  email: 'info@skinlabhungary.hu',
  emailLegacy: 'skinlabhungary@gmail.com',
};

export const LOCATIONS = {
  headquarters: {
    name: 'Székhely',
    streetAddress: 'János utca 14.',
    postalCode: '2030',
    city: 'Érd',
    country: 'HU',
    countryName: 'Magyarország',
    fullAddress: '2030 Érd, János utca 14.',
  },
  showroom: {
    name: 'Skinlab SHOWROOM',
    streetAddress: 'Budai út 28.',
    postalCode: '2030',
    city: 'Érd',
    country: 'HU',
    countryName: 'Magyarország',
    fullAddress: '2030 Érd, Budai út 28.',
    openingHours: 'Előre egyeztetett időpontban',
    openingHoursNote: 'H-P: előre egyeztetett időpontban',
    geo: {
      latitude: 47.378666588736394,
      longitude: 18.9253785018499,
    },
    googleMapsUrl: 'https://www.google.com/maps?q=47.378666588736394,18.9253785018499',
  },
};

export const SOCIAL = {
  facebook: {
    url: 'https://facebook.com/skinlabhungary',
    label: 'Facebook',
  },
  instagram: {
    url: 'https://www.instagram.com/skinlabhungary',
    label: 'Instagram',
  },
  tiktok: {
    url: 'https://www.tiktok.com/@skinlabhungary',
    label: 'TikTok',
  },
};

// Elegant feminine color palette for categories
// Each category has a unique subtle accent used across the site
export const CATEGORY_COLORS = {
  diodalezerek: {
    accent: '#b8a9c9',       // soft lavender
    accentLight: '#ede8f3',   // lavender mist
    accentDark: '#7c6a94',    // deep lavender
    gradient: 'from-[#b8a9c9] to-[#9b8bb4]',
    gradientHero: 'from-[#ede8f3] via-[#f5f1f9] to-white',
  },
  'nd-yag-lezerek': {
    accent: '#c9a9b8',       // dusty rose
    accentLight: '#f3e8ee',   // rose mist
    accentDark: '#946a7c',    // deep rose
    gradient: 'from-[#c9a9b8] to-[#b48fa1]',
    gradientHero: 'from-[#f3e8ee] via-[#f9f1f5] to-white',
  },
  hydrafacial: {
    accent: '#a9c9c4',       // sage mint
    accentLight: '#e8f3f1',   // mint mist
    accentDark: '#6a9490',    // deep sage
    gradient: 'from-[#a9c9c4] to-[#8fb4ae]',
    gradientHero: 'from-[#e8f3f1] via-[#f1f9f7] to-white',
  },
  coldplasma: {
    accent: '#a9bcc9',       // powder blue
    accentLight: '#e8eff3',   // ice mist
    accentDark: '#6a8494',    // steel blue
    gradient: 'from-[#a9bcc9] to-[#8fa5b4]',
    gradientHero: 'from-[#e8eff3] via-[#f1f6f9] to-white',
  },
  sminktetovalas: {
    accent: '#c9bba9',       // warm champagne
    accentLight: '#f3efe8',   // champagne mist
    accentDark: '#94836a',    // deep champagne
    gradient: 'from-[#c9bba9] to-[#b4a48f]',
    gradientHero: 'from-[#f3efe8] via-[#f9f6f1] to-white',
  },
  szalonberendezes: {
    accent: '#c4b8a9',       // warm taupe
    accentLight: '#f1ede8',   // taupe mist
    accentDark: '#8f8474',    // deep taupe
    gradient: 'from-[#c4b8a9] to-[#ae9f8f]',
    gradientHero: 'from-[#f1ede8] via-[#f8f5f1] to-white',
  },
  kellekek: {
    accent: '#b8c4a9',       // soft sage green
    accentLight: '#edf1e8',   // sage mist
    accentDark: '#7c8f6a',    // deep sage
    gradient: 'from-[#b8c4a9] to-[#a1ae8f]',
    gradientHero: 'from-[#edf1e8] via-[#f5f8f1] to-white',
  },
} as const;

export const CATEGORIES = [
  {
    id: 'diodalezerek',
    name: 'Diódalézeres szőrtelenítő készülékek',
    nameShort: 'Diódalézerek',
    slug: 'diodalezerek',
    description: 'Professzionális 4 hullámhosszas diódalézerek tartós szőrtelenítéshez.',
    icon: 'laser',
    image: '/images/opt/products/dame-4-nagyteljesitmenyu-diodalezer-keszulek-1-480w.webp',
    featured: true,
    productCount: 9,
    color: 'diodalezerek' as keyof typeof CATEGORY_COLORS,
  },
  {
    id: 'nd-yag-lezerek',
    name: 'Q-kapcsolt ND:YAG lézerkészülékek',
    nameShort: 'ND:YAG lézerek',
    slug: 'nd-yag-lezerek',
    description: 'Tetoválás és pigmentfolt eltávolító lézerek.',
    icon: 'zap',
    image: '/images/opt/products/pixel-q-kapcsolt-nd-yag-lezerkeszulek-1-480w.webp',
    featured: true,
    productCount: 2,
    color: 'nd-yag-lezerek' as keyof typeof CATEGORY_COLORS,
  },
  {
    id: 'hydrafacial',
    name: 'Hidrodermabrázió és multifunkcionális gépek',
    nameShort: 'Hidrodermabrázió',
    slug: 'hydrafacial',
    description: 'Hidrodermabráziós és kombinált kozmetikai kezelőgépek.',
    icon: 'droplet',
    image: '/images/opt/products/hydracrown-expert-1-480w.webp',
    featured: true,
    productCount: 5,
    color: 'hydrafacial' as keyof typeof CATEGORY_COLORS,
  },
  {
    id: 'coldplasma',
    name: 'Hidegplazma készülékek',
    nameShort: 'Hidegplazma',
    slug: 'coldplasma',
    description: 'Hidegplazma, termoplazma és ózonplazma technológiás kozmetikai készülékek.',
    icon: 'snowflake',
    image: '/images/opt/products/the-frost-coldplasma-by-skinlab-1-480w.webp',
    featured: true,
    productCount: 2,
    color: 'coldplasma' as keyof typeof CATEGORY_COLORS,
  },
  {
    id: 'anti-aging',
    name: 'Anti-aging készülékek',
    nameShort: 'Anti-aging',
    slug: 'anti-aging',
    description: 'RF, HIFU és egyéb bőrfiatalító technológiák.',
    icon: 'sparkles',
    image: '/images/opt/products/nofilter-7d-hifu-1-480w.webp',
    featured: false,
    draft: true,
    productCount: 0,
  },
  {
    id: 'sminktetovalas',
    name: 'Sminktetováló eszközök',
    nameShort: 'Sminktetováló',
    slug: 'sminktetovalas',
    description: 'Sminktetováló gépek és tűmodulok.',
    icon: 'pen',
    image: '/images/opt/products/mast-p60-premium-sminktetovalo-gep-allithato-lokethosszal-1-480w.webp',
    featured: true,
    productCount: 3,
    color: 'sminktetovalas' as keyof typeof CATEGORY_COLORS,
  },
  {
    id: 'szalonberendezes',
    name: 'Szalonberendezés',
    nameShort: 'Szalonberendezés',
    slug: 'szalonberendezes',
    description: 'Professzionális szalonbútorok, trolley-k és kiegészítők.',
    icon: 'armchair',
    image: '/images/opt/products/vanityblack-premium-elektromos-kozmetikai-agy-2-800w.webp',
    featured: true,
    productCount: 6,
    color: 'szalonberendezes' as keyof typeof CATEGORY_COLORS,
  },
  {
    id: 'kellekek',
    name: 'Kellékek és kiegészítők',
    nameShort: 'Kellékek',
    slug: 'kellekek',
    description: 'Kezelőanyagok, tűmodulok és egyéb kiegészítők.',
    icon: 'package',
    image: '/images/opt/products/oxygenx-pod-szett-detox-pod-1-480w.webp',
    featured: true,
    productCount: 7,
    color: 'kellekek' as keyof typeof CATEGORY_COLORS,
  },
] as const;

export const TRUST_BADGES = [
  {
    icon: 'shield-check',
    title: '2 év garancia',
    description: 'Teljes körű garancia minden készülékre',
  },
  {
    icon: 'truck',
    title: '15-20 munkanap',
    description: 'Megbízható, hiteles vámkezelésű szállítás',
  },
  {
    icon: 'graduation-cap',
    title: 'FAR tanúsítvány',
    description: 'Hivatalos gépkezelői képzés',
  },
  {
    icon: 'wrench',
    title: 'Saját szerviz',
    description: 'Azonnali javítás, cseregép',
  },
];

export const STATS = [
  { value: '150+', label: 'Eladott készülék' },
  { value: '2 év', label: 'Garancia' },
  { value: '15-20 nap', label: 'Szállítási idő' },
  { value: '100%', label: 'Legális behozatal' },
];

// Mega Menu Navigation Structure
// All labels use i18n translation keys — resolve with t(locale, key) in components
export const MEGA_MENU = {
  columns: [
    {
      titleKey: 'megaMenu.lasers',
      items: [
        { labelKey: 'categories.diodalezerek', href: '/diodalezerek', count: 9, descriptionKey: 'megaMenu.diodeDesc' },
        { labelKey: 'categories.nd-yag-lezerek', href: '/nd-yag-lezerek', count: 2, descriptionKey: 'megaMenu.ndyagDesc' },
      ],
    },
    {
      titleKey: 'megaMenu.treatments',
      items: [
        { labelKey: 'categories.hydrafacial', href: '/hydrafacial', count: 5, descriptionKey: 'megaMenu.hydrafacialDesc' },
        { labelKey: 'categories.coldplasma', href: '/coldplasma', count: 2, descriptionKey: 'megaMenu.coldplasmaDesc' },
      ],
    },
    {
      titleKey: 'megaMenu.pmu',
      items: [
        { labelKey: 'categories.sminktetovalas', href: '/sminktetovalas', count: 3, descriptionKey: 'megaMenu.pmuDesc' },
        { labelKey: 'categories.kellekek', href: '/kellekek', count: 7, descriptionKey: 'megaMenu.accessoriesDesc' },
      ],
    },
    {
      titleKey: 'megaMenu.salon',
      items: [
        { labelKey: 'categories.szalonberendezes', href: '/szalonberendezes', count: 6, descriptionKey: 'megaMenu.furnitureDesc' },
      ],
    },
  ],
  cta: {
    labelKey: 'nav.allProducts',
    href: '/termekek',
  },
};

// Simple navigation for header
// Labels use i18n translation keys — resolve with t(locale, key) in components
export const NAV_ITEMS = [
  { labelKey: 'nav.products', href: '/termekek', hasMegaMenu: true },
  { labelKey: 'nav.about', href: '/rolunk' },
  { labelKey: 'nav.trainings', href: '/kepzesek' },
  { labelKey: 'nav.contact', href: '/kapcsolat' },
];

// SEO defaults
export const SEO_DEFAULTS = {
  titleTemplate: '%s | Skinlab Hungary',
  defaultTitle: 'Skinlab Hungary - Professzionális kozmetikai berendezések',
  defaultDescription: COMPANY.description,
  openGraph: {
    type: 'website',
    locale: 'hu_HU',
    siteName: 'Skinlab Hungary',
  },
};
