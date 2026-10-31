/**
 * A showcase kategóriaoldalak vizuális ellenőrzése a buildelt oldalon, minden
 * kategórián és nyelven, mobilon (390px) és asztalon (1280px). Akkor futtasd,
 * ha egy közös komponens vagy egy szövegfájl változott, merge előtt.
 *
 *   npm run build
 *   npx serve@14.2.4 dist/client -l 4399        (külön terminálban)
 *   npm i --no-save playwright-core && node scripts/check-showcase.mjs
 *
 * Opciók: BASE_URL (alap: http://localhost:4399), CHROME_PATH (saját Chromium).
 *
 * Mit néz: a H1 asztalon pontosan 2, mobilon legfeljebb 3 sor; nincs árva szó
 * a címek (h1-h3) utolsó sorában; nem törik két sorba gomb; nincs vízszintes
 * túlcsordulás; a nem törő (nowrap) elemek kiférnek; nincs JS-hiba. Az oldalakat
 * a dist-ből gyűjti (amelyikben van #modellek szekció), így egy új kategória
 * vagy nyelv magától bekerül.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const DIST = 'dist/client';
const BASE = process.env.BASE_URL ?? 'http://localhost:4399';
const WIDTHS = [
  { width: 390, label: 'mobil', h1Max: 3, h1Exact: null },
  { width: 1280, label: 'asztal', h1Max: 2, h1Exact: 2 },
];

function showcasePages(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) out.push(...showcasePages(path));
    else if (name === 'index.html' && readFileSync(path, 'utf8').includes('id="modellek"')) {
      out.push('/' + relative(DIST, dir).split(sep).join('/') + '/');
    }
  }
  return out.sort();
}

let chromium;
try {
  ({ chromium } = await import('playwright-core'));
} catch {
  console.error('Hiányzik a playwright-core: npm i --no-save playwright-core');
  process.exit(2);
}

const pages = showcasePages(DIST);
if (pages.length === 0) {
  console.error(`Nincs showcase oldal a ${DIST} alatt. Előbb: npm run build`);
  process.exit(2);
}

const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
const failures = [];

for (const path of pages) {
  for (const vp of WIDTHS) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: 900 }, reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto(BASE + path, { waitUntil: 'networkidle' });

    const result = await page.evaluate(() => {
      // Sorok száma a szöveg tényleges soraiból (Range), nem a blokkdobozokból.
      const lines = (el) => {
        const tops = new Set();
        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
        for (let node = walker.nextNode(); node; node = walker.nextNode()) {
          const range = document.createRange();
          range.selectNodeContents(node);
          for (const r of range.getClientRects()) if (r.width > 1) tops.add(Math.round(r.top));
        }
        return tops.size;
      };
      // Árva szó: a cím utolsó sora a leghosszabb sor ötödénél is rövidebb.
      const orphans = [...document.querySelectorAll('main h1, main h2, main h3')].filter((el) => {
        const widths = new Map();
        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
        for (let node = walker.nextNode(); node; node = walker.nextNode()) {
          const range = document.createRange();
          range.selectNodeContents(node);
          for (const r of range.getClientRects()) {
            if (r.width <= 1) continue;
            const top = Math.round(r.top);
            widths.set(top, (widths.get(top) ?? 0) + r.width);
          }
        }
        const rows = [...widths.entries()].sort((x, y) => x[0] - y[0]).map(([, w]) => w);
        return el.offsetParent !== null && rows.length > 1 && rows[rows.length - 1] < Math.max(...rows) * 0.2;
      });
      // Két sorba törő gomb (a .sl-btn felirata egy sorban kell, hogy elférjen).
      const wrappedButtons = [...document.querySelectorAll('main .sl-btn')].filter((el) => el.offsetParent !== null && lines(el) > 1);
      const h1 = document.querySelector('h1');
      const nowrap = [...document.querySelectorAll('main *')].filter((el) => {
        const style = getComputedStyle(el);
        return style.whiteSpace === 'nowrap' && el.offsetParent !== null && el.scrollWidth > el.clientWidth + 1 && style.overflow === 'visible' && el.closest('[class*="overflow-x-auto"]') === null;
      });
      return {
        h1Lines: h1 ? lines(h1) : 0,
        overflow: document.documentElement.scrollWidth - window.innerWidth,
        nowrap: [...new Set(nowrap.map((el) => el.textContent.trim().slice(0, 40)))].slice(0, 3),
        orphans: orphans.map((el) => el.textContent.trim().replace(/\s+/g, ' ').slice(0, 50)),
        wrappedButtons: [...new Set(wrappedButtons.map((el) => el.textContent.trim().replace(/\s+/g, ' ')))],
      };
    });

    const where = `${path} (${vp.label} ${vp.width}px)`;
    if (vp.h1Exact !== null && result.h1Lines !== vp.h1Exact) failures.push(`${where}: a H1 ${result.h1Lines} soros, ${vp.h1Exact} kellene`);
    if (result.h1Lines > vp.h1Max) failures.push(`${where}: a H1 ${result.h1Lines} soros, legfeljebb ${vp.h1Max} lehet`);
    if (result.overflow > 0) failures.push(`${where}: ${result.overflow}px vízszintes túlcsordulás`);
    for (const text of result.nowrap) failures.push(`${where}: nem fér ki a nem törő szöveg: „${text}”`);
    for (const text of result.wrappedButtons) failures.push(`${where}: két sorba törő gomb: „${text}”`);
    for (const text of result.orphans) failures.push(`${where}: árva szó a cím utolsó sorában: „${text}”`);
    for (const message of errors) failures.push(`${where}: JS-hiba: ${message}`);
    console.log(`${failures.length ? '…' : 'ok'} ${where}: H1 ${result.h1Lines} sor`);
    await page.close();
  }
}

await browser.close();
if (failures.length) {
  console.error(`\n${failures.length} hiba:\n- ${failures.join('\n- ')}`);
  process.exit(1);
}
console.log(`\nMind a ${pages.length} oldal rendben (${WIDTHS.map((w) => w.width).join(' + ')}px).`);
