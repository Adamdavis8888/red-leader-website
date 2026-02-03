import { Service } from '@/app/data/services'
import { CaseStudy } from '@/app/data/case-studies'
import { BlogPost } from '@/app/data/blog-posts'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://redleader.io'
const EMERGENCY_PHONE = process.env.NEXT_PUBLIC_EMERGENCY_PHONE || '+1-555-123-4567'

// Organization schema - used on homepage and about page
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Red Leader',
    description: '24/7 emergency infrastructure rescue for enterprises. Expert response when every minute of downtime costs thousands.',
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    telephone: EMERGENCY_PHONE,
    email: 'contact@redleader.io',
    foundingDate: '2018',
    areaServed: 'Worldwide',
    serviceType: 'IT Infrastructure Services',
    sameAs: [
      'https://www.linkedin.com/company/redleader',
      'https://twitter.com/redleader',
      'https://github.com/redleader',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: EMERGENCY_PHONE,
      contactType: 'emergency support',
      availableLanguage: 'English',
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '00:00',
        closes: '23:59',
      },
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
    },
  }
}

// WebSite schema - used on homepage
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Red Leader',
    description: 'Emergency Infrastructure Rescue - 24/7 Response',
    url: BASE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

// Service schema - used on service detail pages
export function generateServiceSchema(service: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    url: `${BASE_URL}/services/${service.slug}`,
    provider: {
      '@type': 'Organization',
      name: 'Red Leader',
      url: BASE_URL,
    },
    serviceType: service.title,
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${service.title} Services`,
      itemListElement: service.features.map((feature, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: feature,
        },
        position: index + 1,
      })),
    },
  }
}

// Article schema - used on blog post pages
export function generateArticleSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.seoDescription,
    url: `${BASE_URL}/blog/${post.slug}`,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Red Leader',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/blog/${post.slug}`,
    },
    articleSection: post.category,
    keywords: post.tags.join(', '),
  }
}

// Case Study schema (using Article type with modifications)
export function generateCaseStudySchema(caseStudy: CaseStudy) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: caseStudy.title,
    description: caseStudy.tagline,
    url: `${BASE_URL}/case-studies/${caseStudy.slug}`,
    author: {
      '@type': 'Organization',
      name: 'Red Leader',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Red Leader',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/case-studies/${caseStudy.slug}`,
    },
    about: {
      '@type': 'Thing',
      name: caseStudy.crisisType,
    },
    mentions: {
      '@type': 'Organization',
      name: caseStudy.client,
      industry: caseStudy.industry,
    },
  }
}

// BreadcrumbList schema
export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

// FAQPage schema - for potential FAQ section
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

// LocalBusiness schema - alternative for local SEO
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Red Leader',
    description: '24/7 emergency infrastructure rescue for enterprises',
    url: BASE_URL,
    telephone: EMERGENCY_PHONE,
    priceRange: '$$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
  }
}

// Component to render JSON-LD script tag
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
