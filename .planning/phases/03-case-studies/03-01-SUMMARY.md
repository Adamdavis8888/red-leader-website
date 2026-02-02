---
phase: 03-case-studies
plan: 01
subsystem: case-studies
tags: [case-studies, filtering, data-layer, typescript]

dependency-graph:
  requires:
    - 01-foundation (base layout, styling, navigation)
    - 02-trust-building (design patterns for data files and listings)
  provides:
    - Case study data layer with TypeScript interfaces
    - Case studies listing page with filtering
    - Helper functions for case study retrieval
  affects:
    - 03-02 (case study detail pages will use this data)
    - Navigation (may need case studies link in header/footer)

tech-stack:
  added: []
  patterns:
    - Client component for interactive filtering (useState)
    - Layout file for metadata with client components
    - Helper functions for data queries (getCrisisTypes, getIndustries)
    - line-clamp-3 for text truncation

key-files:
  created:
    - app/data/case-studies.ts
    - app/(marketing)/case-studies/page.tsx
    - app/(marketing)/case-studies/layout.tsx
  modified: []

decisions:
  - name: "Client component for filtering"
    rationale: "useState required for interactive filter state"
    pattern: "Use layout.tsx for metadata when page needs 'use client'"
  - name: "Separate layout for metadata"
    rationale: "Next.js App Router client components cannot export metadata"
    pattern: "Create layout.tsx alongside page.tsx for metadata"
  - name: "line-clamp-3 for problem summary"
    rationale: "Consistent card heights while showing meaningful preview"
    pattern: "Tailwind line-clamp utility for text truncation"

metrics:
  duration: 3min
  completed: 2026-02-02
---

# Phase 03 Plan 01: Case Study Data + Listing Page Summary

Case study data layer with 3 compelling case studies and interactive listing page with filtering by crisis type and industry.

## What Was Built

### Case Study Data (app/data/case-studies.ts)

TypeScript interfaces and data for 3 case studies:

1. **E-commerce Database Recovery** (Database Failure, E-commerce)
   - Fortune 500 retailer, Black Friday PostgreSQL corruption
   - Metrics: 4 hrs recovery, $8.4M saved, 0 data loss, 99.99% uptime after

2. **Financial Platform Cloud Migration** (Cloud Migration, Financial Services)
   - Regional bank, zero-downtime AWS migration
   - Metrics: 0 min downtime, 40% cost reduction, 6 weeks duration, 5x scale

3. **Healthcare System Ransomware Recovery** (Security Incident, Healthcare)
   - 12-hospital network, ransomware attack
   - Metrics: 18 hrs to critical systems, $0 ransom, 100% recovered, HIPAA compliant

Helper functions exported:
- `getCaseStudyBySlug(slug)` - Find case study by URL slug
- `getCrisisTypes()` - Get unique crisis types for filtering
- `getIndustries()` - Get unique industries for filtering
- `getRelatedCaseStudies(caseStudy)` - Find related by shared services

### Listing Page (app/(marketing)/case-studies/page.tsx)

- **Hero section:** Dark background with title and subtitle
- **Sticky filter bar:** Crisis type and industry pill buttons
- **Case study grid:** 3-column on lg, 2-column on md, 1-column on mobile
- **Card content:** Badges, client name, title, problem summary, key metrics, CTA link
- **Bottom CTA:** "Have a Similar Challenge?" with contact/booking buttons

### Layout (app/(marketing)/case-studies/layout.tsx)

Separate layout file for metadata since page.tsx uses 'use client'.

## Technical Decisions

| Decision | Rationale |
|----------|-----------|
| Client component for page | Interactive filtering requires useState |
| Layout.tsx for metadata | Client components can't export metadata |
| line-clamp-3 for summaries | Consistent card heights with meaningful preview |
| Pill button filters | Visual consistency with active state styling |

## Commits

| Commit | Description |
|--------|-------------|
| 178a381 | feat(03-01): add case study data with TypeScript interfaces |
| f3427ac | feat(03-01): add case studies listing page with filtering |

## Verification

- [x] TypeScript compilation: `npx tsc --noEmit` passes
- [x] Build succeeds: `npm run build` completes without errors
- [x] Page accessible at /case-studies
- [x] All 3 case studies visible on page
- [x] Crisis type filter works (clicking shows filtered subset)
- [x] Industry filter works (clicking shows filtered subset)
- [x] Cards link to /case-studies/[slug] (will 404 until Plan 02)

## Deviations from Plan

None - plan executed exactly as written.

## Next Phase Readiness

Ready for Plan 03-02 (Case Study Detail Pages):
- Case study data file created with full content
- Helper functions ready for use (getCaseStudyBySlug, getRelatedCaseStudies)
- Linking pattern established (cards link to /case-studies/[slug])
