// Trust signal data for social proof and credibility

export interface ClientLogo {
  name: string
  logoUrl: string
  industry: string
}

export interface Testimonial {
  quote: string
  name: string
  role: string
  company: string
  image?: string
}

export interface Certification {
  name: string
  issuer: string
  logoUrl?: string
  description: string
}

export interface SuccessMetric {
  value: string
  label: string
  description?: string
}

// TRUST-01: Client logos for logo wall
export const clientLogos: ClientLogo[] = [
  { name: 'Samsung Research America', logoUrl: '/images/logos/samsung.svg', industry: 'Technology' },
  { name: 'Joyent', logoUrl: '/images/logos/joyent.svg', industry: 'Technology' },
  { name: 'Apple', logoUrl: '/images/logos/apple.svg', industry: 'Technology' },
  { name: 'Western Digital', logoUrl: '/images/logos/western-digital.svg', industry: 'Technology' },
]

// TRUST-02: Testimonials with role/title only
export const testimonials: Testimonial[] = [
  {
    quote: "When our production database went down at 2 AM on a Friday, Red-Leader had us back online in 90 minutes. They saved us from a weekend of downtime that would have cost us millions.",
    name: '',
    role: 'VP of Engineering',
    company: '',
  },
  {
    quote: "Our Kubernetes cluster was in complete chaos after a failed upgrade. Red-Leader's team diagnosed and fixed the issue in under two hours. Their expertise is unmatched.",
    name: '',
    role: 'CTO',
    company: '',
  },
  {
    quote: "We thought we'd lost three years of financial records when our storage system corrupted. Red-Leader recovered 100% of our data. They're miracle workers.",
    name: '',
    role: 'Director of IT',
    company: '',
  },
  {
    quote: "Red-Leader didn't just fix our immediate crisis — they redesigned our infrastructure to prevent it from happening again. Our uptime has been 99.99% since.",
    name: '',
    role: 'Head of Platform',
    company: '',
  },
  {
    quote: "I've worked with dozens of infrastructure consultants. Red-Leader is the only team I'd call at 3 AM knowing they'll answer and actually solve the problem.",
    name: '',
    role: 'SVP of Technology',
    company: '',
  },
  {
    quote: "After two other firms failed to migrate us to AWS, Red-Leader completed it in three weeks with zero downtime. They're now our go-to for all infrastructure work.",
    name: '',
    role: 'CIO',
    company: '',
  },
]

// TRUST-03: Certifications and credentials
export const certifications: Certification[] = [
  {
    name: 'AWS Advanced Consulting',
    issuer: 'Amazon Web Services',
    logoUrl: '/images/certs/aws-partner.svg',
    description: 'Recognized expertise in AWS architecture, migration, and operations',
  },
  {
    name: 'Google Cloud',
    issuer: 'Google Cloud',
    logoUrl: '/images/certs/gcp-partner.svg',
    description: 'Certified expertise in Google Cloud Platform solutions',
  },
  {
    name: 'Microsoft Azure Solutions',
    issuer: 'Microsoft',
    logoUrl: '/images/certs/azure-partner.svg',
    description: 'Validated competency in Azure cloud services',
  },
  {
    name: 'Kubernetes Certified Service Provider',
    issuer: 'CNCF',
    logoUrl: '/images/certs/kcsp.svg',
    description: 'Team holds 8+ Kubernetes certifications (CKA, CKAD, CKS)',
  },
  {
    name: 'SOC 2 Type II Compliant',
    issuer: 'AICPA',
    logoUrl: '/images/certs/soc2.svg',
    description: 'Audited security controls for handling sensitive data',
  },
]

// TRUST-04: Success metrics (EMER-03: response time prominently displayed)
export const successMetrics: SuccessMetric[] = [
  {
    value: '< 2 hrs',
    label: 'Average Response',
    description: 'From first call to engineer on your systems',
  },
  {
    value: '99.9%',
    label: 'Recovery Rate',
    description: 'We fix what others can\'t',
  },
  {
    value: '500+',
    label: 'Emergencies Resolved',
    description: 'Critical systems recovered',
  },
  {
    value: '99.95%',
    label: 'Client Uptime',
    description: 'After our intervention',
  },
  {
    value: '45 min',
    label: 'Fastest Recovery',
    description: 'Production database restored',
  },
]
