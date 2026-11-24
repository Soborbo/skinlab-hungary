---
name: uj-blogcikk
description: Új blogcikk feltöltése (vagy meglévő javítása) a skinlabhungary.hu blogjára egy szövegből, Google Docból vagy közösségi posztból. Használd, ha valaki blogcikket, cikket, posztot akar feltenni a weboldalra, vagy egy blogcikket javítani, fordítani.
---

# Új blogcikk

A blog fájlokból épül: minden cikk egy Markdown-fájl. Te írod meg a fájlt és nyitsz róla PR-t; a merge után pár perc alatt élesben van.

## 1. Kérd be, ami hiányzik

- **A cikk szövege** (bemásolva, Google Doc link, vagy a közösségi poszt szövege).
- **Borítókép** (feltöltött fájl vagy link). Ha nincs, kérdezd meg, hogy kép nélkül menjen-e.
- Ha a szöveg egy rövid közösségi poszt: kérdezd meg, hogy bővítsd-e cikké (legalább kb. 400 szó), vagy úgy menjen, ahogy van.

## 2. A fájl

`src/content/blog/<slug>.md` (magyar). A `slug` ékezet nélküli, kisbetűs, kötőjeles, 3–6 szó a címből (pl. `diodalezer-vagy-ipl-melyiket-valasszam`). Ha már van ilyen fájl, ne írd felül: kérdezd meg, hogy javítás-e.

```markdown
---
title: "A cím, legfeljebb kb. 60 karakter"
description: "Meta-leírás, 140–160 karakter, a cikk lényege egy-két mondatban."
author: "Skinlab"
publishedAt: 2026-11-24
image: "/images/blog/<slug>.webp"
tags: ["diódalézer", "szőrtelenítés"]
featured: false
---

Bevezető bekezdés (címsor nélkül, a cím a fenti `title`).

## Alcím

Szöveg…
```

- `publishedAt`: a mai dátum. Javításnál ne változtasd; helyette add hozzá: `updatedAt: <mai dátum>`.
- Csak `##` és `###` címsor (az `#` a `title`). Rövid bekezdések, felsorolás ahol segít.
- A szerző szövegét tartsd meg: helyesírást és tördelést javíts, a tartalmat és a hangnemet ne írd át. A Skinlab tegező hangnemű.

## 3. Borítókép

Mentsd ide: `public/images/blog/<slug>.webp`, legfeljebb 1600 px szélesen, WebP-ként (a `sharp` telepítve van):

```bash
node -e "require('sharp')('<forrás>').rotate().resize({width:1600,withoutEnlargement:true}).webp({quality:80}).toFile('public/images/blog/<slug>.webp')"
```

A kép 16:9 kivágásban jelenik meg, a fontos rész legyen középen.

## 4. Belső linkek

Ha a cikk egy géptípusról vagy termékről szól, linkelj rá egyszer-kétszer természetes szövegben. Az URL-eket a valós fájlokból vedd (`src/content/products/*.json` → `categorySlug` + slug), mindig záró perjellel: `[OLYMPIA diódalézer](/diodalezerek/olympia/)`. Kitalált URL-t ne írj.

## 5. Tartalmi szabályok (ezek nem sérülhetnek)

- **Cseregép** csak feltételesen: „ha a javítás 10 munkanapnál tovább tart, a készlet függvényében”. Feltétel nélküli cseregép-ígéret tilos.
- **Alapítók:** László „társalapító, ügyvezető”, Szimonetta „társalapító, lézer- és gépes kozmetikai szakértő”. „21 év tapasztalat” és hasonló évszám-állítás tilos.
- **Cím:** 2030 Érd, Bajcsy-Zsilinszky út 156. Más cím (Budai út, János utca) tilos.
- **FAR** = Felnőttképzési Adatszolgáltatási Rendszer.
- **M'ONDUNIQ** szövegben nincs ™ és ® jel.
- Ár, garanciaidő, műszaki adat csak a `src/content/products/*.json` vagy a `docs/katalogus/` szerint. Ha a cikk mást ír, szólj, ne javítsd csendben.
- Orvosi gyógyígéret („meggyógyítja”, „végleg eltünteti”) helyett óvatos megfogalmazás („segíthet”, „csökkentheti”).

## 6. Fordítás (csak ha kérik)

Alapból csak magyar cikk készül; a többi nyelven a blog addig nem jelenik meg. Ha kérik: `src/content/blog/<nyelv>/<slug>.md` (en, de, cs, sk, ro, hr, sl, sr), ugyanaz a frontmatter lefordítva, ugyanaz az `image`. Helyes ékezetekkel (románban vesszős ș, ț).

## 7. Ellenőrzés és PR

```bash
npx vitest run
npx astro build
```

A build után nézd meg, hogy létrejött a `dist/client/blog/<slug>/index.html`. Utána:

```bash
git checkout -b blog/<slug>
git add src/content/blog public/images/blog
git commit -m "Blog: <cím>"
git push -u origin blog/<slug>
gh pr create --title "Blog: <cím>" --body "Új blogcikk."
```

Csak `src/content/blog/` és `public/images/blog/` alatti fájlt módosíts. Ha más fájlhoz is hozzá kellene nyúlni, ne tedd: írd meg, mi kellene, és azt László hagyja jóvá. A végén add meg a PR linkjét.

## Vázlat és törlés

- Vázlat (nem jelenik meg sehol): `draft: true` a frontmatterben.
- Cikk levétele: `draft: true`, ne töröld a fájlt.
