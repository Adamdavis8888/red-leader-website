# Requirements: Red Leader Website

**Defined:** 2026-03-10
**Core Value:** Emergency response is the differentiator — when systems are down, Red-Leader fixes them fast.

## v2.0 Requirements

Requirements for visual redesign. Each maps to roadmap phases.

### Color & Foundation

- [ ] **CLR-01**: Site uses near-black background system (#09090b) cascading to all sections
- [ ] **CLR-02**: Complete OKLCH color token system defined in globals.css @theme
- [ ] **CLR-03**: Z-index scale defined as design tokens preventing stacking context conflicts
- [ ] **CLR-04**: Background noise texture (SVG at ~3% opacity) applied for subtle depth

### Typography

- [ ] **TYP-01**: Display font (Inter Display or Geist) loaded via next/font for all headings
- [ ] **TYP-02**: Tight letter-spacing (-0.03em to -0.05em) applied to headings
- [ ] **TYP-03**: Refined type scale with consistent size/weight/spacing across all breakpoints
- [ ] **TYP-04**: Gradient text effect on hero headline (white to gray gradient)

### Navigation & Shell

- [ ] **NAV-01**: Header uses backdrop blur with semi-transparent background and border
- [ ] **NAV-02**: Three-tier button system: primary (red + glow), secondary (transparent + border), ghost
- [ ] **NAV-03**: EmergencyBadge has glassmorphism treatment
- [ ] **NAV-04**: Red glow hover states on nav links and emergency CTA
- [ ] **NAV-05**: Footer redesigned to match dark design system

### Homepage

- [ ] **HOME-01**: Hero section redesigned with ambient red radial glow and badge overline
- [ ] **HOME-02**: Border-based card system replaces all shadow cards site-wide
- [ ] **HOME-03**: Bento grid layout for services section with mixed-size cards
- [ ] **HOME-04**: Oversized stat display (64-80px numbers) in SuccessMetrics
- [ ] **HOME-05**: Pull-quote testimonial styling with oversized quotation marks and glassmorphism cards
- [ ] **HOME-06**: Certifications section as clean horizontal scrolling logo strip

### Animation & Motion

- [ ] **ANIM-01**: Scroll-triggered fade/slide-up reveals on all major sections
- [ ] **ANIM-02**: Animated stat counters that count up when scrolled into view
- [ ] **ANIM-03**: Micro-interaction hover transitions, focus states, and button press feedback site-wide
- [ ] **ANIM-04**: All animations respect prefers-reduced-motion (WCAG AA compliance)

### Interior Pages

- [ ] **PAGE-01**: Services pages updated to dark design system with new tokens
- [ ] **PAGE-02**: About page updated to dark design system with new tokens
- [ ] **PAGE-03**: Contact page updated to dark design system with new tokens
- [ ] **PAGE-04**: Case Studies pages updated to dark design system with new tokens
- [ ] **PAGE-05**: Blog pages updated to dark design system with new tokens

## v1.0 Validated Requirements

Shipped and confirmed in v1.0 and v1.1. See MILESTONES.md for details.

- ✓ Homepage with hero, emergency CTA, services preview, Calendly — v1.0
- ✓ Service detail pages for all 7 services — v1.0
- ✓ About page with story, mission, values, milestones — v1.0
- ✓ Contact page with form — v1.0
- ✓ Case studies with listing and detail pages — v1.0
- ✓ Blog infrastructure — v1.0
- ✓ SEO infrastructure — v1.0
- ✓ Error handling pages — v1.0
- ✓ Mobile-responsive design — v1.0
- ✓ Emergency hotline always visible — v1.0
- ✓ Trust signals (testimonials, certifications, metrics) — v1.0
- ✓ Real branding (logos, phone number, SVG illustrations) — v1.1

## Future Requirements

Deferred to future release. Tracked but not in current roadmap.

### Premium Accents

- **ACC-01**: Terminal/code accent elements on technical pages
- **ACC-02**: Full-screen mobile nav drawer with premium animation

### Lead Nurturing Tools

- **LEAD-01**: Infrastructure health assessment tool (interactive quiz)
- **LEAD-02**: Incident response playbook (gated lead magnet)
- **LEAD-03**: ROI/downtime cost calculator
- **LEAD-04**: Email automation for lead nurturing

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Dark/light mode toggle | Doubles CSS complexity; site is dark-first by design |
| Video backgrounds | Storage/bandwidth costs; CSS effects achieve same premium feel |
| Canvas/WebGL animations | Performance risk; CSS + motion library covers all needed effects |
| Parallax scrolling | Dated pattern; modern sites use scroll-triggered reveals instead |
| Custom cursor | Accessibility concern; no reference site uses this |
| CRM integration | Email-only, can add later |
| Client portal | Focus on acquisition, not retention features |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| CLR-01 | — | Pending |
| CLR-02 | — | Pending |
| CLR-03 | — | Pending |
| CLR-04 | — | Pending |
| TYP-01 | — | Pending |
| TYP-02 | — | Pending |
| TYP-03 | — | Pending |
| TYP-04 | — | Pending |
| NAV-01 | — | Pending |
| NAV-02 | — | Pending |
| NAV-03 | — | Pending |
| NAV-04 | — | Pending |
| NAV-05 | — | Pending |
| HOME-01 | — | Pending |
| HOME-02 | — | Pending |
| HOME-03 | — | Pending |
| HOME-04 | — | Pending |
| HOME-05 | — | Pending |
| HOME-06 | — | Pending |
| ANIM-01 | — | Pending |
| ANIM-02 | — | Pending |
| ANIM-03 | — | Pending |
| ANIM-04 | — | Pending |
| PAGE-01 | — | Pending |
| PAGE-02 | — | Pending |
| PAGE-03 | — | Pending |
| PAGE-04 | — | Pending |
| PAGE-05 | — | Pending |

**Coverage:**
- v2.0 requirements: 28 total
- Mapped to phases: 0
- Unmapped: 28 ⚠️

---
*Requirements defined: 2026-03-10*
*Last updated: 2026-03-10 after initial definition*
