import { useMemo, useState } from 'react'
import { Avatar, Badge, Card, Progress, Select } from '@vn-dylan/ui'
import type { SelectOption } from '@vn-dylan/ui'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatusTag } from '@/components/shared/StatusTag'
import { getMember, projects, taskStatusColumns, tasks } from '@/mock/projects'
import { taskPriorityTone } from './projectsConstants'

const allProjectOption = { label: 'All projects', value: 'all' }
const projectOptions: SelectOption[] = [
  allProjectOption,
  ...projects.map((project) => ({ label: project.name, value: project.id })),
]

/** Kanban-style scrum board grouped by project task status. */
export function ScrumBoardView() {
  const [projectFilter, setProjectFilter] = useState<SelectOption>(allProjectOption)

  const filteredTasks = useMemo(
    () =>
      projectFilter.value === 'all'
        ? tasks
        : tasks.filter((task) => task.projectId === projectFilter.value),
    [projectFilter.value],
  )

  return (
    <div className="space-y-6">
      <PageHeader
        title="Scrum board"
        description="Track mock delivery cards by workflow state."
        actions={
          <div className="w-64">
            <Select
              options={projectOptions}
              value={projectFilter}
              onChange={(option) => setProjectFilter(option ?? allProjectOption)}
              isClearable={false}
              aria-label="Project filter"
            />
          </div>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {taskStatusColumns.map((column) => {
          const columnTasks = filteredTasks.filter((task) => task.status === column.status)
          return (
            <Card
              key={column.status}
              bordered
              header={{
                content: column.label,
                bordered: true,
                extra: <Badge content={columnTasks.length} />,
              }}
              bodyClass="space-y-3 p-3"
            >
              {columnTasks.length === 0 ? (
                <p className="rounded-md border border-border bg-surface-sunken p-3 text-sm text-content-muted">
                  No tasks in this column.
                </p>
              ) : (
                columnTasks.map((task) => {
                  const member = getMember(task.assignee)
                  const percent = Math.round((task.checklist[0] / task.checklist[1]) * 100)
                  return (
                    <Card key={task.id} bordered bodyClass="space-y-3 p-3">
                      <div className="space-y-2">
                        <h2 className="text-sm font-semibold text-content">{task.title}</h2>
                        <div className="flex flex-wrap gap-1.5">
                          {task.labels.map((label) => (
                            <span
                              key={label}
                              className="rounded-md bg-surface-sunken px-2 py-1 text-xs font-medium text-content-muted"
                            >
                              {label}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <StatusTag tone={taskPriorityTone[task.priority]}>
                          {task.priority}
                        </StatusTag>
                        <Avatar
                          size={24}
                          shape="circle"
                          src={member?.avatar}
                          alt={member?.name ?? task.assignee}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs text-content-muted">
                          <span>Checklist</span>
                          <span>
                            {task.checklist[0]}/{task.checklist[1]}
                          </span>
                        </div>
                        <Progress percent={percent} size="sm" showInfo={false} />
                      </div>
                    </Card>
                  )
                })
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
