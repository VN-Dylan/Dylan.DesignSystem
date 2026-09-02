import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, EmptyState, Input, Progress, Segment, UsersAvatarGroup } from '@vn-dylan/ui'
import { Icon, TbIcons } from '@vn-dylan/icons'
import { formatCurrency } from '@vn-dylan/utils'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatusTag } from '@/components/shared/StatusTag'
import { getMember, projects, type ProjectStatus } from '@/mock/projects'
import { projectStatusLabel, projectStatusTone } from './projectsConstants'

/** Filterable card grid for browsing project delivery health. */
export function ProjectListView() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<ProjectStatus | 'all'>('all')

  const filteredProjects = useMemo(() => {
    const lowered = query.trim().toLowerCase()
    return projects.filter((project) => {
      const matchesQuery =
        lowered.length === 0 ||
        project.name.toLowerCase().includes(lowered) ||
        project.client.toLowerCase().includes(lowered)
      const matchesStatus = status === 'all' || project.status === status
      return matchesQuery && matchesStatus
    })
  }, [query, status])

  return (
    <div className="space-y-6">
      <PageHeader
        title="Projects"
        description="Browse delivery work by client, health and team ownership."
        actions={
          <Button
            variant="solid"
            icon={<Icon as={TbIcons.TbPlus} size={16} />}
            onClick={() => navigate('/projects/list')}
          >
            New project
          </Button>
        }
      />

      <Card bordered bodyClass="space-y-4 p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-center">
          <div className="lg:w-80">
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              name="project-search"
              placeholder="Search name or client"
              prefix={<Icon as={TbIcons.TbSearch} size={16} />}
              aria-label="Search projects"
            />
          </div>
          <div className="overflow-x-auto">
            <Segment
              value={status}
              onChange={(value) => setStatus(String(value) as ProjectStatus | 'all')}
              size="sm"
              aria-label="Project status"
            >
              <Segment.Item value="all">All</Segment.Item>
              <Segment.Item value="on-track">On track</Segment.Item>
              <Segment.Item value="at-risk">At risk</Segment.Item>
              <Segment.Item value="delayed">Delayed</Segment.Item>
              <Segment.Item value="completed">Completed</Segment.Item>
            </Segment>
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <EmptyState size={220}>
            <div className="text-center">
              <p className="font-medium text-content">No projects match the current filters</p>
              <p className="text-sm text-content-muted">Try another client, name or status.</p>
            </div>
          </EmptyState>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                bordered
                clickable
                bodyClass="space-y-4 p-4"
                onClick={() => navigate(`/projects/${project.id}`)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="truncate text-base font-semibold text-content">
                      {project.name}
                    </h2>
                    <p className="text-sm text-content-muted">{project.client}</p>
                  </div>
                  <StatusTag tone={projectStatusTone[project.status]}>
                    {projectStatusLabel[project.status]}
                  </StatusTag>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-content-muted">Progress</span>
                    <span className="font-medium text-content">{project.progress}%</span>
                  </div>
                  <Progress percent={project.progress} size="sm" showInfo={false} />
                </div>

                <div className="flex items-center justify-between gap-3">
                  <UsersAvatarGroup
                    users={project.team.map((id) => {
                      const member = getMember(id)
                      return { name: member?.name ?? id, img: member?.avatar }
                    })}
                    avatarProps={{ size: 28, shape: 'circle' }}
                    avatarGroupProps={{ maxCount: 4, chained: true }}
                  />
                  <p className="text-sm font-medium text-content">
                    {formatCurrency(project.spent)}
                    <span className="text-content-muted"> / {formatCurrency(project.budget)}</span>
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-surface-sunken px-2 py-1 text-xs font-medium text-content-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
