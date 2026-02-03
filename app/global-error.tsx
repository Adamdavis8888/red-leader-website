'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error:', error)
  }, [error])

  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <div className="min-h-screen flex items-center justify-center py-16 bg-gray-50">
          <div className="max-w-2xl mx-auto px-4 text-center">
            {/* Critical Error Icon */}
            <div className="mb-8">
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center mx-auto"
                style={{ backgroundColor: '#fee2e2' }}
              >
                <svg
                  className="w-12 h-12"
                  style={{ color: '#dc2626' }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
            </div>

            {/* Message */}
            <h1
              className="text-3xl font-bold mb-4"
              style={{ color: '#1f2937' }}
            >
              Critical Error
            </h1>
            <p
              className="text-lg mb-8"
              style={{ color: '#6b7280' }}
            >
              A critical error occurred. We're working on fixing this as quickly as possible.
            </p>

            {/* Error Details (development only) */}
            {process.env.NODE_ENV === 'development' && error.message && (
              <div
                className="mb-8 p-4 rounded-lg text-left"
                style={{ backgroundColor: '#f3f4f6' }}
              >
                <p
                  className="text-sm font-mono break-all"
                  style={{ color: '#6b7280' }}
                >
                  {error.message}
                </p>
                {error.digest && (
                  <p
                    className="text-xs mt-2"
                    style={{ color: '#9ca3af' }}
                  >
                    Error ID: {error.digest}
                  </p>
                )}
              </div>
            )}

            {/* Recovery Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={() => reset()}
                className="inline-flex items-center justify-center px-6 py-3 font-semibold rounded-lg transition-colors"
                style={{
                  backgroundColor: '#dc2626',
                  color: 'white',
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#b91c1c'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
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
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Try Again
              </button>
              <a
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 font-semibold rounded-lg border-2 transition-colors"
                style={{
                  borderColor: '#1f2937',
                  color: '#1f2937',
                }}
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
              </a>
            </div>

            {/* Emergency Contact */}
            <div
              className="p-6 rounded-lg"
              style={{ backgroundColor: 'white', border: '1px solid #e5e7eb' }}
            >
              <p
                className="font-semibold mb-2"
                style={{ color: '#1f2937' }}
              >
                Need immediate help?
              </p>
              <a
                href="tel:+1-555-RED-LEAD"
                className="inline-flex items-center font-bold"
                style={{ color: '#dc2626' }}
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
                Call: +1-555-RED-LEAD
              </a>
              <p
                className="text-sm mt-2"
                style={{ color: '#6b7280' }}
              >
                Available 24/7/365
              </p>
            </div>

            {/* Red Leader branding */}
            <div className="mt-8">
              <span
                className="font-bold text-2xl"
                style={{ color: '#dc2626' }}
              >
                RL
              </span>
              <span
                className="font-semibold ml-2"
                style={{ color: '#1f2937' }}
              >
                Red Leader
              </span>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
