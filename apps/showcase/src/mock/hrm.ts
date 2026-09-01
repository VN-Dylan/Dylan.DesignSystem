/**
 * Mock data for the `hrm` showcase area. Static and deterministic.
 */

import { personFields } from './team'

export type EmployeeStatus = 'active' | 'on-leave' | 'probation' | 'notice'
export type LeaveType = 'annual' | 'sick' | 'unpaid' | 'parental'
export type LeaveStatus = 'pending' | 'approved' | 'rejected'
export type AttendanceState = 'present' | 'remote' | 'leave' | 'absent'

export interface Employee {
  id: string
  name: string
  avatar: string
  role: string
  department: 'Engineering' | 'Design' | 'Product' | 'Sales' | 'Support' | 'People'
  email: string
  location: string
  status: EmployeeStatus
  joined: string
  salary: number
  manager: string
}

export const employees: Employee[] = [
  {
    id: 'e-01',
    ...personFields('dylan-carter'),
    role: 'Engineering Lead',
    department: 'Engineering',
    location: 'Remote',
    status: 'active',
    joined: '2023-04-03',
    salary: 168_000,
    manager: 'Emma Novak',
  },
  {
    id: 'e-02',
    ...personFields('aisha-rahman'),
    role: 'Senior Product Designer',
    department: 'Design',
    location: 'London, UK',
    status: 'active',
    joined: '2023-07-17',
    salary: 122_000,
    manager: 'Emma Novak',
  },
  {
    id: 'e-03',
    ...personFields('ben-ortiz'),
    role: 'Frontend Engineer',
    department: 'Engineering',
    location: 'Austin, US',
    status: 'active',
    joined: '2024-01-22',
    salary: 138_000,
    manager: 'Dylan Carter',
  },
  {
    id: 'e-04',
    ...personFields('chloe-kim'),
    role: 'Backend Engineer',
    department: 'Engineering',
    location: 'Seoul, KR',
    status: 'on-leave',
    joined: '2024-03-11',
    salary: 141_000,
    manager: 'Dylan Carter',
  },
  {
    id: 'e-05',
    ...personFields('diego-santos'),
    role: 'QA Engineer',
    department: 'Engineering',
    location: 'São Paulo, BR',
    status: 'active',
    joined: '2024-09-02',
    salary: 96_000,
    manager: 'Dylan Carter',
  },
  {
    id: 'e-06',
    ...personFields('emma-novak'),
    role: 'Head of Product',
    department: 'Product',
    location: 'Remote',
    status: 'active',
    joined: '2022-11-14',
    salary: 190_000,
    manager: '—',
  },
  {
    id: 'e-07',
    ...personFields('farid-haddad'),
    role: 'Account Executive',
    department: 'Sales',
    location: 'Dubai, AE',
    status: 'active',
    joined: '2025-02-03',
    salary: 88_000,
    manager: 'Emma Novak',
  },
  {
    id: 'e-08',
    ...personFields('grace-mensah'),
    role: 'Support Specialist',
    department: 'Support',
    location: 'Accra, GH',
    status: 'probation',
    joined: '2026-07-01',
    salary: 62_000,
    manager: 'Emma Novak',
  },
  {
    id: 'e-09',
    ...personFields('henrik-alvan'),
    role: 'People Operations',
    department: 'People',
    location: 'Stockholm, SE',
    status: 'active',
    joined: '2024-05-20',
    salary: 104_000,
    manager: 'Emma Novak',
  },
  {
    id: 'e-10',
    ...personFields('ivy-chen'),
    role: 'Product Designer',
    department: 'Design',
    location: 'Vancouver, CA',
    status: 'notice',
    joined: '2024-08-08',
    salary: 108_000,
    manager: 'Aisha Rahman',
  },
]

export const getEmployee = (id: string) => employees.find((e) => e.id === id)

export const hrmKpis = {
  headcount: { value: 42, delta: 2 },
  onboarding: { value: 3, delta: 1 },
  attrition: { value: 6.1, delta: -0.8 },
  openRoles: { value: 5, delta: 0 },
  headcountTrend: [34, 35, 36, 38, 39, 40, 41, 42],
}

export const headcountByDept = [
  { label: 'Engineering', value: 18 },
  { label: 'Design', value: 6 },
  { label: 'Product', value: 4 },
  { label: 'Sales', value: 7 },
  { label: 'Support', value: 5 },
  { label: 'People', value: 2 },
]

/** This week's attendance grid — one row per employee, Mon–Fri. */
export const attendanceWeek = {
  days: ['Mon 25', 'Tue 26', 'Wed 27', 'Thu 28', 'Fri 29'],
  rows: [
    {
      employeeId: 'e-01',
      states: ['remote', 'remote', 'present', 'present', 'remote'] as AttendanceState[],
    },
    {
      employeeId: 'e-02',
      states: ['present', 'present', 'present', 'leave', 'leave'] as AttendanceState[],
    },
    {
      employeeId: 'e-03',
      states: ['present', 'present', 'present', 'present', 'present'] as AttendanceState[],
    },
    {
      employeeId: 'e-04',
      states: ['leave', 'leave', 'leave', 'leave', 'leave'] as AttendanceState[],
    },
    {
      employeeId: 'e-05',
      states: ['remote', 'remote', 'remote', 'remote', 'remote'] as AttendanceState[],
    },
    {
      employeeId: 'e-06',
      states: ['present', 'remote', 'present', 'present', 'remote'] as AttendanceState[],
    },
    {
      employeeId: 'e-07',
      states: ['present', 'present', 'absent', 'present', 'present'] as AttendanceState[],
    },
  ],
}

export const attendanceSummary = {
  presentToday: 31,
  remoteToday: 7,
  onLeaveToday: 3,
  absentToday: 1,
}

export interface PayrollRun {
  id: string
  period: string
  payDate: string
  gross: number
  deductions: number
  net: number
  headcount: number
  status: 'paid' | 'processing' | 'draft'
}

export const payrollRuns: PayrollRun[] = [
  {
    id: 'pr-2608',
    period: 'August 2026',
    payDate: '2026-08-28',
    gross: 486_200,
    deductions: 128_400,
    net: 357_800,
    headcount: 42,
    status: 'paid',
  },
  {
    id: 'pr-2607',
    period: 'July 2026',
    payDate: '2026-07-29',
    gross: 472_900,
    deductions: 124_100,
    net: 348_800,
    headcount: 41,
    status: 'paid',
  },
  {
    id: 'pr-2606',
    period: 'June 2026',
    payDate: '2026-06-27',
    gross: 461_500,
    deductions: 121_700,
    net: 339_800,
    headcount: 40,
    status: 'paid',
  },
  {
    id: 'pr-2609',
    period: 'September 2026',
    payDate: '2026-09-28',
    gross: 491_000,
    deductions: 129_900,
    net: 361_100,
    headcount: 42,
    status: 'draft',
  },
]

export const payrollKpis = {
  monthlyNet: 357_800,
  monthlyGross: 486_200,
  avgSalary: 115_780,
  nextRun: '2026-09-28',
}

export interface Leave {
  id: string
  employeeId: string
  type: LeaveType
  from: string
  to: string
  days: number
  status: LeaveStatus
  reason: string
}

export const leaves: Leave[] = [
  {
    id: 'lv-01',
    employeeId: 'e-04',
    type: 'parental',
    from: '2026-08-01',
    to: '2026-10-24',
    days: 60,
    status: 'approved',
    reason: 'Parental leave',
  },
  {
    id: 'lv-02',
    employeeId: 'e-02',
    type: 'annual',
    from: '2026-08-28',
    to: '2026-09-04',
    days: 6,
    status: 'approved',
    reason: 'Family holiday',
  },
  {
    id: 'lv-03',
    employeeId: 'e-07',
    type: 'sick',
    from: '2026-08-27',
    to: '2026-08-27',
    days: 1,
    status: 'approved',
    reason: 'Unwell',
  },
  {
    id: 'lv-04',
    employeeId: 'e-03',
    type: 'annual',
    from: '2026-09-14',
    to: '2026-09-18',
    days: 5,
    status: 'pending',
    reason: 'Trip',
  },
  {
    id: 'lv-05',
    employeeId: 'e-05',
    type: 'unpaid',
    from: '2026-10-05',
    to: '2026-10-09',
    days: 5,
    status: 'pending',
    reason: 'Personal',
  },
  {
    id: 'lv-06',
    employeeId: 'e-08',
    type: 'sick',
    from: '2026-08-19',
    to: '2026-08-20',
    days: 2,
    status: 'rejected',
    reason: 'No certificate provided',
  },
]

export const leaveKpis = {
  pending: 2,
  approvedThisMonth: 3,
  onLeaveToday: 3,
  avgBalanceDays: 14.5,
}

export interface Announcement {
  id: string
  title: string
  body: string
  author: string
  date: string
  pinned: boolean
  tag: 'Company' | 'Policy' | 'Event' | 'Recognition'
}

export const announcements: Announcement[] = [
  {
    id: 'a-01',
    title: 'Q4 planning kickoff — Sept 8',
    body: 'All-hands planning session for Q4. Team leads to bring draft OKRs; async doc goes out Friday.',
    author: 'Emma Novak',
    date: '2026-08-31',
    pinned: true,
    tag: 'Company',
  },
  {
    id: 'a-02',
    title: 'Updated remote-work stipend',
    body: 'The home-office stipend increases to $120/month from September. Submit receipts as usual in the expenses tool.',
    author: 'Henrik Alván',
    date: '2026-08-27',
    pinned: true,
    tag: 'Policy',
  },
  {
    id: 'a-03',
    title: 'Welcome Grace Mensah',
    body: 'Grace joins the Support team this week from Accra. Say hi in #introductions.',
    author: 'Henrik Alván',
    date: '2026-07-01',
    pinned: false,
    tag: 'Recognition',
  },
  {
    id: 'a-04',
    title: 'Summer offsite recap',
    body: 'Photos and notes from the Lisbon offsite are in the shared drive. Thanks to everyone who organised.',
    author: 'Emma Novak',
    date: '2026-06-30',
    pinned: false,
    tag: 'Event',
  },
  {
    id: 'a-05',
    title: 'Security training due Sept 15',
    body: 'Annual security-awareness module is now assigned. It takes ~25 minutes; completion is mandatory.',
    author: 'Henrik Alván',
    date: '2026-08-20',
    pinned: false,
    tag: 'Policy',
  },
]
