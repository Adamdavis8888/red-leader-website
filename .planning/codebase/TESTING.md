# Testing Patterns

**Analysis Date:** 2026-03-10

## Test Framework

**Status:** No automated testing framework currently configured

**Notes:**
- No test runner dependencies detected in `package.json` (no Jest, Vitest, Playwright, etc.)
- No test config files present (no `jest.config.js`, `vitest.config.ts`, etc.)
- No `.test.ts`, `.test.tsx`, `.spec.ts`, or `.spec.tsx` files in project
- Project uses Next.js 16.1.6 which includes built-in testing support via Next.js CLI, but not integrated

**Recommendation:** This is a critical gap. Testing should be implemented as a core requirement in the next phase.

## Manual Testing Approach

**Current State:**
The codebase relies on manual testing via Next.js dev server and browser testing.

**Development Testing:**
```bash
npm run dev        # Start Next.js dev server for manual testing
npm run build      # Build and test production-like environment
npm run start      # Run production build locally
npm run lint       # Run Next.js linter (validates TypeScript and ESLint)
```

**Run Commands:**
- `npm run dev` - Start development server (enables hot reload for manual testing)
- `npm run build` - Build Next.js application (tests compilation, catches TypeScript errors)
- `npm run lint` - Run Next.js built-in linting (validates code style and type safety)

## Test Coverage Gaps

**Critical Areas Without Tests:**

1. **Form Validation** (`app/actions/contact.ts`, `app/lib/schemas.ts`):
   - Zod schema validation logic untested
   - Server action `submitContactForm()` lacks unit tests
   - Edge cases not verified (boundary values, special characters, etc.)

2. **Component Rendering** (`app/components/*.tsx`):
   - Components render without automated verification
   - No tests for conditional rendering (e.g., success/error states in `ContactForm`)
   - No tests for accessibility (ARIA labels, role attributes exist but not validated)

3. **Data Modules** (`app/data/*.ts`):
   - Service retrieval functions (`getServiceBySlug()`, `getRelatedServices()`) untested
   - Data integrity not validated
   - No tests for edge cases (missing slugs, circular dependencies)

4. **Server Functions** (`app/lib/structured-data.tsx`):
   - Schema generation functions (`generateOrganizationSchema()`, etc.) untested
   - JSON-LD output structure not validated
   - No verification against schema.org standards

5. **Integration Points:**
   - Form submission to server action not tested end-to-end
   - Calendly embed integration not tested
   - Environment variable loading not tested

## Current Type Safety

**TypeScript Validation:**
- `tsconfig.json` has `"strict": true` enabling comprehensive type checking
- This provides compile-time validation where runtime tests would normally occur
- Interfaces used extensively to type-guard data (e.g., `Service`, `ContactFormState`, `TeamMember`)

**Example - Type-safe schema** (`app/lib/schemas.ts`):
```typescript
import { z } from 'zod'

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  company: z
    .string()
    .min(2, 'Company name must be at least 2 characters')
    .max(100, 'Company name must be less than 100 characters'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must be less than 5000 characters'),
})

export type ContactFormData = z.infer<typeof contactSchema>
```

Type inference from Zod provides partial validation coverage, but runtime test cases are needed.

## Error Boundary Testing

**Error Handling Infrastructure:**
- `app/error.tsx` implements error boundary component for route errors
- `app/global-error.tsx` would catch global application errors
- `app/not-found.tsx` handles 404 scenarios

**Current Testing:**
- Errors are logged to console: `console.error('Application error:', error)`
- Development mode shows error details; production hides them (line 51 in `app/error.tsx`)
- No automated tests verify error boundaries catch and display errors properly

**Manual Testing Approach:**
```
1. Simulate error: Edit component to throw error
2. Start dev server: npm run dev
3. Observe error boundary renders recovery UI
4. Check console for error logging
5. Build production: npm run build (catches build errors)
```

## Form Testing (Manual)

**ContactForm Component** (`app/components/ContactForm.tsx`):
- Form submission calls server action `submitContactForm()`
- Client-side state managed via `useActionState()` hook
- Server-side validation via Zod schema in `app/lib/schemas.ts`

**Current Manual Testing Workflow:**
1. Navigate to `/contact` page
2. Submit form with:
   - Valid data → observe success message (lines 62-87)
   - Invalid data → observe field errors render (e.g., line 112: `<FieldError errors={state?.fieldErrors?.name} />`)
   - Empty fields → required attribute prevents submission
3. Check console for form data logging (line 40 in `app/actions/contact.ts`)

**Missing Test Coverage:**
- No automated tests for validation messages
- No tests for pending state during submission (line 8: `const { pending } = useFormStatus()`)
- No tests for error recovery and retry logic

## Data Validation Testing

**Zod Schemas** (`app/lib/schemas.ts`):
Currently manual - schema validation works via:
1. Form submission captures FormData
2. `contactSchema.safeParse()` validates (line 21 in `app/actions/contact.ts`)
3. Errors returned and rendered

**Testing Approach Needed:**
- Unit tests for schema with valid/invalid inputs
- Edge case testing (max length, special characters, email formats)
- Error message verification

## Static Analysis

**Next.js Linting:**
The `npm run lint` command provides static analysis:
- TypeScript type checking via `strict: true` in `tsconfig.json`
- Next.js-specific rules (no unoptimized images, etc.)
- ESLint integration (default Next.js config)

**Run:**
```bash
npm run lint    # Validates TypeScript, Next.js rules, and ESLint defaults
```

## Testing Implementation Requirements

**For minimal test coverage, implement:**

1. **Form Validation Tests:**
   - Framework: Vitest (lightweight, pairs well with Next.js)
   - Location: `app/lib/__tests__/schemas.test.ts`
   - Coverage: Zod schema validation with valid/invalid inputs

2. **Server Action Tests:**
   - Framework: Vitest
   - Location: `app/actions/__tests__/contact.test.ts`
   - Coverage: `submitContactForm()` with various states (validation failure, success)

3. **Component Tests:**
   - Framework: Vitest + React Testing Library
   - Location: `app/components/__tests__/ContactForm.test.tsx`
   - Coverage: Form rendering, error display, pending state

4. **End-to-End Tests:**
   - Framework: Playwright or Cypress
   - Location: `e2e/contact.spec.ts`
   - Coverage: Full form submission flow including network calls

## Current Build Validation

**TypeScript Compilation:**
```bash
npm run build    # Compiles TypeScript, catches type errors, builds Next.js application
```

During build, TypeScript with `strict: true` catches:
- Type mismatches
- Missing properties on typed objects
- Null/undefined reference errors
- JSX prop type mismatches

**This provides compile-time safety but does not test:**
- Runtime behavior
- Integration between components
- Form submission workflows
- Error handling paths

## Future Testing Strategy

**Recommended Progression:**

1. **Phase 1 - Critical Path:**
   - Add Vitest for unit tests
   - Test form validation schema (`schemas.ts`)
   - Test contact form server action

2. **Phase 2 - Component Coverage:**
   - Add React Testing Library
   - Test ContactForm component rendering
   - Test error boundary rendering

3. **Phase 3 - Integration:**
   - Add Playwright for E2E tests
   - Test complete contact form flow
   - Test navigation between pages

4. **Phase 4 - Continuous:**
   - Achieve 80%+ coverage on critical paths
   - Add visual regression testing for design changes

---

*Testing analysis: 2026-03-10*
