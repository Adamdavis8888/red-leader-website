'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { submitContactForm, type ContactFormState } from '@/app/actions/contact'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-brand-red text-white py-3 px-6 rounded-lg font-semibold hover:bg-brand-red-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? (
        <span className="flex items-center justify-center gap-2">
          <svg
            className="animate-spin h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Sending...
        </span>
      ) : (
        'Send Message'
      )}
    </button>
  )
}

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null

  return (
    <p className="mt-1 text-sm text-red-600" role="alert">
      {errors[0]}
    </p>
  )
}

export function ContactForm() {
  const [state, formAction] = useActionState<ContactFormState, FormData>(
    submitContactForm,
    null
  )

  if (state?.success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <svg
          className="w-12 h-12 text-green-600 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="text-lg font-semibold text-green-800 mb-2">
          Message Sent!
        </h3>
        <p className="text-green-700">
          Thank you for reaching out. We'll respond within 15 minutes during business hours.
          For emergencies, please call us directly.
        </p>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4" role="alert">
          <p className="text-red-700">{state.error}</p>
        </div>
      )}

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-brand-dark mb-1"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent transition-shadow"
          placeholder="Your name"
        />
        <FieldError errors={state?.fieldErrors?.name} />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-brand-dark mb-1"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent transition-shadow"
          placeholder="you@company.com"
        />
        <FieldError errors={state?.fieldErrors?.email} />
      </div>

      <div>
        <label
          htmlFor="company"
          className="block text-sm font-medium text-brand-dark mb-1"
        >
          Company
        </label>
        <input
          id="company"
          name="company"
          type="text"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent transition-shadow"
          placeholder="Your company name"
        />
        <FieldError errors={state?.fieldErrors?.company} />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-brand-dark mb-1"
        >
          What can we help you with?
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent transition-shadow resize-y"
          placeholder="Describe your situation or what you're looking for..."
        />
        <FieldError errors={state?.fieldErrors?.message} />
      </div>

      <SubmitButton />
    </form>
  )
}
