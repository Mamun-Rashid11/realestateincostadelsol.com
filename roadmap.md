# Roadmap — realestateincostadelsol.com
## Full Site Roadmap

**Goals:**
- Pull live property listings from Resales Online (via Casa Espanha's whitelisted server) and display them as static pages on the Astro site, rebuilt nightly
- Set up analytics and search console to monitor organic traffic and lead performance
- Clean up footer: hide Casa Espanha partnership reference, add Alentora credit
- Ensure sitemap is correctly generated and submitted so all pages are indexed
- Publish `llms.txt` — a machine-readable summary of the site for AI crawlers and APIs

## Hosting & Form Stack (Decided)

| Layer | Choice | Cost | Reason |
|---|---|---|---|
| Hosting | Netlify free tier | $0 | Static site, 300 build min/month, auto-deploy from GitHub |
| Form handler | Web3Forms | $0 | 250 submissions/month free — enough until site generates revenue |
| Nightly rebuild | Netlify build hook + cron-job.org | $0 | POST to build hook nightly at 02:00 UTC |
| Property data | Casa Espanha proxy → Astro build | $0 | Static JSON baked in at build time |

**Important:** Do NOT use Netlify Forms (`data-netlify="true"`). It is capped at 100 submissions/month on the free tier. The current `EnquiryFormCard.astro` must be switched to Web3Forms before launch.

---

## The Problem

Resales Online API only accepts requests from IP addresses whitelisted in their backend. Casa Espanha's server IP is whitelisted — no other server (Netlify, browsers, etc.) can query the API directly.

## The Solution

Build a **proxy REST endpoint on Casa Espanha's WordPress**, secured with a secret key. The Astro site calls this proxy at build time. Casa Espanha's server (whitelisted) relays the request to Resales Online and returns property data as JSON. A nightly Netlify build hook keeps the data fresh.

```
Netlify Build (nightly)
  → casaespanha.com/wp-json/reo/v1/properties?key=SECRET
      → Casa Espanha server (whitelisted IP)
          → Resales Online API (p1=1032892)
              → JSON property data → Astro static pages
```

---

## Phases

### Phase 1 — Proxy endpoint on Casa Espanha WordPress
**Effort:** ~2 hours | **Dependency:** Admin access to casaespanha.com

- [ ] Write a custom WordPress REST API endpoint (`/wp-json/reo/v1/properties`)
- [ ] Endpoint authenticates via `Authorization: Bearer` header (secret key stored in Netlify env vars, never in URLs or logs)
- [ ] Calls the Resales Online V6 API internally using the whitelisted server IP
- [ ] Returns ALL properties (no location filter) as JSON — Astro handles display filtering
- [ ] Fields to return: Reference, Location, Province, Bedrooms, Bathrooms, Built, Price, Description, Pictures, PropertyType
- [ ] Test endpoint manually with curl to confirm it returns valid data
- [ ] Store the secret key in `wp-config.php` (not hardcoded in the endpoint)

**Deliverable:** A URL like `casaespanha.com/wp-json/reo/v1/properties` that returns property JSON.

---

### Phase 2 — Astro data fetching layer
**Effort:** ~3 hours | **Dependency:** Phase 1 complete

- [ ] Create `src/lib/properties.ts` — fetch function that calls the Casa Espanha proxy
- [ ] Add `CASAESPANHA_API_KEY` to Netlify environment variables (keep out of repo)
- [ ] Cache/store ALL fetched properties as `src/data/properties.json` during build
- [ ] Define TypeScript types for the property object
- [ ] Handle errors gracefully — if proxy is down, build uses last cached JSON
- [ ] Filtering by location (e.g. Costa del Sol towns) happens here in Astro — not in the proxy
- [ ] Future locations can be added by changing the display filter only — no proxy changes needed

**Deliverable:** `getProperties()` and `getPropertyByArea(area)` helper functions usable in any Astro page.

---

### Phase 3 — Property listing pages
**Effort:** ~4 hours | **Dependency:** Phase 2 complete

- [ ] Create `src/pages/properties/index.astro` — full listing page with filters (area, type, budget)
- [ ] Create `src/pages/properties/[slug].astro` — individual property detail page (generated at build time)
- [ ] Add property count + sample listings to existing area pages (Marbella, Estepona, etc.)
- [ ] Add a "View properties" section to the homepage pulling 3–6 featured listings
- [ ] Ensure all property pages have correct SEO metadata (title, description, canonical)

**Deliverable:** `/properties/` listing page + individual property pages, all statically generated.

---

### Phase 4 — Nightly rebuild automation
**Effort:** ~1 hour | **Dependency:** Phase 3 complete, site deployed to Netlify

- [ ] Create a Netlify build hook (URL that triggers a fresh build)
- [ ] Set up a free cron service (e.g. cron-job.org or GitHub Actions scheduled workflow) to POST to the hook nightly at 02:00 UTC
- [ ] Verify the nightly build runs and property data is refreshed
- [ ] Add a `lastUpdated` timestamp to the properties page so visitors know data freshness
- [ ] After first successful build, check Netlify build log for total build time — if over 8 minutes, add a filter to skip properties with no photos (reduces page count significantly without losing quality listings)

**Deliverable:** Property data auto-refreshes every 24 hours without manual intervention.

---

### Phase 0 — Fix form handler (do this before anything else)
**Effort:** ~30 minutes | **Dependency:** None

- [ ] Switch `EnquiryFormCard.astro` from `data-netlify="true"` to Web3Forms (`action="https://api.web3forms.com/submit"`)
- [ ] Add Web3Forms access key hidden field
- [ ] Add phone number field (required on property pages, optional on homepage)
- [ ] Test form end-to-end — submit → check hridoy11.rk@gmail.com inbox
- [ ] Remove `data-netlify` and `form-name` hidden fields (Netlify Forms specific)

**Deliverable:** Form submits via Web3Forms, leads land in email. 250 free submissions/month.

---

### Phase 5 — Lead capture on property pages (optional, post-launch)
**Effort:** ~2 hours | **Dependency:** Phase 3 complete

- [ ] Add the shared `<LeadForm>` component to individual property detail pages
- [ ] Pre-populate the `area` field based on the property's location
- [ ] Add three hidden fields: `property_ref`, `property_title`, `property_price` — auto-populated from page data, invisible to visitor but included in the lead email
- [ ] Phone number required on property pages (optional on homepage/other pages)
- [ ] Add sold property banner: a `sold.json` file is generated at build time listing all refs removed since the last build. A small JS snippet checks if the current page's ref is in that list — if so, shows a banner: "This property may no longer be available — send us an enquiry and we'll find you something similar"
- [ ] Test form submission end-to-end — verify email includes property ref, title, price, and visitor's name/email/phone

**Deliverable:** Visitors can enquire directly from a property page, with listing context included in the email.

---

### Phase 6 — Sitemap verification & submission
**Effort:** ~30 minutes | **Dependency:** Site live on custom domain

- [ ] Confirm `@astrojs/sitemap` is generating `sitemap-index.xml` correctly on every build
- [ ] Check that all pages are included — static pages, area pages, blog posts, property pages
- [ ] Verify sitemap is publicly accessible at `https://realestateincostadelsol.com/sitemap-index.xml`
- [ ] Confirm `robots.txt` references the sitemap URL (already set — verify it survived the build)
- [ ] Submit sitemap in Google Search Console → Sitemaps tab
- [ ] Submit sitemap in Bing Webmaster Tools as well (secondary, free, worth doing)
- [ ] Check for crawl errors in Search Console within 48 hours of submission

**Deliverable:** All site pages are discoverable and indexed by Google and Bing from day one.

---

### Phase 7 — Analytics & Search Console setup
**Effort:** ~1 hour | **Dependency:** Site live on custom domain

- [ ] Create Google Search Console property for `realestateincostadelsol.com`
- [ ] Verify ownership via DNS TXT record (add in Netlify DNS settings)
- [ ] Submit sitemap: `https://realestateincostadelsol.com/sitemap-index.xml`
- [ ] Create Google Analytics 4 property, get measurement ID (`G-XXXXXXXXXX`)
- [ ] Add GA4 `<script>` snippet to `src/layouts/BaseLayout.astro` — loaded only after cookie consent
- [ ] Add a GDPR cookie consent banner (lightweight, no third-party library needed — a simple component with Accept/Decline buttons, stores preference in localStorage)
- [ ] GA4 fires only after visitor accepts cookies — compliant with UK GDPR and EU ePrivacy Directive
- [ ] Link GA4 property to Search Console for combined keyword + behaviour data
- [ ] Set up a GA4 conversion event for form submissions (thank-you page view)
- [ ] Confirm data is flowing — check Realtime report within 24 hours of going live

**Deliverable:** Full visibility into organic traffic, keyword rankings, and form conversion rate from day one.

---

### Phase 8 — Footer cleanup & Alentora credit
**Effort:** ~30 minutes | **Dependency:** None (can do anytime)

- [ ] Delete `Footer.astro` line 53 entirely: `<p>Partner agency: <a href="https://casaespanha.com">Casa Espanha</a></p>` — referral relationship is private, must not appear in HTML source
- [ ] Add "Made with love by <a href="https://alentora.com">Alentora</a>" to the footer bottom bar
- [ ] Keep it subtle — 12px, `rgba(255,255,255,0.4)`, same row as copyright

**Deliverable:** Footer no longer references Casa Espanha publicly. Alentora credit visible at bottom.

---

### Phase 9 — llms.txt (AI & API discoverability)
**Effort:** ~1 hour | **Dependency:** None (can do anytime, update as site grows)

This is an emerging web standard — a plain markdown file at `yoursite.com/llms.txt` that tells AI models, search APIs, and autonomous agents everything they need to know about your site. Think of it as `robots.txt` but for AI.

- [ ] Create `public/llms.txt` — publicly accessible at `https://realestateincostadelsol.com/llms.txt`
- [ ] Include: site name, owner, purpose, business model, target audience
- [ ] List all pages with their URLs, titles, and one-line descriptions
- [ ] List all published blog posts with URLs, titles, and target keywords
- [ ] Document the inquiry form endpoint and fields (so AI can understand the lead capture flow)
- [ ] Note the geographic focus (Costa del Sol, Spain) and buyer profile (UK/US buyers)
- [ ] Add a section on what the site does NOT do (no live listings API, no booking, no prices shown)
- [ ] Update the file each time a new page or blog post is published
- [ ] Reference `llms.txt` in `robots.txt` with a comment so crawlers find it
- [ ] Do NOT mention Casa Espanha by name — describe the lead destination generically: "Leads are forwarded to a partner agency for follow-up"
- [ ] Do NOT include Alentora branding — llms.txt is about the site, not the builder

**Example structure:**
```
# Real Estate in Costa del Sol
> Find villas, apartments and new developments across the Costa del Sol.

Owner: Mamun Hridoy / Alentora
Purpose: SEO blog + lead generation for UK/US buyers of Spanish coastal property
Leads forwarded to: Casa Espanha (casaespanha.com)

## Pages
- /: Homepage — real estate in costa del sol
- /costa-del-sol/: Costa del Sol property for sale
- /costa-del-sol/marbella/: Marbella real estate
...

## Blog Posts
- /blog/what-300000-buys-marbella-2026/: What €300k buys in Marbella (2026)
...

## Enquiry Form
POST https://api.web3forms.com/submit
Fields: name, email, budget, area, property type, bedrooms, message
```

**Deliverable:** `realestateincostadelsol.com/llms.txt` is live and human + machine readable. AI tools and future APIs can instantly understand the site's purpose, structure, and content.

---

## Key Decisions

| Decision | Reason |
|---|---|
| Proxy on Casa Espanha, not direct API | Resales Online IP whitelist cannot be changed without their cooperation |
| Secret key auth on proxy endpoint | Prevents the endpoint being scraped by others |
| Static pages at build time, not server-side | Keeps hosting free (Netlify free tier), pages load instantly |
| Nightly build hook, not real-time | Properties don't change minute-to-minute; 24h refresh is sufficient |
| Cache last JSON on build failure | Build doesn't break the site if Casa Espanha is temporarily down |
| Store API key in Netlify env vars | Never commit credentials to the repo |

---

## What We Are NOT Doing

- No property search with live filtering (would require a backend or serverless function with the whitelisted IP)
- No Resales Online API calls from the browser
- No exposing the Resales Online credentials (p1=1032892) in public code
- No full property CMS — Markdown blog posts stay as-is

---

## Files That Will Be Created or Modified

```
casaespanha.com WordPress (external)
└── wp-content/plugins/reo-proxy/reo-proxy.php   ← new custom plugin

realestateincostadelsol.com (this repo)
├── src/
│   ├── lib/
│   │   └── properties.ts                         ← new fetch + helper functions
│   ├── data/
│   │   └── properties.json                       ← new cached property data (gitignored)
│   ├── pages/
│   │   └── properties/
│   │       ├── index.astro                        ← new listing page
│   │       └── [slug].astro                       ← new dynamic detail page
│   └── components/
│       └── PropertyCard.astro                     ← new reusable card component
├── .env.example                                   ← new (documents required env vars)
├── public/
│   └── llms.txt                                   ← new AI/API discoverability file
└── roadmap.md                                     ← this file
```

---

## Environment Variables Required

```
CASAESPANHA_API_KEY=your_secret_key_here
```

Add to: Netlify → Site Settings → Environment Variables  
Never commit to the repo. Add `.env` to `.gitignore`.

---

## Status

| Phase | Status |
|---|---|
| Phase 0 — Fix form handler (Web3Forms + phone field) | Not started |
| Phase 1 — Casa Espanha proxy endpoint | Not started |
| Phase 2 — Astro data fetching layer | Not started |
| Phase 3 — Property listing pages | Not started |
| Phase 4 — Nightly rebuild automation | Not started |
| Phase 5 — Lead capture on property pages | Not started |
| Phase 6 — Sitemap verification & submission | Not started |
| Phase 7 — Analytics & Search Console | Not started |
| Phase 8 — Footer cleanup & Alentora credit | Not started |
| Phase 9 — llms.txt (AI & API discoverability) | Not started |
