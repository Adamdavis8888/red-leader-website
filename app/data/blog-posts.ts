export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  author: {
    name: string
    role: string
  }
  publishedAt: string
  category: string
  tags: string[]
  readingTime: string
  seoDescription: string
}

export const blogPosts: BlogPost[] = [
  {
    id: 'kubernetes-3am-crash',
    slug: 'why-your-kubernetes-cluster-crashed-at-3-am-and-how-to-prevent-it',
    title: 'Why Your Kubernetes Cluster Crashed at 3 AM (And How to Prevent It)',
    excerpt: 'That 3 AM PagerDuty alert is never random. After responding to hundreds of Kubernetes emergencies, we\'ve identified the five failure patterns responsible for 80% of cluster outages. Here\'s what they are and how to prevent them.',
    content: `That 3 AM PagerDuty alert is never random. After responding to hundreds of Kubernetes emergencies, we've identified the five failure patterns responsible for 80% of cluster outages.

## The OOMKilled Cascade

The most common cause of midnight cluster failures starts innocently: a single pod exceeds its memory limits and gets OOMKilled. But without proper resource quotas and pod disruption budgets, that single termination triggers a cascade.

Here's what happens: Pod A dies, its traffic redistributes to Pods B and C. They weren't sized to handle the extra load, so they start consuming more memory. Before you know it, you've got a cluster-wide eviction storm.

Prevention starts with honest resource requests. We see teams set requests at 50% of limits "to help the scheduler." Don't do this. Your requests should reflect actual steady-state usage. Run \`kubectl top pods\` during peak hours for a week before setting these values.

Set up namespace resource quotas:

\`\`\`yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: mem-cpu-quota
spec:
  hard:
    requests.memory: 8Gi
    limits.memory: 16Gi
\`\`\`

## etcd Leader Election Storms

When your cluster control plane becomes unresponsive, etcd is usually the culprit. etcd requires a quorum to elect a leader, and if your etcd nodes can't communicate reliably, you get continuous leader elections that make the entire cluster unstable.

The warning signs are subtle: \`kubectl\` commands timing out intermittently, API server returning 503s, pods stuck in Pending for minutes. Check etcd metrics with \`etcdctl endpoint status\` and watch for leader changes.

Common causes include network latency between etcd nodes exceeding 10ms, disk I/O latency on the etcd data directory, and running etcd on nodes with noisy neighbors. etcd needs dedicated fast disks, ideally NVMe SSDs, and network latency under 2ms between members.

Monitor these metrics religiously:
- etcd_server_leader_changes_seen_total
- etcd_disk_wal_fsync_duration_seconds
- etcd_network_peer_round_trip_time_seconds

## The Eviction Threshold Trap

Kubernetes nodes have eviction thresholds that trigger when disk space, memory, or PIDs run low. The default memory.available threshold is 100Mi, which sounds reasonable until you realize a single log-happy application can push a node past this threshold in minutes.

When eviction starts, the kubelet kills pods in priority order. But if your critical pods don't have proper PriorityClasses defined, they might be the first to go.

Configure node-level eviction thresholds appropriately:

\`\`\`
--eviction-hard=memory.available<500Mi,nodefs.available<10%
--eviction-soft=memory.available<1Gi,nodefs.available<15%
--eviction-soft-grace-period=memory.available=2m,nodefs.available=2m
\`\`\`

## DNS Resolution Failures

CoreDNS handles service discovery in Kubernetes. When it fails, nothing works, but the error messages are often misleading. You'll see connection timeouts to services that are actually running fine.

Scale CoreDNS based on cluster size. The rule of thumb is one replica per 1000 pods, but run at least 3 replicas for redundancy. Enable autopath to reduce DNS query load:

\`\`\`yaml
autopath @kubernetes
\`\`\`

Monitor CoreDNS cache hit ratio and response latency. A cache hit ratio below 70% indicates either cache sizing issues or unusual traffic patterns worth investigating.

## Preventing the 3 AM Call

The clusters that don't page us at 3 AM share common characteristics: they have robust monitoring with actionable alerts, resource requests match actual usage, PodDisruptionBudgets prevent cascade failures, and someone reviews cluster metrics weekly.

Set up these minimum alerts:
- Node memory pressure (>80% utilization for 5 minutes)
- Pod restart rate (>3 restarts in 10 minutes)
- etcd leader changes (>1 in 10 minutes)
- API server request latency p99 (>1 second)

The investment in proper cluster hygiene pays off. We've seen teams reduce their incident rate by 90% by implementing these practices consistently.`,
    author: {
      name: 'Marcus Chen',
      role: 'Principal Infrastructure Engineer',
    },
    publishedAt: '2025-01-28',
    category: 'Infrastructure',
    tags: ['kubernetes', 'devops', 'reliability', 'monitoring'],
    readingTime: '8 min read',
    seoDescription: 'Learn the 5 Kubernetes failure patterns responsible for 80% of cluster outages and how to prevent 3 AM incidents with proper resource management and monitoring.',
  },
  {
    id: 'technical-debt-cost',
    slug: 'the-real-cost-of-well-fix-it-later-technical-debt',
    title: 'The Real Cost of "We\'ll Fix It Later" Technical Debt',
    excerpt: 'Technical debt isn\'t just about code quality. After analyzing incident data across 50+ organizations, we found that accumulated infrastructure debt increases mean-time-to-recovery by 340%. Here\'s how to quantify it and make the business case for paying it down.',
    content: `"We'll fix it in the next sprint." Every engineering team says it. But in 15 years of infrastructure consulting, we've never seen "the next sprint" arrive before the outage.

## The Compounding Interest of Technical Debt

Technical debt compounds. That manual deployment process that takes 20 minutes instead of 2 doesn't just cost 18 minutes per deploy. It means fewer deploys, which means larger changesets, which means harder debugging when things break.

We analyzed incident data across 50+ organizations and found a consistent pattern: teams with high technical debt have a mean-time-to-recovery (MTTR) 340% longer than teams who invest in operational excellence.

## Quantifying the Real Cost

Let's put real numbers to a common debt item: lack of proper staging environment.

Without staging, teams deploy changes directly to production with manual verification. When issues occur, there's no isolated environment to reproduce and debug. Average debugging time: 4 hours. With a proper staging environment mirroring production, debugging time drops to 45 minutes.

For a team that deploys 20 times per month with a 10% issue rate, that's 2 incidents. Time saved per month: 6.5 hours of senior engineer time. At fully-loaded cost, that's roughly $1,500/month or $18,000/year, not counting the revenue impact of longer outages.

Now multiply across all the debt items in your backlog:
- Manual database migrations: $12,000/year in engineer time
- Missing runbooks: $8,000/year in extended incident duration
- No centralized logging: $15,000/year in debugging overhead
- Outdated dependencies: $25,000/year in security remediation

A typical startup carries $80,000-150,000 in annual operational costs from technical debt alone.

## The Hidden Costs Nobody Tracks

Beyond direct time costs, technical debt creates hidden drag:

Deployment Fear: When deploys are risky, teams batch changes. Batched changes are harder to debug. Harder debugging extends incidents. Extended incidents create deployment fear. It's a vicious cycle we see constantly.

Onboarding Friction: New engineers take 2-3x longer to become productive when tribal knowledge substitutes for documentation and automation. That $40,000 in additional ramp time per hire adds up.

Alert Fatigue: When monitoring gaps mean real issues hide among false positives, on-call engineers learn to ignore alerts. The next critical incident gets dismissed as another false positive.

## Making the Business Case

Engineering leaders often struggle to justify technical debt reduction to business stakeholders. Here's a framework that works:

First, track your incidents for 30 days. Categorize each by whether technical debt extended the resolution time. Calculate the business impact in downtime minutes multiplied by revenue per minute.

Second, identify the top 3 debt items contributing to incident duration. Estimate resolution cost and ongoing maintenance savings.

Third, present as ROI: "Investing 2 engineering weeks ($15,000) in automated database migrations will reduce incident duration by 60%, saving approximately $45,000 annually in downtime costs."

## A Debt Reduction Strategy That Works

Don't try to pay off all debt at once. Successful teams allocate 20% of engineering capacity to debt reduction, focused on items that appear in incident post-mortems.

Create a "debt registry" tracking:
- What the debt item is
- When it was identified
- How many incidents it's contributed to
- Estimated fix cost vs. ongoing cost

Review monthly, prioritize by incident contribution, and celebrate when items are resolved.

The teams that page us least aren't the ones with the most sophisticated technology. They're the ones who systematically invest in operational fundamentals and resist the "we'll fix it later" temptation.`,
    author: {
      name: 'Jessica Park',
      role: 'Director of Cloud Architecture',
    },
    publishedAt: '2025-01-15',
    category: 'DevOps',
    tags: ['technical-debt', 'engineering-culture', 'reliability', 'business'],
    readingTime: '6 min read',
    seoDescription: 'How to quantify technical debt impact on incident response. Analysis shows infrastructure debt increases MTTR by 340%. Framework for making the business case.',
  },
  {
    id: 'postgresql-zero-downtime',
    slug: 'zero-downtime-postgresql-migrations-a-battle-tested-guide',
    title: 'Zero-Downtime PostgreSQL Migrations: A Battle-Tested Guide',
    excerpt: 'Schema migrations on production databases don\'t have to mean downtime. After performing thousands of live migrations on databases ranging from 50GB to 15TB, here are the patterns that work and the mistakes that will wake you up at 3 AM.',
    content: `"We need to add a column to the users table." This simple request has caused more 3 AM incidents than almost any other database operation. After performing thousands of live PostgreSQL migrations, here's how to do them safely.

## The Naive Approach (And Why It Fails)

The obvious approach is running ALTER TABLE ADD COLUMN. On a small table, this works fine. But on a table with millions of rows, PostgreSQL needs to rewrite the entire table while holding an ACCESS EXCLUSIVE lock. Your application freezes.

Even "safe" operations have gotchas. Adding a column with a DEFAULT requires a table rewrite in PostgreSQL versions before 11. Adding a NOT NULL constraint scans the entire table. Creating an index without CONCURRENTLY locks writes.

## Pattern 1: Expand-Contract Migrations

The expand-contract pattern handles most schema changes safely:

Expand phase: Add the new structure without removing the old one. Both old and new application code can work.

Migrate phase: Backfill data, often in batches to avoid lock contention.

Contract phase: Remove the old structure once all application code has been updated.

For adding a NOT NULL column with a default:

Step 1: Add the column as nullable
\`\`\`sql
ALTER TABLE users ADD COLUMN subscription_tier TEXT;
\`\`\`

Step 2: Backfill in batches
\`\`\`sql
UPDATE users SET subscription_tier = 'free'
WHERE id BETWEEN 1 AND 10000 AND subscription_tier IS NULL;
\`\`\`

Step 3: Add the constraint
\`\`\`sql
ALTER TABLE users ADD CONSTRAINT users_subscription_tier_not_null
CHECK (subscription_tier IS NOT NULL) NOT VALID;

ALTER TABLE users VALIDATE CONSTRAINT users_subscription_tier_not_null;
\`\`\`

The NOT VALID clause adds the constraint without scanning existing rows. VALIDATE scans but only holds a SHARE UPDATE EXCLUSIVE lock, allowing concurrent writes.

## Pattern 2: Logical Replication for Major Changes

For changes that require table rewrites, like changing a column type or restructuring, logical replication provides zero-downtime migration:

Create a new table with the desired schema. Set up logical replication from the old table to the new one with any necessary transformations. Once the new table is caught up, atomically switch application traffic.

\`\`\`sql
-- On target
CREATE SUBSCRIPTION users_migration
CONNECTION 'host=source dbname=prod'
PUBLICATION users_pub;
\`\`\`

The key is ensuring the replication slot doesn't fall behind during cutover. Monitor \`pg_stat_replication\` and keep the cutover window under 100ms of lag.

## Pattern 3: Shadow Tables for Index Changes

Creating indexes on large tables takes time, even with CONCURRENTLY. The shadow table approach creates the index on a copy, then swaps:

\`\`\`sql
-- Create shadow table with new index
CREATE TABLE users_shadow (LIKE users INCLUDING ALL);
CREATE INDEX idx_users_email ON users_shadow(email);

-- Sync data
INSERT INTO users_shadow SELECT * FROM users;

-- Catch up changes (application must be writing to both)
-- Atomic swap
BEGIN;
ALTER TABLE users RENAME TO users_old;
ALTER TABLE users_shadow RENAME TO users;
COMMIT;
\`\`\`

This requires application changes to dual-write during migration, but provides instant cutover.

## Rollback Strategies That Actually Work

Every migration needs a rollback plan tested before execution:

For additive changes (new columns, new tables): Rollback is simply ignoring the new structure. Keep backward-compatible application code deployed.

For destructive changes: Maintain the old structure during a transition period. Use database triggers to keep old columns in sync if needed:

\`\`\`sql
CREATE FUNCTION sync_old_column() RETURNS trigger AS $$
BEGIN
  NEW.old_column = NEW.new_column;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
\`\`\`

For complex migrations: Consider using point-in-time recovery slots as safety nets. Create a replication slot before migration; you can use it to create a replica at any point if rollback is needed.

## Monitoring During Migration

During any migration, monitor:

Lock wait queue: \`SELECT * FROM pg_stat_activity WHERE wait_event_type = 'Lock'\`

Replication lag: \`SELECT slot_name, pg_wal_lsn_diff(pg_current_wal_lsn(), confirmed_flush_lsn) FROM pg_replication_slots\`

Transaction duration: Long-running transactions block VACUUM and can cause table bloat

Connection count: Migrations shouldn't impact your connection pool capacity

## The Migration Checklist

Before any production migration:
- Test on a production-sized dataset (not your 1000-row dev database)
- Measure lock duration and table scan time
- Prepare rollback script and test it
- Schedule during low-traffic period
- Have connection kill scripts ready
- Communicate maintenance window if any risk

The teams that execute migrations confidently have invested in proper staging environments that mirror production scale. That investment pays dividends every time a "simple" schema change is needed.`,
    author: {
      name: 'Marcus Chen',
      role: 'Principal Infrastructure Engineer',
    },
    publishedAt: '2025-01-08',
    category: 'Infrastructure',
    tags: ['postgresql', 'databases', 'migrations', 'reliability'],
    readingTime: '9 min read',
    seoDescription: 'Battle-tested patterns for zero-downtime PostgreSQL schema migrations. Expand-contract, logical replication, and shadow table techniques for production databases.',
  },
]

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getCategories(): string[] {
  return [...new Set(blogPosts.map((post) => post.category))]
}

export function getRecentPosts(count: number): BlogPost[] {
  return [...blogPosts]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, count)
}

export function getRelatedPosts(post: BlogPost): BlogPost[] {
  return blogPosts
    .filter((p) => p.id !== post.id)
    .filter((p) => p.category === post.category || p.tags.some((tag) => post.tags.includes(tag)))
    .slice(0, 2)
}
