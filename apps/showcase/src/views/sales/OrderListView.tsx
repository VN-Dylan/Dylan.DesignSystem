import { useCallback, useEffect, useMemo, useState, type MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, DataTable, Input, Select } from '@vn-dylan/ui'
import type { ColumnDef, DataTableSort, SelectOption } from '@vn-dylan/ui'
import { Icon, TbIcons } from '@vn-dylan/icons'
import { formatCurrency, formatRelativeTime } from '@vn-dylan/utils'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatusTag } from '@/components/shared/StatusTag'
import { orders, orderTotal, type Order } from '@/mock/sales'
import {
  formatPayment,
  orderStatusOptions,
  orderStatusTone,
  paymentOptions,
} from './salesConstants'

const allStatusOption = { label: 'All statuses', value: 'all' }
const allPaymentOption = { label: 'All payments', value: 'all' }
const statusOptions: SelectOption[] = [allStatusOption, ...orderStatusOptions]
const paymentFilterOptions: SelectOption[] = [allPaymentOption, ...paymentOptions]
const pageSize = 8

const compareOrders = (sort: DataTableSort) => (a: Order, b: Order) => {
  const direction = sort.order === 'desc' ? -1 : 1
  if (sort.key === 'date') return a.date.localeCompare(b.date) * direction
  if (sort.key === 'total') return (orderTotal(a) - orderTotal(b)) * direction
  return 0
}

/** Sales order list with search, status/payment filters and client-side paging. */
export function OrderListView() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<SelectOption>(allStatusOption)
  const [payment, setPayment] = useState<SelectOption>(allPaymentOption)
  const [sort, setSort] = useState<DataTableSort>({ key: '', order: '' })
  const [pageIndex, setPageIndex] = useState(1)

  useEffect(() => {
    setPageIndex(1)
  }, [query, status, payment])

  const filteredOrders = useMemo(() => {
    const lowered = query.trim().toLowerCase()
    return orders.filter((order) => {
      const matchesQuery =
        lowered.length === 0 ||
        order.ref.toLowerCase().includes(lowered) ||
        order.customer.toLowerCase().includes(lowered)
      const matchesStatus = status.value === 'all' || order.status === status.value
      const matchesPayment = payment.value === 'all' || order.payment === payment.value
      return matchesQuery && matchesStatus && matchesPayment
    })
  }, [payment.value, query, status.value])

  const sortedOrders = useMemo(() => {
    if (!sort.key || !sort.order) return filteredOrders
    return [...filteredOrders].sort(compareOrders(sort))
  }, [filteredOrders, sort])

  const pageRows = useMemo(
    () => sortedOrders.slice((pageIndex - 1) * pageSize, pageIndex * pageSize),
    [pageIndex, sortedOrders],
  )

  const columns = useMemo<ColumnDef<Order, unknown>[]>(
    () => [
      {
        accessorKey: 'ref',
        header: 'Order',
        enableSorting: false,
        cell: ({ row }) => <span className="font-medium text-content">{row.original.ref}</span>,
      },
      {
        id: 'customer',
        header: 'Customer',
        enableSorting: false,
        cell: ({ row }) => (
          <div className="min-w-48">
            <p className="font-medium text-content">{row.original.customer}</p>
            <p className="text-xs text-content-muted">{row.original.email}</p>
          </div>
        ),
      },
      {
        accessorKey: 'date',
        header: 'Date',
        cell: ({ row }) => formatRelativeTime(row.original.date),
      },
      {
        id: 'items',
        header: 'Items',
        enableSorting: false,
        cell: ({ row }) => row.original.items.length,
      },
      {
        id: 'total',
        accessorFn: (order) => orderTotal(order),
        header: 'Total',
        cell: ({ row }) => formatCurrency(orderTotal(row.original)),
      },
      {
        accessorKey: 'payment',
        header: 'Payment',
        enableSorting: false,
        cell: ({ row }) => formatPayment(row.original.payment),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        enableSorting: false,
        cell: ({ row }) => (
          <StatusTag tone={orderStatusTone[row.original.status]}>{row.original.status}</StatusTag>
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
      if (target.closest('button,input,select,a,[role="button"]')) return
      const row = target.closest('tbody tr')
      const rowGroup = row?.parentElement
      if (!row || !rowGroup) return
      const index = Array.from(rowGroup.children).indexOf(row)
      const order = pageRows[index]
      if (order) navigate(`/sales/orders/${order.id}`)
    },
    [navigate, pageRows],
  )

  return (
    <div className="space-y-6">
      <PageHeader
        title="Orders"
        description="Review customer orders, payment states and fulfilment readiness."
        actions={
          <Button
            variant="solid"
            icon={<Icon as={TbIcons.TbPlus} size={16} />}
            onClick={() => navigate('/sales/orders/new')}
          >
            New order
          </Button>
        }
      />

      <Card bordered bodyClass="space-y-4 p-4">
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_14rem_14rem]">
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search ref or customer"
            prefix={<Icon as={TbIcons.TbSearch} size={16} />}
            aria-label="Search orders"
          />
          <Select
            options={statusOptions}
            value={status}
            onChange={(option) => setStatus(option ?? allStatusOption)}
            isClearable={false}
            aria-label="Status"
          />
          <Select
            options={paymentFilterOptions}
            value={payment}
            onChange={(option) => setPayment(option ?? allPaymentOption)}
            isClearable={false}
            aria-label="Payment"
          />
        </div>

        <div onClick={handleTableClick}>
          <DataTable<Order>
            columns={columns}
            data={pageRows}
            pagingData={{ pageIndex, pageSize, total: sortedOrders.length }}
            pageSizeOptions={[8, 16, 24]}
            onPaginationChange={setPageIndex}
            onSort={handleSort}
            emptyMessage="No orders match the current filters."
          />
        </div>
      </Card>
    </div>
  )
}
