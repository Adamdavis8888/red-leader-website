import type { Metadata } from 'next'
import { ContactForm } from '@/app/components/ContactForm'
import { CalendlyEmbed } from '@/app/components/CalendlyEmbed'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Contact Us - Red Leader',
  description: 'Get in touch with Red Leader. 24/7 emergency support, consultation booking, and general inquiries.',
}

export default function ContactPage() {
  const emergencyPhone = process.env.NEXT_PUBLIC_EMERGENCY_PHONE || '+1-555-123-4567'
  const contactEmail = 'contact@redleader.com'

  return (
    <>
      {/* Hero Section */}
      <section className="bg-brand-dark text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold">
            Get in Touch
          </h1>
          <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
            Whether you're facing an emergency or planning ahead, we're here to help.
          </p>
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="bg-brand-red text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-300 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-200" />
              </span>
              <span className="font-semibold">Having an emergency?</span>
            </div>
            <a
              href={`tel:${emergencyPhone.replace(/[^+\d]/g, '')}`}
              className="inline-flex items-center px-6 py-2 bg-white text-brand-red font-bold rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Call Now: {emergencyPhone}
            </a>
          </div>
        </div>
      </section>

      {/* Contact Methods Grid */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark mb-6">
                Send Us a Message
              </h2>
              <p className="text-brand-gray mb-8">
                Fill out the form below and we'll get back to you within 15 minutes
                during business hours.
              </p>
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark mb-6">
                Contact Information
              </h2>

              <div className="space-y-6">
                {/* Emergency Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-brand-red"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-dark">Emergency Hotline</h3>
                    <p className="text-brand-gray mb-1">Available 24/7/365</p>
                    <a
                      href={`tel:${emergencyPhone.replace(/[^+\d]/g, '')}`}
                      className="text-brand-red font-semibold hover:text-brand-red-dark transition-colors"
                    >
                      {emergencyPhone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-brand-red"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-dark">Email</h3>
                    <p className="text-brand-gray mb-1">For non-urgent inquiries</p>
                    <a
                      href={`mailto:${contactEmail}`}
                      className="text-brand-red font-semibold hover:text-brand-red-dark transition-colors"
                    >
                      {contactEmail}
                    </a>
                  </div>
                </div>

                {/* Response Time */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-brand-red"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-dark">Response Time</h3>
                    <p className="text-brand-gray">
                      Emergency calls: Immediate<br />
                      Email/form: Within 15 minutes (business hours)
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-brand-dark mb-4">
                  Looking for something specific?
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="/services#emergency-recovery"
                      className="text-brand-red hover:text-brand-red-dark transition-colors"
                    >
                      Emergency Recovery Services →
                    </a>
                  </li>
                  <li>
                    <a
                      href="/services"
                      className="text-brand-red hover:text-brand-red-dark transition-colors"
                    >
                      All Services →
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calendly Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark">
              Book a Consultation
            </h2>
            <p className="mt-4 text-lg text-brand-gray">
              Schedule a time to discuss your infrastructure needs with our team.
            </p>
          </div>
          <CalendlyEmbed className="bg-white rounded-lg shadow-lg overflow-hidden" />
        </div>
      </section>
    </>
  )
}
