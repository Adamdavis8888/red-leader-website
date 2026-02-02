import Link from 'next/link'
import type { Metadata } from 'next'
import { companyInfo, values, milestones, stats } from '@/app/data/company'
import { TeamSection } from '@/app/components/TeamSection'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'About Red Leader - Emergency Infrastructure Experts',
  description: 'Founded by engineers who know what happens when systems fail. Red Leader provides 24/7 emergency infrastructure rescue with 99.9% recovery success rate.',
}

const valueIcons = {
  speed: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  transparency: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
  mastery: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  success: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  ),
}

export default function AboutPage() {
  const emergencyPhone = process.env.NEXT_PUBLIC_EMERGENCY_PHONE || '+1-555-123-4567'

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-dark to-gray-900 text-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
            When Systems Fail,{' '}
            <span className="text-brand-red">We Answer the Call</span>
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
            {companyInfo.mission}
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white py-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-brand-red">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base text-brand-gray mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark mb-6">
                Our Story
              </h2>
              <div className="space-y-4">
                {companyInfo.story.map((paragraph, index) => (
                  <p key={index} className="text-brand-gray text-lg leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Image placeholder */}
            <div className="bg-gray-100 rounded-lg min-h-[400px] flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <p className="text-brand-gray text-sm">Team photo placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark mb-8">
            Our Mission
          </h2>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-red rounded-full" />
            <blockquote className="pl-8 text-2xl sm:text-3xl font-medium text-brand-dark leading-relaxed">
              "{companyInfo.mission}"
            </blockquote>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark">
              Our Values
            </h2>
            <p className="mt-4 text-lg text-brand-gray max-w-2xl mx-auto">
              The principles that guide every engagement, every decision, every line of code.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-red-100 rounded-lg flex items-center justify-center text-brand-red flex-shrink-0">
                    {valueIcons[value.icon]}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-brand-dark mb-2">
                      {value.title}
                    </h3>
                    <p className="text-brand-gray leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline/Milestones Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark">
              Our Journey
            </h2>
            <p className="mt-4 text-lg text-brand-gray max-w-2xl mx-auto">
              From startup to trusted enterprise partner.
            </p>
          </div>

          {/* Mobile Timeline (vertical) */}
          <div className="lg:hidden">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300" />

              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={milestone.year} className="relative pl-12">
                    {/* Dot */}
                    <div className="absolute left-2 w-5 h-5 bg-brand-red rounded-full border-4 border-white shadow" />

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <div className="text-brand-red font-bold text-lg mb-1">
                        {milestone.year}
                      </div>
                      <h3 className="text-lg font-bold text-brand-dark mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-brand-gray text-sm">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Timeline (horizontal) */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Horizontal line */}
              <div className="absolute left-0 right-0 top-6 h-0.5 bg-gray-300" />

              <div className="grid grid-cols-5 gap-4">
                {milestones.map((milestone) => (
                  <div key={milestone.year} className="relative pt-12">
                    {/* Dot */}
                    <div className="absolute left-1/2 top-4 -translate-x-1/2 w-5 h-5 bg-brand-red rounded-full border-4 border-white shadow" />

                    <div className="bg-white p-4 rounded-lg shadow-sm h-full">
                      <div className="text-brand-red font-bold text-lg mb-1">
                        {milestone.year}
                      </div>
                      <h3 className="text-base font-bold text-brand-dark mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-brand-gray text-sm">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TeamSection />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark">
            Ready to Work with Us?
          </h2>
          <p className="mt-4 text-lg text-brand-gray">
            Whether you're facing an emergency right now or want to prevent the next one,
            we're here to help.
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

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-brand-gray mb-2">Having an emergency right now?</p>
            <a
              href={`tel:${emergencyPhone.replace(/[^+\d]/g, '')}`}
              className="inline-flex items-center text-brand-red font-bold text-xl hover:text-brand-red-dark transition-colors"
            >
              <svg
                className="w-6 h-6 mr-2"
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
              Call {emergencyPhone}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
