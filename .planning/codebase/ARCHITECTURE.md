# Architecture

**Analysis Date:** 2026-03-10

## Pattern Overview

**Overall:** Next.js 16 static site generation (SSG) with server actions and client interactivity

**Key Characteristics:**
- Next.js App Router with (marketing) layout group for consistent UI shell
- Static page generation with `force-static` export policy
- Content-driven architecture: data files as single source of truth
- Server actions for form handling with Zod schema validation
- Structured Data (JSON-LD) generation for SEO at page level
- Tailwind CSS v4 with custom theme variables for brand consistency

## Layers

**Presentation Layer:**
- Purpose: Render UI components and pages for user interaction
- Location: `app/components/` and `app/(marketing)/`
- Contains: Page components (`.tsx`), reusable UI components, page layouts
- Depends on: Data layer for content, lib utilities for schema and structured data
- Used by: Next.js routing system

**Data Layer:**
- Purpose: Define and provide content models and data structures
- Location: `app/data/`
- Contains: Data files exporting TypeScript interfaces and arrays (`services.ts`, `case-studies.ts`, `blog-posts.ts`, `team.ts`, `trust.ts`, `company.ts`)
- Depends on: Nothing (pure data)
- Used by: Presentation layer for content rendering, lib layer for schema generation

**Business Logic Layer:**
- Purpose: Handle form submission, validation, and server-side operations
- Location: `app/actions/`
- Contains: Server actions marked with `'use server'` directive
- Depends on: Lib layer for schemas, data layer for configuration
- Used by: Client components via form actions

**Utility/Library Layer:**
- Purpose: Provide reusable functions and utilities
- Location: `app/lib/`
- Contains: Zod schemas, structured data generators (JSON-LD), utility functions
- Depends on: Data layer for type inference
- Used by: All other layers (presentation, business logic, pages)

**Root Layout Layer:**
- Purpose: Wrap entire application with metadata and script tags
- Location: `app/layout.tsx`
- Contains: HTML structure, metadata, analytics script injection
- Depends on: Environment variables for configuration
- Used by: Next.js to render all pages

## Data Flow

**Page Request Flow:**

1. User requests page (e.g., `/services`)
2. Next.js router matches route to page component in `app/(marketing)/services/page.tsx`
3. Page component imports data from `app/data/services.ts`
4. Page component generates structured data (JSON-LD) via `app/lib/structured-data.tsx`
5. Page renders with content and interactivity
6. Static page is served from build cache

**Dynamic Route Flow (Blog/Services/Case Studies):**

1. `generateStaticParams()` runs at build time to generate routes for all slugs
2. For each slug, page component calls `getBlogPostBySlug(slug)` or similar lookup function
3. Data is fetched synchronously from data arrays
4. Structured data is generated for SEO
5. Page is statically rendered and cached
6. Related content is fetched (related posts, related services)

**Form Submission Flow:**

1. User fills form in client component (e.g., `ContactForm`)
2. Form component uses `useActionState` hook with `submitContactForm` server action
3. Form data is sent to server action via FormData
4. Server action validates with Zod schema (`contactSchema`)
5. Validation errors returned to component or success state set
6. Component re-renders with updated state (error messages or success message)

**State Management:**

- **Page state:** Passed through Next.js props and layout hierarchies
- **Component state:** React hooks (`useState`, `useActionState`) in client components marked with `'use client'`
- **Form state:** Managed by `useActionState` hook with server action integration
- **Global config:** Environment variables loaded at build/runtime in `layout.tsx` and pages

## Key Abstractions

**Service Model:**
- Purpose: Represents a service offering with metadata, capabilities, and related services
- Examples: `app/data/services.ts` defines `Service` interface
- Pattern: Object with slug (URL identifier), title, description, features array, metrics array, technical capabilities, use cases, and relatedServices array for cross-linking

**Case Study Model:**
- Purpose: Represents a customer success story with problem/solution/outcome narrative
- Examples: `app/data/case-studies.ts` defines `CaseStudy` interface
- Pattern: Object with slug, client info, crisis type, metrics, testimonial, and services used for relationship

**Blog Post Model:**
- Purpose: Represents publishable content with metadata and markdown-like content
- Examples: `app/data/blog-posts.ts` defines `BlogPost` interface
- Pattern: Object with slug, title, content (string with markdown syntax), author, category, tags, SEO metadata

**Structured Data Generators:**
- Purpose: Generate JSON-LD schemas for SEO (search engine visibility)
- Examples: `generateOrganizationSchema()`, `generateServiceSchema()`, `generateArticleSchema()` in `app/lib/structured-data.tsx`
- Pattern: Functions that take data models and return schema.org-compliant JSON objects, wrapped in `JsonLd` component for rendering

**Validation Schema:**
- Purpose: Define and enforce validation rules for user input
- Examples: `contactSchema` in `app/lib/schemas.ts` uses Zod
- Pattern: Zod schema objects defining field requirements, then used with `.safeParse()` in server actions

## Entry Points

**Root Entry Point:**
- Location: `app/layout.tsx`
- Triggers: All page requests
- Responsibilities: Define HTML structure, inject analytics script, apply global styles, set metadata

**Marketing Layout Entry Point:**
- Location: `app/(marketing)/layout.tsx`
- Triggers: All requests to marketing routes (everything except API)
- Responsibilities: Wrap pages with Header, Footer, EmergencyBadge for consistent UI shell

**Home Page Entry Point:**
- Location: `app/(marketing)/page.tsx`
- Triggers: GET request to `/`
- Responsibilities: Render hero, value props, metrics, testimonials, services preview, booking section. Loads structured data for Organization and WebSite schemas.

**Dynamic Page Entry Points:**
- Blog post: `app/(marketing)/blog/[slug]/page.tsx` - Renders individual blog posts with related posts, navigation, sidebar
- Service detail: `app/(marketing)/services/[slug]/page.tsx` - Renders service details with features, capabilities, related services
- Case study: `app/(marketing)/case-studies/[slug]/page.tsx` - Renders customer story with metrics and testimonials

**Contact Entry Point:**
- Location: `app/(marketing)/contact/page.tsx`
- Triggers: GET request to `/contact`
- Responsibilities: Render contact form component

**Error Handling Entry Point:**
- Location: `app/error.tsx`
- Triggers: Unhandled errors in page components
- Responsibilities: Display user-friendly error message with recovery options (retry, home, emergency call)

## Error Handling

**Strategy:** Segment errors into user-facing and development-only information

**Patterns:**

- **Page-level errors:** `app/error.tsx` catches errors in page tree, displays friendly message with retry and home navigation
- **Development info:** Error message and digest only shown when `NODE_ENV === 'development'`
- **Server action errors:** `submitContactForm` returns error state object that component displays to user
- **Validation errors:** Zod errors flattened and returned as `fieldErrors` object for field-level error display
- **Client logging:** Errors logged to console with `console.error()` (can be integrated with Sentry/error tracking service)

## Cross-Cutting Concerns

**Logging:** Browser console via `console.log()` and `console.error()`. Designed for integration with external service (see TODO in `app/actions/contact.ts`).

**Validation:** Zod schema at entry points (`contactSchema` in forms). Patterns: field-level validation with custom error messages, `.safeParse()` for safe handling, error flattening for form display.

**Authentication:** Not implemented. Site is public marketing site with no auth. Emergency contact is phone number verification. Future phases may add authentication for admin/CMS.

**SEO:** Structured data (JSON-LD) injected at page level via `JsonLd` component. Metadata exported from page components. Sitemap generated from data arrays at build time. Robots.txt blocks API and next.js internals.

**Analytics:** Plausible analytics script injected in root layout if `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` env var set. Script tag injected with `afterInteractive` strategy.

**Styling:** Tailwind CSS v4 with custom theme variables in `app/globals.css`. Brand colors defined in theme: `--color-brand-red`, `--color-brand-dark`, `--color-brand-gray`. Responsive design with `sm:`, `md:`, `lg:` breakpoints. Custom animation for emergency badge pulse.

---

*Architecture analysis: 2026-03-10*
