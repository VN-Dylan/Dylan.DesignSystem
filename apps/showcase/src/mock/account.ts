/**
 * Mock data for the `accounts` showcase area. Static and deterministic.
 */

import { person, personFields } from './team'

export const profile = {
  ...personFields('dylan-carter'),
  title: person('dylan-carter').title,
  phone: '+1 202 555 0142',
  timezone: 'America/New_York',
  language: 'English (US)',
  location: 'Remote — US East',
  bio: 'Building the Dylan Design System. Interested in tokens, accessibility and making component APIs boring in the best way.',
}

export const notificationPrefs = [
  {
    id: 'product',
    label: 'Product updates',
    description: 'New features and changelog highlights.',
    email: true,
    push: false,
  },
  {
    id: 'security',
    label: 'Security alerts',
    description: 'Sign-ins from new devices, password changes.',
    email: true,
    push: true,
  },
  {
    id: 'billing',
    label: 'Billing',
    description: 'Invoices, payment failures, plan changes.',
    email: true,
    push: false,
  },
  {
    id: 'mentions',
    label: 'Mentions & comments',
    description: 'When someone @mentions you.',
    email: false,
    push: true,
  },
]

export type ActivityType = 'auth' | 'billing' | 'settings' | 'content' | 'team'

export interface ActivityEntry {
  id: string
  type: ActivityType
  action: string
  detail: string
  at: string
  ip: string
  device: string
}

export const activity: ActivityEntry[] = [
  {
    id: 'ac-01',
    type: 'auth',
    action: 'Signed in',
    detail: 'Password + authenticator app',
    at: '2026-08-31T08:41:00Z',
    ip: '203.0.113.24',
    device: 'Chrome · macOS',
  },
  {
    id: 'ac-02',
    type: 'settings',
    action: 'Updated profile',
    detail: 'Changed display name',
    at: '2026-08-30T16:12:00Z',
    ip: '203.0.113.24',
    device: 'Chrome · macOS',
  },
  {
    id: 'ac-03',
    type: 'billing',
    action: 'Downloaded invoice',
    detail: 'INV-2026-0008',
    at: '2026-08-28T10:03:00Z',
    ip: '198.51.100.7',
    device: 'Safari · iOS',
  },
  {
    id: 'ac-04',
    type: 'team',
    action: 'Invited a member',
    detail: 'grace@dylan-ds.dev — role: Support',
    at: '2026-08-27T13:20:00Z',
    ip: '203.0.113.24',
    device: 'Chrome · macOS',
  },
  {
    id: 'ac-05',
    type: 'content',
    action: 'Published a draft',
    detail: '“Announcing the Dylan Design System”',
    at: '2026-08-26T09:55:00Z',
    ip: '203.0.113.24',
    device: 'Chrome · macOS',
  },
  {
    id: 'ac-06',
    type: 'auth',
    action: 'New device authorised',
    detail: 'iPhone 16',
    at: '2026-08-24T19:31:00Z',
    ip: '198.51.100.7',
    device: 'Safari · iOS',
  },
  {
    id: 'ac-07',
    type: 'settings',
    action: 'Enabled 2FA',
    detail: 'Authenticator app',
    at: '2026-08-20T11:07:00Z',
    ip: '203.0.113.24',
    device: 'Chrome · macOS',
  },
]

export const referral = {
  code: 'DYLAN-DS-2026',
  link: 'https://dylan-ds.dev/r/DYLAN-DS-2026',
  invited: 18,
  signedUp: 11,
  converted: 6,
  creditEarned: 540,
  creditPending: 180,
}

export interface Referee {
  id: string
  name: string
  email: string
  status: 'invited' | 'signed-up' | 'converted'
  reward: number
  date: string
}

export const referees: Referee[] = [
  {
    id: 'rf-01',
    name: 'Karl Meyer',
    email: 'karl@northgate.example',
    status: 'converted',
    reward: 90,
    date: '2026-08-14',
  },
  {
    id: 'rf-02',
    name: 'Lena Park',
    email: 'lena@wavelength.example',
    status: 'signed-up',
    reward: 0,
    date: '2026-08-20',
  },
  {
    id: 'rf-03',
    name: 'Owen Doyle',
    email: 'owen@trailhead.example',
    status: 'invited',
    reward: 0,
    date: '2026-08-29',
  },
  {
    id: 'rf-04',
    name: 'Sofia Rossi',
    email: 'sofia@bianchi.example',
    status: 'converted',
    reward: 90,
    date: '2026-07-30',
  },
  {
    id: 'rf-05',
    name: 'Petra Novak',
    email: 'petra@adriatic.example',
    status: 'signed-up',
    reward: 0,
    date: '2026-08-18',
  },
]

export interface Plan {
  id: 'free' | 'pro' | 'team' | 'enterprise'
  name: string
  price: number
  cadence: 'mo'
  tagline: string
  features: string[]
  current?: boolean
  highlighted?: boolean
}

export const plans: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    cadence: 'mo',
    tagline: 'For trying things out.',
    features: ['1 workspace', '2 seats', 'Community support', '7-day history'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 25,
    cadence: 'mo',
    tagline: 'For individuals shipping regularly.',
    features: ['3 workspaces', '5 seats', 'Email support', '90-day history', 'Custom themes'],
    current: true,
  },
  {
    id: 'team',
    name: 'Team',
    price: 40,
    cadence: 'mo',
    tagline: 'For teams that need control.',
    features: ['Unlimited workspaces', '25 seats', 'Priority support', 'SAML SSO', 'Audit log'],
    highlighted: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 0,
    cadence: 'mo',
    tagline: 'For organisations at scale.',
    features: [
      'Everything in Team',
      'Unlimited seats',
      'Dedicated support',
      'DPA & security review',
      'Custom contract',
    ],
  },
]

export interface InvoiceLine {
  description: string
  qty: number
  unit: number
}

export interface Invoice {
  id: string
  number: string
  status: 'paid' | 'due' | 'void'
  issued: string
  due: string
  billTo: string
  lines: InvoiceLine[]
}

export const invoices: Invoice[] = [
  {
    id: 'inv-08',
    number: 'INV-2026-0008',
    status: 'paid',
    issued: '2026-08-01',
    due: '2026-08-15',
    billTo: 'Dylan Carter · Pro plan',
    lines: [
      { description: 'Pro plan — August 2026', qty: 5, unit: 25 },
      { description: 'Additional history retention', qty: 1, unit: 10 },
    ],
  },
  {
    id: 'inv-09',
    number: 'INV-2026-0009',
    status: 'due',
    issued: '2026-09-01',
    due: '2026-09-15',
    billTo: 'Dylan Carter · Pro plan',
    lines: [{ description: 'Pro plan — September 2026', qty: 5, unit: 25 }],
  },
  {
    id: 'inv-07',
    number: 'INV-2026-0007',
    status: 'paid',
    issued: '2026-07-01',
    due: '2026-07-15',
    billTo: 'Dylan Carter · Pro plan',
    lines: [{ description: 'Pro plan — July 2026', qty: 4, unit: 25 }],
  },
]

export const getInvoice = (id: string) => invoices.find((i) => i.id === id)

export const invoiceTotal = (inv: Invoice) => {
  const subtotal = inv.lines.reduce((sum, l) => sum + l.qty * l.unit, 0)
  const tax = Math.round(subtotal * 0.1)
  return { subtotal, tax, total: subtotal + tax }
}

export type TeamRole = 'Owner' | 'Admin' | 'Member' | 'Support' | 'Billing'

export interface TeamMember {
  id: string
  name: string
  email: string
  avatar: string
  role: TeamRole
  status: 'active' | 'invited' | 'suspended'
  lastActive: string
}

export const teamMembers: TeamMember[] = [
  {
    id: 'u-01',
    ...personFields('dylan-carter'),
    role: 'Owner',
    status: 'active',
    lastActive: '2026-08-31T08:41:00Z',
  },
  {
    id: 'u-02',
    ...personFields('emma-novak'),
    role: 'Admin',
    status: 'active',
    lastActive: '2026-08-31T07:55:00Z',
  },
  {
    id: 'u-03',
    ...personFields('aisha-rahman'),
    role: 'Member',
    status: 'active',
    lastActive: '2026-08-30T18:22:00Z',
  },
  {
    id: 'u-04',
    ...personFields('ben-ortiz'),
    role: 'Member',
    status: 'active',
    lastActive: '2026-08-30T21:40:00Z',
  },
  {
    id: 'u-05',
    ...personFields('henrik-alvan'),
    role: 'Billing',
    status: 'active',
    lastActive: '2026-08-29T09:12:00Z',
  },
  {
    id: 'u-06',
    ...personFields('grace-mensah'),
    role: 'Support',
    status: 'invited',
    lastActive: '—',
  },
]

export const billingSummary = {
  plan: 'Pro',
  seats: 5,
  seatsUsed: 5,
  renews: '2026-09-15',
  amountDue: 137,
  method: 'Visa ·· 4242',
}
