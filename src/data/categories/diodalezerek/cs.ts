/**
 * Stránka kategorie diodových laserů - český text (překlad ./hu.ts).
 * Ceny, výkon, specifikace a obrázky jsou z produktových JSON.
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { compareHelp, consult, financeTexts, reviews } from '../common.cs';

const models: Record<string, ShowcaseModelCopy> = {
  athena: {
    tagline: 'kontrola a preciznost',
    forWho: 'Začátek / doplňková služba',
    desc: 'Chytrý software, který doporučí nastavení podle typu pleti a chloupků. Stabilní, předvídatelný přístroj pro každého, kdo s epilací začíná nebo ji doplňuje.',
    when: [
      'hledáš cenově dostupný, ale profesionální vstupní přístroj',
      'epilace bude doplňkovou službou',
      'předvídatelnost je pro tebe důležitější než tempo',
    ],
  },
  olympia: {
    tagline: 'vítězný výkon',
    forWho: 'Tempo s kontrolou',
    desc: 'Výstupní výkon 1200W a 5 nastavitelných velikostí spotu: precizní práce na malých plochách, rychlý postup na velkých.',
    when: [
      'hledáš silný přístroj za reálnou cenu',
      'chceš rychlejší ošetření, ale s kontrolou',
      'máš různorodé klientky a partie',
    ],
  },
  helios: {
    tagline: 'skutečná síla světla',
    forWho: 'Klinika, velký provoz',
    desc: 'Náš nejsilnější model: 1600W, hlubší účinek, kratší doba ošetření. Pro salony a kliniky s velkým provozem.',
    when: [
      'máš denně hodně klientek na epilaci',
      'kratším ošetřením bys nabídla víc termínů',
      'hledáš nejvyšší třídu',
    ],
  },
  empire: {
    tagline: 'inteligentní systém',
    forWho: 'Diagnostika + karta klienta',
    desc: 'Diagnostika chloupků a pleti mikrokamerou, digitální karta klienta s fotkami před a po a přístroj sám doporučí parametry.',
    when: [
      'chceš ošetření dokumentovat',
      'chceš nastavení stavět na vyšetření',
      'chceš pracovat s vrstvenými impulzy (SHR STACK)',
    ],
  },
};

export const cs: ShowcaseCopy = {
  seo: {
    name: 'Profesionální diodové lasery',
    nameShort: 'Diodové lasery',
    description: 'Profesionální diodové lasery se 4 vlnovými délkami pro trvalé odstranění chloupků.',
  },
  hero: {
    titleLines: ['Diodový laser, který', 'přivádí klientky zpět.'],
    lead: 'Trvalá epilace technologií se 4 vlnovými délkami, pro všechny typy pleti a chloupků. Pomůžeme ti vybrat přístroj, který se hodí do tvého salonu, zaškolíme tě, a když je potřeba, opravíme ho.',
    imageAlt: 'Epilace diodovým laserem OLYMPIA v salonu',
  },
  usp: [
    { title: 'Plná záruka 2 roky', sub: 'na každý nový přístroj' },
    { title: '8hodinové zaškolení na místě', sub: '+ 6 měsíců podpory' },
    { title: 'Vlastní servis v Maďarsku', sub: 'rychlá oprava v Érdu' },
    { title: 'Splátky s 0% RPSN', sub: '50% záloha + měsíční splátky' },
  ],
  models: {
    title: 'Který se hodí do tvého salonu?',
    lead: 'Všechny čtyři mají 4 vlnové délky. Liší se tempem, režimem ošetření a tím, kolik dokumentuješ.',
    copy: models,
  },
  reviews,
  compare: {
    title: 'Technické srovnání',
    lead: 'Hlavní parametry na první pohled',
    labels: ['Cena', 'Výkon', 'Vlnové délky', 'Velikost spotu', 'Chlazení', 'Pro koho'],
    help: compareHelp,
  },
  whyBuy: {
    title: 'Proč se diodový laser vyplatí?',
    lead: 'Co je dobré si před nákupem promyslet.',
    imageAlt: 'Hlavice diodového laseru OLYMPIA během ošetření',
    items: [
      {
        title: 'Rychlá návratnost',
        text: 'Při zhruba 3-4 klientkách za pracovní den, ceně ošetření 12 000 Ft a nákladech 2 000 Ft na ošetření ti měsíčně zůstane 600 000-800 000 Ft. Přístroj se tak může vrátit zhruba za 3,3-3,7 měsíce. Ilustrativní výpočet, ne finanční slib.',
      },
      {
        title: 'Vracející se klientky',
        text: 'Klientky si kupují kúru 6-8 ošetření a pak chodí jednou ročně na udržovací ošetření.',
      },
      {
        title: 'Účinnější než IPL',
        text: 'Cílenější, působí hlouběji, stačí méně sezení. Klientka vidí výsledek dřív.',
      },
      {
        title: 'Pro všechny typy pleti',
        text: '4 vlnové délky jsou účinné na světlé i tmavé pleti, na jemných i silných chloupcích.',
      },
    ],
  },
  finance: {
    ...financeTexts,
    lead: 'Bezúročné splátky s 0% RPSN: 50% záloha, zbytek ve 3, 6 nebo 12 měsíčních splátkách. Žádný poplatek za vyřízení a žádné skryté náklady.',
  },
  training: {
    titleLines: ['Nebudeš se to učit sama.', 'Všechno tě naučíme.'],
    text: '8hodinové zaškolení přímo v tvém salonu, poté 6 měsíců podpory. Školení obsluhy s certifikací FAR a oficiálním certifikátem.',
    cta: 'Naše školení',
  },
  consult,
  faq: {
    title: 'Časté dotazy',
    lead: 'Nejčastější otázky o diodových laserech. Pokud nenajdeš odpověď, zeptej se nás přímo.',
    items: [
      {
        question: 'Jaký je rozdíl mezi přístroji s 1, 3 a 4 vlnovými délkami?',
        answer: '1 vlnová délka (808 nm) je klasika pro světlou až středně tmavou pleť. 3 vlnové délky zvládnou i tmavší pleť a jemnější chloupky. 4 vlnové délky (755 + 808 + 940 + 1064 nm) jsou nejuniverzálnější a účinnější i na světlé chloupky.',
      },
      {
        question: 'Proč je důležitý výkon (watty)?',
        answer: 'Vyšší výkon = rychlejší ošetření, víc klientek denně. Salonu s velkým provozem doporučujeme víc než 1000W.',
      },
      {
        question: 'Bolí ošetření diodovým laserem?',
        answer: 'Safírové chlazení pokožky ho dělá téměř bezbolestným, většina klientek cítí jen mírné teplo.',
      },
      {
        question: 'Jak dlouho trvá jedno ošetření?',
        answer: 'Podpaží 5-10 minut, nohy 20-40 minut, celé tělo 60-90 minut, podle přístroje.',
      },
    ],
  },
  visit: {
    title: 'Vyzkoušej všechny v Érdu.',
    text: 'Přijď do našeho showroomu a vyzkoušej si naživo všechny čtyři diodové lasery, než se rozhodneš.',
    booking: 'Po předchozí rezervaci termínu',
    demoCta: 'Chci ukázku',
  },
};
