import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN
const plausibleHost = process.env.NEXT_PUBLIC_PLAUSIBLE_HOST || 'plausible.io'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Red Leader - Emergency Infrastructure Rescue',
  description: '24/7 emergency response when your systems fail. Expert infrastructure rescue, cloud modernization, and high-availability solutions.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      {plausibleDomain && (
        <Script
          strategy="afterInteractive"
          data-domain={plausibleDomain}
          src={`https://${plausibleHost}/js/script.js`}
        />
      )}
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
