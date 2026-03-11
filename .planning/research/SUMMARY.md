# Project Research Summary

**Project:** Red Leader Website — v2.0 Visual Redesign
**Domain:** Premium dark-first marketing site for emergency infrastructure services
**Researched:** 2026-03-10
**Confidence:** HIGH (stack and architecture verified against official docs and direct codebase audit; features and design patterns at MEDIUM due to training data)

## Executive Summary

Red Leader's v2.0 milestone is a visual redesign of a fully functional Next.js 16 + Tailwind v4 marketing site — not a rebuild. The goal is to eliminate the "agency template" aesthetic and replace it with the visual language used by Linear, Vercel, Render, and Tailscale: near-black backgrounds, gradient text headlines, backdrop blur navigation, border-based card systems, and scroll-triggered entrance animations. The existing technical foundation (App Router, force-static pages, server components, Tailwind v4 `@theme`) is correct and remains unchanged. All redesign work is additive: new CSS tokens, refined component styles, and a minimal animation layer on top of the existing structure.

The recommended approach is CSS-first throughout. Tailwind v4's `@theme` directive handles the entire color and typography token system. The `motion` npm package (formerly Framer Motion) covers the narrow set of scroll-triggered and sequenced animations that CSS cannot express. The critical constraint is that animated elements must be isolated into thin `'use client'` wrapper components — page-level Server Components and `force-static` exports must not be touched. This pattern is already established in the codebase (CalendlyEmbed, MobileNav) and is not novel.

The primary risks are color system fragmentation (mixing raw Tailwind utilities with design tokens), accidental Server Component conversion when adding animations, and Tailwind v4 class name renames silently breaking styles. All three are preventable by establishing a complete design token system in `globals.css` before touching any component, and by maintaining a v4 class name reference throughout implementation. The upside is substantial: the redesign delivers a premium visual impression at dramatically lower cost than a rebuild, with no changes to SEO infrastructure, data layer, or form handling.

## Key Findings

### Recommended Stack

The existing stack (Next.js 16.1.6, React 19.2.4, Tailwind v4) requires only two new runtime dependencies: `motion` (^12.x, import from `motion/react`) for scroll-triggered entrance animations and `lucide-react` for icon additions. Utility helpers `clsx` and `tailwind-merge` are needed if not already installed. The typography upgrade requires no new packages — `next/font/google` is already available in Next.js 16 and handles self-hosting, font subsetting, FOUT prevention, and CLS elimination automatically. The full color system and all micro-interaction hover effects are pure CSS via `@theme` extension.

See `.planning/research/STACK.md` for full version compatibility matrix, installation commands, and alternatives considered.

**Core technologies:**
- `motion` (^12.x): Scroll-triggered reveals, staggered children, AnimatePresence for mobile menu — required only where CSS cannot express the behavior. Verify exact version with `npm view motion version` before installing.
- `next/font/google` (built-in): Display font loading — no package install needed; upgrade font pairing by editing `layout.tsx` only.
- Tailwind v4 `@theme` (existing): Full color system, type scale, animation tokens — zero new packages.
- `lucide-react` (^0.511.x): Tree-shakeable icon system for navigation and card micro-interactions.

### Expected Features

The feature gap between v1.1 and the reference sites (Linear, Render, Tailscale) is significant but well-defined. The redesign has two distinct tiers. Phase 1 features are mandatory to eliminate "agency template" perception; without them the redesign has not happened. Phase 2 features add meaningful polish at low cost. Nothing in the anti-features list should be built.

See `.planning/research/FEATURES.md` for full prioritization matrix, reference site analysis, and existing component inventory.

**Must have (table stakes — Phase 1):**
- Near-black background system (`#09090b`) cascading to all sections — every other visual feature depends on this
- Typography system with display font (Inter Display or Geist) and tight heading tracking (`-0.03em` to `-0.05em`)
- Backdrop blur navigation (`bg-black/80 backdrop-blur-xl border-b border-white/10`)
- Gradient text on hero headline (`bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent`)
- Ambient radial glow behind hero (CSS radial-gradient, red-tinted, zero performance cost)
- Border-based card system (replaces all `shadow-sm hover:shadow-md` cards site-wide)
- Button system redesign: primary (red + red glow on hover), secondary (transparent + border), ghost
- Section spacing uplift to `py-24 sm:py-32`

**Should have (Phase 2 differentiators):**
- Oversized stat display (64–80px numbers in SuccessMetrics)
- Animated stat counters (scroll-triggered, SuccessMetrics only)
- Scroll-triggered fade/slide-up reveals on all major sections
- Bento grid services layout (replaces equal 3-column grid)
- Pull-quote testimonial restyling (oversized quotation marks, large quote text)
- Red glow hover states on nav links and emergency CTA
- Glassmorphism treatment on EmergencyBadge component
- Background noise texture (SVG at ~3% opacity)

**Defer (v2.x or later):**
- Terminal/code accent elements — needs content decisions; execution risk is high
- Full-screen mobile nav drawer — current nav works; premium treatment can follow Phase 2
- Dark/light mode toggle — only if explicitly requested; doubles CSS complexity and should never be built

### Architecture Approach

The visual redesign integrates as five additive systems layered onto the existing architecture without changing its structure. Integration points are: `globals.css @theme` (color tokens, font tokens, animation keyframes), `app/layout.tsx` (display font loading), individual page files (heading class additions, section spacing updates), existing components (restyle in-place), and one new shared component (`AnimateOnScroll` — a ~30-line Intersection Observer wrapper that lets Server Component children receive scroll-triggered CSS animations). No page-level files become Client Components. No `force-static` exports are removed. The data layer (`app/data/`), SEO infrastructure, and form handling are untouched.

See `.planning/research/ARCHITECTURE.md` for full component map, integration point details, anti-patterns, and recommended build order.

**Major integration points:**
1. `globals.css @theme` — Design token foundation: colors (full surface system in OKLCH), fonts (display font variable), animation keyframes, z-index scale. Must be complete and stable before any component work.
2. `app/layout.tsx` — Add display font via `next/font/google`, expose as CSS variable, apply to `<html>`.
3. `app/(marketing)/` pages — Add `font-display` to headings, update section padding, replace raw gray utility classes with brand tokens.
4. Existing shared components (`Header`, `Footer`, `SuccessMetrics`, `Testimonials`, `EmergencyBadge`, `MobileNav`) — Restyle without architectural changes; `SuccessMetrics` converts to Client Component only if counter animation is included.
5. `AnimateOnScroll` (new) — Single new shared Client Component for scroll-triggered reveals; children remain Server Components.

### Critical Pitfalls

See `.planning/research/PITFALLS.md` for full details, warning signs, recovery strategies, and a "Looks Done But Isn't" checklist.

1. **Animation library converts entire page to Client Component** — Never add `'use client'` or import `motion` at the page level (`page.tsx`). Extract all animated elements into dedicated `'use client'` wrapper components with Server Component children passed through as `{children}`. Verify `force-static` is still honored in `next build` output after every animation addition.

2. **Font loaded outside `next/font` causes FOUT and CLS** — Every font must go through `next/font/google` in `layout.tsx`. Never copy a `<link>` from Google Fonts CDN. After font changes, run Lighthouse on a production build and confirm CLS < 0.1 and no requests to `fonts.googleapis.com`.

3. **Color token drift from mixing raw Tailwind utilities with design tokens** — Define the complete new token system in `globals.css @theme` in the very first phase. After each subsequent phase, grep for raw `bg-slate-*`, `bg-gray-*`, `text-zinc-*` in component files — none should exist in production code.

4. **Tailwind v4 class renames silently break styles** — Key renames: `shadow-sm` is now `shadow-xs`, `shadow` is now `shadow-sm`, `outline-none` is now `outline-hidden`, `focus:ring` is now `focus:ring-3`. No TypeScript error surfaces these. Establish a v4 class reference in Phase 1 and verify shadows, rings, and rounded corners visually after each component pass.

5. **Missing `prefers-reduced-motion` breaks accessibility and WCAG AA compliance** — Wrap all CSS animations with `motion-safe:` Tailwind variant. Use `useReducedMotion()` hook in any motion components. Test with reduced motion enabled in macOS System Preferences before shipping any phase. Enterprise clients have ADA compliance requirements.

## Implications for Roadmap

The feature dependency graph is unambiguous: the dark color system is the foundation that all other visual features depend on. It must be Phase 1. Typography is parallel-safe with color but also foundational. The shell components (Header, Footer, EmergencyBadge) affect every page and should come after tokens are stable. The homepage is the highest-impact individual deliverable. Interior pages and shared component polish can run in parallel once the shell is done. Animation is best applied as a dedicated pass after visual design is stable, ensuring `prefers-reduced-motion` is handled consistently site-wide.

### Phase 1: Design Token Foundation

**Rationale:** The entire redesign depends on a stable, complete token system. Color drift (Pitfall 7), z-index wars (Pitfall 6), and font CLS (Pitfall 2) are all prevented here. No component work should start until tokens are committed and visually reviewed.
**Delivers:** Complete `globals.css @theme` with near-black surface system, refined brand palette in OKLCH, display font variable, animation keyframes, z-index scale. Updated `layout.tsx` with display font loading.
**Addresses:** Dark color system (P1 feature), typography system (P1 feature), section spacing token
**Avoids:** Color token drift, FOUT/CLS from improper font loading, z-index wars before animated components are added

### Phase 2: Global Shell Redesign

**Rationale:** Header and EmergencyBadge appear on every page. Getting them right first means all subsequent page work inherits correct navigation and brand baseline. The header scroll behavior architecture decision (CSS scroll-timeline vs. `'use client'` scroll listener) must be made here before it cascades through every page.
**Delivers:** Backdrop blur Header, redesigned three-tier button system, EmergencyBadge glassmorphism treatment, Footer refinement
**Addresses:** Backdrop blur navigation (P1), button system redesign (P1), glassmorphism on EmergencyBadge (P2)
**Avoids:** Pitfall 6 (z-index wars) — header z-index scale is established before animated components are added; emergency phone number CTA remains fully visible at all times

### Phase 3: Homepage Redesign

**Rationale:** The homepage is the highest-traffic page and the strongest signal to the target audience (CTOs evaluating Red Leader for the first time). It requires the most visual work (hero, services grid, SuccessMetrics, Testimonials) and benefits from having Phase 1 tokens and Phase 2 shell stable first.
**Delivers:** Full hero redesign (radial glow, gradient text, badge overline), bento grid services layout, SuccessMetrics oversized stats, Testimonials pull-quote restyling
**Addresses:** Gradient text on hero headline (P1), ambient hero glow (P1), bento grid (P2), oversized stat display (P2), pull-quote testimonials (P2)
**Avoids:** Pitfall 1 (animations breaking Server Components) — AnimateOnScroll pattern established here as the standard; Pitfall 8 (LCP degradation) — CSS-only hero background with zero HTTP requests

### Phase 4: Animation and Motion Layer

**Rationale:** Adding scroll reveals and animated counters as a dedicated pass — rather than per-component during earlier phases — ensures `prefers-reduced-motion` is applied consistently site-wide and the `AnimateOnScroll` component is built once correctly. Doing this after visual design is stable means animations reveal polished content, not interim styles.
**Delivers:** `AnimateOnScroll` component, scroll-triggered fade/slide reveals on all major sections, animated stat counters in SuccessMetrics, red glow hover states, micro-interaction polish site-wide
**Addresses:** Scroll-triggered reveals (P2), animated stat counters (P2), red glow hover states (P2)
**Avoids:** Pitfall 1 (Server Component conversion), Pitfall 4 (layout/paint-triggering animations — use only `transform` and `opacity`), Pitfall 5 (prefers-reduced-motion — applied to all animations in one pass)

### Phase 5: Interior Pages and Final Polish

**Rationale:** Services, About, case studies, blog, and contact pages all apply the same token system and component patterns established in Phases 1–4. Work is largely mechanical and pages can be executed in parallel. This phase ends with a full accessibility and performance audit.
**Delivers:** All interior pages updated to match dark design system; background noise texture applied; typography scale verified at all breakpoints (375px, 768px, 1440px); Lighthouse LCP under 2.5s; WCAG AA compliance confirmed
**Addresses:** All remaining page-level visual debt; background noise texture (P2); terminal accent elements if time permits (P3)
**Avoids:** Pitfall 3 (Tailwind v4 class renames) — final QA pass with v4 reference; Pitfall 5 (prefers-reduced-motion) — final accessibility audit with reduced motion enabled

### Phase Ordering Rationale

- Token foundation first because the dark color system is a hard dependency for gradient text, border cards, glassmorphism, noise texture, glow effects, and hover states — confirmed by the explicit dependency graph in FEATURES.md.
- Shell before homepage because header z-index and button system must be stable before they appear on redesigned pages; the emergency phone number CTA must remain functional throughout.
- Animation as a dedicated phase because `prefers-reduced-motion`, compositor-safe animation properties (`transform` and `opacity` only), and Server Component boundaries are cross-cutting concerns easier to apply correctly in one pass than to retrofit per component.
- Interior pages last because they apply established patterns from earlier phases with no remaining architectural decisions.

### Research Flags

Phases with standard patterns (research-phase not needed):
- **Phase 1 (Design Tokens):** CSS custom properties in Tailwind v4 `@theme` and `next/font` multi-font pattern are thoroughly documented with confirmed examples in the existing codebase.
- **Phase 2 (Shell):** Header backdrop blur and button system are pure CSS/Tailwind patterns with no novel integrations.
- **Phase 5 (Interior Pages):** Mechanical application of established patterns from Phases 1–4.

Phases that may benefit from a quick validation step:
- **Phase 3 (Homepage — Bento Grid):** CSS Grid bento layout with mixed span sizes and the exact animation sequence for the hero entrance are design-judgment decisions that may require iteration. Not a research problem — a design decision problem requiring visual review at the start of the phase.
- **Phase 4 (Animation Layer):** The `motion` package exact version and API for `whileInView` with Next.js 16 App Router should be confirmed with `npm view motion version` and a smoke test before committing to the full implementation. LOW confidence on exact version per STACK.md research.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Core recommendations (Tailwind v4 `@theme`, `next/font`, `motion/react`) verified against official Next.js 16.1.6 and Tailwind v4 docs. One gap: `motion` exact version number unverified (npm registry unavailable during research). |
| Features | MEDIUM | Design patterns (dark themes, gradient text, backdrop blur, border cards, section spacing) are fundamental and stable across the industry. Reference site exact color tokens not verified against current live sites. Font pairing is a design judgment call requiring brand guidelines validation. |
| Architecture | HIGH | Based on direct codebase audit of all files in `app/`. Integration patterns (CSS-first animation, thin Client wrapper, token extension via `@theme`) are confirmed against the existing codebase structure and official Next.js documentation. |
| Pitfalls | HIGH | Critical pitfalls verified against Next.js 16.1.6 official docs, Tailwind v4 upgrade guide, and WCAG 2.1. The Tailwind v4 class rename table is confirmed from the official upgrade guide. The Server Component boundary pitfall is confirmed against existing codebase patterns. |

**Overall confidence:** HIGH

### Gaps to Address

- **`motion` exact version:** Run `npm view motion version` before Phase 4. Expected `^11.x` or `^12.x`. Import path `motion/react` (not `framer-motion`) is confirmed correct regardless of version.
- **Font pairing final selection:** Inter + Fraunces is the research recommendation for a premium tech brand with bold hero treatment. Final choice must be validated against Red Leader's brand guidelines before Phase 1 is considered complete.
- **Hero background dark shade:** `#09090b` (Vercel-style near-black) vs. `#0e0e10` (Render-style slightly warmer near-black) is a design decision. The cooler near-black is recommended but needs visual validation against the red accent color before locking in the token.
- **Header scroll behavior browser support floor:** CSS scroll-timeline (no JS) is supported in Chrome 115+, Firefox 110+, Safari 18+. If Safari 17 support is required, use the `'use client'` scroll listener approach. Confirm target browser support floor before Phase 2.

## Sources

### Primary (HIGH confidence)
- Next.js 16.1.6 official docs (`/docs/app/getting-started/fonts`, `/docs/app/api-reference/components/font`) — `next/font` API, variable font configuration, Tailwind v4 integration pattern. Fetched 2026-03-10.
- Tailwind CSS v4 official docs (`/docs/animation`, `/docs/transition-property`, `/docs/customizing-colors`, `/docs/upgrade-guide`) — `@theme` directive, OKLCH colors, animation utilities, v3→v4 breaking changes and class renames. Fetched 2026-03-10.
- Direct codebase audit (`app/`, `app/globals.css`, `app/layout.tsx`, all component files) — existing architecture, current token system, existing `'use client'` boundaries. Read 2026-03-10.
- WCAG 2.1 Success Criterion 2.3.3 — `prefers-reduced-motion` Level AA requirement for animation accessibility.

### Secondary (MEDIUM confidence)
- Reference site design systems (Linear, Vercel, Stripe, Tailscale, Render) — training data through August 2025; fundamental design patterns (dark themes, gradient text, backdrop blur, border cards, radial glows, section spacing) are stable and widely documented across the design community; exact current color tokens unverified against live sites.

### Tertiary (LOW confidence)
- `motion` package exact current version — npm registry unavailable during research; version `^12.x` based on training data (package renamed from `framer-motion` to `motion` in 2024); verify with `npm view motion version` before installing.

---
*Research completed: 2026-03-10*
*Ready for roadmap: yes*
