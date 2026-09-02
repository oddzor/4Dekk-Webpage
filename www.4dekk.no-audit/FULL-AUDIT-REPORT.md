# 4Dekk Larvik — Full SEO Audit

**Site:** https://www.4dekk.no
**Audited:** 2026-09-01
**Business type:** Local Service — auto repair & tyre shop (single location, Larvik, Norway)
**Stack:** Next.js 14 (App Router) on Vercel
**Method:** Source-code review + live fetches of homepage, blog, sitemap, robots, rendered HTML and JSON-LD. No Google Search Console / CrUX / paid backlink data was available, so field CWV and backlink numbers are estimates.

---

## SEO Health Score: 59 / 100

| Category | Score | Weight | Notes |
|---|---|---|---|
| Technical SEO | 70 | 22% | Good SSR meta/canonical/sitemap foundation; hurt by broken hreflang, client-gated body content, temp redirect |
| Content Quality | 55 | 23% | Thin blog posts (~375 words), no bylines/dates on page, no FAQ, no service pages; strong named-team About page |
| On-Page SEO | 60 | 20% | Titles/descriptions present; no location targeting on blog, no breadcrumbs, weak internal linking |
| Schema / Structured Data | 45 | 10% | Only one `AutoRepair` block; no Service / FAQ / Article / Breadcrumb / AggregateRating; geo coords look wrong |
| Performance (CWV) | 60 | 10% | Client-component homepage, deferred sections, 3 font families, some 300–450 KB images |
| AI Search Readiness | 50 | 10% | No structured Q&A, thin passages, single entity type |
| Images | 65 | 5% | WebP + alt text in place; a few oversized files; blog-list image fallback can 404; `minimumCacheTTL: 0` |

---

## What already works — don't touch

- Server-rendered `<title>`, meta description, canonical and Open Graph on every route (Next `metadata` API). Homepage `<h1>` is in the initial HTML.
- `sitemap.xml` generated from data, `robots.txt` correct (`/dekkhotell` and `/api/` disallowed, sitemap referenced).
- One valid `AutoRepair` LocalBusiness JSON-LD with address, geo, opening hours, `sameAs` (Facebook + Instagram), `priceRange`, `hasMap`.
- Clean, keyword-relevant Norwegian URL slugs (`/blog/eu-kontroll-guide-frist-sjekkliste-tips`).
- HTTPS with HSTS (`max-age=63072000`), `X-Frame-Options: DENY`, `Referrer-Policy` set.
- Old WordPress URLs 301'd (`/felgpakker`, `/sommerdekk`, `/uncategorized/...`).
- `next/font` self-hosting, WebP images, `priority`/`fetchPriority` on the hero.
- GA4 tracking with conversion events (recently wired up).
- About page names the actual technicians with photos — real E-E-A-T signal for a workshop.
- Google reviews are already fetched and cached server-side (`data/cached-reviews.json`) — the raw material for rating rich results is in hand.

---

## Technical SEO

### Critical
None blocking indexation. The site indexes fine.

### High

1. **Homepage body content is client-gated behind a timer.** `app/page.tsx` is `"use client"` and Services, Pricing and Reviews are `next/dynamic` imports rendered only after `useState`+`useDeferredValue`+`setTimeout(200ms)` (and `scheduler.postTask` at `background` priority). Only the hero is in server HTML. Googlebot renders JS so it will *usually* pick this up, but the primary service/price copy — your most commercially relevant text — is not in the raw response, adds a render dependency, and pushes LCP. Render the sections server-side (they take no props and read static JSON) and drop the `deferredShowContent` gate.

2. **hreflang is invalid.** Live HTML emits:
   ```
   <link rel="alternate" hrefLang="no" href="https://www.4dekk.no"/>
   <link rel="alternate" hrefLang="en" href="https://www.4dekk.no"/>
   ```
   Both point at the same URL and there is no `x-default`. Google discards a set like this. English is a client-only `?lang=en` toggle with no crawlable URL, no SSR and no distinct canonical, so it currently earns nothing. Decide one of:
   - **Norwegian-only (recommended for a Larvik local business):** remove the `alternates.languages` block and the hreflang tags, and stop shipping the EN JSON to the client.
   - **Real bilingual:** move to `/en/...` routes (or a locale segment) with their own SSR metadata and reciprocal hreflang.

3. **Apex → www is a 307 (temporary).** `https://4dekk.no/` → `https://www.4dekk.no/` returns `307 Temporary Redirect`. Search engines want a **301/308 permanent** so link equity consolidates on the canonical host. Fix in Vercel domain settings (set `www` as primary / permanent redirect) or add an explicit redirect.

### Medium

4. **`next.config.js` `images.minimumCacheTTL: 0`** forces the Next image optimizer to re-optimize on every request — slower image delivery and more function cost. Set to a real value (e.g. `2678400` = 31 days).
5. **Security headers are partial.** Present: HSTS, X-Frame-Options, Referrer-Policy. Missing: `X-Content-Type-Options: nosniff`, `Permissions-Policy`, and a `Content-Security-Policy`. Not a ranking factor directly, but "best-practices" audits and some trust signals flag it.
6. **`eslint.ignoreDuringBuilds: true`** — broken builds can ship regressions (including metadata regressions) unnoticed. Unrelated to SEO scoring but a risk to it.
7. **`sitemap.ts` `lastModified: new Date()`** on the static routes stamps "today" on every build regardless of real change — this trains crawlers to distrust your `lastmod`. Use a real content date or the file mtime.
8. **Blog `changefreq` mismatch:** `/blog` is `weekly` but posts are `monthly` and were last genuinely touched in March 2024. Low signal either way — align them with reality.

---

## Content Quality

### High

1. **Blog posts are thin.** `eu-control.json` (the "komplett guide til EU-kontroll") is **~375 words** across 13 short paragraphs and 9 headings — more headings-per-word than a real guide. `readTime` is stored as `7` minutes (actual ≈ 2). For queries like *"EU-kontroll frist"*, *"hva koster EU-kontroll"*, *"EU-kontroll Larvik"* you're competing with NAF, Statens Vegvesen and Mekonomen — 300–400 words will not rank. Target 900–1,500 words of genuinely useful, specific content per priority post, and correct `readTime`.

2. **No on-page author, publish date or "updated" date.** `app/blog/[slug]/page.tsx` renders only the `<h1>` and body — no byline, no visible date, no "Skrevet av [tekniker]". For a YMYL-adjacent topic (vehicle safety) that's a missed trust signal, and it removes the freshness cue. Show "Publisert / Oppdatert" and attribute posts to a named technician from the About page.

3. **No FAQ content anywhere.** Auto-repair search is full of question queries ("må jeg bestille time for EU-kontroll?", "hvor lang tid tar hjulskift?", "hva er forskjellen på omlegging og hjulskift?"). A FAQ block on the homepage and each future service page — marked up as `FAQPage` — is one of the highest-ROI additions for both classic rich results and AI Overviews.

### Medium

4. **The blog list image fallback can 404.** `utils/dataLoader.ts` maps `category: "tires"` posts to `/images/tire-service.webp`, which is not in `public/images/`. Tyre-category cards likely point at a missing file.
5. **English content doubles the content JSON with no SEO return** (see hreflang). Every blog/service/business file carries a full `en` tree that ships to the browser but is invisible to search.
6. **About page copy is solid** (10 years, grew from tyres+rims to a Statens Vegvesen–approved workshop, named team, "uten snarveier" guarantee). Reuse these specifics on service pages and in schema `description` — right now they only live on `/about`.

---

## On-Page SEO

### High

1. **No dedicated service pages — the single biggest ranking opportunity.** Every service (EU-kontroll, etterkontroll, 4-hjulskontroll, AC-service, hjulskift, omlegging, dekkhotell, verkstedarbeid, diagnose) exists only as a section on the homepage. There is no URL that can rank for *"EU-kontroll Larvik"*, *"hjulskift Larvik"*, *"AC-service Larvik"*, *"4-hjulskontroll Larvik"*, *"bilverksted Larvik pris"*. Create one indexable page per core service:
   - unique title/description with service + "Larvik"
   - the price you already have in `pricing.json`
   - what's included, how long it takes, how to book
   - `Service` + `FAQPage` + `BreadcrumbList` schema
   - internal links from homepage, relevant blog posts and the footer

2. **Blog titles don't target the query or the location.** Live title for the EU post is `EU Kontroll: Hva innebærer det?` — the slug (`...frist-sjekkliste-tips`) is better optimised than the title, and the root template suffix (`| 4Dekk Larvik`) isn't showing on it. Rewrite to something like *"EU-kontroll i Larvik: frister, sjekkliste og pris (2026)"*.

### Medium

3. **No breadcrumbs** on blog or (future) service pages — no `BreadcrumbList` markup and no UI breadcrumb trail. Add both.
4. **Weak internal linking.** Blog posts link only to `/contact` and `/booking`. No blog→service, service→blog, or blog→blog links. Build a small topic cluster (e.g. seasonal-tyres post ↔ hjulskift service ↔ dekkhotell service ↔ tyre-wear post).
5. **`keywords` meta tag** is still emitted. Harmless, ignored by Google — leave or remove, low priority.
6. **`format-detection: telephone=no`** disables automatic phone-number linking on mobile. You do have explicit `tel:` links on the contact page, so this is defensible, but confirm the phone is one tap everywhere it appears (header, footer, homepage).

---

## Schema / Structured Data

Current state: a single `AutoRepair` block, output identically on every page (including blog posts).

### High

1. **Add `Service` schema** to each new service page, linked to the business via `provider: { "@id": ".../#business" }`, with `areaServed` and an `offers` price.
2. **Add `FAQPage`** wherever you place FAQ content.
3. **Add `BlogPosting`/`Article`** to blog posts: `headline`, `datePublished`, `dateModified`, `author` (a `Person` — the technician), `image`, `publisher`.
4. **Add `BreadcrumbList`** to blog and service pages.
5. **Add `aggregateRating`** (and a few `review`s) to the LocalBusiness block. You already cache Google reviews server-side — surface the rating value and count. Follow Google's policy (rating must be visible on the page too).

### Medium

6. **Geo coordinates look wrong.** Schema says `latitude: 59.0533, longitude: 10.0297`. The Google Maps *embed* URL in the same `business.json` encodes `!3d59.0648...!2d10.0426...` — roughly 1.5 km apart. Verify the real coordinates of Haakon VII's vei 9 and make schema, `hasMap` and the embed agree.
7. **`areaServed` is just `{ City: "Larvik" }`.** Widen to the places customers actually drive from: Stavern, Kvelde, Helgeroa, Tjølling, Sandefjord, Larvik kommune — as an array of `City` / `AdministrativeArea`.
8. **`telephone` format:** use E.164 (`+4793995555`) in schema.
9. **NAP consistency:** `business.json` has `contact.website: "https://4dekk.no"` while `SITE_URL` is `https://www.4dekk.no`; `email` is `4dekk4@gmail.com` in `business.json` — check every public listing uses one identical name/address/phone string. Pick one canonical NAP and use it verbatim in schema, footer, contact page and the Google Business Profile.
10. **Add `@id` + `additionalType`** so the business is one linkable entity; consider adding a tyre-shop `additionalType` alongside `AutoRepair`, and `makesOffer`/`hasOfferCatalog` from your price list.

---

## Performance (Core Web Vitals) — lab estimate only

No CrUX field data available. Structural observations:

- **Homepage is a client component** and the below-the-fold sections mount after a 200 ms timer. This adds JS to interactive and can delay the largest text/image paint.
- **Three font families** (Inter, Roboto, Oswald) with multiple weights. `body` uses Roboto; `inter.className` is applied to `<body>` but Inter doesn't appear to be used for anything visible — drop it.
- **Hero ships two `priority` images** — `hero-image-1.webp` (129 KB) and the logo at `quality={95}`. Keep one true LCP image at `priority`; drop the logo to `quality={80}`.
- **Largest images:** `car-wash.webp` 449 KB, `tire-change.webp` 354 KB, several `IMG_30xx.webp` at ~300 KB. Re-encode to ~1600 px max width and target <150 KB.
- `minimumCacheTTL: 0` (see Technical #4).
- Inline critical CSS in `layout.tsx` is a reasonable choice; keep it small.

Action: run PageSpeed Insights on `/` and `/blog/eu-kontroll-guide-frist-sjekkliste-tips` after the server-render change and measure LCP/INP/CLS for real.

---

## AI Search Readiness (AI Overviews / ChatGPT / Perplexity)

- **Citable passages are thin.** AI answers lift self-contained 2–4 sentence chunks with a concrete fact. Your blog paragraphs are short but vague. Add specifics: exact prices (you have them), exact durations, the frist rule (last digit of the plate), what a Larvik customer should bring.
- **No `FAQPage`, no structured Q&A** — the format AI engines most readily quote.
- **Single schema type** limits entity understanding. Service + FAQ + Article + AggregateRating give the models much more to work with.
- **`llms.txt`** is optional and ignored by Google, but cheap — a short one pointing at services, prices, hours and contact won't hurt.
- Positive: LocalBusiness + `sameAs` + named team already give a clear entity anchor.

---

## Images

- WebP everywhere, `next/image` used, alt text present on hero, About and blog images (Norwegian, descriptive).
- Oversized source files (see Performance).
- Blog-list fallback path `/images/tire-service.webp` is missing — fix the mapping in `dataLoader.ts` or add the file.
- Blog posts have no unique `og:image` — social/preview cards for every article currently show the homepage hero. Give each post its own image and wire it into `generateMetadata`.
- `minimumCacheTTL: 0`.

---

## Off-site / local signals (not directly auditable here)

- Confirm the **Google Business Profile** is claimed, category = "Bilverksted" (+ "Dekkbutikk" secondary), hours match `business.json`, and the profile has recent photos and review replies.
- **NAP citations:** ensure Gule Sider, 1881, Proff.no, Facebook and Instagram all show the exact same name/address/phone.
- Common Crawl shows a minimal external link footprint — local link building (Larvik-area sponsorships, supplier pages, chamber of commerce, local news) is worth pursuing but is lower priority than the on-site service-page and schema gaps above.
