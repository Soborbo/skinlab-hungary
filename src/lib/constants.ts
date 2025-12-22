// ============================================
// SKINLAB HUNGARY - Konstansok és cégadatok
// ============================================

export const SITE = {
  name: 'SkinLab Hungary',
  url: 'https://skinlabhungary.hu',
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
  { name: 'Horváth László', role: 'Technikai szakértő' },
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
  },
  {
    id: 'sminktetovalas',
    name: 'MAST sminktetováló eszközök',
    nameShort: 'Sminktetováló gépek',
    slug: 'sminktetovalas',
    description: 'Vezetékes és vezeték nélküli sminktetováló gépek és tartozékok.',
    icon: 'pen',
    featured: true,
  },
  {
    id: 'nd-yag-lezerek',
    name: 'Q-kapcsolt ND:YAG lézerkészülékek',
    nameShort: 'ND:YAG lézerek',
    slug: 'nd-yag-lezerek',
    description: 'Tetoválás és pigmentfolt eltávolító lézerek.',
    icon: 'zap',
    featured: true,
  },
  {
    id: 'hydrafacial',
    name: 'Hidrodermabrázió és multifunkcionális gépek',
    nameShort: 'Hydrafacial gépek',
    slug: 'hydrafacial',
    description: 'Hidrodermabráziós és kombinált kozmetikai kezelőgépek.',
    icon: 'droplet',
    featured: true,
  },
  {
    id: 'anti-aging',
    name: 'Anti-aging készülékek',
    nameShort: 'Anti-aging',
    slug: 'anti-aging',
    description: 'RF, HIFU és egyéb bőrfiatalító technológiák.',
    icon: 'sparkles',
    featured: false,
  },
  {
    id: 'szalonberendezes',
    name: 'Szalonberendezés',
    nameShort: 'Szalonberendezés',
    slug: 'szalonberendezes',
    description: 'Professzionális szalonbútorok, trolley-k és kiegészítők.',
    icon: 'armchair',
    featured: false,
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
  { value: '150+', label: 'Eladott Novalight' },
  { value: '2 év', label: 'Garancia' },
  { value: '2 hét', label: 'Szállítási idő' },
  { value: '100%', label: 'Legális behozatal' },
];

// Navigation
export const NAV_ITEMS = [
  { label: 'Diódalézerek', href: '/diodalezerek' },
  { label: 'Hydrafacial', href: '/hydrafacial' },
  { label: 'ND:YAG lézerek', href: '/nd-yag-lezerek' },
  { label: 'Sminktetováló', href: '/sminktetovalas' },
  { label: 'Képzések', href: '/kepzesek' },
  { label: 'Rólunk', href: '/rolunk' },
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
