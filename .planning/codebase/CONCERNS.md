# Codebase Concerns

**Analysis Date:** 2026-03-10

## Tech Debt

**Contact Form Email Service Integration:**
- Issue: Email service is not integrated; form submissions are logged to console only
- Files: `app/actions/contact.ts`
- Impact: Contact form submissions are lost in production - no actual emails sent to potential clients
- Fix approach: Integrate with Resend, SendGrid, or similar in Phase 2. Replace console.log/error with actual email service calls. Add error tracking for failed submissions.

**Hardcoded Environment Fallbacks:**
- Issue: Multiple files use hardcoded fallback URLs instead of requiring proper environment configuration
- Files: `app/lib/structured-data.tsx`, `app/(marketing)/blog/[slug]/page.tsx`, `app/(marketing)/services/[slug]/page.tsx`, `app/(marketing)/case-studies/[slug]/page.tsx`, `app/robots.ts`, `app/sitemap.ts`, `app/components/CalendlyEmbed.tsx`
- Impact: Risk of incorrect URLs in production if env vars aren't set; fallback URLs (like "https://calendly.com/your-username/consultation") will break functionality
- Fix approach: Make NEXT_PUBLIC_SITE_URL required (fail build if missing). For non-critical fallbacks like Calendly URL, validate at runtime and throw clear error rather than silently using placeholder. Create strict env schema.

**Manual Content Management:**
- Issue: All content (blog posts, case studies, services, team, testimonials) is hardcoded in TypeScript data files
- Files: `app/data/blog-posts.ts`, `app/data/case-studies.ts`, `app/data/services.ts`, `app/data/team.ts`, `app/data/trust.ts`, `app/data/company.ts`
- Impact: Adding new content requires code changes and redeployment; editing requires developer involvement; no content versioning or scheduling; content changes are difficult to audit
- Fix approach: Migrate to CMS (Contentful, Sanity, or Strapi) or at minimum create an admin interface. This becomes critical when blog frequency increases.

**Console Logging in Production:**
- Issue: console.log and console.error statements remain in production code
- Files: `app/actions/contact.ts`, `app/error.tsx`, `app/global-error.tsx`
- Impact: Sensitive information may be exposed in client console; error context logged to console instead of proper monitoring service; production debugging difficult
- Fix approach: Replace console logs with proper error tracking (Sentry, LogRocket, or similar). Use structured logging for server actions. Remove or restrict logs to development environment.

---

## Known Issues

**Blog Content Rendering:**
- Issue: `renderContent()` function in blog detail pages uses string manipulation and regex to parse markdown-like syntax
- Files: `app/(marketing)/blog/[slug]/page.tsx`
- Symptoms: Code blocks may not render correctly if content has unusual formatting; inline code parsing with regex is fragile
- Workaround: Ensure blog post content follows exact markdown formatting (no edge cases)
- Fix: Use a proper markdown parser (remark, unified) instead of string splitting and regex

**Missing Blog Posts Default Handler:**
- Issue: `getBlogPostBySlug()` returns undefined for missing posts, but page only calls `notFound()` if slug is invalid
- Files: `app/(marketing)/blog/[slug]/page.tsx` lines 29-32
- Symptoms: If a blog post is deleted, the dynamic route may still try to render with undefined data
- Impact: Potential runtime errors if related components try to access post properties
- Fix: Ensure `notFound()` is called immediately if post not found in page component as well

---

## Security Considerations

**Emergency Phone Number Exposure:**
- Risk: Emergency phone number (408-841-3982) is hardcoded throughout codebase and embedded in public schema
- Files: `app/error.tsx`, `app/global-error.tsx`, `app/(marketing)/services/[slug]/page.tsx`, `app/lib/structured-data.tsx`, multiple data files
- Current mitigation: Only stored in env var, but defaults to hardcoded value in multiple places
- Recommendations: Move phone number to env var exclusively. Create utility function that requires env var to be set. Consider rate limiting the phone number in infrastructure if it becomes spam target.

**Unvalidated Third-Party Script Loading:**
- Risk: Plausible Analytics script loaded from external domain via Script tag
- Files: `app/layout.tsx` lines 26-31
- Current mitigation: Script only loads if NEXT_PUBLIC_PLAUSIBLE_DOMAIN is configured
- Recommendations: Add Content Security Policy headers. Validate domain format before loading. Consider using nonce for script security.

**Contact Form Submission Exposure:**
- Risk: Form data (name, email, company, message) is logged to console without sanitization
- Files: `app/actions/contact.ts` line 40
- Current mitigation: Currently just logs to console (browser-side only for now)
- Recommendations: Once email service is integrated, ensure all data is properly sanitized. Use structured logging with appropriate access controls. Never log full messages in production.

**Metadata SSRF Risk:**
- Risk: Schema.org URLs are user-configurable via env vars and hardcoded in structured data
- Files: `app/lib/structured-data.tsx`
- Current mitigation: Only https:// URLs used
- Recommendations: Validate all BASE_URL values against whitelist. Consider immutable production URLs in environment.

---

## Performance Bottlenecks

**Large Data Files in Memory:**
- Problem: All blog posts, case studies, services loaded entirely into memory on every request
- Files: `app/data/blog-posts.ts` (100+ posts), `app/data/case-studies.ts`, `app/data/services.ts`
- Current impact: Minimal at current scale (<50 items each) but impacts build time with each content addition
- Cause: Data files imported at page level; full content loaded even when only metadata needed
- Improvement path: Extract content into separate files. Lazy load body content. Migrate to CMS with API-based fetching. Implement pagination for blog listing.

**Blog Content Parsing on Every Render:**
- Problem: `renderContent()` function splits, maps, and processes markdown string on every page render
- Files: `app/(marketing)/blog/[slug]/page.tsx`
- Current impact: CPU cost for parsing large blog posts
- Improvement: Cache parsed content. Use a proper markdown library with built-in optimization. Precompile content at build time.

**No Image Optimization:**
- Problem: Avatar initials generated in JavaScript on render rather than CSS
- Files: `app/(marketing)/blog/page.tsx` lines 84-85
- Impact: Extra JS execution, no caching benefit
- Fix: Move initials to CSS or use static avatar images

---

## Fragile Areas

**Dynamic Route Content Resolution:**
- Files: `app/(marketing)/blog/[slug]/page.tsx`, `app/(marketing)/case-studies/[slug]/page.tsx`, `app/(marketing)/services/[slug]/page.tsx`
- Why fragile: Pages depend on `getBlogPostBySlug()`, `getCaseStudyBySlug()`, `getServiceBySlug()` returning correct objects. If data structure changes, pages break silently.
- Safe modification: Update data interfaces in one place. Use TypeScript strict null checks. Test all dynamic routes after data changes.
- Test coverage: No unit tests for content lookup functions. No tests for 404 handling.

**Contact Form State Management:**
- Files: `app/components/ContactForm.tsx`, `app/actions/contact.ts`
- Why fragile: Complex state flow with `useActionState`, field-level errors, and success state. Easy to lose form state on resubmission.
- Safe modification: Add integration tests for form submission flow. Test validation error display. Test success state persistence.
- Test coverage: No tests for form behavior

**Structured Data Generation:**
- Files: `app/lib/structured-data.tsx`
- Why fragile: Schema generation functions must maintain exact structure. SEO impact if schema is malformed.
- Safe modification: Validate schema against JSON Schema before rendering. Test with Google Rich Results tester. Keep schema types immutable.
- Test coverage: No tests for schema output validity

---

## Scaling Limits

**Static Generation Build Time:**
- Current capacity: ~50 blog posts, ~10 case studies, ~5 services
- Limit: At ~200+ content items, build time will become significant with `force-static`
- Scaling path: Switch to incremental static regeneration (ISR) for content pages. Implement dynamic routes with fallback: 'blocking'. Consider on-demand ISR.

**Memory Usage During Build:**
- Current: All data files loaded simultaneously during build
- Limit: As content grows to thousands of items, build memory usage increases linearly
- Scaling: Separate data into chunks. Lazy load during build only what's needed for each page.

**Blog Post Content Size:**
- Current: Individual blog posts can be 5000+ characters with code examples
- Limit: Large markdown string parsing will slow down time-to-interactive
- Scaling: Extract code examples into separate MDX files. Stream content rendering. Implement reading time more accurately.

---

## Dependencies at Risk

**react-calendly v4.4.0:**
- Risk: External dependency for Calendly embed. If Calendly changes API, widget breaks
- Impact: Booking functionality fails; need to update library or fallback to iframe
- Current status: Dynamically imported with loading state, which is good
- Migration plan: Consider using Calendly's native iframe embed as fallback. Lock version and monitor for security updates.

**Zod v4.3.6:**
- Risk: Validation library used for contact form. If Zod major version changes, validation logic may break
- Impact: Form submission validation could fail or change behavior unexpectedly
- Current status: Only one schema (contactSchema) - low breakage risk
- Migration: Monitor for Zod v5, plan migration with full form testing

---

## Missing Critical Features

**Analytics Integration:**
- Problem: Plausible Analytics configured but optional; no fallback analytics if env var not set
- Blocks: Cannot track user behavior, conversion rates, or engagement without this
- Impact: No data-driven decisions on marketing effectiveness; cannot identify high-traffic content
- Priority: High - required to validate marketing effectiveness

**Email Notifications:**
- Problem: Contact form submissions not sent anywhere; no notification to team
- Blocks: Cannot respond to potential clients; no CRM integration possible
- Impact: All inquiries lost; business development impossible at scale
- Priority: Critical - revenue impacting

**Admin Interface / CMS:**
- Problem: All content hardcoded in data files; no way to manage content without code
- Blocks: Cannot scale content strategy; every change requires developer
- Impact: Content marketing bottlenecked by engineering availability
- Priority: High - operational blocker for content team

---

## Test Coverage Gaps

**No Automated Tests:**
- What's not tested: Entire codebase has zero test files
- Files: All app code, particularly `app/actions/contact.ts`, form components, content lookup functions
- Risk: High - form submission bugs, content rendering issues would be caught in production only
- Priority: High

**Contact Form Submission Path:**
- What's not tested: End-to-end form submission with validation errors, field-level errors, success state
- Files: `app/components/ContactForm.tsx`, `app/actions/contact.ts`
- Risk: Form could silently fail to submit; validation errors might not display
- Coverage needed: Unit tests for submitContactForm action, integration tests for form component

**Dynamic Content Routes:**
- What's not tested: 404 handling for missing blog posts, case studies, services; metadata generation; breadcrumb schema generation
- Files: `app/(marketing)/blog/[slug]/page.tsx`, `app/(marketing)/case-studies/[slug]/page.tsx`, `app/(marketing)/services/[slug]/page.tsx`
- Risk: Missing content could cause 500 errors instead of 404s
- Coverage needed: Unit tests for content lookup functions, integration tests for dynamic routes with missing slugs

**Structured Data Generation:**
- What's not tested: JSON-LD schema validity; schema compliance with schema.org
- Files: `app/lib/structured-data.tsx`
- Risk: Malformed schema could break Google Rich Results, harming SEO
- Coverage needed: Schema validation tests, Google Rich Results testing

**Error Boundary Behavior:**
- What's not tested: Error component rendering, error state recovery
- Files: `app/error.tsx`, `app/global-error.tsx`
- Risk: Error pages could themselves error; unclear if reset button works
- Coverage needed: Integration tests for error states

---

*Concerns audit: 2026-03-10*
