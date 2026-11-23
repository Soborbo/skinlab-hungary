/**
 * A showcase kategóriaoldal (CategoryShowcaseLayout + src/components/category/)
 * fix feliratai nyelvenként. A kategóriánkénti szöveg NEM ide tartozik, hanem
 * a src/data/categories/<slug>/<nyelv>.ts-be.
 *
 * Miért nem az i18n JSON-okban: ott a hiányzó kulcs csendben a magyarra esik
 * vissza, itt viszont egy nyelv vagy teljes, vagy nincs (a típus kikényszeríti),
 * és a mondatba illesztett számokat függvény rakja össze a nyelv szórendjével.
 */
import type { Locale } from './ui';

export interface ShowcaseUi {
  home: string;
  breadcrumb: string;
  consultCta: string;
  compareCta: string;
  /** Ár nélküli terméknél. */
  askPrice: string;
  googleReviews: string;
  details: string;
  modelDetails: (name: string) => string;
  /** Egytermékes hero második gombja (a név a kártyán áll, a gomb rövid marad). */
  singleDetails: string;
  /** Katalógus-változat: a hero gombja a termékrácshoz. */
  catalogCta: string;
  /** A csoportba nem sorolt termékek csoportja. */
  catalogRest: string;
  /** Katalógus hero-csempéje: a csoport legalacsonyabb ára („12 990 Ft-tól”). */
  priceFrom: (amount: string) => string;
  whenTitle: string;
  installmentTeaser: (monthly: string, months: number) => string;
  reviewsCta: string;
  readMore: string;
  readLess: string;
  whyBuyCta: string;
  finance: {
    over: (amount: string) => string;
    overOrTwo: (amount: string) => string;
    terms: { 3: string; 6: string; 12: string };
    note12: (amount: string) => string;
    note12OrTwo: (amount: string) => string;
    pickModel: string;
    pickMonths: string;
    months: (n: number) => string;
    /** „Havi részlet, {n} hónapon át”: a szám előtti és utáni rész. */
    monthlyLabel: [string, string];
    downPayment: string;
    total: string;
    interest: string;
  };
  video: {
    pill: (duration: string) => string;
    watch: string;
    play: (who: string) => string;
  };
  trainingAlt: string;
  expertRole: string;
  expertAlt: (name: string) => string;
  faqContact: string;
  visit: {
    address: string;
    hours: string;
    booking: string;
    phone: string;
    /** OPENING_HOURS napnevei (magyarul) → rövid nap ezen a nyelven. */
    days: Record<string, string>;
    closed: string;
    mapLoad: (address: string) => string;
    mapTitle: (address: string) => string;
    mapOpen: string;
    mapCookies: string;
    directions: string;
    showroomAlt: string;
  };
  heroVideo: { pause: string; play: string };
  gallery: { prev: string; next: string; images: (name: string) => string; image: (name: string, n: number) => string };
}

const hu: ShowcaseUi = {
  home: 'Főoldal',
  breadcrumb: 'Morzsamenü',
  consultCta: 'Ingyenes konzultáció',
  compareCta: 'Összehasonlítás',
  askPrice: 'Kérj ajánlatot',
  googleReviews: 'Google-értékelések',
  details: 'Részletek',
  modelDetails: (name) => `${name} részletei`,
  singleDetails: 'A gép részletei',
  catalogCta: 'A termékek',
  catalogRest: 'További termékek',
  priceFrom: (amount) => `${amount}-tól`,
  whenTitle: 'Neked való, ha…',
  installmentTeaser: (monthly, months) => `vagy 50% előleg + ${monthly}/hó (${months} hó)`,
  reviewsCta: 'Én is ilyen gépet szeretnék',
  readMore: 'Tovább olvasom',
  readLess: 'Kevesebb',
  whyBuyCta: 'Beszéljük meg a megtérülést',
  finance: {
    over: (amount) => `${amount} felett`,
    overOrTwo: (amount) => `${amount} felett, vagy 2 gép együtt`,
    terms: { 3: '3 hónap', 6: '3 vagy 6 hónap', 12: '3, 6 vagy 12 hónap' },
    note12: (amount) => `A 12 havi részlet ${amount} feletti vásárlásnál elérhető. Pontos ajánlatot a konzultáción adunk.`,
    note12OrTwo: (amount) =>
      `A 12 havi részlet ${amount} felett, vagy két gép együttes vásárlásakor érhető el. Pontos ajánlatot a konzultáción adunk.`,
    pickModel: 'Melyik gép?',
    pickMonths: 'Hány hónap alatt?',
    months: (n) => `${n} hónap`,
    monthlyLabel: ['Havi részlet, ', ' hónapon át'],
    downPayment: 'Előleg (50%)',
    total: 'Összesen',
    interest: 'Kamat',
  },
  video: {
    pill: (duration) => `Videós vélemény · ${duration}`,
    watch: 'Nézd meg a videót',
    play: (who) => `Videó lejátszása: ${who}`,
  },
  trainingAlt: 'Skinlab gépkezelői képzés a bemutatóteremben',
  expertRole: 'Skinlab társalapító, ügyvezető',
  expertAlt: (name) => `${name}, a Skinlab alapítója`,
  faqContact: 'Kérdésed van? Hívj minket.',
  visit: {
    address: 'Cím',
    hours: 'Nyitvatartás',
    booking: 'Bejelentkezés',
    phone: 'Telefon',
    days: { Hétfő: 'H', Kedd: 'K', Szerda: 'Sze', Csütörtök: 'Cs', Péntek: 'P', Szombat: 'Szo', Vasárnap: 'V' },
    closed: 'zárva',
    mapLoad: (address) => `Térkép betöltése: ${address}`,
    mapTitle: (address) => `Térkép: ${address}`,
    mapOpen: 'Térkép megnyitása',
    mapCookies: 'Betöltéskor a Google Térkép sütiket használhat.',
    directions: 'Útvonaltervezés',
    showroomAlt: 'A Skinlab bemutatóterme Érden',
  },
  heroVideo: { pause: 'Videó szüneteltetése', play: 'Videó lejátszása' },
  gallery: {
    prev: 'Előző kép',
    next: 'Következő kép',
    images: (name) => `${name} képei`,
    image: (name, n) => `${name} - ${n}. kép`,
  },
};

/** Szláv többes szám: 1 / 2-4 / 5+ (cs, sk). */
const pluralCsSk = (n: number, one: string, few: string, many: string) =>
  n === 1 ? one : n >= 2 && n <= 4 ? few : many;
/** Szláv többes szám a 10-es maradék szerint (hr, sr). */
const pluralHrSr = (n: number, one: string, few: string, many: string) => {
  const d = n % 10;
  const h = n % 100;
  if (d === 1 && h !== 11) return one;
  if (d >= 2 && d <= 4 && (h < 12 || h > 14)) return few;
  return many;
};
/** Szlovén: 1 / 2 / 3-4 / 5+ (a 100-as maradék szerint). */
const pluralSl = (n: number, one: string, two: string, few: string, many: string) => {
  const h = n % 100;
  return h === 1 ? one : h === 2 ? two : h === 3 || h === 4 ? few : many;
};

const en: ShowcaseUi = {
  home: 'Home',
  breadcrumb: 'Breadcrumb',
  consultCta: 'Free consultation',
  compareCta: 'Compare',
  askPrice: 'Request a quote',
  googleReviews: 'Google reviews',
  details: 'Details',
  modelDetails: (name) => `${name} details`,
  singleDetails: 'Machine details',
  catalogCta: 'Products',
  catalogRest: 'More products',
  priceFrom: (amount) => `from ${amount}`,
  whenTitle: 'Right for you if…',
  installmentTeaser: (monthly, months) => `or 50% deposit + ${monthly}/mo (${months} mo)`,
  reviewsCta: 'I want a machine like this',
  readMore: 'Read more',
  readLess: 'Show less',
  whyBuyCta: "Let's talk about payback",
  finance: {
    over: (amount) => `over ${amount}`,
    overOrTwo: (amount) => `over ${amount}, or 2 machines together`,
    terms: { 3: '3 months', 6: '3 or 6 months', 12: '3, 6 or 12 months' },
    note12: (amount) => `The 12-month plan is available for purchases over ${amount}. We give you an exact offer during the consultation.`,
    note12OrTwo: (amount) =>
      `The 12-month plan is available over ${amount}, or when buying two machines together. We give you an exact offer during the consultation.`,
    pickModel: 'Which machine?',
    pickMonths: 'Over how many months?',
    months: (n) => `${n} ${n === 1 ? 'month' : 'months'}`,
    monthlyLabel: ['Monthly instalment over ', ' months'],
    downPayment: 'Deposit (50%)',
    total: 'Total',
    interest: 'Interest',
  },
  video: {
    pill: (duration) => `Video review · ${duration}`,
    watch: 'Watch the video',
    play: (who) => `Play video: ${who}`,
  },
  trainingAlt: 'Skinlab operator training in the showroom',
  expertRole: 'Skinlab co-founder, managing director',
  expertAlt: (name) => `${name}, Skinlab co-founder`,
  faqContact: 'Have a question? Call us.',
  visit: {
    address: 'Address',
    hours: 'Opening hours',
    booking: 'Booking',
    phone: 'Phone',
    days: { Hétfő: 'Mon', Kedd: 'Tue', Szerda: 'Wed', Csütörtök: 'Thu', Péntek: 'Fri', Szombat: 'Sat', Vasárnap: 'Sun' },
    closed: 'closed',
    mapLoad: (address) => `Load map: ${address}`,
    mapTitle: (address) => `Map: ${address}`,
    mapOpen: 'Open map',
    mapCookies: 'Google Maps may use cookies when loaded.',
    directions: 'Get directions',
    showroomAlt: 'The Skinlab showroom in Érd',
  },
  heroVideo: { pause: 'Pause video', play: 'Play video' },
  gallery: {
    prev: 'Previous image',
    next: 'Next image',
    images: (name) => `${name} images`,
    image: (name, n) => `${name} - image ${n}`,
  },
};

const de: ShowcaseUi = {
  home: 'Startseite',
  breadcrumb: 'Brotkrümelnavigation',
  consultCta: 'Kostenlose Beratung',
  compareCta: 'Vergleich',
  askPrice: 'Angebot anfordern',
  googleReviews: 'Google-Bewertungen',
  details: 'Details',
  modelDetails: (name) => `Details zu ${name}`,
  singleDetails: 'Details zum Gerät',
  catalogCta: 'Die Produkte',
  catalogRest: 'Weitere Produkte',
  priceFrom: (amount) => `ab ${amount}`,
  whenTitle: 'Passt zu dir, wenn…',
  installmentTeaser: (monthly, months) => `oder 50 % Anzahlung + ${monthly}/Monat (${months} Monate)`,
  reviewsCta: 'Ich möchte auch so ein Gerät',
  readMore: 'Weiterlesen',
  readLess: 'Weniger',
  whyBuyCta: 'Lass uns über die Amortisation sprechen',
  finance: {
    over: (amount) => `über ${amount}`,
    overOrTwo: (amount) => `über ${amount} oder 2 Geräte zusammen`,
    terms: { 3: '3 Monate', 6: '3 oder 6 Monate', 12: '3, 6 oder 12 Monate' },
    note12: (amount) => `Die 12-Monats-Rate ist bei Käufen über ${amount} verfügbar. Ein genaues Angebot erhältst du in der Beratung.`,
    note12OrTwo: (amount) =>
      `Die 12-Monats-Rate ist über ${amount} oder beim gemeinsamen Kauf von zwei Geräten verfügbar. Ein genaues Angebot erhältst du in der Beratung.`,
    pickModel: 'Welches Gerät?',
    pickMonths: 'Über wie viele Monate?',
    months: (n) => `${n} ${n === 1 ? 'Monat' : 'Monate'}`,
    monthlyLabel: ['Monatsrate über ', ' Monate'],
    downPayment: 'Anzahlung (50 %)',
    total: 'Gesamt',
    interest: 'Zinsen',
  },
  video: {
    pill: (duration) => `Video-Erfahrungsbericht · ${duration}`,
    watch: 'Video ansehen',
    play: (who) => `Video abspielen: ${who}`,
  },
  trainingAlt: 'Skinlab-Geräteschulung im Showroom',
  expertRole: 'Skinlab Mitgründer, Geschäftsführer',
  expertAlt: (name) => `${name}, Mitgründer von Skinlab`,
  faqContact: 'Hast du eine Frage? Ruf uns an.',
  visit: {
    address: 'Adresse',
    hours: 'Öffnungszeiten',
    booking: 'Termin',
    phone: 'Telefon',
    days: { Hétfő: 'Mo', Kedd: 'Di', Szerda: 'Mi', Csütörtök: 'Do', Péntek: 'Fr', Szombat: 'Sa', Vasárnap: 'So' },
    closed: 'geschlossen',
    mapLoad: (address) => `Karte laden: ${address}`,
    mapTitle: (address) => `Karte: ${address}`,
    mapOpen: 'Karte öffnen',
    mapCookies: 'Google Maps kann beim Laden Cookies verwenden.',
    directions: 'Route planen',
    showroomAlt: 'Der Skinlab Showroom in Érd',
  },
  heroVideo: { pause: 'Video pausieren', play: 'Video abspielen' },
  gallery: {
    prev: 'Vorheriges Bild',
    next: 'Nächstes Bild',
    images: (name) => `Bilder von ${name}`,
    image: (name, n) => `${name} - Bild ${n}`,
  },
};

const cs: ShowcaseUi = {
  home: 'Domů',
  breadcrumb: 'Drobečková navigace',
  consultCta: 'Konzultace zdarma',
  compareCta: 'Porovnání',
  askPrice: 'Vyžádej si nabídku',
  googleReviews: 'Hodnocení Google',
  details: 'Detaily',
  modelDetails: (name) => `Detail modelu ${name}`,
  singleDetails: 'Detail přístroje',
  catalogCta: 'Produkty',
  catalogRest: 'Další produkty',
  priceFrom: (amount) => `od ${amount}`,
  whenTitle: 'Hodí se ti, pokud…',
  installmentTeaser: (monthly, months) => `nebo 50% záloha + ${monthly}/měs. (${months} měs.)`,
  reviewsCta: 'Taky chci takový přístroj',
  readMore: 'Číst dál',
  readLess: 'Méně',
  whyBuyCta: 'Proberme návratnost',
  finance: {
    over: (amount) => `nad ${amount}`,
    overOrTwo: (amount) => `nad ${amount} nebo 2 přístroje společně`,
    terms: { 3: '3 měsíce', 6: '3 nebo 6 měsíců', 12: '3, 6 nebo 12 měsíců' },
    note12: (amount) => `Splátky na 12 měsíců jsou dostupné při nákupu nad ${amount}. Přesnou nabídku ti dáme na konzultaci.`,
    note12OrTwo: (amount) =>
      `Splátky na 12 měsíců jsou dostupné nad ${amount} nebo při společném nákupu dvou přístrojů. Přesnou nabídku ti dáme na konzultaci.`,
    pickModel: 'Který přístroj?',
    pickMonths: 'Na kolik měsíců?',
    months: (n) => `${n} ${pluralCsSk(n, 'měsíc', 'měsíce', 'měsíců')}`,
    monthlyLabel: ['Měsíční splátka po dobu ', ' měsíců'],
    downPayment: 'Záloha (50 %)',
    total: 'Celkem',
    interest: 'Úrok',
  },
  video: {
    pill: (duration) => `Video recenze · ${duration}`,
    watch: 'Podívej se na video',
    play: (who) => `Přehrát video: ${who}`,
  },
  trainingAlt: 'Školení obsluhy přístrojů Skinlab v showroomu',
  expertRole: 'Spoluzakladatel Skinlab, jednatel',
  expertAlt: (name) => `${name}, spoluzakladatel Skinlab`,
  faqContact: 'Máš otázku? Zavolej nám.',
  visit: {
    address: 'Adresa',
    hours: 'Otevírací doba',
    booking: 'Rezervace',
    phone: 'Telefon',
    days: { Hétfő: 'Po', Kedd: 'Út', Szerda: 'St', Csütörtök: 'Čt', Péntek: 'Pá', Szombat: 'So', Vasárnap: 'Ne' },
    closed: 'zavřeno',
    mapLoad: (address) => `Načíst mapu: ${address}`,
    mapTitle: (address) => `Mapa: ${address}`,
    mapOpen: 'Otevřít mapu',
    mapCookies: 'Mapy Google mohou po načtení používat cookies.',
    directions: 'Navigovat',
    showroomAlt: 'Showroom Skinlab v Érdu',
  },
  heroVideo: { pause: 'Pozastavit video', play: 'Přehrát video' },
  gallery: {
    prev: 'Předchozí obrázek',
    next: 'Další obrázek',
    images: (name) => `Obrázky ${name}`,
    image: (name, n) => `${name} - obrázek ${n}`,
  },
};

const sk: ShowcaseUi = {
  home: 'Domov',
  breadcrumb: 'Omrvinková navigácia',
  consultCta: 'Bezplatná konzultácia',
  compareCta: 'Porovnanie',
  askPrice: 'Vyžiadaj si ponuku',
  googleReviews: 'Hodnotenia Google',
  details: 'Detaily',
  modelDetails: (name) => `Detail modelu ${name}`,
  singleDetails: 'Detail zariadenia',
  catalogCta: 'Produkty',
  catalogRest: 'Ďalšie produkty',
  priceFrom: (amount) => `od ${amount}`,
  whenTitle: 'Hodí sa ti, ak…',
  installmentTeaser: (monthly, months) => `alebo 50 % záloha + ${monthly}/mes. (${months} mes.)`,
  reviewsCta: 'Aj ja chcem takéto zariadenie',
  readMore: 'Čítať ďalej',
  readLess: 'Menej',
  whyBuyCta: 'Poďme prebrať návratnosť',
  finance: {
    over: (amount) => `nad ${amount}`,
    overOrTwo: (amount) => `nad ${amount} alebo 2 zariadenia spolu`,
    terms: { 3: '3 mesiace', 6: '3 alebo 6 mesiacov', 12: '3, 6 alebo 12 mesiacov' },
    note12: (amount) => `Splátky na 12 mesiacov sú dostupné pri nákupe nad ${amount}. Presnú ponuku ti dáme na konzultácii.`,
    note12OrTwo: (amount) =>
      `Splátky na 12 mesiacov sú dostupné nad ${amount} alebo pri spoločnom nákupe dvoch zariadení. Presnú ponuku ti dáme na konzultácii.`,
    pickModel: 'Ktoré zariadenie?',
    pickMonths: 'Na koľko mesiacov?',
    months: (n) => `${n} ${pluralCsSk(n, 'mesiac', 'mesiace', 'mesiacov')}`,
    monthlyLabel: ['Mesačná splátka počas ', ' mesiacov'],
    downPayment: 'Záloha (50 %)',
    total: 'Spolu',
    interest: 'Úrok',
  },
  video: {
    pill: (duration) => `Video recenzia · ${duration}`,
    watch: 'Pozri si video',
    play: (who) => `Prehrať video: ${who}`,
  },
  trainingAlt: 'Školenie obsluhy zariadení Skinlab v showroome',
  expertRole: 'Spoluzakladateľ Skinlab, konateľ',
  expertAlt: (name) => `${name}, spoluzakladateľ Skinlab`,
  faqContact: 'Máš otázku? Zavolaj nám.',
  visit: {
    address: 'Adresa',
    hours: 'Otváracie hodiny',
    booking: 'Rezervácia',
    phone: 'Telefón',
    days: { Hétfő: 'Po', Kedd: 'Ut', Szerda: 'St', Csütörtök: 'Št', Péntek: 'Pi', Szombat: 'So', Vasárnap: 'Ne' },
    closed: 'zatvorené',
    mapLoad: (address) => `Načítať mapu: ${address}`,
    mapTitle: (address) => `Mapa: ${address}`,
    mapOpen: 'Otvoriť mapu',
    mapCookies: 'Mapy Google môžu po načítaní používať cookies.',
    directions: 'Navigovať',
    showroomAlt: 'Showroom Skinlab v Érde',
  },
  heroVideo: { pause: 'Pozastaviť video', play: 'Prehrať video' },
  gallery: {
    prev: 'Predchádzajúci obrázok',
    next: 'Ďalší obrázok',
    images: (name) => `Obrázky ${name}`,
    image: (name, n) => `${name} - obrázok ${n}`,
  },
};

const ro: ShowcaseUi = {
  home: 'Acasă',
  breadcrumb: 'Navigare',
  consultCta: 'Consultanță gratuită',
  compareCta: 'Comparație',
  askPrice: 'Cere o ofertă',
  googleReviews: 'Recenzii Google',
  details: 'Detalii',
  modelDetails: (name) => `Detalii ${name}`,
  singleDetails: 'Detaliile aparatului',
  catalogCta: 'Produsele',
  catalogRest: 'Alte produse',
  priceFrom: (amount) => `de la ${amount}`,
  whenTitle: 'Se potrivește dacă…',
  installmentTeaser: (monthly, months) => `sau avans 50% + ${monthly}/lună (${months} luni)`,
  reviewsCta: 'Vreau și eu un astfel de aparat',
  readMore: 'Citește mai mult',
  readLess: 'Mai puțin',
  whyBuyCta: 'Hai să discutăm despre amortizare',
  finance: {
    over: (amount) => `peste ${amount}`,
    overOrTwo: (amount) => `peste ${amount} sau 2 aparate împreună`,
    terms: { 3: '3 luni', 6: '3 sau 6 luni', 12: '3, 6 sau 12 luni' },
    note12: (amount) => `Rata pe 12 luni este disponibilă la achiziții de peste ${amount}. Îți facem o ofertă exactă la consultanță.`,
    note12OrTwo: (amount) =>
      `Rata pe 12 luni este disponibilă peste ${amount} sau la cumpărarea a două aparate împreună. Îți facem o ofertă exactă la consultanță.`,
    pickModel: 'Ce aparat?',
    pickMonths: 'Pe câte luni?',
    months: (n) => `${n} ${n === 1 ? 'lună' : n >= 20 ? 'de luni' : 'luni'}`,
    monthlyLabel: ['Rată lunară, timp de ', ' luni'],
    downPayment: 'Avans (50%)',
    total: 'Total',
    interest: 'Dobândă',
  },
  video: {
    pill: (duration) => `Recenzie video · ${duration}`,
    watch: 'Vezi videoclipul',
    play: (who) => `Redă videoclipul: ${who}`,
  },
  trainingAlt: 'Instruire de operare Skinlab în showroom',
  expertRole: 'Cofondator Skinlab, director general',
  expertAlt: (name) => `${name}, cofondator Skinlab`,
  faqContact: 'Ai o întrebare? Sună-ne.',
  visit: {
    address: 'Adresă',
    hours: 'Program',
    booking: 'Programare',
    phone: 'Telefon',
    days: { Hétfő: 'Lun', Kedd: 'Mar', Szerda: 'Mie', Csütörtök: 'Joi', Péntek: 'Vin', Szombat: 'Sâm', Vasárnap: 'Dum' },
    closed: 'închis',
    mapLoad: (address) => `Încarcă harta: ${address}`,
    mapTitle: (address) => `Hartă: ${address}`,
    mapOpen: 'Deschide harta',
    mapCookies: 'La încărcare, Google Maps poate folosi cookie-uri.',
    directions: 'Planifică traseul',
    showroomAlt: 'Showroomul Skinlab din Érd',
  },
  heroVideo: { pause: 'Pune videoclipul pe pauză', play: 'Redă videoclipul' },
  gallery: {
    prev: 'Imaginea anterioară',
    next: 'Imaginea următoare',
    images: (name) => `Imagini ${name}`,
    image: (name, n) => `${name} - imaginea ${n}`,
  },
};

const hr: ShowcaseUi = {
  home: 'Početna',
  breadcrumb: 'Navigacijski put',
  consultCta: 'Besplatna konzultacija',
  compareCta: 'Usporedba',
  askPrice: 'Zatraži ponudu',
  googleReviews: 'Google recenzije',
  details: 'Detalji',
  modelDetails: (name) => `Detalji o modelu ${name}`,
  singleDetails: 'Detalji o uređaju',
  catalogCta: 'Proizvodi',
  catalogRest: 'Ostali proizvodi',
  priceFrom: (amount) => `od ${amount}`,
  whenTitle: 'Za tebe je ako…',
  installmentTeaser: (monthly, months) => `ili 50% predujam + ${monthly}/mj. (${months} mj.)`,
  reviewsCta: 'I ja želim takav uređaj',
  readMore: 'Pročitaj više',
  readLess: 'Manje',
  whyBuyCta: 'Razgovarajmo o povratu investicije',
  finance: {
    over: (amount) => `iznad ${amount}`,
    overOrTwo: (amount) => `iznad ${amount} ili 2 uređaja zajedno`,
    terms: { 3: '3 mjeseca', 6: '3 ili 6 mjeseci', 12: '3, 6 ili 12 mjeseci' },
    note12: (amount) => `Otplata na 12 mjeseci dostupna je za kupnje iznad ${amount}. Točnu ponudu dobit ćeš na konzultaciji.`,
    note12OrTwo: (amount) =>
      `Otplata na 12 mjeseci dostupna je iznad ${amount} ili pri zajedničkoj kupnji dvaju uređaja. Točnu ponudu dobit ćeš na konzultaciji.`,
    pickModel: 'Koji uređaj?',
    pickMonths: 'Na koliko mjeseci?',
    months: (n) => `${n} ${pluralHrSr(n, 'mjesec', 'mjeseca', 'mjeseci')}`,
    monthlyLabel: ['Mjesečna rata, broj mjeseci: ', ''],
    downPayment: 'Predujam (50%)',
    total: 'Ukupno',
    interest: 'Kamata',
  },
  video: {
    pill: (duration) => `Video recenzija · ${duration}`,
    watch: 'Pogledaj video',
    play: (who) => `Pokreni video: ${who}`,
  },
  trainingAlt: 'Skinlab obuka za rad s uređajima u izložbenom salonu',
  expertRole: 'Suosnivač Skinlaba, direktor',
  expertAlt: (name) => `${name}, suosnivač Skinlaba`,
  faqContact: 'Imaš pitanje? Nazovi nas.',
  visit: {
    address: 'Adresa',
    hours: 'Radno vrijeme',
    booking: 'Termin',
    phone: 'Telefon',
    days: { Hétfő: 'Pon', Kedd: 'Uto', Szerda: 'Sri', Csütörtök: 'Čet', Péntek: 'Pet', Szombat: 'Sub', Vasárnap: 'Ned' },
    closed: 'zatvoreno',
    mapLoad: (address) => `Učitaj kartu: ${address}`,
    mapTitle: (address) => `Karta: ${address}`,
    mapOpen: 'Otvori kartu',
    mapCookies: 'Google karte pri učitavanju mogu koristiti kolačiće.',
    directions: 'Planiraj rutu',
    showroomAlt: 'Skinlab izložbeni salon u Érdu',
  },
  heroVideo: { pause: 'Pauziraj video', play: 'Pokreni video' },
  gallery: {
    prev: 'Prethodna slika',
    next: 'Sljedeća slika',
    images: (name) => `Slike: ${name}`,
    image: (name, n) => `${name} - slika ${n}`,
  },
};

const sl: ShowcaseUi = {
  home: 'Domov',
  breadcrumb: 'Drobtinice',
  consultCta: 'Brezplačno svetovanje',
  compareCta: 'Primerjava',
  askPrice: 'Zahtevaj ponudbo',
  googleReviews: 'Google ocene',
  details: 'Podrobnosti',
  modelDetails: (name) => `Podrobnosti o modelu ${name}`,
  singleDetails: 'Podrobnosti o napravi',
  catalogCta: 'Izdelki',
  catalogRest: 'Drugi izdelki',
  priceFrom: (amount) => `od ${amount}`,
  whenTitle: 'Zate je, če…',
  installmentTeaser: (monthly, months) => `ali 50 % predplačilo + ${monthly}/mes. (${months} mes.)`,
  reviewsCta: 'Tudi jaz želim takšno napravo',
  readMore: 'Preberi več',
  readLess: 'Manj',
  whyBuyCta: 'Pogovoriva se o povračilu naložbe',
  finance: {
    over: (amount) => `nad ${amount}`,
    overOrTwo: (amount) => `nad ${amount} ali 2 napravi skupaj`,
    terms: { 3: '3 mesece', 6: '3 ali 6 mesecev', 12: '3, 6 ali 12 mesecev' },
    note12: (amount) => `Obroki na 12 mesecev so na voljo pri nakupu nad ${amount}. Natančno ponudbo dobiš na svetovanju.`,
    note12OrTwo: (amount) =>
      `Obroki na 12 mesecev so na voljo nad ${amount} ali pri skupnem nakupu dveh naprav. Natančno ponudbo dobiš na svetovanju.`,
    pickModel: 'Katera naprava?',
    pickMonths: 'Na koliko mesecev?',
    months: (n) => `${n} ${pluralSl(n, 'mesec', 'meseca', 'mesece', 'mesecev')}`,
    monthlyLabel: ['Mesečni obrok, število mesecev: ', ''],
    downPayment: 'Predplačilo (50 %)',
    total: 'Skupaj',
    interest: 'Obresti',
  },
  video: {
    pill: (duration) => `Video mnenje · ${duration}`,
    watch: 'Poglej video',
    play: (who) => `Predvajaj video: ${who}`,
  },
  trainingAlt: 'Skinlab usposabljanje za delo z napravami v razstavnem salonu',
  expertRole: 'Soustanovitelj Skinlaba, direktor',
  expertAlt: (name) => `${name}, soustanovitelj Skinlaba`,
  faqContact: 'Imaš vprašanje? Pokliči nas.',
  visit: {
    address: 'Naslov',
    hours: 'Delovni čas',
    booking: 'Termin',
    phone: 'Telefon',
    days: { Hétfő: 'Pon', Kedd: 'Tor', Szerda: 'Sre', Csütörtök: 'Čet', Péntek: 'Pet', Szombat: 'Sob', Vasárnap: 'Ned' },
    closed: 'zaprto',
    mapLoad: (address) => `Naloži zemljevid: ${address}`,
    mapTitle: (address) => `Zemljevid: ${address}`,
    mapOpen: 'Odpri zemljevid',
    mapCookies: 'Google Zemljevidi lahko ob nalaganju uporabljajo piškotke.',
    directions: 'Načrtuj pot',
    showroomAlt: 'Skinlab razstavni salon v Érdu',
  },
  heroVideo: { pause: 'Ustavi video', play: 'Predvajaj video' },
  gallery: {
    prev: 'Prejšnja slika',
    next: 'Naslednja slika',
    images: (name) => `Slike: ${name}`,
    image: (name, n) => `${name} - slika ${n}`,
  },
};

const sr: ShowcaseUi = {
  home: 'Početna',
  breadcrumb: 'Navigacioni put',
  consultCta: 'Besplatne konsultacije',
  compareCta: 'Poređenje',
  askPrice: 'Zatraži ponudu',
  googleReviews: 'Google recenzije',
  details: 'Detalji',
  modelDetails: (name) => `Detalji o modelu ${name}`,
  singleDetails: 'Detalji o uređaju',
  catalogCta: 'Proizvodi',
  catalogRest: 'Ostali proizvodi',
  priceFrom: (amount) => `od ${amount}`,
  whenTitle: 'Za tebe je ako…',
  installmentTeaser: (monthly, months) => `ili 50% avans + ${monthly}/mes. (${months} mes.)`,
  reviewsCta: 'I ja želim takav uređaj',
  readMore: 'Pročitaj više',
  readLess: 'Manje',
  whyBuyCta: 'Razgovarajmo o isplativosti',
  finance: {
    over: (amount) => `iznad ${amount}`,
    overOrTwo: (amount) => `iznad ${amount} ili 2 uređaja zajedno`,
    terms: { 3: '3 meseca', 6: '3 ili 6 meseci', 12: '3, 6 ili 12 meseci' },
    note12: (amount) => `Otplata na 12 meseci dostupna je za kupovine iznad ${amount}. Tačnu ponudu dobićeš na konsultacijama.`,
    note12OrTwo: (amount) =>
      `Otplata na 12 meseci dostupna je iznad ${amount} ili pri zajedničkoj kupovini dva uređaja. Tačnu ponudu dobićeš na konsultacijama.`,
    pickModel: 'Koji uređaj?',
    pickMonths: 'Na koliko meseci?',
    months: (n) => `${n} ${pluralHrSr(n, 'mesec', 'meseca', 'meseci')}`,
    monthlyLabel: ['Mesečna rata, broj meseci: ', ''],
    downPayment: 'Avans (50%)',
    total: 'Ukupno',
    interest: 'Kamata',
  },
  video: {
    pill: (duration) => `Video recenzija · ${duration}`,
    watch: 'Pogledaj video',
    play: (who) => `Pusti video: ${who}`,
  },
  trainingAlt: 'Skinlab obuka za rad sa uređajima u izložbenom salonu',
  expertRole: 'Suosnivač Skinlaba, direktor',
  expertAlt: (name) => `${name}, suosnivač Skinlaba`,
  faqContact: 'Imaš pitanje? Pozovi nas.',
  visit: {
    address: 'Adresa',
    hours: 'Radno vreme',
    booking: 'Termin',
    phone: 'Telefon',
    days: { Hétfő: 'Pon', Kedd: 'Uto', Szerda: 'Sre', Csütörtök: 'Čet', Péntek: 'Pet', Szombat: 'Sub', Vasárnap: 'Ned' },
    closed: 'zatvoreno',
    mapLoad: (address) => `Učitaj mapu: ${address}`,
    mapTitle: (address) => `Mapa: ${address}`,
    mapOpen: 'Otvori mapu',
    mapCookies: 'Google mape pri učitavanju mogu koristiti kolačiće.',
    directions: 'Isplaniraj rutu',
    showroomAlt: 'Skinlab izložbeni salon u Érdu',
  },
  heroVideo: { pause: 'Pauziraj video', play: 'Pusti video' },
  gallery: {
    prev: 'Prethodna slika',
    next: 'Sledeća slika',
    images: (name) => `Slike: ${name}`,
    image: (name, n) => `${name} - slika ${n}`,
  },
};

const UI: Record<Locale, ShowcaseUi> = { hu, en, de, cs, sk, ro, hr, sl, sr };

/** A showcase feliratai egy nyelven; hiányzó nyelvnél build-hiba. */
export function showcaseUi(locale: Locale): ShowcaseUi {
  const ui = UI[locale];
  if (!ui) throw new Error(`[showcase] nincs felirat-fordítás ehhez a nyelvhez: ${locale} (src/i18n/showcase.ts)`);
  return ui;
}
