/**
 * Mock data for the `analytics` showcase area. Static and deterministic.
 */

export const months = [
  'Sep',
  'Oct',
  'Nov',
  'Dec',
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
]

export const analyticsKpis = {
  visitors: { value: 486_200, delta: 8.3, spark: [38, 41, 39, 44, 47, 45, 49, 52] },
  pageviews: { value: 1_942_800, delta: 5.1, spark: [150, 158, 149, 162, 171, 168, 179, 184] },
  bounceRate: { value: 42.6, delta: -1.8, spark: [46, 45.4, 44.8, 44.1, 43.5, 43, 42.6] },
  avgSession: { value: '3m 48s', delta: 4.2, spark: [190, 198, 205, 212, 220, 224, 228] },
}

/** Sessions by acquisition channel, last 12 months. */
export const channels = [
  { name: 'Organic search', data: [42, 46, 44, 51, 58, 55, 61, 64, 68, 71, 74, 79] },
  { name: 'Direct', data: [28, 30, 29, 33, 35, 34, 37, 39, 41, 42, 44, 46] },
  { name: 'Referral', data: [12, 13, 14, 15, 16, 15, 17, 18, 19, 19, 20, 21] },
  { name: 'Social', data: [8, 9, 9, 11, 12, 13, 13, 14, 15, 16, 17, 18] },
]

export const deviceSplit = [
  { label: 'Desktop', value: 52 },
  { label: 'Mobile', value: 39 },
  { label: 'Tablet', value: 9 },
]

export const topPages = [
  { path: '/', title: 'Home', views: 284_120, avgTime: '2m 10s', bounce: 38 },
  { path: '/pricing', title: 'Pricing', views: 148_900, avgTime: '3m 42s', bounce: 31 },
  {
    path: '/blog/design-tokens',
    title: 'Design tokens guide',
    views: 96_540,
    avgTime: '5m 08s',
    bounce: 22,
  },
  {
    path: '/docs/getting-started',
    title: 'Getting started',
    views: 74_310,
    avgTime: '4m 27s',
    bounce: 26,
  },
  { path: '/changelog', title: 'Changelog', views: 51_770, avgTime: '1m 56s', bounce: 45 },
]

export const countries = [
  { code: 'US', name: 'United States', sessions: 182_400 },
  { code: 'GB', name: 'United Kingdom', sessions: 61_200 },
  { code: 'DE', name: 'Germany', sessions: 48_900 },
  { code: 'IN', name: 'India', sessions: 44_100 },
  { code: 'CA', name: 'Canada', sessions: 31_500 },
  { code: 'AU', name: 'Australia', sessions: 22_700 },
  { code: 'BR', name: 'Brazil', sessions: 19_800 },
  { code: 'FR', name: 'France', sessions: 18_400 },
]

/** Revenue actuals + a forward forecast band. */
export const revenueSeries = {
  actual: [182, 201, 234, 288, 196, 214, 243, 268, 291, 305, 322, 358],
  forecast: [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    322,
    358,
    372,
    389,
    405,
    418,
  ],
  lower: [null, null, null, null, null, null, null, null, null, null, 322, 358, 360, 366, 372, 379],
  upper: [null, null, null, null, null, null, null, null, null, null, 322, 358, 384, 412, 438, 457],
  labels: [...months, 'Sep', 'Oct', 'Nov', 'Dec'],
}

export type Plan = 'Free' | 'Pro' | 'Team' | 'Enterprise'

export interface Subscription {
  id: string
  account: string
  plan: Plan
  seats: number
  mrr: number
  status: 'active' | 'trialing' | 'past-due' | 'cancelled'
  since: string
  renews: string
}

export const subscriptions: Subscription[] = [
  {
    id: 's-01',
    account: 'Northwind Retail',
    plan: 'Enterprise',
    seats: 120,
    mrr: 4800,
    status: 'active',
    since: '2025-03-11',
    renews: '2026-09-11',
  },
  {
    id: 's-02',
    account: 'Aurora Labs',
    plan: 'Team',
    seats: 24,
    mrr: 960,
    status: 'active',
    since: '2025-08-02',
    renews: '2026-09-02',
  },
  {
    id: 's-03',
    account: 'Meridian Health',
    plan: 'Enterprise',
    seats: 210,
    mrr: 7350,
    status: 'active',
    since: '2024-11-20',
    renews: '2026-11-20',
  },
  {
    id: 's-04',
    account: 'Fintech Cooperative',
    plan: 'Pro',
    seats: 8,
    mrr: 200,
    status: 'past-due',
    since: '2026-01-14',
    renews: '2026-09-14',
  },
  {
    id: 's-05',
    account: 'Bright Studio',
    plan: 'Pro',
    seats: 5,
    mrr: 125,
    status: 'trialing',
    since: '2026-08-19',
    renews: '2026-09-02',
  },
  {
    id: 's-06',
    account: 'Cedar & Co',
    plan: 'Team',
    seats: 18,
    mrr: 720,
    status: 'active',
    since: '2025-12-05',
    renews: '2026-09-05',
  },
  {
    id: 's-07',
    account: 'Vertex Mobility',
    plan: 'Team',
    seats: 32,
    mrr: 1280,
    status: 'active',
    since: '2025-06-30',
    renews: '2026-09-30',
  },
  {
    id: 's-08',
    account: 'Loop Media',
    plan: 'Pro',
    seats: 6,
    mrr: 150,
    status: 'cancelled',
    since: '2025-09-10',
    renews: '2026-08-10',
  },
  {
    id: 's-09',
    account: 'Harbor Freight Ltd',
    plan: 'Enterprise',
    seats: 95,
    mrr: 3800,
    status: 'active',
    since: '2025-02-01',
    renews: '2026-10-01',
  },
  {
    id: 's-10',
    account: 'Sol & Sand',
    plan: 'Free',
    seats: 3,
    mrr: 0,
    status: 'active',
    since: '2026-07-22',
    renews: '—',
  },
]

export const subscriptionKpis = {
  mrr: { value: 21_338, delta: 6.7 },
  activeAccounts: { value: 8, delta: 2 },
  churnRate: { value: 2.4, delta: -0.3 },
  netRevenueRetention: { value: 112, delta: 3 },
}

/** Saved analytics reports. */
export const reports = [
  {
    id: 'r-01',
    name: 'Weekly acquisition summary',
    owner: 'Emma Novak',
    schedule: 'Every Monday 08:00',
    format: 'PDF',
    lastRun: '2026-08-31',
  },
  {
    id: 'r-02',
    name: 'Funnel drop-off (checkout)',
    owner: 'Ben Ortiz',
    schedule: 'Manual',
    format: 'CSV',
    lastRun: '2026-08-27',
  },
  {
    id: 'r-03',
    name: 'Cohort retention — 2026 H1',
    owner: 'Dylan Carter',
    schedule: 'First of month',
    format: 'XLSX',
    lastRun: '2026-08-01',
  },
  {
    id: 'r-04',
    name: 'Top content by engagement',
    owner: 'Aisha Rahman',
    schedule: 'Every Friday 17:00',
    format: 'PDF',
    lastRun: '2026-08-29',
  },
  {
    id: 'r-05',
    name: 'Revenue vs forecast',
    owner: 'Emma Novak',
    schedule: 'Daily 06:00',
    format: 'CSV',
    lastRun: '2026-08-31',
  },
]
