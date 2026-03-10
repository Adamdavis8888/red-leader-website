# Codebase Structure

**Analysis Date:** 2026-03-10

## Directory Layout

```
red-leader-website/
├── app/                        # Next.js App Router source code
│   ├── (marketing)/            # Marketing route group (shared layout)
│   │   ├── layout.tsx          # Marketing shell: Header, Footer, EmergencyBadge
│   │   ├── page.tsx            # Home page (/)
│   │   ├── about/              # About page
│   │   ├── contact/            # Contact page with form
│   │   ├── blog/               # Blog listing and detail pages
│   │   │   ├── page.tsx        # Blog listing (/blog)
│   │   │   └── [slug]/         # Dynamic blog post pages
│   │   │       └── page.tsx    # Blog post detail with related posts
│   │   ├── services/           # Services listing and detail pages
│   │   │   ├── page.tsx        # Services listing (/services)
│   │   │   └── [slug]/         # Dynamic service pages
│   │   │       └── page.tsx    # Service detail page
│   │   ├── case-studies/       # Case studies listing and detail pages
│   │   │   ├── layout.tsx      # Case studies layout override
│   │   │   ├── page.tsx        # Case studies listing (/case-studies)
│   │   │   └── [slug]/         # Dynamic case study pages
│   │   │       └── page.tsx    # Case study detail page
│   ├── components/             # Reusable React components
│   │   ├── Header.tsx          # Navigation header (desktop + mobile nav)
│   │   ├── Footer.tsx          # Footer with links and emergency contact
│   │   ├── MobileNav.tsx       # Mobile navigation drawer/menu
│   │   ├── ContactForm.tsx     # Contact form with server action integration
│   │   ├── CalendlyEmbed.tsx   # Calendly booking widget embed
│   │   ├── Testimonials.tsx    # Customer testimonials carousel
│   │   ├── ClientLogos.tsx     # Client logos display
│   │   ├── SuccessMetrics.tsx  # Success metrics cards (response time, uptime, etc.)
│   │   ├── EmergencyBadge.tsx  # Floating emergency call badge
│   │   ├── TeamSection.tsx     # Team member cards
│   │   └── Certifications.tsx  # Certifications/trust badges
│   ├── actions/                # Server actions (form processing)
│   │   └── contact.ts          # Contact form submission: validation + error handling
│   ├── lib/                    # Utility functions and shared code
│   │   ├── schemas.ts          # Zod validation schemas (contactSchema)
│   │   └── structured-data.tsx # JSON-LD schema generators for SEO
│   ├── data/                   # Content data (single source of truth)
│   │   ├── services.ts         # Services catalog with features, capabilities, use cases
│   │   ├── case-studies.ts     # Case study narratives with metrics and testimonials
│   │   ├── blog-posts.ts       # Blog post content with markdown syntax
│   │   ├── team.ts             # Team member information
│   │   ├── company.ts          # Company metadata
│   │   └── trust.ts            # Trust/social proof data (testimonials, logos)
│   ├── layout.tsx              # Root layout: HTML shell, metadata, analytics
│   ├── globals.css             # Tailwind CSS theme variables
│   ├── error.tsx               # Global error boundary component
│   ├── global-error.tsx        # Root-level error boundary
│   ├── not-found.tsx           # 404 page
│   ├── sitemap.ts              # Dynamic sitemap generation (build-time)
│   └── robots.ts               # robots.txt generation
├── public/                     # Static assets
│   └── images/                 # Logo, graphics
├── .planning/                  # GSD documentation
│   ├── codebase/               # Codebase analysis documents
│   ├── phases/                 # Implementation phase plans
│   ├── research/               # Research and requirements
│   └── intel/                  # Entity and domain information
├── next.config.ts              # Next.js configuration
├── tsconfig.json               # TypeScript configuration with @ alias
├── package.json                # Dependencies (Next.js, React, Tailwind, Zod)
├── postcss.config.mjs          # PostCSS with Tailwind plugin
└── postcss.config.mjs          # PostCSS configuration
```

## Directory Purposes

**`app/`:**
- Purpose: Next.js App Router source code. All routes, components, and business logic live here.
- Contains: Pages, layouts, components, actions, utilities, data files
- Key files: `layout.tsx` (root), `(marketing)/layout.tsx` (UI shell)

**`app/(marketing)/`:**
- Purpose: Route group for all marketing pages. Shares Header, Footer, EmergencyBadge layout.
- Contains: Page components for home, about, contact, services, case-studies, blog
- Pattern: Folder names in parentheses don't affect URL routing (Next.js feature)

**`app/components/`:**
- Purpose: Reusable UI components used across multiple pages
- Contains: Functional React components, client or server rendering
- Pattern: PascalCase filenames matching export name (e.g., `Header.tsx` exports `Header` function)

**`app/actions/`:**
- Purpose: Server actions for handling form submissions and server-side logic
- Contains: Functions marked with `'use server'` directive
- Pattern: One file per action (e.g., `contact.ts` handles contact form)

**`app/lib/`:**
- Purpose: Reusable utilities, validators, generators
- Contains: Zod schemas, structured data generators, helper functions
- Pattern: Utility-specific files (e.g., `schemas.ts` for validation, `structured-data.tsx` for JSON-LD)

**`app/data/`:**
- Purpose: Content data as TypeScript/JavaScript files (single source of truth)
- Contains: Exported data arrays and lookup functions
- Pattern: One file per data model (services, case-studies, blog-posts). Files export interfaces + data array + helper functions (getBySlug, getRelated, etc.)

**`public/`:**
- Purpose: Static assets served at root (images, icons, fonts)
- Contains: Images directory with logos and other graphics
- Pattern: Files here are referenced with `/filename` in code

**`.planning/`:**
- Purpose: GSD (Guided Software Development) documentation and phase planning
- Contains: Codebase analysis (ARCHITECTURE.md, STRUCTURE.md, etc.), phase implementation plans, research documents
- Pattern: Hierarchical organization by document type and phase

## Key File Locations

**Entry Points:**
- `app/layout.tsx`: Root HTML structure, metadata, analytics script
- `app/(marketing)/layout.tsx`: Marketing page shell (Header, Footer, EmergencyBadge)
- `app/(marketing)/page.tsx`: Home page

**Configuration:**
- `tsconfig.json`: TypeScript settings, path alias `@/*` points to project root
- `next.config.ts`: Next.js settings (React strict mode enabled)
- `postcss.config.mjs`: PostCSS configuration for Tailwind CSS
- `app/globals.css`: Tailwind theme variables and custom styles

**Core Logic:**
- `app/actions/contact.ts`: Contact form validation and submission handling
- `app/lib/schemas.ts`: Zod validation schemas
- `app/lib/structured-data.tsx`: JSON-LD schema generators for SEO

**Data Models:**
- `app/data/services.ts`: Service offerings (8 services: Emergency Recovery, Cloud Migration, etc.)
- `app/data/case-studies.ts`: Customer success stories (3 case studies)
- `app/data/blog-posts.ts`: Blog post content
- `app/data/team.ts`: Team member information
- `app/data/company.ts`: Company metadata
- `app/data/trust.ts`: Social proof data

**Dynamic Routes:**
- `app/(marketing)/blog/[slug]/page.tsx`: Blog post detail pages (generates static params from blog-posts array)
- `app/(marketing)/services/[slug]/page.tsx`: Service detail pages (generates static params from services array)
- `app/(marketing)/case-studies/[slug]/page.tsx`: Case study detail pages (generates static params from case-studies array)

**Error Handling:**
- `app/error.tsx`: Catch errors in page tree, display friendly message
- `app/global-error.tsx`: Root-level error boundary
- `app/not-found.tsx`: 404 page

**SEO:**
- `app/sitemap.ts`: Generates sitemap.xml from all pages at build time
- `app/robots.ts`: Generates robots.txt file
- `app/lib/structured-data.tsx`: JSON-LD generators injected into page head

## Naming Conventions

**Files:**
- Page components: `page.tsx` (Next.js convention)
- Layouts: `layout.tsx` (Next.js convention)
- Regular components: PascalCase with `.tsx` extension (e.g., `Header.tsx`, `ContactForm.tsx`)
- Data files: camelCase with `.ts` extension (e.g., `blog-posts.ts`, `case-studies.ts`)
- Utility files: descriptive camelCase (e.g., `structured-data.tsx`, `contact.ts`)
- Error files: `error.tsx`, `not-found.tsx`, `global-error.tsx` (Next.js convention)

**Directories:**
- Page groups: PascalCase or kebab-case (e.g., `(marketing)`, `case-studies`)
- Feature directories: kebab-case (e.g., `blog`, `services`)
- Component directories: `components`
- Data directories: `data`
- Utility directories: `lib`, `actions`

**Component Exports:**
- Export function with same name as file: `export function Header() { ... }` from `Header.tsx`
- Use named exports, not default exports (aids tree-shaking and code clarity)

**Data Functions:**
- Lookup by slug: `getBySlug(slug)` or `getBlogPostBySlug(slug)`
- Get related items: `getRelated(item)` or `getRelatedServices(service)`
- Get filtered set: `get{Plural}(filter?)` e.g., `getCrisisTypes()`, `getIndustries()`

## Where to Add New Code

**New Feature (e.g., new page):**
- Primary code: Create folder in `app/(marketing)/[feature-name]/page.tsx`
- If it's a dynamic route: Create `app/(marketing)/[feature-name]/[slug]/page.tsx` with `generateStaticParams()`
- Data source: Add data to existing file in `app/data/` or create new file (e.g., `app/data/new-content.ts`)
- Structured data: Add generator function to `app/lib/structured-data.tsx`
- Sitemap: Sitemap generation in `app/sitemap.ts` automatically picks up new routes via data arrays

**New Component:**
- Location: `app/components/[ComponentName].tsx`
- Pattern: Use named export (`export function ComponentName()`)
- Client-side state: Add `'use client'` directive at top if using hooks
- Server actions: Import from `app/actions/` if needed
- Styling: Use Tailwind classes with custom theme variables (brand colors, etc.)

**New Server Action:**
- Location: `app/actions/[action-name].ts`
- Pattern: Add `'use server'` at file top, export async function
- Validation: Use Zod schema from `app/lib/schemas.ts` or create new schema
- Return type: Define explicit return type (e.g., `Promise<{ success: boolean; error?: string }>`)
- Error handling: Return error objects for user display, not thrown errors

**New Utility/Helper:**
- Shared schema: Add to `app/lib/schemas.ts`
- Structured data generator: Add function to `app/lib/structured-data.tsx`
- General utilities: Create new file in `app/lib/` if domain-specific

**New Data Content:**
- Services/case-studies/blog posts: Add to existing array in `app/data/[type].ts`
- New data type: Create new file in `app/data/[type].ts` with interface + array + lookup functions
- Metadata: Add to `app/data/company.ts` or appropriate domain file

## Special Directories

**`.planning/`:**
- Purpose: GSD (Guided Software Development) documentation
- Generated: Created by GSD orchestrator, not hand-written
- Committed: Yes, tracked in git
- Contents: Phase plans, codebase analysis docs, research notes

**`public/`:**
- Purpose: Static assets served at root path
- Generated: No (manually maintained)
- Committed: Yes
- Contents: Images, logos, potentially favicons

**`.next/`:**
- Purpose: Next.js build output and cache
- Generated: Yes, by `npm run build`
- Committed: No (in .gitignore)
- Contents: Production build, dev server cache, type definitions

**`node_modules/`:**
- Purpose: Installed npm dependencies
- Generated: Yes, by `npm install` from package-lock.json
- Committed: No (in .gitignore)
- Contents: All dependency code

---

*Structure analysis: 2026-03-10*
