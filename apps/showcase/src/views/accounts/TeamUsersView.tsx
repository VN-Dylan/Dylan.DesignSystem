import { useCallback, useEffect, useMemo, useState } from 'react'
import { Avatar, Button, Card, DataTable, Dialog, Input, Select } from '@dylan-ds/ui'
import type { ColumnDef, DataTableSort, SelectOption } from '@dylan-ds/ui'
import { Icon, TbIcons } from '@dylan-ds/icons'
import { formatRelativeTime } from '@dylan-ds/utils'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatusTag } from '@/components/shared/StatusTag'
import { billingSummary, teamMembers, type TeamMember } from '@/mock/account'
import { teamStatusTone } from './accountConstants'

const allRoleOption = { label: 'All roles', value: 'all' }
const roleOptions: SelectOption[] = [
  allRoleOption,
  { label: 'Owner', value: 'Owner' },
  { label: 'Admin', value: 'Admin' },
  { label: 'Member', value: 'Member' },
  { label: 'Support', value: 'Support' },
  { label: 'Billing', value: 'Billing' },
]
const inviteRoleOptions = roleOptions.filter((option) => option.value !== 'all')
const pageSize = 8

const formatLastActive = (value: string) =>
  value === '\u2014' ? '\u2014' : formatRelativeTime(value)

const compareMembers = (sort: DataTableSort) => (a: TeamMember, b: TeamMember) => {
  const direction = sort.order === 'desc' ? -1 : 1
  if (sort.key === 'name') return a.name.localeCompare(b.name) * direction
  if (sort.key === 'role') return a.role.localeCompare(b.role) * direction
  return 0
}

/** Team member administration screen with filters, paging and invite dialog. */
export function TeamUsersView() {
  const [query, setQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState<SelectOption>(allRoleOption)
  const [sort, setSort] = useState<DataTableSort>({ key: '', order: '' })
  const [pageIndex, setPageIndex] = useState(1)
  const [inviteOpen, setInviteOpen] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState<SelectOption>(inviteRoleOptions[2]!)

  useEffect(() => {
    setPageIndex(1)
  }, [query, roleFilter.value])

  const filteredMembers = useMemo(() => {
    const lowered = query.trim().toLowerCase()
    return teamMembers.filter((member) => {
      const matchesQuery =
        lowered.length === 0 ||
        member.name.toLowerCase().includes(lowered) ||
        member.email.toLowerCase().includes(lowered)
      const matchesRole = roleFilter.value === 'all' || member.role === roleFilter.value
      return matchesQuery && matchesRole
    })
  }, [query, roleFilter.value])

  const sortedMembers = useMemo(() => {
    if (!sort.key || !sort.order) return filteredMembers
    return [...filteredMembers].sort(compareMembers(sort))
  }, [filteredMembers, sort])

  const pageRows = useMemo(
    () => sortedMembers.slice((pageIndex - 1) * pageSize, pageIndex * pageSize),
    [pageIndex, sortedMembers],
  )

  const columns = useMemo<ColumnDef<TeamMember, unknown>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Member',
        cell: ({ row }) => (
          <div className="flex min-w-60 items-center gap-3">
            <Avatar size="sm" shape="circle" src={row.original.avatar} alt={row.original.name} />
            <div>
              <p className="font-medium text-content">{row.original.name}</p>
              <p className="text-xs text-content-muted">{row.original.email}</p>
            </div>
          </div>
        ),
      },
      {
        accessorKey: 'role',
        header: 'Role',
        cell: ({ row }) => <StatusTag tone="neutral">{row.original.role}</StatusTag>,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        enableSorting: false,
        cell: ({ row }) => (
          <StatusTag tone={teamStatusTone[row.original.status]}>{row.original.status}</StatusTag>
        ),
      },
      {
        accessorKey: 'lastActive',
        header: 'Last active',
        enableSorting: false,
        cell: ({ row }) => formatLastActive(row.original.lastActive),
      },
      {
        id: 'actions',
        header: 'Actions',
        enableSorting: false,
        cell: ({ row }) => (
          <Button size="xs" disabled={row.original.role === 'Owner'}>
            Remove
          </Button>
        ),
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
        title="Team members"
        description="Manage seats, roles and workspace access."
        actions={
          <Button
            variant="solid"
            icon={<Icon as={TbIcons.TbUserPlus} size={16} />}
            onClick={() => setInviteOpen(true)}
          >
            Invite member
          </Button>
        }
      />

      <Card bordered bodyClass="space-y-4 p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="lg:w-72">
            <Input
              name="team-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search name or email"
              prefix={<Icon as={TbIcons.TbSearch} size={16} />}
              aria-label="Search team members"
            />
          </div>
          <div className="lg:w-48">
            <Select
              options={roleOptions}
              value={roleFilter}
              onChange={(option) => setRoleFilter(option ?? allRoleOption)}
              isClearable={false}
              aria-label="Role"
            />
          </div>
          <p className="text-sm text-content-muted lg:ml-auto">
            {billingSummary.seatsUsed} of {billingSummary.seats} seats used on {billingSummary.plan}
          </p>
        </div>

        <DataTable<TeamMember>
          columns={columns}
          data={pageRows}
          pagingData={{ pageIndex, pageSize, total: sortedMembers.length }}
          pageSizeOptions={[8, 16, 24]}
          onPaginationChange={setPageIndex}
          onSort={handleSort}
          emptyMessage="No team members match the current filters."
        />
      </Card>

      <Dialog
        isOpen={inviteOpen}
        onClose={() => setInviteOpen(false)}
        aria-labelledby="invite-title"
      >
        <h2 id="invite-title" className="text-lg font-semibold text-content">
          Invite member
        </h2>
        <div className="mt-4 space-y-4">
          <label className="block space-y-1.5">
            <span className="text-sm font-medium text-content">Email</span>
            <Input
              name="invite-email"
              type="email"
              value={inviteEmail}
              onChange={(event) => setInviteEmail(event.target.value)}
              placeholder="name@company.com"
            />
          </label>
          <label className="block space-y-1.5">
            <span className="text-sm font-medium text-content">Role</span>
            <Select
              options={inviteRoleOptions}
              value={inviteRole}
              onChange={(option) => setInviteRole(option ?? inviteRoleOptions[2]!)}
              isClearable={false}
              aria-label="Invite role"
            />
          </label>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <Button onClick={() => setInviteOpen(false)}>Cancel</Button>
          <Button variant="solid" disabled icon={<Icon as={TbIcons.TbSend} size={16} />}>
            Send invite
          </Button>
        </div>
      </Dialog>
    </div>
  )
}
