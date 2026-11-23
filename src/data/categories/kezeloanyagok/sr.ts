/**
 * Kategorija preparata za tretmane (katalog) - srpski tekst, latinica (prevod ./hu.ts).
 * Bez obećanja za uređaje (garancija, obuka, servis) i bez roka isporuke.
 */
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { consult, reviews, visit } from '../common.sr';

export const sr: ShowcaseCopy = {
  seo: {
    name: "M'ONDUNIQ profesionalna kozmetika",
    nameShort: "M'ONDUNIQ",
    description: "M'ONDUNIQ profesionalni preparati za tretmane: hydra-liquidi, kokteli aktivnih supstanci i preparati sa egzozomima.",
  },
  hero: {
    titleLines: ["M'ONDUNIQ preparati", 'uz tvoje uređaje.'],
    lead: 'Hydra-liquidi za aqua peeling, kokteli aktivnih supstanci, preparati sa egzozomima i kompletan LaserIQ protokol za carbon peeling. Kao zvanični distributer isporučujemo originalne proizvode.',
    imageAlt: "M'ONDUNIQ AquametiQ Acid Prime tečnost za tretman na kamenoj ploči sa zelenom grančicom",
  },
  usp: [
    { title: 'Originalni, zvanični proizvodi', sub: 'od zvaničnog distributera' },
    { title: 'Dostava Foxpost ili GLS', sub: 'u paketomat ili na adresu' },
    { title: 'Lično preuzimanje u Érdu', sub: 'u našem izložbenom salonu' },
    { title: 'Kompletni protokoli', sub: 'od pripreme do nege kod kuće' },
  ],
  catalog: {
    title: 'Preparati prema protokolima',
    lead: 'Po linijama proizvoda, redosledom koraka tretmana, da vidiš šta ti još nedostaje za rad.',
    groups: [
      {
        title: "M'ONDUNIQ LaserIQ: carbon peeling i laserski protokol",
        short: 'LaserIQ protokol',
        subtitle: 'Za sve naše Nd:YAG lasere (PIXEL, MOSAIC, THE FRAME), redosledom koraka protokola: priprema kože, carbon peeling tretman, trenutna regeneracija i na kraju nega koja se nastavlja kod kuće.',
      },
      {
        title: 'AquametiQ hydra-liquidi: tečnosti za aqua peeling',
        short: 'AquametiQ tečnosti',
        subtitle: 'Tečnosti sa aktivnim supstancama za punjenje uređaja za hidrodermabraziju i aqua peeling. Četiri varijante: kisela priprema, hidratantna, posvetljujuća i osmotska voda za ispiranje.',
      },
      {
        title: 'Kokteli aktivnih supstanci, serumi i maske',
        short: 'Kokteli, serumi',
        subtitle: 'Za mezoterapiju mikroiglicama, nano tretmane, elektroporaciju, infuziju kiseonika i protokole sa hladnom plazmom.',
      },
      {
        title: 'Kiselinski piling i anti-aging nega lica',
        short: 'Anti-aging nega',
        subtitle: "Koncentrat sa 10% fitinske kiseline za piling u kabini; HI'FUsion Longevity serum i krema, LEPIREV™ krema za predeo oko očiju i Vitamino'MASK maska za podmlađivanje lica, za hidrataciju kože i smanjenje vidljivosti bora.",
      },
    ],
  },
  reviews,
  whyBuy: {
    title: 'Zašto da kupiš preparate kod nas?',
    lead: 'Šta je dobro znati pre porudžbine.',
    imageAlt: "M'ONDUNIQ HI'FUsion Longevity serum i krema za lice na pultu salona, u pozadini uređaj za tretmane lica",
    items: [
      {
        title: 'Originalni, zvanični proizvodi',
        text: 'Kao zvanični distributer nabavljamo proizvode direktno od proizvođača.',
      },
      {
        title: 'Kompletni protokoli, a ne pojedinačni artikli',
        text: 'Od pripreme kože do održavanja kod kuće, za svaki korak postoji preparat, u sistemu u kom se koraci nadovezuju.',
      },
      {
        title: 'Usklađeno sa tvojim uređajima',
        text: 'Carbon peeling, hidrodermabrazija, tretman mikroiglicama, hladna plazma, mezoterapija: svi preparati na jednom mestu.',
      },
      {
        title: 'Praktično preuzimanje',
        text: 'U Foxpost paketomat ili sa GLS-om na adresu, odnosno lično u našem izložbenom salonu u Érdu.',
      },
    ],
  },
  consult: {
    ...consult,
    title: 'Ne znaš koji preparat ti treba?',
    needs: [
      'Ne znaš koji odgovara tvom uređaju',
      'Želiš da sastaviš protokol',
      'Imaš pitanje o proizvodu',
      'Treba ti samo dobar savet',
    ],
  },
  faq: {
    title: 'Česta pitanja',
    lead: 'Najčešća pitanja o preparatima za tretmane. Ako ne nađeš odgovor, pitaj nas direktno.',
    items: [
      {
        question: 'Koji preparat odgovara mom uređaju?',
        answer: 'Za carbon peeling i Nd:YAG laser linija LaserIQ, za uređaje za hidrodermabraziju i aqua peeling AquametiQ hydra-liquidi. Kokteli aktivnih supstanci namenjeni su tretmanima mikroiglicama, mezoterapiji, elektroporaciji, tretmanima kiseonikom i hladnom plazmom.',
      },
      {
        question: 'Kako ću dobiti porudžbinu?',
        answer: 'Šaljemo je u Foxpost paketomat ili sa GLS-om na adresu, a možeš je preuzeti i lično u našem izložbenom salonu u Érdu.',
      },
      {
        question: 'Da li su proizvodi originalni?',
        answer: "Da. Kao zvanični distributer M'ONDUNIQ-a nabavljamo proizvode direktno od proizvođača.",
      },
    ],
  },
  visit: {
    ...visit,
    title: 'Preuzmi je lično u Érdu.',
    text: 'Porudžbinu možeš da preuzmeš u našem izložbenom salonu, a ako imaš pitanja, pomoći ćemo ti na licu mesta.',
    demoCta: 'Želim termin',
  },
};
