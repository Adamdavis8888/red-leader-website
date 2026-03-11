# Feature Research: Visual Redesign

**Domain:** Premium tech company marketing site — visual redesign to match Linear, Vercel, Stripe, PlanetScale, Tailscale, Render
**Researched:** 2026-03-10
**Confidence:** MEDIUM (training knowledge of reference sites through August 2025; WebSearch/WebFetch unavailable this session; patterns are well-established and stable in the design community)

> **Note:** This file supersedes the January 2026 FEATURES.md which addressed functional feature selection. This file is scoped exclusively to **visual and design features** for the v2.0 redesign milestone. Functional features (booking, SEO, case studies, etc.) are already built and are not in scope.

---

## Baseline: Current Visual State

Before mapping the feature landscape, being explicit about the starting point is essential.

The current site (v1.1) has solid structure and real content but uses a conventional visual language that reads as "agency template" to the target audience of CTOs and engineering leaders:

| Dimension | Current State | Gap |
|-----------|--------------|-----|
| **Background** | White primary, `#1f2937` hero only | Too gray, not deep enough — reference sites use near-black `#090909`–`#09090b` |
| **Typography** | Inter only, uniform weights | No display font, no refined letter-spacing, headings lack drama |
| **Hero** | `bg-gradient-to-br from-brand-dark to-gray-900` text block | No radial glow, no gradient text, no badge overline — bland |
| **Cards** | White bg, `shadow-sm hover:shadow-md` | Shadow-based cards read as Material Design era; premium uses border-only on dark bg |
| **Navigation** | White opaque, `border-b border-gray-200`, sticky | Generic SaaS template; reference sites use backdrop-blur on near-black |
| **Animation** | SVG pulse only; zero scroll-triggered or micro-interaction | Fully static page reads as brochureware |
| **Section spacing** | `py-16 sm:py-20` (64–80px) | Premium sites use 96–160px between major sections |
| **Color palette** | `#dc2626` red + `#1f2937` gray, very limited | No depth, no opacity variants, no glow/ambient use of accent |

---

## Feature Landscape

### Table Stakes (Users Expect These)

Features a premium dark-first tech site must have. Their absence signals "amateur" immediately to a CTO who spends their day on Linear, Vercel, and GitHub.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Dark/near-black primary theme** | Linear, Vercel, Stripe, GitHub, PlanetScale, Render all use near-black (`#090909`–`#09090b`) as primary background. Light-only reads as "agency template," not infrastructure company. | MEDIUM | Not a full light/dark toggle — just make dark the default. Current `#1f2937` hero is too gray, not deep enough. Needs to cascade to all sections, not just the hero. |
| **Refined type scale with display font** | Premium sites use a dedicated display/heading font or Inter Display with tight tracking, layered over Inter body. Inter-only at uniform weight reads as unstyled. | LOW | Add Inter Display or Geist as the display font. Apply tight letter-spacing (`-0.03em` to `-0.05em`) to h1/h2. Scale: 14px body, 18px lead, 36/48/64/80px headings. |
| **Navigation with backdrop blur** | Floating/sticky nav with `backdrop-filter: blur(16px)` and a subtle border is universal across all reference sites. White opaque nav with `border-b border-gray-200` reads old. | LOW | Pattern: `bg-black/80 backdrop-blur-xl border-b border-white/10`. Already sticky — needs restyle only. |
| **Intentional section spacing** | Premium sites use 96–160px between major sections. Current `py-16 sm:py-20` (64–80px) feels crowded by comparison. | LOW | Increase to `py-24 sm:py-32` as baseline section rhythm. This single change dramatically improves perceived quality. |
| **Border-based card system** | Cards defined by `border border-white/10` or `border border-gray-800` on dark background, not box shadows. Shadow cards read as Material Design (2014–2019 era). | LOW | Replace all `shadow-sm hover:shadow-md` cards with `border border-white/[0.08] bg-white/[0.04]` on dark bg or equivalent. |
| **Consistent border radius system** | Premium sites pick one radius tier and apply systematically: `rounded-xl` (16px) for cards/containers, `rounded-lg` (8px) for buttons/badges. Mixing reads inconsistent. | LOW | Standardize. Do not mix `rounded`, `rounded-md`, `rounded-lg`, `rounded-xl` randomly. |
| **Legible hero hierarchy with badge overline** | Hero must establish: label/badge → headline → subhead → CTAs. Current site skips the overline entirely; headline jumps cold with no framing. | MEDIUM | Add `<span>` badge above h1 (e.g., "24/7 Emergency Response" pill). Tighten headline tracking. |
| **Scroll-triggered reveal animations** | Sections that fade/slide in on scroll (Intersection Observer) are baseline expected by this audience. A fully static page reads as brochureware to technical buyers. | MEDIUM | Simple `opacity-0 translate-y-4 → opacity-100 translate-y-0` with `transition-all duration-700`. Use Framer Motion or lightweight custom hook. |
| **Mobile nav that feels native** | Current MobileNav exists but needs redesign: full-screen drawer or slide-in sheet with proper backdrop, clear close affordance. | MEDIUM | Full-screen dark overlay with slide-in panel. Proper z-index, backdrop-blur behind nav. |
| **Premium button system** | Buttons must stop looking like Tailwind defaults. Premium: tight `rounded-lg`, proper tracking, subtle ring/glow on primary CTA, clean ghost buttons. | LOW | Three-tier system: primary (solid red with glow), secondary (transparent with border), ghost (text + underline). Consistent padding: `px-6 py-3` sm, `px-8 py-4` lg. |

### Differentiators (Competitive Advantage)

Features that elevate the site from "good dark redesign" to "this company is clearly elite." These are what Linear and Vercel do that most sites don't — and that map especially well to Red-Leader's emergency/rescue brand.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Gradient text on hero headline** | Linear, Vercel, and PlanetScale use `background-clip: text` gradients on hero headlines for drama without imagery. Makes headlines feel designed, not typed. | LOW | `bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent` for main headline. Red gradient variant (`from-red-400 to-red-600`) for the "rescue" accent. Pure CSS, zero performance cost. |
| **Ambient radial glow behind hero** | Vercel, Linear, and Render use a radial color glow on near-black background — creating depth without photography. Ideal for Red-Leader's dark hero and red brand color. | LOW | CSS: `background: radial-gradient(ellipse 900px 500px at 50% 0%, rgba(220,38,38,0.12) 0%, transparent 70%)` behind hero content. Red glow reinforces emergency urgency. |
| **Background noise/texture layer** | Vercel and Linear use an imperceptible SVG noise texture or fine grid pattern at ~3% opacity on near-black. Adds richness and prevents flat "black hole" effect. | LOW | Inline SVG or CSS `background-image` at `opacity: 0.03`. Zero performance cost. Cannot be perceived consciously — only felt as depth. |
| **Oversized stat display** | Stat numbers in massive type (64–80px) with muted descriptor labels below in small/medium weight. Linear-style: the number dominates, the label clarifies. Creates instant "wow" on metrics like "99.9%" or "<2hr". | LOW | CSS-only. SuccessMetrics component needs layout refinement: increase number size to `text-5xl lg:text-7xl`, reduce label to `text-sm font-medium text-gray-500`. |
| **Animated number counters** | Success metrics (99.9% uptime, 2hr response) are key trust signals. Animating them as they scroll into view (0 → 99.9%) creates a moment of engagement instead of static text. | MEDIUM | Intersection Observer + counter animation hook. Worth the effort because the metrics section is already there and the content is strong. |
| **Horizontal rules as design elements** | Top-tier sites use `border-t border-white/[0.06]` as intentional visual section breaks with very low opacity — not `border-gray-200`. Applied between every section. | LOW | Pure CSS change. Current `border-gray-200` on white reads heavy; `border-white/10` on dark reads refined. Significant perceived polish for zero effort. |
| **Glassmorphism on accent elements** | Emergency badge, floating CTAs, notification-style elements look premium with `bg-white/5 backdrop-blur border border-white/10`. Applied sparingly (1–2 elements only) avoids the "glassmorphism overload" trap. | LOW | Apply specifically to the EmergencyBadge component and optionally a floating "Crisis right now?" sticky element. Not to every card. |
| **Red glow on hover states** | Nav links and buttons with `box-shadow: 0 0 20px rgba(220,38,38,0.25)` on hover. The red glow on the emergency CTA button reinforces urgency and is brand-coherent in a way other sites cannot replicate. | LOW | CSS-only. High impact on premium feel. Directly reinforces the emergency brand position. |
| **Bento grid / asymmetric feature layout** | Linear and Vercel use bento-style grids for feature showcases — some cells span 2 columns, some are tall — instead of equal 3-column grids. Creates visual rhythm and importance hierarchy. | MEDIUM | Replace services grid (6 equal cards) with bento: large card (spans 2 cols) for Emergency Recovery (primary service), 4 smaller cards for supporting services. CSS Grid, no library needed. |
| **Pull-quote testimonial design** | Current testimonials are basic shadow cards. Premium: oversized quotation marks (`text-8xl` serif `"`), large quote text (`text-xl`), muted attribution below. Focus on the words, not the container. | LOW | Restyling existing Testimonials component. Data doesn't change. Pure visual uplift. |
| **Monospace/terminal accent elements** | Infrastructure companies (Render, Tailscale) use monospace font snippets or terminal-style badges to signal technical credibility. Even small touches (a "UPTIME: 99.9%" tag in `font-mono`) land this. | MEDIUM | Small terminal-style element in hero or a metrics badge. `font-mono text-xs text-green-400` on dark bg. High signal value for the technical audience. |

### Anti-Features (Commonly Requested, Often Problematic)

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| **Full dark/light mode toggle** | Seems professional; many sites have it | Doubles CSS complexity, creates 50+ edge cases across all components, delays delivery by weeks. The audience (technical CTOs) expects dark-default sites in this category. | Dark-first design. If toggle is ever requested, add as v3+ enhancement after design system is fully stable. |
| **Animated gradient backgrounds (continuous shift)** | Dramatic in prototypes and design mockups | Creates visual noise that fights with content; readable text on shifting backgrounds is nearly impossible. Famous exception: Stripe's gradient — but Stripe has enormous brand equity and 10 years of iteration. | Static radial gradient glow at hero. Let content animate, not the background. |
| **Heavy particle/canvas animations** | Looks impressive in Dribbble-style concepts | Kills performance on mobile, creates accessibility problems (prefers-reduced-motion), and often feels gimmicky rather than premium. Linear and Vercel are restrained with this. | Subtle CSS animations only: gradient shifts, backdrop blur, scroll reveals. No canvas, no WebGL. |
| **Video hero / background video** | Agencies default to this for "impact" | 5–30MB autoplay videos destroy Core Web Vitals (LCP), create GDPR complexity, look dated. None of the reference sites use background video in the hero. | Static hero with ambient radial glow + gradient text achieves more visual interest at zero weight. |
| **Custom cursor** | Shows up in Dribbble-style redesigns as "premium" | Breaks accessibility, confuses users on touch devices, feels try-hard. No reference site uses it. | Invest that effort in better hover state animations on existing interactive elements. |
| **Lottie animations for illustrations** | Designer-friendly, "premium" perception | Lottie files are often 100–500KB each, render at low fidelity on some devices, require runtime library. The SVG illustrations already in the codebase are faster and already on-brand. | Refine existing SVGs with subtle CSS animation (transforms, opacity transitions) for the same feel. |
| **Parallax scrolling effects** | Classic "premium" effect perception | Causes scroll jank on many devices, violates `prefers-reduced-motion`, reads as 2015-era design. Reference sites specifically avoid it. | Scroll-triggered fade/slide reveals (translateY with Intersection Observer) achieve depth without jank. |
| **Chatbot / live chat widget** | "Increases conversions" | Obscures the emergency CTA (the phone number), creates distraction, signals "we don't have real emergency response" when the primary contact method is a chatbot. | The emergency phone number IS the emergency channel. Keep it prominent. No chatbot. |
| **Heavy 3D elements / Three.js scenes** | Startup sites do this for wow factor | Performance cost is brutal; adds maintenance burden; rarely improves conversion for service businesses; feels mismatched with the urgency/reliability brand. | Spend that effort on typography and color — the actual differentiators for premium sites. |

---

## Feature Dependencies

```
[Dark color system]
    └──required by──> [Gradient text on headlines]
    └──required by──> [Ambient radial glow]
    └──required by──> [Border-based card system]
    └──required by──> [Glassmorphism elements]
    └──required by──> [Backdrop blur navigation]
    └──required by──> [Background noise texture]
    └──required by──> [Red glow hover states]
    └──required by──> [Horizontal rule design elements]
    └──required by──> [Terminal accent elements]

[Typography system]
    └──required by──> [Gradient text headline]
    └──required by──> [Oversized stat display]
    └──required by──> [Pull quote testimonials]
    └──required by──> [Section spacing uplift]

[Scroll animation foundation]
    └──required by──> [Animated number counters]
    └──enhances──> [Bento grid layout] (reveals staggered)

[Ambient radial glow] ──enhances──> [Gradient text on headline]
    (glow + gradient text together = hero drama)

[Border card system] ──conflicts──> [Shadow card system]
    (choose one system; mixing breaks visual coherence)

[Background noise texture] ──requires──> [Dark color system]
    (invisible and wrong-looking on white backgrounds)

[Glassmorphism elements] ──requires──> [Dark color system]
    (glass over dark creates depth; glass over white creates mud)

[Bento grid] ──conflicts──> [Equal 3-column services grid]
    (structural swap, not incremental change)
```

### Dependency Notes

- **Dark color system is Phase 1, non-negotiable:** Everything else builds on near-black background. Gradient text, border cards, glassmorphism, glow effects, and noise texture all look wrong or invisible on a light background. This cannot be a parallel track.
- **Typography system is parallel to color system:** Can be built simultaneously with the dark color system. Display font + refined scale + letter-spacing are independent of background color decisions but deliver immediately visible improvement.
- **Scroll animations are independent of structure:** Can be layered at any phase without refactoring other work. Best added after visual design is stable — so animations reveal polished content, not interim styles.
- **Bento grid is a destructuring, not an addition:** Converting the equal services grid to bento requires replacing the layout component. Plan as a deliberate swap, not an incremental change. Pairs well with dark card system since bento cells become dark bordered cards.

---

## MVP Definition

This is a redesign milestone, not greenfield. "MVP" here means the minimum visual uplift that eliminates the "agency template" perception when a CTO lands on the site.

### Phase 1 Must-Have — Foundation (Nothing Else Matters Until This Is Done)

- [ ] **Dark color system** — near-black background (`#09090b`), refined color palette, cascades to all sections
- [ ] **Typography system** — display font + refined scale + tight letter-spacing on headings
- [ ] **Backdrop blur navigation** — replace white opaque header
- [ ] **Gradient text on hero headline** — primary visual differentiator, lowest cost, highest return
- [ ] **Ambient hero glow** — radial gradient behind hero, no imagery needed
- [ ] **Section spacing uplift** — 96–128px between sections (replaces 64–80px)
- [ ] **Border-based card system** — replaces shadow cards site-wide
- [ ] **Button system redesign** — primary (red + glow), secondary (transparent + border), ghost variants

### Phase 2 Refinements — Polish

- [ ] **Oversized stat display** — SuccessMetrics typography refinement
- [ ] **Animated stat counters** — scroll-triggered, metrics section only
- [ ] **Scroll-triggered fade reveals** — all major sections
- [ ] **Bento grid services layout** — replaces equal 3-column grid
- [ ] **Pull-quote testimonials** — restyling existing Testimonials component
- [ ] **Background noise texture** — SVG noise layer at low opacity
- [ ] **Red glow hover states** — nav links, emergency CTA button
- [ ] **Glassmorphism on EmergencyBadge** — single element treatment

### Deferred (v2.x or v3)

- [ ] **Terminal/code aesthetic** — needs content decisions; complex to execute well
- [ ] **Mobile nav full redesign** — current works; premium treatment can follow Phase 2
- [ ] **Dark/light toggle** — only if explicitly requested, only after dark system is complete

---

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Dark color system | HIGH | MEDIUM | P1 |
| Typography system + display font | HIGH | LOW | P1 |
| Gradient text on hero headlines | HIGH | LOW | P1 |
| Ambient hero glow | HIGH | LOW | P1 |
| Backdrop blur navigation | HIGH | LOW | P1 |
| Section spacing uplift | MEDIUM | LOW | P1 |
| Border-based card system | HIGH | LOW | P1 |
| Button system redesign | HIGH | LOW | P1 |
| Oversized stat display | MEDIUM | LOW | P2 |
| Scroll-triggered reveals | MEDIUM | MEDIUM | P2 |
| Animated stat counters | MEDIUM | MEDIUM | P2 |
| Bento grid services | MEDIUM | MEDIUM | P2 |
| Pull quote testimonials | MEDIUM | LOW | P2 |
| Background noise texture | LOW | LOW | P2 |
| Red glow hover states | MEDIUM | LOW | P2 |
| Glassmorphism on EmergencyBadge | LOW | LOW | P2 |
| Terminal/code accent elements | MEDIUM | HIGH | P3 |
| Full dark/light toggle | LOW | HIGH | Do not build |
| Video background | LOW | HIGH | Do not build |
| Canvas/particle animations | LOW | HIGH | Do not build |

**Priority key:**
- P1: Must have — without these, the redesign has not happened
- P2: Should have — significant polish at manageable cost
- P3: Nice to have — evaluate per phase against time budget

---

## Reference Site Analysis

How the six named reference sites achieve their visual quality.

**Confidence: MEDIUM** — Based on training data through August 2025. These sites' fundamental design systems are well-documented across the design community. Individual color tokens may drift over time but the patterns are stable.

| Design Pattern | Linear | Vercel | Stripe | Tailscale | Render |
|----------------|--------|--------|--------|-----------|--------|
| **Background** | `#080808` near-black | `#000` with noise | `#0a2540` dark navy | `#1a1a1a` charcoal | `#0e0e10` near-black |
| **Primary text** | White + muted grays | White + gray-300 | White + gray-400 | White + gray-400 | White + gray-400 |
| **Brand accent** | Purple/violet gradient | White/blue | Purple/indigo | Sky blue | Emerald green |
| **Nav style** | Backdrop blur, very subtle border | Backdrop blur, near-invisible border | Transparent scrolled, blur on scroll | Opaque dark | Backdrop blur |
| **Hero headline** | Gradient text, tight tracking, 72–80px | Gradient text, 64–80px | White bold, very large, wide tracking | White on dark, bold | White on dark, bold |
| **Card style** | Border-only on dark bg | Border + very subtle inner glow | Border + shadow on navy | Border-only | Border-only |
| **Animations** | Subtle fade reveals, no jank | Scroll reveals + glow pulses | Scroll reveals | Minimal | Minimal |
| **Section spacing** | 120–160px | 100–140px | 100–120px | 80–120px | 80–100px |
| **Typography** | Inter Display | Geist | Stripe Sans (custom) | Inter | Inter |
| **Texture** | Subtle noise | Fine noise | None | None | None |

### Key Takeaway for Red-Leader

Red-Leader's brand (deep red accent, near-black, infrastructure/emergency) aligns most closely with **Render and Tailscale** — companies that use restrained, technically credible dark aesthetics without purple gradients. The red accent color is a genuine differentiator: no reference site uses red as their accent. Red on near-black with a red glow is distinctive and directly reinforces the emergency/urgency brand position.

**Do not attempt to copy Stripe's animated gradient** — it requires enormous brand equity and has complex accessibility and performance implications. Do not copy Linear's purple gradient — it would look derivative and off-brand. Red glow IS the brand.

---

## Existing Component Inventory vs. Redesign Scope

| Component | Exists | Redesign Work Needed |
|-----------|--------|----------------------|
| `Header.tsx` | Yes | Major restyle: backdrop blur, dark bg, refined nav links, emergency CTA glow |
| `Footer.tsx` | Yes | Minor: already dark; needs border/spacing refinement, noise texture |
| `MobileNav.tsx` | Yes | Restyle: full-screen dark drawer pattern |
| `SuccessMetrics.tsx` | Yes | Typography refinement: bigger numbers, smaller muted labels, counter animation |
| `ClientLogos.tsx` | Yes | Minor: legibility on dark bg, reduce opacity treatment |
| `Testimonials.tsx` | Yes | Major restyle: pull quote layout, remove shadow cards |
| `Certifications.tsx` | Yes | Minor: legibility on dark, border-card style |
| `EmergencyBadge.tsx` | Yes | Minor: glassmorphism treatment, glow pulse |
| `ContactForm.tsx` | Yes | Restyle: dark input fields, border-based, proper focus states |
| Homepage hero (inline) | Yes | Major: radial glow, gradient text, badge overline |
| Services grid (inline) | Yes | Major: bento grid layout, border cards on dark bg |
| Value props section (inline) | Yes | Major: border cards on dark bg, icon refinement |
| About page sections (inline) | Yes | Moderate: dark section backgrounds, spacing, section borders |
| Service detail pages (inline) | Yes | Moderate: consistent card/section system, dark styling |
| Case study pages (inline) | Yes | Moderate: consistent system |
| Blog pages (inline) | Yes | Moderate: consistent system |

---

## Sources

- Codebase analysis: `/Users/adamdavis/red-leader-website/app/` — read directly (confidence: HIGH)
- Project context: `.planning/PROJECT.md` — read directly (confidence: HIGH)
- Reference sites (Linear, Vercel, Stripe, PlanetScale, Tailscale, Render) — training data through August 2025 (confidence: MEDIUM for patterns; LOW for exact current color tokens)

**Confidence caveat:** WebSearch and WebFetch were unavailable in this session. The design patterns documented here are based on training knowledge of these specific reference sites. These patterns (dark themes, gradient text, backdrop blur, border cards, radial glows, section spacing) are fundamental and thoroughly documented across the design community. They are unlikely to have changed materially. However, exact color values and specific font versions should be verified against current site inspection before implementation.

---

*Feature research for: Visual redesign — premium dark-first marketing site*
*Researched: 2026-03-10*
