# Coding Conventions

**Analysis Date:** 2026-03-10

## Naming Patterns

**Files:**
- React components: PascalCase (e.g., `ContactForm.tsx`, `Header.tsx`, `TeamSection.tsx`)
- Data/utilities: camelCase with descriptive names (e.g., `schemas.ts`, `structured-data.tsx`, `case-studies.ts`)
- Route segments and special files follow Next.js conventions (e.g., `page.tsx`, `layout.tsx`, `error.tsx`, `not-found.tsx`)
- Dynamic routes use brackets (e.g., `[slug]/page.tsx`)

**Functions:**
- React components: PascalCase (e.g., `ContactForm()`, `Header()`, `SubmitButton()`, `FieldError()`)
- Regular functions: camelCase (e.g., `getServiceBySlug()`, `getRelatedServices()`, `generateOrganizationSchema()`)
- Helper/utility functions: camelCase (e.g., `submitContactForm()`)
- Exported function conventions match library patterns (e.g., `export function JsonLd()` for a component)

**Variables:**
- camelCase consistently used throughout (e.g., `emergencyPhone`, `fieldErrors`, `validatedFields`)
- Constants in camelCase (e.g., `BASE_URL`, `EMERGENCY_PHONE` - but these are actually env-backed, not uppercase)
- State variables: camelCase (e.g., `pending`, `state`, `formData`)

**Types:**
- Interfaces: PascalCase (e.g., `ServiceMetric`, `Service`, `ContactFormData`, `ContactFormState`, `TeamMember`)
- Generic types exported from data files follow the interface pattern
- Type imports use explicit `type` keyword: `import { type TeamMember } from '@/app/data/team'`

**Classes/Interfaces in Schema:**
- Schema objects follow JavaScript naming (camelCase properties within objects, but type definitions use PascalCase)
- Zod schema exports: camelCase (e.g., `contactSchema`)
- Inferred types from Zod: PascalCase (e.g., `type ContactFormData = z.infer<typeof contactSchema>`)

## Code Style

**Formatting:**
- No explicit Prettier/ESLint config detected in project root
- Uses Tailwind CSS for styling (no global CSS except theme variables)
- Consistent spacing in JSX: attributes on separate lines when content is substantial
- Import statements are formatted consistently with clear grouping

**Linting:**
- Next.js default linting is enabled via `npm run lint` command
- No custom ESLint or Prettier config files present
- Strict TypeScript is enabled in `tsconfig.json` with `"strict": true`

## Import Organization

**Order:**
1. Framework imports (React, Next.js): `import { useEffect } from 'react'`, `import Link from 'next/link'`
2. Internal component imports: `import { CalendlyEmbed } from '@/app/components/CalendlyEmbed'`
3. Internal data/utility imports: `import { contactSchema } from '@/app/lib/schemas'`
4. Type-specific imports at module level: `import type { ContactFormState } from '@/app/actions/contact'`

**Example from codebase** (`app/(marketing)/page.tsx`):
```typescript
import Link from 'next/link'
import { CalendlyEmbed } from '@/app/components/CalendlyEmbed'
import { SuccessMetrics } from '@/app/components/SuccessMetrics'
import { ClientLogos } from '@/app/components/ClientLogos'
import { Testimonials } from '@/app/components/Testimonials'
import { Certifications } from '@/app/components/Certifications'
import {
  JsonLd,
  generateOrganizationSchema,
  generateWebSiteSchema,
} from '@/app/lib/structured-data'
```

**Path Aliases:**
- `@/` maps to project root (configured in `tsconfig.json`: `"@/*": ["./*"]`)
- All internal imports use `@/app/` prefix
- Example: `import { contactSchema } from '@/app/lib/schemas'`

## Error Handling

**Patterns:**
- Server actions use `try/catch` with console.error logging: `console.error('Contact form error:', error)`
- Form validation errors returned in structured format: `{ fieldErrors: { name?: string[], email?: string[], ... } }`
- Client-side error states use React component rendering: `if (state?.error) { return <div role="alert">... }`
- Error component uses `console.error()` for reporting: `console.error('Application error:', error)`
- Error digests logged for development debugging

**Error Recovery:**
- User-facing errors provide actionable CTAs (e.g., "Try Again", "Go Home")
- Development environment shows error details; production hides them
- Error boundaries implemented via `error.tsx` and `global-error.tsx` (Next.js convention)

## Logging

**Framework:** console methods (no external logging service integrated yet)

**Patterns:**
- `console.log()` for informational messages (e.g., form submissions)
- `console.error()` for error reporting with context
- Logging includes descriptive prefixes (e.g., `'Contact form submission:'`, `'Application error:'`, `'Contact form error:'`)
- Errors logged before user-facing error messages are returned
- Comments indicate future integration points (see `app/actions/contact.ts` - "TODO: Integrate with email service")

**Typical pattern:**
```typescript
try {
  console.log('Contact form submission:', { name, email, company, message })
  // ... processing
  return { success: true }
} catch (error) {
  console.error('Contact form error:', error)
  return { error: 'User-friendly message' }
}
```

## Comments

**When to Comment:**
- Comments describe _why_ something is done, not _what_ the code does
- Comments precede major sections or complex logic
- Comments explain non-obvious workarounds or trade-offs
- Process-related comments (TODO, FIXME) indicate future work

**Examples from codebase:**
- `// Parse and validate form data` - explains the intent of validation block
- `// Return validation errors if any` - clarifies conditional logic
- `// Log the error to an error reporting service` - explains intent for future integration
- `// Simulate processing delay` - explains why a delay exists
- `// TODO: Integrate with email service (Resend, SendGrid, etc.) in Phase 2+` - indicates planned work
- `// Dynamic import with SSR disabled - Calendly requires browser DOM` - explains technical necessity

**JSDoc/TSDoc:**
- Not extensively used in current codebase
- Type signatures are self-documenting via TypeScript interfaces
- Function parameters use inline types rather than JSDoc annotations
- Example: interfaces document data shapes:
  ```typescript
  interface Service {
    id: string
    slug: string
    title: string
    // ... other fields
  }
  ```

## Function Design

**Size:** Functions are generally small and focused (e.g., `SubmitButton()` is 30 lines, `FieldError()` is 5 lines)

**Parameters:**
- Use destructuring for component props: `function SubmitButton() { const { pending } = useFormStatus() }`
- Use object parameters for multiple related values: `{ errors ?: string[] }`
- Server actions use FormData parameter for form submissions

**Return Values:**
- Components return JSX
- Server actions return explicit state objects: `type ContactFormState = { success?: boolean, error?: string, fieldErrors?: {...} } | null`
- Utility functions return typed objects or primitives

**Example server action pattern** (`app/actions/contact.ts`):
```typescript
export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // ... validation and processing
  if (!validatedFields.success) {
    return { fieldErrors: validatedFields.error.flatten().fieldErrors }
  }
  // ... more processing
  return { success: true }
}
```

## Module Design

**Exports:**
- Explicit named exports for clarity: `export const services: Service[] = [...]`
- Type exports use `export type` or exported interface
- Components export as default or named: both patterns exist (`export default function HomePage()` and `export function ContactForm()`)
- Data modules export constants and helper functions: `export function getServiceBySlug(slug: string): Service | undefined`

**Barrel Files:**
- Not used extensively in current structure
- Direct imports preferred over index files

**Module Patterns:**
- Data modules (`app/data/*.ts`) export typed arrays and utility functions
- Component modules (`app/components/*.tsx`) export single or multiple related components
- Library modules (`app/lib/*.tsx`) export utility functions and constants
- Schemas module centralizes validation logic via Zod

## Client/Server Separation

**Directive Usage:**
- `'use client'` at top of client component files (e.g., `ContactForm.tsx`, `error.tsx`)
- `'use server'` at top of server action files (e.g., `app/actions/contact.ts`)
- Server components are default in Next.js App Router (no directive needed)

**React Hooks:**
- Client components use hooks: `useActionState`, `useFormStatus`, `useEffect`
- Server-only functions marked with directive in actions files

---

*Convention analysis: 2026-03-10*
