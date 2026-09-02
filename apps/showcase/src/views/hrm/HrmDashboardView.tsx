import { useNavigate } from 'react-router-dom'
import { Avatar, Card, Table } from '@vn-dylan/ui'
import { Icon, TbIcons } from '@vn-dylan/icons'
import { formatRelativeTime } from '@vn-dylan/utils'
import { PageHeader } from '@/components/shared/PageHeader'
import { KpiCard } from '@/components/shared/KpiCard'
import { ChartCard } from '@/components/shared/ChartCard'
import { StatusTag } from '@/components/shared/StatusTag'
import {
  announcements,
  attendanceSummary,
  employees,
  getEmployee,
  headcountByDept,
  hrmKpis,
  leaves,
} from '@/mock/hrm'
import { employeeStatusTone, leaveStatusTone } from './hrmConstants'

/**
 * HR overview — the reference screen for the hrm area: headcount KPIs, a
 * department chart, today's attendance, pending leave requests, new joiners
 * and the latest announcement.
 */
export function HrmDashboardView() {
  const navigate = useNavigate()
  const pendingLeaves = leaves.filter((l) => l.status === 'pending')
  const newJoiners = [...employees].sort((a, b) => b.joined.localeCompare(a.joined)).slice(0, 4)
  const pinned = announcements.find((a) => a.pinned) ?? announcements[0]!

  return (
    <div className="space-y-6">
      <PageHeader
        title="HRM dashboard"
        description="Headcount, attendance and people operations at a glance."
        actions={
          <button
            type="button"
            className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-fg"
            onClick={() => navigate('/hrm/employees')}
          >
            Directory
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Headcount"
          value={hrmKpis.headcount.value}
          delta={4.8}
          icon={<Icon as={TbIcons.TbUsersGroup} size={18} />}
        />
        <KpiCard
          label="Onboarding"
          value={hrmKpis.onboarding.value}
          icon={<Icon as={TbIcons.TbUserPlus} size={18} />}
        />
        <KpiCard
          label="Attrition (12m)"
          value={`${hrmKpis.attrition.value}%`}
          delta={hrmKpis.attrition.delta}
          icon={<Icon as={TbIcons.TbUserMinus} size={18} />}
        />
        <KpiCard
          label="Open roles"
          value={hrmKpis.openRoles.value}
          icon={<Icon as={TbIcons.TbBriefcase} size={18} />}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ChartCard
            title="Headcount by department"
            type="bar"
            height={280}
            categories={headcountByDept.map((d) => d.label)}
            series={[{ name: 'People', data: headcountByDept.map((d) => d.value) }]}
            options={{ plotOptions: { bar: { borderRadius: 4, columnWidth: '50%' } } }}
          />
        </div>
        <Card
          bordered
          header={{ content: "Today's attendance", bordered: true }}
          bodyClass="grid grid-cols-2 gap-3 p-4"
        >
          {[
            ['Present', attendanceSummary.presentToday, 'text-success'],
            ['Remote', attendanceSummary.remoteToday, 'text-info'],
            ['On leave', attendanceSummary.onLeaveToday, 'text-warning'],
            ['Absent', attendanceSummary.absentToday, 'text-error'],
          ].map(([label, value, tone]) => (
            <div key={label as string} className="rounded-md border border-border p-3">
              <p className={`text-2xl font-semibold ${tone as string}`}>{value as number}</p>
              <p className="text-xs text-content-muted">{label as string}</p>
            </div>
          ))}
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card
          bordered
          className="lg:col-span-2"
          header={{
            content: 'Pending leave requests',
            bordered: true,
            extra: (
              <button
                type="button"
                className="text-xs text-primary hover:underline"
                onClick={() => navigate('/hrm/leaves')}
              >
                All leaves
              </button>
            ),
          }}
          bodyClass="p-0"
        >
          <Table hoverable>
            <Table.THead>
              <Table.Tr>
                <Table.Th>Employee</Table.Th>
                <Table.Th>Type</Table.Th>
                <Table.Th>Dates</Table.Th>
                <Table.Th>Days</Table.Th>
                <Table.Th>Status</Table.Th>
              </Table.Tr>
            </Table.THead>
            <Table.TBody>
              {pendingLeaves.map((l) => {
                const emp = getEmployee(l.employeeId)
                return (
                  <Table.Tr key={l.id}>
                    <Table.Td>
                      <div className="flex items-center gap-2">
                        <Avatar size={26} shape="circle" src={emp?.avatar} alt={emp?.name} />
                        <span className="text-sm text-content">{emp?.name}</span>
                      </div>
                    </Table.Td>
                    <Table.Td className="capitalize">{l.type}</Table.Td>
                    <Table.Td className="text-sm text-content-muted">
                      {l.from} → {l.to}
                    </Table.Td>
                    <Table.Td>{l.days}</Table.Td>
                    <Table.Td>
                      <StatusTag tone={leaveStatusTone[l.status]}>{l.status}</StatusTag>
                    </Table.Td>
                  </Table.Tr>
                )
              })}
            </Table.TBody>
          </Table>
        </Card>

        <div className="space-y-4">
          <Card
            bordered
            header={{ content: 'New joiners', bordered: true }}
            bodyClass="divide-y divide-border p-0"
          >
            {newJoiners.map((e) => (
              <div key={e.id} className="flex items-center gap-3 px-4 py-3">
                <Avatar size={30} shape="circle" src={e.avatar} alt={e.name} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-content">{e.name}</p>
                  <p className="text-xs text-content-muted">
                    {e.role} · {formatRelativeTime(e.joined)}
                  </p>
                </div>
                <StatusTag tone={employeeStatusTone[e.status]}>{e.status}</StatusTag>
              </div>
            ))}
          </Card>
          <Card bordered header={{ content: 'Announcement', bordered: true }} bodyClass="p-4">
            <p className="text-sm font-medium text-content">{pinned.title}</p>
            <p className="mt-1 text-sm text-content-muted">{pinned.body}</p>
            <p className="mt-2 text-xs text-content-faint">
              {pinned.author} · {formatRelativeTime(pinned.date)}
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
