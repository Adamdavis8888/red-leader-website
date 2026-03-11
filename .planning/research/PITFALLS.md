# Pitfalls Research: Visual Redesign of Existing Next.js Marketing Site

**Domain:** Visual redesign — animations, typography, color system, layout restructuring on existing production site
**Stack:** Next.js 16 (App Router), Tailwind CSS v4, React 19
**Researched:** 2026-03-10
**Confidence:** HIGH (critical pitfalls verified against Next.js 16.1.6 official docs and Tailwind v4 upgrade guide)

---

## Critical Pitfalls

### Pitfall 1: Animation Library Forces Entire Page Into Client Component

**What goes wrong:**
Adding Framer Motion or similar animation libraries to a page-level component requires `'use client'`, which converts the entire page from a Server Component to a Client Component. All data-fetching, static optimization (`force-static`), and RSC streaming benefits disappear. The homepage currently uses `export const dynamic = 'force-static'` — adding animation at the wrong level silently removes this optimization.

**Why it happens:**
Developers reach for `import { motion } from 'framer-motion'` at the page level (e.g., `app/(marketing)/page.tsx`) without isolating the animated elements. Once any hook or browser API is used in a file, the entire file becomes a Client Component, pulling every import with it.

**How to avoid:**
Extract animated elements into dedicated, minimal `'use client'` wrapper components. The page itself stays a Server Component. Pattern:

```tsx
// AnimatedHero.tsx
'use client'
import { motion } from 'framer-motion'
export function AnimatedHero({ children }) {
  return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{children}</motion.div>
}

// page.tsx — stays Server Component
import { AnimatedHero } from './AnimatedHero'
export default function HomePage() {
  return <AnimatedHero><h1>Static content passed as children</h1></AnimatedHero>
}
```

The `children` pattern lets Server-rendered content pass through Client Component wrappers without becoming client-side code.

**Warning signs:**
- `'use client'` appearing at the top of any page-level file (`page.tsx`)
- `export const dynamic = 'force-static'` silently ignored (Next.js won't error)
- Bundle size growing unexpectedly large for a static marketing page

**Phase to address:** Typography & Motion Foundation phase (first phase introducing animations)

---

### Pitfall 2: New Font Pair Loaded Outside `next/font` Causes FOUT and CLS

**What goes wrong:**
Premium redesigns typically swap Inter for a more distinctive font pair (e.g., Cal Sans + Inter, Geist + Geist Mono). If the new font is loaded via a `<link>` tag in the HTML head, or via a CSS `@import` in `globals.css`, Next.js cannot optimize it. The result is a Flash of Unstyled Text (FOUT) and measurable Cumulative Layout Shift (CLS) as the web font loads and reflows the page.

**Why it happens:**
Designers reference Google Fonts CDN URLs. Developers copy those link tags directly rather than using `next/font/google`, which self-hosts fonts at build time with zero runtime requests and uses `size-adjust` fallback metrics to eliminate CLS.

**How to avoid:**
Every font must be loaded through `next/font`. For a two-font system with Tailwind v4:

```tsx
// app/layout.tsx
import { Geist, Geist_Mono } from 'next/font/google'

const geist = Geist({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' })

export default function RootLayout({ children }) {
  return <html className={`${geist.variable} ${geistMono.variable}`}>{children}</html>
}
```

```css
/* globals.css */
@theme {
  --font-sans: var(--font-sans);  /* references the CSS variable from next/font */
  --font-mono: var(--font-mono);
}
```

**Warning signs:**
- Any `<link rel="stylesheet" href="https://fonts.googleapis.com/...">` in layout or head
- Any `@import url('https://fonts.googleapis.com/...')` in CSS files
- Lighthouse CLS score above 0.1 after font change
- Visible text reflow on first load in Chrome DevTools slow network simulation

**Phase to address:** Typography & Font System phase

---

### Pitfall 3: Tailwind v4 Class Renames Break Existing Component Styles Silently

**What goes wrong:**
The project already uses Tailwind v4. However, adding new components during redesign using "known" v3 class names that were renamed in v4 produces broken styles without compilation errors. The HTML renders with the class applied but the CSS rule doesn't exist. This is particularly dangerous because it appears to work in dev if any cached styles are present.

**Critical v4 renames that affect this redesign:**

| Intended effect | v3 class | v4 class |
|----------------|----------|----------|
| Small shadow | `shadow-sm` | `shadow-xs` |
| Default shadow | `shadow` | `shadow-sm` |
| Small rounded | `rounded-sm` | `rounded-xs` |
| Remove outline | `outline-none` | `outline-hidden` |
| Focus ring (3px) | `focus:ring` | `focus:ring-3` |
| Small blur | `blur-sm` | `blur-xs` |

Additionally, `ring` now defaults to 1px (was 3px) and uses `currentColor` (was blue-500). Any focus ring styles on CTAs and form elements need explicit `ring-3 ring-blue-500` to match v3 visual behavior.

**Why it happens:**
Developers (and AI code generation tools) write v3 class names from muscle memory. The design reference sites (Linear, Vercel, Stripe) have documentation using v3 syntax. No TypeScript error surfaces this — it silently fails.

**How to avoid:**
- Run `npx @tailwindcss/upgrade` on any large blocks of class additions
- Keep the Tailwind v4 upgrade guide open during component authoring
- Add a linting rule or visual regression test for shadow/ring utilities specifically
- Review the v4 class name changes before starting each component

**Warning signs:**
- Shadows look different than expected on cards
- Focus rings missing or wrong color on interactive elements
- Rounded corners appear too sharp or too large vs. designs

**Phase to address:** All phases — establish v4 class name reference in Phase 1, verify in each subsequent phase

---

### Pitfall 4: CSS Animations That Trigger Layout or Paint Destroy Performance

**What goes wrong:**
Animating properties that trigger browser layout recalculation (width, height, top, left, margin, padding, font-size) or paint (background, color, box-shadow) on every animation frame causes jank. On low-end devices common in the target audience (CTO on a plane, crisis scenario), this renders the site unusable during the exact moment they need it most.

**Properties safe to animate (compositor only — no layout/paint):**
- `transform` (translate, scale, rotate) — YES
- `opacity` — YES

**Properties that trigger paint (avoid in continuous animations):**
- `box-shadow` — paint trigger
- `background-color` — paint trigger (acceptable for hover transitions, not loops)
- `color` — paint trigger

**Properties that trigger layout (never animate):**
- `width`, `height`, `margin`, `padding`, `top`, `left`, `font-size`

**Why it happens:**
Designers spec "grow on hover" or "pulse" effects using width/height. Developers implement faithfully without knowing the rendering cost. The existing `emergency-pulse` animation in globals.css correctly uses `opacity` — new animations must follow this pattern.

**How to avoid:**
- Scale animations: use `transform: scale()` not width/height changes
- Position animations: use `transform: translateY()` not `top`/`margin` changes
- Glow effects: use `filter: drop-shadow()` (compositor) not `box-shadow` changes in loops
- Wrap all animated elements in `will-change: transform` or `will-change: opacity` when hover animations are anticipated — but sparingly (it consumes GPU memory)

**Warning signs:**
- Chrome DevTools Performance panel shows purple "Layout" blocks during animation
- Green "Paint" flashes during scrolling in DevTools paint flashing mode
- Animation stutters on phones in browser preview tools

**Phase to address:** Motion & Micro-interactions phase

---

### Pitfall 5: `prefers-reduced-motion` Not Respected Breaks Accessibility and May Cause Physical Harm

**What goes wrong:**
Users with vestibular disorders, epilepsy, or motion sensitivity have `prefers-reduced-motion: reduce` set in their OS. If all animations run regardless, this is a WCAG 2.1 Level AA violation (Success Criterion 2.3.3) and can cause genuine physical discomfort or seizures. Emergency infrastructure clients include enterprises with ADA compliance requirements — a violating site is a liability.

**Why it happens:**
Animations are built and tested by developers who don't have reduced motion enabled. The effect is invisible during development and only surfaces in accessibility audits or user complaints.

**How to avoid:**
Tailwind v4 provides `motion-safe:` and `motion-reduce:` variants natively. Use `motion-safe:` as the default gate for ALL non-trivial animations:

```html
<!-- Correct: animation only fires when user has not requested reduced motion -->
<div class="motion-safe:animate-fade-in motion-safe:transition-transform motion-safe:hover:-translate-y-1">
  Card content
</div>
```

For JavaScript animations (Framer Motion), use the `useReducedMotion` hook:

```tsx
'use client'
import { useReducedMotion } from 'framer-motion'

export function AnimatedSection({ children }) {
  const shouldReduce = useReducedMotion()
  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  )
}
```

**Warning signs:**
- Any CSS animation or transition without a `motion-safe:` or `motion-reduce:` variant
- Any Framer Motion component without `useReducedMotion` check
- Lighthouse accessibility score drops after adding animations
- axe DevTools flags motion-related violations

**Phase to address:** Motion & Micro-interactions phase (built-in from the start, not bolted on after)

---

### Pitfall 6: Sticky Header Z-Index Wars With Animated Elements

**What goes wrong:**
The current header uses `z-30` and `sticky top-0`. When hero sections get animated backgrounds (gradients, mesh gradients, particle effects), scroll-linked animations, or when cards get hover elevation effects with `shadow-lg` and `transform: translateY(-4px)`, elements bleed through the header. The emergency phone number CTA in the header becomes obscured by design elements below it — catastrophic for the primary conversion goal.

**Why it happens:**
Each new animated component creates a new stacking context (anything with `transform`, `opacity` < 1, `will-change`, `filter`). Developers assign `z-index` values reactively ("just add `z-10`") rather than using a system. The existing header at `z-30` and mobile menu overlay at `z-40/z-50` creates a fragile layering that breaks when redesign introduces new stacking contexts.

**How to avoid:**
Define a z-index scale in `globals.css` `@theme` block before writing any animated components:

```css
@theme {
  --z-base: 0;
  --z-raised: 10;      /* cards on hover */
  --z-sticky: 30;      /* header */
  --z-overlay: 40;     /* backdrop */
  --z-modal: 50;       /* mobile menu, modals */
  --z-emergency: 60;   /* emergency badge (always on top) */
  --z-toast: 70;       /* notifications */
}
```

Any component that uses `transform` in animation must be checked against this scale.

**Warning signs:**
- Header navigation links click-through or obscured by section below
- Emergency phone badge (currently `z-40`) disappearing under animated elements
- Mobile nav overlay not covering hero animations

**Phase to address:** Layout Restructuring phase (before any animated components are added)

---

### Pitfall 7: Color Token Drift When Mixing Tailwind CSS Variables and Hardcoded Values

**What goes wrong:**
The redesign introduces a refined color system (dark backgrounds, gradient surfaces, adjusted gray scale). Existing components hardcode `bg-brand-red`, `text-brand-dark`, `text-brand-gray` via the `@theme` block. New components built with different color names (e.g., `bg-slate-900` directly, or new tokens like `--color-surface-dark`) create visual inconsistency. After redesign, the site has two color systems — the old token system and the new one — with no single source of truth.

**Why it happens:**
Phases are built sequentially. Phase 1 might introduce a new dark palette. Phase 3 builds service cards. The developer working on Phase 3 uses whatever works visually in context, not checking if tokens are consistent with Phase 1 decisions.

**How to avoid:**
Define the complete new color token system in `globals.css` `@theme` block in the very first redesign phase, before touching any components. All subsequent phases only use defined tokens — never raw Tailwind color utilities like `bg-slate-950`.

Example token structure for this redesign:
```css
@theme {
  /* Core brand (update these, don't add alongside them) */
  --color-brand-red: #dc2626;
  --color-brand-red-dark: #b91c1c;

  /* New surface tokens */
  --color-surface-primary: #0a0a0a;
  --color-surface-secondary: #111111;
  --color-surface-card: #1a1a1a;

  /* Text tokens */
  --color-text-primary: #f5f5f5;
  --color-text-muted: #a3a3a3;
}
```

**Warning signs:**
- Mix of `bg-slate-*`, `bg-gray-*`, and `bg-brand-*` in component files
- Colors that look "close enough" but not identical across pages
- Design review catching inconsistencies late in the project

**Phase to address:** Color System phase (must be the earliest phase or a dedicated setup phase)

---

### Pitfall 8: Hero Background Gradients and Mesh Backgrounds Become LCP Bottlenecks

**What goes wrong:**
Modern premium sites (Linear, Vercel) use dark hero sections with complex gradient backgrounds, gradient mesh overlays, or background images. Implementing this with an `<img>` or `background-image: url(...)` that isn't properly handled causes the hero background to become the Largest Contentful Paint element. If it loads slowly (no preloading, wrong format, no next/image optimization), LCP degrades from under 2s to 4s+. For a B2B lead generation site, every second of LCP degradation reduces conversions.

**Why it happens:**
Background images for hero sections are often PNG/JPG files dropped in `/public/`. They don't go through `next/image` (which only handles `<img>` elements, not CSS backgrounds), so they get no optimization, no WebP conversion, and no preloading.

**How to avoid:**
- Use CSS-only gradients for hero backgrounds wherever possible — zero HTTP request, zero render blocking
- If an image is needed (mesh texture, noise texture), implement it as a `next/image` element with `fill` and `priority` props positioned absolutely, not as a CSS background
- Add `<link rel="preload">` manually for any hero background image that must be CSS
- Prefer SVG for decorative graphic elements — they're tiny, infinitely scalable, and CSS-controllable

**Warning signs:**
- Chrome DevTools "Largest Contentful Paint" highlighting a hero background image
- Lighthouse Performance score dropping after hero redesign
- Network waterfall showing hero image blocking above-the-fold render

**Phase to address:** Hero & Layout Restructuring phase

---

## Technical Debt Patterns

Shortcuts that seem reasonable but create long-term problems specific to this redesign.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Copy animation CSS from reference site (Linear, Vercel) | Fast implementation, matches target aesthetic | Their code may use proprietary build tools, non-standard CSS, or depend on their specific DOM structure | Never — always port to Tailwind/CSS variables |
| Add `will-change: transform` to everything animated | Eliminates jank immediately | GPU memory exhaustion on mobile, battery drain | Only on elements with known hover interactions; remove after transition ends via JS |
| Inline style for one-off color values (`style={{ color: '#1a1a1a' }}`) | Quick fix | Bypasses token system, invisible to search/replace | Never — add a token instead |
| Wrap entire section in `'use client'` for one animated element | Unblocks immediately | Entire section loses RSC benefits, server data fetching pushed to client | Never — extract the animated element into its own component |
| Disable `adjustFontFallback` in next/font | Avoids edge case with unusual fallback | Re-enables CLS when web font loads | Never for heading fonts; acceptable for decorative fonts only |
| Use CSS `transition: all` on interactive elements | Catches any future property changes | Animates every CSS property including layout-triggering ones unexpectedly | Never |

---

## Integration Gotchas

Common mistakes when connecting visual redesign features to the existing stack.

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Tailwind v4 + next/font | Defining `--font-sans` in both the font `variable` option AND `@theme`, creating a circular reference | Set `variable: '--font-inter'` in next/font, then reference it in `@theme` as `--font-sans: var(--font-inter)` |
| Framer Motion + App Router | Importing `motion` components in Server Components without `'use client'` directive | Always wrap motion components in isolated `'use client'` files; never import motion in server component files |
| Tailwind v4 + arbitrary CSS animations | Using `animate-[name_duration_easing_infinite]` syntax which changed between v3 and v4 | Verify animation arbitrary value syntax in v4 docs; the existing `emergency-pulse` example in globals.css shows correct pattern |
| CSS custom properties + Tailwind v4 | Using `bg-[--brand-color]` (v3 CSS var syntax) — produces no output in v4 | Use `bg-(--brand-color)` with parentheses, not square brackets |
| Sticky header + scroll-linked animations | Animations that use `position: sticky` or `IntersectionObserver` interfering with the existing sticky header | Test header sticky behavior on every page after adding any scroll-linked animation |
| Mobile nav overlay + animated hero | Framer Motion AnimatePresence for mobile nav exit animation leaving ghost elements above hero | Set `mode="wait"` on AnimatePresence and verify z-index stack after animation completes |

---

## Performance Traps

Patterns that degrade performance during visual redesign.

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Multiple Google Fonts loaded as separate requests | Waterfall shows 3-4 font requests, FOUT visible | Use variable fonts when possible; load all weights in one `next/font` call | First paint on every page |
| `IntersectionObserver` scroll animations on every card | CPU usage spikes on scroll, scroll feels sticky on mobile | Use `once: true` in animation triggers; disconnect observer after animation fires | Pages with 6+ animated cards (services grid, case studies) |
| Gradient mesh backgrounds as raster images | Hero section LCP > 3s | Pure CSS gradients or tiny SVG noise texture | Any slow connection |
| Tailwind purge not catching dynamic class strings | Design tokens don't appear in production build | Never construct Tailwind classes dynamically (`'bg-' + color`); use full strings | Production build only — works fine in dev |
| Too many `will-change` declarations | High GPU memory use, browser throttles other tabs | Apply `will-change` only on `mouseenter`, remove on `mouseleave` via JS | Devices with less than 4GB RAM |
| Framer Motion in layout.tsx | Every page transition re-mounts the animation library bundle | Keep motion components out of shared layouts; use CSS transitions for layout-level transitions | Every client-side navigation |

---

## Security Mistakes

This redesign has limited new security surface. Relevant considerations:

| Mistake | Risk | Prevention |
|---------|------|------------|
| Loading fonts from external CDN (not next/font) | Font file could be poisoned or intercepted; exposes user IP to Google on every page load | Always use `next/font` which self-hosts at build time |
| Embedding third-party animation scripts (GSAP CDN, etc.) | Script injection risk, adds external dependency | Self-host or use npm-installed packages only |
| CSS `content: attr(data-animation)` with user-supplied data | XSS vector if any animation data comes from CMS/user input | No animation values should derive from dynamic content |

---

## UX Pitfalls

Common user experience mistakes specific to this domain (premium visual redesign for emergency B2B services).

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Animations delay access to emergency phone number | CTO in a crisis waits for hero animation to complete before CTA is clickable/visible | Emergency CTA should render immediately with `opacity: 1` as initial state; animation is additive, never blocking |
| Dark hero with insufficient contrast on body text | Text fails WCAG AA (4.5:1 ratio) — illegible for users in bright light on mobile | Verify every text/background combination with a contrast checker before finalizing color tokens |
| Scroll-triggered animations fire on load due to elements already being in viewport | Jarring visual pop on first load instead of smooth entrance | Use `viewport: { once: true, amount: 0.3 }` — trigger only when 30% of element is visible |
| Micro-interactions on mobile that require hover | Hover states never trigger on touch devices; interactive elements look broken | Use Tailwind's `hover:` variant which in v4 is wrapped in `@media (hover: hover)` — safe |
| Typography scale that looks great at 1440px breaks at 375px | Text overflows containers, line lengths too short for readability | Design type scale as a ratio (e.g., 1.25 minor third) and test at 375px, 768px, 1440px simultaneously |
| Gradient backgrounds that make emergency badge invisible | Fixed emergency badge blends into hero gradient | Keep emergency badge background solid brand-red with explicit border or shadow ensuring visibility against any background |
| Page transitions that interfere with browser back button | Users hit back, expect previous scroll position, get re-animation instead | Test browser history navigation after adding any page transition animations |

---

## "Looks Done But Isn't" Checklist

Things that appear complete during development but are missing critical pieces in production.

- [ ] **Font system:** Font appears correct in dev — verify `next/font` is actually self-hosting by checking Network tab in production build; no requests to `fonts.googleapis.com` or `fonts.gstatic.com`
- [ ] **Animation accessibility:** Animations look good in Chrome — verify with macOS System Preferences > Accessibility > Display > Reduce Motion enabled; all animations should disable or simplify
- [ ] **Color system:** Colors look consistent on dev screen — verify on multiple monitors and phones; dark mode colors (if added) should be tested on actual OLED screens
- [ ] **Hero CTA visibility:** Emergency phone button visible in hero mockup — verify it's visible and clickable on iOS Safari 16 with toolbar present (reduces viewport height by ~90px)
- [ ] **Sticky header on redesigned pages:** Header works on homepage — verify sticky behavior on long service detail pages with scroll-linked animations
- [ ] **Z-index stack:** Elements look correct individually — verify by scrolling through every page while watching the emergency badge and header remain on top
- [ ] **Performance after redesign:** Site feels fast in dev (hot module reload) — run `next build && next start` and test on Lighthouse with CPU 4x slowdown; LCP must be under 2.5s
- [ ] **Typography at all breakpoints:** Heading looks great at 1440px — verify `h1` text doesn't overflow at 320px (oldest iPhone SE)
- [ ] **Tailwind v4 class validation:** New classes work in dev — run production build and verify no "purged" classes (dynamic class construction breaks purging)
- [ ] **Calendly embed after layout changes:** Booking section works in current layout — verify CalendlyEmbed iframe renders correctly after any max-width or padding changes to its container

---

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Server Component converted to client accidentally | LOW | Remove `'use client'` from page file; extract only interactive elements; re-test static optimization with `next build` output |
| Font CLS introduced | LOW-MEDIUM | Switch from external link to `next/font`; add `adjustFontFallback: true`; check `@theme` binding to CSS variable |
| Z-index stack broken by animation | MEDIUM | Audit every component using `transform`/`opacity`/`filter` for stacking context creation; implement z-index token system |
| Color system fragmented | MEDIUM | Grep for raw Tailwind color utilities (`bg-slate-`, `bg-gray-`, `text-zinc-`) across component files; consolidate into token system |
| Performance degraded after hero redesign | MEDIUM | Profile with Chrome DevTools Performance tab; identify LCP element; convert background images to CSS or next/image with `priority` |
| Animation jank on mobile | LOW | Identify offending property with DevTools paint flashing; replace with `transform`/`opacity` equivalent |
| `prefers-reduced-motion` violations in accessibility audit | LOW-MEDIUM | Global search for `animate-`, `transition-`, `motion.` in components; wrap each with `motion-safe:` or `useReducedMotion()` |

---

## Pitfall-to-Phase Mapping

How roadmap phases should address these pitfalls.

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Animation breaks Server Components | Phase: Typography & Motion Foundation | Check no `page.tsx` files have `'use client'`; verify `force-static` still honored in build output |
| Font loading FOUT/CLS | Phase: Typography & Font System | Run Lighthouse on production build; CLS must be < 0.1; Network tab shows no Google Fonts requests |
| Tailwind v4 class renames | All phases — establish reference in Phase 1 | Visual QA pass comparing shadows, rings, rounded corners against designs |
| Compositor-unsafe animations | Phase: Motion & Micro-interactions | Chrome DevTools paint flashing shows no green flashes during animation |
| Missing `prefers-reduced-motion` | Phase: Motion & Micro-interactions | Test with reduced motion enabled in OS; all animations must disable or reduce |
| Sticky header Z-index wars | Phase: Layout Restructuring | Scroll through each page verifying header always on top; emergency badge always visible |
| Color token drift | Phase: Color System (earliest phase) | Grep for raw color utilities after each phase; zero raw `bg-slate-*` etc. in production code |
| Hero LCP degradation | Phase: Hero Redesign | Lighthouse LCP under 2.5s on production build with Moto G4 emulation |

---

## Sources

- Next.js 16.1.6 official documentation: Font optimization (`/docs/app/getting-started/fonts`), Image optimization (`/docs/app/getting-started/images`), Server and Client Components (`/docs/app/getting-started/server-and-client-components`) — verified 2026-02-27
- Tailwind CSS v4 Upgrade Guide (`/docs/upgrade-guide`) — v3→v4 breaking changes, class renames confirmed
- Tailwind CSS v4 prefers-reduced-motion variants (`motion-safe`, `motion-reduce`) — official docs confirmed
- Next.js `next/font` API Reference (`/docs/app/api-reference/components/font`) — `adjustFontFallback`, `variable`, multiple font patterns — verified 2026-02-27
- Existing codebase analysis: `app/components/EmergencyBadge.tsx`, `app/components/Header.tsx`, `app/components/MobileNav.tsx`, `app/(marketing)/page.tsx`, `app/globals.css` — read 2026-03-10
- WCAG 2.1 Success Criterion 2.3.3 (Animation from Interactions) — Level AA requirement for `prefers-reduced-motion` respect

---
*Pitfalls research for: Visual redesign — animations, typography, color system, layout changes on existing Next.js 16 + Tailwind v4 marketing site*
*Researched: 2026-03-10*
