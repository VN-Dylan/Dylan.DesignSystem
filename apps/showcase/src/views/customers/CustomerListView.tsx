import { useCallback, useEffect, useMemo, useState, type MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar, Button, Card, DataTable, Input, Segment } from '@vn-dylan/ui'
import type { ColumnDef, DataTableSort } from '@vn-dylan/ui'
import { Icon, TbIcons } from '@vn-dylan/icons'
import { formatCurrency, formatNumber, formatRelativeTime } from '@vn-dylan/utils'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatusTag } from '@/components/shared/StatusTag'
import { customers, type Customer, type CustomerStatus } from '@/mock/customers'
import { customerStatusTone } from './customersConstants'

const defaultPageSize = 8

const compareCustomers = (sort: DataTableSort) => (a: Customer, b: Customer) => {
  const direction = sort.order === 'desc' ? -1 : 1
  if (sort.key === 'ltv') return (a.ltv - b.ltv) * direction
  if (sort.key === 'orders') return (a.orders - b.orders) * direction
  return 0
}

/** Searchable customer table with account metrics and row-level navigation. */
export function CustomerListView() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<CustomerStatus | 'all'>('all')
  const [sort, setSort] = useState<DataTableSort>({ key: '', order: '' })
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(defaultPageSize)

  useEffect(() => {
    setPageIndex(1)
  }, [pageSize, query, status])

  const filteredCustomers = useMemo(() => {
    const lowered = query.trim().toLowerCase()
    return customers.filter((customer) => {
      const matchesQuery =
        lowered.length === 0 ||
        customer.name.toLowerCase().includes(lowered) ||
        customer.company.toLowerCase().includes(lowered) ||
        customer.email.toLowerCase().includes(lowered)
      const matchesStatus = status === 'all' || customer.status === status
      return matchesQuery && matchesStatus
    })
  }, [query, status])

  const sortedCustomers = useMemo(() => {
    if (!sort.key || !sort.order) return filteredCustomers
    return [...filteredCustomers].sort(compareCustomers(sort))
  }, [filteredCustomers, sort])

  const pageRows = useMemo(
    () => sortedCustomers.slice((pageIndex - 1) * pageSize, pageIndex * pageSize),
    [pageIndex, pageSize, sortedCustomers],
  )

  const columns = useMemo<ColumnDef<Customer, unknown>[]>(
    () => [
      {
        id: 'customer',
        header: 'Customer',
        enableSorting: false,
        cell: ({ row }) => (
          <div className="flex min-w-56 items-center gap-3">
            <Avatar size={32} shape="circle" src={row.original.avatar} alt={row.original.name} />
            <div className="min-w-0">
              <p className="truncate font-medium text-content">{row.original.name}</p>
              <p className="truncate text-xs text-content-muted">{row.original.company}</p>
            </div>
          </div>
        ),
      },
      {
        accessorKey: 'location',
        header: 'Location',
        enableSorting: false,
      },
      {
        accessorKey: 'orders',
        header: 'Orders',
        cell: ({ row }) => formatNumber(row.original.orders, 0),
      },
      {
        accessorKey: 'ltv',
        header: 'LTV',
        cell: ({ row }) => formatCurrency(row.original.ltv),
      },
      {
        accessorKey: 'lastSeen',
        header: 'Last seen',
        enableSorting: false,
        cell: ({ row }) => formatRelativeTime(row.original.lastSeen),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        enableSorting: false,
        cell: ({ row }) => (
          <StatusTag tone={customerStatusTone[row.original.status]}>
            {row.original.status}
          </StatusTag>
        ),
      },
    ],
    [],
  )

  const handleSort = useCallback((nextSort: DataTableSort) => {
    setSort(nextSort)
  }, [])

  const handleTableClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      const target = event.target as HTMLElement
      if (target.closest('button,input,select,a,[role="button"],.dyl-data-table__select-cell')) {
        return
      }
      const row = target.closest('tbody tr')
      const rowGroup = row?.parentElement
      if (!row || !rowGroup) return
      const index = Array.from(rowGroup.children).indexOf(row)
      const customer = pageRows[index]
      if (customer) navigate(`/customers/${customer.id}/overview`)
    },
    [navigate, pageRows],
  )

  return (
    <div className="space-y-6">
      <PageHeader
        title="Customers"
        description="Search accounts by contact, company and lifecycle status."
        actions={
          <Button
            variant="solid"
            icon={<Icon as={TbIcons.TbPlus} size={16} />}
            onClick={() => undefined}
          >
            Add customer
          </Button>
        }
      />

      <Card bordered bodyClass="space-y-4 p-4">
        <div className="grid gap-3 lg:grid-cols-[minmax(16rem,1fr)_24rem]">
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            name="customer-search"
            placeholder="Search name, company or email"
            prefix={<Icon as={TbIcons.TbSearch} size={16} />}
            aria-label="Search customers"
          />
          <div className="overflow-x-auto">
            <Segment
              value={status}
              onChange={(value) => setStatus(String(value) as CustomerStatus | 'all')}
              size="sm"
              aria-label="Customer status"
            >
              <Segment.Item value="all">All</Segment.Item>
              <Segment.Item value="active">Active</Segment.Item>
              <Segment.Item value="inactive">Inactive</Segment.Item>
              <Segment.Item value="churned">Churned</Segment.Item>
            </Segment>
          </div>
        </div>

        <div onClick={handleTableClick}>
          <DataTable<Customer>
            columns={columns}
            data={pageRows}
            pagingData={{ pageIndex, pageSize, total: sortedCustomers.length }}
            pageSizeOptions={[8, 16, 24]}
            onPaginationChange={setPageIndex}
            onPageSizeChange={setPageSize}
            onSort={handleSort}
            emptyMessage="No customers match the current filters."
          />
        </div>
      </Card>
    </div>
  )
}
