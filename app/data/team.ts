export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  expertise: string[]
  certifications: string[]
  image: string
  linkedIn?: string
  onCall: boolean
}

export const teamMembers: TeamMember[] = [
  {
    id: 'alex-chen',
    name: 'Alex Chen',
    role: 'Founder & Principal Engineer',
    bio: 'Built and recovered infrastructure at scale for 15 years. Founded Red Leader after watching too many companies lose millions to preventable outages. Believes every minute of downtime is a minute too long.',
    expertise: ['Kubernetes', 'AWS', 'PostgreSQL', 'Disaster Recovery', 'High Availability'],
    certifications: ['AWS Solutions Architect Professional', 'CKA (Certified Kubernetes Administrator)'],
    image: '/images/team/alex-chen.jpg',
    linkedIn: 'https://linkedin.com/in/alexchen',
    onCall: true
  },
  {
    id: 'jordan-rivera',
    name: 'Jordan Rivera',
    role: 'Senior Infrastructure Engineer',
    bio: 'Former SRE at a major cloud provider. Specializes in database recovery and has personally restored data that other firms declared unrecoverable. The database whisperer.',
    expertise: ['PostgreSQL', 'MySQL', 'MongoDB', 'Data Recovery', 'Backup Systems'],
    certifications: ['PostgreSQL Certified Professional', 'AWS Database Specialty'],
    image: '/images/team/jordan-rivera.jpg',
    onCall: true
  },
  {
    id: 'sam-patel',
    name: 'Sam Patel',
    role: 'Cloud Architecture Lead',
    bio: 'Architected multi-region deployments for Fortune 100 companies. Obsessed with eliminating single points of failure and building systems that survive anything.',
    expertise: ['AWS', 'GCP', 'Azure', 'Terraform', 'Multi-Region Architecture'],
    certifications: ['AWS Solutions Architect Professional', 'Google Cloud Professional Architect', 'HashiCorp Terraform Associate'],
    image: '/images/team/sam-patel.jpg',
    linkedIn: 'https://linkedin.com/in/sampatel',
    onCall: true
  },
  {
    id: 'morgan-kim',
    name: 'Morgan Kim',
    role: 'DevOps & Automation Lead',
    bio: 'Pipeline perfectionist who believes if you\'re doing it more than twice, it should be automated. Has reduced deployment times from hours to minutes for dozens of clients.',
    expertise: ['CI/CD', 'GitOps', 'Kubernetes', 'ArgoCD', 'GitHub Actions'],
    certifications: ['CKA', 'CKAD', 'GitLab Certified Professional'],
    image: '/images/team/morgan-kim.jpg',
    onCall: false
  },
  {
    id: 'taylor-brooks',
    name: 'Taylor Brooks',
    role: 'Security & Reliability Engineer',
    bio: 'Bridges the gap between security and reliability. Ensures every recovery is secure and every system is hardened. Former incident commander at a major fintech.',
    expertise: ['Security', 'Incident Response', 'Compliance', 'AWS Security', 'Zero Trust'],
    certifications: ['CISSP', 'AWS Security Specialty', 'CKS (Certified Kubernetes Security)'],
    image: '/images/team/taylor-brooks.jpg',
    onCall: true
  }
]
