# CLAUDE.md — Real Estate in Costa del Sol
## Project Reference for AI-Assisted Development

**Site:** realestateincostadelsol.com  
**Framework:** Astro 5.x (static site, zero JS by default)  
**Hosting:** Netlify (free tier) — auto-deploy from GitHub  
**Form handler:** Web3Forms (free) — submissions → hridoy11.rk@gmail.com  
**Owner:** Mamun Hridoy / Alentora  
**Purpose:** SEO blog + lead generation site targeting UK/US buyers of Spanish coastal property. Leads are sold/referred to Casa Espanha (casaespanha.com).

---

## Business Model

1. Drive organic traffic via SEO blog posts targeting high-volume property keywords
2. Capture buyer leads via the homepage inquiry form
3. Forward qualified leads to Casa Espanha (existing client relationship)
4. Monetise via referral fee or monthly retainer from Casa Espanha

No property listings are shown directly. No API integration. Pure content + lead gen.

---

## Design System

### Fonts
- **Display / headings:** Playfair Display (Google Fonts) — italic variant used for emphasis
- **Body / UI:** Plus Jakarta Sans (Google Fonts)
- Load via: `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap')`

### Color Tokens
```css
--green:         #1B3A2D;   /* primary dark green — nav, hero bg, buttons, featured cards */
--green2:        #254D3C;   /* hover state for --green */
--green3:        #2F6349;   /* active / pressed state */
--green-mid:     #4A7C62;   /* eyebrow labels, icon backgrounds */
--green-lt:      #E8F0EB;   /* light green tint — type card backgrounds */
--green-xlt:     #F2F7F4;   /* very light green — page/section bg */
--white:         #FFFFFF;   /* cards, form backgrounds */
--off-white:     #F8FAF8;   /* page background, alternating sections */
--border:        #D4E2D9;   /* all card and input borders */
--border-lt:     #E8F0EB;   /* subtle dividers inside cards */
--text:          #1B3A2D;   /* primary text */
--text-muted:    #5A7268;   /* body copy, descriptions */
--text-light:    #8FAA9A;   /* meta text, dates, labels */
--accent:        #C8A96E;   /* gold — hero eyebrow, featured card highlights, CTA accents */
--accent-dark:   #A88A4E;   /* gold hover */
--dark-footer:   #0D1F16;   /* footer background */
```

### Spacing Scale (px)
4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 56 · 80

### Border Radius
- Small: 4px (buttons, pills)
- Medium: 8px (inputs, small cards)
- Large: 12px (area cards, blog cards)
- XL: 16px (lead form container)

### Container
- Max width: 1200px, padding: 0 80px (desktop), 0 20px (mobile)

### Component Rules
- **Section eyebrow:** 11px, 700 weight, 0.14em letter-spacing, uppercase, `--green-mid`
- **Section H2:** Playfair Display, 44px desktop / clamp(1.9rem, 3.5vw, 2.8rem), 700 weight, `--text`
- **Card hover:** `transform: translateY(-2px)` + border darkens to `--green`
- **Buttons:** 4px radius, 600 weight, 14px, padding 13px 26px
- **Featured area card:** `--green` background, white text, gold (`--accent`) price
- **All other area cards:** white background, `--border` border, `--text` text

---

## Site Architecture — All Pages

### Static Pages (Astro .astro files)

| Route | File | Target Keyword | Monthly Searches |
|---|---|---|---|
| `/` | `src/pages/index.astro` | real estate in costa del sol | UK: 110, US: 260 |
| `/costa-del-sol/` | `src/pages/costa-del-sol/index.astro` | costa del sol property for sale | UK: 1,900, US: 210 |
| `/costa-del-sol/marbella/` | `src/pages/costa-del-sol/marbella.astro` | marbella real estate | UK: 170, US: 880 |
| `/costa-del-sol/estepona/` | `src/pages/costa-del-sol/estepona.astro` | estepona property for sale | — |
| `/costa-del-sol/fuengirola/` | `src/pages/costa-del-sol/fuengirola.astro` | fuengirola property for sale | — |
| `/costa-del-sol/nerja/` | `src/pages/costa-del-sol/nerja.astro` | nerja property for sale | — |
| `/costa-blanca/` | `src/pages/costa-blanca/index.astro` | apartments costa del sol | UK: 390, US: 720 |
| `/costa-calida/` | `src/pages/costa-calida/index.astro` | costa calida property for sale | — |
| `/costa-de-la-luz/` | `src/pages/costa-de-la-luz/index.astro` | costa de la luz property | — |
| `/villas-for-sale-costa-del-sol/` | `src/pages/villas-for-sale-costa-del-sol.astro` | villas for sale costa del sol | UK: 390 |
| `/apartments-costa-del-sol/` | `src/pages/apartments-costa-del-sol.astro` | apartments costa del sol | UK: 390, US: 720 |
| `/new-developments-costa-del-sol/` | `src/pages/new-developments-costa-del-sol.astro` | new developments costa del sol | Low competition |
| `/homes-for-sale-costa-del-sol/` | `src/pages/homes-for-sale-costa-del-sol.astro` | homes for sale costa del sol | UK: 1,000 |
| `/blog/` | `src/pages/blog/index.astro` | — listing page | — |
| `/blog/[slug]/` | `src/pages/blog/[slug].astro` | — dynamic route | — |
| `/contact/` | `src/pages/contact.astro` | — | — |
| `/about/` | `src/pages/about.astro` | — | — |
| `/privacy/` | `src/pages/privacy.astro` | — | — |

### Blog Posts (Markdown in `src/content/blog/`)

Priority order — write these first:

| Slug | Title | Target Keyword | Priority |
|---|---|---|---|
| `what-300000-buys-marbella-2026` | What €300,000 actually buys you in Marbella right now | marbella property prices | 1 |
| `buying-property-spain-uk-citizens-2026` | Buying property in Spain as a UK citizen — complete 2026 guide | buying property spain uk | 2 |
| `estepona-vs-fuengirola-families` | Estepona vs Fuengirola — which is better for families? | estepona fuengirola comparison | 3 |
| `best-rental-yield-costa-del-sol` | Best rental yield areas on the Costa del Sol in 2026 | costa del sol rental yield | 4 |
| `costa-del-sol-property-prices-2026` | Costa del Sol property prices — area by area breakdown 2026 | costa del sol property prices | 5 |
| `cheapest-areas-buy-property-costa-del-sol` | Cheapest areas to buy property on the Costa del Sol | cheap property costa del sol | 6 |
| `new-developments-costa-del-sol-guide` | New developments Costa del Sol — complete buyer guide | new developments costa del sol | 7 |
| `cost-of-living-costa-del-sol-uk-expats` | Cost of living on the Costa del Sol for UK expats | costa del sol cost of living | 8 |

---

## Keyword Strategy

### Primary targets (homepage + main pages)
- `real estate in costa del sol` — exact match domain keyword
- `costa del sol property for sale` — 1,900/mo UK, MEDIUM competition
- `homes for sale costa del sol` — 1,000/mo UK, MEDIUM competition
- `property costa del sol` — 480/mo UK, MEDIUM competition

### Secondary targets (area + type pages)
- `marbella real estate` — 880/mo US, 170/mo UK
- `apartments costa del sol` — 720/mo US, 390/mo UK
- `villas for sale costa del sol` — 390/mo UK, MEDIUM competition
- `homes for sale costa del sol` — 1,000/mo UK
- `new developments costa del sol` — LOW competition (easy win)
- `buy property costa del sol` — 30/mo UK, MEDIUM competition

### Long-tail blog targets
- `what does 300000 buy in marbella`
- `buying property spain uk citizen 2026`
- `estepona vs fuengirola`
- `best areas rental yield costa del sol`
- `costa del sol property prices 2026`
- `costa blanca vs costa del sol`
- `cheapest areas costa del sol property`

### Competitor context
Wiidoo Media, RealtySoft, and Resales Online Sync are the main plugin competitors — not direct SEO competitors for this site. Direct SEO competitors are large portals (Rightmove Overseas, Kyero, A Place in the Sun). We win by being more specific, more opinionated, and faster-loading.

---

## Project File Structure

```
realestateincostadelsol.com/
├── CLAUDE.md                        ← this file
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap-index.xml            ← auto-generated by @astrojs/sitemap
├── src/
│   ├── components/
│   │   ├── Nav.astro                ← sticky nav, logo, links, mobile hamburger
│   │   ├── Footer.astro             ← dark footer, 4-column links
│   │   ├── HeroSection.astro        ← full-height hero with bg image + search bar
│   │   ├── StatsStrip.astro         ← dark green stats bar (2400+ listings etc)
│   │   ├── KeywordPills.astro       ← scrollable keyword pill links
│   │   ├── AreasGrid.astro          ← 6 area cards, Marbella featured
│   │   ├── PropertyTypesGrid.astro  ← 3 type cards (villas, apts, new devs)
│   │   ├── BlogGrid.astro           ← 1 featured + 3 small blog cards
│   │   ├── LeadForm.astro           ← inquiry form (Web3Forms)
│   │   ├── AreaCard.astro           ← reusable single area card
│   │   ├── BlogCard.astro           ← reusable blog post card
│   │   └── SEOHead.astro            ← <head> with title, meta, OG, canonical
│   ├── content/
│   │   ├── config.ts                ← Astro content collections config
│   │   └── blog/
│   │       ├── what-300000-buys-marbella-2026.md
│   │       ├── buying-property-spain-uk-citizens-2026.md
│   │       └── ... (all blog posts as .md files)
│   ├── layouts/
│   │   ├── BaseLayout.astro         ← wraps all pages: Nav + slot + Footer
│   │   └── BlogLayout.astro         ← extends BaseLayout, adds article schema
│   ├── pages/
│   │   ├── index.astro              ← homepage
│   │   ├── contact.astro
│   │   ├── about.astro
│   │   ├── privacy.astro
│   │   ├── blog/
│   │   │   ├── index.astro          ← blog listing
│   │   │   └── [slug].astro         ← dynamic blog post route
│   │   ├── costa-del-sol/
│   │   │   ├── index.astro
│   │   │   ├── marbella.astro
│   │   │   ├── estepona.astro
│   │   │   ├── fuengirola.astro
│   │   │   └── nerja.astro
│   │   ├── costa-blanca/
│   │   │   └── index.astro
│   │   ├── costa-calida/
│   │   │   └── index.astro
│   │   ├── costa-de-la-luz/
│   │   │   └── index.astro
│   │   ├── villas-for-sale-costa-del-sol.astro
│   │   ├── apartments-costa-del-sol.astro
│   │   ├── new-developments-costa-del-sol.astro
│   │   └── homes-for-sale-costa-del-sol.astro
│   └── styles/
│       └── global.css               ← design tokens, reset, base typography
```

---

## Astro Configuration

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://realestateincostadelsol.com',
  integrations: [sitemap()],
  output: 'static',
});
```

### Required packages
```json
{
  "dependencies": {
    "astro": "^5.0.0",
    "@astrojs/sitemap": "^3.0.0"
  }
}
```

No React, no Tailwind, no heavy framework. Pure Astro + vanilla CSS.

---

## SEOHead Component — Required Props

Every page passes these to `<SEOHead>`:

```astro
<SEOHead
  title="Costa del Sol Property for Sale | Real Estate in Costa del Sol"
  description="Find villas, apartments and new developments for sale across Costa del Sol..."
  canonical="https://realestateincostadelsol.com/costa-del-sol/"
  ogImage="/og/costa-del-sol.jpg"
/>
```

### SEO rules
- Title format: `{Page Topic} | Real Estate in Costa del Sol`
- Max title length: 60 characters
- Meta description: 140–155 characters, include primary keyword naturally
- Every page has a unique canonical URL
- OG image: 1200×630px, stored in `/public/og/`
- Blog posts auto-generate OG image from frontmatter

### Blog post frontmatter schema
```yaml
---
title: "What €300,000 Actually Buys You in Marbella Right Now"
description: "A detailed breakdown of the Marbella property market in 2026 — real listings, real prices, no spin."
pubDate: 2026-06-04
updatedDate: 2026-06-04
author: "Mamun Hridoy"
category: "Marbella"
tags: ["marbella", "property prices", "costa del sol", "buyer guide"]
image: "/blog/marbella-property-2026.jpg"
imageAlt: "Luxury apartment in Marbella with sea view"
featured: true
---
```

---

## Inquiry Form — Web3Forms

Form submits to Web3Forms (free, no backend needed).  
Submissions are emailed to: `hridoy11.rk@gmail.com`

```html
<form action="https://api.web3forms.com/submit" method="POST">
  <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_KEY">
  <input type="hidden" name="subject" value="New property enquiry — realestateincostadelsol.com">
  <input type="hidden" name="redirect" value="https://realestateincostadelsol.com/thank-you/">
  <!-- form fields -->
</form>
```

Form fields (all pages):
- name (text, required)
- email (email, required)
- budget (select: Up to €150k / €150k–€300k / €300k–€500k / €500k+)
- area (select: Marbella / Estepona / Fuengirola / Nerja / Costa Blanca / Open to suggestions)
- type (select: Villa / Apartment / New development / Not sure)
- bedrooms (select: 1 / 2 / 3 / 4+)
- message (textarea)

Get free access key at: web3forms.com

---

## Content Guidelines

### Tone of voice
- Informative and honest — not salesy
- Written for UK buyers (use £ alongside € where relevant, reference post-Brexit rules)
- Data-driven — use real price figures from Casa Espanha listings where available
- Conversational but authoritative

### Blog post structure (every post)
1. H1 — exact or close match to target keyword
2. Short intro paragraph (2–3 sentences, include keyword naturally)
3. Key facts box (quick takeaways for featured snippet)
4. H2 sections — break the topic into 4–6 subtopics
5. Internal links — link to at least 2 other pages/posts on the site
6. Lead capture CTA at the bottom — "Looking for property in [area]? Send us a free enquiry."
7. FAQ section (3–5 questions targeting related long-tail keywords)

### Internal linking rules
- Every area page links to related blog posts
- Every blog post links to the relevant area page AND the homepage
- Property type pages link to area pages
- Blog index links to all published posts

---

## Netlify Deployment

### `netlify.toml`
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/404"
  status = 404

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

### Deploy steps
1. Push project to GitHub (github.com/mamunhridoy/realestateincostadelsol)
2. Connect repo to Netlify → auto-deploys on every push
3. Add custom domain: realestateincostadelsol.com in Netlify DNS settings
4. SSL auto-provisioned by Netlify (Let's Encrypt)

---

## robots.txt
```
User-agent: *
Allow: /

Sitemap: https://realestateincostadelsol.com/sitemap-index.xml
```

---

## Analytics
- Plausible Analytics (privacy-friendly, lightweight) — OR —
- Google Analytics 4 (via `<script>` in BaseLayout.astro)
- Add after launch, not before

---

## Known Constraints & Decisions

| Decision | Reason |
|---|---|
| Static Astro, no WordPress | Simpler, faster, free hosting, no maintenance |
| No property listings / API | API tied to Casa Espanha credentials — not portable |
| Web3Forms for contact | Free, no backend, no server required |
| No React/Tailwind | Unnecessary complexity for a blog + lead gen site |
| No CMS (yet) | Blog posts as Markdown files — simple enough for now |
| Playfair Display + Plus Jakarta Sans | Matches approved design system from design session |
| Dark green #1B3A2D + white | Approved brand colors from design session |
| Sitemap via @astrojs/sitemap | Auto-generates on every build — no manual maintenance |

---

## Data Sources for Blog Content

Casa Espanha (casaespanha.com) — Mamun has admin access.  
Use real listing data (prices, locations, property types, descriptions) to make blog posts factually accurate and unique. Never copy listing descriptions verbatim — paraphrase and add context.

Resales Online network data is accessible via the casaespanha.com Resales Online plugin (V6 API, credentials: p1=1032892). Use for price range data and area statistics in blog posts only — do not expose API credentials publicly.

---

## Session History

| Date | What was done |
|---|---|
| 2026-06-04 | Full project planned: business model, site structure, 14 pages, keyword research via DataForSEO, design system (dark green + white, Playfair Display + Plus Jakarta Sans), homepage HTML template built, Elementor MCP homepage built on realestateincostadelsol.com (post ID 13), decision to switch to Astro static site |

