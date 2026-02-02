'use client'

import dynamic from 'next/dynamic'

// Dynamic import with SSR disabled - Calendly requires browser DOM
const InlineWidget = dynamic(
  () => import('react-calendly').then((mod) => mod.InlineWidget),
  {
    ssr: false,
    loading: () => (
      <div className="h-[650px] flex items-center justify-center bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-red mx-auto mb-4" />
          <p className="text-brand-gray">Loading booking calendar...</p>
        </div>
      </div>
    ),
  }
)

interface CalendlyEmbedProps {
  url?: string
  className?: string
}

export function CalendlyEmbed({ url, className }: CalendlyEmbedProps) {
  const calendlyUrl = url || process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/your-username/consultation'

  return (
    <div className={className}>
      <InlineWidget
        url={calendlyUrl}
        styles={{ height: '650px', minWidth: '320px' }}
      />
    </div>
  )
}
