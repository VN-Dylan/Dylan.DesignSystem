import { useCallback, useEffect, useMemo, useState, type MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar, Card, DataTable, Input, Progress, Select } from '@vn-dylan/ui'
import type { ColumnDef, DataTableSort, SelectOption } from '@vn-dylan/ui'
import { Icon, TbIcons } from '@vn-dylan/icons'
import { formatRelativeTime } from '@vn-dylan/utils'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatusTag } from '@/components/shared/StatusTag'
import {
  getMember,
  getProject,
  projects,
  tasks,
  taskStatusColumns,
  type Task,
} from '@/mock/projects'
import { taskPriorityTone, taskStatusLabel, taskStatusTone } from './projectsConstants'

const allProjectOption = { label: 'All projects', value: 'all' }
const allStatusOption = { label: 'All statuses', value: 'all' }
const allPriorityOption = { label: 'All priorities', value: 'all' }
const projectOptions: SelectOption[] = [
  allProjectOption,
  ...projects.map((project) => ({ label: project.name, value: project.id })),
]
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
const defaultPageSize = 8

const compareTasks = (sort: DataTableSort) => (a: Task, b: Task) => {
  const direction = sort.order === 'desc' ? -1 : 1
  if (sort.key === 'due') return a.due.localeCompare(b.due) * direction
  return 0
}

/** Searchable task table with project, status, priority and due-date controls. */
export function ProjectTasksView() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [projectFilter, setProjectFilter] = useState<SelectOption>(allProjectOption)
  const [statusFilter, setStatusFilter] = useState<SelectOption>(allStatusOption)
  const [priorityFilter, setPriorityFilter] = useState<SelectOption>(allPriorityOption)
  const [sort, setSort] = useState<DataTableSort>({ key: '', order: '' })
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(defaultPageSize)

  useEffect(() => {
    setPageIndex(1)
  }, [pageSize, priorityFilter.value, projectFilter.value, query, statusFilter.value])

  const filteredTasks = useMemo(() => {
    const lowered = query.trim().toLowerCase()
    return tasks.filter((task) => {
      const matchesQuery = lowered.length === 0 || task.title.toLowerCase().includes(lowered)
      const matchesProject = projectFilter.value === 'all' || task.projectId === projectFilter.value
      const matchesStatus = statusFilter.value === 'all' || task.status === statusFilter.value
      const matchesPriority =
        priorityFilter.value === 'all' || task.priority === priorityFilter.value
      return matchesQuery && matchesProject && matchesStatus && matchesPriority
    })
  }, [priorityFilter.value, projectFilter.value, query, statusFilter.value])

  const sortedTasks = useMemo(() => {
    if (!sort.key || !sort.order) return filteredTasks
    return [...filteredTasks].sort(compareTasks(sort))
  }, [filteredTasks, sort])

  const pageRows = useMemo(
    () => sortedTasks.slice((pageIndex - 1) * pageSize, pageIndex * pageSize),
    [pageIndex, pageSize, sortedTasks],
  )

  const columns = useMemo<ColumnDef<Task, unknown>[]>(
    () => [
      {
        id: 'task',
        header: 'Task',
        enableSorting: false,
        cell: ({ row }) => (
          <div className="min-w-64 space-y-1.5">
            <p className="font-medium text-content">{row.original.title}</p>
            <div className="flex flex-wrap gap-1.5">
              {row.original.labels.map((label) => (
                <span
                  key={label}
                  className="rounded-md bg-surface-sunken px-2 py-1 text-xs font-medium text-content-muted"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        ),
      },
      {
        id: 'project',
        header: 'Project',
        enableSorting: false,
        cell: ({ row }) => getProject(row.original.projectId)?.name ?? row.original.projectId,
      },
      {
        id: 'assignee',
        header: 'Assignee',
        enableSorting: false,
        cell: ({ row }) => {
          const member = getMember(row.original.assignee)
          return (
            <div className="flex items-center gap-2">
              <Avatar
                size={24}
                shape="circle"
                src={member?.avatar}
                alt={member?.name ?? row.original.assignee}
              />
              <span className="text-sm text-content">{member?.name ?? row.original.assignee}</span>
            </div>
          )
        },
      },
      {
        accessorKey: 'priority',
        header: 'Priority',
        enableSorting: false,
        cell: ({ row }) => (
          <StatusTag tone={taskPriorityTone[row.original.priority]}>
            {row.original.priority}
          </StatusTag>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        enableSorting: false,
        cell: ({ row }) => (
          <StatusTag tone={taskStatusTone[row.original.status]}>
            {taskStatusLabel[row.original.status]}
          </StatusTag>
        ),
      },
      {
        accessorKey: 'due',
        header: 'Due',
        cell: ({ row }) => formatRelativeTime(row.original.due),
      },
      {
        id: 'checklist',
        header: 'Checklist',
        enableSorting: false,
        cell: ({ row }) => {
          const percent = Math.round((row.original.checklist[0] / row.original.checklist[1]) * 100)
          return (
            <div className="w-28 space-y-1">
              <span className="text-xs text-content-muted">
                {row.original.checklist[0]} / {row.original.checklist[1]}
              </span>
              <Progress percent={percent} size="sm" showInfo={false} />
            </div>
          )
        },
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
      const task = pageRows[index]
      if (task) navigate(`/projects/${task.projectId}`)
    },
    [navigate, pageRows],
  )

  return (
    <div className="space-y-6">
      <PageHeader title="Tasks" description="Search and triage delivery work across projects." />

      <Card bordered bodyClass="space-y-4 p-4">
        <div className="grid gap-3 lg:grid-cols-[minmax(16rem,1fr)_14rem_12rem_12rem]">
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            name="task-search"
            placeholder="Search task title"
            prefix={<Icon as={TbIcons.TbSearch} size={16} />}
            aria-label="Search tasks"
          />
          <Select
            options={projectOptions}
            value={projectFilter}
            onChange={(option) => setProjectFilter(option ?? allProjectOption)}
            isClearable={false}
            aria-label="Project"
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
        </div>

        <div onClick={handleTableClick}>
          <DataTable<Task>
            columns={columns}
            data={pageRows}
            pagingData={{ pageIndex, pageSize, total: sortedTasks.length }}
            pageSizeOptions={[8, 16, 24]}
            onPaginationChange={setPageIndex}
            onPageSizeChange={setPageSize}
            onSort={handleSort}
            emptyMessage="No tasks match the current filters."
          />
        </div>
      </Card>
    </div>
  )
}
