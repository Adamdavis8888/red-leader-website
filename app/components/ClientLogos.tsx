import { clientLogos } from '@/app/data/trust'

interface ClientLogosProps {
  showHeading?: boolean
  className?: string
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
            className="group flex items-center justify-center w-24 h-12 md:w-32 md:h-16 grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300"
            title={`${client.name} - ${client.industry}`}
          >
            {/* Placeholder with company initials - replace with actual logos */}
            <div className="flex items-center justify-center w-full h-full bg-gray-100 rounded-lg group-hover:bg-gray-50 transition-colors">
              <span className="text-lg md:text-xl font-bold text-brand-gray group-hover:text-brand-dark transition-colors">
                {client.name
                  .split(' ')
                  .map((word) => word[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
