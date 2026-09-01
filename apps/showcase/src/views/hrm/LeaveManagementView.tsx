import { useEffect, useMemo, useState } from 'react'
import { Avatar, Button, Card, DataTable, Segment, Select } from '@dylan-ds/ui'
import type { ColumnDef, SelectOption } from '@dylan-ds/ui'
import { Icon, TbIcons } from '@dylan-ds/icons'
import { formatNumber } from '@dylan-ds/utils'
import { KpiCard } from '@/components/shared/KpiCard'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatusTag } from '@/components/shared/StatusTag'
import { getEmployee, leaveKpis, leaves, type Leave, type LeaveStatus } from '@/mock/hrm'
import { leaveStatusTone } from './hrmConstants'

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  })

const allTypeOption = { label: 'All types', value: 'all' }
const typeOptions: SelectOption[] = [
  allTypeOption,
  { label: 'Annual', value: 'annual' },
  { label: 'Sick', value: 'sick' },
  { label: 'Unpaid', value: 'unpaid' },
  { label: 'Parental', value: 'parental' },
]
const defaultPageSize = 8

const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1)

/** Leave request queue with type and approval status filtering. */
export function LeaveManagementView() {
  const [typeFilter, setTypeFilter] = useState<SelectOption>(allTypeOption)
  const [status, setStatus] = useState<LeaveStatus | 'all'>('all')
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(defaultPageSize)

  useEffect(() => {
    setPageIndex(1)
  }, [pageSize, status, typeFilter.value])

  const filteredLeaves = useMemo(
    () =>
      leaves.filter((leave) => {
        const matchesType = typeFilter.value === 'all' || leave.type === typeFilter.value
        const matchesStatus = status === 'all' || leave.status === status
        return matchesType && matchesStatus
      }),
    [status, typeFilter.value],
  )

  const pageRows = useMemo(
    () => filteredLeaves.slice((pageIndex - 1) * pageSize, pageIndex * pageSize),
    [filteredLeaves, pageIndex, pageSize],
  )

  const columns = useMemo<ColumnDef<Leave, unknown>[]>(
    () => [
      {
        id: 'employee',
        header: 'Employee',
        enableSorting: false,
        cell: ({ row }) => {
          const employee = getEmployee(row.original.employeeId)
          return (
            <div className="flex min-w-44 items-center gap-2">
              <Avatar
                size={28}
                shape="circle"
                src={employee?.avatar}
                alt={employee?.name ?? row.original.employeeId}
              />
              <span className="text-sm font-medium text-content">
                {employee?.name ?? row.original.employeeId}
              </span>
            </div>
          )
        },
      },
      {
        accessorKey: 'type',
        header: 'Type',
        enableSorting: false,
        cell: ({ row }) => capitalize(row.original.type),
      },
      {
        id: 'dates',
        header: 'Dates',
        enableSorting: false,
        cell: ({ row }) => `${fmtDate(row.original.from)} – ${fmtDate(row.original.to)}`,
      },
      {
        accessorKey: 'days',
        header: 'Days',
        enableSorting: false,
      },
      {
        accessorKey: 'reason',
        header: 'Reason',
        enableSorting: false,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        enableSorting: false,
        cell: ({ row }) => (
          <StatusTag tone={leaveStatusTone[row.original.status]}>{row.original.status}</StatusTag>
        ),
      },
      {
        id: 'actions',
        header: '',
        enableSorting: false,
        cell: ({ row }) =>
          row.original.status === 'pending' ? (
            <div className="flex gap-2">
              <Button size="xs" disabled>
                Approve
              </Button>
              <Button size="xs" disabled>
                Reject
              </Button>
            </div>
          ) : null,
      },
    ],
    [],
  )

  return (
    <div className="space-y-6">
      <PageHeader
        title="Leave requests"
        description="Review balances, time off requests and approval state."
        actions={
          <Button
            variant="solid"
            icon={<Icon as={TbIcons.TbCalendarPlus} size={16} />}
            onClick={() => undefined}
          >
            Request leave
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Pending" value={formatNumber(leaveKpis.pending, 0)} />
        <KpiCard label="Approved this month" value={formatNumber(leaveKpis.approvedThisMonth, 0)} />
        <KpiCard label="On leave today" value={formatNumber(leaveKpis.onLeaveToday, 0)} />
        <KpiCard label="Avg. balance days" value={formatNumber(leaveKpis.avgBalanceDays, 1)} />
      </div>

      <Card bordered bodyClass="space-y-4 p-4">
        <div className="grid gap-3 lg:grid-cols-[14rem_24rem]">
          <Select
            options={typeOptions}
            value={typeFilter}
            onChange={(option) => setTypeFilter(option ?? allTypeOption)}
            isClearable={false}
            aria-label="Leave type"
          />
          <div className="overflow-x-auto">
            <Segment
              value={status}
              onChange={(value) => setStatus(String(value) as LeaveStatus | 'all')}
              size="sm"
              aria-label="Leave status"
            >
              <Segment.Item value="all">All</Segment.Item>
              <Segment.Item value="pending">Pending</Segment.Item>
              <Segment.Item value="approved">Approved</Segment.Item>
              <Segment.Item value="rejected">Rejected</Segment.Item>
            </Segment>
          </div>
        </div>

        <DataTable<Leave>
          columns={columns}
          data={pageRows}
          pagingData={{ pageIndex, pageSize, total: filteredLeaves.length }}
          pageSizeOptions={[8, 16, 24]}
          onPaginationChange={setPageIndex}
          onPageSizeChange={setPageSize}
          emptyMessage="No leave requests match the current filters."
        />
      </Card>
    </div>
  )
}
