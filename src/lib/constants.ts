// ============================================
// SKINLAB HUNGARY - Konstansok és cégadatok
// ============================================

const siteUrl = import.meta.env.DEV ? 'http://localhost:4321' : 'https://skinlabhungary.hu';

export const SITE = {
  name: 'SkinLab Hungary',
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
  { name: 'Horváth László', role: 'Technikai szakértő', image: '/images/misc/horvath-laszlo.jpg' },
  { name: 'Gaszler Simonetta', role: 'Kezelési szakértő' },
];

export const CONTACT = {
  phone: '+36704136819',
  phoneFormatted: '+36 70 413 68 19',
  phoneDisplay: '+36 70 413 6819',
  phoneTel: 'tel:+36704136819',
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
    name: 'SkinLab SHOWROOM',
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

export const CATEGORIES = [
  {
    id: 'diodalezerek',
    name: 'Diódalézeres szőrtelenítő készülékek',
    nameShort: 'Diódalézerek',
    slug: 'diodalezerek',
    description: 'Professzionális 4 hullámhosszas diódalézerek tartós szőrtelenítéshez.',
    icon: 'laser',
    featured: true,
    productCount: 9,
  },
  {
    id: 'nd-yag-lezerek',
    name: 'Q-kapcsolt ND:YAG lézerkészülékek',
    nameShort: 'ND:YAG lézerek',
    slug: 'nd-yag-lezerek',
    description: 'Tetoválás és pigmentfolt eltávolító lézerek.',
    icon: 'zap',
    featured: true,
    productCount: 2,
  },
  {
    id: 'hydrafacial',
    name: 'Hidrodermabrázió és multifunkcionális gépek',
    nameShort: 'Hidrodermabrázió',
    slug: 'hydrafacial',
    description: 'Hidrodermabráziós és kombinált kozmetikai kezelőgépek.',
    icon: 'droplet',
    featured: true,
    productCount: 5,
  },
  {
    id: 'coldplasma',
    name: 'Hidegplazma készülékek',
    nameShort: 'Hidegplazma',
    slug: 'coldplasma',
    description: 'Hidegplazma, termoplazma és ózonplazma technológiás kozmetikai készülékek.',
    icon: 'snowflake',
    featured: true,
    productCount: 2,
  },
  {
    id: 'anti-aging',
    name: 'Anti-aging készülékek',
    nameShort: 'Anti-aging',
    slug: 'anti-aging',
    description: 'RF, HIFU és egyéb bőrfiatalító technológiák.',
    icon: 'sparkles',
    featured: true,
    productCount: 1,
  },
  {
    id: 'sminktetovalas',
    name: 'Sminktetováló eszközök',
    nameShort: 'Sminktetováló',
    slug: 'sminktetovalas',
    description: 'Sminktetováló gépek és tűmodulok.',
    icon: 'pen',
    featured: true,
    productCount: 3,
  },
  {
    id: 'szalonberendezes',
    name: 'Szalonberendezés',
    nameShort: 'Szalonberendezés',
    slug: 'szalonberendezes',
    description: 'Professzionális szalonbútorok, trolley-k és kiegészítők.',
    icon: 'armchair',
    featured: true,
    productCount: 6,
  },
  {
    id: 'kellekek',
    name: 'Kellékek és kiegészítők',
    nameShort: 'Kellékek',
    slug: 'kellekek',
    description: 'Kezelőanyagok, tűmodulok és egyéb kiegészítők.',
    icon: 'package',
    featured: false,
    productCount: 7,
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
    title: '2 hét szállítás',
    description: 'Gyors, DHL Express kiszállítás',
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
  { value: '2 hét', label: 'Szállítási idő' },
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
        { labelKey: 'categories.anti-aging', href: '/anti-aging', count: 1, descriptionKey: 'megaMenu.antiAgingDesc' },
      ],
    },
    {
      titleKey: 'megaMenu.salon',
      items: [
        { labelKey: 'categories.szalonberendezes', href: '/szalonberendezes', count: 6, descriptionKey: 'megaMenu.furnitureDesc' },
        { labelKey: 'categories.kellekek', href: '/kellekek', count: 7, descriptionKey: 'megaMenu.accessoriesDesc' },
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
  { labelKey: 'nav.trainings', href: '/kepzesek' },
  { labelKey: 'nav.about', href: '/rolunk' },
  { labelKey: 'nav.contact', href: '/kapcsolat' },
];

// SEO defaults
export const SEO_DEFAULTS = {
  titleTemplate: '%s | SkinLab Hungary',
  defaultTitle: 'SkinLab Hungary - Professzionális kozmetikai berendezések',
  defaultDescription: COMPANY.description,
  openGraph: {
    type: 'website',
    locale: 'hu_HU',
    siteName: 'SkinLab Hungary',
  },
};
