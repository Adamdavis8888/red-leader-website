'use client'

export function EmergencyBadge() {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <a
        href="tel:+1-555-RED-LEAD"
        className="flex items-center space-x-3 bg-brand-red text-white px-5 py-3 rounded-full shadow-lg hover:bg-brand-red-dark transition-colors"
        aria-label="24/7 Emergency Response - Call Now"
      >
        {/* Pulse Indicator */}
        <span className="relative flex h-3 w-3">
          <span className="animate-[emergency-pulse_2s_ease-in-out_infinite] absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>

        {/* Badge Text */}
        <div className="flex flex-col">
          <span className="text-xs font-medium">24/7 EMERGENCY</span>
          <span className="text-sm font-bold">Call Now</span>
        </div>

        {/* Phone Icon */}
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
      </a>
    </div>
  )
}
