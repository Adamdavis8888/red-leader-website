import { clientLogos } from '@/app/data/trust'

interface ClientLogosProps {
  showHeading?: boolean
  className?: string
}

function ClientNameSvg({ name }: { name: string }) {
  // Adjust font size based on name length
  const fontSize = name.length > 15 ? 11 : name.length > 10 ? 13 : 16

  return (
    <svg
      viewBox="0 0 160 48"
      className="w-full h-full"
      aria-label={name}
    >
      <text
        x="80"
        y="28"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={fontSize}
        fontWeight="700"
        fontFamily="system-ui, -apple-system, sans-serif"
        fill="currentColor"
        letterSpacing="-0.02em"
      >
        {name}
      </text>
    </svg>
  )
}

export function ClientLogos({ showHeading = false, className = '' }: ClientLogosProps) {
  return (
    <div className={className}>
      {showHeading && (
        <p className="text-center text-brand-gray text-sm font-medium uppercase tracking-wider mb-8">
          Trusted by Industry Leaders
        </p>
      )}

      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
        {clientLogos.map((client) => (
          <div
            key={client.name}
            className="group flex items-center justify-center w-36 h-14 md:w-44 md:h-16 grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300 text-brand-gray hover:text-brand-dark"
            title={client.name}
          >
            <ClientNameSvg name={client.name} />
          </div>
        ))}
      </div>
    </div>
  )
}
