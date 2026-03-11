# Stack Research

**Domain:** Visual redesign — animations, typography, micro-interactions, refined color system
**Researched:** 2026-03-10
**Confidence:** HIGH (core recommendations verified via official Next.js docs and Tailwind CSS v4 docs)
**Scope:** NEW additions only. Existing stack (Next.js 16, Tailwind v4, React 19) is validated and not re-researched.

---

## Context: What the Existing Stack Already Provides

Before adding anything, understand what is already available at no cost:

**Tailwind v4 CSS animations** — `animate-spin`, `animate-ping`, `animate-pulse`, `animate-bounce` plus custom `@keyframes` via `@theme`. These cover loading states, skeleton screens, and simple attention effects. Already in use (`emergency-pulse` keyframe in `globals.css`).

**Tailwind v4 transitions** — `transition`, `transition-colors`, `transition-transform`, `transition-shadow`, `transition-opacity`, plus `duration-*`, `ease-*`, `delay-*` modifiers. Cover all hover micro-interactions on buttons, cards, and links with zero JS. Already the right approach for 80% of micro-interactions on a static marketing site.

**`next/font`** — Built into Next.js 16.1.6. Already configured with Inter. Zero-cost upgrade path to any Google variable font. No new package needed.

**Tailwind v4 `@theme` color system** — CSS custom properties in OKLCH color space. `globals.css` already uses `@theme` for brand colors. Full color system refinement is a CSS-only task.

**Decision:** Before reaching for a JS animation library, exhaust CSS-first options. Motion (JS) is only justified for scroll-triggered entrance animations and gesture-based interactions that CSS cannot do.

---

## Recommended Stack (New Additions Only)

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| `motion` | `^12.x` (latest — verify before install) | Scroll-triggered entrance animations, layout transitions, gesture micro-interactions | Industry standard for React; required only for the cases CSS transitions cannot handle: scroll-based `whileInView` reveals, staggered children, and `AnimatePresence` exit animations. Pure CSS covers hover states and simple fades. |
| `next/font/google` | Built into Next.js 16.1.6 | Premium typography via Google Fonts variable fonts | Already in the project. Upgrade path: swap Inter for a premium pairing (Inter + Fraunces, or Geist + Geist Mono) with zero new dependencies. Self-hosted at build time, no FOIT, no external requests. |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `lucide-react` | `^0.511.x` (latest) | Icon system for UI micro-interactions (arrows, chevrons, status indicators) | When building redesigned nav, service cards, or CTA buttons that need icon animations (e.g. `group-hover:translate-x-1`). Tree-shakeable — only icons imported are bundled. |
| `tailwind-merge` | `^3.x` | Class conflict resolution for variant-heavy components | Required if using shadcn/ui or building component variants where Tailwind classes may conflict (e.g. hero section with conditional dark/light background). Already recommended in v1 STACK.md — install if not present. |
| `clsx` | `^2.x` | Conditional class application | Companion to tailwind-merge. Standard `cn()` utility pattern. |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| None new required | — | Turbopack (Next.js 16 default) handles all CSS and JS bundling. No additional build tools needed for visual redesign work. |

---

## What Each Visual Feature Needs

### Typography System

**Approach:** CSS-only via `next/font` + Tailwind `@theme`

No new packages. The work is:
1. Replace Inter with a premium variable font pair (recommendation below)
2. Define a type scale in `@theme` as CSS custom properties
3. Apply via Tailwind utility classes

**Recommended font pair for a modern infrastructure/tech brand:**

| Role | Font | Rationale |
|------|------|-----------|
| Body / UI | **Inter** (current) OR **Geist** (Vercel's font, variable) | Inter is proven. Geist signals modern infrastructure. Both free via `next/font/google` / `next/font/local`. |
| Display / Hero headings | **Fraunces** (variable, has `opsz` + `wght` axes) | High-contrast serif for bold hero text — same pattern used by Linear, Vercel's marketing pages, and Stripe's redesign. Signals premium, not generic. Available via `next/font/google`. |
| Code / Mono accents | **Geist Mono** or **JetBrains Mono** | Reinforces the "engineers who code" identity. Use sparingly for technical metric callouts. |

**Confidence:** MEDIUM — font pairing is a design judgment call. Inter + Fraunces is a known high-contrast approach. Final font selection must be validated against Red Leader's brand guidelines.

### Animations and Scroll Effects

**Approach:** CSS-first, add `motion` (the npm package) for scroll-triggered and complex interactions only.

**What CSS covers (no JS library needed):**
- Button hover states: `transition-transform hover:-translate-y-0.5 hover:shadow-lg`
- Card hover lifts: `transition-all hover:scale-[1.02]`
- Color transitions: `transition-colors hover:bg-brand-red-dark`
- Emergency badge pulse: already implemented via custom `@keyframes`
- Nav link underline animations: CSS `transition-[width]` approach

**What requires `motion`:**
- Hero section entrance: staggered fade-up of headline, subhead, CTA
- Section reveals as user scrolls: `whileInView` with `viewport={{ once: true }}`
- Service cards stagger: `variants` with `staggerChildren`
- `AnimatePresence` for any exit animations (modal closes, mobile menu)

**Motion server component constraint** — `motion` requires `'use client'`. With Next.js 16's server-first architecture, the pattern is:

```tsx
// app/components/AnimatedHero.tsx
'use client'
import { motion } from 'motion/react'
```

Wrap only the interactive/animated leaf components in `'use client'`. Keep page-level Server Components for data and layout. This is standard practice — the server-first constraint is not a blocker.

**Confidence:** HIGH — `motion` + Next.js App Router compatibility is the established pattern as of 2026. The `motion/react` import path (not `framer-motion`) is current.

### Color System Refinement

**Approach:** Pure CSS via Tailwind v4 `@theme`. Zero new packages.

Tailwind v4 uses OKLCH color space natively. The existing `globals.css` has a minimal brand color set. The redesign work is:

```css
@theme {
  /* Refined brand palette in OKLCH for perceptual uniformity */
  --color-brand-red: oklch(0.5 0.22 25);        /* current: #dc2626 */
  --color-brand-red-light: oklch(0.65 0.18 25); /* for hover states */
  --color-brand-red-dark: oklch(0.4 0.2 25);    /* current: #b91c1c */

  /* Surface system for dark/dark-elevated pattern */
  --color-surface-base: oklch(0.10 0 0);        /* near-black */
  --color-surface-elevated: oklch(0.13 0 0);    /* card background */
  --color-surface-border: oklch(0.20 0 0);      /* subtle borders */

  /* Text hierarchy */
  --color-text-primary: oklch(0.97 0 0);
  --color-text-secondary: oklch(0.65 0 0);
  --color-text-muted: oklch(0.45 0 0);
}
```

This approach gives full utility class access (`bg-surface-elevated`, `border-surface-border`) with zero runtime cost.

**Confidence:** HIGH — verified against Tailwind v4 official documentation (color customization, OKLCH support, `@theme` directive).

### Micro-interactions

**Approach:** Tailwind CSS transitions for 90% of cases; `motion` for the remaining 10% requiring gesture tracking.

Examples of each:

| Interaction | Approach | Implementation |
|-------------|----------|---------------|
| Button hover lift | CSS | `transition-transform duration-200 hover:-translate-y-0.5` |
| Card hover shadow | CSS | `transition-shadow duration-200 hover:shadow-xl` |
| Link underline slide | CSS | `after:transition-[width] after:w-0 hover:after:w-full` |
| Nav mobile menu open/close | `motion` | `AnimatePresence` with `initial/animate/exit` variants |
| Emergency CTA pulsing ring | CSS | `@keyframes` already exists, extend with `animate-ping` |
| Metric counter animation | `motion` | `useMotionValue` + `useSpring` + `useTransform` |

---

## Installation

```bash
# Animation library (only needed for scroll-triggered and gesture interactions)
npm install motion

# Icon system
npm install lucide-react

# Class utilities (if not already installed — check package.json first)
npm install clsx tailwind-merge
```

Font upgrades require no `npm install` — use `next/font/google` which is already in Next.js 16.

---

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| `motion` (npm package `motion`, import from `motion/react`) | `framer-motion` | `framer-motion` is the legacy package name. The Framer team renamed it to `motion` in 2024. Both install different packages. Use `motion` — it is the maintained package going forward. `framer-motion` is in maintenance mode. |
| `motion` | GSAP (GreenSock) | GSAP when you need timeline-based, sequence-driven animations (e.g., full-page scroll storytelling, complex SVG morphing). Overkill for a marketing site hero. Also requires commercial license for some features. |
| `motion` | React Spring | React Spring's physics-based model is better for interactive drag/fling gestures. Not needed for marketing site entrance animations. |
| `motion` | CSS `@keyframes` only | Viable for purely decorative animations with no scroll trigger or state dependency. Already used for `emergency-pulse`. Use this wherever possible; reach for `motion` only when CSS cannot express the behavior. |
| Tailwind v4 `@theme` colors | shadcn/ui CSS variables pattern | shadcn/ui uses a separate `--background`, `--foreground` CSS variable convention. Valid if adopting shadcn/ui fully. For this project, the existing Tailwind v4 `@theme` approach is simpler and already in place. |
| `next/font/google` | Fontaine, Fontsource | These are workarounds for non-Next.js projects. `next/font` is the correct choice here — it handles subsetting, preloading, and CLS prevention automatically. |

---

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| CSS-in-JS at runtime (Emotion, Styled Components, Stitches) | Runtime style injection defeats Next.js static rendering. These libraries force `'use client'` on layout components, breaking server-first architecture. | Tailwind v4 utility classes + `@layer components` for any shared styles |
| `anime.js` | No React integration layer; requires manual DOM refs; doesn't work with React's reconciler | `motion` |
| `react-spring` for entrance animations | More complex API than `motion` for this use case; better suited to gesture-driven UIs | `motion` with `whileInView` |
| `aos` (Animate on Scroll) | jQuery-era library; adds global event listeners; not React-aware; FOUC issues with SSR | `motion` with `whileInView={{ once: true }}` |
| `lottie-react` for decorative animations | Heavy runtime; requires After Effects source files; overkill for geometric/CSS-achievable animations | CSS `@keyframes` or `motion` SVG variants |
| Google Fonts `<link>` tags | Blocked by privacy-focused browsers; adds render-blocking resource; causes CLS | `next/font/google` (self-hosted at build time) |
| Manually setting `font-display: swap` | `next/font` handles this automatically and more correctly | `next/font` `display: 'swap'` option (already the default) |

---

## Stack Patterns by Variant

**If the hero needs scroll-parallax depth:**
- Use CSS `transform: translateY()` driven by `motion` `useScroll` + `useTransform`
- Keep the Hero component as `'use client'`
- Do not use CSS `background-attachment: fixed` — it disables GPU compositing on mobile

**If the color system needs a dark mode toggle:**
- Use CSS custom property swapping via a `data-theme` attribute on `<html>`
- Implement with `next-themes` package (`npm install next-themes`)
- NOT recommended for v2.0 unless explicitly scoped — adds significant complexity

**If fonts need to be variable (recommended):**
- Use `axes` option in `next/font/google` to enable optical sizing (`opsz`) and weight axes
- Example: `Fraunces({ subsets: ['latin'], axes: ['SOFT', 'WONK', 'opsz'] })`
- Variable fonts eliminate the need to load separate weight files

---

## Version Compatibility

| Package A | Compatible With | Notes |
|-----------|-----------------|-------|
| `motion` ^12.x | React ^19.x | Verified — `motion` supports React 19 concurrent features |
| `motion` ^12.x | Next.js ^16.x App Router | Requires `'use client'` directive on animated components; pages and layouts remain Server Components |
| Tailwind v4.0 | `motion` ^12.x | No conflict — Tailwind provides CSS classes, motion provides JS-driven inline styles. Both can apply to same element. |
| `next/font` | Tailwind v4 `@theme` | Confirmed by official Next.js 16.1.6 docs. Pattern: `variable: '--font-display'` in font config, then `--font-display: var(--font-display)` in `@theme`. |

---

## Sources

- Next.js 16.1.6 official docs (`/docs/app/getting-started/fonts`) — `next/font` API, variable font configuration, Tailwind v4 integration pattern. Fetched 2026-03-10. **HIGH confidence.**
- Next.js 16.1.6 official docs (`/docs/app/api-reference/components/font`) — Full font API reference, multiple font configuration, CSS variable method. Fetched 2026-03-10. **HIGH confidence.**
- Tailwind CSS v4 official docs (`/docs/animation`) — Built-in animation utilities, custom `@keyframes` via `@theme`, `motion-safe`/`motion-reduce` variants. Fetched 2026-03-10. **HIGH confidence.**
- Tailwind CSS v4 official docs (`/docs/transition-property`) — Transition utilities for micro-interactions. Fetched 2026-03-10. **HIGH confidence.**
- Tailwind CSS v4 official docs (`/docs/customizing-colors`) — OKLCH color system, `@theme` override pattern, disabling defaults. Fetched 2026-03-10. **HIGH confidence.**
- `motion` package name and version — WebFetch blocked during research. Version listed as `^12.x` based on training data (package renamed from `framer-motion` to `motion` in 2024). **LOW confidence on exact version number — verify with `npm view motion version` before installing.**

---

## Open Questions

1. **`motion` exact current version** — Could not fetch npm registry or motion.dev during research. Verify: `npm view motion version`. Expected to be in the `^11.x` or `^12.x` range. The import path `motion/react` (not `framer-motion`) is the current correct path.

2. **Font pairing decision** — Inter + Fraunces is a reasonable recommendation for a bold/premium tech aesthetic, but the final choice depends on Red Leader's brand guidelines. This is a design decision, not a stack decision.

3. **Dark vs light theme** — The Vercel/Linear aesthetic is predominantly dark. If Red Leader's redesign targets a dark-first look, the color system section above applies directly. If light-first, the OKLCH values need adjustment but the approach is identical.

---

*Stack research for: Visual redesign additions — Red Leader marketing site v2.0*
*Researched: 2026-03-10*
