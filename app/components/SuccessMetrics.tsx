import { successMetrics } from '@/app/data/trust'

interface SuccessMetricsProps {
  variant?: 'light' | 'dark'
  className?: string
}

export function SuccessMetrics({ variant = 'light', className = '' }: SuccessMetricsProps) {
  const isDark = variant === 'dark'

  return (
    <div className={className}>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4">
        {successMetrics.map((metric, index) => (
          <div
            key={index}
            className={`text-center ${index === 0 ? 'col-span-2 md:col-span-1' : ''}`}
          >
            {/* Large metric value - EMER-03: Response time prominent */}
            <p
              className={`text-3xl md:text-4xl lg:text-5xl font-bold ${
                isDark ? 'text-brand-red' : 'text-brand-red'
              }`}
            >
              {metric.value}
            </p>
            {/* Label */}
            <p
              className={`text-sm md:text-base font-semibold mt-1 ${
                isDark ? 'text-white' : 'text-brand-dark'
              }`}
            >
              {metric.label}
            </p>
            {/* Optional description */}
            {metric.description && (
              <p
                className={`text-xs md:text-sm mt-1 ${
                  isDark ? 'text-gray-400' : 'text-brand-gray'
                }`}
              >
                {metric.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
