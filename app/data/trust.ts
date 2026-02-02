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
  { name: 'TechCorp', logoUrl: '/images/logos/techcorp.svg', industry: 'Technology' },
  { name: 'FinanceFirst', logoUrl: '/images/logos/financefirst.svg', industry: 'Finance' },
  { name: 'HealthNet', logoUrl: '/images/logos/healthnet.svg', industry: 'Healthcare' },
  { name: 'RetailGiant', logoUrl: '/images/logos/retailgiant.svg', industry: 'Retail' },
  { name: 'ManufacturePro', logoUrl: '/images/logos/manufacturepro.svg', industry: 'Manufacturing' },
  { name: 'CloudScale', logoUrl: '/images/logos/cloudscale.svg', industry: 'Technology' },
  { name: 'SecureBank', logoUrl: '/images/logos/securebank.svg', industry: 'Finance' },
  { name: 'MediCare Plus', logoUrl: '/images/logos/medicareplus.svg', industry: 'Healthcare' },
  { name: 'GlobalLogistics', logoUrl: '/images/logos/globallogistics.svg', industry: 'Manufacturing' },
  { name: 'DataDriven', logoUrl: '/images/logos/datadriven.svg', industry: 'Technology' },
]

// TRUST-02: Testimonials with full attribution (name, role, company)
export const testimonials: Testimonial[] = [
  {
    quote: "When our production database went down at 2 AM on a Friday, Red Leader had us back online in 90 minutes. They saved us from a weekend of downtime that would have cost us millions.",
    name: 'Sarah Chen',
    role: 'VP of Engineering',
    company: 'TechCorp',
  },
  {
    quote: "Our Kubernetes cluster was in complete chaos after a failed upgrade. Red Leader's team diagnosed and fixed the issue in under two hours. Their expertise is unmatched.",
    name: 'Michael Rodriguez',
    role: 'CTO',
    company: 'CloudScale',
  },
  {
    quote: "We thought we'd lost three years of financial records when our storage system corrupted. Red Leader recovered 100% of our data. They're miracle workers.",
    name: 'Jennifer Walsh',
    role: 'Director of IT',
    company: 'FinanceFirst',
  },
  {
    quote: "Red Leader didn't just fix our immediate crisis — they redesigned our infrastructure to prevent it from happening again. Our uptime has been 99.99% since.",
    name: 'David Park',
    role: 'Head of Platform',
    company: 'HealthNet',
  },
  {
    quote: "I've worked with dozens of infrastructure consultants. Red Leader is the only team I'd call at 3 AM knowing they'll answer and actually solve the problem.",
    name: 'Amanda Foster',
    role: 'SVP of Technology',
    company: 'RetailGiant',
  },
  {
    quote: "After two other firms failed to migrate us to AWS, Red Leader completed it in three weeks with zero downtime. They're now our go-to for all infrastructure work.",
    name: 'Robert Kim',
    role: 'CIO',
    company: 'ManufacturePro',
  },
]

// TRUST-03: Certifications and credentials
export const certifications: Certification[] = [
  {
    name: 'AWS Advanced Consulting Partner',
    issuer: 'Amazon Web Services',
    logoUrl: '/images/certs/aws-partner.svg',
    description: 'Recognized expertise in AWS architecture, migration, and operations',
  },
  {
    name: 'Google Cloud Partner',
    issuer: 'Google Cloud',
    logoUrl: '/images/certs/gcp-partner.svg',
    description: 'Certified expertise in Google Cloud Platform solutions',
  },
  {
    name: 'Microsoft Azure Solutions Partner',
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
