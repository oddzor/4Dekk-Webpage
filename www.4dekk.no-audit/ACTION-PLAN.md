# 4Dekk Larvik — SEO Action Plan

Ordered by ranking impact vs. effort. "Ranking power" for a single-location workshop comes mostly from **local service pages + schema + Google Business Profile alignment**, not from more blog posts.

---

## Phase 1 — Highest ranking upside (Weeks 1–3)

### 1. Build dedicated service landing pages  ⬅ biggest win
One indexable page per core service, e.g. `/tjenester/eu-kontroll-larvik`, `/tjenester/hjulskift-larvik`, `/tjenester/4-hjulskontroll-larvik`, `/tjenester/ac-service-larvik`, `/tjenester/dekkhotell-larvik`, `/tjenester/bilverksted-larvik`.
Each page:
- SSR `metadata`: title `"<Tjeneste> i Larvik – pris og booking | 4Dekk"`, matching description
- price from `pricing.json`, what's included, time required, how to book (CTA to `/booking`)
- 400–700 words of specific local copy
- `Service` + `FAQPage` + `BreadcrumbList` JSON-LD
- linked from the homepage services section, the footer, and any related blog post
- add all new URLs to `app/sitemap.ts`
**Effort:** M–L · **Impact:** High

### 2. Fix or remove hreflang + decide the English strategy
Current tags (`no` and `en` both → `https://www.4dekk.no`) are invalid and wasted.
- Recommended: go Norwegian-only — delete `alternates.languages` in `app/layout.tsx`, remove the hreflang output, stop bundling the `en` JSON trees.
- Or commit to real `/en/...` routes with their own SSR metadata + reciprocal hreflang + `x-default`.
**Effort:** S (remove) / L (real i18n) · **Impact:** Medium–High

### 3. Server-render the homepage body
Drop `"use client"` + the `deferredShowContent`/`setTimeout(200)` gate in `app/page.tsx`; render `ServicesSection` / `PricingSection` / `GoogleReviews` on the server (they take no props). Puts your service & price copy in the raw HTML and improves LCP.
**Effort:** M · **Impact:** Medium–High

### 4. Expand LocalBusiness schema (`components/LocalBusinessSchema.tsx`)
- add `aggregateRating` + 2–3 `review`s from `data/cached-reviews.json` (and show the rating on the page)
- add `"@id": "https://www.4dekk.no/#business"`
- `telephone` → `+4793995555`
- `areaServed` → array: Larvik, Stavern, Kvelde, Helgeroa, Tjølling, Sandefjord
- verify latitude/longitude against the Maps embed (schema `59.0533,10.0297` vs embed `59.0648,10.0426`) and make all three sources agree
- add `hasOfferCatalog` from `pricing.json`
**Effort:** S–M · **Impact:** Medium–High (review stars in SERP)

### 5. Google Business Profile pass (off-site, do in parallel)
Claim/verify; primary category "Bilverksted", secondary "Dekkbutikk"; hours = `business.json`; exact NAP; add photos; enable messaging; reply to reviews; add services + prices in GBP.
**Effort:** S · **Impact:** High for map-pack

---

## Phase 2 — High-impact improvements (Weeks 3–6)

### 6. Add FAQ content + `FAQPage` schema
Homepage + each service page. 5–8 real questions each with concrete, specific answers (prices, durations, frist rule, booking need).
**Effort:** M · **Impact:** Medium–High (rich results + AI Overviews)

### 7. Rebuild the 8 blog posts as real content
- 900–1,500 words each, specific and locally framed
- correct `readTime`
- visible "Publisert / Oppdatert" date + technician byline
- `BlogPosting` schema (`datePublished`, `dateModified`, `author`, `image`, `publisher`) + `BreadcrumbList`
- unique `og:image` per post, wired into `generateMetadata`
- 2–4 internal links each to the new service pages
Start with `eu-control`, `seasonal-tires`, `wheel-alignment` (highest search demand).
**Effort:** L · **Impact:** Medium

### 8. Rewrite blog titles for query + location
e.g. `EU Kontroll: Hva innebærer det?` → `EU-kontroll i Larvik: frister, sjekkliste og pris (2026)`. Confirm the `| 4Dekk Larvik` template suffix renders.
**Effort:** S · **Impact:** Medium

### 9. Breadcrumbs (UI + `BreadcrumbList`) on blog and service pages
**Effort:** S–M · **Impact:** Low–Medium

---

## Phase 3 — Cleanup & polish (Month 2)

- Apex → www: make it a 301/308 permanent (Vercel domain settings).
- `next.config.js`: `images.minimumCacheTTL: 2678400`.
- Drop the unused Inter font; keep Roboto + Oswald only.
- Re-encode oversized images (`car-wash.webp` 449 KB, `tire-change.webp` 354 KB, `IMG_30xx` ~300 KB) to <150 KB.
- Fix `utils/dataLoader.ts` tyre-category image fallback (`/images/tire-service.webp` missing).
- `app/sitemap.ts`: real `lastModified` per route instead of `new Date()`; align `changeFrequency` with reality.
- Add `X-Content-Type-Options: nosniff` and a `Permissions-Policy` header.
- Re-enable `eslint` on builds (or run it in CI).
- Optional: add a small `llms.txt`.
- Deploy the two staged blog posts (`ac-service.json`, `car-diagnostics.json`) once rewritten to real depth.

---

## Phase 4 — Monitoring (ongoing)

- Connect **Google Search Console** (verification files already in `public/`) and submit `sitemap.xml`. Track impressions/clicks for "…Larvik" queries and the new service URLs.
- Run **PageSpeed Insights** on `/` and a service page after Phase 1 #3; record LCP/INP/CLS.
- Re-run this audit after Phase 2 to re-score (target 75+).
- Watch GBP insights (calls, direction requests, booking clicks) as the primary local KPI.
