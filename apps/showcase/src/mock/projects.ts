/**
 * Mock data for the `projects` showcase area. Static and deterministic.
 */

export type ProjectStatus = 'on-track' | 'at-risk' | 'delayed' | 'completed'
export type TaskStatus = 'backlog' | 'in-progress' | 'review' | 'done'
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent'

export interface TeamMember {
  id: string
  name: string
  avatar: string
  role: string
}

export interface Project {
  id: string
  name: string
  client: string
  status: ProjectStatus
  /** 0–100 */
  progress: number
  start: string
  due: string
  budget: number
  spent: number
  tags: string[]
  team: string[]
  description: string
}

export interface Task {
  id: string
  title: string
  projectId: string
  status: TaskStatus
  priority: TaskPriority
  assignee: string
  due: string
  /** subtasks done / total */
  checklist: [number, number]
  labels: string[]
}

export interface Milestone {
  id: string
  projectId: string
  name: string
  start: string
  end: string
  progress: number
}

export const team: TeamMember[] = [
  { id: 't-01', name: 'Dylan Carter', avatar: 'https://i.pravatar.cc/96?img=12', role: 'Lead' },
  { id: 't-02', name: 'Aisha Rahman', avatar: 'https://i.pravatar.cc/96?img=45', role: 'Design' },
  { id: 't-03', name: 'Ben Ortiz', avatar: 'https://i.pravatar.cc/96?img=15', role: 'Frontend' },
  { id: 't-04', name: 'Chloe Kim', avatar: 'https://i.pravatar.cc/96?img=32', role: 'Backend' },
  { id: 't-05', name: 'Diego Santos', avatar: 'https://i.pravatar.cc/96?img=68', role: 'QA' },
  { id: 't-06', name: 'Emma Novak', avatar: 'https://i.pravatar.cc/96?img=24', role: 'PM' },
]

export const getMember = (id: string) => team.find((m) => m.id === id)

export const projects: Project[] = [
  {
    id: 'pr-01',
    name: 'Helios Design System',
    client: 'Internal',
    status: 'on-track',
    progress: 68,
    start: '2026-06-01',
    due: '2026-10-15',
    budget: 120_000,
    spent: 74_500,
    tags: ['design-system', 'react'],
    team: ['t-01', 't-02', 't-03', 't-05'],
    description: 'Component library, tokens and documentation for the next-generation admin suite.',
  },
  {
    id: 'pr-02',
    name: 'Orbit Mobile App',
    client: 'Northwind Retail',
    status: 'at-risk',
    progress: 41,
    start: '2026-05-12',
    due: '2026-09-20',
    budget: 210_000,
    spent: 158_000,
    tags: ['mobile', 'react-native'],
    team: ['t-01', 't-03', 't-04', 't-06'],
    description: 'Customer-facing loyalty and ordering app for the Northwind retail chain.',
  },
  {
    id: 'pr-03',
    name: 'Ledger Migration',
    client: 'Fintech Cooperative',
    status: 'delayed',
    progress: 27,
    start: '2026-04-01',
    due: '2026-08-30',
    budget: 95_000,
    spent: 61_200,
    tags: ['backend', 'data'],
    team: ['t-04', 't-05'],
    description: 'Migrate the double-entry ledger from the legacy monolith to the new platform.',
  },
  {
    id: 'pr-04',
    name: 'Aurora Marketing Site',
    client: 'Aurora Labs',
    status: 'completed',
    progress: 100,
    start: '2026-02-10',
    due: '2026-05-01',
    budget: 48_000,
    spent: 45_600,
    tags: ['marketing', 'astro'],
    team: ['t-02', 't-03', 't-06'],
    description: 'Product launch site with CMS-driven case studies and a pricing configurator.',
  },
  {
    id: 'pr-05',
    name: 'Insight Analytics Portal',
    client: 'Meridian Health',
    status: 'on-track',
    progress: 55,
    start: '2026-06-20',
    due: '2026-11-30',
    budget: 175_000,
    spent: 88_000,
    tags: ['analytics', 'charts'],
    team: ['t-01', 't-04', 't-05', 't-06'],
    description: 'Self-serve reporting portal with scheduled exports and role-scoped dashboards.',
  },
]

export const getProject = (id: string) => projects.find((p) => p.id === id)

export const tasks: Task[] = [
  {
    id: 'k-01',
    title: 'Audit colour token contrast',
    projectId: 'pr-01',
    status: 'done',
    priority: 'medium',
    assignee: 't-02',
    due: '2026-08-18',
    checklist: [4, 4],
    labels: ['a11y'],
  },
  {
    id: 'k-02',
    title: 'Ship DataTable paging API',
    projectId: 'pr-01',
    status: 'review',
    priority: 'high',
    assignee: 't-03',
    due: '2026-09-02',
    checklist: [3, 5],
    labels: ['component'],
  },
  {
    id: 'k-03',
    title: 'Write theming guide',
    projectId: 'pr-01',
    status: 'in-progress',
    priority: 'low',
    assignee: 't-01',
    due: '2026-09-10',
    checklist: [1, 6],
    labels: ['docs'],
  },
  {
    id: 'k-04',
    title: 'Dark-mode visual regression pass',
    projectId: 'pr-01',
    status: 'backlog',
    priority: 'medium',
    assignee: 't-05',
    due: '2026-09-15',
    checklist: [0, 8],
    labels: ['qa'],
  },
  {
    id: 'k-05',
    title: 'Cart persistence across sessions',
    projectId: 'pr-02',
    status: 'in-progress',
    priority: 'urgent',
    assignee: 't-04',
    due: '2026-08-29',
    checklist: [2, 4],
    labels: ['bug'],
  },
  {
    id: 'k-06',
    title: 'Push-notification opt-in flow',
    projectId: 'pr-02',
    status: 'backlog',
    priority: 'high',
    assignee: 't-03',
    due: '2026-09-05',
    checklist: [0, 3],
    labels: ['feature'],
  },
  {
    id: 'k-07',
    title: 'Reconcile Q2 ledger entries',
    projectId: 'pr-03',
    status: 'in-progress',
    priority: 'urgent',
    assignee: 't-04',
    due: '2026-08-31',
    checklist: [5, 9],
    labels: ['data'],
  },
  {
    id: 'k-08',
    title: 'Cutover runbook',
    projectId: 'pr-03',
    status: 'backlog',
    priority: 'high',
    assignee: 't-05',
    due: '2026-09-08',
    checklist: [0, 5],
    labels: ['ops'],
  },
  {
    id: 'k-09',
    title: 'Pricing configurator polish',
    projectId: 'pr-04',
    status: 'done',
    priority: 'low',
    assignee: 't-03',
    due: '2026-04-24',
    checklist: [3, 3],
    labels: ['feature'],
  },
  {
    id: 'k-10',
    title: 'Scheduled export worker',
    projectId: 'pr-05',
    status: 'in-progress',
    priority: 'high',
    assignee: 't-04',
    due: '2026-09-12',
    checklist: [2, 6],
    labels: ['backend'],
  },
  {
    id: 'k-11',
    title: 'Role-scoped dashboard filters',
    projectId: 'pr-05',
    status: 'review',
    priority: 'medium',
    assignee: 't-01',
    due: '2026-09-06',
    checklist: [4, 4],
    labels: ['feature'],
  },
  {
    id: 'k-12',
    title: 'Onboarding empty states',
    projectId: 'pr-05',
    status: 'backlog',
    priority: 'low',
    assignee: 't-02',
    due: '2026-09-20',
    checklist: [0, 4],
    labels: ['design'],
  },
]

export const getTasksForProject = (projectId: string) =>
  tasks.filter((t) => t.projectId === projectId)

/** Milestones for the timeline / Gantt view. */
export const milestones: Milestone[] = [
  {
    id: 'm-01',
    projectId: 'pr-01',
    name: 'Tokens & theming',
    start: '2026-06-01',
    end: '2026-07-05',
    progress: 100,
  },
  {
    id: 'm-02',
    projectId: 'pr-01',
    name: 'Core components',
    start: '2026-07-01',
    end: '2026-08-20',
    progress: 80,
  },
  {
    id: 'm-03',
    projectId: 'pr-01',
    name: 'Composite components',
    start: '2026-08-10',
    end: '2026-09-25',
    progress: 45,
  },
  {
    id: 'm-04',
    projectId: 'pr-01',
    name: 'Docs & handoff',
    start: '2026-09-15',
    end: '2026-10-15',
    progress: 5,
  },
  {
    id: 'm-05',
    projectId: 'pr-02',
    name: 'Design spike',
    start: '2026-05-12',
    end: '2026-06-15',
    progress: 100,
  },
  {
    id: 'm-06',
    projectId: 'pr-02',
    name: 'Ordering flow',
    start: '2026-06-10',
    end: '2026-08-05',
    progress: 60,
  },
  {
    id: 'm-07',
    projectId: 'pr-02',
    name: 'Loyalty & rewards',
    start: '2026-07-25',
    end: '2026-09-20',
    progress: 20,
  },
]

export const taskStatusColumns: { status: TaskStatus; label: string }[] = [
  { status: 'backlog', label: 'Backlog' },
  { status: 'in-progress', label: 'In progress' },
  { status: 'review', label: 'Review' },
  { status: 'done', label: 'Done' },
]

export const projectKpis = {
  active: 4,
  onTrack: 2,
  atRisk: 1,
  hoursLogged: 1_284,
  budgetUsed: 427_300,
  budgetTotal: 648_000,
  velocity: [18, 22, 19, 27, 24, 31, 28, 34],
}
