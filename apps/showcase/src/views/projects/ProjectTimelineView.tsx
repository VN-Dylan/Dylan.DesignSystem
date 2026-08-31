import { useMemo, useState } from 'react'
import { Card, EmptyState, GanttChart, Progress, Select } from '@dylan-ds/ui'
import type { SelectOption } from '@dylan-ds/ui'
import { PageHeader } from '@/components/shared/PageHeader'
import { milestones, projects } from '@/mock/projects'

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })

const milestoneProjectIds = new Set(milestones.map((milestone) => milestone.projectId))
const projectOptions: SelectOption[] = projects
  .filter((project) => milestoneProjectIds.has(project.id))
  .map((project) => ({ label: project.name, value: project.id }))

/** Gantt timeline for project milestone ranges. */
export function ProjectTimelineView() {
  const [projectFilter, setProjectFilter] = useState<SelectOption>(
    projectOptions[0] ?? { label: 'No project', value: '' },
  )

  const projectMilestones = useMemo(
    () => milestones.filter((milestone) => milestone.projectId === projectFilter.value),
    [projectFilter.value],
  )

  const ganttTasks = useMemo(
    () =>
      projectMilestones.map((milestone) => ({
        id: milestone.id,
        name: milestone.name,
        start: milestone.start,
        end: milestone.end,
        progress: milestone.progress,
      })),
    [projectMilestones],
  )

  return (
    <div className="space-y-6">
      <PageHeader
        title="Timeline"
        description="Milestone ranges and progress for the selected project."
        actions={
          <div className="w-72">
            <Select
              options={projectOptions}
              value={projectFilter}
              onChange={(option) => option && setProjectFilter(option)}
              isClearable={false}
              aria-label="Project filter"
            />
          </div>
        }
      />

      <Card bordered bodyClass="p-4">
        {ganttTasks.length === 0 ? (
          <EmptyState size={220}>
            <div className="text-center">
              <p className="font-medium text-content">No milestones available</p>
              <p className="text-sm text-content-muted">Choose another project from the filter.</p>
            </div>
          </EmptyState>
        ) : (
          <GanttChart tasks={ganttTasks} unit="week" />
        )}
      </Card>

      <Card
        bordered
        header={{ content: 'Milestones', bordered: true }}
        bodyClass="divide-y divide-border p-0"
      >
        {projectMilestones.map((milestone) => (
          <div key={milestone.id} className="grid gap-3 px-4 py-3 md:grid-cols-[1fr_16rem_12rem]">
            <div className="min-w-0">
              <p className="font-medium text-content">{milestone.name}</p>
              <p className="text-sm text-content-muted">
                {formatDate(milestone.start)} - {formatDate(milestone.end)}
              </p>
            </div>
            <p className="text-sm text-content-muted">{milestone.progress}% complete</p>
            <Progress percent={milestone.progress} size="sm" showInfo={false} />
          </div>
        ))}
      </Card>
    </div>
  )
}
