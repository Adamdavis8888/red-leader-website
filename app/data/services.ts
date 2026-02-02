export interface ServiceMetric {
  value: string
  label: string
}

export interface Service {
  id: string
  slug: string
  title: string
  tagline: string
  headline: string
  description: string
  longDescription: string
  features: string[]
  metrics: ServiceMetric[]
  technicalCapabilities: string[]
  useCases: string[]
  ctaText: string
  relatedServices: string[]
}

export const services: Service[] = [
  {
    id: 'emergency-recovery',
    slug: 'emergency-recovery',
    title: 'Emergency Recovery',
    tagline: 'System down? We\'re on it.',
    headline: 'Restore Operations in Hours, Not Days',
    description: 'When your production systems fail, every minute costs thousands. Our emergency response team is available 24/7/365 to diagnose and resolve critical infrastructure failures. We\'ve recovered systems that others said couldn\'t be saved.',
    longDescription: `When critical systems fail, every second counts. Our emergency recovery team has rescued production databases from corruption, restored Kubernetes clusters from catastrophic state, and brought back services that were declared unrecoverable by other consultants.

We specialize in the emergencies that keep CTOs up at night: corrupted PostgreSQL databases with failed PITR, Kubernetes clusters stuck in CrashLoopBackOff across all nodes, and AWS accounts locked out during active incidents. Our average time to first diagnostic is under 30 minutes.

Our team maintains deep expertise across the full infrastructure stack. We don't just fix the immediate problem - we identify the root cause and implement safeguards to prevent recurrence. Every recovery includes a detailed post-mortem and actionable recommendations.`,
    features: [
      'Average response time under 2 hours',
      'Database corruption recovery',
      'Kubernetes cluster rescue',
      'Cloud infrastructure failures',
      'Network outage resolution',
    ],
    metrics: [
      { value: '< 2 hrs', label: 'Average Response Time' },
      { value: '99.9%', label: 'Recovery Success Rate' },
      { value: '24/7', label: 'Availability' },
      { value: '< 4 hrs', label: 'Typical Resolution' },
    ],
    technicalCapabilities: [
      'PostgreSQL PITR recovery and WAL reconstruction',
      'MySQL/MariaDB InnoDB corruption repair',
      'MongoDB replica set recovery and resharding',
      'Kubernetes cluster state restoration and etcd recovery',
      'AWS RDS failover and snapshot restoration',
      'GCP Cloud SQL point-in-time recovery',
      'Azure SQL disaster recovery orchestration',
      'Container runtime debugging (Docker, containerd)',
      'Network partition diagnosis and resolution',
      'Storage system recovery (EBS, Persistent Volumes)',
    ],
    useCases: [
      'Production database corrupted after failed migration',
      'Kubernetes cluster unresponsive after upgrade',
      'Cloud provider outage affecting multi-region deployment',
      'Ransomware attack requiring clean system restoration',
      'Failed deployment causing cascading service failures',
      'DNS misconfiguration causing complete service outage',
    ],
    ctaText: 'Get Emergency Help Now',
    relatedServices: ['disaster-prevention', 'high-availability', 'cloud-migration'],
  },
  {
    id: 'cloud-migration',
    slug: 'cloud-migration',
    title: 'Cloud Migration',
    tagline: 'Move to the cloud without the chaos.',
    headline: 'Migrate Without Downtime or Data Loss',
    description: 'Migrate your workloads to AWS, Azure, or GCP with minimal downtime and zero data loss. We handle the complexity so your team can focus on what matters.',
    longDescription: `Cloud migration doesn't have to mean weeks of downtime and crossed fingers. Our methodology delivers zero-downtime migrations for even the most complex enterprise workloads, with rollback capabilities at every stage.

We've migrated terabyte-scale PostgreSQL databases using logical replication, containerized legacy Java applications without code changes, and orchestrated multi-region failovers that customers never noticed. Our approach prioritizes reversibility - if anything goes wrong, we can roll back in minutes, not hours.

Beyond the technical migration, we optimize for cost from day one. Our clients typically see 30-40% cost reduction compared to lift-and-shift approaches, through right-sizing, reserved capacity planning, and architecture optimization.`,
    features: [
      'Lift-and-shift or re-architecture',
      'Multi-cloud and hybrid strategies',
      'Database migration with zero downtime',
      'Cost optimization from day one',
      'Compliance and security built-in',
    ],
    metrics: [
      { value: '0', label: 'Minutes Downtime Target' },
      { value: '30-40%', label: 'Typical Cost Savings' },
      { value: '100+', label: 'Migrations Completed' },
      { value: '< 6 wks', label: 'Typical Project Duration' },
    ],
    technicalCapabilities: [
      'Zero-downtime PostgreSQL migration using pgloader and logical replication',
      'AWS DMS for heterogeneous database migrations',
      'Terraform state migration and multi-account strategies',
      'Kubernetes workload migration with Velero',
      'VMware to cloud VM conversion (AWS VM Import, Azure Migrate)',
      'S3/GCS/Azure Blob cross-cloud data transfer',
      'Active Directory and IAM federation setup',
      'Network architecture (VPC peering, Transit Gateway, Direct Connect)',
      'Compliance mapping (SOC2, HIPAA, PCI-DSS)',
      'Cost modeling and FinOps implementation',
    ],
    useCases: [
      'Data center lease expiring - need full cloud migration',
      'Scaling beyond on-premise capacity limits',
      'Acquiring company with different cloud provider',
      'Compliance requirements mandating specific regions',
      'Cost optimization through cloud-native services',
      'Disaster recovery requiring geographic distribution',
    ],
    ctaText: 'Plan Your Migration',
    relatedServices: ['infrastructure-modernization', 'high-availability', 'networking'],
  },
  {
    id: 'infrastructure-modernization',
    slug: 'infrastructure-modernization',
    title: 'Infrastructure Modernization',
    tagline: 'Transform legacy into competitive advantage.',
    headline: 'Ship 10x Faster with Modern Infrastructure',
    description: 'Your legacy systems are holding you back. We modernize your infrastructure to be scalable, maintainable, and ready for whatever comes next.',
    longDescription: `Legacy infrastructure isn't just a technical problem - it's a competitive disadvantage. When deployments take days instead of minutes, and scaling means buying more hardware, you're falling behind companies that can iterate in hours.

We specialize in pragmatic modernization that delivers value fast. That might mean containerizing your Java monolith without rewriting it, implementing Kubernetes for the services that need it while keeping stable workloads on VMs, or adding infrastructure-as-code to your existing environment incrementally.

Our approach focuses on reducing risk while accelerating capability. Every modernization project includes comprehensive testing, automated rollback, and knowledge transfer to your team. You'll understand your new infrastructure as well as your old one.`,
    features: [
      'Containerization and Kubernetes',
      'Microservices architecture',
      'Infrastructure as Code',
      'Legacy system integration',
      'Performance optimization',
    ],
    metrics: [
      { value: '10x', label: 'Faster Deployments' },
      { value: '50%', label: 'Infrastructure Cost Reduction' },
      { value: '99.9%', label: 'Uptime Achievement' },
      { value: '< 3 mo', label: 'Time to Production' },
    ],
    technicalCapabilities: [
      'Docker containerization of legacy Java/.NET applications',
      'Kubernetes deployment patterns (Helm, Kustomize, Operators)',
      'Service mesh implementation (Istio, Linkerd, Consul Connect)',
      'Terraform/OpenTofu infrastructure as code',
      'Ansible/Chef/Puppet configuration management modernization',
      'GitOps workflows with ArgoCD and Flux',
      'API gateway implementation (Kong, Ambassador, AWS API Gateway)',
      'Message queue modernization (Kafka, RabbitMQ, SQS)',
      'Observability stack (Prometheus, Grafana, Jaeger, ELK)',
      'Secret management (HashiCorp Vault, AWS Secrets Manager)',
    ],
    useCases: [
      'Monolithic application struggling to scale',
      'Deployment process taking days instead of minutes',
      'Infrastructure knowledge trapped in undocumented scripts',
      'Development and production environments diverging',
      'Difficulty hiring engineers for legacy stack',
      'Compliance requirements for infrastructure auditability',
    ],
    ctaText: 'Modernize Your Stack',
    relatedServices: ['cicd-devops', 'cloud-migration', 'high-availability'],
  },
  {
    id: 'high-availability',
    slug: 'high-availability',
    title: 'High Availability Design',
    tagline: 'Build systems that never go down.',
    headline: 'Achieve 99.99% Uptime Guaranteed',
    description: 'Design and implement fault-tolerant architectures that maintain uptime through any failure. We engineer resilience into every layer of your stack.',
    longDescription: `True high availability isn't about buying redundant hardware - it's about architecting systems that gracefully handle failure at every layer. From network partitions to entire region outages, your systems should keep running without human intervention.

We design HA architectures that have survived AWS region failures, datacenter power outages, and cascading service failures. Our implementations include automated failover that completes in seconds, not minutes, and comprehensive chaos engineering to prove resilience before production.

Beyond the architecture, we implement the operational practices that maintain availability: automated runbooks, escalation procedures, and incident response training. High availability is as much about people and process as it is about technology.`,
    features: [
      'Multi-region deployments',
      'Automatic failover systems',
      'Load balancing and auto-scaling',
      'Chaos engineering and testing',
      'SLA-backed reliability',
    ],
    metrics: [
      { value: '99.99%', label: 'Uptime Target' },
      { value: '< 30 sec', label: 'Failover Time' },
      { value: '0', label: 'Single Points of Failure' },
      { value: '3+', label: 'Availability Zones' },
    ],
    technicalCapabilities: [
      'Multi-region active-active and active-passive architectures',
      'Database replication (PostgreSQL streaming, MySQL Group Replication)',
      'Kubernetes multi-cluster federation',
      'Global load balancing (AWS Global Accelerator, Cloudflare)',
      'Automated failover orchestration with health checks',
      'Chaos engineering (Chaos Monkey, Litmus, Gremlin)',
      'Circuit breaker patterns (Hystrix, resilience4j)',
      'Queue-based load leveling and backpressure',
      'Distributed caching (Redis Cluster, Memcached)',
      'Stateless application design patterns',
    ],
    useCases: [
      'E-commerce platform requiring 24/7 availability',
      'Financial services with strict SLA requirements',
      'Healthcare systems with patient safety implications',
      'SaaS platform with enterprise customer commitments',
      'Real-time systems where seconds of downtime matter',
      'Global services requiring regional failure tolerance',
    ],
    ctaText: 'Design for Resilience',
    relatedServices: ['disaster-prevention', 'emergency-recovery', 'networking'],
  },
  {
    id: 'cicd-devops',
    slug: 'cicd-devops',
    title: 'CI/CD & DevOps',
    tagline: 'Ship faster, break less.',
    headline: 'Deploy Confidently, Multiple Times Per Day',
    description: 'Implement modern CI/CD pipelines and DevOps practices that accelerate your delivery while improving reliability. Automate everything that should be automated.',
    longDescription: `The best engineering teams deploy dozens of times per day with confidence. They're not moving fast and breaking things - they're moving fast because their automation catches problems before production, and their deployments are reversible in seconds.

We build CI/CD pipelines that give your team that confidence. Comprehensive test automation, security scanning, performance testing, and staged rollouts - all automated and integrated into your existing workflow. No more deployment anxiety.

Beyond pipelines, we implement the DevOps practices that multiply engineering velocity: infrastructure as code, GitOps workflows, self-service environments, and comprehensive observability. Your team will ship faster while sleeping better.`,
    features: [
      'Pipeline design and implementation',
      'GitOps and Infrastructure as Code',
      'Automated testing strategies',
      'Deployment automation',
      'Monitoring and observability',
    ],
    metrics: [
      { value: '< 15 min', label: 'Build to Deploy' },
      { value: '50+', label: 'Deploys Per Week' },
      { value: '< 1 hr', label: 'Rollback Time' },
      { value: '95%', label: 'Test Coverage Target' },
    ],
    technicalCapabilities: [
      'GitHub Actions, GitLab CI, Jenkins pipeline design',
      'ArgoCD and Flux GitOps implementation',
      'Terraform/Pulumi infrastructure pipelines',
      'Container image building and scanning (Trivy, Snyk)',
      'Automated testing frameworks (Jest, pytest, Go testing)',
      'Performance testing integration (k6, Gatling, Locust)',
      'Feature flag systems (LaunchDarkly, Flagsmith)',
      'Blue-green and canary deployment patterns',
      'Prometheus/Grafana observability stack',
      'PagerDuty/Opsgenie alerting integration',
    ],
    useCases: [
      'Deployment process requiring manual intervention',
      'Fear of deploying preventing frequent releases',
      'Production bugs that should have been caught earlier',
      'Inconsistent environments causing "works on my machine"',
      'Security vulnerabilities discovered after deployment',
      'Difficulty tracking what\'s deployed where',
    ],
    ctaText: 'Accelerate Delivery',
    relatedServices: ['infrastructure-modernization', 'high-availability', 'disaster-prevention'],
  },
  {
    id: 'networking',
    slug: 'networking',
    title: 'Network Architecture',
    tagline: 'Connect everything, securely.',
    headline: 'Build Networks That Scale and Secure',
    description: 'Design and implement enterprise network architectures that are secure, performant, and ready to scale. From VPCs to global networks.',
    longDescription: `Modern enterprise networks span multiple clouds, data centers, and edge locations. The complexity is immense, but the fundamentals matter more than ever: security, performance, and reliability. We design networks that deliver all three.

Our network architects have designed global infrastructures handling millions of requests per second. We understand the tradeoffs between latency and cost, security and usability, simplicity and flexibility. Every design decision is made with your specific requirements in mind.

From zero-trust network architectures to high-performance CDN deployments, we implement networks that become competitive advantages rather than bottlenecks. And we document everything so your team can operate and evolve the network confidently.`,
    features: [
      'VPC and network design',
      'VPN and private connectivity',
      'DNS and CDN optimization',
      'Network security and firewalls',
      'SD-WAN implementation',
    ],
    metrics: [
      { value: '< 50 ms', label: 'Global Latency Target' },
      { value: '99.99%', label: 'Network Availability' },
      { value: 'Zero Trust', label: 'Security Model' },
      { value: '10 Gbps+', label: 'Throughput Capacity' },
    ],
    technicalCapabilities: [
      'AWS VPC design (Transit Gateway, PrivateLink, VPC Peering)',
      'Azure Virtual Network and ExpressRoute',
      'GCP VPC and Cloud Interconnect',
      'Multi-cloud network architecture',
      'Zero-trust network implementation (BeyondCorp model)',
      'DNS architecture (Route53, Cloud DNS, Cloudflare)',
      'CDN optimization (CloudFront, Fastly, Akamai)',
      'Web Application Firewall configuration',
      'DDoS mitigation strategies',
      'Network observability (VPC Flow Logs, packet capture)',
    ],
    useCases: [
      'Multi-cloud environment requiring unified networking',
      'Hybrid cloud with on-premise data center connectivity',
      'Global application requiring low-latency worldwide',
      'Security audit requiring network architecture review',
      'Scaling beyond current network capacity',
      'Compliance requirements for network segmentation',
    ],
    ctaText: 'Architect Your Network',
    relatedServices: ['high-availability', 'cloud-migration', 'disaster-prevention'],
  },
  {
    id: 'disaster-prevention',
    slug: 'disaster-prevention',
    title: 'Disaster Prevention',
    tagline: 'The best emergency is the one that never happens.',
    headline: 'Eliminate Risks Before They Become Outages',
    description: 'Comprehensive infrastructure audits and hardening to prevent failures before they occur. We identify and eliminate the risks that keep you up at night.',
    longDescription: `Every major outage we've responded to had warning signs that were missed or ignored. Disk space trending toward full, certificates about to expire, backups that hadn't been tested in months. Prevention is always cheaper than recovery.

Our infrastructure audits go deep: we examine your systems, processes, and practices to identify risks before they become incidents. We don't just find problems - we prioritize them by impact and likelihood, and provide concrete remediation plans with effort estimates.

Beyond the audit, we help you build the practices that prevent future disasters: automated monitoring and alerting, regular backup testing, chaos engineering, and incident response planning. Your team will know exactly what to do when something goes wrong.`,
    features: [
      'Infrastructure security audits',
      'Backup and recovery testing',
      'Capacity planning',
      'Runbook development',
      'On-call training for your team',
    ],
    metrics: [
      { value: '90%', label: 'Risk Reduction' },
      { value: '< 2 wks', label: 'Audit Completion' },
      { value: '50+', label: 'Check Points' },
      { value: 'Quarterly', label: 'Review Cadence' },
    ],
    technicalCapabilities: [
      'Infrastructure security scanning (Prowler, ScoutSuite)',
      'Backup verification and recovery testing',
      'Certificate and secret rotation automation',
      'Capacity forecasting and trending analysis',
      'Chaos engineering program implementation',
      'Incident response runbook development',
      'On-call training and tabletop exercises',
      'Monitoring and alerting audit',
      'Compliance gap analysis (SOC2, HIPAA, PCI)',
      'Disaster recovery plan documentation and testing',
    ],
    useCases: [
      'Recent outage prompting infrastructure review',
      'Compliance audit requiring security assessment',
      'Rapid growth outpacing infrastructure planning',
      'Key engineer leaving with critical knowledge',
      'Board/investor requiring risk assessment',
      'Insurance requiring infrastructure documentation',
    ],
    ctaText: 'Prevent Your Next Outage',
    relatedServices: ['emergency-recovery', 'high-availability', 'cicd-devops'],
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug)
}

export function getRelatedServices(service: Service): Service[] {
  return service.relatedServices
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is Service => s !== undefined)
}
