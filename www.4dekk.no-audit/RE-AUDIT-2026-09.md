# 4Dekk Larvik — SEO Re-Audit (2026-09-02)

Second audit, after the remediation sprint. Six parallel analysis agents
(technical, schema, content/E-E-A-T, local, GEO, SXO) against the live site.

## Health Score: ~73 / 100 (was 59)

| Category | Weight | Now | Was |
|---|---|---|---|
| Technical SEO | 22% | 86 | 70 |
| Content Quality | 23% | 68 | 55 |
| On-Page SEO | 20% | 70 | 60 |
| Schema / Structured Data | 10% | 72 | 45 |
| Performance (CWV, heuristic) | 10% | 68 | 60 |
| AI Search Readiness | 10% | 72 | 50 |
| Images | 5% | 65 | 65 |

No critical crawl/index blockers. Everything below is optimisation.

---

## Confirmed resolved since audit 1

- Apex `4dekk.no` -> **308** permanent -> `www` (single hop). Was 307.
- Invalid `no`/`en` hreflang **gone** on every route.
- Security headers (`X-Content-Type-Options`, `Permissions-Policy`) on all responses.
- `images.minimumCacheTTL` 0 -> 31 days.
- 9 server-rendered `/tjenester/[slug]` pages + hub, all 200, unique
  title/description/OG, self-canonical, interlinked, `Service` + `FAQPage` +
  `BreadcrumbList` schema each. Real 404 on unknown slugs.
- Homepage Services/Pricing/Reviews now in raw HTML (was behind a 200 ms timer).
- LocalBusiness schema: single `@id`, E.164 phone, correct geo (matches Maps
  pin), `addressRegion`, `areaServed`x8, `hasOfferCatalog`, valid breadcrumbs.
- Sitemap = 23 URLs, exact route inventory, real per-post blog `lastmod`.
- `llms.txt` present and accurate; robots.txt lets AI crawlers in.
- GBP: https website, rewritten description, ~15 priced services matching site.
- GA4 `trackBookingClick` / `trackPhoneCall` wired -- the leading indicators
  below are measurable today.

---

## P1 -- do first (code)

### 1. Service pages have no "local proof / trust / call" block  (flagged by 5 of 6 agents)
`/tjenester/*` reads as a generic service page: no visible address, no opening
hours, no map, no click-to-call, no rating, no "Statens vegvesen-godkjent"
badge -- while every ranking competitor (Vianor, NAF, Mekonomen) leads with all
of it. On "...pris" queries the searcher hits two prose paragraphs before the
price and has no way to call.
**Fix:** shared block on every `/tjenester/[slug]`: compact NAP + "I dag: aapent
til 16:00" + `tel:+4793995555` button + mini Google-map + trust strip
(`4,8* . 233 Google-anmeldelser . Statens vegvesen-godkjent . 10+ aar`). On
mobile, render the price card **above** the intro prose. Add a sticky mobile
call/book bar.
**Indicator:** service-page -> `/contact`/Maps CTR, booking-CTR vs homepage,
mobile bounce, scroll-depth to FAQ.

### 2. `aggregateRating` in the JSON-LD is a policy risk  (schema Critical, technical Medium)
The 4.8/233 is sourced from Google Business Profile (third-party), stamped
site-wide including on blog posts and the hub, and not rendered as visible text
in server HTML. That combination is the textbook trigger for a "structured
data" manual action.
**Fix:** remove `aggregateRating` (and don't add `Review`) from the schema. Keep
the Google-reviews carousel + a plain-text "4,8* . 233 Google-anmeldelser" as
social proof -- stating your Google rating as text is fine; marking it up as your
own structured data is not.

### 3. No click-to-call anywhere in the funnel  (SXO Critical)
Header has no phone. Service pages have no phone. Footer phone is `ssr:false`
plain text. `/contact` uses `tel:93 99 55 55` (spaces, no country code -- many
dialers won't parse).
**Fix:** `tel:+4793995555` in header, footer (as a link), service-page price
card, sticky mobile bar.

### 4. Booking CTA is an interstitial, not a booking  (SXO Critical)
Every service page's `bookingUrl` is hard-coded `/booking` -> a 9-card menu ->
re-pick the service you already chose -> new-tab Calendly. `/booking` has no
"Dekkhotell" option. The slug->Calendly map already exists in
`ServicesSection.tsx` and isn't reused.
**Fix:** per-page `bookingUrl` deep-linked to the correct Calendly type; keep
`/booking` as the "not sure?" fallback.
**Indicator:** booking-click -> Calendly-start completion; `/booking` exit rate.

---

## P2 -- high (code)

5. **Homepage is still a Client Component.** `app/page.tsx` keeps `"use client"`
   + 3 `dynamic()` sections with fixed-height skeletons -> CLS/INP risk on the
   most commercial page. Convert to a Server Component (tiny client child for the
   `#pricing` hash-scroll + `FloatingPriceButton`); drop `DynamicMetadata` (the
   static layout metadata covers it).
6. **AI citability.** Start every FAQ answer and price line with "4Dekk Larvik"
   + "Larvik" so an AI's quote is attributable ("Hos 4Dekk Larvik i Larvik
   koster EU-kontroll 1150,-..."). Invert the service-page intros: answer +
   price + who + where in the first sentence, process detail after.
7. **Structured price on schema.** Add `offers` (numeric `price` /
   `priceSpecification.minPrice` + `priceCurrency: NOK`) to each `Service` node
   and to the `OfferCatalog` items.
8. **Entity graph.** Add a `WebSite` node; add `identifier` (org.nr
   **916 690 142**), `vatID`, `foundingDate` 2015, `numberOfEmployees` 5;
   expand `sameAs` (GBP place URL + `virksomhet.brreg.no/nb/oppslag/enheter/916690142`).
   Set `knowsLanguage` to `["nb-NO"]`.
9. **Internal linking.** Blog->service contextual links (map in the content-agent
   report), service->service "Andre tjenester" block, footer "Tjenester" column
   (9 links), fix 2 mismatched `relatedBlogSlug`
   (`ac-service` -> `klimaanlegg-ac-service-bil-tegn-vedlikehold`, `bildiagnose`
   -> `varsellamper-bilproblemer-diagnostikk-guide`).
10. **E-E-A-T.**  (needs input)  Surface the Statens vegvesen
    **kontrollorgan-nummer** as visible text on `/tjenester/eu-kontroll-larvik`
    + `/about`; add a "Faglig gjennomgatt av [tekniker]" byline on blog + service
    pages; blog `author` -> a `Person`. **Need: the kontrollorgan number and
    which technician's name to use.**
11. **Missing money pages.**  (needs input on scope)  Build
    `/tjenester/dekk-larvik` (buy-tyres intent: "vinterdekk larvik", "kjope dekk
    larvik" -- `dekkservice-larvik` only covers mounting) and
    `/tjenester/bremseservice-larvik` ("bremser larvik").

---

## P3 -- medium (code)

12. Blog: sentence-case headings (they're anglophone Title Case -- a
    machine-translated tell), recompute `readTime` from word count (currently
    fabricated), set real `dateModified` + visible "Oppdatert [dato]",
    query+location titles (list in content-agent report).
13. Blog expansion (needs input on scope): `hjulstilling` 337->900,
    `eu-kontroll` flagship 597->1200, `seasonal-tires` 439->1100.
14. `business.json` schema `description` -> the new GBP text.
15. robots.txt: named AI-crawler `Allow` groups; `Disallow: /dekkhotell/`
    (trailing slash) + `noindex` on `/dekkhotell/login`.
16. llms.txt: add org.nr + legal name + "Statens vegvesen godkjent kontrollorgan"
    + founded year + a `## Ofte stilte sporsmal` block + "Sist oppdatert" line.
17. sitemap: `/blog` `changefreq` `weekly` -> `monthly`.
18. Homepage: H1 -> "Bilverksted og dekkservice i Larvik"; hero sub-headline with
    proof + price ("Statens vegvesen-godkjent i Larvik . 4,8* av 233 .
    EU-kontroll 1150,-"); a visible NAP/hours/map band; a homepage `FAQPage`.
19. HSTS: `max-age=63072000; includeSubDomains; preload`.
20. Dekkhotell page: real price table (personbil/SUV/bobil x storage-only vs
    incl. skift), "Be om pristilbud" secondary CTA.
21. Remove EN-toggle remnants: `knowsLanguage` "en", the jsdelivr GB-flag
    request -- or commit to real `/en/` routes.

---

## P4 -- low / polish

- Homepage: preload only the hero image; logo `sizes="180px"` `quality={75}`,
  drop `priority` (it's requested at `w=3840&q=100`).
- `PricingSection`: mobile + desktop price blocks both ship in the DOM -- render
  once, toggle with CSS.
- `not-found.tsx`: `robots: { index: false }`, no canonical (currently emits
  both `noindex` and `index,follow` + homepage canonical).
- http-apex is a 2-hop chain -- add a Vercel rule for one hop.
- Canonical service labels ("EU Kontroll" vs "EU-kontroll", "4Hjulskontroll" vs
  "4-hjulskontroll").
- Re-enable `next lint` in CI (`eslint.ignoreDuringBuilds` is on).
- `/tjenester` hub: add `og:image` / `og:site_name`; harmonise the `| 4Dekk ...`
  title suffix across page types.
- Remove the developer's personal gmail from the site footer.

---

## Owner / off-site (not code)

- **GBP:** click **Bekreft**; backfill **review replies** (~0% on 233 -- the
  single biggest untapped local lever); systematise review-asks (last review is
  19 days old -- at the recency cliff); add exterior/bay/team **photos**; weekly
  GBP Update posts.
- **1881.no / Gule Sider duplicate** -- "4dekk AS" *and* "4 Dekk AS" at the same
  address (one carries the phone, the other a non-www website). Claim on
  1881/Gule Sider (Eniro) and merge.
- **Citations:** Larvik naeringsforening, Statens vegvesen godkjent-verksted
  register (verify the entry), tyre-brand dealer locators
  (Continental/Nokian/Goodyear "forhandler"), Visit Larvik / kommune directory.
- **YouTube:** 3-4 short explainers (EU-kontroll, sesongskifte, AC-service,
  monsterdybde), embed on the matching service page with `VideoObject`,
  link the channel in `sameAs` + llms.txt. (Strongest observed AI-citation
  correlation.)
- Run **PageSpeed Insights** (mobile) on `/` and a service page -- record
  LCP/INP/CLS. No field data available in the audit.
- Submit `sitemap.xml` in **Search Console + Bing Webmaster**; watch
  "Discovered / not indexed" on the 9 new URLs.

---

## Name note

GBP "4dekk AS" vs site "4Dekk Larvik" is **not** a ranking problem -- don't
rename the GBP (appending a city not on the signage risks suspension).
Standardise the *name string* as `4dekk AS` across schema `name` / footer /
citations; keep "4Dekk Larvik - Bilverksted og Dekkservice" as the `<title>`
tagline; add `alternateName: "4Dekk Larvik"` to the schema.
