# Technology Stack

**Analysis Date:** 2026-03-10

## Languages

**Primary:**
- TypeScript 5.9.3 - All source code, components, and configuration
- JSX/TSX - React component definition

**Secondary:**
- JavaScript - Configuration files (PostCSS, Next.js config)
- CSS - Styling via Tailwind CSS

## Runtime

**Environment:**
- Node.js v24.13.0 (no .nvmrc file specified)

**Package Manager:**
- npm (with package-lock.json)
- Lockfile: present (package-lock.json v3)

## Frameworks

**Core:**
- Next.js 16.1.6 - Full-stack React framework with App Router, SSR, static generation
- React 19.2.4 - UI component library
- React DOM 19.2.4 - DOM rendering for React

**Styling:**
- Tailwind CSS 4.0.0 - Utility-first CSS framework
- @tailwindcss/postcss 4.1.18 - PostCSS integration for Tailwind

**Build/Dev:**
- PostCSS 8.5.6 - CSS transformation pipeline
- TypeScript 5.9.3 - Type checking and compilation

## Key Dependencies

**Critical:**
- react-calendly 4.4.0 - Calendly appointment scheduling widget integration
- zod 4.3.6 - Schema validation library (used for contact form validation in `app/lib/schemas.ts`)

**Type Definitions:**
- @types/node 25.2.0 - Node.js type definitions
- @types/react 19.2.10 - React type definitions
- @types/react-dom 19.2.3 - React DOM type definitions

## Configuration

**TypeScript Configuration:**
- Location: `tsconfig.json`
- Target: ES2017
- Module: esnext
- Strict mode: enabled
- JSX: react-jsx
- Path aliases: `@/*` maps to project root

**Next.js Configuration:**
- Location: `next.config.ts`
- React Strict Mode: enabled
- Image optimization: enabled (via Sharp for image processing)

**PostCSS Configuration:**
- Location: `postcss.config.mjs`
- Uses @tailwindcss/postcss plugin

## Environment Configuration

**Required environment variables:**
- `NEXT_PUBLIC_CALENDLY_URL` - Calendly booking calendar URL (default: https://calendly.com/your-username/consultation)
- `NEXT_PUBLIC_EMERGENCY_PHONE` - Emergency hotline number (default: 408-841-3982)
- `NEXT_PUBLIC_SITE_URL` - Base URL for the site (default: https://redleader.io)
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` - Domain for Plausible Analytics (optional, empty by default)
- `NEXT_PUBLIC_PLAUSIBLE_HOST` - Plausible Analytics host (default: plausible.io)

**Optional environment variables (Phase 2+):**
- `RESEND_API_KEY` - Email service API key (not yet implemented)

**Secrets location:**
- Environment variables stored in `.env.local` (not committed)
- Template provided: `.env.local.example`

## Build Scripts

**Available commands:**
- `npm run dev` - Start Next.js development server
- `npm run build` - Build Next.js application for production
- `npm start` - Start production server
- `npm run lint` - Run Next.js linting

## Platform Requirements

**Development:**
- Node.js v24+ (current environment)
- npm for package management
- UNIX-like environment (project uses .mjs files)

**Production:**
- Node.js 18.17.0+ or 20.3.0+ (based on Sharp binary support)
- Static hosting capable of serving Next.js output
- Environment variables configured at deployment time

## Special Features

**SEO & Metadata:**
- Sitemap generation: `app/sitemap.ts` (auto-generated MetadataRoute)
- Robots.txt generation: `app/robots.ts` (auto-generated MetadataRoute)
- Structured data (JSON-LD): `app/lib/structured-data.tsx` with schemas for Organization, WebSite, Service, Article, CaseStudy, BreadcrumbList, FAQPage, ProfessionalService
- Google Fonts: Inter font loaded from next/font/google

**Analytics Integration:**
- Plausible Analytics script loading via Next.js Script component (conditional on env var)
- Script strategy: "afterInteractive"

**Image Optimization:**
- Sharp image processing library included (for Next.js image optimization)
- Platform-specific binaries for Darwin/ARM64 and Darwin/x64

---

*Stack analysis: 2026-03-10*
