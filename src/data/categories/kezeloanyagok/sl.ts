/**
 * Kategorija pripravkov za tretmaje (katalog) - slovensko besedilo (prevod ./hu.ts).
 * Brez obljub za naprave (garancija, usposabljanje, servis) in brez dobavnega roka.
 */
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { consult, reviews, visit } from '../common.sl';

export const sl: ShowcaseCopy = {
  seo: {
    name: "M'ONDUNIQ profesionalna kozmetika",
    nameShort: "M'ONDUNIQ",
    description: "M'ONDUNIQ profesionalni pripravki za tretmaje: hydra-liquidi, koktajli učinkovin in pripravki z eksosomi.",
  },
  hero: {
    titleLines: ["M'ONDUNIQ pripravki", 'ob tvojih napravah.'],
    lead: 'Hydra-liquidi za aqua peeling, koktajli učinkovin, pripravki z eksosomi in celoten protokol LaserIQ za carbon peeling. Kot uradni distributer dobavljamo originalne izdelke.',
    imageAlt: "Tekočina za tretma M'ONDUNIQ AquametiQ Acid Prime na kamniti plošči z zeleno vejico",
  },
  usp: [
    { title: 'Originalni, uradni izdelki', sub: 'od uradnega distributerja' },
    { title: 'Dostava Foxpost ali GLS', sub: 'v paketnik ali na dom' },
    { title: 'Osebni prevzem v Érdu', sub: 'v našem razstavnem salonu' },
    { title: 'Celostni protokoli', sub: 'od priprave do nege doma' },
  ],
  catalog: {
    title: 'Pripravki po protokolih',
    lead: 'Po linijah izdelkov, v zaporedju korakov tretmaja, da vidiš, kaj ti pri delu še manjka.',
    groups: [
      {
        title: "M'ONDUNIQ LaserIQ: protokol za carbon peeling in laser",
        short: 'Protokol LaserIQ',
        subtitle: 'Za vse naše Nd:YAG laserje (PIXEL, MOSAIC, THE FRAME), v zaporedju korakov protokola: priprava kože, tretma carbon peeling, takojšnja regeneracija in na koncu nega, ki se nadaljuje doma.',
      },
      {
        title: 'AquametiQ hydra-liquidi: tekočine za aqua peeling',
        short: 'Tekočine AquametiQ',
        subtitle: 'Tekočine z učinkovinami za polnjenje naprav za hidrodermabrazijo in aqua peeling. Štiri različice: kisla priprava, vlažilna, posvetlitvena in osmotska voda za izpiranje.',
      },
      {
        title: 'Koktajli učinkovin, serumi in maske',
        short: 'Koktajli, serumi',
        subtitle: 'Za mezoterapijo z mikroiglicami, nano tretmaje, elektroporacijo, kisikovo infuzijo in protokole s hladno plazmo.',
      },
      {
        title: 'Kislinski piling in anti-aging nega obraza',
        short: 'Anti-aging nega',
        subtitle: "Koncentrat z 10 % fitinske kisline za piling v kabini; serum in krema HI'FUsion Longevity, krema za predel okoli oči LEPIREV™ in pomlajevalna maska za obraz Vitamino'MASK za vlaženje kože in zmanjšanje vidnosti gub.",
      },
    ],
  },
  reviews,
  whyBuy: {
    title: 'Zakaj kupiti pripravke pri nas?',
    lead: 'Kaj je dobro vedeti pred naročilom.',
    imageAlt: "Serum in krema za obraz M'ONDUNIQ HI'FUsion Longevity na salonskem pultu, v ozadju naprava za tretmaje obraza",
    items: [
      {
        title: 'Originalni, uradni izdelki',
        text: 'Kot uradni distributer izdelke nabavljamo neposredno pri proizvajalcu.',
      },
      {
        title: 'Celostni protokoli, ne posamezni izdelki',
        text: 'Od priprave kože do vzdrževanja doma je za vsak korak na voljo pripravek, v sistemu, kjer se koraki dopolnjujejo.',
      },
      {
        title: 'Usklajeno s tvojimi napravami',
        text: 'Carbon peeling, hidrodermabrazija, mikroiglični tretma, hladna plazma, mezoterapija: vsi pripravki na enem mestu.',
      },
      {
        title: 'Udoben prevzem',
        text: 'V paketnik Foxpost ali z GLS na dom, ali osebno v našem razstavnem salonu v Érdu.',
      },
    ],
  },
  consult: {
    ...consult,
    title: 'Ne veš, kateri pripravek potrebuješ?',
    needs: [
      'Ne veš, kateri ustreza tvoji napravi',
      'Želiš sestaviti protokol',
      'Imaš vprašanje o izdelku',
      'Potrebuješ le dober nasvet',
    ],
  },
  faq: {
    title: 'Pogosta vprašanja',
    lead: 'Najpogostejša vprašanja o pripravkih za tretmaje. Če ne najdeš odgovora, nas vprašaj neposredno.',
    items: [
      {
        question: 'Kateri pripravek ustreza moji napravi?',
        answer: 'Za carbon peeling in Nd:YAG laser linija LaserIQ, za naprave za hidrodermabrazijo in aqua peeling hydra-liquidi AquametiQ. Koktajli učinkovin so namenjeni tretmajem z mikroiglicami, mezoterapiji, elektroporaciji, tretmajem s kisikom in s hladno plazmo.',
      },
      {
        question: 'Kako prejmem naročilo?',
        answer: 'Pošljemo ga v paketnik Foxpost ali z GLS na dom, lahko pa ga prevzameš tudi osebno v našem razstavnem salonu v Érdu.',
      },
      {
        question: 'Ali so izdelki originalni?',
        answer: "Da. Kot uradni distributer M'ONDUNIQ izdelke nabavljamo neposredno pri proizvajalcu.",
      },
    ],
  },
  visit: {
    ...visit,
    title: 'Prevzemi ga osebno v Érdu.',
    text: 'Naročilo lahko prevzameš v našem razstavnem salonu, in če imaš vprašanja, ti pomagamo kar na mestu.',
    demoCta: 'Želim termin',
  },
};
