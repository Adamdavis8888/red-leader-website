export interface Stat {
  value: string
  label: string
}

export interface Value {
  title: string
  description: string
  icon: 'speed' | 'transparency' | 'mastery' | 'success'
}

export interface Milestone {
  year: number
  title: string
  description: string
}

export interface CompanyInfo {
  story: string[]
  mission: string
}

export const companyInfo: CompanyInfo = {
  story: [
    "Red Leader was founded by engineers who learned the hard way what happens when critical infrastructure fails. After watching a $50 million e-commerce platform go dark during peak holiday season — and experiencing firsthand the chaos of waiting days for consultants who couldn't solve the problem — we knew there had to be a better way.",
    "The realization was simple but urgent: when systems go down, every minute costs thousands. Most consultancies treat emergencies like any other project — scheduled for next week, staffed with whoever is available, resolved whenever it's convenient. But infrastructure failures don't wait for business hours.",
    "So we built something different. A team that responds like first responders — available 24/7, trained for crisis, equipped to handle anything. We invested in deep technical expertise across every layer of the modern stack. We built processes optimized for speed without sacrificing quality.",
    "Today, Fortune 500 companies trust Red Leader with their most critical infrastructure emergencies. We've recovered databases declared unrecoverable, restored Kubernetes clusters from catastrophic state, and brought back systems that were written off as total losses. When everything is on fire, we're the ones you call."
  ],
  mission: "When your systems fail, we fix them fast. No excuses, no delays, no finger-pointing. Just solutions."
}

export const values: Value[] = [
  {
    title: "Speed Over Perfection",
    description: "In emergencies, a working solution now beats a perfect solution tomorrow. We optimize for time-to-recovery, then iterate to excellence.",
    icon: 'speed'
  },
  {
    title: "Radical Transparency",
    description: "We tell you what's broken, why it broke, and exactly how we're fixing it. No mysteries, no jargon walls, no finger-pointing at your team.",
    icon: 'transparency'
  },
  {
    title: "Deep Technical Mastery",
    description: "We invest relentlessly in expertise so we can solve problems others can't. Our engineers don't just know the tools — they understand the internals.",
    icon: 'mastery'
  },
  {
    title: "Client Success First",
    description: "Your uptime is our reputation. We don't succeed unless you succeed, and we don't rest until your systems are running better than before.",
    icon: 'success'
  }
]

export const milestones: Milestone[] = [
  {
    year: 2018,
    title: "Founded",
    description: "Red Leader launches with a single mission: emergency infrastructure rescue when every minute counts."
  },
  {
    year: 2019,
    title: "First Fortune 500 Client",
    description: "Trusted to recover a major retailer's e-commerce platform during Black Friday — 2 hours to full restoration."
  },
  {
    year: 2020,
    title: "Pandemic Response",
    description: "Helped 50+ companies scale infrastructure for remote work overnight as the world shifted to work-from-home."
  },
  {
    year: 2022,
    title: "24/7 Global Coverage",
    description: "Expanded to true around-the-clock emergency response with engineers across multiple time zones."
  },
  {
    year: 2024,
    title: "100th Enterprise Client",
    description: "Reached milestone with 99.9% recovery success rate and average response time under 2 hours."
  }
]

export const stats: Stat[] = [
  { value: "99.9%", label: "Recovery Success Rate" },
  { value: "< 2 hrs", label: "Average Response Time" },
  { value: "500+", label: "Emergencies Resolved" },
  { value: "24/7", label: "Availability" }
]
