import { certifications } from '@/app/data/trust'

interface CertificationsProps {
  className?: string
}

export function Certifications({ className = '' }: CertificationsProps) {
  return (
    <div className={className}>
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark">
          Certified Expertise
        </h2>
        <p className="mt-4 text-lg text-brand-gray">
          Partner-level certifications and industry-recognized credentials
        </p>
      </div>

      {/* Certification badges row */}
      <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 mb-10">
        {certifications.map((cert) => (
          <div
            key={cert.name}
            className="flex flex-col items-center text-center group"
          >
            {/* Placeholder badge - replace with actual certification logos */}
            <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-lg shadow-sm flex items-center justify-center mb-3 group-hover:shadow-md transition-shadow">
              <div className="text-center">
                <span className="text-xs md:text-sm font-bold text-brand-red">
                  {cert.issuer
                    .split(' ')
                    .map((w) => w[0])
                    .join('')
                    .slice(0, 3)
                    .toUpperCase()}
                </span>
              </div>
            </div>
            <p className="text-sm font-medium text-brand-dark max-w-[120px]">
              {cert.name}
            </p>
          </div>
        ))}
      </div>

      {/* Team certifications highlight */}
      <div className="bg-white rounded-xl p-6 md:p-8 max-w-3xl mx-auto shadow-sm">
        <h3 className="text-lg font-bold text-brand-dark mb-4 text-center">
          Our Team's Credentials
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex items-start">
            <svg
              className="w-5 h-5 text-brand-red mt-0.5 mr-3 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-brand-gray">15+ AWS certifications across the team</span>
          </div>
          <div className="flex items-start">
            <svg
              className="w-5 h-5 text-brand-red mt-0.5 mr-3 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-brand-gray">8+ Kubernetes certifications (CKA, CKAD, CKS)</span>
          </div>
          <div className="flex items-start">
            <svg
              className="w-5 h-5 text-brand-red mt-0.5 mr-3 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-brand-gray">Google Cloud Professional certifications</span>
          </div>
          <div className="flex items-start">
            <svg
              className="w-5 h-5 text-brand-red mt-0.5 mr-3 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-brand-gray">Azure Solutions Architect certifications</span>
          </div>
        </div>
      </div>
    </div>
  )
}
