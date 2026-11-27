/**
 * Kategorija preparata za tretmane (katalog) - hrvatski tekst (prijevod ./hu.ts).
 * Bez obećanja za uređaje (jamstvo, obuka, servis) i bez roka isporuke.
 */
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { consult, reviews, visit } from '../common.hr';

export const hr: ShowcaseCopy = {
  seo: {
    name: "M'ONDUNIQ profesionalna kozmetika",
    nameShort: "M'ONDUNIQ",
    description: "M'ONDUNIQ profesionalni preparati za tretmane: hydra-liquidi, kokteli aktivnih tvari i preparati s egzosomima.",
  },
  hero: {
    titleLines: ["M'ONDUNIQ preparati", 'uz tvoje uređaje.'],
    lead: 'Hydra-liquidi za aqua peeling, kokteli aktivnih tvari, preparati s egzosomima i potpuni LaserIQ protokol za carbon peeling. Kao službeni distributer isporučujemo originalne proizvode.',
    imageAlt: "M'ONDUNIQ AquametiQ Acid Prime tekućina za tretman na kamenoj ploči sa zelenom grančicom",
  },
  usp: [
    { title: 'Originalni, službeni proizvodi', sub: 'od službenog distributera' },
    { title: 'Dostava Foxpost ili GLS', sub: 'u paketomat ili na adresu' },
    { title: 'Osobno preuzimanje u Érdu', sub: 'u našem izložbenom salonu' },
    { title: 'Potpuni protokoli', sub: 'od pripreme do njege kod kuće' },
  ],
  catalog: {
    title: 'Preparati prema protokolima',
    lead: 'Po linijama proizvoda, redoslijedom koraka tretmana, da vidiš što ti još nedostaje za rad.',
    groups: [
      {
        title: "M'ONDUNIQ LaserIQ: carbon peeling i laserski protokol",
        short: 'LaserIQ protokol',
        subtitle: 'Za sve naše Nd:YAG lasere (PIXEL, MOSAIC, THE FRAME), redoslijedom koraka protokola: priprema kože, carbon peeling tretman, trenutačna regeneracija i na kraju njega koja se nastavlja kod kuće.',
      },
      {
        title: 'AquametiQ hydra-liquidi: tekućine za aqua peeling',
        short: 'AquametiQ tekućine',
        subtitle: 'Tekućine s aktivnim tvarima za punjenje uređaja za hidrodermabraziju i aqua peeling. Četiri varijante: kisela priprema, hidratantna, posvjetljujuća i osmotska voda za ispiranje.',
      },
      {
        title: 'Kokteli aktivnih tvari, serumi i maske',
        short: 'Kokteli, serumi',
        subtitle: 'Za mikroiglinu mezoterapiju, nano tretmane, elektroporaciju, infuziju kisika i protokole s hladnom plazmom.',
      },
      {
        title: 'Kiselinski piling i anti-aging njega lica',
        short: 'Anti-aging njega',
        subtitle: "Koncentrat s 10% fitinske kiseline za piling u kabini; HI'FUsion Longevity serum i krema, LEPIREV™ krema za područje oko očiju, Vitamino'MASK maska za pomlađivanje lica i HI'FUsion Bio-Cell maska od tkanine, za hidrataciju kože i smanjenje vidljivosti bora.",
      },
    ],
  },
  reviews,
  whyBuy: {
    title: 'Zašto kupiti kod nas?',
    lead: 'Što je dobro znati prije narudžbe.',
    imageAlt: "M'ONDUNIQ HI'FUsion Longevity serum i krema za lice na pultu salona, u pozadini uređaj za tretmane lica",
    items: [
      {
        title: 'Originalni, službeni proizvodi',
        text: 'Kao službeni distributer nabavljamo proizvode izravno od proizvođača.',
      },
      {
        title: 'Potpuni protokoli, a ne pojedinačni artikli',
        text: 'Od pripreme kože do održavanja kod kuće, za svaki korak postoji preparat, u sustavu u kojem se koraci nadovezuju.',
      },
      {
        title: 'Usklađeno s tvojim uređajima',
        text: 'Carbon peeling, hidrodermabrazija, mikroiglični tretman, hladna plazma, mezoterapija: svi preparati na jednom mjestu.',
      },
      {
        title: 'Praktično preuzimanje',
        text: 'U Foxpost paketomat ili s GLS-om na adresu, odnosno osobno u našem izložbenom salonu u Érdu.',
      },
    ],
  },
  consult: {
    ...consult,
    title: 'Ne znaš koji preparat trebaš?',
    needs: [
      'Ne znaš koji odgovara tvom uređaju',
      'Želiš sastaviti protokol',
      'Imaš pitanje o proizvodu',
      'Treba ti samo dobar savjet',
    ],
  },
  faq: {
    title: 'Česta pitanja',
    lead: 'Najčešća pitanja o preparatima za tretmane. Ako ne nađeš odgovor, pitaj nas izravno.',
    items: [
      {
        question: 'Koji preparat odgovara mom uređaju?',
        answer: 'Za carbon peeling i Nd:YAG laser linija LaserIQ, za uređaje za hidrodermabraziju i aqua peeling AquametiQ hydra-liquidi. Kokteli aktivnih tvari namijenjeni su mikroigličnim tretmanima, mezoterapiji, elektroporaciji, tretmanima kisikom i hladnom plazmom.',
      },
      {
        question: 'Kako ću dobiti narudžbu?',
        answer: 'Šaljemo je u Foxpost paketomat ili s GLS-om na adresu, a možeš je preuzeti i osobno u našem izložbenom salonu u Érdu.',
      },
      {
        question: 'Jesu li proizvodi originalni?',
        answer: "Da. Kao službeni distributer M'ONDUNIQ-a nabavljamo proizvode izravno od proizvođača.",
      },
    ],
  },
  visit: {
    ...visit,
    title: 'Preuzmi je osobno u Érdu.',
    text: 'Narudžbu možeš preuzeti u našem izložbenom salonu, a ako imaš pitanja, pomoći ćemo ti na licu mjesta.',
    demoCta: 'Želim termin',
  },
};
