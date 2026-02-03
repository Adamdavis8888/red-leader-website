---
phase: 05
plan: 01
subsystem: seo
tags: [seo, sitemap, robots, structured-data, json-ld]
dependency-graph:
  requires: [01-foundation, 02-services, 03-case-studies, 04-blog]
  provides: [sitemap, robots.txt, structured-data]
  affects: [search-engines, crawlers]
tech-stack:
  added: []
  patterns: [Next.js Metadata API, JSON-LD structured data]
key-files:
  created:
    - app/sitemap.ts
    - app/robots.ts
    - app/lib/structured-data.ts
  modified:
    - app/(marketing)/page.tsx
    - app/(marketing)/services/[slug]/page.tsx
    - app/(marketing)/blog/[slug]/page.tsx
    - app/(marketing)/case-studies/[slug]/page.tsx
decisions:
  - id: SEO-01
    decision: Use Next.js Metadata API for sitemap and robots
    rationale: Native Next.js approach, automatic static generation
  - id: SEO-02
    decision: JSON-LD structured data via script injection
    rationale: Google-recommended format, component-based for reuse
  - id: SEO-03
    decision: Schema types Organization, WebSite, Service, Article, BreadcrumbList
    rationale: Comprehensive coverage for business site with blog
metrics:
  duration: 4min
  completed: 2026-02-02
---

# Phase 5 Plan 1: SEO Infrastructure Summary

**One-liner:** Dynamic sitemap/robots.txt generation with JSON-LD structured data for Organization, Service, Article, and Case Study schemas.

## What Was Built

### 1. Dynamic Sitemap Generation (app/sitemap.ts)
- Generates sitemap.xml automatically at build time
- Includes all static pages (home, services, about, contact, blog, case-studies)
- Dynamically adds all 7 service detail pages
- Dynamically adds all 3 case study pages
- Dynamically adds all 3 blog post pages
- Proper priority and changeFrequency settings
- Uses lastModified from blog post publishedAt dates

### 2. Robots.txt Configuration (app/robots.ts)
- Allows all user agents to crawl public content
- Disallows /api/, /_next/, /private/ paths
- Points to sitemap.xml location

### 3. Structured Data Helpers (app/lib/structured-data.ts)
Complete JSON-LD schema generation for:
- **Organization schema**: Company info, contact, 24/7 availability
- **WebSite schema**: Site identity with search action
- **Service schema**: Individual service offerings with features
- **Article schema**: Blog posts with author and publisher info
- **CaseStudy schema**: Case studies as articles with client/industry
- **BreadcrumbList schema**: Navigation breadcrumbs
- **FAQPage schema**: Ready for future FAQ sections
- **LocalBusiness schema**: Alternative for local SEO needs
- **JsonLd component**: Reusable component for script injection

### 4. Page Updates with Structured Data

**Homepage (app/(marketing)/page.tsx)**
- Added Organization schema
- Added WebSite schema

**Service Detail Pages (app/(marketing)/services/[slug]/page.tsx)**
- Added Service schema (dynamically from service data)
- Added BreadcrumbList schema

**Blog Post Pages (app/(marketing)/blog/[slug]/page.tsx)**
- Added Article schema (with author, dates, keywords)
- Added BreadcrumbList schema

**Case Study Pages (app/(marketing)/case-studies/[slug]/page.tsx)**
- Added CaseStudy schema (article format with client info)
- Added BreadcrumbList schema

## Build Verification

Build completed successfully:
- `/sitemap.xml` route generated (static)
- `/robots.txt` route generated (static)
- All 23 pages generated successfully
- No TypeScript errors

## Technical Details

### Schema Coverage
| Page Type | Schemas Applied |
|-----------|----------------|
| Homepage | Organization, WebSite |
| Service Detail | Service, BreadcrumbList |
| Blog Post | Article, BreadcrumbList |
| Case Study | Article (modified), BreadcrumbList |

### Environment Variables
- `NEXT_PUBLIC_SITE_URL`: Base URL for all absolute URLs (default: https://redleader.io)
- `NEXT_PUBLIC_EMERGENCY_PHONE`: Phone number for structured data

### Sitemap Priority Strategy
| Page Type | Priority | Change Frequency |
|-----------|----------|------------------|
| Homepage | 1.0 | weekly |
| Services Index | 0.9 | weekly |
| Case Studies/Blog Index | 0.8 | weekly/daily |
| Contact | 0.8 | monthly |
| Service Details | 0.8 | monthly |
| About | 0.7 | monthly |
| Case Study Details | 0.7 | monthly |
| Blog Posts | 0.6 | yearly |

## Deviations from Plan

None - plan executed exactly as written.

## Files Changed

```
app/sitemap.ts                           (created)
app/robots.ts                            (created)
app/lib/structured-data.ts               (created)
app/(marketing)/page.tsx                 (modified - added structured data)
app/(marketing)/services/[slug]/page.tsx (modified - added structured data)
app/(marketing)/blog/[slug]/page.tsx     (modified - added structured data)
app/(marketing)/case-studies/[slug]/page.tsx (modified - added structured data)
```

## Next Steps

Phase 5 Plan 2: Performance optimization, image optimization, Core Web Vitals improvements.
