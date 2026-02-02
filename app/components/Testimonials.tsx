import { testimonials as allTestimonials } from '@/app/data/trust'

interface TestimonialsProps {
  limit?: number
  className?: string
}

export function Testimonials({ limit, className = '' }: TestimonialsProps) {
  const testimonials = limit ? allTestimonials.slice(0, limit) : allTestimonials

  return (
    <div className={className}>
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark">
          What Our Clients Say
        </h2>
        <p className="mt-4 text-lg text-brand-gray">
          Real stories from companies we've helped in their critical moments
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Quote icon */}
            <svg
              className="w-10 h-10 text-brand-red mb-4"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>

            {/* Quote text */}
            <p className="text-brand-dark leading-relaxed mb-6">
              "{testimonial.quote}"
            </p>

            {/* Attribution - TRUST-02: Full attribution required */}
            <div className="flex items-center">
              {testimonial.image ? (
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-brand-red flex items-center justify-center mr-4">
                  <span className="text-white font-semibold">
                    {testimonial.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </span>
                </div>
              )}
              <div>
                <p className="font-semibold text-brand-dark">{testimonial.name}</p>
                <p className="text-sm text-brand-gray">
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
