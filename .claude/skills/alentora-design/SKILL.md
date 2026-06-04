---
name: alentora-design
description: Generate landing pages and website sections that exactly replicate the Alentora "clinical boutique / high-end organic tech" design system. Use when asked to build a new site, add a landing page, scaffold a section, or replicate the Alentora look and feel for a new client/project.
---

# Alentora Design System — Landing Page Generator

This skill is the complete specification for generating new websites, landing pages, or page sections that perfectly replicate the Alentora visual identity and component architecture.

**Stack required:** Next.js 14+ (App Router), Tailwind CSS v4, Framer Motion, Lenis, Lucide React, Radix UI / Shadcn UI.

---

## 1. Install

```bash
npm install framer-motion lenis lucide-react tailwindcss-animate @tailwindcss/typography
npx shadcn@latest init
```

Tailwind v4 needs no `tailwind.config.ts`. All tokens live in `globals.css` via `@theme`.

---

## 2. Design Tokens (`globals.css`)

```css
@import "tailwindcss";
@plugin "tailwindcss-animate";
@plugin "@tailwindcss/typography";

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);          /* Pure white */
  --foreground: oklch(0.145 0 0);      /* Soft off-black */
  --primary: oklch(0.81 0.2 135);      /* #87E64B Neon Green */
  --primary-foreground: oklch(0.145 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --border: oklch(0.922 0 0);
}
```

**Palette quick-reference:**
| Token | Value | Use |
|---|---|---|
| `#87E64B` | Neon Green | CTA buttons, icon boxes, hover accents, brand moments |
| `zinc-900` | Near-black | Headlines, card titles |
| `zinc-500` | Mid-grey | Body/description text |
| `zinc-400` | Light grey | Eyebrow (Caveat font), muted labels |
| `bg-muted/30` | Near-white | Alternate section backgrounds |
| `bg-zinc-50` | Off-white | Cards, secondary surfaces |

---

## 3. Typography

**Font setup in `layout.tsx`:**
```tsx
import { Geist, Geist_Mono } from "next/font/google"
import { Caveat } from "next/font/google"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })
const caveat = Caveat({ variable: "--font-caveat", subsets: ["latin"] })
```

**Typography hierarchy (use on every section):**
```tsx
{/* EYEBROW — handwritten, human */}
<p className="font-[family-name:var(--font-caveat)] text-3xl text-zinc-400 font-medium">
  Eyebrow Text
</p>

{/* HEADLINE — massive, tight, bold */}
<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 tracking-tight leading-tight pb-4">
  Headline Text
</h2>

{/* DESCRIPTION — centered, readable prose */}
<p className="text-lg md:text-xl text-zinc-500 leading-relaxed max-w-2xl mx-auto">
  Description text goes here...
</p>
```

---

## 4. Animation System (`lib/motion.ts`)

Copy this file verbatim into every new project:

```typescript
import { Variants } from "framer-motion"

export const fadeUpBlur: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.8, ease: "easeOut" },
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
}

export const premiumCardEntrance: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: "spring", stiffness: 80, damping: 24, mass: 1 },
  },
}

export const viewportConfig = { once: true, margin: "-100px" }
```

**Animation rules:**
- All scroll-triggered: `viewport={{ once: true, amount: 0.2 }}`
- Every section's content wraps in `staggerContainerSlow`, children use `fadeUpBlur`
- NEVER use `transition-all` on elements that also have Framer Motion entrance animations — use `transition-colors` only
- Hover lifts: `group-hover:-translate-y-1` or `whileHover={{ y: -5 }}`

---

## 5. Standard Landing Page Section Stack

Build every landing page in this exact section order:

```
1. Header (floating pill, backdrop-blur, auto-hide)
2. Hero (full-height, centered, stagger animation)
3. Services / What We Do (grid, muted background)
4. Problem / Solution (2-column split)
5. Process Steps (4 cards with connectors)
6. FAQ (accordion)
7. Blog / Social Proof (optional)
8. CTA (dark rounded container, floating pills)
9. Footer
```

---

## 6. Section Templates

### 6.1 Header

```tsx
// Floating pill design — always fixed, always blurred
<motion.header
  variants={{ visible: { y: 0 }, hidden: { y: -100 } }}
  animate={hidden ? "hidden" : "visible"}
  transition={{ duration: 0.35, ease: "easeInOut" }}
  className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none pt-4 md:pt-6"
>
  <div className={cn(
    "flex items-center justify-between transition-all duration-300 pointer-events-auto",
    "bg-background/70 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.08)]",
    "rounded-full w-[95%] md:w-auto md:min-w-[600px] lg:min-w-[800px]",
    shrink ? "px-6 py-2 scale-[0.98]" : "px-6 py-3 scale-100"
  )}>
    {/* Logo | Nav | CTA — tripod layout */}
  </div>
</motion.header>
```

Active nav indicator (neon green spring underline):
```tsx
<motion.div
  layoutId="activeNav"
  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#87E64B] rounded-full"
  transition={{ type: "spring", stiffness: 380, damping: 30 }}
/>
```

### 6.2 Hero Section

```tsx
<section className="relative overflow-hidden flex flex-col justify-between pb-0 h-[100dvh]">
  <div className="container relative z-10 flex-1 flex flex-col items-center justify-center text-center">
    <motion.div
      variants={heroContainerVariant}  // staggerChildren: 0.2, delayChildren: 0.2
      initial="hidden"
      animate="visible"
      className="max-w-4xl lg:max-w-3xl space-y-8"
    >
      {/* Optional badge */}
      <motion.div variants={heroItemVariant}>{badge}</motion.div>

      {/* H1 */}
      <motion.h1
        variants={heroItemVariant}
        className="text-4xl font-bold tracking-tight md:text-[4.5rem] leading-[1.1]"
      >
        {title} <span className="text-[#87E64B]">{accentWords}</span>
      </motion.h1>

      {/* Description */}
      <motion.p
        variants={heroItemVariant}
        className="mx-auto max-w-[42rem] text-muted-foreground sm:text-xl sm:leading-8"
      >
        {description}
      </motion.p>

      {/* Buttons */}
      <motion.div variants={heroItemVariant} className="flex flex-wrap items-center justify-center gap-4">
        {/* Primary: ShimmerButton — dark with shimmer effect */}
        {/* Secondary: outline rounded-full border-2 border-zinc-200 */}
      </motion.div>
    </motion.div>
  </div>

  {/* Scroll indicator at bottom */}
  {/* Background: SpectraNoise + gradient fade to background */}
</section>
```

### 6.3 Section Heading (reusable block)

```tsx
<div className="text-center space-y-2 max-w-3xl mx-auto mb-16">
  <motion.p variants={fadeUpBlur}
    className="font-[family-name:var(--font-caveat)] text-3xl text-zinc-400 font-medium pb-2">
    {eyebrow}
  </motion.p>
  <motion.h2 variants={fadeUpBlur}
    className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 tracking-tight leading-tight pb-4">
    {title}
  </motion.h2>
  <motion.p variants={fadeUpBlur}
    className="text-lg md:text-xl text-zinc-500 leading-relaxed max-w-2xl mx-auto">
    {subtitle}
  </motion.p>
</div>
```

### 6.4 Services Grid Section

Background: subtle grid pattern on muted:
```tsx
<section className="py-16 md:py-32 bg-muted/30 relative">
  <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
  {/* SectionHeading + grid of ServiceCards */}
</section>
```

**ServiceCard anatomy:**
```tsx
<motion.article
  variants={fadeUpBlur}
  whileHover={{ y: -5 }}
  className="group relative flex flex-col justify-between h-full p-8 rounded-[2rem] bg-[#FAFAFA] border border-zinc-200 hover:border-[#87E64B]/50 hover:shadow-lg transition-colors duration-300"
>
  {/* Icon box — always #87E64B bg, black icon, rotate on hover */}
  <div className="w-12 h-12 bg-[#87E64B] text-black rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
    <Icon className="w-5 h-5" />
  </div>

  {/* Index badge — mono, zinc-400, top-right */}
  <div className="px-3 py-1 border border-zinc-200 rounded-lg text-xs font-mono text-zinc-400">01</div>

  {/* Title: text-3xl font-bold text-zinc-900 */}
  {/* Description: text-sm text-zinc-500 leading-relaxed */}
  {/* Tags: border rounded-full text-xs, hover border-[#87E64B] */}
</motion.article>
```

### 6.5 Problem / Solution (2-column split)

```tsx
<motion.div
  className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start"
  variants={staggerContainerSlow}
  initial="hidden" whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
>
  {/* Problem column: bg-red-50/50, border-red-100, rounded-[2.5rem] */}
  <motion.div variants={fadeUpBlur}
    className="flex flex-col gap-8 p-6 md:p-10 rounded-[2.5rem] bg-red-50/50 border border-red-100">
    {/* Red badge, red X icons, pain point list */}
  </motion.div>

  {/* Solution column: bg-[#87E64B]/5, border-[#87E64B]/20, rounded-[2.5rem] */}
  <motion.div variants={fadeUpBlur}
    className="flex flex-col gap-8 p-6 md:p-10 rounded-[2.5rem] bg-[#87E64B]/5 border border-[#87E64B]/20">
    {/* Green badge, green check icons, benefit list */}
    {/* Each benefit card: bg-white rounded-2xl border border-[#87E64B]/20 shadow-sm hover:shadow-md */}
  </motion.div>
</motion.div>
```

### 6.6 Process Steps (4 cards)

```tsx
{steps.map((step, i) => (
  <motion.div
    key={i}
    variants={fadeUpBlur}
    style={{ rotate: step.rotate }}   // subtle rotation: "-2deg", "2deg", "-1deg", "3deg"
    whileHover={{ y: -10, rotate: 0, scale: 1.02 }}
    className="w-full h-[320px] bg-white border border-black/5 rounded-[2rem] p-8 flex flex-col justify-between shadow-lg"
  >
    {/* Number: text-6xl font-medium text-black/15 → hover: text-[#87E64B]/40 */}
    {/* Title: text-2xl font-bold → hover: text-[#87E64B] */}
    {/* Description: text-muted-foreground text-sm */}
  </motion.div>
))}
```

Connectors between steps: dashed neon green SVG curves (desktop) or vertical dashed line (mobile).

### 6.7 CTA Section

```tsx
<section className="py-24 px-4 md:px-6 bg-white">
  <div className="container relative overflow-hidden bg-black rounded-[3rem] px-6 py-24 md:px-12 md:py-32 text-center text-white">

    {/* Radial glow: bg-[radial-gradient(circle_at_center,rgba(135,230,75,0.15)_0%,transparent_50%)] */}

    {/* Floating Pills (desktop only, positioned absolute):
        - Pain-point pills: bg-white/10 border border-white/5 text-white/60
        - Brand pills: bg-[#87E64B] text-black font-semibold
        - Animate: y: [-10, 10, -10] infinite, 5s ease */}

    <motion.div variants={staggerContainerSlow} initial="hidden" whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="relative z-10 flex flex-col items-center gap-8 max-w-2xl mx-auto">
      <motion.h2 variants={fadeUpBlur}
        className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
        {title}
      </motion.h2>
      <motion.p variants={fadeUpBlur}
        className="text-lg md:text-xl text-white/60 leading-relaxed">
        {text}
      </motion.p>

      {/* CTA Button: bg-white text-black rounded-full, arrow in #87E64B circle */}
      <Button className="bg-white text-black hover:bg-white/90 text-lg px-2 pl-8 h-12 md:h-14 rounded-full">
        <span>{ctaText}</span>
        <div className="h-10 w-10 bg-[#87E64B] rounded-full flex items-center justify-center group-hover:scale-105 group-hover:rotate-[-45deg] transition-transform">
          <ArrowRight className="h-5 w-5 text-black" />
        </div>
      </Button>
    </motion.div>
  </div>
</section>
```

---

## 7. Spacing Rules

| Context | Class |
|---|---|
| Section vertical padding | `py-16 md:py-32` |
| Section heading → content gap | `mb-16` |
| Card internal padding | `p-8` or `p-6 md:p-10` |
| Grid gap | `gap-8 lg:gap-12` |
| Max content width | `max-w-3xl mx-auto` (text) / `max-w-7xl mx-auto` (wide grids) |

---

## 8. Button Styles

```tsx
{/* PRIMARY: ShimmerButton (dark, shimmer effect) */}
<ShimmerButton size="lg" className="h-12 px-8 text-base">Book a call</ShimmerButton>

{/* SECONDARY: outline pill */}
<Button size="lg" variant="outline"
  className="h-12 px-8 text-base rounded-full border-2 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 hover:text-black transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
  See services
</Button>

{/* BRAND: neon green */}
<Button className="bg-[#87E64B] text-black hover:bg-[#76d63b] font-bold rounded-full">
  Get Started
</Button>
```

---

## 9. Smooth Scroll Setup

Wrap the layout with Lenis smooth scroll:

```tsx
// components/ui/smooth-scroll.tsx
"use client"
import Lenis from "lenis"
import { useEffect } from "react"

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis()
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])
  return <>{children}</>
}
```

---

## 10. Critical Gotchas

1. **`transition-all` breaks Framer Motion** — Any card or element that uses `fadeUpBlur` entrance animation must use `transition-colors` not `transition-all`. Using `transition-all` causes the browser to re-transition the `filter` and `transform` values Framer Motion already owns, creating visual glitches.

2. **Caveat font eyebrow** — The eyebrow text requires `font-[family-name:var(--font-caveat)]` — the standard Tailwind font shorthand does NOT work here because it's a CSS variable name, not a utility class name.

3. **Neon green borders on hover, not on default** — Service cards use `border-zinc-200` default and only show `border-[#87E64B]/50` on hover. Don't apply brand color borders as default — it looks cluttered.

4. **Card border-radius is `rounded-[2rem]` or `rounded-[2.5rem]`** — Not the standard `rounded-xl`. This large radius is central to the premium "organic" feel.

5. **Stagger containers don't need `initial` opacity** — The `staggerContainerSlow` variant uses `hidden: {}` (empty) deliberately. Only children animate. Adding `opacity: 0` to the container breaks the stagger timing.

6. **Active nav uses `layoutId="activeNav"`** — Only one `layoutId` value is shared across ALL nav items' underline indicator. React will animate it as a single element sliding between positions.

7. **Hero height is `h-[100dvh]`** — Use `dvh` (dynamic viewport height) not `vh` to prevent the mobile browser chrome from cutting off content.

8. **Section backgrounds alternate**: white → `bg-muted/30` (with grid pattern) → white → `bg-zinc-50` → white. Avoid two identical backgrounds in a row.

---

## 11. Adapting for a New Client

When generating a new website for a different client/industry:

1. **Keep all layout, spacing, animation, and component structure identical.**
2. **Change only:**
   - Brand name, logo path, nav links
   - Copy (headlines, descriptions, CTAs)
   - Services/features list content
   - Problem/solution list items
   - Process step descriptions
   - FAQ items
   - CTA floating pill text (to match client pain points)
3. **Optionally swap `#87E64B`** for the client's primary accent color by updating `--primary: oklch(...)` in `globals.css`. Keep all other tokens the same.
4. **Do NOT** invent new section types, new card shapes, or new animation patterns. Extend from existing section templates only.

---

## 12. File Structure Reference

```
src/
  app/
    globals.css          ← Design tokens (OKLCH variables)
    layout.tsx           ← Font setup + SmoothScroll wrapper
    page.tsx             ← Homepage: Hero + ServiceSection + ProblemSolution + ProcessSteps + FAQ + Blog + CTA
  components/
    blocks/
      PageHero.tsx        ← Reusable hero (home + page variants)
      SectionHeading.tsx  ← Eyebrow + H2 + subtitle pattern
      CTASection.tsx      ← Dark rounded CTA with floating pills
      FAQAccordion.tsx    ← Accordion for FAQ items
    sections/
      ServiceSection.tsx  ← Services grid with grid-pattern background
      ProblemSolution.tsx ← 2-column red/green split
      ProcessSteps.tsx    ← 4 tilted step cards with SVG connectors
      FAQSection.tsx      ← FAQ with SectionHeading wrapper
    cards/
      ServiceCard.tsx     ← Individual service card
    layout/
      Header.tsx          ← Floating pill nav, auto-hide on scroll
      Footer.tsx          ← Standard footer
    ui/
      shimmer-button.tsx  ← Primary CTA button
      smooth-scroll.tsx   ← Lenis wrapper
      spectra-noise.tsx   ← Hero background texture
  lib/
    motion.ts             ← All animation variants (source of truth)
    site.ts               ← Site config (name, nav, links)
```
