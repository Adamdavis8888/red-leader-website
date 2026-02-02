export interface CaseStudyMetric {
  value: string
  label: string
}

export interface CaseStudy {
  id: string
  slug: string
  title: string
  client: string
  industry: string
  crisisType: string
  tagline: string
  problem: string
  solution: string
  outcome: string
  metrics: CaseStudyMetric[]
  timeline: string
  services: string[]
  testimonial?: {
    quote: string
    author: string
    role: string
  }
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'ecommerce-database-recovery',
    slug: 'ecommerce-database-recovery',
    title: 'E-commerce Database Recovery',
    client: 'Fortune 500 Retailer',
    industry: 'E-commerce',
    crisisType: 'Database Failure',
    tagline: 'Black Friday saved: 47TB PostgreSQL recovered in 4 hours',
    problem: 'During peak Black Friday traffic, a failed storage controller caused cascading corruption across the primary PostgreSQL cluster. The 47TB database serving 50,000 concurrent users went offline, with $2.1M in revenue at risk every hour. The internal team attempted recovery but made the corruption worse by running VACUUM on damaged tables.',
    solution: 'Our emergency team was on-site within 90 minutes. We immediately isolated the corrupted segments, set up a parallel recovery environment, and began WAL reconstruction from the last known good checkpoint. Using custom tooling for large-scale PostgreSQL recovery, we rebuilt the transaction log and verified data integrity sector by sector.',
    outcome: 'Full database recovery completed in 4 hours with zero data loss. The retailer resumed operations before midnight, capturing the remainder of Black Friday sales. We subsequently implemented streaming replication and automated failover to prevent future incidents.',
    metrics: [
      { value: '4 hrs', label: 'Recovery Time' },
      { value: '$8.4M', label: 'Revenue Saved' },
      { value: '0', label: 'Data Loss' },
      { value: '99.99%', label: 'Uptime After' },
    ],
    timeline: '4 hours',
    services: ['emergency-recovery', 'high-availability', 'disaster-prevention'],
    testimonial: {
      quote: 'They saved our Black Friday. Our internal team was panicking, but Red Leader walked in calm, diagnosed the issue in minutes, and had us back online before we lost the entire day. Worth every penny.',
      author: 'Sarah Chen',
      role: 'VP of Engineering',
    },
  },
  {
    id: 'financial-cloud-migration',
    slug: 'financial-cloud-migration',
    title: 'Financial Platform Cloud Migration',
    client: 'Regional Investment Bank',
    industry: 'Financial Services',
    crisisType: 'Cloud Migration',
    tagline: 'Zero-downtime migration of trading platform to AWS',
    problem: 'A regional investment bank needed to migrate their legacy trading platform from aging on-premise infrastructure to AWS. The platform processed $2B in daily transactions and had zero tolerance for downtime. Previous migration attempts by other vendors had failed due to data consistency issues and latency concerns.',
    solution: 'We designed a phased migration strategy using AWS DMS with custom change data capture for their proprietary trading engine. The migration ran in parallel for 3 weeks, with real-time data synchronization and automated consistency checks. We implemented circuit breakers that could instantly fail back to on-premise if any issues arose.',
    outcome: 'The migration completed with zero downtime and zero data discrepancies. The bank now operates on a modern AWS infrastructure with 40% lower operational costs and the ability to scale 5x during market volatility. They passed their next SOC2 audit with flying colors.',
    metrics: [
      { value: '0 min', label: 'Downtime' },
      { value: '40%', label: 'Cost Reduction' },
      { value: '6 weeks', label: 'Project Duration' },
      { value: '5x', label: 'Scale Capacity' },
    ],
    timeline: '6 weeks',
    services: ['cloud-migration', 'high-availability', 'disaster-prevention'],
    testimonial: {
      quote: 'We had two failed migration attempts before Red Leader. They delivered what others said was impossible: zero downtime, zero data loss, and we finished ahead of schedule.',
      author: 'Michael Torres',
      role: 'CTO',
    },
  },
  {
    id: 'healthcare-ransomware-recovery',
    slug: 'healthcare-ransomware-recovery',
    title: 'Healthcare System Ransomware Recovery',
    client: 'Multi-Hospital Health Network',
    industry: 'Healthcare',
    crisisType: 'Security Incident',
    tagline: 'Critical systems restored in 18 hours without paying ransom',
    problem: 'A ransomware attack encrypted systems across a 12-hospital network, including EMR, laboratory systems, and pharmacy management. Patient care was at risk with no access to medical records or medication dispensing. The attackers demanded $4.5M in cryptocurrency. HIPAA compliance and patient safety were immediate concerns.',
    solution: 'We established an incident command structure and immediately isolated unaffected systems. Our team identified the ransomware variant, located clean backup snapshots, and began parallel restoration of critical systems. We prioritized EMR and pharmacy systems for patient safety, then systematically restored remaining infrastructure while forensics documented the attack vector.',
    outcome: 'Critical patient care systems were operational within 18 hours. Full network restoration completed in 72 hours without paying the ransom. We implemented network segmentation, enhanced backup procedures, and security monitoring to prevent future incidents. The organization maintained HIPAA compliance throughout.',
    metrics: [
      { value: '18 hrs', label: 'To Critical Systems' },
      { value: '$0', label: 'Ransom Paid' },
      { value: '100%', label: 'Data Recovered' },
      { value: 'HIPAA', label: 'Compliant' },
    ],
    timeline: '72 hours',
    services: ['emergency-recovery', 'disaster-prevention', 'high-availability'],
    testimonial: {
      quote: 'When ransomware hit our network, patient lives were at stake. Red Leader had our critical systems back in under a day. Their calm, methodical approach during crisis is exactly what healthcare needs.',
      author: 'Dr. Rebecca Okonkwo',
      role: 'Chief Medical Information Officer',
    },
  },
]

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug)
}

export function getCrisisTypes(): string[] {
  return [...new Set(caseStudies.map((cs) => cs.crisisType))]
}

export function getIndustries(): string[] {
  return [...new Set(caseStudies.map((cs) => cs.industry))]
}

export function getRelatedCaseStudies(caseStudy: CaseStudy): CaseStudy[] {
  return caseStudies
    .filter((cs) => cs.id !== caseStudy.id)
    .filter((cs) => cs.services.some((service) => caseStudy.services.includes(service)))
}
