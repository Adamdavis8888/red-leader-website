# Architecture Research: Next.js 14+ Marketing Website

**Project:** Red Leader Website
**Researched:** 2026-01-31
**Confidence:** HIGH

## Executive Summary

Next.js 14+ marketing websites in 2026 follow a **server-first architecture** with strategic client interactivity. The App Router provides file-system routing, React Server Components by default, and hierarchical layouts that eliminate duplication. For Red Leader's tech consulting site, this means:

- **Fast initial loads** via server-rendered content (critical for lead generation)
- **Minimal JavaScript** sent to clients (only contact forms, Calendly embed need client-side code)
- **SEO-optimized by default** through server rendering and metadata API
- **Organized by intent** using route groups (marketing pages share common layout)

The architecture emphasizes **progressive enhancement**: forms work without JavaScript, images lazy-load automatically, and metadata composes hierarchically from root to page level.

---

## Recommended Directory Structure

Based on [Next.js official project structure](https://nextjs.org/docs/app/getting-started/project-structure) and [2026 best practices](https://dev.to/bajrayejoon/best-practices-for-organizing-your-nextjs-15-2025-53ji), here's the recommended organization:

```
red-leader-website/
├── app/                          # App Router (all routes)
│   ├── layout.tsx                # Root layout (global wrapper)
│   ├── page.tsx                  # Home page (/)
│   ├── globals.css               # Global styles + Tailwind
│   │
│   ├── (marketing)/              # Route group (doesn't affect URLs)
│   │   ├── layout.tsx            # Marketing layout (header, footer, CTA)
│   │   ├── services/
│   │   │   └── page.tsx          # /services
│   │   ├── case-studies/
│   │   │   ├── page.tsx          # /case-studies (list)
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # /case-studies/acme-rescue (dynamic)
│   │   ├── about/
│   │   │   └── page.tsx          # /about
│   │   └── contact/
│   │       └── page.tsx          # /contact
│   │
│   ├── blog/
│   │   ├── page.tsx              # /blog (list)
│   │   └── [slug]/
│   │       └── page.tsx          # /blog/post-title (dynamic)
│   │
│   └── api/                      # API routes (optional)
│       └── contact/
│           └── route.ts          # POST /api/contact (if not using Server Actions)
│
├── components/
│   ├── ui/                       # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── navigation.tsx
│   │   └── footer.tsx
│   ├── forms/
│   │   ├── contact-form.tsx      # Client Component for contact
│   │   └── calendly-embed.tsx    # Client Component for Calendly
│   └── marketing/
│       ├── hero.tsx
│       ├── services-grid.tsx
│       ├── testimonials.tsx
│       └── case-study-card.tsx
│
├── lib/
│   ├── actions/                  # Server Actions
│   │   └── contact.ts            # Form submission handler
│   ├── utils/
│   │   ├── metadata.ts           # SEO metadata helpers
│   │   └── cn.ts                 # Tailwind class merging
│   └── constants.ts              # Site config, nav items
│
├── content/                      # Markdown/MDX content
│   ├── case-studies/
│   │   ├── acme-rescue.mdx
│   │   └── startup-infrastructure.mdx
│   └── blog/
│       └── emergency-response.mdx
│
├── public/                       # Static assets
│   ├── images/
│   │   ├── logo.svg
│   │   ├── hero-bg.jpg
│   │   └── case-studies/
│   └── favicon.ico
│
├── types/
│   └── index.ts                  # TypeScript definitions
│
└── tailwind.config.ts            # Tailwind configuration
```

### Rationale

**Route groups `(marketing)/`**: Organizes pages by intent without affecting URLs. All marketing pages share a common layout (header, footer, CTA sections) while blog might have a different layout. [Source](https://nextjs.org/docs/app/api-reference/file-conventions/route-groups)

**Components by feature**: UI components in `components/ui/`, marketing-specific in `components/marketing/`, forms in `components/forms/`. This follows [scalable component organization patterns](https://thiraphat-ps-dev.medium.com/mastering-next-js-app-router-best-practices-for-structuring-your-application-3f8cf0c76580).

**Server Actions in `lib/actions/`**: Modern Next.js 14+ pattern for form submissions without API routes. [Official approach](https://nextjs.org/docs/app/getting-started/updating-data).

**Content separation**: MDX files in `content/` directory, keeping prose separate from code. Enables non-technical team members to edit case studies and blog posts.

---

## Component Architecture

### Server vs Client Component Strategy

**Default to Server Components** for performance and SEO. Only use Client Components (`'use client'`) for interactivity. [Official guidance](https://nextjs.org/docs/app/getting-started/server-and-client-components).

| Component Type | When to Use | Examples in Red Leader |
|----------------|-------------|------------------------|
| **Server Component** | Static content, data fetching, SEO-critical | Hero, Services Grid, Case Study List, Testimonials |
| **Client Component** | State, events, browser APIs | Contact Form, Calendly Embed, Mobile Menu Toggle, Click-to-Call Button |

### Component Composition Pattern

```tsx
// app/(marketing)/layout.tsx (Server Component)
import Navigation from '@/components/ui/navigation' // Server Component
import Footer from '@/components/ui/footer'         // Server Component

export default function MarketingLayout({ children }) {
  return (
    <>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>
  )
}

// app/(marketing)/page.tsx (Server Component)
import Hero from '@/components/marketing/hero'             // Server
import ServicesGrid from '@/components/marketing/services' // Server
import ContactCTA from '@/components/marketing/contact'    // Contains Client Component

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <ContactCTA /> {/* Wraps client-side contact form */}
    </>
  )
}

// components/marketing/contact.tsx (Server wrapper)
import ContactForm from '@/components/forms/contact-form' // Client Component

export default function ContactCTA() {
  return (
    <section className="bg-slate-900 py-16">
      <div className="container">
        <h2>Ready to Rescue Your Infrastructure?</h2>
        <ContactForm /> {/* Only this is client-side */}
      </div>
    </section>
  )
}

// components/forms/contact-form.tsx (Client Component)
'use client'

import { useState } from 'react'
import { submitContact } from '@/lib/actions/contact'

export default function ContactForm() {
  const [pending, setPending] = useState(false)

  async function handleSubmit(formData: FormData) {
    setPending(true)
    await submitContact(formData)
    setPending(false)
  }

  return (
    <form action={handleSubmit}>
      <input name="email" type="email" required />
      <button disabled={pending}>
        {pending ? 'Sending...' : 'Contact Us'}
      </button>
    </form>
  )
}
```

**Key principle**: Keep Server Components at the top, only mark as Client Component at the "leaves" where interactivity is needed. This minimizes JavaScript sent to browser.

### Layout Hierarchy

Layouts compose from root → route group → page. [Metadata merges hierarchically](https://nextjs.org/docs/app/api-reference/functions/generate-metadata).

```
app/layout.tsx (Root)
├── Metadata: title template, description, OG image
├── <html> and <body> tags
├── Google Analytics
└── Font loading

app/(marketing)/layout.tsx (Route Group)
├── Extends root metadata
├── Marketing header (nav, logo, CTA)
├── Marketing footer (links, contact info)
└── {children} rendered here

app/(marketing)/services/page.tsx (Page)
├── Metadata: specific title "Services | Red Leader"
└── Page content
```

This prevents duplication: header/footer defined once in `(marketing)/layout.tsx`, inherited by all marketing pages.

---

## Data Flow Architecture

### SEO Metadata Flow

**Hierarchical composition** from root → layout → page using [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata):

```tsx
// app/layout.tsx (Root)
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | Red Leader',
    default: 'Red Leader - Emergency Infrastructure Rescue',
  },
  description: 'Tech consulting specializing in emergency infrastructure rescue',
  metadataBase: new URL('https://redleader.com'),
  openGraph: {
    images: ['/og-image.jpg'],
  },
}

// app/(marketing)/services/page.tsx
export const metadata: Metadata = {
  title: 'Services', // Becomes "Services | Red Leader"
  description: 'Emergency infrastructure rescue, cloud migration, disaster recovery',
}
```

**For dynamic pages** (case studies, blog posts):

```tsx
// app/case-studies/[slug]/page.tsx
import type { Metadata } from 'next'

export async function generateMetadata({ params }): Promise<Metadata> {
  const caseStudy = await getCaseStudy(params.slug)

  return {
    title: caseStudy.title,
    description: caseStudy.excerpt,
    openGraph: {
      images: [caseStudy.image],
    },
  }
}
```

Metadata is **automatically rendered** in `<head>` by Next.js. No manual manipulation needed.

### Form Submission Flow (Server Actions)

**Modern 2026 pattern**: Server Actions eliminate API routes for form handling. [Official Next.js approach](https://nextjs.org/docs/app/guides/forms).

```
User fills form
    ↓
Client Component calls Server Action
    ↓
Server Action runs on server (validates, sends email, logs to DB)
    ↓
Returns success/error to client
    ↓
Client updates UI
```

```tsx
// lib/actions/contact.ts
'use server'

import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(10),
})

export async function submitContact(formData: FormData) {
  const parsed = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  })

  if (!parsed.success) {
    return { error: 'Invalid form data' }
  }

  // Send email via API (Resend, SendGrid, etc.)
  await sendEmail(parsed.data)

  return { success: true }
}
```

**Benefits**:
- No separate API route needed
- Type-safe with Zod validation
- Runs on server (keeps API keys secure)
- Works without JavaScript (progressive enhancement)

### Content Flow (Blog & Case Studies)

**MDX-based content** for rich formatting. [Next.js MDX guide](https://nextjs.org/docs/app/guides/mdx).

```
Markdown files in content/
    ↓
Read with Node.js fs (server-side only)
    ↓
Parse frontmatter (title, date, author)
    ↓
Render MDX to React components
    ↓
Server Component displays content
```

```tsx
// app/blog/[slug]/page.tsx
import { getPostBySlug } from '@/lib/mdx'

export default async function BlogPost({ params }) {
  const post = await getPostBySlug(params.slug)

  return (
    <article>
      <h1>{post.frontmatter.title}</h1>
      <div className="prose">{post.content}</div>
    </article>
  )
}
```

**Alternative**: Use [Velite](https://github.com/zce/velite) for type-safe content collections with Zod schemas.

### Analytics Flow

**Google Analytics via `@next/third-parties`**: [Official Next.js integration](https://nextjs.org/docs/messages/next-script-for-ga).

```tsx
// app/layout.tsx
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      </body>
    </html>
  )
}
```

**Benefits over manual gtag.js**:
- Optimized script loading (deferred after hydration)
- TypeScript support
- Better Core Web Vitals (doesn't block rendering)

### Image Optimization Flow

**Automatic via Next.js `<Image>` component**: [Official image optimization guide](https://nextjs.org/docs/app/getting-started/images).

```
Developer uses <Image> component
    ↓
Next.js generates optimized sizes at build time
    ↓
Serves WebP/AVIF to modern browsers
    ↓
Lazy-loads below-the-fold images
    ↓
User sees optimized image for their device
```

```tsx
import Image from 'next/image'

<Image
  src="/hero-bg.jpg"
  alt="Emergency infrastructure rescue"
  width={1200}
  height={600}
  priority // For above-the-fold (hero images)
  placeholder="blur" // Shows blur while loading
/>
```

---

## Build Order Recommendations

### Phase 1: Foundation (Week 1)
**What to build:**
1. Next.js project scaffolding with Tailwind
2. Root layout with fonts, analytics, global styles
3. Basic component structure (Button, Card, Container)
4. Route groups `(marketing)/` with shared layout
5. Static home page (no forms yet)

**Rationale:**
- Establishes architecture before adding complexity
- Validates design system (colors, typography, spacing)
- Tests deployment pipeline early

**Dependencies:**
- None (greenfield project)

**Critical files:**
```
app/layout.tsx           # Root layout
app/(marketing)/layout.tsx  # Marketing layout
components/ui/           # UI primitives
tailwind.config.ts       # Design tokens
```

### Phase 2: Static Marketing Pages (Week 1-2)
**What to build:**
1. Services page (grid layout)
2. About page (team, mission)
3. Navigation component
4. Footer component
5. SEO metadata per page

**Rationale:**
- Server Components only (no client complexity)
- Builds content structure before dynamic features
- Enables early stakeholder review

**Dependencies:**
- Phase 1 (foundation)

**Critical patterns:**
```tsx
// Each page exports metadata
export const metadata = { title: '...', description: '...' }

// Uses shared layout from (marketing)/layout.tsx
// Composes UI components from components/ui/
```

### Phase 3: Contact Forms (Week 2)
**What to build:**
1. Contact form Client Component
2. Server Action for form submission
3. Form validation with Zod
4. Email integration (Resend/SendGrid)
5. Click-to-call button component

**Rationale:**
- First Client Component introduction
- Tests Server Actions pattern
- Critical for lead generation (business value)

**Dependencies:**
- Phase 2 (Contact page exists)

**Critical files:**
```
components/forms/contact-form.tsx  # Client Component
lib/actions/contact.ts             # Server Action
```

### Phase 4: Dynamic Content (Week 2-3)
**What to build:**
1. Case studies list page
2. Case studies dynamic route `[slug]/page.tsx`
3. MDX integration for rich content
4. Case study cards/grid component
5. Blog list and blog post pages

**Rationale:**
- Demonstrates technical expertise (case studies)
- Dynamic routing for scalable content
- MDX enables non-technical content editing

**Dependencies:**
- Phase 2 (static pages as template)

**Critical patterns:**
```tsx
// Dynamic metadata
export async function generateMetadata({ params }) { ... }

// Dynamic params
export async function generateStaticParams() { ... }
```

### Phase 5: Integrations (Week 3)
**What to build:**
1. Calendly embed component (Client Component)
2. Google Analytics setup
3. Image optimization for case study images
4. Open Graph images for social sharing

**Rationale:**
- Calendly enables appointment booking (lead conversion)
- Analytics tracks visitor behavior
- Images optimized for performance (Core Web Vitals)

**Dependencies:**
- Phase 3 (Contact flow established)
- Phase 4 (Case studies with images)

**Critical files:**
```
components/forms/calendly-embed.tsx  # Client Component
app/layout.tsx                       # GA integration
public/og-images/                    # Social sharing images
```

### Phase 6: Performance & SEO Polish (Week 3-4)
**What to build:**
1. Loading states for dynamic routes
2. Error boundaries
3. 404 page
4. Sitemap generation
5. Robots.txt
6. Structured data (JSON-LD) for case studies

**Rationale:**
- Professional error handling
- SEO completeness (sitemap, robots)
- Structured data improves search visibility

**Dependencies:**
- Phase 4 (all content exists)
- Phase 5 (analytics tracking errors)

**Critical files:**
```
app/sitemap.ts           # Dynamic sitemap
app/robots.ts            # Crawler directives
app/loading.tsx          # Loading UI
app/error.tsx            # Error boundary
```

---

## Component Boundaries & Communication

### Component Hierarchy

```
Root Layout (Server)
├── Google Analytics (Client)
├── Marketing Layout (Server)
│   ├── Navigation (Server)
│   │   └── Mobile Menu Toggle (Client)
│   ├── Page Content (Server)
│   │   ├── Hero (Server)
│   │   ├── Services Grid (Server)
│   │   └── Contact CTA (Server)
│   │       └── Contact Form (Client)
│   └── Footer (Server)
│       └── Newsletter Form (Client)
```

**Communication rules:**
- **Server → Client**: Pass data as props (must be serializable)
- **Client → Server**: Call Server Actions
- **Client → Client**: Standard React props/context
- **Server → Server**: Direct function calls, shared utilities

### Data Fetching Boundaries

**Server Components** fetch data directly (no useState, useEffect):

```tsx
// app/(marketing)/case-studies/page.tsx (Server Component)
async function getCaseStudies() {
  const files = await fs.readdir('./content/case-studies')
  return files.map(file => parseMDX(file))
}

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies()

  return (
    <div className="grid">
      {caseStudies.map(study => (
        <CaseStudyCard key={study.slug} {...study} />
      ))}
    </div>
  )
}
```

**Client Components** receive data from Server Components:

```tsx
// components/forms/contact-form.tsx (Client Component)
'use client'

export default function ContactForm({ defaultEmail }: { defaultEmail?: string }) {
  const [email, setEmail] = useState(defaultEmail || '')
  // ...
}
```

---

## Patterns to Follow

### Pattern 1: Progressive Enhancement Forms

**What:** Forms work without JavaScript, enhanced with client-side validation.

**When:** All forms (contact, newsletter).

**How:**
```tsx
'use client'

import { useFormStatus } from 'react-dom'

function SubmitButton() {
  const { pending } = useFormStatus()
  return <button disabled={pending}>{pending ? 'Sending...' : 'Send'}</button>
}

export default function ContactForm() {
  return (
    <form action={submitContact}>
      <input name="email" type="email" required />
      <SubmitButton />
    </form>
  )
}
```

**Why:** Accessible, works with JavaScript disabled, better UX with JavaScript enabled.

### Pattern 2: Metadata Composition

**What:** Define metadata at layout level, override at page level.

**When:** All pages for SEO.

**How:**
```tsx
// app/layout.tsx
export const metadata = {
  title: { template: '%s | Red Leader', default: 'Red Leader' },
}

// app/(marketing)/services/page.tsx
export const metadata = {
  title: 'Services', // Becomes "Services | Red Leader"
}
```

**Why:** DRY, consistent branding, easy per-page customization.

### Pattern 3: Lazy-Loaded Client Components

**What:** Load heavy Client Components only when needed.

**When:** Calendly embed, chat widgets, complex forms.

**How:**
```tsx
import dynamic from 'next/dynamic'

const CalendlyEmbed = dynamic(() => import('@/components/forms/calendly-embed'), {
  loading: () => <p>Loading calendar...</p>,
  ssr: false, // Don't render on server
})

export default function ContactPage() {
  return (
    <>
      <h1>Contact Us</h1>
      <CalendlyEmbed />
    </>
  )
}
```

**Why:** Reduces initial bundle size, improves Time to Interactive.

### Pattern 4: Colocation of Related Code

**What:** Keep component-specific utilities, types, and tests together.

**When:** Complex features with multiple files.

**How:**
```
components/forms/
├── contact-form.tsx
├── contact-form.test.tsx
├── contact-form.types.ts
└── contact-form.utils.ts
```

**Why:** Easier to find related code, better encapsulation.

### Pattern 5: Server-Only Utilities

**What:** Mark server-only code to prevent client-side imports.

**When:** Database queries, API key usage, sensitive logic.

**How:**
```tsx
// lib/email.ts
import 'server-only'

export async function sendEmail(to: string, subject: string, body: string) {
  // Uses process.env.EMAIL_API_KEY
}
```

**Why:** Build-time error if accidentally imported in Client Component.

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: Over-Using Client Components

**What:** Marking entire page as `'use client'` when only small part needs interactivity.

**Why bad:** Sends unnecessary JavaScript to browser, slower initial load.

**Instead:** Keep Server Components at top, mark only interactive leaves as Client Components.

```tsx
// ❌ Bad
'use client'
export default function ServicesPage() {
  const [expanded, setExpanded] = useState(false)
  return (
    <>
      <Hero />
      <Services />
      <Accordion expanded={expanded} setExpanded={setExpanded} />
    </>
  )
}

// ✅ Good
export default function ServicesPage() {
  return (
    <>
      <Hero /> {/* Server Component */}
      <Services /> {/* Server Component */}
      <Accordion /> {/* Only this is Client Component */}
    </>
  )
}
```

### Anti-Pattern 2: Client-Side Data Fetching

**What:** Using useEffect to fetch data in Client Components.

**Why bad:** Slower (waits for JavaScript), not SEO-friendly, waterfall requests.

**Instead:** Fetch in Server Components, pass as props.

```tsx
// ❌ Bad
'use client'
export default function CaseStudies() {
  const [studies, setStudies] = useState([])

  useEffect(() => {
    fetch('/api/case-studies').then(r => r.json()).then(setStudies)
  }, [])

  return <div>{studies.map(...)}</div>
}

// ✅ Good
async function getCaseStudies() {
  return await readMDXFiles('./content/case-studies')
}

export default async function CaseStudies() {
  const studies = await getCaseStudies()
  return <div>{studies.map(...)}</div>
}
```

### Anti-Pattern 3: Duplicating Layout Code

**What:** Copy-pasting header/footer into every page.

**Why bad:** Maintenance nightmare, inconsistent UI.

**Instead:** Use layouts with route groups.

```tsx
// ❌ Bad
export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>Services content</main>
      <Footer />
    </>
  )
}

// ✅ Good
// app/(marketing)/layout.tsx
export default function MarketingLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

// app/(marketing)/services/page.tsx
export default function ServicesPage() {
  return <div>Services content</div> // Header/Footer automatic
}
```

### Anti-Pattern 4: Ignoring Image Optimization

**What:** Using `<img>` instead of Next.js `<Image>`.

**Why bad:** Large file sizes, no lazy loading, poor Core Web Vitals.

**Instead:** Always use `<Image>` for performance.

```tsx
// ❌ Bad
<img src="/hero.jpg" alt="Hero" />

// ✅ Good
<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority
/>
```

### Anti-Pattern 5: Manual Meta Tag Management

**What:** Manually adding `<meta>` tags with `next/head` or React Helmet.

**Why bad:** Doesn't compose properly, verbose, not type-safe.

**Instead:** Use Metadata API.

```tsx
// ❌ Bad
import Head from 'next/head'
export default function Page() {
  return (
    <>
      <Head>
        <title>Services | Red Leader</title>
        <meta name="description" content="..." />
      </Head>
      <div>Content</div>
    </>
  )
}

// ✅ Good
export const metadata = {
  title: 'Services',
  description: '...',
}

export default function Page() {
  return <div>Content</div>
}
```

---

## Scalability Considerations

### At Launch (100-1000 visitors/month)

**Focus:** Core functionality, basic performance.

**Architecture:**
- Static generation for all marketing pages (SSG)
- Server Components for all non-interactive content
- Minimal Client Components (contact form, Calendly)
- MDX files in repository

**Performance targets:**
- Lighthouse score: 90+
- First Contentful Paint: <1.5s
- Time to Interactive: <3s

**Deployment:** Vercel/Netlify with automatic static optimization.

### At Growth (10K-50K visitors/month)

**Focus:** Content scalability, performance optimization.

**Architecture:**
- Consider headless CMS (Sanity, Contentful) for case studies/blog
- Add Incremental Static Regeneration (ISR) for frequently updated content
- Image CDN for case study images (Cloudinary, imgix)
- Add caching headers for static assets

**Performance targets:**
- Lighthouse score: 95+
- First Contentful Paint: <1s
- Time to Interactive: <2s

**Deployment:** CDN-backed (Vercel Edge, Cloudflare Pages).

### At Scale (100K+ visitors/month)

**Focus:** Advanced optimization, A/B testing, analytics depth.

**Architecture:**
- Headless CMS with webhook-triggered revalidation
- Edge middleware for A/B testing, personalization
- Advanced image optimization (AVIF format, responsive srcsets)
- Database for form submissions (replace email notifications)
- Analytics pipeline (segment, mixpanel, custom events)

**Performance targets:**
- Lighthouse score: 95+
- First Contentful Paint: <0.8s
- Time to Interactive: <1.5s
- Core Web Vitals: all green

**Deployment:** Multi-region edge deployment, advanced caching strategies.

---

## Technology-Specific Decisions

### Why Next.js 14+ App Router (Not Pages Router)

**App Router benefits:**
- React Server Components (less JavaScript to browser)
- Nested layouts (DRY header/footer)
- Built-in loading/error states
- Streaming for faster perceived performance
- Better TypeScript support

**Pages Router deprecated:** Official Next.js recommendation is App Router for new projects. [Source](https://nextjs.org/docs/app).

### Why Tailwind CSS (Not CSS Modules or styled-components)

**Tailwind benefits for marketing sites:**
- Utility-first prevents CSS bloat (unused styles purged automatically)
- Design system built-in (consistent spacing, colors)
- No runtime cost (unlike styled-components)
- Fast iteration (no switching between files)

**For Red Leader specifically:** Tech consulting site needs rapid iteration. Tailwind enables designers to see changes quickly without touching CSS files. [2026 best practices](https://www.frontendtools.tech/blog/tailwind-css-best-practices-design-system-patterns).

### Why MDX (Not API-based CMS for MVP)

**MDX benefits:**
- Zero infrastructure (files in repository)
- Version controlled (Git tracks content changes)
- Fast (no API calls)
- Developer-friendly (Markdown + React components)

**When to migrate to CMS:** When non-technical team members need to edit content frequently (likely post-MVP). Consider Sanity or Contentful at that point.

### Why Server Actions (Not API Routes)

**Server Actions benefits:**
- Less boilerplate (no separate API route file)
- Type-safe (no manual request parsing)
- Progressive enhancement (works without JavaScript)
- Better DX (collocated with components)

**Tradeoff:** Requires Next.js 14+. For older versions, use API routes.

---

## Build Dependencies & Sequencing

### Critical Path

```
Foundation (Tailwind, layouts)
    ↓
Static pages (Server Components only)
    ↓
Forms & Client Components
    ↓
Dynamic routes (case studies, blog)
    ↓
Integrations (analytics, Calendly)
    ↓
Performance polish
```

### Parallel Work Opportunities

After foundation is complete, these can be built in parallel:

**Track 1 (Content):**
- Static marketing pages
- MDX case studies
- Blog posts

**Track 2 (Interactivity):**
- Contact form
- Server Actions
- Calendly embed

**Track 3 (Design System):**
- UI components library
- Tailwind configuration
- Component documentation

### Blocking Dependencies

| Feature | Blocked By | Reason |
|---------|-----------|--------|
| Contact form | Foundation | Needs layout, design system |
| Case studies | Static pages | Template for content structure |
| Blog | Case studies | Same dynamic routing pattern |
| Calendly embed | Contact form | Same Client Component pattern |
| Analytics | Root layout | Needs layout structure |
| SEO metadata | All pages | Each page defines metadata |

---

## Sources

**Official Next.js Documentation (HIGH confidence):**
- [Next.js Project Structure](https://nextjs.org/docs/app/getting-started/project-structure)
- [Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- [Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Forms and Server Actions](https://nextjs.org/docs/app/guides/forms)
- [Route Groups](https://nextjs.org/docs/app/api-reference/file-conventions/route-groups)
- [Image Optimization](https://nextjs.org/docs/app/getting-started/images)
- [MDX Integration](https://nextjs.org/docs/app/guides/mdx)
- [Google Analytics via @next/third-parties](https://nextjs.org/docs/messages/next-script-for-ga)

**2026 Best Practices (MEDIUM confidence):**
- [Next.js 14 Project Structure Best Practices](https://nextjsstarter.com/blog/nextjs-14-project-structure-best-practices/)
- [Best Practices for Organizing Your Next.js 15 2025](https://dev.to/bajrayejoon/best-practices-for-organizing-your-nextjs-15-2025-53ji)
- [Mastering Next.js App Router](https://thiraphat-ps-dev.medium.com/mastering-next-js-app-router-best-practices-for-structuring-your-application-3f8cf0c76580)
- [Next.js Architecture in 2026 — Server-First](https://www.yogijs.tech/blog/nextjs-project-architecture-app-router)
- [Next.js Server Actions Complete Guide 2026](https://dev.to/marufrahmanlive/nextjs-server-actions-complete-guide-with-examples-for-2026-2do0)
- [Tailwind CSS Best Practices 2025-2026](https://www.frontendtools.tech/blog/tailwind-css-best-practices-design-system-patterns)

**Community Examples (MEDIUM confidence):**
- [How I Built my Blog using MDX, Next.js](https://www.joshwcomeau.com/blog/how-i-built-my-blog/)
- [Building a Modern Blog with Next.js, MDX, and Tailwind](https://dev.to/gerryleonugroho/building-a-modern-blog-with-nextjs-mdx-and-tailwind-css-a24)

---

## Confidence Assessment

| Area | Confidence | Reason |
|------|-----------|--------|
| Directory Structure | HIGH | Official Next.js docs + verified with WebFetch |
| Server/Client Components | HIGH | Official docs, verified 2026 patterns |
| Metadata Implementation | HIGH | Verified with official Metadata API docs |
| Server Actions | HIGH | Official Next.js forms guide, verified examples |
| Route Groups | HIGH | Official Next.js docs, verified patterns |
| Image Optimization | HIGH | Official Next.js Image component docs |
| MDX Integration | MEDIUM | Official docs + community examples |
| Tailwind Organization | MEDIUM | Community best practices, not official standard |
| Analytics Integration | HIGH | Official @next/third-parties package |

---

## Summary for Roadmap Creation

**Recommended phase structure** based on dependencies:

1. **Foundation** (Week 1): Project setup, layouts, design system
2. **Static Content** (Week 1-2): Marketing pages, navigation, footer
3. **Forms** (Week 2): Contact form, Server Actions, lead capture
4. **Dynamic Content** (Week 2-3): Case studies, blog with MDX
5. **Integrations** (Week 3): Calendly, analytics, social sharing
6. **Polish** (Week 3-4): Performance optimization, SEO completion

**Critical architectural decisions:**
- Server Components by default (less JavaScript)
- Route groups for layout organization
- Server Actions for forms (no API routes)
- MDX for content (migrate to CMS post-MVP if needed)
- Metadata API for SEO (hierarchical composition)

**Build order rationale:**
- Foundation enables all other work
- Static pages before dynamic (simpler, establishes patterns)
- Forms after layouts (needs design system)
- Integrations after core functionality (additive, not blocking)
