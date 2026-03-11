# Roadmap: Red Leader Website

## Milestones

- ✅ **v1.0 Foundation Build** - Phases 1-5 (shipped 2026-02-03)
- ✅ **v1.1 Branding Refresh** - Shipped as a single changeset (2026-03-10)
- 🚧 **v2.0 Visual Redesign** - Phases 6-10 (in progress)

## Phases

<details>
<summary>✅ v1.0 Foundation Build (Phases 1-5) - SHIPPED 2026-02-03</summary>

### Phase 1: Foundation & Core Conversion
**Goal**: Establish working Next.js architecture with immediate lead capture capability
**Plans**: 5 plans

Plans:
- [x] 01-01-PLAN.md — Project setup with Next.js 16 and Tailwind v4
- [x] 01-02-PLAN.md — Layout components (Header, Footer, EmergencyBadge, MobileNav)
- [x] 01-03-PLAN.md — Homepage with hero section and Calendly booking
- [x] 01-04-PLAN.md — Services overview page with all offerings
- [x] 01-05-PLAN.md — Contact page with form and multiple contact methods

### Phase 2: Trust Building & Detail Pages
**Goal**: Provide depth and proof needed to convert skeptical enterprise buyers
**Plans**: 4 plans

Plans:
- [x] 02-01-PLAN.md — Service detail pages with dynamic routes for 7 services
- [x] 02-02-PLAN.md — About page with company story and mission
- [x] 02-03-PLAN.md — Team section with bios and credentials
- [x] 02-04-PLAN.md — Trust signals (logos, testimonials, certifications, metrics)

### Phase 3: Case Studies
**Goal**: Demonstrate expertise through portfolio of client successes with quantified results
**Plans**: 2 plans

Plans:
- [x] 03-01-PLAN.md — Case study data and listing page with filtering
- [x] 03-02-PLAN.md — Case study detail pages with dynamic routes

### Phase 4: Blog
**Goal**: Establish thought leadership and SEO foundation through technical content
**Plans**: 2 plans

Plans:
- [x] 04-01-PLAN.md — Blog data and listing page
- [x] 04-02-PLAN.md — Blog post detail pages with 3 technical articles

### Phase 5: Optimization & Polish
**Goal**: Achieve production-ready performance, SEO excellence, and conversion optimization
**Plans**: 3 plans

Plans:
- [x] 05-01-PLAN.md — SEO (sitemap, robots.txt, structured data, meta tags)
- [x] 05-02-PLAN.md — Error handling (404 page, error boundaries)
- [x] 05-03-PLAN.md — Analytics (Plausible integration)

</details>

---

### 🚧 v2.0 Visual Redesign (In Progress)

**Milestone Goal:** Full visual refresh to premium dark-first aesthetic — eliminating the agency-template look and replacing it with the visual language of Linear, Vercel, and Render. Every page updated to a cohesive design system built on design tokens, refined typography, and subtle motion.

#### Phase 6: Design Token Foundation
**Goal**: Establish the complete dark design system that every subsequent phase depends on
**Depends on**: Phase 5
**Requirements**: CLR-01, CLR-02, CLR-03, CLR-04, TYP-01, TYP-02, TYP-03, TYP-04
**Success Criteria** (what must be TRUE):
  1. The site background is near-black (#09090b) across all pages — no white or light sections remain
  2. All heading text renders in the display font (Inter Display or Geist) with tight letter-spacing (-0.03em to -0.05em)
  3. The type scale is visually consistent at mobile (375px), tablet (768px), and desktop (1440px) breakpoints
  4. A background noise texture at ~3% opacity is visible on all full-screen sections, adding depth without distraction
  5. The complete OKLCH color token system and z-index scale are defined in globals.css @theme and no raw Tailwind gray/slate/zinc utilities appear in component files
**Plans**: 2 plans

Plans:
- [x] 06-01-PLAN.md — globals.css @theme: OKLCH color system, semantic aliases, type scale, z-index, animations, noise texture
- [x] 06-02-PLAN.md — layout.tsx: Geist Sans + Geist Mono font loading, gradient text verification

#### Phase 7: Global Shell Redesign
**Goal**: The site's persistent chrome (header, footer, emergency elements) communicates premium and urgency on every page
**Depends on**: Phase 6
**Requirements**: NAV-01, NAV-02, NAV-03, NAV-04, NAV-05
**Success Criteria** (what must be TRUE):
  1. The header uses backdrop blur with a semi-transparent background — the page content is visible through it as the user scrolls
  2. Three distinct button styles are visually distinguishable: primary (red with glow), secondary (transparent with border), ghost (text only)
  3. The EmergencyBadge has a glassmorphism treatment — it looks like frosted glass floating above the page
  4. Hovering nav links and the emergency CTA produces a red glow effect
  5. The footer matches the dark design system with no white or light backgrounds
**Plans**: TBD

Plans:
- [ ] 07-01: Header redesign — backdrop blur, nav link hover states, button system
- [ ] 07-02: EmergencyBadge glassmorphism, Footer dark redesign

#### Phase 8: Homepage Redesign
**Goal**: The homepage delivers an immediate premium impression that makes a CTO feel they have reached the right place in a crisis
**Depends on**: Phase 7
**Requirements**: HOME-01, HOME-02, HOME-03, HOME-04, HOME-05, HOME-06
**Success Criteria** (what must be TRUE):
  1. The hero headline uses a white-to-gray gradient text effect and is set against an ambient red radial glow background
  2. The services section uses a bento grid layout with mixed-size cards rather than a uniform column grid
  3. Success metrics display at 64-80px number size — the numbers are the dominant visual element in that section
  4. Testimonials use a pull-quote layout with oversized quotation marks and glassmorphism card treatment
  5. The certifications section is a clean horizontal logo strip — no borders, backgrounds, or credential text
  6. All cards across the page use border-based styling — no box shadows
**Plans**: TBD

Plans:
- [ ] 08-01: Hero section — radial glow, gradient text, badge overline
- [ ] 08-02: Services bento grid, border card system site-wide
- [ ] 08-03: SuccessMetrics oversized stats, Testimonials pull-quote, Certifications logo strip

#### Phase 9: Animation & Motion Layer
**Goal**: The site feels alive with purposeful motion that guides attention without distracting or harming accessibility
**Depends on**: Phase 8
**Requirements**: ANIM-01, ANIM-02, ANIM-03, ANIM-04
**Success Criteria** (what must be TRUE):
  1. Major sections fade and slide up into view as the user scrolls down — elements above the fold are always visible immediately
  2. The success metric numbers count up from zero when scrolled into view
  3. All interactive elements (buttons, cards, nav links) respond to hover and focus with visible micro-interactions
  4. Enabling "Reduce Motion" in macOS System Preferences disables all animations — no motion plays in any browser on the same machine
**Plans**: TBD

Plans:
- [ ] 09-01: AnimateOnScroll component, scroll-triggered reveals site-wide
- [ ] 09-02: Animated stat counters, micro-interaction hover and focus states, reduced-motion audit

#### Phase 10: Interior Pages
**Goal**: Every page on the site feels like it belongs to the same premium design system as the homepage
**Depends on**: Phase 9
**Requirements**: PAGE-01, PAGE-02, PAGE-03, PAGE-04, PAGE-05
**Success Criteria** (what must be TRUE):
  1. The services pages use the dark design system — no light backgrounds, cards use border treatment, headings use the display font
  2. The about page uses the dark design system — no light backgrounds, team illustration is styled consistently
  3. The contact page uses the dark design system — the form fields and labels are legible against the dark background
  4. Case study pages use the dark design system — result metrics are visually prominent
  5. Blog pages use the dark design system — body text is readable at comfortable contrast against the dark background
**Plans**: TBD

Plans:
- [ ] 10-01: Services pages dark system update
- [ ] 10-02: About and Contact pages dark system update
- [ ] 10-03: Case Studies and Blog pages dark system update

## Progress

**Execution Order:**
Phases execute in numeric order: 6 → 7 → 8 → 9 → 10

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 1. Foundation & Core Conversion | v1.0 | 5/5 | Complete | 2026-02-02 |
| 2. Trust Building & Detail Pages | v1.0 | 4/4 | Complete | 2026-02-02 |
| 3. Case Studies | v1.0 | 2/2 | Complete | 2026-02-02 |
| 4. Blog | v1.0 | 2/2 | Complete | 2026-02-02 |
| 5. Optimization & Polish | v1.0 | 3/3 | Complete | 2026-02-02 |
| 6. Design Token Foundation | v2.0 | 2/2 | Complete | 2026-03-10 |
| 7. Global Shell Redesign | v2.0 | 0/2 | Not started | - |
| 8. Homepage Redesign | v2.0 | 0/3 | Not started | - |
| 9. Animation & Motion Layer | v2.0 | 0/2 | Not started | - |
| 10. Interior Pages | v2.0 | 0/3 | Not started | - |

---
*Created: 2026-02-01*
*Updated: 2026-03-10 — v2.0 phases 6-10 added*
