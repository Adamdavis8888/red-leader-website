import Link from 'next/link'
import type { Metadata } from 'next'
import { companyInfo, values, milestones, stats } from '@/app/data/company'

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
  const emergencyPhone = process.env.NEXT_PUBLIC_EMERGENCY_PHONE || '408-841-3982'

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-950 to-gray-900 text-white py-16 sm:py-24">
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
      <section className="bg-gray-900 py-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-brand-red">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base text-gray-400 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="py-16 sm:py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Our Story
              </h2>
              <div className="space-y-4">
                {companyInfo.story.map((paragraph, index) => (
                  <p key={index} className="text-gray-400 text-lg leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Team illustration */}
            <div className="bg-gray-900 rounded-lg min-h-[400px] flex items-center justify-center p-8">
              <svg viewBox="0 0 400 300" className="w-full max-w-md" fill="none">
                {/* Desk/table */}
                <rect x="40" y="180" width="320" height="8" rx="4" fill="#dc2626" opacity="0.2"/>
                <rect x="60" y="188" width="8" height="60" rx="2" fill="#9ca3af"/>
                <rect x="332" y="188" width="8" height="60" rx="2" fill="#9ca3af"/>

                {/* Monitor 1 */}
                <rect x="70" y="120" width="70" height="55" rx="4" fill="#1f2937" stroke="#374151" strokeWidth="2"/>
                <rect x="75" y="125" width="60" height="40" rx="2" fill="#111827"/>
                <rect x="80" y="130" width="50" height="4" rx="1" fill="#dc2626" opacity="0.7"/>
                <rect x="80" y="138" width="35" height="3" rx="1" fill="#4ade80" opacity="0.6"/>
                <rect x="80" y="145" width="45" height="3" rx="1" fill="#60a5fa" opacity="0.5"/>
                <rect x="80" y="152" width="30" height="3" rx="1" fill="#f59e0b" opacity="0.5"/>
                <rect x="100" y="175" width="10" height="5" fill="#374151"/>

                {/* Monitor 2 */}
                <rect x="165" y="115" width="70" height="55" rx="4" fill="#1f2937" stroke="#374151" strokeWidth="2"/>
                <rect x="170" y="120" width="60" height="40" rx="2" fill="#111827"/>
                <rect x="175" y="125" width="50" height="4" rx="1" fill="#dc2626" opacity="0.7"/>
                <rect x="175" y="133" width="40" height="3" rx="1" fill="#4ade80" opacity="0.6"/>
                <rect x="175" y="140" width="50" height="3" rx="1" fill="#60a5fa" opacity="0.5"/>
                <rect x="175" y="147" width="25" height="3" rx="1" fill="#4ade80" opacity="0.5"/>
                <rect x="195" y="170" width="10" height="10" fill="#374151"/>

                {/* Monitor 3 */}
                <rect x="260" y="120" width="70" height="55" rx="4" fill="#1f2937" stroke="#374151" strokeWidth="2"/>
                <rect x="265" y="125" width="60" height="40" rx="2" fill="#111827"/>
                <rect x="270" y="130" width="50" height="4" rx="1" fill="#dc2626" opacity="0.7"/>
                <rect x="270" y="138" width="45" height="3" rx="1" fill="#f59e0b" opacity="0.6"/>
                <rect x="270" y="145" width="35" height="3" rx="1" fill="#60a5fa" opacity="0.5"/>
                <rect x="270" y="152" width="48" height="3" rx="1" fill="#4ade80" opacity="0.5"/>
                <rect x="290" y="175" width="10" height="5" fill="#374151"/>

                {/* Person 1 - sitting at left */}
                <circle cx="105" cy="75" r="18" fill="#dc2626"/>
                <circle cx="105" cy="70" r="12" fill="#fecaca"/>
                <rect x="88" y="88" width="34" height="35" rx="8" fill="#dc2626"/>
                <rect x="80" y="95" width="12" height="25" rx="4" fill="#dc2626" transform="rotate(-15 80 95)"/>
                <rect x="118" y="92" width="12" height="28" rx="4" fill="#dc2626" transform="rotate(10 118 92)"/>

                {/* Person 2 - center, leaning forward */}
                <circle cx="200" cy="68" r="18" fill="#b91c1c"/>
                <circle cx="200" cy="63" r="12" fill="#fecaca"/>
                <rect x="183" y="81" width="34" height="38" rx="8" fill="#b91c1c"/>
                <rect x="173" y="90" width="12" height="28" rx="4" fill="#b91c1c" transform="rotate(-20 173 90)"/>
                <rect x="214" y="86" width="12" height="30" rx="4" fill="#b91c1c" transform="rotate(5 214 86)"/>

                {/* Person 3 - right side */}
                <circle cx="295" cy="75" r="18" fill="#ef4444"/>
                <circle cx="295" cy="70" r="12" fill="#fecaca"/>
                <rect x="278" y="88" width="34" height="35" rx="8" fill="#ef4444"/>
                <rect x="270" y="95" width="12" height="25" rx="4" fill="#ef4444" transform="rotate(-10 270 95)"/>
                <rect x="308" y="92" width="12" height="28" rx="4" fill="#ef4444" transform="rotate(15 308 92)"/>

                {/* Status indicator / problem visualization above center monitor */}
                <circle cx="200" cy="35" r="15" fill="none" stroke="#dc2626" strokeWidth="2" strokeDasharray="4 2">
                  <animate attributeName="r" values="15;18;15" dur="2s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite"/>
                </circle>
                <text x="200" y="40" textAnchor="middle" fontSize="14" fill="#dc2626" fontWeight="bold">!</text>

                {/* Coffee mugs */}
                <rect x="145" y="172" width="8" height="10" rx="2" fill="#9ca3af"/>
                <rect x="250" y="172" width="8" height="10" rx="2" fill="#9ca3af"/>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 sm:py-20 bg-gray-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
            Our Mission
          </h2>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-red rounded-full" />
            <blockquote className="pl-8 text-2xl sm:text-3xl font-medium text-gray-100 leading-relaxed">
              "{companyInfo.mission}"
            </blockquote>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 sm:py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Our Values
            </h2>
            <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
              The principles that guide every engagement, every decision, every line of code.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-gray-900 p-8 rounded-lg border border-gray-800 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-red-950/50 rounded-lg flex items-center justify-center text-brand-red flex-shrink-0">
                    {valueIcons[value.icon]}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
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
      <section className="py-16 sm:py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Our Journey
            </h2>
            <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
              From startup to trusted enterprise partner.
            </p>
          </div>

          {/* Mobile Timeline (vertical) */}
          <div className="lg:hidden">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-700" />

              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={milestone.year} className="relative pl-12">
                    {/* Dot */}
                    <div className="absolute left-2 w-5 h-5 bg-brand-red rounded-full border-4 border-gray-950" />

                    <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                      <div className="text-brand-red font-bold text-lg mb-1">
                        {milestone.year}
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-400 text-sm">
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
              <div className="absolute left-0 right-0 top-6 h-0.5 bg-gray-700" />

              <div className="grid grid-cols-3 gap-4">
                {milestones.map((milestone) => (
                  <div key={milestone.year} className="relative pt-12">
                    {/* Dot */}
                    <div className="absolute left-1/2 top-4 -translate-x-1/2 w-5 h-5 bg-brand-red rounded-full border-4 border-gray-950" />

                    <div className="bg-gray-900 p-4 rounded-lg border border-gray-800 h-full">
                      <div className="text-brand-red font-bold text-lg mb-1">
                        {milestone.year}
                      </div>
                      <h3 className="text-base font-bold text-white mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-400 text-sm">
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

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gray-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Ready to Work with Us?
          </h2>
          <p className="mt-4 text-lg text-gray-400">
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
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-600 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
            >
              Book a Consultation
            </Link>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800">
            <p className="text-gray-400 mb-2">Having an emergency right now?</p>
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
