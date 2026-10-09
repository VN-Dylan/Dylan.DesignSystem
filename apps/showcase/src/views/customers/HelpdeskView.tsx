import { useMemo, useState } from 'react'
import { Card, DataTable, Select } from '@vn-dylan/ui'
import type { ColumnDef, SelectOption } from '@vn-dylan/ui'
import { formatNumber, formatRelativeTime } from '@vn-dylan/utils'
import { KpiCard } from '@/components/shared/KpiCard'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatusTag } from '@/components/shared/StatusTag'
import { helpdeskKpis, tickets, type Ticket } from '@/mock/customers'
import { ticketPriorityTone, ticketStatusTone } from './customersConstants'

const allStatusOption = { label: 'All statuses', value: 'all' }
const allPriorityOption = { label: 'All priorities', value: 'all' }
const allCategoryOption = { label: 'All categories', value: 'all' }
const statusOptions: SelectOption[] = [
  allStatusOption,
  { label: 'Open', value: 'open' },
  { label: 'Pending', value: 'pending' },
  { label: 'Resolved', value: 'resolved' },
]
const priorityOptions: SelectOption[] = [
  allPriorityOption,
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
  { label: 'Urgent', value: 'urgent' },
]
const categoryOptions: SelectOption[] = [
  allCategoryOption,
  ...Array.from(new Set(tickets.map((ticket) => ticket.category))).map((category) => ({
    label: category,
    value: category,
  })),
]
const pageSizeOptions = [8, 16, 24]

/** Helpdesk ticket queue with KPI summary, search, filters, sorting and column layout. */
export function HelpdeskView() {
  const [statusFilter, setStatusFilter] = useState<SelectOption>(allStatusOption)
  const [priorityFilter, setPriorityFilter] = useState<SelectOption>(allPriorityOption)
  const [categoryFilter, setCategoryFilter] = useState<SelectOption>(allCategoryOption)

  // Select filters narrow the data; DataTable owns search, sort and paging.
  const filteredTickets = useMemo(
    () =>
      tickets.filter(
        (ticket) =>
          (statusFilter.value === 'all' || ticket.status === statusFilter.value) &&
          (priorityFilter.value === 'all' || ticket.priority === priorityFilter.value) &&
          (categoryFilter.value === 'all' || ticket.category === categoryFilter.value),
      ),
    [categoryFilter.value, priorityFilter.value, statusFilter.value],
  )

  const columns = useMemo<ColumnDef<Ticket, unknown>[]>(
    () => [
      {
        id: 'ticket',
        header: 'Ticket',
        accessorFn: (ticket) => `${ticket.subject} ${ticket.id}`,
        enableHiding: false,
        cell: ({ row }) => (
          <div className="min-w-64">
            <p className="font-medium text-content">{row.original.subject}</p>
            <p className="text-xs text-content-muted">{row.original.id}</p>
          </div>
        ),
      },
      {
        accessorKey: 'customer',
        header: 'Customer',
      },
      {
        accessorKey: 'category',
        header: 'Category',
      },
      {
        accessorKey: 'priority',
        header: 'Priority',
        cell: ({ row }) => (
          <StatusTag tone={ticketPriorityTone[row.original.priority]}>
            {row.original.priority}
          </StatusTag>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => (
          <StatusTag tone={ticketStatusTone[row.original.status]}>{row.original.status}</StatusTag>
        ),
      },
      {
        accessorKey: 'agent',
        header: 'Agent',
      },
      {
        accessorKey: 'created',
        header: 'Created',
        cell: ({ row }) => formatRelativeTime(row.original.created),
      },
      {
        accessorKey: 'replies',
        header: 'Replies',
        cell: ({ row }) => formatNumber(row.original.replies, 0),
      },
    ],
    [],
  )

  return (
    <div className="space-y-6">
      <PageHeader title="Helpdesk" description="Support volume, ownership and SLA triage." />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <KpiCard label="Open" value={formatNumber(helpdeskKpis.open, 0)} />
        <KpiCard label="Pending" value={formatNumber(helpdeskKpis.pending, 0)} />
        <KpiCard label="Resolved today" value={formatNumber(helpdeskKpis.resolvedToday, 0)} />
        <KpiCard label="Avg. first response" value={helpdeskKpis.avgFirstResponse} />
        <KpiCard label="Satisfaction" value={`${helpdeskKpis.satisfaction}%`} />
      </div>

      <Card bordered>
        <DataTable<Ticket>
          columns={columns}
          data={filteredTickets}
          searchable
          searchPlaceholder="Search tickets"
          filters={
            <>
              <Select
                options={statusOptions}
                value={statusFilter}
                onChange={(option) => setStatusFilter(option ?? allStatusOption)}
                isClearable={false}
                aria-label="Ticket status"
              />
              <Select
                options={priorityOptions}
                value={priorityFilter}
                onChange={(option) => setPriorityFilter(option ?? allPriorityOption)}
                isClearable={false}
                aria-label="Ticket priority"
              />
              <Select
                options={categoryOptions}
                value={categoryFilter}
                onChange={(option) => setCategoryFilter(option ?? allCategoryOption)}
                isClearable={false}
                aria-label="Ticket category"
              />
            </>
          }
          pagination
          pageSizeOptions={pageSizeOptions}
          initialState={{
            sorting: { key: 'created', order: 'desc' },
            columnPinning: { left: ['ticket'] },
          }}
          emptyMessage="No tickets match the current filters."
        />
      </Card>
    </div>
  )
}
