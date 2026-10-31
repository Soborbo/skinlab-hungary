/**
 * Sminktetováló kategóriaoldal - magyar szöveg (képek, ikonok, adatforrások: ./index.ts).
 *
 * Forrás: a korábbi kategóriaoldal jóváhagyott tartalma és a termék-JSON-ok.
 * A régi oldal „akár 8 óra üzemidő” állítása helyett a valós adat áll (4-5 óra).
 * A MAST Nano 2-ről nem írunk vezetékes/akkus állítást: a termék-GYIK szerint
 * vezetékes, a gyártói kép szerint „wireless battery pen” (tisztázandó).
 * Garancia: sminktetováló gépekre 1 év (ProductLayout ONE_YEAR_WARRANTY_CATEGORIES).
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { compareHelp, consult, reviews } from '../common.hu';

const models: Record<string, ShowcaseModelCopy> = {
  'mast-nano-2': {
    name: 'MAST Nano 2',
    keySpec: '66 g',
    tagline: 'a pehelykönnyű',
    forWho: 'Szemhéj, precíz munka',
    desc: 'Mindössze 66 grammos sminktetováló gép coreless motorral és fix 2,7 mm-es lökethosszal. Halk, alig rezeg, és a kis mérete miatt különösen jó a szemhéjhoz.',
    when: [
      'sokat dolgozol a szemhéjon',
      'a legkönnyebb gépet keresed',
      'fix lökethosszal tanulnál',
    ],
    compare: {
      stroke: '2,7 mm (fix)',
      motor: 'Coreless, 10 000 RPM',
      weight: '66 g',
    },
  },
  'mast-p60-premium-sminktetovalo-gep-allithato-lokethosszal': {
    name: 'MAST P60',
    keySpec: 'állítható löket',
    tagline: 'a sokoldalú',
    forWho: 'Mindennapi PMU munka',
    desc: 'Vezeték nélküli sminktetováló gép 5 fokozatban állítható lökethosszal (2,2-3,2 mm), így a szálazott szemöldöktől a satírozásig mindenhez beállíthatod. 121 g, 3 óránál hosszabb üzemidő.',
    when: [
      'szemöldököt, ajkat és szemhéjat is csinálsz',
      'technikánként állítanád a löketet',
      'kábel nélkül dolgoznál',
    ],
    compare: {
      stroke: '5 fokozat (2,2-3,2 mm)',
      motor: 'Coreless, 11 000 RPM',
      weight: '121 g',
    },
  },
  'mast-p60-sminktetovalo-gep': {
    name: 'MAST P60 szett',
    keySpec: '+ pót akku',
    tagline: 'a megszakítás nélküli',
    forWho: 'Profi stúdió, hosszú munkanap',
    desc: 'Ugyanaz a MAST P60 gép állítható lökethosszal, pót akkumulátorral egy csomagban. Amíg az egyik akkumulátor töltődik, a másikkal dolgozol tovább.',
    when: [
      'egymás után több vendéged van',
      'nem várnál a töltésre',
      'teljes csomaggal indulnál',
    ],
    compare: {
      stroke: '5 fokozat (2,2-3,2 mm)',
      motor: 'Coreless, 11 000 RPM',
      weight: '121 g',
    },
  },
  'faviamo-flare': {
    name: 'Faviamo Flare',
    keySpec: '4,2 mm löket',
    tagline: 'a luxus tetoválógép',
    forWho: 'Vonalazás, színezés, árnyékolás',
    desc: 'Vezeték nélküli tetoválógép Mcore-Pro brushless motorral és 4,2 mm-es lökettel. 182 g, 4-5 óra üzemidő, 3 intenzitási mód, rózsaarany, kristálydíszes kivitelben.',
    when: [
      'tetoválni is szeretnél, nem csak sminktetoválni',
      'erősebb löketre van szükséged',
      'a gép a munkaállomásod dísze is legyen',
    ],
    compare: {
      stroke: '4,2 mm',
      motor: 'Mcore-Pro brushless',
      weight: '182 g',
    },
  },
};

export const hu: ShowcaseCopy = {
  seo: {
    name: 'Sminktetováló és tetoválógépek',
    nameShort: 'Sminktetováló gépek',
    description: 'Vezetékes és vezeték nélküli sminktetováló gépek, tetoválógépek és tartozékok.',
  },
  hero: {
    titleLines: ['Sminktetováló gép,', 'ami a kezedhez igazodik.'],
    lead: 'Könnyű, halk gépek szemöldökhöz, ajakhoz és szemhéjhoz. Segítünk kiválasztani a neked valót, és ha kell, megjavítjuk.',
    imageAlt: 'Sminktetoválás MAST géppel a szalonban',
  },
  usp: [
    { title: '1 év garancia', sub: 'minden gépre' },
    { title: 'Saját magyar szerviz', sub: 'gyors javítás Érden' },
    { title: 'Univerzális tűmodulok', sub: 'a legtöbb gyártó tűivel' },
    { title: 'Személyes tanácsadás', sub: 'az alapítóktól' },
  ],
  models: {
    title: 'Melyik illik a kezedhez?',
    lead: 'Három sminktetováló gép és egy tetoválógép. A különbség a súlyban, a lökethosszban és a motorban van.',
    copy: models,
  },
  reviews,
  compare: {
    title: 'Műszaki összehasonlítás',
    lead: 'Egy pillantás alatt a fő különbségek',
    labels: ['Ár', 'Lökethossz', 'Motor', 'Súly', 'Kinek ajánljuk'],
    help: compareHelp,
  },
  whyBuy: {
    title: 'Mire figyelj gépválasztáskor?',
    lead: 'Amit a vásárlás előtt érdemes végiggondolni.',
    imageAlt: 'Faviamo Flare tetoválógép talapzaton',
    items: [
      {
        title: 'Precíz vonalvezetés',
        text: 'Minimális vibráció mellett a microblading, a powder brows és az ajak pigmentálása is egyenletes lesz.',
      },
      {
        title: 'Kábel nélküli munka',
        text: 'A MAST P60 és a Faviamo Flare akkumulátorról megy, így nincs zavaró kábel. A MAST P60 szetthez pót akkumulátor is jár.',
      },
      {
        title: 'Univerzális tűmodulok',
        text: 'A gépek univerzális cartridge-rendszerrel működnek, a legtöbb gyártó tűmoduljával kompatibilisek.',
      },
      {
        title: 'Profi gép belépő áron',
        text: 'Kezdőként sem kell nagy összeget befektetned, és később bármikor bővítheted a gépparkod.',
      },
    ],
  },
  consult: {
    ...consult,
    needs: [
      'Nem tudod, melyiket válaszd',
      'Pontos infót kérsz a gépekről',
      'Kérdésed van a tűmodulokról',
      'Csak egy jó tanácsra van szükséged',
    ],
  },
  faq: {
    title: 'Gyakori kérdések',
    lead: 'A leggyakoribb kérdések a sminktetováló gépekről. Ha nem találod a választ, kérdezz minket közvetlenül.',
    items: [
      {
        question: 'Mennyi ideig bírja egy töltéssel?',
        answer: 'A MAST P60 több mint 3 órát, a Faviamo Flare 4-5 órát. A MAST P60 szetthez pót akkumulátor is jár, így amíg az egyik töltődik, a másikkal tovább dolgozhatsz.',
      },
      {
        question: 'Kezdőként melyik gépet válasszam?',
        answer: 'Kezdőként egyszerűen kezelhető, megbízható gépet érdemes választani. A MAST Nano 2 fix lökethossza megkönnyíti a tanulást, a MAST P60 állítható lökete pedig a technikáddal együtt fejlődik.',
      },
      {
        question: 'Mi a különbség a MAST P60 és a MAST P60 szett között?',
        answer: 'A gép ugyanaz: 5 fokozatban állítható lökethossz, 121 g. A szett Tiffany színű, és pót akkumulátor is jár hozzá, így hosszabb munkanapon sem kell töltésre várnod.',
      },
      {
        question: 'Milyen tűmodulokat használhatok?',
        answer: 'A MAST gépek univerzális cartridge-rendszerrel működnek, a legtöbb gyártó tűmoduljával kompatibilisek. Minőségi, steril, egyszer használatos tűmodult ajánlunk a biztonságos munkához.',
      },
    ],
  },
  visit: {
    title: 'Fogd a kezedbe Érden.',
    text: 'Gyere el a bemutatótermünkbe, és kézbe veheted a gépeket, mielőtt döntesz. Előtte egyeztessünk időpontot.',
    booking: 'Előzetes időpontfoglalással',
    demoCta: 'Bemutatót kérek',
  },
};
