# External Integrations

**Analysis Date:** 2026-03-10

## APIs & External Services

**Scheduling & Calendar:**
- Calendly - Appointment booking and consultation scheduling
  - SDK/Client: react-calendly 4.4.0
  - Config: `NEXT_PUBLIC_CALENDLY_URL` environment variable
  - Usage: `app/components/CalendlyEmbed.tsx` - embedded InlineWidget on contact page and other locations
  - Integration method: Dynamic import with SSR disabled (client-only rendering)

**Analytics:**
- Plausible Analytics - Privacy-focused web analytics
  - Script injection: Next.js Script component in `app/layout.tsx`
  - Config: `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` and `NEXT_PUBLIC_PLAUSIBLE_HOST`
  - Integration method: External script tag with data-domain attribute
  - Conditional: Only loads if NEXT_PUBLIC_PLAUSIBLE_DOMAIN is configured
  - Script source: https://[NEXT_PUBLIC_PLAUSIBLE_HOST]/js/script.js

**Email Service (Planned - Not Yet Implemented):**
- Resend - Email delivery service
  - Config: `RESEND_API_KEY` environment variable (commented out in .env.local.example)
  - Status: TODO - referenced in `app/actions/contact.ts` for Phase 2+ implementation
  - When implemented will handle contact form submissions

## Data Storage

**Databases:**
- None detected - application is static/content-driven
- Content stored as data files: `app/data/` directory contains:
  - `app/data/services.ts` - Service offerings
  - `app/data/case-studies.ts` - Case study content
  - `app/data/blog-posts.ts` - Blog post content
  - `app/data/team.ts` - Team member information
  - `app/data/trust.ts` - Trust/credentials data

**File Storage:**
- Local filesystem only - static assets in `public/` directory
- No cloud storage integration detected

**Caching:**
- Next.js built-in caching:
  - Static page generation (force-static in contact page)
  - Dynamic imports with SSR disabled for client-side components

## Authentication & Identity

**Auth Provider:**
- None configured - marketing website with no user authentication
- No login/sign-up system implemented
- Contact form uses server-side validation only (Zod schema validation in `app/lib/schemas.ts`)

## Monitoring & Observability

**Error Tracking:**
- None detected - no error tracking service configured

**Logs:**
- Console logging only:
  - Contact form submission logged to console: `app/actions/contact.ts`
  - Contact form errors logged to console for debugging
  - No centralized logging service

**Error Handling:**
- Client-side error boundary: `app/error.tsx`
- Global error handler: `app/global-error.tsx`
- Form-level error handling with Zod validation results

## CI/CD & Deployment

**Hosting:**
- Not specified in codebase - designed for any Node.js host or static deployment
- Supports: Vercel, Netlify, AWS, or any Node.js server

**CI Pipeline:**
- Not configured - no GitHub Actions, GitLab CI, or other CI files detected

## Webhooks & Callbacks

**Incoming:**
- None detected - website is read-only (no inbound webhooks)

**Outgoing:**
- Calendly - scheduling data sent to Calendly service
- Contact form - no webhooks configured, data logged locally only
- Plausible Analytics - page view events sent to Plausible service

## Site Configuration & URLs

**Base URL:**
- Configured via: `NEXT_PUBLIC_SITE_URL` environment variable
- Default: https://redleader.io
- Used in:
  - Sitemap generation: `app/sitemap.ts`
  - Robots.txt: `app/robots.ts`
  - Structured data generation: `app/lib/structured-data.tsx`

**Emergency Contact:**
- Phone: `NEXT_PUBLIC_EMERGENCY_PHONE` (default: 408-841-3982)
- Email: contact@redleader.com (hardcoded in `app/(marketing)/contact/page.tsx`)
- Used in:
  - Contact page
  - Header component
  - Emergency badge component
  - Structured data (Organization schema)

## Contact Form Flow

**Current Implementation:**
- Location: `app/components/ContactForm.tsx` and `app/actions/contact.ts`
- Validation: Zod schema (`app/lib/schemas.ts`)
- Fields: name, email, company, message
- Validation rules:
  - name: 2-100 characters
  - email: valid email format
  - company: 2-100 characters
  - message: 10-5000 characters
- Submission handling: Server action (`submitContactForm` in `app/actions/contact.ts`)
- Current behavior: Logs to console, returns success/error status
- Future integration: Planned Resend email service for Phase 2+

## Structured Data & SEO

**JSON-LD Schemas Generated:**
- Organization schema (homepage, about page)
- WebSite schema (homepage search action)
- Service schema (service detail pages)
- Article schema (blog post pages)
- CaseStudy schema (case study pages)
- BreadcrumbList schema (navigation trails)
- FAQPage schema (potential FAQ section)
- ProfessionalService schema (alternative local SEO)

**Location:** `app/lib/structured-data.tsx`

**Usage:** Schemas rendered as JSON-LD script tags in page layouts via `JsonLd` component

## Social Media References

**Links configured in Structured Data:**
- LinkedIn: https://www.linkedin.com/company/redleader
- Twitter: https://twitter.com/redleader
- GitHub: https://github.com/redleader

## Third-Party Dependencies Summary

**Active Integrations:**
- Calendly (scheduling)
- Plausible Analytics (analytics)

**Planned Integrations:**
- Resend (email service)

**No Configuration:**
- Payment processing (Stripe, etc.)
- CRM systems
- Slack/chat integrations
- Database services
- Authentication providers

---

*Integration audit: 2026-03-10*
