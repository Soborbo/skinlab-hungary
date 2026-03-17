# SkinLab Hungary - Weboldal

Professzionális kozmetikai berendezések lead generation weboldala.

## 🚀 Gyors indulás

```bash
# Telepítés
npm install

# Fejlesztés
npm run dev

# Build
npm run build

# Preview
npm run preview
```

## 📁 Projekt struktúra

```
src/
├── components/
│   ├── layout/          # Header, Footer
│   ├── sections/        # Hero, Categories, Stats, etc.
│   ├── ui/              # Button, Card, Badge
│   └── forms/           # ContactForm, NewsletterForm
├── content/
│   ├── products/        # Termék MDX fájlok
│   ├── trainings/       # Képzés MDX fájlok
│   └── blog/            # Blog MDX fájlok
├── layouts/
│   ├── BaseLayout.astro      # Alap layout (Header, Footer, SEO)
│   └── ProductLayout.astro   # Termék landing layout
├── lib/
│   └── constants.ts     # Cégadatok, elérhetőségek
├── pages/
│   ├── index.astro      # Főoldal
│   ├── kapcsolat.astro  # Kapcsolat
│   ├── diodalezerek/    # Kategória + termék oldalak
│   └── ...
└── styles/
    └── global.css       # Tailwind + custom styles
```

## 📝 Tartalom hozzáadása

### Új termék

1. Hozz létre egy MDX fájlt: `src/content/products/[slug].md`
2. Használd a példa struktúrát: `src/content/products/novalight-4wave.md`
3. Kötelező mezők:
   - `name` - Termék neve
   - `category` - Kategória teljes neve
   - `categorySlug` - Kategória URL slug
   - `description` - Hosszú leírás
   - `shortDescription` - Rövid leírás (max 160 karakter)

### Képek hozzáadása

1. Másold a képeket: `public/images/products/`
2. Frissítsd a termék `images` mezőjét:

```yaml
images:
  - "/images/products/novalight-front.jpg"
  - "/images/products/novalight-side.jpg"
```

### Új kategória oldal

1. Hozd létre a mappát: `src/pages/[kategoria-slug]/`
2. Másold a `diodalezerek/index.astro` és `diodalezerek/[slug].astro` fájlokat
3. Módosítsd a kategória adatokat

## 🎨 Design testreszabás

### Színek

`tailwind.config.mjs` fájlban:

```js
colors: {
  primary: { ... },  // Fő kék szín
  accent: { ... },   // Arany accent
  success: { ... },  // Zöld
}
```

### Cégadatok

`src/lib/constants.ts` fájlban az összes cégadat, elérhetőség, kategória.

## 🔧 TODO

- [ ] Form backend bekötése (Email Octopus / Sender.net)
- [ ] Cloudflare Turnstile integráció
- [ ] Google Analytics + GTM
- [ ] Képek feltöltése és optimalizálása
- [ ] Videó beágyazások
- [ ] Google Maps beágyazás
- [ ] További kategória oldalak
- [ ] Blog implementáció
- [ ] Képzések oldalak

## 📦 Deploy

Cloudflare Pages-re:

```bash
npm run build
# dist/ mappa tartalma
```

## 📄 Licenc

Proprietary - SkinLab Hungary / Soborbo Ltd.
