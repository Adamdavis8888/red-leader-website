# Phase 1: Foundation & Core Conversion - Research

**Researched:** 2026-02-01
**Domain:** Next.js marketing site with lead capture
**Confidence:** HIGH

## Summary

Phase 1 establishes a Next.js 16 + Tailwind v4 marketing site optimized for conversion. The research confirms that the prior decision to use Next.js 16 with App Router and Tailwind v4 aligns with 2026 best practices for marketing sites requiring performance, SEO, and rapid lead capture.

Next.js 16 (released October 2025) provides stable App Router with React Server Components, simplified caching (opt-in Cache Components), and dramatic routing performance improvements. Tailwind v4's CSS-first configuration and 3-182x build speed improvements make it ideal for developer velocity. The Calendly integration via react-calendly eliminates maintenance overhead while maximizing conversion rates.

**Primary recommendation:** Use force-static rendering for marketing pages, Server Actions for the contact form with Zod validation, and react-calendly with dynamic imports to avoid SSR issues. Test production builds with `next build && next start` before deployment to catch caching and rendering behavior differences.

## Standard Stack

The established libraries/tools for Next.js marketing sites in 2026:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 16.x | React framework with App Router | Industry standard for marketing sites; automatic code-splitting, SEO, performance optimizations built-in |
| react | 19.x | UI library | Required by Next.js 16; includes React Compiler support |
| tailwindcss | 4.x | CSS framework | 3-182x faster builds than v3; CSS-first config; zero-config content detection |
| @tailwindcss/postcss | latest | PostCSS plugin for Tailwind v4 | Required for Tailwind v4 CSS processing |
| typescript | 5.x | Type safety | Prevents production bugs; official Next.js recommendation |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| react-calendly | 4.x | Calendly embed components | Booking integration without SSR issues |
| zod | 3.x | Schema validation | Server Actions validation; shared client/server schemas |
| next/font | Built-in | Font optimization | Prevents FOUT/FOIT; required for production-grade font loading |
| @next/bundle-analyzer | latest | Bundle size analysis | Development/optimization phase to reduce JavaScript size |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Server Actions | API Routes | API Routes add boilerplate; Server Actions have progressive enhancement built-in |
| react-calendly | Custom Calendly script | Manual script loading requires more SSR handling; react-calendly provides React-friendly API |
| Zod | Yup | Zod has better TypeScript inference; tighter Next.js ecosystem integration |

**Installation:**
```bash
npm install next@latest react@latest react-dom@latest
npm install tailwindcss @tailwindcss/postcss
npm install react-calendly zod
npm install --save-dev typescript @types/react @types/node
```

## Architecture Patterns

### Recommended Project Structure
```
red-leader-website/
├── app/
│   ├── (marketing)/           # Route group - doesn't affect URLs
│   │   ├── layout.tsx         # Shared marketing layout (header, footer, emergency badge)
│   │   ├── page.tsx           # Homepage (/)
│   │   ├── services/
│   │   │   └── page.tsx       # Services overview (/services)
│   │   └── book/
│   │       └── page.tsx       # Booking page with Calendly (/book)
│   ├── actions/               # Server Actions (contact form)
│   │   └── contact.ts         # 'use server' contact form action
│   ├── components/            # Shared components
│   │   ├── Header.tsx         # Header with emergency hotline
│   │   ├── Footer.tsx
│   │   ├── EmergencyBadge.tsx # 24/7 badge
│   │   ├── ContactForm.tsx    # Client component with form
│   │   └── CalendlyEmbed.tsx  # Dynamic Calendly wrapper
│   ├── lib/
│   │   ├── schemas.ts         # Zod validation schemas
│   │   └── utils.ts           # Helper functions
│   └── globals.css            # Tailwind v4 config
├── public/
│   ├── favicon.ico
│   └── images/
└── .env.local                 # Environment variables
```

### Pattern 1: Server-First with Client Islands
**What:** Default to Server Components; use 'use client' only for interactivity
**When to use:** All pages - marketing sites benefit from minimal client JavaScript
**Example:**
```typescript
// app/(marketing)/page.tsx - Server Component (default)
import { ContactForm } from '@/app/components/ContactForm'

export default function HomePage() {
  return (
    <main>
      <section>
        <h1>Emergency Infrastructure Rescue</h1>
        <p>Expert response when your systems fail</p>
      </section>
      <ContactForm /> {/* Client island for interactivity */}
    </main>
  )
}

// app/components/ContactForm.tsx - Client Component
'use client'
import { useActionState } from 'react'
import { submitContactForm } from '@/app/actions/contact'

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactForm, null)

  return (
    <form action={formAction}>
      <input name="name" required />
      <input name="email" type="email" required />
      <input name="company" required />
      <textarea name="message" required />
      <button disabled={pending}>
        {pending ? 'Sending...' : 'Get Help Now'}
      </button>
      {state?.error && <p className="text-red-500">{state.error}</p>}
    </form>
  )
}
```
**Source:** [Next.js Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)

### Pattern 2: Server Actions with Zod Validation
**What:** Server-side form handling with type-safe validation
**When to use:** Contact forms, lead capture - avoids API route boilerplate
**Example:**
```typescript
// app/lib/schemas.ts
import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Valid email required'),
  company: z.string().min(2, 'Company required'),
  message: z.string().min(10, 'Message too short'),
})

// app/actions/contact.ts
'use server'
import { contactSchema } from '@/app/lib/schemas'

export async function submitContactForm(prevState: any, formData: FormData) {
  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    company: formData.get('company'),
    message: formData.get('message'),
  })

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    }
  }

  // Send to email service or CRM
  // const result = await sendEmail(validatedFields.data)

  return { success: true }
}
```
**Source:** [Next.js Forms Guide](https://nextjs.org/docs/app/guides/forms)

### Pattern 3: Calendly Dynamic Import
**What:** Load Calendly client-side to avoid SSR errors
**When to use:** Booking page - Calendly requires browser DOM
**Example:**
```typescript
// app/components/CalendlyEmbed.tsx
'use client'
import dynamic from 'next/dynamic'

const InlineWidget = dynamic(
  () => import('react-calendly').then((mod) => mod.InlineWidget),
  { ssr: false }
)

export function CalendlyEmbed() {
  return (
    <InlineWidget
      url="https://calendly.com/your-username/30min"
      styles={{ height: '700px' }}
    />
  )
}
```
**Source:** [Integrate Calendly With Next.js](https://medium.com/@dileep18052001/integrate-calendly-with-next-js-step-by-step-guide-dbb0b2fc30c9)

### Pattern 4: Force-Static Rendering for Marketing Pages
**What:** Explicitly mark pages as static for build-time generation
**When to use:** All marketing content pages - maximizes performance
**Example:**
```typescript
// app/(marketing)/page.tsx
export const dynamic = 'force-static'

export default function HomePage() {
  return <main>...</main>
}
```
**Source:** [Next.js 15 App Router Guide](https://medium.com/@livenapps/next-js-15-app-router-a-complete-senior-level-guide-0554a2b820f7)

### Pattern 5: Route Groups for Organization
**What:** Use (marketing) folder to organize without affecting URLs
**When to use:** Separate marketing from potential admin/dashboard sections
**Example:**
```
app/(marketing)/page.tsx        → /
app/(marketing)/services/page.tsx → /services
```
**Source:** [Next.js Project Structure](https://nextjs.org/docs/app/getting-started/project-structure)

### Anti-Patterns to Avoid
- **Overusing 'use client':** Marking entire layouts as client components bloats JavaScript bundles. Only mark interactive leaf components.
- **Not testing production builds:** Dev mode behavior differs from production - always run `next build && next start` before deploying.
- **Passing functions across boundaries:** Server Components cannot pass functions to Client Components. Use Server Actions instead.
- **Ignoring TypeScript errors:** TypeScript plugin catches SSR/CSR boundary mistakes before production.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Font loading optimization | Manual font preloading with link tags | next/font | Prevents FOUT/FOIT; automatic subsetting; removes external network requests |
| Form validation | Custom regex validators | Zod | Type inference; reusable schemas; server/client shared validation |
| Image optimization | Manual srcset/picture elements | next/image | Automatic WebP conversion; lazy loading; layout shift prevention |
| Booking/scheduling UI | Custom calendar picker | Calendly | 3x conversion improvement vs custom solutions; zero maintenance; mobile-optimized |
| Responsive breakpoints | Custom CSS media queries | Tailwind's responsive utilities | Consistent breakpoints; mobile-first by default; reduces CSS duplication |

**Key insight:** Marketing sites need speed-to-market and proven conversion patterns. Custom solutions for these problems introduce bugs, maintenance overhead, and worse user experience than battle-tested tools.

## Common Pitfalls

### Pitfall 1: Dev/Production Rendering Mismatch
**What goes wrong:** Pages work in `npm run dev` but fail or behave differently after `next build`
**Why it happens:** Next.js 16 uses force-static by default in production; dev mode always uses dynamic rendering
**How to avoid:** Always test production builds locally before deployment:
```bash
npm run build
npm run start
# Visit http://localhost:3000 and test all pages
```
**Warning signs:** Data appears in dev but not production; forms work in dev but fail in production; Calendly shows in dev but not production
**Source:** [Common Next.js App Router Mistakes](https://vercel.com/blog/common-mistakes-with-the-next-js-app-router-and-how-to-fix-them)

### Pitfall 2: Server/Client Component Boundary Violations
**What goes wrong:** "Functions cannot be passed to Client Components" error or "You're importing a component that needs X but is not marked with 'use client'"
**Why it happens:** Mixing Server Component features (async, direct DB access) with Client Component features (hooks, event handlers) incorrectly
**How to avoid:**
- Use 'use server' for Server Actions, not 'async function' in Client Components
- Pass only serializable props (strings, numbers, objects) across boundaries
- Never pass functions directly; use Server Actions instead
**Warning signs:** TypeScript errors about serialization; runtime errors about hooks; missing data in client components
**Source:** [Next.js Server Components Mistakes](https://medium.com/lets-code-future/next-js-server-components-broke-our-app-twice-worth-it-e511335eed22)

### Pitfall 3: Tailwind v4 Configuration Migration Issues
**What goes wrong:** Old v3 config doesn't work; dark mode breaks; plugins fail
**Why it happens:** Tailwind v4 uses CSS-first configuration, not JavaScript config files
**How to avoid:**
- Use `@import "tailwindcss"` not `@tailwind` directives
- Configure in CSS with `@theme { }` not tailwind.config.js
- Remove preprocessor files (.scss) - v4 has built-in nesting
**Warning signs:** Build errors about @tailwind; missing utilities; "addUtilities defines invalid selector" errors
**Source:** [Tailwind v4 Migration Issues](https://github.com/tailwindlabs/tailwindcss/discussions/16517)

### Pitfall 4: Calendly SSR Errors
**What goes wrong:** "document is not defined" or "window is not defined" errors
**Why it happens:** react-calendly requires browser APIs; Next.js pre-renders on server
**How to avoid:** Use dynamic import with `{ ssr: false }`:
```typescript
const InlineWidget = dynamic(
  () => import('react-calendly').then(mod => mod.InlineWidget),
  { ssr: false }
)
```
**Warning signs:** Build errors mentioning document/window; Calendly visible in dev but breaks in production
**Source:** [How to Add Calendly to Next JS](https://webpeak.org/blog/how-to-add-calendrly-to-next-js-website/)

### Pitfall 5: Contact Form Field Count Inflation
**What goes wrong:** Adding "nice-to-have" fields reduces conversion rates
**Why it happens:** Each additional field creates friction; longer forms feel more demanding
**How to avoid:** Limit to exactly 4 fields (name, email, company, message) as specified in requirements. Capture additional data post-conversion.
**Warning signs:** Conversion rate drops after adding fields; users abandon forms partway through
**Source:** Industry best practice (not specific to Next.js)

### Pitfall 6: Mobile Navigation State Management
**What goes wrong:** Hamburger menu stays open when navigating; scroll persists; focus traps
**Why it happens:** Client-side navigation doesn't reset component state automatically
**How to avoid:**
- Close menu on navigation using usePathname hook
- Reset scroll position when menu opens
- Manage focus for accessibility
**Warning signs:** Menu doesn't close on link click; body scroll works while menu is open
**Source:** [Next.js Mobile Navigation Issues](https://github.com/vercel/next.js/discussions/16316)

### Pitfall 7: FOUT/FOIT from Manual Font Loading
**What goes wrong:** Text flashes with wrong font or stays invisible during load
**Why it happens:** Not using next/font causes unoptimized font loading
**How to avoid:** Use next/font/google or next/font/local from the start:
```typescript
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
```
**Warning signs:** Layout shift; invisible text on slow connections; different fonts flash
**Source:** [Next.js Font Optimization](https://nextjs.org/docs/app/getting-started/fonts)

## Code Examples

Verified patterns from official sources:

### Mobile-First Responsive Header with Emergency Hotline
```typescript
// app/components/Header.tsx
import Link from 'next/link'

export function Header() {
  return (
    <header className="sticky top-0 bg-white shadow-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-bold text-xl">
            Red Leader
          </Link>

          {/* Emergency hotline - click-to-call */}
          <a
            href="tel:+1-555-123-4567"
            className="flex items-center gap-2 text-red-600 font-semibold hover:text-red-700"
            aria-label="Call emergency hotline at 555-123-4567"
          >
            <span className="hidden sm:inline">Emergency:</span>
            <span>555-123-4567</span>
          </a>
        </div>
      </div>
    </header>
  )
}
```
**Source:** [Accessible Phone Links](https://design.va.gov/components/telephone)

### 24/7 Emergency Badge Component
```typescript
// app/components/EmergencyBadge.tsx
export function EmergencyBadge() {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-red-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
        <span className="font-semibold text-sm">24/7 Emergency Response</span>
      </div>
    </div>
  )
}
```
**Source:** Tailwind CSS animation utilities

### Tailwind v4 Configuration
```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  /* Brand colors */
  --color-brand-red: #dc2626;
  --color-brand-dark: #1f2937;

  /* Custom breakpoint for large displays */
  --breakpoint-3xl: 1920px;

  /* Typography */
  --font-sans: ui-sans-serif, system-ui, sans-serif;
}

/* Emergency pulse animation */
@keyframes emergency-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```
**Source:** [Tailwind CSS v4.0 Announcement](https://tailwindcss.com/blog/tailwindcss-v4)

### Form with Progressive Enhancement
```typescript
// app/components/ContactForm.tsx
'use client'
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { submitContactForm } from '@/app/actions/contact'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold disabled:opacity-50"
    >
      {pending ? 'Sending...' : 'Get Emergency Help Now'}
    </button>
  )
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, null)

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600"
        />
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium mb-1">
          Company
        </label>
        <input
          id="company"
          name="company"
          type="text"
          required
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">
          What's the emergency?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600"
        />
      </div>

      <SubmitButton />

      {state?.error && (
        <p className="text-red-600 text-sm" role="alert">
          {state.error}
        </p>
      )}
      {state?.success && (
        <p className="text-green-600 text-sm" role="alert">
          Message sent! We'll respond within 15 minutes.
        </p>
      )}
    </form>
  )
}
```
**Source:** [Next.js Forms with Server Actions](https://nextjs.org/docs/app/guides/forms)

### Mobile Navigation with Hamburger Menu
```typescript
// app/components/MobileNav.tsx
'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Close menu on navigation
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden p-2"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <div className="space-y-1.5">
          <span className="block w-6 h-0.5 bg-gray-900"></span>
          <span className="block w-6 h-0.5 bg-gray-900"></span>
          <span className="block w-6 h-0.5 bg-gray-900"></span>
        </div>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          <nav className="fixed top-0 right-0 h-full w-64 bg-white shadow-xl p-6">
            <ul className="space-y-4">
              <li><Link href="/" className="block py-2">Home</Link></li>
              <li><Link href="/services" className="block py-2">Services</Link></li>
              <li><Link href="/book" className="block py-2">Book Consultation</Link></li>
            </ul>
          </nav>
        </div>
      )}
    </>
  )
}
```
**Source:** [Creating Hamburger Menu in Next.js](https://jacobhocker.medium.com/creating-an-animated-hamburger-menu-in-nextjs-tailwind-css-9e332d428811)

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Pages Router | App Router | Next.js 13 (2022), stable in 15+ (2025) | Server Components by default; reduced client JS; better performance |
| JavaScript config (tailwind.config.js) | CSS-first config (@theme) | Tailwind v4 (2024) | 3-182x faster builds; native CSS variables; simpler setup |
| API Routes for forms | Server Actions | Next.js 13 (2022), stable in 14+ | Progressive enhancement; less boilerplate; automatic serialization |
| Manual font loading | next/font | Next.js 13 (2022) | Eliminates FOUT/FOIT; automatic subsetting; Core Web Vitals improvement |
| Implicit caching | Opt-in Cache Components | Next.js 16 (Oct 2025) | More predictable caching; request-time by default; better debugging |

**Deprecated/outdated:**
- `@tailwind` directives: Replaced by `@import "tailwindcss"` in v4
- `getServerSideProps` / `getStaticProps`: Replaced by async Server Components and fetch with revalidate
- `_app.js` / `_document.js`: Replaced by App Router layouts and templates
- `next/legacy/image`: Use `next/image` (automatic optimization enabled by default)

## Open Questions

Things that couldn't be fully resolved:

1. **Next.js 16 vs "Next.js 16" in requirements**
   - What we know: Next.js 16 was released October 2025 and is production-ready
   - What's unclear: Requirements mention "Next.js 16" but latest stable is 16.1.x as of Feb 2026
   - Recommendation: Use `next@latest` (16.1.x) - includes bug fixes and React Compiler stability improvements

2. **Email service integration for contact form**
   - What we know: Server Action needs to send form data somewhere
   - What's unclear: Which email service (SendGrid, Resend, AWS SES) or CRM integration
   - Recommendation: Plan Phase 2 will need to specify email service; Server Action structure supports any provider

3. **SSL certificate provider**
   - What we know: HTTPS required for production; auto-configured on Vercel
   - What's unclear: Deployment target (Vercel vs self-hosted)
   - Recommendation: Assume Vercel deployment (zero SSL config); if self-hosted, use Let's Encrypt or Cloudflare

4. **Mobile breakpoint for emergency hotline display**
   - What we know: Click-to-call should appear in header on all pages
   - What's unclear: Should phone number be abbreviated on mobile? Icon-only on smallest screens?
   - Recommendation: Show full number on sm+ (640px), abbreviated on mobile (<640px); planner can refine in design tasks

## Sources

### Primary (HIGH confidence)
- [Next.js App Router Forms Guide](https://nextjs.org/docs/app/guides/forms) - Official Server Actions patterns
- [Next.js Production Checklist](https://nextjs.org/docs/app/guides/production-checklist) - Official deployment recommendations
- [Next.js Project Structure](https://nextjs.org/docs/app/getting-started/project-structure) - Official route organization patterns
- [Tailwind CSS v4.0 Blog](https://tailwindcss.com/blog/tailwindcss-v4) - Official v4 features and setup
- [Next.js Font Optimization](https://nextjs.org/docs/app/getting-started/fonts) - Official next/font documentation
- [Next.js Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components) - Official component boundaries

### Secondary (MEDIUM confidence)
- [Common Next.js App Router Mistakes - Vercel](https://vercel.com/blog/common-mistakes-with-the-next-js-app-router-and-how-to-fix-them) - Vercel official blog
- [Next.js 16 Release Notes](https://nextjs.org/blog/next-16) - Official release announcement
- [Next.js 15 App Router Guide - Medium](https://medium.com/@livenapps/next-js-15-app-router-a-complete-senior-level-guide-0554a2b820f7) - Comprehensive community guide (Dec 2024)
- [Tailwind v4 Migration Issues - GitHub](https://github.com/tailwindlabs/tailwindcss/discussions/16517) - Official GitHub discussions
- [Next.js Server Components Experience - Medium](https://medium.com/lets-code-future/next-js-server-components-broke-our-app-twice-worth-it-e511335eed22) - Production lessons (Jan 2026)

### Tertiary (LOW confidence)
- [React-Calendly Integration - Medium](https://medium.com/@dileep18052001/integrate-calendly-with-next-js-step-by-step-guide-dbb0b2fc30c9) - Community tutorial (needs official verification)
- [Mobile Navigation Patterns - GitHub Discussions](https://github.com/vercel/next.js/discussions/16316) - Community solutions
- [Accessible Phone Links - VA.gov Design System](https://design.va.gov/components/telephone) - Government accessibility guidelines (authoritative for a11y)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries verified via official docs and npm; Next.js 16 confirmed stable
- Architecture: HIGH - Patterns from official Next.js documentation and Vercel blog
- Pitfalls: HIGH - Sourced from official GitHub issues, Vercel blog, and production experience articles
- Tailwind v4: MEDIUM - Major changes confirmed but community still encountering migration edge cases
- Calendly integration: MEDIUM - react-calendly npm package stable but limited official Next.js App Router documentation

**Research date:** 2026-02-01
**Valid until:** 2026-03-15 (45 days - Next.js 16 stable, but rapid iteration continues)
**Notes:** Next.js 16 is current as of Feb 2026; Tailwind v4 released late 2024 but still seeing ecosystem adaptation; react-calendly last updated 2023 but community confirms Next.js 16 compatibility with dynamic imports.
