import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN
const plausibleHost = process.env.NEXT_PUBLIC_PLAUSIBLE_HOST || 'plausible.io'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
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
