# Handoff — realestateincostadelsol.com

**Date:** 2026-06-04  
**Working directory:** `k:\realestateincostadelsol.com`  
**Project reference:** [CLAUDE.md](CLAUDE.md)

---

## What This Project Is

Static Astro 5.x site for `realestateincostadelsol.com` — SEO blog + lead gen targeting UK/US buyers of Spanish coastal property. Leads forwarded to partner agency Casa Espanha. No property listings, no API, no React, no Tailwind — pure Astro + vanilla CSS.

---

## What Was Built This Session

### Full project scaffolded from scratch

Previously only `CLAUDE.md` and a legacy `index.html` existed. Everything below was created:

**Config / deploy**
- `package.json`, `astro.config.mjs`, `tsconfig.json`, `netlify.toml`
- `public/robots.txt`, `public/favicon.svg`

**Design system**
- `src/styles/global.css` — all CSS tokens (`--green`, `--accent`, etc.), typography, button classes, and the full animation system (`fadeUpBlur`, `fadeUp`, `fadeIn`, `card-lift`)

**12 components** (`src/components/`)
- `SEOHead.astro` — `<head>` with title, meta, OG, canonical
- `Nav.astro` — sticky dark-green nav, mobile hamburger
- `Footer.astro` — 4-column dark footer
- `HeroSection.astro` — two-column hero: left copy + right inline enquiry form
- `StatsStrip.astro` — 4-stat dark-green bar
- `KeywordPills.astro` — scrollable pill links, centered
- `AreasGrid.astro` — 6 area cards (Marbella featured)
- `AreaCard.astro` — reusable area card
- `PropertyTypesGrid.astro` — 3 property type cards
- `BlogGrid.astro` — 1 featured + 3 small blog cards
- `BlogCard.astro` — reusable blog card
- `LeadForm.astro` — Web3Forms enquiry form (two-column layout)

**2 layouts** (`src/layouts/`)
- `BaseLayout.astro` — Nav + slot + Footer + Intersection Observer animation script
- `BlogLayout.astro` — Full article layout: progress bar, hero image, breadcrumb, author meta, read time, two-column (article + sticky sidebar), back-to-top, bottom CTA box

**Content**
- `src/content/config.ts` — Astro content collection schema for blog
- `src/content/blog/what-300000-buys-marbella-2026.md` — Priority 1 blog post
- `src/content/blog/buying-property-spain-uk-citizens-2026.md` — Priority 2 blog post

**19 pages** (`src/pages/`)

| Route | File |
|---|---|
| `/` | `index.astro` |
| `/costa-del-sol/` | `costa-del-sol/index.astro` |
| `/costa-del-sol/marbella/` | `costa-del-sol/marbella.astro` |
| `/costa-del-sol/estepona/` | `costa-del-sol/estepona.astro` |
| `/costa-del-sol/fuengirola/` | `costa-del-sol/fuengirola.astro` |
| `/costa-del-sol/nerja/` | `costa-del-sol/nerja.astro` |
| `/costa-blanca/` | `costa-blanca/index.astro` |
| `/costa-calida/` | `costa-calida/index.astro` |
| `/costa-de-la-luz/` | `costa-de-la-luz/index.astro` |
| `/villas-for-sale-costa-del-sol/` | `villas-for-sale-costa-del-sol.astro` |
| `/apartments-costa-del-sol/` | `apartments-costa-del-sol.astro` |
| `/new-developments-costa-del-sol/` | `new-developments-costa-del-sol.astro` |
| `/homes-for-sale-costa-del-sol/` | `homes-for-sale-costa-del-sol.astro` |
| `/blog/` | `blog/index.astro` |
| `/blog/[slug]/` | `blog/[slug].astro` |
| `/contact/` | `contact.astro` |
| `/about/` | `about.astro` |
| `/privacy/` | `privacy.astro` |

---

## Current Known State

### Images
All images use **Unsplash CDN URLs** — no files in `public/images/`. When the owner supplies real photos, swap URLs in:
- `src/components/HeroSection.astro` (hero background, line ~10)
- `src/components/AreasGrid.astro` (6 area card images)
- `src/content/blog/*.md` (frontmatter `image:` field)
- `src/components/BlogCard.astro` (fallback default)

### Web3Forms key
`LeadForm.astro` has `value="YOUR_WEB3FORMS_KEY"` — needs replacing with real key from web3forms.com before going live.

### OG images
Referenced as `/og/homepage.jpg`, `/og/marbella.jpg` etc. — these files do **not** exist yet. Need to create `public/og/` with 1200×630px images or the OG meta will 404.

### Build status
`npm run build` passes cleanly — 19 pages, 0 errors, sitemap auto-generated.

---

## Animation System

Implemented via vanilla CSS + Intersection Observer (no Framer Motion — wrong stack):

- **`[data-animate]`** — hidden by default, `.in-view` class triggers `fadeUpBlur` (opacity + translateY + blur)
- **`[data-animate="fade-up"]`** — same without blur
- **`[data-animate="fade"]`** — opacity only
- **`[data-stagger]`** — container; JS assigns `--anim-delay` to each child (configurable via `data-stagger-base` / `data-stagger-step` attributes)
- **`card-lift`** — hover lift class using spring cubic-bezier, `transition-colors` only on cards (never `transition-all` — breaks filter animation)
- Hero elements animate on page load, not scroll (above fold)
- `prefers-reduced-motion` fully respected

Observer lives in `BaseLayout.astro` `<script>` block.

---

## Blog Post Prose Styles

**Critical:** Markdown renders into `<slot />` — Astro scoped CSS does NOT reach slot children. All `.post-content` child rules must use `:global()`:

```css
/* CORRECT */
.post-content :global(h2) { ... }
.post-content :global(p)  { ... }

/* WRONG — never applied to markdown output */
.post-content h2 { ... }
```

Current settings: `font-size: 16.5px`, `line-height: 2`, `max-width: 68ch`, generous heading margins (56px top on h2).

---

## What Still Needs Doing

### Immediate / pre-launch
- [ ] Add real Web3Forms access key to `LeadForm.astro`
- [ ] Create `public/og/` directory with OG images (1200×630px) for all key pages
- [ ] Replace Unsplash placeholder URLs with real branded photos
- [ ] Push repo to GitHub → connect to Netlify → add custom domain
- [ ] Add `/thank-you/` page (form currently redirects to it)

### Content — blog posts remaining (see CLAUDE.md priority list)
- [ ] `estepona-vs-fuengirola-families` (Priority 3)
- [ ] `best-rental-yield-costa-del-sol` (Priority 4)
- [ ] `costa-del-sol-property-prices-2026` (Priority 5)
- [ ] `cheapest-areas-buy-property-costa-del-sol` (Priority 6)
- [ ] `new-developments-costa-del-sol-guide` (Priority 7)
- [ ] `cost-of-living-costa-del-sol-uk-expats` (Priority 8)

### Nice to have
- [ ] Analytics script in `BaseLayout.astro` (Plausible or GA4 — add after launch)
- [ ] 404 page (`src/pages/404.astro`)
- [ ] `/thank-you/` page after form submission
- [ ] Real property photos in `public/images/`

---

## Key Design Tokens (quick reference)

```css
--green:      #1B3A2D   /* primary — nav, hero, buttons */
--accent:     #C8A96E   /* gold — highlights, badges */
--text-muted: #5A7268   /* body copy */
--border:     #D4E2D9   /* card borders */
--dark-footer:#0D1F16   /* footer bg */
```

Fonts: **Playfair Display** (headings/display) + **Plus Jakarta Sans** (body/UI) — loaded via Google Fonts in `global.css`.

---

## Suggested Skills for Next Session

| Task | Skill |
|---|---|
| Writing remaining 6 blog posts | `caveman` (for efficiency) |
| UI polish / new section designs | `ui-ux-pro-max` (animation domain only) |
| Deploying to Netlify / GitHub setup | none needed — standard git push |
| Adding analytics or new integrations | none needed |
