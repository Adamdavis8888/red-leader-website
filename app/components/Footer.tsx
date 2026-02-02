import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-brand-dark text-white mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-brand-red font-bold text-2xl">RL</div>
              <span className="font-semibold text-lg">Red Leader</span>
            </div>
            <p className="text-gray-400 mb-4">
              Emergency Infrastructure Rescue
            </p>
            <p className="text-gray-400">
              24/7 emergency response when your systems fail. Expert infrastructure rescue, cloud modernization, and high-availability solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Emergency Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Emergency Contact</h3>
            <div className="space-y-3">
              <a
                href="tel:+1-555-RED-LEAD"
                className="block text-brand-red hover:text-white transition-colors font-semibold"
              >
                +1-555-RED-LEAD
              </a>
              <p className="text-gray-400 text-sm">
                Available 24/7/365
              </p>
              <a
                href="mailto:emergency@redleader.com"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                emergency@redleader.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Red Leader. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
