import type { Meta, StoryObj } from '@storybook/react'
import { useMemo, useState } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { Button } from '../Button'
import { Select, type SelectOption } from '../Select'
import { DataTable } from './DataTable'

const meta = {
  title: 'Data Display/DataTable',
  component: DataTable,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  // Tables live on a card surface in real screens — mirror the showcase.
  decorators: [
    (Story) => (
      <div className="rounded-lg border border-border bg-surface p-card">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DataTable>

export default meta
type Story = StoryObj<typeof meta>

/* ------------------------------------------------------------ ticket data */

type Priority = 'low' | 'medium' | 'high' | 'urgent'
type Status = 'open' | 'pending' | 'resolved'

interface Ticket {
  id: string
  subject: string
  customer: string
  category: string
  priority: Priority
  status: Status
  agent: string
  created: string
  replies: number
}

const subjects = [
  'Invoice shows wrong tax rate',
  'SSO login redirect loop',
  'How do I export a dashboard?',
  'Request: dark-mode PDF export',
  'Seat count not updating',
  'API rate limit questions',
  'Cannot invite new members',
  'Onboarding call scheduling',
]
const customers = ['Northwind Retail', 'Meridian Health', 'Bright Studio', 'Aurora Labs']
const categories = ['Billing', 'Technical', 'Onboarding', 'Feature request']
const priorities: Priority[] = ['high', 'urgent', 'low', 'medium']
const statuses: Status[] = ['open', 'open', 'pending', 'resolved']
const agents = ['Emma Novak', 'Ben Ortiz', 'Aisha Rahman', 'Dylan Carter']

// Deterministic data so visual snapshots stay stable.
const TICKETS: Ticket[] = Array.from({ length: 26 }, (_, i) => ({
  id: `t-${1001 + i}`,
  subject: subjects[i % subjects.length]!,
  customer: customers[(i * 3) % customers.length]!,
  category: categories[(i * 5) % categories.length]!,
  priority: priorities[(i * 7) % priorities.length]!,
  status: statuses[(i * 3) % statuses.length]!,
  agent: agents[(i * 2 + (i > 12 ? 1 : 0)) % agents.length]!,
  created: `2026-09-${String(28 - (i % 27)).padStart(2, '0')}`,
  replies: (i * 7) % 9,
}))

const pill = 'inline-flex rounded px-2 py-0.5 text-xs font-medium capitalize'

const priorityTone: Record<Priority, string> = {
  low: 'bg-surface-sunken text-content-muted',
  medium: 'bg-info-subtle text-info',
  high: 'bg-warning-subtle text-warning',
  urgent: 'bg-error-subtle text-error',
}
const statusTone: Record<Status, string> = {
  open: 'bg-warning-subtle text-warning',
  pending: 'bg-info-subtle text-info',
  resolved: 'bg-success-subtle text-success',
}

const ticketColumns: ColumnDef<Ticket, unknown>[] = [
  {
    id: 'ticket',
    header: 'Ticket',
    accessorFn: (t) => `${t.subject} ${t.id}`,
    enableHiding: false,
    cell: ({ row }) => (
      <div className="min-w-56">
        <p className="font-medium text-content">{row.original.subject}</p>
        <p className="text-xs text-content-muted">{row.original.id}</p>
      </div>
    ),
  },
  { accessorKey: 'customer', header: 'Customer' },
  { accessorKey: 'category', header: 'Category' },
  {
    accessorKey: 'priority',
    header: 'Priority',
    cell: ({ row }) => (
      <span className={`${pill} ${priorityTone[row.original.priority]}`}>
        {row.original.priority}
      </span>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <span className={`${pill} ${statusTone[row.original.status]}`}>{row.original.status}</span>
    ),
  },
  { accessorKey: 'agent', header: 'Agent' },
  { accessorKey: 'created', header: 'Created' },
  { accessorKey: 'replies', header: 'Replies' },
]

const option = (value: string, label = value): SelectOption => ({ value, label })
const ALL_STATUS = option('all', 'All statuses')
const ALL_PRIORITY = option('all', 'All priorities')

/**
 * The full grid: search + filters in the toolbar, sortable headers, column
 * menu (⋮ — pin / move / hide), drag-to-reorder headers, a Columns menu, and
 * the range summary with rows-per-page + pagination at the end of the footer.
 */
export const TicketQueue: Story = {
  render: () => {
    const Demo = () => {
      const [status, setStatus] = useState<SelectOption>(ALL_STATUS)
      const [priority, setPriority] = useState<SelectOption>(ALL_PRIORITY)
      const rows = useMemo(
        () =>
          TICKETS.filter(
            (t) =>
              (status.value === 'all' || t.status === status.value) &&
              (priority.value === 'all' || t.priority === priority.value),
          ),
        [status.value, priority.value],
      )
      return (
        <DataTable<Ticket>
          columns={ticketColumns}
          data={rows}
          searchable
          searchPlaceholder="Search tickets"
          filters={
            <>
              <Select
                aria-label="Status"
                isClearable={false}
                value={status}
                onChange={(o) => setStatus(o ?? ALL_STATUS)}
                options={[
                  ALL_STATUS,
                  option('open', 'Open'),
                  option('pending', 'Pending'),
                  option('resolved', 'Resolved'),
                ]}
              />
              <Select
                aria-label="Priority"
                isClearable={false}
                value={priority}
                onChange={(o) => setPriority(o ?? ALL_PRIORITY)}
                options={[
                  ALL_PRIORITY,
                  ...priorities.map((p) => option(p, p[0]!.toUpperCase() + p.slice(1))),
                ]}
              />
            </>
          }
          toolbarEnd={<Button>Export</Button>}
          pagination
          pageSizeOptions={[8, 16, 24]}
          initialState={{ columnPinning: { left: ['ticket'] } }}
          emptyMessage="No tickets match the current filters."
        />
      )
    }
    return <Demo />
  },
}

/** Pinned start + end columns stay put while the middle scrolls horizontally. */
export const PinnedColumns: Story = {
  render: () => (
    <div className="max-w-3xl">
      <DataTable<Ticket>
        columns={ticketColumns}
        data={TICKETS.slice(0, 6)}
        selectable
        initialState={{ columnPinning: { left: ['ticket'], right: ['replies'] } }}
      />
    </div>
  ),
}

/** `compact`: tighter header and rows for dense data or inline editors. */
export const Compact: Story = {
  render: () => (
    <DataTable<Ticket>
      columns={ticketColumns}
      data={TICKETS}
      compact
      searchable
      pagination
      pageSizeOptions={[5, 10]}
      initialState={{ pageSize: 5 }}
    />
  ),
}

/** Start from a saved layout: custom order, a hidden column and a default sort. */
export const SavedLayout: Story = {
  render: () => (
    <DataTable<Ticket>
      columns={ticketColumns}
      data={TICKETS}
      pagination
      pageSizeOptions={[5, 10]}
      initialState={{
        columnOrder: [
          'ticket',
          'status',
          'priority',
          'agent',
          'customer',
          'category',
          'created',
          'replies',
        ],
        columnVisibility: { category: false },
        sorting: { key: 'replies', order: 'desc' },
      }}
    />
  ),
}

/* ------------------------------------------------------- server-side mode */

interface Person {
  firstName: string
  lastName: string
  age: number
  visits: number
}

const ALL: Person[] = Array.from({ length: 47 }, (_, i) => ({
  firstName: ['Ada', 'Grace', 'Alan', 'Edsger', 'Barbara'][i % 5]!,
  lastName: ['Lovelace', 'Hopper', 'Turing', 'Dijkstra', 'Liskov'][i % 5]!,
  age: 20 + (i % 40),
  visits: (i * 7) % 100,
}))

const columns: ColumnDef<Person, unknown>[] = [
  { accessorKey: 'firstName', header: 'First name' },
  { accessorKey: 'lastName', header: 'Last name' },
  { accessorKey: 'age', header: 'Age' },
  { accessorKey: 'visits', header: 'Visits' },
]

/** Server mode: the parent slices pages and handles sort; DataTable only reports. */
export const ServerPaginated: Story = {
  render: () => {
    const Demo = () => {
      const [pageIndex, setPageIndex] = useState(1)
      const [pageSize, setPageSize] = useState(10)
      const [selected, setSelected] = useState<Person[]>([])
      const page = useMemo(
        () => ALL.slice((pageIndex - 1) * pageSize, pageIndex * pageSize),
        [pageIndex, pageSize],
      )
      return (
        <div className="space-y-2">
          <DataTable
            columns={columns}
            data={page}
            selectable
            onSelectChange={setSelected}
            pagingData={{ pageIndex, pageSize, total: ALL.length }}
            onPaginationChange={setPageIndex}
            onPageSizeChange={(s) => {
              setPageSize(s)
              setPageIndex(1)
            }}
          />
          <p className="text-xs text-content-muted">{selected.length} selected</p>
        </div>
      )
    }
    return <Demo />
  },
}

export const Loading: Story = {
  args: { columns, data: [], loading: true },
}

/* -------------------------------------------------------------- tree mode */

interface Unit {
  id: string
  name: string
  owner: string
  headcount: number
  budget: number
  children?: Unit[]
}

const ORG: Unit[] = [
  {
    id: 'eng',
    name: 'Engineering',
    owner: 'Emma Novak',
    headcount: 42,
    budget: 3_200_000,
    children: [
      {
        id: 'eng-platform',
        name: 'Platform',
        owner: 'Ben Ortiz',
        headcount: 18,
        budget: 1_400_000,
        children: [
          {
            id: 'eng-platform-infra',
            name: 'Infrastructure',
            owner: 'Aisha Rahman',
            headcount: 8,
            budget: 700_000,
          },
          {
            id: 'eng-platform-data',
            name: 'Data',
            owner: 'Dylan Carter',
            headcount: 10,
            budget: 700_000,
          },
        ],
      },
      {
        id: 'eng-product',
        name: 'Product engineering',
        owner: 'Grace Lin',
        headcount: 24,
        budget: 1_800_000,
      },
    ],
  },
  {
    id: 'design',
    name: 'Design',
    owner: 'Lena Fischer',
    headcount: 9,
    budget: 640_000,
    children: [
      { id: 'design-brand', name: 'Brand', owner: 'Omar Haddad', headcount: 4, budget: 280_000 },
      {
        id: 'design-product',
        name: 'Product design',
        owner: 'Mia Tanaka',
        headcount: 5,
        budget: 360_000,
      },
    ],
  },
  { id: 'ops', name: 'Operations', owner: 'Sam Rivera', headcount: 7, budget: 410_000 },
]

const money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const orgColumns: ColumnDef<Unit, unknown>[] = [
  { accessorKey: 'name', header: 'Team', enableHiding: false },
  { accessorKey: 'owner', header: 'Owner' },
  { accessorKey: 'headcount', header: 'Headcount' },
  {
    accessorKey: 'budget',
    header: 'Budget',
    cell: ({ getValue }) => money.format(getValue() as number),
  },
]

/**
 * Tree mode (`getSubRows`): expand per row or from the header, search keeps a
 * match's ancestors and opens their branches, sorting applies per level, and
 * selecting a parent selects its children.
 */
export const TreeData: Story = {
  render: () => (
    <DataTable<Unit>
      columns={orgColumns}
      data={ORG}
      getRowId={(u) => u.id}
      getSubRows={(u) => u.children}
      searchable
      searchPlaceholder="Search teams or owners"
      selectable
      initialState={{ expanded: { eng: true } }}
    />
  ),
}
