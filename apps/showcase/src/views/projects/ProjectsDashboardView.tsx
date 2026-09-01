import { useNavigate } from 'react-router-dom'
import { Button, Card, Progress, Table, UsersAvatarGroup } from '@dylan-ds/ui'
import { Icon, TbIcons } from '@dylan-ds/icons'
import { formatCurrency, formatRelativeTime } from '@dylan-ds/utils'
import { PageHeader } from '@/components/shared/PageHeader'
import { KpiCard } from '@/components/shared/KpiCard'
import { ChartCard } from '@/components/shared/ChartCard'
import { StatusTag } from '@/components/shared/StatusTag'
import { getMember, projectKpis, projects, tasks } from '@/mock/projects'
import { projectStatusLabel, projectStatusTone, taskPriorityTone } from './projectsConstants'

const upcomingTasks = [...tasks]
  .filter((t) => t.status !== 'done')
  .sort((a, b) => a.due.localeCompare(b.due))
  .slice(0, 6)

/**
 * Projects overview — the reference screen for the projects area: KPI row,
 * velocity chart, budget card, active-project table and an upcoming-tasks list.
 */
export function ProjectsDashboardView() {
  const navigate = useNavigate()
  const budgetPct = Math.round((projectKpis.budgetUsed / projectKpis.budgetTotal) * 100)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Projects dashboard"
        description="Delivery health across active client and internal projects."
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

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Active projects"
          value={projectKpis.active}
          icon={<Icon as={TbIcons.TbFolders} size={18} />}
        />
        <KpiCard
          label="On track"
          value={projectKpis.onTrack}
          icon={<Icon as={TbIcons.TbCircleCheck} size={18} />}
        />
        <KpiCard
          label="At risk"
          value={projectKpis.atRisk}
          icon={<Icon as={TbIcons.TbAlertTriangle} size={18} />}
        />
        <KpiCard
          label="Hours logged"
          value={projectKpis.hoursLogged.toLocaleString('en-US')}
          delta={9.4}
          icon={<Icon as={TbIcons.TbClock} size={18} />}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ChartCard
            title="Team velocity (story points / sprint)"
            type="bar"
            height={280}
            categories={['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8']}
            series={[{ name: 'Completed', data: projectKpis.velocity }]}
            options={{ plotOptions: { bar: { borderRadius: 4, columnWidth: '45%' } } }}
          />
        </div>
        <Card bordered header={{ content: 'Budget', bordered: true }} bodyClass="space-y-4 p-4">
          <div className="flex items-center justify-center py-2">
            <Progress variant="circle" percent={budgetPct} />
          </div>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-content-muted">Spent</dt>
              <dd className="font-medium text-content">{formatCurrency(projectKpis.budgetUsed)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-content-muted">Total</dt>
              <dd className="font-medium text-content">
                {formatCurrency(projectKpis.budgetTotal)}
              </dd>
            </div>
          </dl>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card
          bordered
          className="lg:col-span-2"
          header={{
            content: 'Active projects',
            bordered: true,
            extra: (
              <Button size="xs" variant="plain" onClick={() => navigate('/projects/list')}>
                View all
              </Button>
            ),
          }}
          bodyClass="p-0"
        >
          <Table hoverable>
            <Table.THead>
              <Table.Tr>
                <Table.Th>Project</Table.Th>
                <Table.Th>Team</Table.Th>
                <Table.Th>Progress</Table.Th>
                <Table.Th>Status</Table.Th>
              </Table.Tr>
            </Table.THead>
            <Table.TBody>
              {projects.map((project) => (
                <Table.Tr
                  key={project.id}
                  className="cursor-pointer"
                  onClick={() => navigate(`/projects/${project.id}`)}
                >
                  <Table.Td>
                    <p className="font-medium text-content">{project.name}</p>
                    <p className="text-xs text-content-muted">{project.client}</p>
                  </Table.Td>
                  <Table.Td>
                    <UsersAvatarGroup
                      users={project.team.map((id) => {
                        const member = getMember(id)
                        return { name: member?.name ?? id, img: member?.avatar }
                      })}
                      avatarProps={{ size: 24 }}
                      avatarGroupProps={{ maxCount: 4, chained: true }}
                    />
                  </Table.Td>
                  <Table.Td className="w-40">
                    <Progress percent={project.progress} size="sm" />
                  </Table.Td>
                  <Table.Td>
                    <StatusTag tone={projectStatusTone[project.status]}>
                      {projectStatusLabel[project.status]}
                    </StatusTag>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.TBody>
          </Table>
        </Card>

        <Card
          bordered
          header={{
            content: 'Upcoming tasks',
            bordered: true,
            extra: (
              <Button size="xs" variant="plain" onClick={() => navigate('/projects/tasks')}>
                All tasks
              </Button>
            ),
          }}
          bodyClass="divide-y divide-border p-0"
        >
          {upcomingTasks.map((task) => (
            <div key={task.id} className="flex items-start gap-3 px-4 py-3">
              <span className="mt-1">
                <StatusTag tone={taskPriorityTone[task.priority]}>{task.priority}</StatusTag>
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-content">{task.title}</p>
                <p className="text-xs text-content-muted">
                  {getMember(task.assignee)?.name} · due {formatRelativeTime(task.due)}
                </p>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  )
}
