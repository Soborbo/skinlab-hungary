/**
 * ND:YAG lézer kategóriaoldal - magyar szöveg (képek, ikonok, adatforrások: ./index.ts).
 *
 * Forrás: a korábbi kategóriaoldal jóváhagyott tartalma (előnyök, GYIK,
 * összehasonlítás), a termék-JSON-ok és a nd-yag-lezer-kepzes képzés adatai.
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';

const models: Record<string, ShowcaseModelCopy> = {
  pixelcarbonlezer: {
    name: 'PIXEL',
    keySpec: '1064 + 532 nm',
    tagline: 'a kompakt carbon-lézer',
    forWho: 'Kompakt belépő, carbon peeling',
    desc: 'Asztali Q-kapcsolt ND:YAG lézer 1064 és 532 nm-es kezelőfejjel, valamint carbon (Black Doll) fejjel. Zárt vízhűtés, 4,3"-os érintőképernyő, kis helyen is elfér.',
    when: [
      'carbon peelinggel bővítenéd a kínálatod',
      'kevés a hely a kezelőben',
      'kisebb befektetéssel indulnál',
    ],
    compare: {
      waves: '1064 + 532 nm + carbon fej',
      screen: '4,3" érintőképernyő',
      cooling: 'Zárt vízhűtéses rendszer',
    },
  },
  frame: {
    name: 'FRAME',
    keySpec: '4 hullámhossz',
    tagline: 'az androidos okoslézer',
    forWho: 'Tetoválás, pigmentfolt, carbon',
    desc: 'Androidos ND:YAG lézer 13,3"-os érintőképernyővel, 4 hullámhosszal és beépített kezelőfej-hűtéssel. Tetoválás- és pigmentfolt-eltávolításra, carbon peelingre egyaránt.',
    when: [
      'tetoválás-eltávolítást is vállalnál',
      'több színnel dolgoznál',
      'nagy, átlátható kezelőfelületet szeretnél',
    ],
    compare: {
      waves: '4 hullámhossz',
      screen: '13,3" Android érintőképernyő',
      cooling: 'Beépített kezelőfej-hűtés',
    },
  },
};

export const hu: ShowcaseCopy = {
  seo: {
    name: 'Q-kapcsolt ND:YAG lézerkészülékek',
    nameShort: 'ND:YAG lézerek',
    description: 'Tetoválás és pigmentfolt eltávolító lézerek.',
  },
  hero: {
    titleLines: ['ND:YAG lézer, amivel', 'a tetoválás is eltűnik.'],
    lead: 'Tetoválás- és pigmentfolt-eltávolítás, carbon peeling Q-kapcsolt technológiával. Segítünk kiválasztani a szalonodhoz illő gépet, betanítunk, és ha kell, megjavítjuk.',
    imageAlt: 'ND:YAG lézeres kezelés a szalonban, védőszemüveggel',
  },
  usp: [
    { title: '2 év teljes körű garancia', sub: 'minden új gépre' },
    { title: 'FAR-tanúsított képzés', sub: 'kis csoportban, modellel' },
    { title: 'Saját magyar szerviz', sub: 'gyors javítás Érden' },
    { title: '0% THM részletfizetés', sub: '50% előleg + havi részletek' },
  ],
  models: {
    title: 'Melyik illik a te szalonodhoz?',
    lead: 'Mindkettő Q-kapcsolt ND:YAG lézer. A különbség a hullámhosszak számában, a kezelőfelületben és a hűtésben van.',
    copy: models,
  },
  reviews: { title: 'Akik már velünk dolgoznak' },
  compare: {
    title: 'Műszaki összehasonlítás',
    lead: 'Egy pillantás alatt a fő különbségek',
    labels: ['Ár', 'Hullámhosszak', 'Kijelző', 'Kezelőfej-hűtés', 'Kinek ajánljuk'],
    help: {
      title: 'Nem tudod eldönteni? Segítünk kiválasztani.',
      text: 'László és Szimonetta, a Skinlab alapítói személyesen tanácsot adnak.',
    },
  },
  whyBuy: {
    title: 'Miért éri meg ND:YAG lézert venni?',
    lead: 'Amit a vásárlás előtt érdemes végiggondolni.',
    imageAlt: 'PIXEL ND:YAG lézerkészülék a bemutatóteremben',
    items: [
      {
        title: 'A nehéz színeket is viszi',
        text: 'A Q-kapcsolt ND:YAG lézer a nehezebben eltávolítható zöld és kék tetoválást is kezeli.',
      },
      {
        title: 'Carbon peeling',
        text: 'Hollywood peelingként is ismert: azonnali ragyogás, kisebb pórusok, kiegyensúlyozottabb zsíros bőr.',
      },
      {
        title: 'Pigmentfolt-kezelés',
        text: 'Napfolt, öregségi folt és sminktetoválás halványítása, a hullámhossz helyes megválasztásával.',
      },
      {
        title: 'Magas árrés',
        text: 'Tetoválás-eltávolításért alkalmanként 15-50 000 Ft-ot, carbon peelingért 8-15 000 Ft-ot is elkérhetnek a szalonok.',
      },
    ],
  },
  finance: {
    title: 'Nem kell egy összegben kifizetned.',
    lead: 'Kamatmentes részletfizetés 0% THM mellett: 50% előleg, a fennmaradó összeg 3 vagy 6 havi részletben. Nincs kezelési díj és nincs rejtett költség.',
    perks: ['0% THM', 'Nincs kezelési díj', 'Nincs rejtett költség'],
    cta: 'Pontos ajánlatot kérek',
  },
  training: {
    titleLines: ['Nem egyedül tanulod meg.', 'Mindent megtanítunk neked.'],
    text: 'Q-kapcsolt ND:YAG lézerkezelői képzés legfeljebb 4 fővel: a hullámhosszak és a paraméterek helyes megválasztása, carbon peeling, sminktetoválás- és pigmentfolt-eltávolítás, modelles gyakorlattal. FAR-jegyzett, B-számos tanúsítványt kapsz.',
    cta: 'A képzés részletei',
  },
  consult: {
    title: 'Nem tudod, melyik gép való neked?',
    text: 'Bármelyik is igaz rád, szeretettel segítünk. Hívj minket, vagy kérj ingyenes konzultációt, és felvesszük veled a kapcsolatot.',
    needs: [
      'Nem tudod, melyiket válaszd',
      'Pontos infót kérsz a gépekről',
      'Megbeszélnéd a vásárlás részleteit',
      'Csak egy jó tanácsra van szükséged',
    ],
    note: 'Általában 1 munkanapon belül visszahívunk.',
  },
  faq: {
    title: 'Gyakori kérdések',
    lead: 'A leggyakoribb kérdések az ND:YAG lézerekről. Ha nem találod a választ, kérdezz minket közvetlenül.',
    items: [
      {
        question: 'Melyik gépet válasszam?',
        answer: 'A PIXEL kompakt asztali gép 1064 és 532 nm-es kezelőfejjel és carbon fejjel, jó belépő a carbon peelinghez. A FRAME 4 hullámhosszal, androidos érintőképernyővel és beépített kezelőfej-hűtéssel a tetoválás-, pigmentfolt- és carbon-kezeléseket is kiszolgálja.',
      },
      {
        question: 'Hány alkalom kell egy tetoválás teljes eltávolításához?',
        answer: 'A tetoválás méretétől, színétől és korától függ. Átlagosan 6-12 kezelés kell, 6-8 hetes szünetekkel. A fekete és a sötét színek gyorsabban tűnnek el.',
      },
      {
        question: 'Fájdalmas a tetoválás-eltávolítás?',
        answer: 'Megfelelő hűtéssel a kellemetlenség mérsékelt. Sokan a tetoválás elkészítéséhez hasonlítják: kellemetlen, de elviselhető. Érzéstelenítő krém is használható.',
      },
      {
        question: 'Mi a carbon peeling, és kinek ajánlott?',
        answer: 'A carbon peeling során szénmaszkot viszel fel az arcra, és ezt lézerrel távolítod el. Zsíros, pattanásos bőrre és tág pórusokra ajánlott. Az eredmény azonnal látszik, regenerációs idő nincs.',
      },
    ],
  },
  visit: {
    title: 'Nézd meg személyesen Érden.',
    text: 'Gyere el a bemutatótermünkbe, és megmutatjuk a gépeket. Előtte egyeztessünk időpontot, hogy a választott gép biztosan ott legyen.',
    booking: 'Előzetes időpontfoglalással',
    demoCta: 'Bemutatót kérek',
  },
};
