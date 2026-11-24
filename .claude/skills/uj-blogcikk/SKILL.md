---
name: uj-blogcikk
description: Új blogcikk feltöltése (vagy meglévő javítása) a skinlabhungary.hu blogjára szövegből, Google Docból, közösségi posztból, képekből és videóból. Használd, ha valaki blogcikket, cikket, posztot akar feltenni a weboldalra, bemásol/behúz egy szöveget, képet vagy videót a blogra, vagy egy blogcikket javítani, fordítani akar.
---

# Új blogcikk

A blog fájlokból épül: minden cikk egy `.mdx` fájl. A szerző (Szimi, Rebeka) behúzza a nyers anyagot (szöveg, képek, videó), **te formázod meg a sablon szerint**, és PR-t nyitsz. A merge után pár perc alatt élesben van.

A cikkoldal kinézetét a sablon adja (`src/components/pages/BlogPostLayout.astro`): cím, szerzősor fotóval, olvasási idő, borítókép, „Röviden” doboz, tartalomjegyzék a `##` címekből, szerzőkártya, megosztás, kapcsolódó cikkek, konzultációs blokk. Ezekhez nem kell semmit írnod. Teljes minta minden elemmel: [minta.mdx](minta.mdx).

## 1. Kérd be, ami hiányzik

- **Szöveg** (bemásolva, Google Doc, vagy a közösségi poszt szövege).
- **Borítókép.** Ha nincs, az első tartalmi képből lesz.
- **Szerző:** ki írta? A név pontosan a csapatlistából: `Gaszler Szimonetta`, `Horváth László`, `Kanalas Fanni Rebeka`, `Solti Anna`, `Huszár László`, `Tóth Ádám` (`src/lib/constants.ts` TEAM). Ebből jön a fotó és a titulus. Ha nem tudni, kérdezd meg.
- Rövid közösségi poszt esetén kérdezd meg, hogy bővítsd-e cikké (legalább kb. 400 szó), vagy úgy menjen, ahogy van.

## 2. A fájl és a frontmatter

`src/content/blog/<slug>.mdx`. A `slug` ékezet nélküli, kisbetűs, kötőjeles, 3–6 szó a címből (pl. `diodalezer-vagy-ipl-melyiket-valasszam`). Ha már van ilyen fájl, ne írd felül: kérdezd meg, hogy javítás-e.

```yaml
---
title: "A cím, legfeljebb kb. 60 karakter, benne a fő kulcsszó"
description: "Meta-leírás, 140–160 karakter."
author: "Gaszler Szimonetta"
publishedAt: 2026-11-24
image: "/images/blog/<slug>.webp"
imageAlt: "Mi látható a borítóképen"
tags: ["diódalézer", "szőrtelenítés"]
featured: false
tldr:
  - "2–4 kulcsmondat a cikkből (a „Röviden” dobozba)"
---
```

- `publishedAt`: a mai dátum. Javításnál ne változtasd; helyette: `updatedAt: <mai dátum>`.
- `tldr` 400 szó felett kötelező, alatta elhagyható. Csak olyat írj bele, ami a cikkben is benne van.

## 3. A szöveg formázása

- Bevezető bekezdés címsor nélkül. Utána `##` fejezetek (ezekből lesz a tartalomjegyzék, ezért kérdésként vagy beszédes címként), azon belül `###`. `#` nem kell, az a `title`.
- Rövid bekezdések (2–4 mondat). Felsorolás, ha 3+ párhuzamos elem van. Táblázat összevetéshez.
- **A szerző szövegét tartsd meg:** helyesírást, tördelést javíts, a tartalmat és a hangnemet ne írd át. Tegező hangnem. Gondolatjel helyett sima kötőjel (-), em-dash (—) nem lehet.
- Kb. 300 szavanként legyen egy kép, videó vagy komponens, hogy ne legyen hosszú szövegfal.

## 4. Komponensek (import nélkül használhatók)

| Mire | Hogyan |
| --- | --- |
| Kép | `<Kep src="/images/blog/<slug>-1.webp" alt="…" felirat="…" width={1600} height={1067} />` |
| Több kép egy sorban (2–4, pl. karusszel) | `<Kepek kepek={[{ src: "…", alt: "…" }, …]} felirat="…" />` (álló 4:5 vágás; `fokusz: "50% 20%"` ha az arc lecsúszna) |
| Videó (YouTube/Shorts) | `<Video youtube="<link vagy ID>" cim="…" felirat="…" />` (Shorts linknél magától álló) |
| Videó (saját fájl) | `<Video src="/videos/blog/<slug>.mp4" poster="/images/blog/<slug>-video.webp" cim="…" allo />` |
| Szakértői tipp | `<Tipp>…</Tipp>` (alapból Szimi; más: `<Tipp szerzo="Horváth László">`) |
| Termékkártya | `<Termek slug="olympia" />` (a slug a `src/content/products/<slug>.json` fájlnév; elírt slug buildhibát ad) |
| Konzultációs CTA | `<Konzultacio />` vagy `<Konzultacio cim="Saját kérdés?" />` |
| Előtte/utána csúszka | `<ElotteUtana elotte="…" utana="…" alt="…" />` (csak azonos szögű, azonos arányú fotópár) |
| GYIK | egymás után több `<Kerdes k="Kérdés?">Válasz.</Kerdes>`, az elsőn `nyitva` |

Elhelyezés: a `<Konzultacio />` vagy `<Termek />` a cikk közepe táján és/vagy a vége előtt, legfeljebb 2 CTA egy cikkben. A GYIK a cikk végére kerüljön, `## Gyakori kérdések` cím alá.

MDX-buktatók: a `{` és `<` jel a sima szövegben hibát ad, írd így: `\{`, `&lt;`. A komponensen belüli szöveg előtt és után legyen üres sor, ha több bekezdés.

## 5. Képek és videó

Képek a `public/images/blog/` alá: borító `<slug>.webp`, többi `<slug>-1.webp`, `<slug>-2.webp`… Legfeljebb 1600 px szélesen, WebP-ként, és írd ki a méretét a `width`/`height`-hez:

```bash
node -e "const s=require('sharp');s('<forrás>').rotate().resize({width:1600,withoutEnlargement:true}).webp({quality:80}).toFile('public/images/blog/<név>.webp').then(i=>console.log(i.width,i.height))"
```

- A borító 16:9-ben jelenik meg: a fontos rész legyen középen. Álló képet ne tegyél borítónak.
- Pixeles, kis felbontású képet jelezz, ne skálázd fel. Csak saját vagy jogtiszta kép mehet ki.
- **Videó:** a legjobb, ha fent van a Skinlab YouTube-csatornáján (Shorts is jó): akkor csak a link kell. Instagram/Facebook-videót nem lehet beágyazni. Ilyenkor kérd el a fájlt, és tömörítsd (max. 20 MB; a nagyobbat a Cloudflare nem szolgálja ki):

```bash
ffmpeg -i <forrás> -vf "scale='min(1080,iw)':-2" -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 96k -movflags +faststart public/videos/blog/<slug>.mp4
ffmpeg -i public/videos/blog/<slug>.mp4 -frames:v 1 -q:v 3 /tmp/poster.jpg   # utána sharp-pal webp-be: public/images/blog/<slug>-video.webp
```

## 6. Belső linkek

Ha a cikk géptípusról vagy termékről szól, linkelj rá egyszer-kétszer természetes szövegben. Az URL-eket a valós fájlokból vedd (`src/content/products/*.json` → `categorySlug` + slug), mindig záró perjellel: `[OLYMPIA diódalézer](/diodalezerek/olympia/)`. Kitalált URL-t ne írj.

## 7. Tartalmi szabályok (ezek nem sérülhetnek)

- **Cseregép** csak feltételesen: „ha a javítás 10 munkanapnál tovább tart, a készlet függvényében”. Feltétel nélküli cseregép-ígéret tilos.
- **Alapítók:** László „társalapító, ügyvezető”, Szimonetta „társalapító, lézer- és gépes kozmetikai szakértő”. „21 év tapasztalat” és hasonló évszám-állítás tilos.
- **Cím:** 2030 Érd, Bajcsy-Zsilinszky út 156. Más cím (Budai út, János utca) tilos.
- **FAR** = Felnőttképzési Adatszolgáltatási Rendszer.
- **M'ONDUNIQ** szövegben nincs ™ és ® jel.
- Ár, garanciaidő, műszaki adat csak a `src/content/products/*.json` vagy a `docs/katalogus/` szerint. Ha a cikk mást ír, szólj, ne javítsd csendben.
- Orvosi gyógyígéret („meggyógyítja”, „végleg eltünteti”) helyett óvatos megfogalmazás („segíthet”, „csökkentheti”).

## 8. Fordítás (csak ha kérik)

Alapból csak magyar cikk készül; a többi nyelven a blog addig nem jelenik meg. Ha kérik: `src/content/blog/<nyelv>/<slug>.mdx` (en, de, cs, sk, ro, hr, sl, sr), ugyanaz a frontmatter és ugyanazok a komponensek lefordított szöveggel, ugyanazokkal a képekkel. Helyes ékezetekkel (románban vesszős ș, ț).

## 9. Ellenőrzés és PR

```bash
npx vitest run
npx astro build
```

A build után nézd meg, hogy létrejött a `dist/client/blog/<slug>/index.html`, és mutasd meg a szerzőnek az oldalt: `cd dist/client && python3 -m http.server 4399`, majd http://localhost:4399/blog/<slug>/. Utána töröld a `dist` mappát, és:

```bash
git checkout -b blog/<slug>
git add src/content/blog public/images/blog public/videos/blog
git commit -m "Blog: <cím>"
git push -u origin blog/<slug>
gh pr create --title "Blog: <cím>" --body "Új blogcikk."
```

Csak `src/content/blog/`, `public/images/blog/` és `public/videos/blog/` alatti fájlt módosíts. Ha más fájlhoz is hozzá kellene nyúlni (pl. új komponens kellene), ne tedd: írd meg, mi kellene, és azt László hagyja jóvá. A végén add meg a PR linkjét.

## Vázlat és törlés

- Vázlat (nem jelenik meg sehol): `draft: true` a frontmatterben.
- Cikk levétele: `draft: true`, ne töröld a fájlt.
