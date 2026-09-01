import { useCallback, useEffect, useMemo, useState } from 'react'
import { Card, DataTable, Input, Select } from '@dylan-ds/ui'
import type { ColumnDef, DataTableSort, SelectOption } from '@dylan-ds/ui'
import { Icon, TbIcons } from '@dylan-ds/icons'
import { formatCurrency, formatNumber } from '@dylan-ds/utils'
import { PageHeader } from '@/components/shared/PageHeader'
import { KpiCard } from '@/components/shared/KpiCard'
import { StatusTag } from '@/components/shared/StatusTag'
import {
  activeAccountCount,
  subscriptionKpis,
  subscriptions,
  totalMrr,
  type Subscription,
} from '@/mock/analytics'
import { planTone, subscriptionStatusLabel, subscriptionStatusTone } from './analyticsConstants'

const allPlanOption = { label: 'All plans', value: 'all' }
const allStatusOption = { label: 'All statuses', value: 'all' }
const planOptions: SelectOption[] = [
  allPlanOption,
  { label: 'Free', value: 'Free' },
  { label: 'Pro', value: 'Pro' },
  { label: 'Team', value: 'Team' },
  { label: 'Enterprise', value: 'Enterprise' },
]
const statusOptions: SelectOption[] = [
  allStatusOption,
  { label: 'Active', value: 'active' },
  { label: 'Trialing', value: 'trialing' },
  { label: 'Past due', value: 'past-due' },
  { label: 'Cancelled', value: 'cancelled' },
]
const pageSize = 8

const formatDate = (iso: string) =>
  Number.isNaN(Date.parse(iso))
    ? iso
    : new Date(iso).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        timeZone: 'UTC',
      })

const compareSubscriptions = (sort: DataTableSort) => (a: Subscription, b: Subscription) => {
  const direction = sort.order === 'desc' ? -1 : 1
  if (sort.key === 'mrr') return (a.mrr - b.mrr) * direction
  if (sort.key === 'seats') return (a.seats - b.seats) * direction
  return 0
}

/** Subscription list screen with account search, filters, sorting and client paging. */
export function SubscriptionsView() {
  const [query, setQuery] = useState('')
  const [planFilter, setPlanFilter] = useState<SelectOption>(allPlanOption)
  const [statusFilter, setStatusFilter] = useState<SelectOption>(allStatusOption)
  const [sort, setSort] = useState<DataTableSort>({ key: '', order: '' })
  const [pageIndex, setPageIndex] = useState(1)

  useEffect(() => {
    setPageIndex(1)
  }, [planFilter.value, query, statusFilter.value])

  const filteredSubscriptions = useMemo(() => {
    const lowered = query.trim().toLowerCase()
    return subscriptions.filter((subscription) => {
      const matchesQuery =
        lowered.length === 0 || subscription.account.toLowerCase().includes(lowered)
      const matchesPlan = planFilter.value === 'all' || subscription.plan === planFilter.value
      const matchesStatus =
        statusFilter.value === 'all' || subscription.status === statusFilter.value
      return matchesQuery && matchesPlan && matchesStatus
    })
  }, [planFilter.value, query, statusFilter.value])

  const sortedSubscriptions = useMemo(() => {
    if (!sort.key || !sort.order) return filteredSubscriptions
    return [...filteredSubscriptions].sort(compareSubscriptions(sort))
  }, [filteredSubscriptions, sort])

  const pageRows = useMemo(
    () => sortedSubscriptions.slice((pageIndex - 1) * pageSize, pageIndex * pageSize),
    [pageIndex, sortedSubscriptions],
  )

  const columns = useMemo<ColumnDef<Subscription, unknown>[]>(
    () => [
      {
        accessorKey: 'account',
        header: 'Account',
        enableSorting: false,
        cell: ({ row }) => <span className="font-medium text-content">{row.original.account}</span>,
      },
      {
        accessorKey: 'plan',
        header: 'Plan',
        enableSorting: false,
        cell: ({ row }) => (
          <StatusTag tone={planTone[row.original.plan]}>{row.original.plan}</StatusTag>
        ),
      },
      {
        accessorKey: 'seats',
        header: 'Seats',
        cell: ({ row }) => formatNumber(row.original.seats, 0),
      },
      {
        accessorKey: 'mrr',
        header: 'MRR',
        cell: ({ row }) => formatCurrency(row.original.mrr),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        enableSorting: false,
        cell: ({ row }) => (
          <StatusTag tone={subscriptionStatusTone[row.original.status]}>
            {subscriptionStatusLabel[row.original.status]}
          </StatusTag>
        ),
      },
      {
        accessorKey: 'since',
        header: 'Since',
        enableSorting: false,
        cell: ({ row }) => formatDate(row.original.since),
      },
      {
        accessorKey: 'renews',
        header: 'Renews',
        enableSorting: false,
        cell: ({ row }) => formatDate(row.original.renews),
      },
    ],
    [],
  )

  const handleSort = useCallback((nextSort: DataTableSort) => {
    setSort(nextSort)
  }, [])

  return (
    <div className="space-y-6">
      <PageHeader
        title="Subscriptions"
        description="MRR, plan mix and account subscription status."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="MRR"
          value={formatCurrency(totalMrr)}
          delta={subscriptionKpis.mrrDelta}
          icon={<Icon as={TbIcons.TbCurrencyDollar} size={18} />}
        />
        <KpiCard
          label="Active accounts"
          value={activeAccountCount}
          delta={subscriptionKpis.activeAccountsDelta}
          icon={<Icon as={TbIcons.TbBuildingStore} size={18} />}
        />
        <KpiCard
          label="Churn"
          value={`${subscriptionKpis.churnRate.value}%`}
          delta={subscriptionKpis.churnRate.delta}
          icon={<Icon as={TbIcons.TbRefreshDot} size={18} />}
        />
        <KpiCard
          label="NRR"
          value={`${subscriptionKpis.netRevenueRetention.value}%`}
          delta={subscriptionKpis.netRevenueRetention.delta}
          icon={<Icon as={TbIcons.TbTrendingUp} size={18} />}
        />
      </div>

      <Card bordered bodyClass="space-y-4 p-4">
        <div className="grid gap-3 lg:grid-cols-[minmax(16rem,1fr)_12rem_12rem]">
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search account"
            prefix={<Icon as={TbIcons.TbSearch} size={16} />}
            aria-label="Search subscriptions"
          />
          <Select
            options={planOptions}
            value={planFilter}
            onChange={(option) => setPlanFilter(option ?? allPlanOption)}
            isClearable={false}
            aria-label="Plan"
          />
          <Select
            options={statusOptions}
            value={statusFilter}
            onChange={(option) => setStatusFilter(option ?? allStatusOption)}
            isClearable={false}
            aria-label="Status"
          />
        </div>

        <DataTable<Subscription>
          columns={columns}
          data={pageRows}
          pagingData={{ pageIndex, pageSize, total: sortedSubscriptions.length }}
          pageSizeOptions={[8, 16, 24]}
          onPaginationChange={setPageIndex}
          onSort={handleSort}
          emptyMessage="No subscriptions match the current filters."
        />
      </Card>
    </div>
  )
}
