import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { services, getServiceBySlug, getRelatedServices } from '@/app/data/services'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }))
}

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    return {
      title: 'Service Not Found - Red Leader',
    }
  }

  return {
    title: `${service.title} - Red Leader`,
    description: service.description,
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  const emergencyPhone = process.env.NEXT_PUBLIC_EMERGENCY_PHONE || '+1-555-123-4567'
  const relatedServices = getRelatedServices(service)
  const isEmergencyService = service.slug === 'emergency-recovery'

  return (
    <>
      {/* Crisis Banner - Only for Emergency Recovery */}
      {isEmergencyService && (
        <section className="bg-brand-red text-white py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
            <span className="font-bold text-lg">Crisis right now?</span>
            <a
              href={`tel:${emergencyPhone.replace(/[^+\d]/g, '')}`}
              className="inline-flex items-center px-6 py-2 bg-white text-brand-red font-bold rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
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
        </section>
      )}

      {/* Hero Section */}
      <section className="bg-brand-dark text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-brand-red font-semibold mb-2">{service.title}</p>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
              {service.headline}
            </h1>
            <p className="mt-6 text-xl text-gray-300">
              {service.tagline}
            </p>
          </div>

          {/* Metrics Row */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            {service.metrics.map((metric) => (
              <div key={metric.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-brand-red">
                  {metric.value}
                </div>
                <div className="text-sm text-gray-400 mt-1">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Urgent Help Sidebar Banner */}
      {!isEmergencyService && (
        <section className="bg-red-50 border-l-4 border-brand-red py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <svg
                className="w-6 h-6 text-brand-red flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span className="font-medium text-brand-dark">
                Need urgent help? We respond to emergencies 24/7.
              </span>
            </div>
            <a
              href={`tel:${emergencyPhone.replace(/[^+\d]/g, '')}`}
              className="inline-flex items-center px-4 py-2 bg-brand-red text-white font-semibold rounded-lg hover:bg-brand-red-dark transition-colors whitespace-nowrap"
            >
              Call {emergencyPhone}
            </a>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Long Description */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-brand-dark mb-6">Overview</h2>
              <div className="prose prose-lg text-brand-gray max-w-none">
                {service.longDescription.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Technical Capabilities */}
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-brand-dark mb-6">
                  Technical Capabilities
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {service.technicalCapabilities.map((capability) => (
                    <div key={capability} className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-brand-gray text-sm">{capability}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Use Cases */}
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-brand-dark mb-6">
                  Common Use Cases
                </h2>
                <ul className="space-y-3">
                  {service.useCases.map((useCase) => (
                    <li key={useCase} className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-brand-red rounded-full mt-2 flex-shrink-0" />
                      <span className="text-brand-gray">{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* CTA Card */}
              <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
                <h3 className="text-xl font-bold text-brand-dark mb-4">
                  Ready to Get Started?
                </h3>
                <p className="text-brand-gray mb-6">
                  {isEmergencyService
                    ? 'In a crisis? Call us now. For non-urgent inquiries, schedule a consultation.'
                    : 'Let\'s discuss how we can help with your infrastructure needs.'}
                </p>
                <div className="space-y-3">
                  {isEmergencyService && (
                    <a
                      href={`tel:${emergencyPhone.replace(/[^+\d]/g, '')}`}
                      className="w-full inline-flex items-center justify-center px-6 py-3 bg-brand-red text-white font-semibold rounded-lg hover:bg-brand-red-dark transition-colors"
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
                      {service.ctaText}
                    </a>
                  )}
                  <Link
                    href="/contact"
                    className={`w-full inline-flex items-center justify-center px-6 py-3 font-semibold rounded-lg transition-colors ${
                      isEmergencyService
                        ? 'border-2 border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white'
                        : 'bg-brand-red text-white hover:bg-brand-red-dark'
                    }`}
                  >
                    {isEmergencyService ? 'Send a Message' : service.ctaText}
                  </Link>
                  <Link
                    href="/#book"
                    className="w-full inline-flex items-center justify-center px-6 py-3 border-2 border-brand-dark text-brand-dark font-semibold rounded-lg hover:bg-brand-dark hover:text-white transition-colors"
                  >
                    Book a Consultation
                  </Link>
                </div>

                {/* Emergency Contact */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-brand-gray mb-2">24/7 Emergency Line:</p>
                  <a
                    href={`tel:${emergencyPhone.replace(/[^+\d]/g, '')}`}
                    className="text-lg font-bold text-brand-red hover:text-brand-red-dark transition-colors"
                  >
                    {emergencyPhone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-brand-dark mb-8">Related Services</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedServices.map((related) => (
              <Link
                key={related.slug}
                href={`/services/${related.slug}`}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow group"
              >
                <h3 className="text-lg font-bold text-brand-dark mb-2 group-hover:text-brand-red transition-colors">
                  {related.title}
                </h3>
                <p className="text-brand-gray text-sm mb-4">{related.tagline}</p>
                <span className="text-brand-red font-medium text-sm inline-flex items-center">
                  Learn more
                  <svg
                    className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark">
            {isEmergencyService
              ? 'Don\'t Wait Until It\'s Too Late'
              : 'Ready to Transform Your Infrastructure?'}
          </h2>
          <p className="mt-4 text-lg text-brand-gray">
            {isEmergencyService
              ? 'Whether you\'re in crisis mode or want to prevent the next emergency, we\'re here to help.'
              : 'Let\'s discuss how we can help you build more reliable, scalable systems.'}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-brand-red text-white font-semibold rounded-lg hover:bg-brand-red-dark transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/#book"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-brand-dark text-brand-dark font-semibold rounded-lg hover:bg-brand-dark hover:text-white transition-colors"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
