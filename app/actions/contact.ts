'use server'

import { contactSchema } from '@/app/lib/schemas'

export type ContactFormState = {
  success?: boolean
  error?: string
  fieldErrors?: {
    name?: string[]
    email?: string[]
    company?: string[]
    message?: string[]
  }
} | null

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Parse and validate form data
  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    company: formData.get('company'),
    message: formData.get('message'),
  })

  // Return validation errors if any
  if (!validatedFields.success) {
    return {
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { name, email, company, message } = validatedFields.data

  try {
    // TODO: Integrate with email service (Resend, SendGrid, etc.) in Phase 2+
    // For now, log the submission (would be sent to email service)
    console.log('Contact form submission:', { name, email, company, message })

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // In production, this would send an email:
    // await sendEmail({
    //   to: 'contact@redleader.com',
    //   subject: `Contact form: ${company}`,
    //   body: `Name: ${name}\nEmail: ${email}\nCompany: ${company}\n\nMessage:\n${message}`,
    // })

    return { success: true }
  } catch (error) {
    console.error('Contact form error:', error)
    return {
      error: 'Something went wrong. Please try again or call us directly.',
    }
  }
}
