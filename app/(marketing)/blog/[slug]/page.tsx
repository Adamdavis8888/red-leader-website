import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { blogPosts, getBlogPostBySlug, getRelatedPosts } from '@/app/data/blog-posts'
import {
  JsonLd,
  generateArticleSchema,
  generateBreadcrumbSchema,
} from '@/app/lib/structured-data'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://redleader.io'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found - Red Leader',
    }
  }

  return {
    title: `${post.title} - Blog - Red Leader`,
    description: post.seoDescription,
  }
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function renderContent(content: string) {
  const paragraphs = content.split('\n\n')

  return paragraphs.map((paragraph, index) => {
    // Handle headings
    if (paragraph.startsWith('## ')) {
      return (
        <h2 key={index} className="text-2xl font-bold text-brand-dark mt-10 mb-4">
          {paragraph.replace('## ', '')}
        </h2>
      )
    }

    // Handle code blocks
    if (paragraph.startsWith('```')) {
      const lines = paragraph.split('\n')
      const language = lines[0].replace('```', '')
      const code = lines.slice(1, -1).join('\n')
      return (
        <pre
          key={index}
          className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto my-6 text-sm"
        >
          <code>{code}</code>
        </pre>
      )
    }

    // Handle inline code in paragraphs
    const parts = paragraph.split(/(`[^`]+`)/)
    const hasInlineCode = parts.length > 1

    if (hasInlineCode) {
      return (
        <p key={index} className="mb-4 text-brand-gray leading-relaxed">
          {parts.map((part, partIndex) => {
            if (part.startsWith('`') && part.endsWith('`')) {
              return (
                <code
                  key={partIndex}
                  className="bg-gray-100 text-brand-red px-1.5 py-0.5 rounded text-sm font-mono"
                >
                  {part.slice(1, -1)}
                </code>
              )
            }
            return part
          })}
        </p>
      )
    }

    // Regular paragraph
    return (
      <p key={index} className="mb-4 text-brand-gray leading-relaxed">
        {paragraph}
      </p>
    )
  })
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(post)
  const currentIndex = blogPosts.findIndex((p) => p.slug === post.slug)
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null

  const breadcrumbs = [
    { name: 'Home', url: BASE_URL },
    { name: 'Blog', url: `${BASE_URL}/blog` },
    { name: post.title, url: `${BASE_URL}/blog/${post.slug}` },
  ]

  return (
    <>
      {/* Structured Data */}
      <JsonLd data={generateArticleSchema(post)} />
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />

      {/* Breadcrumb */}
      <nav className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="text-brand-gray hover:text-brand-red transition-colors">
                Home
              </Link>
            </li>
            <li className="text-brand-gray">/</li>
            <li>
              <Link href="/blog" className="text-brand-gray hover:text-brand-red transition-colors">
                Blog
              </Link>
            </li>
            <li className="text-brand-gray">/</li>
            <li className="text-brand-dark font-medium truncate max-w-[200px]">
              {post.title}
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-brand-dark text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Category Badge */}
            <span className="inline-block px-3 py-1 bg-brand-red text-white text-sm font-medium rounded-full mb-6">
              {post.category}
            </span>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="mt-6 text-xl text-gray-300">
              {post.excerpt}
            </p>

            {/* Author Info */}
            <div className="mt-8 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">
                {post.author.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <p className="font-medium text-white">{post.author.name}</p>
                <p className="text-sm text-gray-400">{post.author.role}</p>
              </div>
            </div>

            {/* Meta Row */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formatDate(post.publishedAt)}
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {post.readingTime}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Article Content */}
            <article className="lg:col-span-2 prose prose-lg max-w-none">
              {renderContent(post.content)}

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-brand-dark mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block px-3 py-1 bg-gray-100 text-brand-gray text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
                {/* Author Card */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-brand-dark mb-4">About the Author</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-brand-dark flex items-center justify-center text-white font-bold">
                      {post.author.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-brand-dark">{post.author.name}</p>
                      <p className="text-sm text-brand-gray">{post.author.role}</p>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-bold text-brand-dark mb-2">
                    Need Help With {post.category}?
                  </h3>
                  <p className="text-sm text-brand-gray mb-4">
                    Our team has deep expertise in this area. Let&apos;s discuss your challenges.
                  </p>
                  <div className="space-y-3">
                    <Link
                      href="/contact"
                      className="w-full inline-flex items-center justify-center px-6 py-3 bg-brand-red text-white font-semibold rounded-lg hover:bg-brand-red-dark transition-colors"
                    >
                      Contact Us
                    </Link>
                    <Link
                      href="/#book"
                      className="w-full inline-flex items-center justify-center px-6 py-3 border-2 border-brand-dark text-brand-dark font-semibold rounded-lg hover:bg-brand-dark hover:text-white transition-colors"
                    >
                      Book a Consultation
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Prev/Next Navigation */}
      <section className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2">
            {/* Previous */}
            <div className={`py-8 pr-4 ${prevPost ? 'border-r border-gray-200' : ''}`}>
              {prevPost ? (
                <Link
                  href={`/blog/${prevPost.slug}`}
                  className="group flex flex-col"
                >
                  <span className="text-sm text-brand-gray mb-1 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                  </span>
                  <span className="font-medium text-brand-dark group-hover:text-brand-red transition-colors line-clamp-2">
                    {prevPost.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
            </div>

            {/* Next */}
            <div className="py-8 pl-4 text-right">
              {nextPost ? (
                <Link
                  href={`/blog/${nextPost.slug}`}
                  className="group flex flex-col items-end"
                >
                  <span className="text-sm text-brand-gray mb-1 flex items-center gap-1">
                    Next
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                  <span className="font-medium text-brand-dark group-hover:text-brand-red transition-colors line-clamp-2">
                    {nextPost.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-brand-dark mb-8">Related Articles</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="inline-block px-2 py-1 bg-red-100 text-brand-red text-xs font-medium rounded">
                      {related.category}
                    </span>
                    <span className="inline-block px-2 py-1 bg-gray-100 text-brand-gray text-xs font-medium rounded">
                      {related.readingTime}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-brand-dark mb-2 group-hover:text-brand-red transition-colors">
                    {related.title}
                  </h3>
                  <p className="text-brand-gray text-sm mb-4 line-clamp-2">
                    {related.excerpt}
                  </p>
                  <span className="text-brand-red font-medium text-sm inline-flex items-center">
                    Read Article
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
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to Blog Link */}
      <section className="py-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-brand-gray hover:text-brand-red transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark">
            Ready to Improve Your Infrastructure?
          </h2>
          <p className="mt-4 text-lg text-brand-gray">
            Whether you&apos;re facing an infrastructure emergency or planning proactive improvements,
            our team has the expertise to help.
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
