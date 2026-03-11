import { certifications } from '@/app/data/trust'

interface CertificationsProps {
  className?: string
}

// Inline SVG brand logos
function AwsLogo() {
  return (
    <svg viewBox="0 0 80 48" className="w-20 h-12" aria-label="AWS">
      <path d="M22.5 24.3c0 1 .1 1.8.3 2.4.2.6.5 1.2.9 1.8.1.2.2.3.2.5 0 .2-.1.4-.4.6l-1.3.9c-.2.1-.3.2-.5.2-.2 0-.4-.1-.6-.3-.3-.3-.5-.6-.7-1-.2-.4-.4-.8-.6-1.3-1.5 1.8-3.4 2.6-5.7 2.6-1.6 0-2.9-.5-3.9-1.4-1-.9-1.5-2.2-1.5-3.7 0-1.6.6-3 1.8-3.9 1.2-1 2.7-1.5 4.7-1.5.7 0 1.3 0 2 .1.7.1 1.4.2 2.1.4v-1.4c0-1.5-.3-2.5-.9-3.1-.6-.6-1.7-.9-3.2-.9-.7 0-1.4.1-2.1.3-.7.2-1.4.4-2.1.8-.3.2-.6.2-.7.3-.1 0-.2.1-.3.1-.3 0-.4-.2-.4-.6v-1c0-.3 0-.6.1-.7.1-.1.3-.3.6-.4.7-.4 1.5-.7 2.4-.9.9-.3 1.9-.4 2.9-.4 2.2 0 3.8.5 4.8 1.5 1 1 1.5 2.5 1.5 4.6v6zm-7.9 3c.6 0 1.3-.1 2-.4.7-.3 1.3-.7 1.8-1.3.3-.4.5-.8.6-1.3.1-.5.2-1 .2-1.7v-.8c-.5-.1-1.1-.2-1.7-.3-.6-.1-1.2-.1-1.8-.1-1.3 0-2.2.2-2.8.7-.6.5-1 1.2-1 2.1 0 .9.2 1.5.7 2 .5.4 1.1.7 2 .7l0-.6zm15.6 2.1c-.4 0-.6-.1-.8-.2-.2-.2-.3-.5-.4-.9L25.2 15c-.1-.4-.2-.7-.2-.8 0-.3.2-.5.5-.5h2c.4 0 .6.1.8.2.2.2.3.5.4.9l2.9 11.4 2.7-11.4c.1-.4.2-.7.4-.9.2-.2.5-.2.8-.2h1.6c.4 0 .6.1.8.2.2.2.3.5.4.9l2.7 11.5 3-11.5c.1-.4.2-.7.4-.9.2-.2.5-.2.8-.2h1.9c.3 0 .5.2.5.5 0 .1 0 .2-.1.4 0 .1-.1.3-.2.5l-4.1 13.4c-.1.4-.2.7-.4.9-.2.2-.5.2-.8.2h-1.8c-.4 0-.6-.1-.8-.2-.2-.2-.3-.5-.4-.9l-2.6-11.1-2.6 11c-.1.4-.2.7-.4.9-.2.2-.5.2-.8.2h-1.8zm25-1.3c-.9 0-1.8-.1-2.6-.3-.8-.2-1.5-.5-1.9-.8-.3-.2-.4-.4-.5-.6 0-.2-.1-.3-.1-.5v-1c0-.4.2-.6.5-.6.1 0 .2 0 .4.1.1 0 .3.1.5.2.7.3 1.4.6 2.2.8.8.2 1.5.3 2.3.3 1.2 0 2.2-.2 2.8-.7.6-.4 1-1.1 1-1.9 0-.6-.2-1-.5-1.4-.4-.4-1-.7-1.9-1l-2.7-.8c-1.4-.4-2.4-1.1-3-2-.6-.8-.9-1.7-.9-2.7 0-.8.2-1.5.5-2.1.3-.6.8-1.2 1.3-1.6.6-.4 1.2-.8 1.9-1 .7-.2 1.5-.3 2.3-.3.4 0 .8 0 1.3.1.4.1.8.2 1.2.3.4.1.7.2 1 .4.3.1.6.3.8.4.3.2.4.3.5.5.1.2.1.4.1.7v.9c0 .4-.2.6-.5.6-.2 0-.5-.1-.8-.3-1.2-.5-2.5-.8-3.9-.8-1.1 0-2 .2-2.6.6-.6.4-.9 1-.9 1.8 0 .6.2 1 .6 1.4.4.4 1.1.7 2 1l2.6.8c1.4.4 2.3 1.1 2.9 1.9.6.8.8 1.7.8 2.6 0 .8-.2 1.5-.5 2.2-.3.6-.8 1.2-1.4 1.6-.6.5-1.3.8-2.1 1-.9.3-1.7.4-2.7.4z" fill="currentColor"/>
      <path d="M45.6 36.7c-5.5 4.1-13.5 6.2-20.4 6.2-9.7 0-18.3-3.6-24.9-9.5-.5-.5-.1-1.1.6-.7 7.1 4.1 15.8 6.6 24.9 6.6 6.1 0 12.8-1.3 19-3.9.9-.4 1.7.6.8 1.3z" fill="#F90"/>
      <path d="M47.9 34.1c-.7-.9-4.6-.4-6.4-.2-.5.1-.6-.4-.1-.7 3.1-2.2 8.2-1.6 8.8-.8.6.7-.2 5.8-3.1 8.2-.4.4-.9.2-.7-.3.7-1.7 2.2-5.4 1.5-6.2z" fill="#F90"/>
    </svg>
  )
}

function GoogleCloudLogo() {
  return (
    <svg viewBox="0 0 80 48" className="w-20 h-12" aria-label="Google Cloud">
      <path d="M50.1 18.2l2.2-2.2.1-1c-4.2-3.8-10.3-5-15.8-3.2-5.5 1.8-9.5 6.3-10.7 12-.3.1-.7.1-1 .5l-4.4 4.4c-.1.2-.2.5-.1.7-1 5.5 1.1 11.2 5.4 14.8 4.4 3.6 10.4 4.8 15.8 3.1 5.5-1.7 9.6-6.1 10.9-11.5h-13.1v3.5h9.3c-.7 2.8-2.5 5.2-5 6.7-3.8 2.3-8.5 2.5-12.5.4-3.9-2.1-6.7-6-7.2-10.4-.5-4.4 1.2-8.8 4.5-11.7 3.3-2.9 7.8-3.8 12-2.5 2.3.7 4.3 2.1 5.8 3.9l3.8-3.8z" fill="#4285F4"/>
      <circle cx="26.5" cy="29" r="2.5" fill="#34A853"/>
      <circle cx="53.5" cy="29" r="2.5" fill="#EA4335"/>
      <circle cx="40" cy="16" r="2.5" fill="#FBBC05"/>
    </svg>
  )
}

function AzureLogo() {
  return (
    <svg viewBox="0 0 80 48" className="w-20 h-12" aria-label="Microsoft Azure">
      <path d="M24.5 8L13 38h8.5L34 8h-9.5z" fill="#0089D6"/>
      <path d="M34 8l-6.8 13.3L40 38h12L34 8z" fill="#0089D6" opacity="0.8"/>
      <path d="M46 18l-5.5 10L52.5 38H66L46 18z" fill="#0089D6" opacity="0.6"/>
    </svg>
  )
}

function CncfLogo() {
  return (
    <svg viewBox="0 0 80 48" className="w-20 h-12" aria-label="CNCF">
      <g fill="currentColor">
        <path d="M20 14h6v20h-6z"/>
        <path d="M28 14h6v20h-6z"/>
        <path d="M20 14h14v5H20z"/>
        <path d="M20 22h14v4H20z"/>
        <rect x="38" y="14" width="6" height="20" rx="1"/>
        <polygon points="46,14 46,34 52,34 52,26 58,34 66,34 57,24 65,14 58,14 52,22 52,14"/>
      </g>
      <text x="40" y="44" textAnchor="middle" fontSize="7" fill="currentColor" fontWeight="bold">CNCF</text>
    </svg>
  )
}

function Soc2Logo() {
  return (
    <svg viewBox="0 0 80 48" className="w-20 h-12" aria-label="SOC2">
      <circle cx="40" cy="22" r="16" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M40 10v12l8 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <text x="40" y="45" textAnchor="middle" fontSize="8" fill="currentColor" fontWeight="bold">SOC 2</text>
    </svg>
  )
}

function NvidiaLogo() {
  return (
    <svg viewBox="0 0 80 48" className="w-20 h-12" aria-label="NVIDIA">
      <path d="M30.5 12.5c-1.2.1-2.3.5-3.4 1v-.1c1.9-2.7 5-4.1 5-4.1s-2.6-3.2-7.7-3.2c-5.8 0-10.5 5.5-10.5 5.5s3.4-2.7 7-2.9c.5 0 1 0 1.5.1-3.7 1.8-6.4 6.5-6.4 6.5s1.1-.8 2.3-1.3c-1.4 2.5-1.3 5.7-1.3 5.7s1.1-2.7 2.7-4.5c-.2 2.3.7 4.9.7 4.9s.6-2.5 1.5-4.3c.5 2 1.7 3.6 1.7 3.6s.1-2.1.5-4c.8 1.4 1.4 2.7 1.4 2.7s.4-1.4.5-2.8c.5.8.9 1.5.9 1.5l.2-1.5c1.5 1.5 2.3 4.7 2.3 4.7s.3-1.7-.2-3.8c1.2 1.2 2.6 4 2.6 4s-.3-2.4-1.2-4.5c.9.6 1.6 1.3 2.1 2-.3-1.4-1-2.8-1.9-3.9.6.2 1.1.5 1.5.8-.5-1.4-1.5-2.6-2.7-3.3z" fill="#76B900"/>
      <text x="40" y="38" textAnchor="middle" fontSize="8" fill="currentColor" fontWeight="bold">NVIDIA</text>
    </svg>
  )
}

const certLogos: Record<string, React.ReactNode> = {
  'Amazon Web Services': <AwsLogo />,
  'Google Cloud': <GoogleCloudLogo />,
  'Microsoft': <AzureLogo />,
  'CNCF': <CncfLogo />,
  'AICPA': <Soc2Logo />,
  'NVIDIA': <NvidiaLogo />,
}

export function Certifications({ className = '' }: CertificationsProps) {
  return (
    <div className={className}>
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark">
          Certified Expertise
        </h2>
        <p className="mt-4 text-lg text-brand-gray">
          Industry-recognized credentials and certifications
        </p>
      </div>

      {/* Certification badges row */}
      <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
        {certifications.map((cert) => (
          <div
            key={cert.name}
            className="flex flex-col items-center text-center group"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-lg shadow-sm flex items-center justify-center mb-3 group-hover:shadow-md transition-shadow text-brand-gray">
              {certLogos[cert.issuer] || (
                <span className="text-xs md:text-sm font-bold text-brand-red">
                  {cert.issuer
                    .split(' ')
                    .map((w) => w[0])
                    .join('')
                    .slice(0, 3)
                    .toUpperCase()}
                </span>
              )}
            </div>
            <p className="text-sm font-medium text-brand-dark max-w-[120px]">
              {cert.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
