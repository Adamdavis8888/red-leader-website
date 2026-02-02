import Link from 'next/link'
import { CalendlyEmbed } from '@/app/components/CalendlyEmbed'

export const dynamic = 'force-static'

export default function HomePage() {
  const emergencyPhone = process.env.NEXT_PUBLIC_EMERGENCY_PHONE || '+1-555-123-4567'

  return (
    <>
      {/* Hero Section - Above the Fold */}
      <section className="bg-gradient-to-br from-brand-dark to-gray-900 text-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              When Your Systems Go Down,{' '}
              <span className="text-brand-red">We Bring Them Back</span>
            </h1>
            <p className="mt-6 text-xl text-gray-300">
              24/7 emergency infrastructure rescue for enterprises. Expert response when
              every minute of downtime costs thousands. We fix what others can't — fast.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:${emergencyPhone.replace(/[^+\d]/g, '')}`}
                className="inline-flex items-center justify-center px-8 py-4 bg-brand-red text-white font-semibold rounded-lg hover:bg-brand-red-dark transition-colors"
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
              <Link
                href="#book"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-brand-dark transition-colors"
              >
                Book a Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark">
              Why Companies Trust Red Leader
            </h2>
            <p className="mt-4 text-lg text-brand-gray max-w-2xl mx-auto">
              When critical infrastructure fails, experience and speed matter.
              Our team has rescued systems for Fortune 500 companies.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Response Time */}
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-2">Rapid Response</h3>
              <p className="text-brand-gray">
                Average response time under 2 hours. We're on call 24/7/365 for your emergencies.
              </p>
            </div>

            {/* Expertise */}
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-2">Battle-Tested Experts</h3>
              <p className="text-brand-gray">
                Kubernetes, AWS, Azure, bare metal — we've rescued them all. 20+ years combined experience.
              </p>
            </div>

            {/* Results */}
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-2">Proven Results</h3>
              <p className="text-brand-gray">
                99.9% success rate on emergency recoveries. We fix what others said couldn't be fixed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark">
              Our Services
            </h2>
            <p className="mt-4 text-lg text-brand-gray">
              From emergency rescue to long-term modernization
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Emergency Recovery',
                description: 'System down? Database corrupted? We\'re on it within hours.',
              },
              {
                title: 'Cloud Migration',
                description: 'Move to AWS, Azure, or GCP without the headaches.',
              },
              {
                title: 'Infrastructure Modernization',
                description: 'Transform legacy systems into modern, scalable architecture.',
              },
              {
                title: 'High Availability',
                description: 'Design and implement systems that never go down.',
              },
              {
                title: 'CI/CD & DevOps',
                description: 'Ship faster with automated pipelines and best practices.',
              },
              {
                title: 'Disaster Prevention',
                description: 'Audits and hardening to prevent the next crisis.',
              },
            ].map((service) => (
              <div
                key={service.title}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-bold text-brand-dark mb-2">
                  {service.title}
                </h3>
                <p className="text-brand-gray">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/services"
              className="inline-flex items-center text-brand-red font-semibold hover:text-brand-red-dark transition-colors"
            >
              View All Services
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="book" className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark">
              Book a Free Consultation
            </h2>
            <p className="mt-4 text-lg text-brand-gray">
              Not an emergency? Let's discuss how we can help improve your infrastructure.
            </p>
          </div>

          <CalendlyEmbed className="rounded-lg overflow-hidden shadow-lg" />
        </div>
      </section>
    </>
  )
}
