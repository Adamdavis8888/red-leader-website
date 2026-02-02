import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Case Studies - Red Leader',
  description: 'Real-world infrastructure rescue stories. See how we\'ve helped companies recover from database failures, cloud outages, and security incidents.',
}

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
