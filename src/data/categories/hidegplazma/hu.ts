/**
 * Hidegplazma kategóriaoldal (egytermékes) - magyar szöveg (képek, ikonok: ./index.ts).
 *
 * Forrás: a korábbi kategóriaoldal jóváhagyott tartalma, a THE FROST termékoldal
 * GYIK-je és a hidegplazma-kepzes képzés adatai. A „kozmetikus kompetencia”
 * állítás a termékoldal pontosabb változatát követi: a hidegplazmára igaz,
 * a melegplazmára nem.
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { consultSingle, financeTexts, reviews, visitSingle } from '../common.hu';

const models: Record<string, ShowcaseModelCopy> = {
  thefrostcoldplasma: {
    name: 'THE FROST',
    keySpec: '9 az 1-ben',
    tagline: 'a háromféle plazma',
    forWho: 'Problémás bőr, regeneráció',
    desc: 'Hidegplazma, melegplazma és ózonplazma egy készülékben, nagy tisztaságú argongázból. 9 funkció, 10,4"-os érintőkijelző, többféle kezelőfej arcra, pontkezeléshez és fejbőrre.',
    when: [
      'aknés, gyulladt bőrt is kezelnél',
      'regeneráló kezelést adnál gyógyulási idő nélkül',
      'a fejbőrkezelés is a kínálatod része',
    ],
  },
};

export const hu: ShowcaseCopy = {
  seo: {
    name: 'Hidegplazma készülékek',
    nameShort: 'Hidegplazma',
    description: 'Hidegplazma, termoplazma és ózonplazma technológiás kozmetikai készülékek.',
  },
  hero: {
    titleLines: ['Hidegplazma gép, amivel', 'gyógyulási idő nélkül dolgozol.'],
    lead: 'Aknés, érzékeny és problémás bőr kezelése, bőrregeneráció és fejbőrkezelés sebzés és vérzés nélkül. Betanítunk, és ha kell, megjavítjuk.',
    imageAlt: 'THE FROST hidegplazma kezelőfej kézben',
  },
  usp: [
    { title: '2 év teljes körű garancia', sub: 'minden új gépre' },
    { title: 'Egyéni hidegplazma-képzés', sub: 'géppel 50% kedvezménnyel' },
    { title: 'Saját magyar szerviz', sub: 'gyors javítás Érden' },
    { title: '0% THM részletfizetés', sub: '50% előleg + havi részletek' },
  ],
  models: {
    title: 'Ismerd meg a THE FROST-ot',
    lead: 'Háromféle plazmatechnológia egyetlen készülékben, kizárólag kozmetikai és esztétikai felhasználásra.',
    copy: models,
  },
  reviews,
  whyBuy: {
    title: 'Miért éri meg hidegplazma gépet venni?',
    lead: 'Amit a vásárlás előtt érdemes végiggondolni.',
    imageAlt: 'THE FROST hidegplazma készülék',
    items: [
      {
        title: 'Fájdalommentes kezelés',
        text: 'A hidegplazma nem melegíti fel a bőrt: nincs sebzés, var vagy hámlás, érzékeny bőrön is használható.',
      },
      {
        title: 'Három technológia egy gépben',
        text: 'Hidegplazma, melegplazma és ózonplazma, így a bőrnyugtatástól a mélyebb kezelésekig sokféle szolgáltatást adhatsz.',
      },
      {
        title: 'Kozmetikus kompetencia',
        text: 'A hidegplazma-kezelések kozmetikus kompetencia-körbe sorolhatók, a géphez teljes jogi dokumentációt adunk.',
      },
      {
        title: 'Jól árazható kezelés',
        text: 'Hidegplazma-kezelésért 15-35 000 Ft-ot is elkérhetnek a szalonok.',
      },
    ],
  },
  finance: {
    ...financeTexts,
    lead: 'Kamatmentes részletfizetés 0% THM mellett: 50% előleg, a fennmaradó összeg 3 vagy 6 havi részletben. Nincs kezelési díj és nincs rejtett költség.',
  },
  training: {
    titleLines: ['Nem egyedül tanulod meg.', 'Mindent megtanítunk neked.'],
    text: 'Egyéni, 4 órás hidegplazma-képzés élő modellen, a modellt mi biztosítjuk. A működéstől a paraméterezésen át a protokollokig mindent átveszünk, FAR-rendszerben kiállított, B-számos tanúsítványt kapsz. Géppel együtt 50% kedvezménnyel.',
    cta: 'A képzés részletei',
  },
  consult: consultSingle,
  faq: {
    title: 'Gyakori kérdések',
    lead: 'A leggyakoribb kérdések a hidegplazmáról. Ha nem találod a választ, kérdezz minket közvetlenül.',
    items: [
      {
        question: 'Mi a különbség a hidegplazma és a hagyományos plazma pen között?',
        answer: 'A hagyományos plazma pen (fibroblast) égési pontokat hoz létre a bőrön, ami fájdalmas és jelentős regenerációs idővel jár. A hidegplazma nem invazív, fájdalommentes, és nincs felépülési idő.',
      },
      {
        question: 'Mi a különbség a hidegplazma és a melegplazma között?',
        answer: 'A hidegplazma nem melegíti fel a bőrt, csak a felszínen és a felső rétegekben hat, ezért nincs gyógyulási idő. A melegplazma (termoplazma) mélyebb, hőhatású kezelés, gyógyulási idővel.',
      },
      {
        question: 'Kozmetikusként jogszerűen használhatom a készüléket?',
        answer: 'A hidegplazma-kezeléseket igen: ezek kozmetikus kompetencia-körbe sorolhatók, és a géphez teljes körű jogi dokumentációt adunk. A melegplazma-funkciók mélyebb, hőhatású kezelések, ezekről a vásárlás előtt személyesen is tájékoztatunk.',
      },
      {
        question: 'Milyen bőrproblémákra alkalmas a hidegplazma?',
        answer: 'Aknés, gyulladt, érzékeny és problémás bőrre, hegek és bőregyenetlenségek javítására, pigmentfoltos bőrre, anti-aging kezelések kiegészítésére, és a hatóanyagok jobb felszívódásának segítésére.',
      },
    ],
  },
  visit: visitSingle,
};
