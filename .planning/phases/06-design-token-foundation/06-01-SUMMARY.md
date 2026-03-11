---
phase: 06-design-token-foundation
plan: 01
subsystem: ui
tags: [tailwind-v4, oklch, css-design-tokens, fluid-typography, clamp, dark-mode, noise-texture]

requires: []
provides:
  - Complete OKLCH color token system (22 tokens: gray-50–950 + red-50–950) in @theme
  - Semantic color aliases in @theme inline (surface, border, text, accent layers)
  - Fluid type scale (hero, section, subsection, card-label, body) with clamp() and letter-spacing sub-tokens
  - Z-index scale (8 named levels) in :root
  - Animation tokens (emergency-pulse, fade-in, slide-up) with co-located @keyframes in @theme
  - Near-black background (#09090b / gray-950) on html and body
  - SVG feTurbulence noise texture at 3% opacity on body::before
affects:
  - 06-02-layout-font-loading
  - 07-navigation-redesign
  - 08-homepage-redesign
  - 09-animation-pass
  - 10-component-migration

tech-stack:
  added: []
  patterns:
    - "Structural tokens in @theme, semantic aliases in @theme inline (CSS var chain resolution)"
    - "Fluid type scale using clamp() with --text-{name}--line-height and --text-{name}--letter-spacing sub-tokens"
    - "@keyframes co-located inside @theme block alongside --animate-* tokens"
    - "Z-index scale in :root (not @theme), consumed via z-(--z-sticky) Tailwind v4 syntax"
    - "SVG feTurbulence data URI as body::before noise overlay with pointer-events: none"

key-files:
  created: []
  modified:
    - app/globals.css

key-decisions:
  - "Zinc scale used for gray tokens (pure neutral, no undertone) — maps to #09090b base"
  - "Red-600 oklch(0.577 0.245 27.325) = #dc2626 brand accent, Red-500 = hover state"
  - "@theme inline required for semantic aliases and font family references to resolve CSS var chains correctly"
  - "Z-index scale in :root not @theme — Tailwind v4 has no --z-* theme namespace"

patterns-established:
  - "OKLCH structural tokens in @theme generate Tailwind utilities (e.g. bg-gray-950, text-red-600)"
  - "Semantic aliases in @theme inline allow bg-surface-base, text-text-primary, border-border-default utilities"
  - "Type tokens: text-hero applies font-size + line-height + letter-spacing simultaneously"

requirements-completed:
  - CLR-01
  - CLR-02
  - CLR-03
  - CLR-04
  - TYP-02
  - TYP-03

duration: 2min
completed: 2026-03-10
---

# Phase 6 Plan 01: Design Token Foundation Summary

**OKLCH 22-token color system (zinc grays + red accent), fluid 5-level type scale with clamp(), z-index scale, 3 animation tokens, near-black base background, and SVG noise texture — complete dark design foundation in globals.css**

## Performance

- **Duration:** ~2 min
- **Started:** 2026-03-11T05:44:54Z
- **Completed:** 2026-03-11T05:46:28Z
- **Tasks:** 2
- **Files modified:** 1

## Accomplishments

- Full OKLCH color token system: 11 zinc grays (gray-50–950) + 11 reds (red-50–950) = 22 structural tokens in @theme; 14 semantic aliases in @theme inline
- Fluid type scale with 5 levels (hero 36–76px, section, subsection, card-label, body 18px fixed) using clamp() with Tailwind v4 sub-token convention for line-height and letter-spacing
- 3 animation tokens (emergency-pulse, fade-in, slide-up) with @keyframes co-located inside @theme; 8-level z-index scale in :root
- Near-black (#09090b) background on html+body; SVG feTurbulence noise overlay at 3% opacity with pointer-events: none

## Task Commits

1. **Task 1: OKLCH color system, type scale, z-index, and animation tokens** - `71c1048` (feat)
2. **Task 2: Background noise texture overlay** - `3165ffc` (feat)

## Files Created/Modified

- `app/globals.css` — Complete design token foundation replacing 4-token stub with 100+ token system

## Decisions Made

- Zinc scale used for gray tokens (pure neutral, no color cast — consistent with #09090b base)
- @theme inline required for semantic aliases and --font-sans/--font-mono so CSS var chains resolve in components
- Z-index scale placed in :root (not @theme) — Tailwind v4 theme.css has no --z-* namespace; consumed via z-(--z-sticky) syntax
- Old brand tokens (brand-red, brand-dark, brand-gray) and font-inter reference fully removed

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

Build lock conflict on first attempt (another `next build` process running) — killed existing process, retried successfully.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- All design tokens are in place; phases 7–10 can reference bg-surface-base, text-text-primary, border-border-default, text-hero, z-(--z-sticky), animate-fade-in etc.
- Phase 06-02 (layout font loading) must run next — font CSS vars (--font-geist-sans, --font-geist-mono) are referenced in @theme inline but not yet injected by layout.tsx; site currently falls back to system sans-serif until that plan completes
- Noise texture opacity (0.03) is a starting point — visual calibration on real devices recommended during Phase 8 (homepage)

---
*Phase: 06-design-token-foundation*
*Completed: 2026-03-10*
