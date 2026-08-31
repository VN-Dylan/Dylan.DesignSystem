import { useCallback, useEffect, useMemo, useState } from 'react'
import { Card, DataTable, Input, Select } from '@dylan-ds/ui'
import type { ColumnDef, DataTableSort, SelectOption } from '@dylan-ds/ui'
import { Icon, TbIcons } from '@dylan-ds/icons'
import { formatNumber, formatRelativeTime } from '@dylan-ds/utils'
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
const defaultPageSize = 8

const compareTickets = (sort: DataTableSort) => (a: Ticket, b: Ticket) => {
  const direction = sort.order === 'desc' ? -1 : 1
  if (sort.key === 'created') return a.created.localeCompare(b.created) * direction
  return 0
}

/** Helpdesk ticket queue with KPI summary and multi-field filtering. */
export function HelpdeskView() {
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<SelectOption>(allStatusOption)
  const [priorityFilter, setPriorityFilter] = useState<SelectOption>(allPriorityOption)
  const [categoryFilter, setCategoryFilter] = useState<SelectOption>(allCategoryOption)
  const [sort, setSort] = useState<DataTableSort>({ key: '', order: '' })
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(defaultPageSize)

  useEffect(() => {
    setPageIndex(1)
  }, [categoryFilter.value, pageSize, priorityFilter.value, query, statusFilter.value])

  const filteredTickets = useMemo(() => {
    const lowered = query.trim().toLowerCase()
    return tickets.filter((ticket) => {
      const matchesQuery =
        lowered.length === 0 ||
        ticket.subject.toLowerCase().includes(lowered) ||
        ticket.customer.toLowerCase().includes(lowered)
      const matchesStatus = statusFilter.value === 'all' || ticket.status === statusFilter.value
      const matchesPriority =
        priorityFilter.value === 'all' || ticket.priority === priorityFilter.value
      const matchesCategory =
        categoryFilter.value === 'all' || ticket.category === categoryFilter.value
      return matchesQuery && matchesStatus && matchesPriority && matchesCategory
    })
  }, [categoryFilter.value, priorityFilter.value, query, statusFilter.value])

  const sortedTickets = useMemo(() => {
    if (!sort.key || !sort.order) return filteredTickets
    return [...filteredTickets].sort(compareTickets(sort))
  }, [filteredTickets, sort])

  const pageRows = useMemo(
    () => sortedTickets.slice((pageIndex - 1) * pageSize, pageIndex * pageSize),
    [pageIndex, pageSize, sortedTickets],
  )

  const columns = useMemo<ColumnDef<Ticket, unknown>[]>(
    () => [
      {
        id: 'ticket',
        header: 'Ticket',
        enableSorting: false,
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
        enableSorting: false,
      },
      {
        accessorKey: 'category',
        header: 'Category',
        enableSorting: false,
      },
      {
        accessorKey: 'priority',
        header: 'Priority',
        enableSorting: false,
        cell: ({ row }) => (
          <StatusTag tone={ticketPriorityTone[row.original.priority]}>
            {row.original.priority}
          </StatusTag>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        enableSorting: false,
        cell: ({ row }) => (
          <StatusTag tone={ticketStatusTone[row.original.status]}>{row.original.status}</StatusTag>
        ),
      },
      {
        accessorKey: 'agent',
        header: 'Agent',
        enableSorting: false,
      },
      {
        accessorKey: 'created',
        header: 'Created',
        cell: ({ row }) => formatRelativeTime(row.original.created),
      },
      {
        accessorKey: 'replies',
        header: 'Replies',
        enableSorting: false,
        cell: ({ row }) => formatNumber(row.original.replies, 0),
      },
    ],
    [],
  )

  const handleSort = useCallback((nextSort: DataTableSort) => {
    setSort(nextSort)
  }, [])

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

      <Card bordered bodyClass="space-y-4 p-4">
        <div className="grid gap-3 lg:grid-cols-[minmax(16rem,1fr)_12rem_12rem_14rem]">
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            name="ticket-search"
            placeholder="Search subject or customer"
            prefix={<Icon as={TbIcons.TbSearch} size={16} />}
            aria-label="Search tickets"
          />
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
        </div>

        <DataTable<Ticket>
          columns={columns}
          data={pageRows}
          pagingData={{ pageIndex, pageSize, total: sortedTickets.length }}
          pageSizeOptions={[8, 16, 24]}
          onPaginationChange={setPageIndex}
          onPageSizeChange={setPageSize}
          onSort={handleSort}
          emptyMessage="No tickets match the current filters."
        />
      </Card>
    </div>
  )
}
