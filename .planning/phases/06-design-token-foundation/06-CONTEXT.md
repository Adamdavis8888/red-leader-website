# Phase 6: Design Token Foundation - Context

**Gathered:** 2026-03-10
**Status:** Ready for planning

<domain>
## Phase Boundary

Establish the complete dark design system that every subsequent phase (7-10) depends on: OKLCH color token system, z-index scale, display font loading, type scale, noise texture, and background application. No component redesigns — just the foundation tokens and font infrastructure.

</domain>

<decisions>
## Implementation Decisions

### Display Font
- Geist Sans as the sole typeface for headings AND body text — replaces Inter entirely
- Geist Mono loaded for code snippets and technical accents
- Load both via next/font (Geist is available as next/font/local or via next/font/google)
- Heading weight: semibold (600) with tight letter-spacing (-0.03em to -0.05em)

### Type Scale
- Fluid scaling using CSS clamp() — no breakpoint-based size jumps
- Hero headline: 72-80px at desktop (1440px), scaling down to ~36px at mobile (375px)
- Body text base: 18px (1.125rem) for comfortable dark-background reading
- 4 heading levels: Hero (72-80px), Section (36-48px), Subsection (24-30px), Card/label (18-20px)
- Define as @theme tokens so Tailwind utilities reference them

### OKLCH Color Palette
- Pure neutral grays (no blue/warm undertone) — consistent with #09090b base
- 3 surface levels: base (#09090b), raised (~#18181b), elevated (~#27272a)
- 5-shade red accent ramp: subtle (glow/bg tint), light (hover), base (#dc2626), dark (pressed/active), deep (borders/shadows)
- Red is the sole brand accent — no secondary accent colors
- Both structural (gray-100–900, red-100–900) AND semantic aliases (surface-base, text-primary, border-default) defined in @theme
- All tokens in OKLCH color space
- No raw Tailwind gray/slate/zinc utilities in component files after this phase's tokens are defined (component migration happens in later phases)

### Claude's Discretion
- Exact OKLCH values for each token (as long as they map to the specified hex anchors)
- Z-index scale structure and values
- Animation keyframe definitions in globals.css
- Noise texture implementation (SVG data URI vs CSS pattern, exact opacity tuning around 3%)
- How to structure the @theme block organization (grouping, comments)

</decisions>

<specifics>
## Specific Ideas

- Reference sites for the visual feel: Linear, Vercel, Render — premium dark-first aesthetic
- Geist chosen specifically because it was designed for dark interfaces and is used by the reference sites
- The 18px body size is intentional for dark background readability — don't shrink it
- Fluid clamp() chosen to avoid jarring size jumps — the scale should feel smooth as viewport changes

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `globals.css`: Already has @theme block with 4 brand color tokens and emergency-pulse keyframe — will be expanded significantly
- `layout.tsx`: Already uses next/font/google for Inter with CSS variable pattern — swap to Geist using same pattern

### Established Patterns
- Tailwind v4 CSS-only config (no tailwind.config.ts) — all tokens go in @theme block in globals.css
- CSS variable pattern for fonts: `--font-inter` referenced in @theme as `--font-sans`
- body applies `font-sans antialiased` classes

### Integration Points
- `layout.tsx` font loading: Replace Inter import with Geist Sans + Geist Mono imports
- `globals.css` @theme: Expand from 4 tokens to full color system, type scale, z-index
- 68 raw Tailwind gray/white utility usages across 19 component files — these will be migrated to semantic tokens in Phases 7-10, not in this phase

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 06-design-token-foundation*
*Context gathered: 2026-03-10*
