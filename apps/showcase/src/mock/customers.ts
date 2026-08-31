/**
 * Mock data for the `customers` showcase area. Static and deterministic.
 */

export type CustomerStatus = 'active' | 'inactive' | 'churned'
export type LeadStage = 'new' | 'contacted' | 'qualified' | 'proposal' | 'won' | 'lost'
export type TicketStatus = 'open' | 'pending' | 'resolved'
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent'

export interface Customer {
  id: string
  name: string
  company: string
  email: string
  phone: string
  avatar: string
  location: string
  status: CustomerStatus
  ltv: number
  orders: number
  since: string
  lastSeen: string
}

export interface Lead {
  id: string
  name: string
  company: string
  email: string
  stage: LeadStage
  value: number
  owner: string
  source: 'Website' | 'Referral' | 'Outbound' | 'Event' | 'Partner'
  created: string
  note: string
}

export interface Ticket {
  id: string
  subject: string
  customer: string
  category: 'Billing' | 'Technical' | 'Onboarding' | 'Feature request' | 'Other'
  priority: TicketPriority
  status: TicketStatus
  agent: string
  created: string
  replies: number
}

export const customers: Customer[] = [
  {
    id: 'c-01',
    name: 'Mara Whitfield',
    company: 'Northwind Retail',
    email: 'mara@northwind.example',
    phone: '+1 202 555 0142',
    avatar: 'https://i.pravatar.cc/96?img=47',
    location: 'Chicago, US',
    status: 'active',
    ltv: 48_200,
    orders: 34,
    since: '2024-02-19',
    lastSeen: '2026-08-30',
  },
  {
    id: 'c-02',
    name: 'Devin Alvarez',
    company: 'Cedar & Co',
    email: 'devin@cedar.example',
    phone: '+1 415 555 0177',
    avatar: 'https://i.pravatar.cc/96?img=13',
    location: 'Oakland, US',
    status: 'active',
    ltv: 21_450,
    orders: 18,
    since: '2025-01-08',
    lastSeen: '2026-08-29',
  },
  {
    id: 'c-03',
    name: 'Priya Nair',
    company: 'Bright Studio',
    email: 'priya@bright.example',
    phone: '+44 20 7946 0958',
    avatar: 'https://i.pravatar.cc/96?img=32',
    location: 'London, UK',
    status: 'active',
    ltv: 33_900,
    orders: 27,
    since: '2024-09-30',
    lastSeen: '2026-08-31',
  },
  {
    id: 'c-04',
    name: 'Sam Okafor',
    company: 'Harbor Freight Ltd',
    email: 'sam@harbor.example',
    phone: '+1 713 555 0119',
    avatar: 'https://i.pravatar.cc/96?img=15',
    location: 'Houston, US',
    status: 'inactive',
    ltv: 12_100,
    orders: 9,
    since: '2025-05-12',
    lastSeen: '2026-06-04',
  },
  {
    id: 'c-05',
    name: 'Elise Fontaine',
    company: 'Loop Media',
    email: 'elise@loop.example',
    phone: '+33 1 70 18 99 00',
    avatar: 'https://i.pravatar.cc/96?img=45',
    location: 'Paris, FR',
    status: 'churned',
    ltv: 8_640,
    orders: 6,
    since: '2024-11-02',
    lastSeen: '2026-03-21',
  },
  {
    id: 'c-06',
    name: 'Tobias Lindqvist',
    company: 'Vertex Mobility',
    email: 'tobias@vertex.example',
    phone: '+46 8 5551 2020',
    avatar: 'https://i.pravatar.cc/96?img=52',
    location: 'Stockholm, SE',
    status: 'active',
    ltv: 27_800,
    orders: 22,
    since: '2025-06-18',
    lastSeen: '2026-08-28',
  },
  {
    id: 'c-07',
    name: 'Hannah Cole',
    company: 'Sol & Sand',
    email: 'hannah@solsand.example',
    phone: '+61 2 5550 8080',
    avatar: 'https://i.pravatar.cc/96?img=24',
    location: 'Sydney, AU',
    status: 'active',
    ltv: 15_200,
    orders: 14,
    since: '2026-01-22',
    lastSeen: '2026-08-27',
  },
  {
    id: 'c-08',
    name: 'Marco Bianchi',
    company: 'Aurora Labs',
    email: 'marco@auroralabs.example',
    phone: '+39 06 5555 0303',
    avatar: 'https://i.pravatar.cc/96?img=68',
    location: 'Rome, IT',
    status: 'active',
    ltv: 41_300,
    orders: 31,
    since: '2024-06-05',
    lastSeen: '2026-08-31',
  },
  {
    id: 'c-09',
    name: 'Yuki Tanaka',
    company: 'Meridian Health',
    email: 'yuki@meridian.example',
    phone: '+81 3 5555 4040',
    avatar: 'https://i.pravatar.cc/96?img=41',
    location: 'Tokyo, JP',
    status: 'active',
    ltv: 52_700,
    orders: 39,
    since: '2023-11-20',
    lastSeen: '2026-08-30',
  },
  {
    id: 'c-10',
    name: 'Grace Mensah',
    company: 'Fintech Cooperative',
    email: 'grace@fintechco.example',
    phone: '+233 30 555 5050',
    avatar: 'https://i.pravatar.cc/96?img=20',
    location: 'Accra, GH',
    status: 'inactive',
    ltv: 9_900,
    orders: 7,
    since: '2026-01-14',
    lastSeen: '2026-07-02',
  },
]

export const getCustomer = (id: string) => customers.find((c) => c.id === id)

export const customerKpis = {
  total: { value: 1_284, delta: 4.1 },
  active: { value: 1_046, delta: 3.4 },
  churnRate: { value: 3.2, delta: -0.5 },
  avgLtv: { value: 27_540, delta: 6.8 },
  newThisMonth: [42, 51, 47, 58, 61, 55, 66, 72],
}

export const leads: Lead[] = [
  {
    id: 'l-01',
    name: 'Ana Ruiz',
    company: 'Solstice Design',
    email: 'ana@solstice.example',
    stage: 'qualified',
    value: 18_000,
    owner: 'Emma Novak',
    source: 'Website',
    created: '2026-08-24',
    note: 'Wants a design-system audit + component build.',
  },
  {
    id: 'l-02',
    name: 'Karl Meyer',
    company: 'Northgate Bank',
    email: 'karl@northgate.example',
    stage: 'proposal',
    value: 64_000,
    owner: 'Dylan Carter',
    source: 'Outbound',
    created: '2026-08-12',
    note: 'Proposal sent for internal tooling revamp.',
  },
  {
    id: 'l-03',
    name: 'Lena Park',
    company: 'Wavelength',
    email: 'lena@wavelength.example',
    stage: 'contacted',
    value: 22_500,
    owner: 'Ben Ortiz',
    source: 'Event',
    created: '2026-08-26',
    note: 'Met at ReactConf; following up next week.',
  },
  {
    id: 'l-04',
    name: 'Owen Doyle',
    company: 'Trailhead Outdoors',
    email: 'owen@trailhead.example',
    stage: 'new',
    value: 9_000,
    owner: 'Aisha Rahman',
    source: 'Referral',
    created: '2026-08-30',
    note: 'Referred by Cedar & Co.',
  },
  {
    id: 'l-05',
    name: 'Sofia Rossi',
    company: 'Bianchi Group',
    email: 'sofia@bianchi.example',
    stage: 'won',
    value: 41_000,
    owner: 'Dylan Carter',
    source: 'Partner',
    created: '2026-07-19',
    note: 'Closed — kickoff scheduled.',
  },
  {
    id: 'l-06',
    name: 'Jamal Idris',
    company: 'Cairo Freight',
    email: 'jamal@cairofreight.example',
    stage: 'lost',
    value: 15_000,
    owner: 'Emma Novak',
    source: 'Outbound',
    created: '2026-06-28',
    note: 'Went with an in-house build.',
  },
  {
    id: 'l-07',
    name: 'Petra Novak',
    company: 'Adriatic Media',
    email: 'petra@adriatic.example',
    stage: 'qualified',
    value: 28_000,
    owner: 'Ben Ortiz',
    source: 'Website',
    created: '2026-08-20',
    note: 'Budget confirmed; scoping call booked.',
  },
  {
    id: 'l-08',
    name: 'Marcus Webb',
    company: 'Cobalt Analytics',
    email: 'marcus@cobalt.example',
    stage: 'contacted',
    value: 33_000,
    owner: 'Aisha Rahman',
    source: 'Referral',
    created: '2026-08-18',
    note: 'Interested in the analytics portal template.',
  },
]

export const getLead = (id: string) => leads.find((l) => l.id === id)

export const leadStageOrder: LeadStage[] = [
  'new',
  'contacted',
  'qualified',
  'proposal',
  'won',
  'lost',
]

export const tickets: Ticket[] = [
  {
    id: 't-1001',
    subject: 'Invoice shows wrong tax rate',
    customer: 'Northwind Retail',
    category: 'Billing',
    priority: 'high',
    status: 'open',
    agent: 'Emma Novak',
    created: '2026-08-31',
    replies: 2,
  },
  {
    id: 't-1002',
    subject: 'SSO login redirect loop',
    customer: 'Meridian Health',
    category: 'Technical',
    priority: 'urgent',
    status: 'open',
    agent: 'Ben Ortiz',
    created: '2026-08-31',
    replies: 4,
  },
  {
    id: 't-1003',
    subject: 'How do I export a dashboard?',
    customer: 'Bright Studio',
    category: 'Onboarding',
    priority: 'low',
    status: 'pending',
    agent: 'Aisha Rahman',
    created: '2026-08-30',
    replies: 1,
  },
  {
    id: 't-1004',
    subject: 'Request: dark-mode PDF export',
    customer: 'Aurora Labs',
    category: 'Feature request',
    priority: 'medium',
    status: 'pending',
    agent: 'Dylan Carter',
    created: '2026-08-29',
    replies: 3,
  },
  {
    id: 't-1005',
    subject: 'Seat count not updating',
    customer: 'Vertex Mobility',
    category: 'Billing',
    priority: 'medium',
    status: 'open',
    agent: 'Emma Novak',
    created: '2026-08-28',
    replies: 2,
  },
  {
    id: 't-1006',
    subject: 'API rate limit questions',
    customer: 'Cobalt Analytics',
    category: 'Technical',
    priority: 'low',
    status: 'resolved',
    agent: 'Ben Ortiz',
    created: '2026-08-25',
    replies: 5,
  },
  {
    id: 't-1007',
    subject: 'Cannot invite new members',
    customer: 'Sol & Sand',
    category: 'Technical',
    priority: 'high',
    status: 'open',
    agent: 'Aisha Rahman',
    created: '2026-08-27',
    replies: 1,
  },
  {
    id: 't-1008',
    subject: 'Onboarding call scheduling',
    customer: 'Cedar & Co',
    category: 'Onboarding',
    priority: 'low',
    status: 'resolved',
    agent: 'Dylan Carter',
    created: '2026-08-22',
    replies: 2,
  },
]

export const helpdeskKpis = {
  open: 5,
  pending: 2,
  resolvedToday: 3,
  avgFirstResponse: '1h 12m',
  satisfaction: 94,
}
