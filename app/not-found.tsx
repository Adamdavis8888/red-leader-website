import Link from 'next/link'
import { Header } from '@/app/components/Header'
import { Footer } from '@/app/components/Footer'

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-[60vh] flex items-center justify-center py-16 sm:py-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* 404 Display */}
          <div className="mb-8">
            <span className="text-8xl sm:text-9xl font-bold text-brand-red">404</span>
          </div>

          {/* Message */}
          <h1 className="text-3xl sm:text-4xl font-bold text-brand-dark mb-4">
            Page Not Found
          </h1>
          <p className="text-lg text-brand-gray mb-8">
            The page you're looking for doesn't exist or has been moved.
            Don't worry — we're experts at finding things that go missing.
          </p>

          {/* Helpful Navigation */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-brand-red text-white font-semibold rounded-lg hover:bg-brand-red-dark transition-colors"
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
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Go Home
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-brand-dark text-brand-dark font-semibold rounded-lg hover:bg-brand-dark hover:text-white transition-colors"
            >
              Contact Us
            </Link>
          </div>

          {/* Quick Links */}
          <div className="border-t border-gray-200 pt-8">
            <p className="text-brand-gray mb-4">Looking for something specific?</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/services"
                className="text-brand-red hover:text-brand-red-dark transition-colors font-medium"
              >
                Our Services
              </Link>
              <span className="text-gray-300">|</span>
              <Link
                href="/about"
                className="text-brand-red hover:text-brand-red-dark transition-colors font-medium"
              >
                About Us
              </Link>
              <span className="text-gray-300">|</span>
              <Link
                href="/case-studies"
                className="text-brand-red hover:text-brand-red-dark transition-colors font-medium"
              >
                Case Studies
              </Link>
            </div>
          </div>

          {/* Emergency CTA */}
          <div className="mt-12 p-6 bg-gray-50 rounded-lg">
            <p className="text-brand-dark font-semibold mb-2">
              Having a system emergency?
            </p>
            <a
              href="tel:+1-555-RED-LEAD"
              className="inline-flex items-center text-brand-red font-bold hover:text-brand-red-dark transition-colors"
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
              Call Now: +1-555-RED-LEAD
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
