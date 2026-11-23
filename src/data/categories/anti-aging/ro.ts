/**
 * Pagina categoriei anti-aging - text în română (traducerea ./hu.ts).
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { compareHelp, consult, financeTexts, reviews, visit } from '../common.ro';

const models: Record<string, ShowcaseModelCopy> = {
  'q2-biopen': {
    name: 'Bio Pen Q2',
    keySpec: 'EMS + LED',
    tagline: 'pen-ul mobil cu microace',
    forWho: 'Început, tratamente mobile',
    desc: 'Pen fără fir cu microace, electroporare EMS, fototerapie LED albastră/roșie și 7 programe de tratament elaborate. Cu o investiție mică poți începe tratamentele de reînnoire a pielii cu microace și de introducere a substanțelor active.',
    when: [
      'abia acum introduci tratamentele cu microace',
      'l-ai folosi și pentru introducerea substanțelor active',
      'ai merge cu tratamentul și la domiciliul clientelor',
    ],
    compare: {
      tech: 'Microace EMS + fototerapie LED',
      form: 'Pen manual fără fir',
      extra: 'LED albastru 470 nm / roșu 630 nm',
      use: 'Față, zona ochilor, scalp, corp',
    },
  },
  'aestiq-ai': {
    name: 'AESTIQ AI',
    keySpec: 'RF cu microace',
    tagline: 'platforma AI care te învață',
    forWho: 'Serviciu anti-aging premium',
    desc: 'Sistem RF cu microace și vacuum: vacuumul stabilizează pielea, iar radiofrecvența lucrează în straturile mai profunde. AI Educator integrat te ghidează pas cu pas, iar controlul acelor ANG™ lucrează la adâncimi presetate.',
    when: [
      'ai oferi tratamente pentru riduri, cicatrici și vergeturi',
      'ai construi un serviciu cu prețuri mari pe tratament',
      'vrei ca aparatul să te ajute și la învățare',
    ],
    compare: {
      tech: 'RF cu microace și vacuum',
      form: 'Platformă de masă',
      extra: 'AI Educator + control ace ANG™',
      use: 'Riduri fine, piele lăsată, pori dilatați, cicatrici de acnee, vergeturi',
    },
  },
};

export const ro: ShowcaseCopy = {
  seo: {
    name: 'Aparate anti-aging',
    nameShort: 'Anti-aging',
    description: 'Aparate de întinerire a pielii RF cu microace și vacuum și cu microace EMS.',
  },
  hero: {
    titleLines: ['Aparat anti-aging', 'pentru tratamente premium.'],
    lead: 'Fermitatea pielii, tratarea ridurilor și cicatricilor fără operație, cu tehnologie RF cu microace sau EMS. Te ajutăm să alegi aparatul potrivit salonului tău și, dacă e nevoie, îl reparăm.',
    imageAlt: 'Tratament facial cu microace cu Bio Pen Q2 în salon',
  },
  usp: [
    { title: 'Garanție completă 2 ani', sub: 'pentru fiecare aparat nou' },
    { title: 'Service propriu în Ungaria', sub: 'reparații rapide la Érd' },
    { title: 'Rate cu DAE 0%', sub: 'pentru aparate peste 100 000 Ft' },
    { title: 'Consultanță personală', sub: 'de la fondatori' },
  ],
  models: {
    title: 'Care se potrivește salonului tău?',
    lead: 'Un pen manual mobil și o platformă AI de masă: pentru alt scop, la alt nivel de preț.',
    copy: models,
  },
  reviews,
  compare: {
    title: 'Comparație',
    lead: 'Cele două aparate sunt din categorii diferite, așa că merită să decizi după utilizare',
    labels: ['Preț', 'Tehnologie', 'Construcție', 'Extra', 'Aplicare', 'Recomandat pentru'],
    help: compareHelp,
  },
  whyBuy: {
    title: 'De ce merită să cumperi un aparat anti-aging?',
    lead: 'Ce merită să gândești înainte de cumpărare.',
    imageAlt: 'Pen cu microace Bio Pen Q2',
    items: [
      {
        title: 'Fermitate țintită',
        text: 'RF-ul cu microace duce căldura direct în straturile mai profunde ale pielii, astfel fermitatea se obține fără operație.',
      },
      {
        title: 'Fără perioadă de recuperare',
        text: 'După majoritatea tratamentelor, clienta se poate întoarce imediat la activitățile zilnice.',
      },
      {
        title: 'Cliente care revin',
        text: 'Colagenul se reface în câteva săptămâni, așa că clientele vin la o cură de mai multe ședințe.',
      },
      {
        title: 'Prețuri premium pe tratament',
        text: 'RF-ul cu microace și reînnoirea pielii cu microace se numără printre serviciile cu marjă mare ale saloanelor.',
      },
    ],
  },
  finance: {
    ...financeTexts,
    lead: 'Rate fără dobândă cu DAE 0% pentru aparate peste 100 000 Ft: avans 50%, restul în rate lunare. Fără comision de administrare și fără costuri ascunse.',
  },
  consult,
  faq: {
    title: 'Întrebări frecvente',
    lead: 'Cele mai frecvente întrebări despre aparatele anti-aging. Dacă nu găsești răspunsul, întreabă-ne direct.',
    items: [
      {
        question: 'Care este diferența dintre AESTIQ AI și Bio Pen Q2?',
        answer: 'Bio Pen Q2 este un pen compact, fără fir, cu microace, electroporare EMS și fototerapie LED. AESTIQ AI este un sistem RF cu microace și vacuum de categorie superioară, care combină radiofrecvența, stabilizarea pielii prin vacuum, sistemul AI Educator și controlul acelor ANG™.',
      },
      {
        question: 'Cu care să încep dacă abia acum introduc tratamentele cu microace?',
        answer: 'Bio Pen Q2 este un început bun: investiție mică, se integrează ușor în oferta existentă și, într-un singur dispozitiv manual, ai microneedling, electroporare EMS și fototerapie LED de 470/630 nm.',
      },
      {
        question: 'Când merită să aleg mai degrabă AESTIQ AI?',
        answer: 'Dacă ai oferi tratamente anti-aging, de fermitate, pentru cicatrici sau de îmbunătățire a texturii de categorie superioară. Pe lângă microace lucrează cu energie RF, stabilizează pielea prin vacuum, iar AI Educator și ANG™ ajută și munca operatoarei.',
      },
      {
        question: 'Bio Pen Q2 este și el un aparat cu radiofrecvență?',
        answer: 'Nu, și aceasta este o diferență importantă. Bio Pen Q2 folosește microcurent EMS (electroporare). RF adevărat cu microace găsești în AESTIQ AI.',
      },
      {
        question: 'Când se vede rezultatul?',
        answer: 'Imediat după tratament se simte o ușoară fermitate. La tratamentul RF cu microace cu AESTIQ AI, rezultatul real se maturizează odată cu refacerea colagenului în 3-6 luni; o cură constă din 3-4 ședințe.',
      },
    ],
  },
  visit,
};
