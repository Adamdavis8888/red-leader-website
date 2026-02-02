'use client'

import Link from 'next/link'
import { useState } from 'react'
import { caseStudies, getCrisisTypes, getIndustries } from '@/app/data/case-studies'

export default function CaseStudiesPage() {
  const [selectedCrisisType, setSelectedCrisisType] = useState<string | null>(null)
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null)

  const crisisTypes = getCrisisTypes()
  const industries = getIndustries()

  const filteredCaseStudies = caseStudies.filter((cs) => {
    if (selectedCrisisType && cs.crisisType !== selectedCrisisType) return false
    if (selectedIndustry && cs.industry !== selectedIndustry) return false
    return true
  })

  const clearFilters = () => {
    setSelectedCrisisType(null)
    setSelectedIndustry(null)
  }

  const hasActiveFilters = selectedCrisisType || selectedIndustry

  return (
    <>
      {/* Hero Section */}
      <section className="bg-brand-dark text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold">
            Case Studies
          </h1>
          <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
            Real stories of infrastructure rescue and transformation.
            See how we've helped companies recover from crises and build for the future.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-0 z-10 bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4">
            {/* All Button */}
            <button
              onClick={clearFilters}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !hasActiveFilters
                  ? 'bg-brand-red text-white'
                  : 'bg-gray-100 text-brand-gray hover:bg-gray-200'
              }`}
            >
              All
            </button>

            {/* Crisis Type Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-brand-gray">Crisis:</span>
              <div className="flex flex-wrap gap-2">
                {crisisTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedCrisisType(selectedCrisisType === type ? null : type)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      selectedCrisisType === type
                        ? 'bg-brand-red text-white'
                        : 'bg-gray-100 text-brand-gray hover:bg-gray-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Industry Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-brand-gray">Industry:</span>
              <div className="flex flex-wrap gap-2">
                {industries.map((industry) => (
                  <button
                    key={industry}
                    onClick={() => setSelectedIndustry(selectedIndustry === industry ? null : industry)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      selectedIndustry === industry
                        ? 'bg-brand-red text-white'
                        : 'bg-gray-100 text-brand-gray hover:bg-gray-200'
                    }`}
                  >
                    {industry}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredCaseStudies.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-brand-gray text-lg">No case studies match your filters.</p>
              <button
                onClick={clearFilters}
                className="mt-4 text-brand-red font-medium hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCaseStudies.map((caseStudy) => (
                <article
                  key={caseStudy.id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden"
                >
                  <div className="p-6">
                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="inline-block px-2 py-1 bg-red-100 text-brand-red text-xs font-medium rounded">
                        {caseStudy.crisisType}
                      </span>
                      <span className="inline-block px-2 py-1 bg-gray-100 text-brand-gray text-xs font-medium rounded">
                        {caseStudy.industry}
                      </span>
                    </div>

                    {/* Client */}
                    <p className="text-sm text-brand-gray mb-1">{caseStudy.client}</p>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-brand-dark mb-3">
                      <Link
                        href={`/case-studies/${caseStudy.slug}`}
                        className="hover:text-brand-red transition-colors"
                      >
                        {caseStudy.title}
                      </Link>
                    </h2>

                    {/* Problem Summary */}
                    <p className="text-brand-gray text-sm mb-4 line-clamp-3">
                      {caseStudy.problem}
                    </p>

                    {/* Key Metrics */}
                    <div className="flex flex-wrap gap-3 mb-4">
                      {caseStudy.metrics.slice(0, 3).map((metric) => (
                        <div key={metric.label} className="text-center">
                          <div className="text-lg font-bold text-brand-red">{metric.value}</div>
                          <div className="text-xs text-brand-gray">{metric.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Read More Link */}
                    <Link
                      href={`/case-studies/${caseStudy.slug}`}
                      className="inline-flex items-center text-brand-red font-medium text-sm hover:text-brand-red-dark transition-colors group"
                    >
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
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark">
            Have a Similar Challenge?
          </h2>
          <p className="mt-4 text-lg text-brand-gray">
            Whether you're facing an infrastructure emergency or planning a complex migration,
            we've likely solved a similar problem before. Let's talk about your situation.
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
