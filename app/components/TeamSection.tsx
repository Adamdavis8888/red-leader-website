import { teamMembers, type TeamMember } from '@/app/data/team'

interface TeamSectionProps {
  showAll?: boolean
  limit?: number
}

function TeamCard({ member }: { member: TeamMember }) {
  // Get initials for placeholder
  const initials = member.name
    .split(' ')
    .map(n => n[0])
    .join('')

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
      {/* Image placeholder with initials */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-xl font-bold text-brand-gray">{initials}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-lg font-bold text-brand-dark">{member.name}</h3>
            {member.onCall && (
              <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1" />
                On Call
              </span>
            )}
          </div>
          <p className="text-brand-gray text-sm">{member.role}</p>
        </div>
      </div>

      {/* Bio */}
      <p className="text-brand-gray text-sm mb-4 leading-relaxed">
        {member.bio}
      </p>

      {/* Expertise tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {member.expertise.slice(0, 4).map((skill) => (
          <span
            key={skill}
            className="inline-block px-2 py-0.5 text-xs font-medium bg-red-50 text-brand-red rounded"
          >
            {skill}
          </span>
        ))}
        {member.expertise.length > 4 && (
          <span className="inline-block px-2 py-0.5 text-xs font-medium bg-gray-100 text-brand-gray rounded">
            +{member.expertise.length - 4} more
          </span>
        )}
      </div>

      {/* Certifications */}
      <div className="border-t border-gray-100 pt-4">
        <div className="flex items-start gap-2">
          <svg
            className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            />
          </svg>
          <div className="text-xs text-brand-gray">
            {member.certifications.map((cert, index) => (
              <span key={cert}>
                {cert}
                {index < member.certifications.length - 1 && ' • '}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function TeamSection({ showAll = true, limit }: TeamSectionProps) {
  const displayMembers = limit ? teamMembers.slice(0, limit) : teamMembers

  return (
    <div>
      {/* Section header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark">
          Meet Our Emergency Response Team
        </h2>
        <p className="mt-4 text-lg text-brand-gray max-w-2xl mx-auto">
          Certified experts on call 24/7 for your infrastructure emergencies
        </p>
      </div>

      {/* Team grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayMembers.map((member) => (
          <TeamCard key={member.id} member={member} />
        ))}
      </div>

      {/* On-call callout */}
      <div className="mt-10 bg-red-50 border border-red-100 rounded-lg p-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-brand-red opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-red" />
          </span>
          <span className="text-lg font-bold text-brand-dark">
            24/7 Emergency Response
          </span>
        </div>
        <p className="text-brand-gray">
          Our on-call engineers respond within 2 hours, around the clock, every day of the year.
        </p>
      </div>
    </div>
  )
}
