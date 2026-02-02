import Link from 'next/link'
import { MobileNav } from './MobileNav'

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-brand-red font-bold text-2xl">RL</div>
            <span className="text-brand-dark font-semibold text-lg hidden sm:inline">
              Red Leader
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-brand-dark hover:text-brand-red transition-colors"
            >
              Home
            </Link>
            <Link
              href="/services"
              className="text-brand-dark hover:text-brand-red transition-colors"
            >
              Services
            </Link>
            <Link
              href="/about"
              className="text-brand-dark hover:text-brand-red transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-brand-dark hover:text-brand-red transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Emergency Hotline - Desktop */}
          <div className="hidden md:block">
            <a
              href="tel:+1-555-RED-LEAD"
              className="bg-brand-red text-white px-4 py-2 rounded-lg font-semibold hover:bg-brand-red-dark transition-colors inline-flex items-center space-x-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Emergency Hotline</span>
            </a>
          </div>

          {/* Mobile Navigation */}
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
