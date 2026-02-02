import Link from 'next/link'
import type { Metadata } from 'next'
import { blogPosts, getCategories } from '@/app/data/blog-posts'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Blog - Red Leader',
  description: 'Technical insights on infrastructure reliability, DevOps best practices, and emergency response from the Red Leader team.',
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function BlogPage() {
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
  const categories = getCategories()

  return (
    <>
      {/* Hero Section */}
      <section className="bg-brand-dark text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
              Technical Insights
            </h1>
            <p className="mt-6 text-xl text-gray-300">
              Deep dives into infrastructure reliability, DevOps practices, and lessons learned
              from hundreds of emergency responses.
            </p>
          </div>

          {/* Category Pills */}
          <div className="mt-8 flex flex-wrap gap-3">
            {categories.map((category) => (
              <span
                key={category}
                className="inline-block px-4 py-2 bg-white/10 text-white text-sm font-medium rounded-full"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow group border border-gray-100"
              >
                <div className="p-6">
                  {/* Category Badge */}
                  <span className="inline-block px-3 py-1 bg-red-100 text-brand-red text-xs font-medium rounded-full mb-4">
                    {post.category}
                  </span>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-red transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>

                  {/* Excerpt */}
                  <p className="text-brand-gray text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Author and Meta */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-brand-dark flex items-center justify-center text-white text-sm font-bold">
                      {post.author.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-brand-dark">
                        {post.author.name}
                      </p>
                      <p className="text-xs text-brand-gray">
                        {post.author.role}
                      </p>
                    </div>
                  </div>

                  {/* Date and Reading Time */}
                  <div className="flex items-center justify-between text-sm text-brand-gray pt-4 border-t border-gray-100">
                    <span>{formatDate(post.publishedAt)}</span>
                    <span>{post.readingTime}</span>
                  </div>

                  {/* Read More Link */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-4 inline-flex items-center text-brand-red font-medium text-sm group-hover:underline"
                  >
                    Read More
                    <svg
                      className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark">
            Have an Infrastructure Challenge?
          </h2>
          <p className="mt-4 text-lg text-brand-gray">
            Our team has solved problems like these for organizations across every industry.
            Let&apos;s discuss your situation.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-brand-red text-white font-semibold rounded-lg hover:bg-brand-red-dark transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/#book"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-brand-dark text-brand-dark font-semibold rounded-lg hover:bg-brand-dark hover:text-white transition-colors"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
