import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { caseStudies, getCaseStudyBySlug, getRelatedCaseStudies } from '@/app/data/case-studies'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return caseStudies.map((caseStudy) => ({
    slug: caseStudy.slug,
  }))
}

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const caseStudy = getCaseStudyBySlug(slug)

  if (!caseStudy) {
    return {
      title: 'Case Study Not Found - Red Leader',
    }
  }

  return {
    title: `${caseStudy.title} - Case Studies - Red Leader`,
    description: caseStudy.tagline,
  }
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params
  const caseStudy = getCaseStudyBySlug(slug)

  if (!caseStudy) {
    notFound()
  }

  const relatedCaseStudies = getRelatedCaseStudies(caseStudy)
  const currentIndex = caseStudies.findIndex((cs) => cs.slug === caseStudy.slug)
  const prevCaseStudy = currentIndex > 0 ? caseStudies[currentIndex - 1] : null
  const nextCaseStudy = currentIndex < caseStudies.length - 1 ? caseStudies[currentIndex + 1] : null

  return (
    <>
      {/* Breadcrumb */}
      <nav className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="text-brand-gray hover:text-brand-red transition-colors">
                Home
              </Link>
            </li>
            <li className="text-brand-gray">/</li>
            <li>
              <Link href="/case-studies" className="text-brand-gray hover:text-brand-red transition-colors">
                Case Studies
              </Link>
            </li>
            <li className="text-brand-gray">/</li>
            <li className="text-brand-dark font-medium truncate max-w-[200px]">
              {caseStudy.title}
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-brand-dark text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Badges */}
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="inline-block px-3 py-1 bg-brand-red text-white text-sm font-medium rounded-full">
                {caseStudy.crisisType}
              </span>
              <span className="inline-block px-3 py-1 bg-white/20 text-white text-sm font-medium rounded-full">
                {caseStudy.industry}
              </span>
            </div>

            {/* Client */}
            <p className="text-gray-400 font-medium mb-2">{caseStudy.client}</p>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
              {caseStudy.title}
            </h1>

            {/* Tagline */}
            <p className="mt-6 text-xl text-gray-300">
              {caseStudy.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* Metrics Bar */}
      <section className="bg-brand-red text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {caseStudy.metrics.map((metric) => (
              <div key={metric.label}>
                <div className="text-3xl sm:text-4xl font-bold">{metric.value}</div>
                <div className="text-sm text-white/80 mt-1">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Content Column */}
            <div className="lg:col-span-2 space-y-12">
              {/* Challenge Section */}
              <div>
                <h2 className="text-2xl font-bold text-brand-dark mb-4 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-red-100 text-brand-red flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </span>
                  The Challenge
                </h2>
                <p className="text-brand-gray leading-relaxed">
                  {caseStudy.problem}
                </p>
              </div>

              {/* Solution Section */}
              <div>
                <h2 className="text-2xl font-bold text-brand-dark mb-4 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </span>
                  Our Solution
                </h2>
                <p className="text-brand-gray leading-relaxed">
                  {caseStudy.solution}
                </p>
              </div>

              {/* Outcome Section */}
              <div>
                <h2 className="text-2xl font-bold text-brand-dark mb-4 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  The Outcome
                </h2>
                <p className="text-brand-gray leading-relaxed">
                  {caseStudy.outcome}
                </p>
              </div>

              {/* Testimonial */}
              {caseStudy.testimonial && (
                <div className="bg-gray-50 rounded-lg p-8 border-l-4 border-brand-red">
                  <svg
                    className="w-10 h-10 text-brand-red/20 mb-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <blockquote className="text-lg text-brand-dark italic mb-4">
                    &ldquo;{caseStudy.testimonial.quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-brand-dark flex items-center justify-center text-white font-bold">
                      {caseStudy.testimonial.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-semibold text-brand-dark">{caseStudy.testimonial.author}</div>
                      <div className="text-sm text-brand-gray">{caseStudy.testimonial.role}, {caseStudy.client}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
                {/* Quick Facts */}
                <h3 className="text-lg font-bold text-brand-dark mb-4">Quick Facts</h3>
                <dl className="space-y-4 mb-8">
                  <div>
                    <dt className="text-sm text-brand-gray">Client</dt>
                    <dd className="font-medium text-brand-dark">{caseStudy.client}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-brand-gray">Industry</dt>
                    <dd className="font-medium text-brand-dark">{caseStudy.industry}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-brand-gray">Crisis Type</dt>
                    <dd className="font-medium text-brand-dark">{caseStudy.crisisType}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-brand-gray">Timeline</dt>
                    <dd className="font-medium text-brand-dark">{caseStudy.timeline}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-brand-gray mb-2">Services Used</dt>
                    <dd className="flex flex-wrap gap-2">
                      {caseStudy.services.map((service) => (
                        <Link
                          key={service}
                          href={`/services/${service}`}
                          className="inline-block px-2 py-1 bg-white text-brand-gray text-xs font-medium rounded border border-gray-200 hover:border-brand-red hover:text-brand-red transition-colors"
                        >
                          {service.replace(/-/g, ' ')}
                        </Link>
                      ))}
                    </dd>
                  </div>
                </dl>

                {/* CTA */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-bold text-brand-dark mb-2">
                    Facing a Similar Challenge?
                  </h3>
                  <p className="text-sm text-brand-gray mb-4">
                    Let&apos;s discuss how we can help your organization.
                  </p>
                  <div className="space-y-3">
                    <Link
                      href="/contact"
                      className="w-full inline-flex items-center justify-center px-6 py-3 bg-brand-red text-white font-semibold rounded-lg hover:bg-brand-red-dark transition-colors"
                    >
                      Contact Us
                    </Link>
                    <Link
                      href="/#book"
                      className="w-full inline-flex items-center justify-center px-6 py-3 border-2 border-brand-dark text-brand-dark font-semibold rounded-lg hover:bg-brand-dark hover:text-white transition-colors"
                    >
                      Book a Consultation
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prev/Next Navigation */}
      <section className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2">
            {/* Previous */}
            <div className={`py-8 pr-4 ${prevCaseStudy ? 'border-r border-gray-200' : ''}`}>
              {prevCaseStudy ? (
                <Link
                  href={`/case-studies/${prevCaseStudy.slug}`}
                  className="group flex flex-col"
                >
                  <span className="text-sm text-brand-gray mb-1 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                  </span>
                  <span className="font-medium text-brand-dark group-hover:text-brand-red transition-colors line-clamp-2">
                    {prevCaseStudy.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
            </div>

            {/* Next */}
            <div className="py-8 pl-4 text-right">
              {nextCaseStudy ? (
                <Link
                  href={`/case-studies/${nextCaseStudy.slug}`}
                  className="group flex flex-col items-end"
                >
                  <span className="text-sm text-brand-gray mb-1 flex items-center gap-1">
                    Next
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                  <span className="font-medium text-brand-dark group-hover:text-brand-red transition-colors line-clamp-2">
                    {nextCaseStudy.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Case Studies */}
      {relatedCaseStudies.length > 0 && (
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-brand-dark mb-8">Related Case Studies</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {relatedCaseStudies.map((related) => (
                <Link
                  key={related.slug}
                  href={`/case-studies/${related.slug}`}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="inline-block px-2 py-1 bg-red-100 text-brand-red text-xs font-medium rounded">
                      {related.crisisType}
                    </span>
                    <span className="inline-block px-2 py-1 bg-gray-100 text-brand-gray text-xs font-medium rounded">
                      {related.industry}
                    </span>
                  </div>
                  <p className="text-sm text-brand-gray mb-1">{related.client}</p>
                  <h3 className="text-lg font-bold text-brand-dark mb-2 group-hover:text-brand-red transition-colors">
                    {related.title}
                  </h3>
                  <p className="text-brand-gray text-sm mb-4 line-clamp-2">
                    {related.tagline}
                  </p>
                  <span className="text-brand-red font-medium text-sm inline-flex items-center">
                    Read Case Study
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
      )}

      {/* Final CTA Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark">
            Ready to Write Your Success Story?
          </h2>
          <p className="mt-4 text-lg text-brand-gray">
            Whether you&apos;re facing an infrastructure emergency or planning a complex migration,
            we&apos;ve likely solved a similar problem before. Let&apos;s talk about your situation.
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
