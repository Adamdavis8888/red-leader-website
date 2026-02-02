---
phase: 3
plan: 2
subsystem: case-studies
tags: [dynamic-routes, generateStaticParams, breadcrumb, prev-next-nav]
dependency-graph:
  requires: [03-01]
  provides: [case-study-detail-pages, prev-next-navigation]
  affects: [05-seo]
tech-stack:
  patterns: [dynamic-routes, static-generation, prev-next-navigation]
key-files:
  created:
    - app/(marketing)/case-studies/[slug]/page.tsx
decisions:
  - id: prev-next-from-array-index
    choice: Calculate prev/next from caseStudies array index
    reason: Simple and deterministic navigation order
metrics:
  duration: 3min
  completed: 2026-02-02
---

# Phase 3 Plan 2: Case Study Detail Pages Summary

**One-liner:** Dynamic case study detail pages with generateStaticParams, metrics bar, challenge/solution/outcome sections, quick facts sidebar, and prev/next navigation.

## What Was Built

### 1. Dynamic Route with Static Generation
- Created `/app/(marketing)/case-studies/[slug]/page.tsx`
- `generateStaticParams()` pre-renders all 3 case studies at build time
- `export const dynamic = 'force-static'` ensures static output
- `generateMetadata()` provides per-page SEO (title, description from tagline)

### 2. Breadcrumb Navigation
- Sticky breadcrumb bar below header: Home > Case Studies > [Title]
- Truncated title to 200px for long case study names
- Consistent with marketing site navigation patterns

### 3. Hero Section
- Dark background (`bg-brand-dark`) with white text
- Crisis type badge (red) and industry badge (white/transparent)
- Client name, title, and tagline prominently displayed

### 4. Metrics Bar
- Full-width red bar immediately below hero
- Displays all 4 metrics from case study data
- High-contrast white text on brand-red background
- Grid layout: 2 columns on mobile, 4 on desktop

### 5. Challenge/Solution/Outcome Sections
- Two-column layout with icon badges (red/blue/green)
- Challenge section with warning icon
- Solution section with gear icon
- Outcome section with checkmark icon
- Client testimonial with quote styling and author avatar

### 6. Sidebar with Quick Facts
- Sticky sidebar on desktop (top-24 offset)
- Client, Industry, Crisis Type, Timeline fields
- Services Used as clickable links to service pages
- CTA section: "Facing a Similar Challenge?" with Contact/Book buttons

### 7. Prev/Next Navigation
- Previous case study (left) and next case study (right)
- Based on array index position in caseStudies
- Graceful handling when at first/last item
- Hover color transition to brand-red

### 8. Related Case Studies
- Shows case studies that share at least one service
- Two-column grid with hover shadow effect
- Badges, client, title, tagline, and "Read Case Study" link
- Only renders when related case studies exist

## Technical Details

### Static Params
```typescript
export function generateStaticParams() {
  return caseStudies.map((caseStudy) => ({
    slug: caseStudy.slug,
  }))
}
```

### Routes Generated
- `/case-studies/ecommerce-database-recovery`
- `/case-studies/financial-cloud-migration`
- `/case-studies/healthcare-ransomware-recovery`

## Build Verification

```
Route (app)
├ ● /case-studies/[slug]
│ ├ /case-studies/ecommerce-database-recovery
│ ├ /case-studies/financial-cloud-migration
│ └ /case-studies/healthcare-ransomware-recovery
```

All pages statically generated via SSG.

## Deviations from Plan

None - plan executed exactly as written.

## Decisions Made

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Prev/Next source | Array index from caseStudies | Simple, deterministic, no need for date sorting |
| Testimonial display | Inline with initials avatar | Matches team section pattern, no external images needed |
| Related filtering | By shared services | Logical connection, already in data structure |

## Phase 3 Status

- [x] 03-01: Case study data layer + listing page
- [x] 03-02: Case study detail pages

**Phase 3 Complete** - All case studies infrastructure built.
