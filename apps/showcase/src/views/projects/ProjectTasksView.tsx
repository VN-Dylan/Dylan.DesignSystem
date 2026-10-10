import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Card, Combobox, DataTable, Progress, Select } from '@vn-dylan/ui'
import type { ColumnDef, ComboboxOption, SelectOption } from '@vn-dylan/ui'
import { formatRelativeTime } from '@vn-dylan/utils'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatusTag } from '@/components/shared/StatusTag'
import { getMember, projects, taskStatusColumns, tasks, team, type Task } from '@/mock/projects'
import { taskPriorityTone, taskStatusLabel, taskStatusTone } from './projectsConstants'

const allStatusOption = { label: 'All statuses', value: 'all' }
const allPriorityOption = { label: 'All priorities', value: 'all' }
const statusOptions: SelectOption[] = [
  allStatusOption,
  ...taskStatusColumns.map((column) => ({ label: column.label, value: column.status })),
]
const priorityOptions: SelectOption[] = [
  allPriorityOption,
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
  { label: 'Urgent', value: 'urgent' },
]
const assigneeOptions: ComboboxOption[] = team.map((member) => ({
  value: member.id,
  label: member.name,
  description: member.role,
}))

/** A project groups its tasks; a task is a leaf. Both share the table's columns. */
type Row =
  | {
      kind: 'project'
      id: string
      title: string
      due: string
      checklist: [number, number]
      children: Row[]
    }
  | ({ kind: 'task' } & Task)

const percentOf = ([done, total]: [number, number]) =>
  total ? Math.round((done / total) * 100) : 0

/** Tasks grouped by project in a tree table, with search, filters and assignee picking. */
export function ProjectTasksView() {
  const [statusFilter, setStatusFilter] = useState<SelectOption>(allStatusOption)
  const [priorityFilter, setPriorityFilter] = useState<SelectOption>(allPriorityOption)
  const [assignees, setAssignees] = useState<ComboboxOption[]>([])

  // Select / Combobox filters narrow the tasks; DataTable owns search and sort.
  const rows = useMemo<Row[]>(() => {
    const wanted = new Set(assignees.map((a) => a.value))
    const visible = tasks.filter(
      (task) =>
        (statusFilter.value === 'all' || task.status === statusFilter.value) &&
        (priorityFilter.value === 'all' || task.priority === priorityFilter.value) &&
        (wanted.size === 0 || wanted.has(task.assignee)),
    )
    return projects
      .map((project): Row => {
        const children = visible.filter((t) => t.projectId === project.id)
        const checklist = children.reduce<[number, number]>(
          ([done, total], t) => [done + t.checklist[0], total + t.checklist[1]],
          [0, 0],
        )
        return {
          kind: 'project',
          id: project.id,
          title: project.name,
          due: project.due,
          checklist,
          children: children.map((task) => ({ kind: 'task', ...task })),
        }
      })
      .filter((row) => row.kind === 'project' && row.children.length > 0)
  }, [assignees, priorityFilter.value, statusFilter.value])

  const columns = useMemo<ColumnDef<Row, unknown>[]>(
    () => [
      {
        id: 'title',
        header: 'Task',
        enableHiding: false,
        accessorFn: (row) => row.title,
        cell: ({ row }) => {
          const item = row.original
          if (item.kind === 'project') {
            return (
              <Link
                to={`/projects/${item.id}`}
                className="font-semibold text-content hover:text-primary"
              >
                {item.title}
                <span className="ms-2 text-xs font-normal text-content-muted">
                  {item.children.length} tasks
                </span>
              </Link>
            )
          }
          return (
            <div className="min-w-56 space-y-1">
              <p className="font-medium text-content">{item.title}</p>
              <div className="flex flex-wrap gap-1">
                {item.labels.map((label) => (
                  <span
                    key={label}
                    className="rounded bg-surface-sunken px-2 py-0.5 text-xs font-medium text-content-muted"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          )
        },
      },
      {
        id: 'assignee',
        header: 'Assignee',
        accessorFn: (row) =>
          row.kind === 'task' ? (getMember(row.assignee)?.name ?? row.assignee) : '',
        cell: ({ row }) => {
          const item = row.original
          if (item.kind !== 'task') return null
          const member = getMember(item.assignee)
          return (
            <div className="flex items-center gap-2">
              <Avatar
                size={24}
                shape="circle"
                src={member?.avatar}
                alt={member?.name ?? item.assignee}
              />
              <span className="text-sm text-content">{member?.name ?? item.assignee}</span>
            </div>
          )
        },
      },
      {
        id: 'priority',
        header: 'Priority',
        accessorFn: (row) => (row.kind === 'task' ? row.priority : ''),
        cell: ({ row }) =>
          row.original.kind === 'task' ? (
            <StatusTag tone={taskPriorityTone[row.original.priority]}>
              {row.original.priority}
            </StatusTag>
          ) : null,
      },
      {
        id: 'status',
        header: 'Status',
        accessorFn: (row) => (row.kind === 'task' ? row.status : ''),
        cell: ({ row }) =>
          row.original.kind === 'task' ? (
            <StatusTag tone={taskStatusTone[row.original.status]}>
              {taskStatusLabel[row.original.status]}
            </StatusTag>
          ) : null,
      },
      {
        id: 'due',
        header: 'Due',
        accessorFn: (row) => row.due,
        cell: ({ row }) => formatRelativeTime(row.original.due),
      },
      {
        id: 'checklist',
        header: 'Checklist',
        accessorFn: (row) => percentOf(row.checklist),
        cell: ({ row }) => (
          <div className="w-28 space-y-1">
            <span className="text-xs text-content-muted">
              {row.original.checklist[0]} / {row.original.checklist[1]}
            </span>
            <Progress percent={percentOf(row.original.checklist)} size="sm" showInfo={false} />
          </div>
        ),
      },
    ],
    [],
  )

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tasks"
        description="Delivery work grouped by project — search, filter and triage."
      />

      <Card bordered>
        <DataTable<Row>
          columns={columns}
          data={rows}
          getRowId={(row) => row.id}
          getSubRows={(row) => (row.kind === 'project' ? row.children : undefined)}
          initialState={{ expanded: true, columnPinning: { left: ['title'] } }}
          searchable
          searchPlaceholder="Search tasks"
          filters={
            <>
              <Combobox
                multiple
                maxTags={2}
                aria-label="Assignees"
                placeholder="Assignees"
                options={assigneeOptions}
                value={assignees}
                onChange={setAssignees}
              />
              <Select
                options={statusOptions}
                value={statusFilter}
                onChange={(option) => setStatusFilter(option ?? allStatusOption)}
                isClearable={false}
                aria-label="Status"
              />
              <Select
                options={priorityOptions}
                value={priorityFilter}
                onChange={(option) => setPriorityFilter(option ?? allPriorityOption)}
                isClearable={false}
                aria-label="Priority"
              />
            </>
          }
          emptyMessage="No tasks match the current filters."
        />
      </Card>
    </div>
  )
}
