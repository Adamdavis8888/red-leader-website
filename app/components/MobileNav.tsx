'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-brand-dark hover:text-brand-red transition-colors"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Menu Panel */}
          <div className="fixed top-0 right-0 bottom-0 w-64 bg-white shadow-xl z-50 p-6">
            <div className="flex justify-end mb-8">
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-brand-dark hover:text-brand-red transition-colors"
                aria-label="Close menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-lg text-brand-dark hover:text-brand-red transition-colors py-2"
              >
                Home
              </Link>
              <Link
                href="/services"
                className="text-lg text-brand-dark hover:text-brand-red transition-colors py-2"
              >
                Services
              </Link>
              <Link
                href="/about"
                className="text-lg text-brand-dark hover:text-brand-red transition-colors py-2"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-lg text-brand-dark hover:text-brand-red transition-colors py-2"
              >
                Contact
              </Link>

              {/* Emergency CTA in mobile menu */}
              <div className="pt-4 border-t border-gray-200">
                <a
                  href="tel:+1-555-RED-LEAD"
                  className="block text-center bg-brand-red text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-red-dark transition-colors"
                >
                  Emergency: Call Now
                </a>
              </div>
            </nav>
          </div>
        </>
      )}
    </div>
  )
}
