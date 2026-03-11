# Architecture Research: Visual Redesign Integration

**Domain:** Visual redesign of existing Next.js 16 + Tailwind v4 marketing site
**Researched:** 2026-03-10
**Confidence:** HIGH (based on direct codebase audit + confirmed architecture patterns)

---

## Context: What Already Exists

This is a **subsequent milestone** research document. The site is fully built and working. The question is not "how to build" but "how to integrate visual redesign features without breaking what exists."

**Existing architecture facts (confirmed by codebase audit):**

- Next.js 16.1.6 with App Router, React 19.2.4
- Tailwind v4 with CSS-variables-based `@theme {}` in `app/globals.css` (no `tailwind.config.ts`)
- All marketing pages use `export const dynamic = 'force-static'`
- Route group `app/(marketing)/` with shared layout: `Header` + `Footer` + `EmergencyBadge`
- Server Components by default; only `MobileNav`, `EmergencyBadge`, `ContactForm`, `CalendlyEmbed` are `'use client'`
- Brand tokens defined in `globals.css @theme {}`: `--color-brand-red`, `--color-brand-dark`, `--color-brand-gray`, `--font-sans`
- One custom `@keyframes emergency-pulse` defined in `globals.css`
- No animation library installed (no Framer Motion, GSAP, or similar)
- SVG illustrations are inline JSX in page files (not separate components)

---

## System Overview

### Current Component Map

```
app/layout.tsx (Server — Root)
├── Inter font via next/font/google → --font-inter CSS var
├── globals.css → @theme {} brand tokens + emergency-pulse keyframe
└── app/(marketing)/layout.tsx (Server — Marketing Shell)
    ├── Header (Server)
    │   └── MobileNav (Client — useState for menu open/close)
    ├── {page content}
    ├── Footer (Server)
    └── EmergencyBadge (Client — fixed position, no state)

Page-level components (all Server, force-static):
├── app/(marketing)/page.tsx
│   ├── SuccessMetrics (Server — variant prop for dark/light)
│   ├── ClientLogos (Server)
│   ├── Testimonials (Server — limit prop)
│   ├── Certifications (Server)
│   └── CalendlyEmbed (Client — dynamic import, ssr:false)
├── app/(marketing)/about/page.tsx (inline SVG illustration)
├── app/(marketing)/services/page.tsx (inline SVG icons + illustrations per service)
├── app/(marketing)/services/[slug]/page.tsx
├── app/(marketing)/case-studies/page.tsx
├── app/(marketing)/case-studies/[slug]/page.tsx
├── app/(marketing)/blog/page.tsx + [slug]/page.tsx
└── app/(marketing)/contact/page.tsx
    └── ContactForm (Client — useActionState)
```

### Visual Layer Today

```
globals.css
├── @import "tailwindcss"
├── @theme { brand colors, spacing-section, font-sans }
└── @keyframes emergency-pulse

Every component:
  Uses Tailwind utility classes directly (bg-brand-dark, text-brand-red, etc.)
  No shared design tokens beyond the 4 brand colors
  Typography: Inter only, no size scale beyond Tailwind defaults
  Animation: Tailwind's animate-spin (CalendlyEmbed loading), custom emergency-pulse
```

---

## Integration Architecture for Visual Redesign

The visual redesign adds five systems on top of the existing architecture. Each has a specific integration point.

### System 1: Typography System

**Integration point:** `app/globals.css` and `app/layout.tsx`

**What changes:**
- Add second font (likely a display font for headings) via `next/font/google` in `layout.tsx`
- Add the new font CSS variable to `@theme {}` in `globals.css`
- Add a type scale if Tailwind defaults are overridden

**New CSS variable pattern (Tailwind v4):**
```css
/* globals.css */
@theme {
  /* existing */
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;

  /* new display font for headings */
  --font-display: var(--font-cal-sans), var(--font-inter), ui-sans-serif, sans-serif;
}
```

**`layout.tsx` change:**
```tsx
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const calSans = CalSans({ variable: '--font-cal-sans' }) // or Geist, DM Sans, etc.

// Apply both variables to <html>
<html lang="en" className={`${inter.variable} ${calSans.variable}`}>
```

**What this unlocks:** All heading elements across all pages can then use `font-display` via Tailwind utility `font-display`. No page-level changes needed — the font is available site-wide.

**Existing components affected (modification, not new):**
- All pages: headings currently use `font-bold` with Inter — add `font-display` class to `h1`, `h2`, `h3` elements
- The existing `h1`/`h2`/`h3` patterns are inlined in page files, not in shared components, so changes are per-page

**Confidence:** HIGH — This is the standard next/font pattern used in the existing codebase.

---

### System 2: Color System Refinement

**Integration point:** `app/globals.css @theme {}`

**What changes:**
- Add new color tokens (extended palette, potentially dark mode surface colors)
- Potentially update existing brand token values
- Add semantic color aliases if needed

**Pattern (Tailwind v4 — confirmed from existing `globals.css`):**
```css
@theme {
  /* existing tokens — may update hex values */
  --color-brand-red: #dc2626;        /* may refine to #e63946 or similar */
  --color-brand-red-dark: #b91c1c;
  --color-brand-dark: #1f2937;       /* may refine to near-black */
  --color-brand-gray: #6b7280;

  /* new tokens for premium palette */
  --color-surface-primary: #ffffff;
  --color-surface-secondary: #f8fafc;
  --color-surface-dark: #0f172a;     /* deeper dark for hero sections */
  --color-accent-red: #dc2626;
  --color-text-muted: #94a3b8;
}
```

**Impact scope:**
- Updating token values in `@theme {}` propagates automatically to every `text-brand-red`, `bg-brand-dark` usage across all components — no component changes needed for value updates
- Adding new tokens requires adding new Tailwind classes to components
- Existing `gray-50`, `gray-100`, `gray-200` usage in pages is NOT using brand tokens — would need replacement if surface colors change

**Risk:** The existing codebase uses Tailwind gray utilities (`bg-gray-50`, `bg-gray-100`, `border-gray-200`) in 15+ locations across page files. These are not brand tokens — they are hardcoded Tailwind defaults. A color system refinement that changes surfaces needs to touch individual page files, not just `globals.css`.

---

### System 3: Animation System

**Integration point:** New — requires decision on approach.

**The core constraint:** All marketing pages are `force-static`. Animation cannot depend on data from server at render time. But client-side animations triggered by browser events (scroll, hover, mount) work fine because they run after hydration.

**Three approaches for this stack:**

**Approach A: CSS-only via Tailwind v4 (recommended for most animations)**

Tailwind v4 exposes animation via `@theme {}` and standard `@keyframes`. No new dependency.

```css
/* globals.css */
@keyframes fade-up {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes slide-in-right {
  from { opacity: 0; transform: translateX(20px); }
  to   { opacity: 1; transform: translateX(0); }
}

@theme {
  --animate-fade-up: fade-up 0.6s ease-out;
  --animate-slide-in: slide-in-right 0.5s ease-out;
}
```

Usage in Server Components: `<div className="animate-fade-up">` — works without 'use client'.

**Approach B: Intersection Observer via shared Client Component (for scroll-triggered)**

For scroll-triggered animations, a thin wrapper Client Component is needed:

```tsx
// app/components/AnimateOnScroll.tsx
'use client'
import { useEffect, useRef, useState } from 'react'

export function AnimateOnScroll({ children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={visible ? className : 'opacity-0'}>
      {children}
    </div>
  )
}
```

Server Components import this and wrap sections — the wrapper is Client but children remain Server. This is a standard Next.js pattern.

**Approach C: Framer Motion (for complex sequences, page transitions)**

If the design calls for complex multi-step animations, staggered lists, or page transitions, Framer Motion is the standard library. It requires `'use client'` on components that use it.

**Key Framer Motion + App Router constraint:** `motion.div` and all Framer components require Client Components. The Server Component tree can still pass data down to a thin `'use client'` wrapper. This is identical to the existing `CalendlyEmbed` pattern — dynamic import with SSR disabled.

**Recommendation:** Start with Approach A (CSS) for entrance animations and hover effects. Add Approach B (IntersectionObserver) for scroll-triggered reveals. Add Framer Motion only if the design spec explicitly requires sequenced animations or page transitions that CSS cannot deliver.

**New component needed:** `AnimateOnScroll` wrapper (Client Component, ~30 lines) if scroll animations are required. This is the only new shared component the animation system needs.

---

### System 4: Layout Changes

**Integration point:** Individual page files + `app/(marketing)/layout.tsx`

**Layout-level changes (layout.tsx):**
- Header redesign: Currently `bg-white border-b sticky top-0` — may become transparent/blur on scroll (requires `'use client'` addition to Header, or a wrapper)
- Header scroll behavior is the only layout shell change that requires architecture decision

**Page-level layout changes:**
- All section padding, grid patterns, and container widths are inlined per page
- No shared "section" component exists — the `--spacing-section: 5rem` token exists but each page uses its own `py-16 sm:py-20` pattern
- Layout changes require touching each page file individually

**Container pattern audit:**
- Home, About, Services use `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` — consistent
- `max-w-4xl` used for Calendly section, `max-w-3xl` for CTA sections
- `container mx-auto` used in Header and Footer (inherits Tailwind's default container breakpoints)

**Opportunity:** Extract a `<Section>` and `<Container>` component to centralize layout control. This is not required but makes systematic layout changes easier. If extracted, it's a new shared Server Component.

---

### System 5: Micro-Interactions

**Integration point:** Existing components + CSS `@theme` additions

**Already present in codebase:**
- `hover:shadow-md transition-shadow` on service cards, testimonial cards
- `hover:text-brand-red transition-colors` on nav links
- `group-hover:translate-x-1 transition-transform` on arrow icon in service links
- `grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all` on client logos
- `animate-spin` on Calendly loading spinner
- `animate-[emergency-pulse_2s_ease-in-out_infinite]` on EmergencyBadge pulse dot

**Pattern: Tailwind v4 arbitrary animation syntax** is already used (`animate-[emergency-pulse_2s...]`). This pattern works for custom keyframes defined in `globals.css`.

**What micro-interactions need:**
- More refined hover states on buttons (scale, shadow, color transitions) — CSS only
- Card hover lifts with border glow — CSS only
- Button press states — CSS `active:` modifier, no JS needed
- Focus-visible rings for accessibility — CSS, already supported by Tailwind

**No new architecture needed** for micro-interactions. They extend what's already working.

---

## New Components Needed

| Component | Type | Purpose | Location |
|-----------|------|---------|----------|
| `AnimateOnScroll` | Client Component | Intersection Observer wrapper for scroll-triggered CSS animations | `app/components/AnimateOnScroll.tsx` |
| `Section` | Server Component | Centralized section padding/spacing (optional, reduces duplication) | `app/components/Section.tsx` |
| `Container` | Server Component | Centralized max-width + horizontal padding (optional) | `app/components/Container.tsx` |

These are the only new shared components the visual redesign needs. If the design opts for purely CSS animations (no scroll triggers), even `AnimateOnScroll` is unnecessary.

If Framer Motion is adopted: each section that animates becomes a thin Client wrapper component. These are page-specific, not shared infrastructure.

---

## Existing Components — Modification Map

### Must Modify (Direct Visual Impact)

| Component | File | What Changes | Architecture Risk |
|-----------|------|-------------|------------------|
| Header | `app/components/Header.tsx` | Typography, colors, possibly scroll behavior | If scroll behavior added: needs `'use client'` or scroll-listening wrapper |
| Footer | `app/components/Footer.tsx` | Typography, colors, layout refinement | Server Component, low risk |
| EmergencyBadge | `app/components/EmergencyBadge.tsx` | Visual polish, possibly animation refinement | Already Client Component |
| MobileNav | `app/components/MobileNav.tsx` | Panel animation, transition refinement | Already Client Component |
| Homepage hero | `app/(marketing)/page.tsx` | Full visual overhaul, animation, typography | Page file, force-static preserved |
| About hero + sections | `app/(marketing)/about/page.tsx` | Typography, spacing, layout, illustration upgrade | Page file |
| Services page | `app/(marketing)/services/page.tsx` | Illustration treatment, card design | Inline SVGs may move to components |
| SuccessMetrics | `app/components/SuccessMetrics.tsx` | Counter animation (needs Client if animated) | Currently Server Component |
| Testimonials | `app/components/Testimonials.tsx` | Card design, typography | Server Component, low risk |
| ClientLogos | `app/components/ClientLogos.tsx` | Possibly marquee animation (needs Client if animated scroll) | Currently Server Component |

### Header Scroll Behavior — Architecture Decision Required

If the design calls for a transparent header that becomes opaque/blurred on scroll (common in premium sites like Linear, Vercel):

**Option A: Keep Server Component, use CSS scroll-timeline (no JS)**
```css
/* globals.css */
@keyframes header-scroll {
  from { background: transparent; }
  to   { background: rgba(255,255,255,0.9); backdrop-filter: blur(12px); }
}

header {
  animation: header-scroll linear both;
  animation-timeline: scroll(root);
  animation-range: 0px 80px;
}
```
CSS Scroll-Driven Animations are supported in Chrome 115+, Firefox 110+, Safari 18+. Coverage is sufficient for target audience (CTOs at tech companies). No JS needed.

**Option B: Convert Header to Client Component**
Add `'use client'`, use `useScrollPosition` hook, conditionally apply classes. Simple but adds JavaScript.

**Recommendation:** Option A (CSS scroll-timeline) if cross-browser coverage is acceptable. Option B if Safari 17 and below must be supported.

### SuccessMetrics — Counter Animation Decision

If animated number counting is part of the redesign (common in agency/consulting sites):
- `SuccessMetrics` must become a Client Component
- Intersection Observer triggers count-up animation on scroll
- Values in `app/data/trust.ts` remain as-is

If no counter animation: stays Server Component, only visual changes needed.

### ClientLogos — Marquee Decision

If the design adds a horizontal scrolling marquee for client logos (common in modern sites):
- `ClientLogos` must become a Client Component, OR
- Use CSS animation marquee (pure CSS, stays Server Component):
```css
@keyframes marquee {
  to { transform: translateX(-50%); }
}
```
CSS marquee keeps the component as a Server Component — recommended.

---

## Data Flow — What Does Not Change

The visual redesign does not touch:
- `app/data/` files (content unchanged)
- `app/actions/contact.ts` (form handling unchanged)
- `app/lib/structured-data.tsx` (SEO unchanged)
- `app/lib/schemas.ts` (validation unchanged)
- `force-static` exports on all pages (static generation preserved)
- `app/sitemap.ts`, `app/robots.ts` (SEO infrastructure unchanged)

The visual layer sits entirely above the data and business logic layers.

---

## Architecture Patterns for This Redesign

### Pattern 1: CSS-First Animation

**What:** Define all animations in `globals.css @keyframes` and `@theme`. Use Tailwind utility classes to apply them. Server Components can use animations without becoming Client Components.

**When:** Entrance animations, hover effects, micro-interactions, marquee scrolls.

**Trade-off:** Cannot trigger animations based on JavaScript events (scroll position, click sequences). For scroll-triggered reveals, needs either CSS scroll-timeline (modern browsers) or `AnimateOnScroll` wrapper (universal support).

### Pattern 2: Thin Client Wrapper

**What:** Keep Server Components for content and data. Wrap only the animation trigger in a Client Component that children pass through as `{children}`.

**When:** Scroll-triggered section reveals, counter animations on SuccessMetrics, any interaction that needs `useEffect` or `useRef`.

**Example:**
```tsx
// Server Component page
<AnimateOnScroll className="animate-fade-up">
  <SuccessMetrics variant="dark" />  {/* stays Server Component */}
</AnimateOnScroll>
```

**Trade-off:** One extra DOM wrapper per animated section. Negligible performance impact.

### Pattern 3: CSS Variable Token Extension

**What:** Add new tokens to `globals.css @theme {}`. Tailwind v4 generates utility classes for all CSS variables in `@theme`. No config file changes needed.

**When:** Any new color, spacing, font, or animation token.

**Example:**
```css
@theme {
  --color-surface-hero: #0a0a0b;     /* generates bg-surface-hero */
  --font-display: var(--font-cal-sans), sans-serif;  /* generates font-display */
  --animate-reveal: fade-up 0.6s ease-out;           /* generates animate-reveal */
}
```

**Trade-off:** All tokens are global. Naming collisions with Tailwind built-in tokens are possible — use `surface-`, `brand-`, `animate-` prefixes.

---

## Anti-Patterns for This Redesign

### Anti-Pattern 1: Converting Server Components to Client for Styling

**What:** Adding `'use client'` to components just to use `useState` for hover effects or CSS class toggles.

**Why wrong:** CSS handles hover and focus states natively. Converting breaks static rendering optimizations and increases JavaScript bundle.

**Instead:** Use Tailwind `hover:`, `focus:`, `group-hover:`, `active:` modifiers. Only add `'use client'` when browser APIs (scroll position, IntersectionObserver, timers) are genuinely needed.

### Anti-Pattern 2: Inline Style Animations

**What:** Using `style={{ animation: '...' }}` props for dynamic animations rather than CSS classes.

**Why wrong:** Not purgeable by Tailwind, not composable, harder to maintain. Bypasses the established token system.

**Instead:** Define `@keyframes` and `@theme` tokens in `globals.css`. Apply via Tailwind class or `className`.

### Anti-Pattern 3: Per-Page Font Loading

**What:** Loading the display font separately in each page file.

**Why wrong:** Results in duplicate font requests, FOUT on navigation between pages.

**Instead:** Load all fonts in `app/layout.tsx` (root layout), apply variables to `<html>` element. Available everywhere without re-loading.

### Anti-Pattern 4: Removing force-static

**What:** Dropping `export const dynamic = 'force-static'` to enable dynamic features during redesign.

**Why wrong:** The static generation is what gives the site its performance profile. No visual redesign feature requires dynamic rendering.

**Instead:** All visual redesign features (animations, typography, layout, color) are static HTML+CSS with optional client-side JavaScript enhancement.

### Anti-Pattern 5: Bloating globals.css

**What:** Adding hundreds of lines of custom CSS to `globals.css` as the redesign progresses.

**Why wrong:** Tailwind v4 is designed to handle design tokens via `@theme` and utility composition. Custom CSS beyond `@keyframes` and `@theme` tokens fights the framework.

**Instead:** Use `@theme` for tokens. Use `@utility` for reusable utility patterns if Tailwind's built-in utilities don't cover a case. Keep component-specific styles in the component via Tailwind classes.

---

## Build Order for Visual Redesign

The order is dictated by dependency and risk. Foundation systems must be stable before components are redesigned.

```
Step 1: Design Token Foundation
  globals.css @theme {} — colors, fonts, animation keyframes
  app/layout.tsx — add display font loading
  ↓ (all subsequent work depends on tokens being stable)

Step 2: Typography Pass (pages, lowest risk, no JS)
  h1/h2/h3 elements in all pages get font-display class
  Body text spacing and size refinements
  ↓

Step 3: Global Shell (Header, Footer, EmergencyBadge)
  Highest visibility, affects every page
  Header scroll behavior decision made here
  ↓

Step 4: Homepage (most complex, most impact)
  Hero section full redesign
  Animations on hero content
  Section-by-section visual upgrade
  ↓

Step 5: Interior Pages
  Services page, About page
  Case studies listing/detail
  Blog listing/detail
  ↓ (parallel work possible across pages)

Step 6: Shared Component Polish
  SuccessMetrics — counter animation if required
  Testimonials — card design
  ClientLogos — marquee if required
  Certifications — layout refinement
  ↓

Step 7: Micro-Interaction Pass
  Button hover states
  Card hover lifts
  Link transitions
  Focus states audit
```

**Parallelization opportunity:** Steps 4 and 5 can run in parallel once Step 3 (shell) is complete. Individual interior pages are independent.

---

## Integration Points Summary

| Feature | Integration Point | New/Modified | Architecture Change? |
|---------|------------------|--------------|---------------------|
| Typography system | `globals.css @theme`, `layout.tsx` | Modified | No — adds font variable |
| Color system | `globals.css @theme` | Modified | No — adds/updates tokens |
| CSS animations | `globals.css @keyframes + @theme` | Modified | No |
| Scroll animations | New `AnimateOnScroll` component | New Client Component | Minimal — thin wrapper |
| Framer Motion | Per-component 'use client' wrappers | New Client Components | Only if adopted |
| Header scroll behavior | `Header.tsx` + CSS or Client | Modified | If JS scroll: adds 'use client' |
| Layout components | Optional `Section`, `Container` | New Server Components | Optional refactor |
| Counter animation | `SuccessMetrics.tsx` → Client | Modified | Converts Server → Client |
| CSS marquee (logos) | `ClientLogos.tsx` | Modified | No — stays Server |
| Micro-interactions | All components, CSS only | Modified | No |

---

## Sources

- Direct codebase audit of all files in `app/` (HIGH confidence — actual code)
- Tailwind v4 `@theme` documentation pattern (confirmed from existing `globals.css` usage)
- Next.js 16 App Router Server/Client Component boundary rules (HIGH confidence — established pattern)
- CSS Scroll-Driven Animations MDN compatibility data (MEDIUM confidence — browser support evolves)
- next/font/google multi-font pattern (HIGH confidence — standard pattern, matches existing codebase usage)

---

*Architecture research for: Red Leader v2.0 Visual Redesign*
*Researched: 2026-03-10*
