# Phase 6: Design Token Foundation - Research

**Researched:** 2026-03-10
**Domain:** Tailwind v4 @theme, OKLCH color system, next/font Geist, fluid typography, CSS noise texture
**Confidence:** HIGH (verified against installed source files and official docs)

## Summary

Phase 6 establishes the complete dark design system foundation: OKLCH color tokens, z-index scale, type scale, display font loading, and background noise texture — all targeting Tailwind v4's CSS-only `@theme` system.

The project uses Tailwind v4.0.0 (confirmed from installed `node_modules/tailwindcss/package.json`) with Next.js 16.1.6. All design tokens live in `globals.css` @theme — no `tailwind.config.ts` exists and none should be created. Geist Sans and Geist Mono are available directly from `next/font/google` in the installed version of Next.js (confirmed from type definitions in `node_modules/next/dist/compiled/@next/font/dist/google/index.d.ts`). The `geist` npm package is NOT installed and is NOT needed.

The two plans are clean and non-overlapping: 06-01 owns `globals.css` (all tokens, keyframes), and 06-02 owns `layout.tsx` (font loading, HTML class wiring). The existing `globals.css` has only 4 brand color tokens and one keyframe; `layout.tsx` uses Inter via `next/font/google` — both need replacing.

**Primary recommendation:** Use `@theme` (not `@theme inline`) for structural color tokens; use `@theme inline` only for semantic aliases that reference structural tokens, so semantic tokens resolve correctly via CSS variable references.

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `next/font/google` | (built into Next.js 16.1.6) | Geist font loading | Zero-config, self-hosted, no external requests |
| Tailwind v4 `@theme` | 4.0.0 | Design token system | CSS-only config, generates utility classes automatically |
| CSS `oklch()` | Browser native | Color space for all tokens | Tailwind v4 default palette uses OKLCH; perceptually uniform |
| CSS `clamp()` | Browser native | Fluid type scale | Smooth scaling between viewports without breakpoint jumps |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| SVG `feTurbulence` filter | CSS/SVG native | Noise texture | Lightweight, tileable, no image assets needed |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `next/font/google` for Geist | `geist` npm package | npm package not installed; `next/font/google` is already available and recommended |
| OKLCH tokens | hex tokens in @theme | hex works but loses perceptual uniformity; Tailwind v4 default palette uses OKLCH |
| CSS `clamp()` inline | `--text-*` breakpoint variants | clamp is smoother, matches CONTEXT.md decision |

**Installation:** No new packages needed. Geist is already in `next/font/google`. Tailwind v4 is already installed.

## Architecture Patterns

### Recommended File Structure

```
app/
├── globals.css        # ALL tokens: @theme block (colors, type, z-index, animations, keyframes)
└── layout.tsx         # Font loading only: Geist Sans + Geist Mono via next/font/google
```

### Pattern 1: Structural Tokens in @theme, Semantic Aliases in @theme inline

**What:** Structural tokens (gray-100–950, red-50–950) go in `@theme`. Semantic aliases (surface-base, text-primary, border-default) that reference structural tokens go in `@theme inline` so the CSS variable chain resolves correctly in components.

**When to use:** Always — semantic tokens referencing other tokens need `inline` to work across the component tree.

**Example:**
```css
/* Source: Tailwind v4 official docs + tailwindcss/theme.css */
@theme {
  /* Structural tokens — direct values */
  --color-gray-950: oklch(0.141 0.005 285.823);
  --color-gray-900: oklch(0.21 0.006 285.885);
  --color-red-600: oklch(0.577 0.245 27.325);
}

@theme inline {
  /* Semantic aliases — reference structural tokens */
  --color-surface-base: var(--color-gray-950);
  --color-surface-raised: var(--color-gray-900);
  --color-accent: var(--color-red-600);
}
```

### Pattern 2: Font Loading in layout.tsx with CSS Variable Pattern

**What:** Load Geist Sans and Geist Mono as CSS variable fonts, apply both variables to `<html>`, then reference in `@theme` via `@theme inline`.

**When to use:** Always for next/font — this is the established project pattern (currently uses Inter this way).

**Example:**
```tsx
// Source: next/font/google type definitions (installed Next.js 16.1.6)
// Source: nextjs.org/docs/app/building-your-application/optimizing/fonts
import { Geist, Geist_Mono } from 'next/font/google'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

// Apply both variables to <html>
<html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
  <body className="font-sans antialiased">
```

Then in globals.css:
```css
@theme inline {
  /* inline needed so font-sans utility resolves to the injected CSS var */
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}
```

### Pattern 3: Fluid Type Scale with clamp()

**What:** Define `--text-*` tokens using `clamp()` so font size scales smoothly between 375px and 1440px viewports.

**When to use:** For all heading levels per CONTEXT.md decision.

**Clamp formula for linear scaling between two viewport sizes:**
- `clamp(min, preferred-vw, max)`
- preferred-vw = (max - min) / (1440 - 375) * 100vw + (min - (max - min) / (1440 - 375) * 375)

**Hero (36px → 76px):**
```
preferred = (76 - 36) / (1440 - 375) = 40 / 1065 = 3.756vw
offset = 36 - 3.756 * 375 / 100 = 36 - 14.085 ≈ 21.9px
→ clamp(2.25rem, 3.76vw + 1.37rem, 4.75rem)
```

**Example token definition:**
```css
/* Source: CSS clamp() spec + Tailwind v4 --text-* namespace docs */
@theme {
  --text-hero: clamp(2.25rem, 3.76vw + 1.37rem, 4.75rem);
  --text-hero--line-height: 1.05;
  --text-hero--letter-spacing: -0.04em;

  --text-section: clamp(1.5rem, 2.2vw + 0.9rem, 2.5rem);
  --text-section--line-height: 1.1;
  --text-section--letter-spacing: -0.03em;

  --text-subsection: clamp(1.125rem, 1.1vw + 0.8rem, 1.75rem);
  --text-subsection--line-height: 1.2;
  --text-subsection--letter-spacing: -0.02em;

  --text-card-label: clamp(1rem, 0.5vw + 0.85rem, 1.25rem);
  --text-card-label--line-height: 1.3;
}
```

The `--text-{name}--line-height` and `--text-{name}--letter-spacing` sub-tokens are the Tailwind v4 mechanism for bundling line-height and tracking with a font-size token. Using `text-hero` utility applies all three properties.

### Pattern 4: Animation Tokens in @theme with co-located @keyframes

**What:** Define `--animate-*` tokens and their `@keyframes` inside the same `@theme` block. This is how Tailwind v4's own default animations work (confirmed from `node_modules/tailwindcss/theme.css` lines 379-415).

**Example:**
```css
/* Source: node_modules/tailwindcss/theme.css (confirmed pattern) */
@theme {
  --animate-emergency-pulse: emergency-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  --animate-fade-in: fade-in 0.3s ease-out;
  --animate-slide-up: slide-up 0.4s ease-out;

  @keyframes emergency-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes slide-up {
    from { opacity: 0; transform: translateY(0.5rem); }
    to { opacity: 1; transform: translateY(0); }
  }
}
```

### Pattern 5: Z-Index Scale via CSS Custom Properties

**What:** Tailwind v4 does NOT have a `--z-*` or `--z-index-*` namespace in its theme (confirmed: not present in `node_modules/tailwindcss/theme.css`). Z-index in Tailwind v4 is dynamically generated from arbitrary values (z-10, z-50, z-[100] all work without theme config). For a named semantic z-index scale, use plain CSS custom properties in `:root` and reference them with the `z-(<custom-property>)` utility syntax.

**Example:**
```css
/* Source: Tailwind v4 z-index docs + theme.css inspection */
:root {
  --z-base: 0;
  --z-raised: 10;
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-overlay: 300;
  --z-modal: 400;
  --z-toast: 500;
  --z-tooltip: 600;
}
```

Usage in components:
```html
<header class="z-(--z-sticky)">...</header>
<div class="z-(--z-modal)">...</div>
```

Alternatively, define them directly as `@utility` entries:
```css
@utility z-sticky { z-index: 200; }
@utility z-modal { z-index: 400; }
```

### Pattern 6: Noise Texture as SVG Data URI Pseudo-Element

**What:** Apply an `feTurbulence`-based SVG noise as a `::before` pseudo-element overlay at ~3% opacity. This is lighter than an image file and renders without network requests.

**When to use:** On `body` or a full-screen wrapper so it covers every section automatically.

**Example:**
```css
/* Source: ibelick.com/blog/create-grainy-backgrounds-with-css (technique)
   + CSS-Tricks grainy-gradients article */
body::before {
  content: "";
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600'%3E%3Cfilter id='a'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23a)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 200px;
  opacity: 0.03;
  pointer-events: none;
  z-index: 1;
}
```

Key parameters to tune:
- `baseFrequency`: 0.65 produces medium grain; lower = coarser, higher = finer
- `numOctaves`: 3-4 for natural-looking noise
- `background-size`: 200px for a tight tile pattern (avoid visible seams)
- `opacity`: 0.03 (3%) as specified in requirements; bump to 0.05 if not visible enough on dark screens

### Anti-Patterns to Avoid

- **@theme inline for all tokens:** Only use `inline` for semantic aliases. Structural tokens in `inline` lose their CSS variable exposure, breaking runtime customization.
- **Defining z-index in @theme namespace:** There is no `--z-*` namespace in Tailwind v4. Use `:root` variables + `z-(--var)` syntax or `@utility` directives.
- **Keeping `--font-sans: var(--font-inter)` reference:** Must be replaced with `var(--font-geist-sans)` or the font won't change.
- **Mixing structural token values with semantic names:** Keep structural (gray-950) and semantic (surface-base) separate for clarity and future theme flexibility.
- **Gradient text using `bg-gradient-to-r`:** In Tailwind v4, the canonical class is `bg-linear-to-r` (not `bg-gradient-to-r`). Both work but `bg-linear-to-r` is the v4 idiom.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Font loading with CSS variables | Manual @font-face + link tags | `next/font/google` | Automatic self-hosting, zero layout shift, optimal preloading |
| Noise texture as image file | .png/.webp noise texture | SVG data URI feTurbulence | No network request, no image optimization needed, scales infinitely |
| Manual font fallback metrics | Custom font-size-adjust | `next/font` `adjustFontFallback` option (default: true) | Auto-calculates metrics to prevent layout shift |
| OKLCH values by hand | Color math | Look up from `node_modules/tailwindcss/theme.css` | The exact OKLCH values for zinc and red are already there |

**Key insight:** The Tailwind v4 installed `theme.css` is the definitive OKLCH reference for this project. All zinc (neutral gray) and red values can be lifted directly — no conversion tools needed.

## OKLCH Color Reference

Lifted directly from `node_modules/tailwindcss/theme.css` (HIGH confidence — source file):

### Neutral Grays (Zinc scale — pure neutral, no undertone)

| Token | OKLCH | Approx Hex | Use |
|-------|-------|------------|-----|
| zinc-950 | `oklch(0.141 0.005 285.823)` | #09090b | surface-base |
| zinc-900 | `oklch(0.21 0.006 285.885)` | #18181b | surface-raised |
| zinc-800 | `oklch(0.274 0.006 286.033)` | #27272a | surface-elevated |
| zinc-700 | `oklch(0.37 0.013 285.805)` | ~#3f3f46 | border-subtle |
| zinc-600 | `oklch(0.442 0.017 285.786)` | ~#52525b | border-default |
| zinc-500 | `oklch(0.552 0.016 285.938)` | ~#71717a | text-muted |
| zinc-400 | `oklch(0.705 0.015 286.067)` | ~#a1a1aa | text-secondary |
| zinc-300 | `oklch(0.871 0.006 286.286)` | ~#d4d4d8 | text-primary |
| zinc-100 | `oklch(0.967 0.001 286.375)` | ~#f4f4f5 | text-heading |
| zinc-50 | `oklch(0.985 0 0)` | ~#fafafa | text-heading-bright |

### Red Accent (Red scale — brand accent)

| Token | OKLCH | Approx Hex | Use |
|-------|-------|------------|-----|
| red-950 | `oklch(0.258 0.092 26.042)` | ~#450a0a | accent-deep (borders/shadows) |
| red-900 | `oklch(0.396 0.141 25.723)` | ~#7f1d1d | accent-dark (pressed/active) |
| red-600 | `oklch(0.577 0.245 27.325)` | #dc2626 | accent-base (brand red) |
| red-500 | `oklch(0.637 0.237 25.331)` | ~#ef4444 | accent-light (hover) |
| red-100 | `oklch(0.936 0.032 17.717)` | ~#fee2e2 | accent-subtle (glow/bg tint) |

## Common Pitfalls

### Pitfall 1: @theme inline for All Font Tokens

**What goes wrong:** Defining `--font-sans: var(--font-geist-sans)` in plain `@theme` (not inline) causes the CSS variable chain to break in components. The font utility resolves `--font-sans` at the `:root` level where `--font-geist-sans` may not be accessible.

**Why it happens:** Regular `@theme` emits `.font-sans { font-family: var(--font-sans); }`, but `var(--font-sans)` then tries to resolve `var(--font-geist-sans)` at the element level — which works in most cases, but the canonical Next.js pattern using `@theme inline` for font references is more reliable.

**How to avoid:** Use `@theme inline` for font family aliases that reference next/font CSS variables.

**Warning signs:** Body text renders in system sans-serif rather than Geist.

### Pitfall 2: Removing Inter CSS Variable Before layout.tsx Is Updated

**What goes wrong:** If `globals.css` is updated to remove `--font-sans: var(--font-inter)` but `layout.tsx` still injects `--font-inter`, the site renders without any font variable.

**Why it happens:** The two plans touch different files. Order matters.

**How to avoid:** Plan 06-02 (layout.tsx) should be executed AFTER or simultaneously with 06-01 (globals.css). Verify font variable name consistency across both files.

**Warning signs:** Fonts look like system fallback; browser devtools shows `--font-geist-sans` undefined.

### Pitfall 3: Noise Texture z-index Obscures Interactive Elements

**What goes wrong:** The `body::before` noise overlay sits above interactive elements, capturing pointer events or obscuring focus rings.

**Why it happens:** Missing `pointer-events: none` and incorrect z-index stacking.

**How to avoid:** Always add `pointer-events: none` to the noise pseudo-element. Set it to `z-index: 1` and ensure all content wrappers have `position: relative; z-index: 2` or higher. The z-index scale defined in `:root` should start above 1.

**Warning signs:** Buttons/links appear unclickable in overlapping areas.

### Pitfall 4: Background Color Not Cascading to All Sections

**What goes wrong:** Some sections still appear white or light because they have explicit background utilities (`bg-white`, `bg-gray-50`) that override the body background.

**Why it happens:** This phase sets the base background; component-level overrides still exist from v1.x.

**How to avoid:** Apply `background-color: var(--color-surface-base)` to `html, body` in globals.css directly (not via @theme token). The CONTEXT.md is explicit: no raw gray/slate/zinc utilities in component files are migrated in this phase — but the base must be set here.

**Warning signs:** White flash on page load; sections appear light against dark nav.

### Pitfall 5: Clamp Values Producing Unexpected Sizes

**What goes wrong:** Fluid type tokens produce font sizes that are too small on tablet or too large on mid-size viewports.

**Why it happens:** clamp() prefers a linear interpolation, but the formula must be correct. Incorrect vw coefficient or offset results in wrong sizes.

**How to avoid:** Verify each clamp() value at three explicit breakpoints: 375px (should be min), 768px (should be mid-range), 1440px (should be max). Use browser devtools to confirm at each width.

**Warning signs:** Hero headline clips or wraps unexpectedly at 768px.

### Pitfall 6: @keyframes Inside @theme Not Working

**What goes wrong:** Defining `@keyframes` outside `@theme` while referencing `--animate-*` tokens inside `@theme` fails. The keyframe name must be accessible where the animation token references it.

**Why it happens:** Tailwind v4's pattern (confirmed from `theme.css`) is to put `@keyframes` INSIDE the `@theme` block, co-located with `--animate-*` tokens.

**How to avoid:** Move the existing `emergency-pulse` keyframe into `@theme` alongside the `--animate-emergency-pulse` token.

**Warning signs:** Animations defined as `--animate-*` tokens produce no visible animation effect.

## Code Examples

### Complete globals.css Structure

```css
/* Source: Tailwind v4 @theme docs + node_modules/tailwindcss/theme.css pattern */
@import "tailwindcss";

@theme {
  /* ─── Neutral gray scale (zinc — pure neutral) ─── */
  --color-gray-50:  oklch(0.985 0 0);
  --color-gray-100: oklch(0.967 0.001 286.375);
  --color-gray-200: oklch(0.92 0.004 286.32);
  --color-gray-300: oklch(0.871 0.006 286.286);
  --color-gray-400: oklch(0.705 0.015 286.067);
  --color-gray-500: oklch(0.552 0.016 285.938);
  --color-gray-600: oklch(0.442 0.017 285.786);
  --color-gray-700: oklch(0.37 0.013 285.805);
  --color-gray-800: oklch(0.274 0.006 286.033);
  --color-gray-900: oklch(0.21 0.006 285.885);
  --color-gray-950: oklch(0.141 0.005 285.823);

  /* ─── Red accent ramp ─── */
  --color-red-50:  oklch(0.971 0.013 17.38);
  --color-red-100: oklch(0.936 0.032 17.717);
  --color-red-200: oklch(0.885 0.062 18.334);
  --color-red-300: oklch(0.808 0.114 19.571);
  --color-red-400: oklch(0.704 0.191 22.216);
  --color-red-500: oklch(0.637 0.237 25.331);
  --color-red-600: oklch(0.577 0.245 27.325);
  --color-red-700: oklch(0.505 0.213 27.518);
  --color-red-800: oklch(0.444 0.177 26.899);
  --color-red-900: oklch(0.396 0.141 25.723);
  --color-red-950: oklch(0.258 0.092 26.042);

  /* ─── Type scale (fluid) ─── */
  --text-hero: clamp(2.25rem, 3.76vw + 1.37rem, 4.75rem);
  --text-hero--line-height: 1.05;
  --text-hero--letter-spacing: -0.04em;

  --text-section: clamp(1.5rem, 2.2vw + 0.9rem, 2.5rem);
  --text-section--line-height: 1.1;
  --text-section--letter-spacing: -0.03em;

  --text-subsection: clamp(1.125rem, 1.1vw + 0.8rem, 1.75rem);
  --text-subsection--line-height: 1.2;
  --text-subsection--letter-spacing: -0.02em;

  --text-card-label: clamp(1rem, 0.5vw + 0.85rem, 1.25rem);
  --text-card-label--line-height: 1.3;

  /* body base: fixed 18px per CONTEXT.md decision */
  --text-body: 1.125rem;
  --text-body--line-height: 1.7;

  /* ─── Animations + keyframes ─── */
  --animate-emergency-pulse: emergency-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  --animate-fade-in: fade-in 0.3s ease-out both;
  --animate-slide-up: slide-up 0.4s ease-out both;

  @keyframes emergency-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes slide-up {
    from { opacity: 0; transform: translateY(0.5rem); }
    to { opacity: 1; transform: translateY(0); }
  }
}

@theme inline {
  /* Semantic aliases — reference structural tokens above */
  --color-surface-base:    var(--color-gray-950);
  --color-surface-raised:  var(--color-gray-900);
  --color-surface-elevated: var(--color-gray-800);
  --color-border-subtle:   var(--color-gray-700);
  --color-border-default:  var(--color-gray-600);
  --color-text-muted:      var(--color-gray-500);
  --color-text-secondary:  var(--color-gray-400);
  --color-text-primary:    var(--color-gray-300);
  --color-text-heading:    var(--color-gray-100);

  --color-accent-subtle:   var(--color-red-100);
  --color-accent-light:    var(--color-red-500);
  --color-accent:          var(--color-red-600);
  --color-accent-dark:     var(--color-red-900);
  --color-accent-deep:     var(--color-red-950);

  /* Font families — inline needed for CSS var chain resolution */
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

/* ─── Z-index scale ─── */
/* Not in @theme — Tailwind v4 has no --z-* namespace */
/* Use z-(--z-sticky) utility syntax in components */
:root {
  --z-base:     0;
  --z-raised:   10;
  --z-dropdown: 100;
  --z-sticky:   200;
  --z-overlay:  300;
  --z-modal:    400;
  --z-toast:    500;
  --z-tooltip:  600;
}

/* ─── Base styles ─── */
html, body {
  background-color: var(--color-surface-base);
  color: var(--color-text-primary);
}

/* ─── Background noise texture ─── */
body::before {
  content: "";
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600'%3E%3Cfilter id='a'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23a)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 200px;
  opacity: 0.03;
  pointer-events: none;
  z-index: 1;
}
```

### Complete layout.tsx Pattern

```tsx
// Source: next/font/google type definitions (installed Next.js 16.1.6)
// Geist and Geist_Mono confirmed available in node_modules/next/dist/compiled/@next/font/dist/google/
import { Geist, Geist_Mono } from 'next/font/google'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

// Both variables applied to <html> so they are available at :root scope
<html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
  <body className="font-sans antialiased">
```

### Gradient Text (TYP-04)

```html
<!-- Source: Tailwind v4 uses bg-linear-to-r (not bg-gradient-to-r) -->
<h1 class="bg-linear-to-b from-white to-gray-400 bg-clip-text text-transparent">
  Emergency headline
</h1>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `tailwind.config.ts` for tokens | `globals.css @theme` CSS-only | Tailwind v4 (2025) | No JS config; tokens are CSS variables automatically |
| Hex colors in @theme | OKLCH in @theme | Tailwind v4 default palette | Perceptually uniform; matches Tailwind's own defaults |
| `bg-gradient-to-r` | `bg-linear-to-r` | Tailwind v4 | v4 renames gradient utilities |
| `next/font/google` Inter | `next/font/google` Geist | This phase | Brand alignment with Vercel/Linear aesthetic |
| Global keyframes outside @theme | @keyframes inside @theme block | Tailwind v4 | Co-location; keyframes only exist if token referenced |

**Deprecated/outdated:**
- `tailwind.config.ts`: Not used in this project; do not create one.
- `bg-gradient-to-*`: Still works but `bg-linear-to-*` is the v4 canonical form.
- Inter font: Replaced by Geist Sans in this phase per CONTEXT.md decision.

## Open Questions

1. **Noise texture visibility calibration**
   - What we know: 3% opacity is specified; SVG feTurbulence technique is proven
   - What's unclear: Exact opacity may need tuning between 0.02 and 0.05 depending on monitor gamma and real device testing
   - Recommendation: Start at `opacity: 0.03`; plan description should note "visually verify on dark monitor" as acceptance criterion

2. **Gradient text token vs inline utility**
   - What we know: TYP-04 requires gradient text on hero headline
   - What's unclear: Whether to define a reusable `@utility text-gradient` or apply inline Tailwind classes in component
   - Recommendation: Apply as Tailwind utility classes directly on the element in Phase 8 (Homepage) where the hero is redesigned; Phase 6 just needs to ensure the token system supports it (no blocker)

3. **Geist weight preloading**
   - What we know: `weight: 'variable'` loads the variable font (all weights); specific weight array loads only named weights
   - What's unclear: Whether variable font or explicit `['400', '600']` is preferable for performance
   - Recommendation: Use `weight: 'variable'` (or omit weight, which defaults to variable) for Geist Sans since semibold (600) and regular (400) are both needed

## Sources

### Primary (HIGH confidence)

- `node_modules/tailwindcss/theme.css` — Complete OKLCH values for zinc and red scales; confirmed @keyframes-in-@theme pattern; confirmed no z-index namespace
- `node_modules/next/dist/compiled/@next/font/dist/google/index.d.ts` — Confirmed Geist and Geist_Mono available in next/font/google; weight options
- `tailwindcss.com/docs/theme` — @theme directive syntax, namespace list, @theme inline behavior
- `tailwindcss.com/docs/font-size` — --text-* namespace with --line-height and --letter-spacing sub-tokens
- `tailwindcss.com/docs/letter-spacing` — --tracking-* namespace
- `tailwindcss.com/docs/animation` — --animate-* namespace, @keyframes inside @theme

### Secondary (MEDIUM confidence)

- `tailwindcss.com/docs/z-index` — Confirmed z-index uses arbitrary values (z-10, z-50) not theme tokens; z-(--var) syntax
- `github.com/tailwindlabs/tailwindcss/discussions/18031` — z-index in @theme discussion; --z-index-* namespace mentioned but not in installed source
- `ibelick.com/blog/create-grainy-backgrounds-with-css` — SVG feTurbulence noise technique with ::before pseudo-element
- `nextjs.org/docs/app/building-your-application/optimizing/fonts` — Geist as default font in Next.js 15+

### Tertiary (LOW confidence — flag for validation)

- `css-tricks.com/grainy-gradients/` — baseFrequency and numOctaves parameter guidance (not independently verified)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all packages verified against installed node_modules
- OKLCH values: HIGH — lifted directly from installed tailwindcss/theme.css
- Architecture: HIGH — @theme patterns verified from Tailwind official docs
- Z-index approach: MEDIUM — no dedicated theme namespace confirmed from source; `:root` + arbitrary values is the documented alternative
- Noise texture: MEDIUM — technique confirmed from multiple blog sources; exact parameters need visual validation
- Clamp values: MEDIUM — formula is correct but exact values need browser testing at all breakpoints

**Research date:** 2026-03-10
**Valid until:** 2026-04-10 (Tailwind v4 stable; Next.js font API stable)
