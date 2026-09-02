import { useNavigate, useParams } from 'react-router-dom'
import { Avatar, Button, Card, EmptyState, Progress, Table, Tabs } from '@vn-dylan/ui'
import { Icon, TbIcons } from '@vn-dylan/icons'
import { formatCurrency, formatRelativeTime } from '@vn-dylan/utils'
import { KpiCard } from '@/components/shared/KpiCard'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatusTag } from '@/components/shared/StatusTag'
import { getMember, getProject, getTasksForProject, milestones } from '@/mock/projects'
import {
  projectStatusLabel,
  projectStatusTone,
  taskPriorityTone,
  taskStatusLabel,
  taskStatusTone,
} from './projectsConstants'

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })

/** Project detail screen with overview, task and team tabs. */
export function ProjectDetailView() {
  const navigate = useNavigate()
  const { id } = useParams()
  const project = id ? getProject(id) : undefined

  if (!project) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Project not found"
          description="The requested project does not exist in the mock workspace."
        />
        <Card bordered>
          <EmptyState size={220}>
            <div className="space-y-3 text-center">
              <p className="font-medium text-content">Project not found</p>
              <Button onClick={() => navigate('/projects/list')}>Back to projects</Button>
            </div>
          </EmptyState>
        </Card>
      </div>
    )
  }

  const projectMilestones = milestones.filter((milestone) => milestone.projectId === project.id)
  const projectTasks = getTasksForProject(project.id)
  const projectMembers = project.team.map(getMember).filter((member) => member != null)

  return (
    <div className="space-y-6">
      <PageHeader
        title={project.name}
        description={project.client}
        actions={
          <>
            <StatusTag tone={projectStatusTone[project.status]}>
              {projectStatusLabel[project.status]}
            </StatusTag>
            <Button
              icon={<Icon as={TbIcons.TbSettings} size={16} />}
              onClick={() => navigate('/projects/settings')}
            >
              Settings
            </Button>
            <Button
              icon={<Icon as={TbIcons.TbArrowLeft} size={16} />}
              onClick={() => navigate('/projects/list')}
            >
              Back
            </Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Progress" value={`${project.progress}%`} />
        <KpiCard label="Budget spent" value={formatCurrency(project.spent)} />
        <KpiCard label="Team size" value={project.team.length} />
        <KpiCard label="Due" value={formatRelativeTime(project.due)} />
      </div>

      <Card bordered bodyClass="p-4">
        <Tabs defaultValue="overview">
          <Tabs.TabList>
            <Tabs.TabNav value="overview">Overview</Tabs.TabNav>
            <Tabs.TabNav value="tasks">Tasks</Tabs.TabNav>
            <Tabs.TabNav value="team">Team</Tabs.TabNav>
          </Tabs.TabList>

          <Tabs.TabContent value="overview" className="space-y-4 pt-4">
            <p className="max-w-3xl text-sm leading-6 text-content-muted">{project.description}</p>
            <Table>
              <Table.TBody>
                <Table.Tr>
                  <Table.Td className="font-medium text-content-muted">Client</Table.Td>
                  <Table.Td>{project.client}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td className="font-medium text-content-muted">Start</Table.Td>
                  <Table.Td>{formatDate(project.start)}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td className="font-medium text-content-muted">Due</Table.Td>
                  <Table.Td>{formatDate(project.due)}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td className="font-medium text-content-muted">Budget</Table.Td>
                  <Table.Td>{formatCurrency(project.budget)}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td className="font-medium text-content-muted">Spent</Table.Td>
                  <Table.Td>{formatCurrency(project.spent)}</Table.Td>
                </Table.Tr>
              </Table.TBody>
            </Table>

            <div className="space-y-3">
              <h2 className="text-sm font-semibold text-content">Milestones</h2>
              {projectMilestones.length === 0 ? (
                <p className="rounded-md border border-border bg-surface-sunken p-3 text-sm text-content-muted">
                  No milestones in the mock timeline for this project.
                </p>
              ) : (
                <div className="divide-y divide-border rounded-md border border-border">
                  {projectMilestones.map((milestone) => (
                    <div
                      key={milestone.id}
                      className="grid gap-3 p-3 md:grid-cols-[1fr_12rem_12rem]"
                    >
                      <div className="min-w-0">
                        <p className="font-medium text-content">{milestone.name}</p>
                        <p className="text-xs text-content-muted">
                          {formatDate(milestone.start)} – {formatDate(milestone.end)}
                        </p>
                      </div>
                      <p className="text-sm text-content-muted">{milestone.progress}% complete</p>
                      <Progress percent={milestone.progress} size="sm" showInfo={false} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Tabs.TabContent>

          <Tabs.TabContent value="tasks" className="pt-4">
            <Table hoverable>
              <Table.THead>
                <Table.Tr>
                  <Table.Th>Task</Table.Th>
                  <Table.Th>Assignee</Table.Th>
                  <Table.Th>Priority</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Checklist</Table.Th>
                </Table.Tr>
              </Table.THead>
              <Table.TBody>
                {projectTasks.map((task) => {
                  const member = getMember(task.assignee)
                  return (
                    <Table.Tr key={task.id}>
                      <Table.Td>
                        <p className="font-medium text-content">{task.title}</p>
                      </Table.Td>
                      <Table.Td>
                        <div className="flex items-center gap-2">
                          <Avatar
                            size={24}
                            shape="circle"
                            src={member?.avatar}
                            alt={member?.name ?? task.assignee}
                          />
                          <span className="text-sm text-content">
                            {member?.name ?? task.assignee}
                          </span>
                        </div>
                      </Table.Td>
                      <Table.Td>
                        <StatusTag tone={taskPriorityTone[task.priority]}>
                          {task.priority}
                        </StatusTag>
                      </Table.Td>
                      <Table.Td>
                        <StatusTag tone={taskStatusTone[task.status]}>
                          {taskStatusLabel[task.status]}
                        </StatusTag>
                      </Table.Td>
                      <Table.Td>
                        {task.checklist[0]} / {task.checklist[1]}
                      </Table.Td>
                    </Table.Tr>
                  )
                })}
              </Table.TBody>
            </Table>
          </Tabs.TabContent>

          <Tabs.TabContent value="team" className="pt-4">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {projectMembers.map((member) => (
                <Card key={member.id} bordered bodyClass="flex items-center gap-3 p-4">
                  <Avatar size={40} shape="circle" src={member.avatar} alt={member.name} />
                  <div className="min-w-0">
                    <p className="truncate font-medium text-content">{member.name}</p>
                    <p className="text-sm text-content-muted">{member.role}</p>
                  </div>
                </Card>
              ))}
            </div>
          </Tabs.TabContent>
        </Tabs>
      </Card>
    </div>
  )
}
