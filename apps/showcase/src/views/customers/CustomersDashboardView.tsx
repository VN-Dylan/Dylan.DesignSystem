import { useNavigate } from 'react-router-dom'
import { Avatar, Card, Table } from '@dylan-ds/ui'
import { Icon, TbIcons } from '@dylan-ds/icons'
import { formatCurrency, formatNumber, formatRelativeTime } from '@dylan-ds/utils'
import { PageHeader } from '@/components/shared/PageHeader'
import { KpiCard } from '@/components/shared/KpiCard'
import { ChartCard } from '@/components/shared/ChartCard'
import { StatusTag } from '@/components/shared/StatusTag'
import { customerKpis, customers, leadStageOrder, leads, tickets } from '@/mock/customers'
import { customerStatusTone, ticketStatusTone } from './customersConstants'

const funnel = leadStageOrder
  .filter((s) => s !== 'lost')
  .map((stage) => ({
    stage,
    count: leads.filter((l) => l.stage === stage).length,
    value: leads.filter((l) => l.stage === stage).reduce((sum, l) => sum + l.value, 0),
  }))

/**
 * Customers overview — the reference screen for the customers area: KPI row,
 * acquisition chart, pipeline funnel, top-accounts table and an open-tickets
 * list.
 */
export function CustomersDashboardView() {
  const navigate = useNavigate()
  const topAccounts = [...customers].sort((a, b) => b.ltv - a.ltv).slice(0, 5)
  const openTickets = tickets.filter((t) => t.status !== 'resolved').slice(0, 5)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Customers dashboard"
        description="Account health, pipeline and support load."
        actions={
          <button
            type="button"
            className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-fg"
            onClick={() => navigate('/customers/list')}
          >
            All customers
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Total customers"
          value={formatNumber(customerKpis.total.value, 1)}
          delta={customerKpis.total.delta}
          icon={<Icon as={TbIcons.TbUsers} size={18} />}
        />
        <KpiCard
          label="Active"
          value={formatNumber(customerKpis.active.value, 1)}
          delta={customerKpis.active.delta}
          icon={<Icon as={TbIcons.TbUserCheck} size={18} />}
        />
        <KpiCard
          label="Churn rate"
          value={`${customerKpis.churnRate.value}%`}
          delta={customerKpis.churnRate.delta}
          icon={<Icon as={TbIcons.TbUserX} size={18} />}
        />
        <KpiCard
          label="Avg. LTV"
          value={formatCurrency(customerKpis.avgLtv.value)}
          delta={customerKpis.avgLtv.delta}
          icon={<Icon as={TbIcons.TbCoin} size={18} />}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ChartCard
            title="New customers per month"
            type="bar"
            height={280}
            categories={['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8']}
            series={[{ name: 'New', data: customerKpis.newThisMonth }]}
            options={{ plotOptions: { bar: { borderRadius: 4, columnWidth: '45%' } } }}
          />
        </div>
        <Card
          bordered
          header={{
            content: 'Pipeline',
            bordered: true,
            extra: (
              <button
                type="button"
                className="text-xs text-primary hover:underline"
                onClick={() => navigate('/customers/leads')}
              >
                Leads
              </button>
            ),
          }}
          bodyClass="space-y-3 p-4"
        >
          {funnel.map((row) => (
            <div key={row.stage}>
              <div className="flex justify-between text-sm">
                <span className="capitalize text-content">{row.stage}</span>
                <span className="text-content-muted">{formatCurrency(row.value)}</span>
              </div>
              <div className="mt-1 h-2 overflow-hidden rounded-full bg-surface-sunken">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${Math.max(6, (row.count / leads.length) * 100)}%` }}
                />
              </div>
            </div>
          ))}
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card
          bordered
          className="lg:col-span-2"
          header={{
            content: 'Top accounts by LTV',
            bordered: true,
            extra: (
              <button
                type="button"
                className="text-xs text-primary hover:underline"
                onClick={() => navigate('/customers/list')}
              >
                View all
              </button>
            ),
          }}
          bodyClass="p-0"
        >
          <Table hoverable>
            <Table.THead>
              <Table.Tr>
                <Table.Th>Customer</Table.Th>
                <Table.Th>Orders</Table.Th>
                <Table.Th>LTV</Table.Th>
                <Table.Th>Status</Table.Th>
              </Table.Tr>
            </Table.THead>
            <Table.TBody>
              {topAccounts.map((c) => (
                <Table.Tr
                  key={c.id}
                  className="cursor-pointer"
                  onClick={() => navigate(`/customers/${c.id}/overview`)}
                >
                  <Table.Td>
                    <div className="flex items-center gap-2">
                      <Avatar size={28} shape="circle" src={c.avatar} alt={c.name} />
                      <div>
                        <p className="font-medium text-content">{c.name}</p>
                        <p className="text-xs text-content-muted">{c.company}</p>
                      </div>
                    </div>
                  </Table.Td>
                  <Table.Td>{c.orders}</Table.Td>
                  <Table.Td>{formatCurrency(c.ltv)}</Table.Td>
                  <Table.Td>
                    <StatusTag tone={customerStatusTone[c.status]}>{c.status}</StatusTag>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.TBody>
          </Table>
        </Card>

        <Card
          bordered
          header={{
            content: 'Open tickets',
            bordered: true,
            extra: (
              <button
                type="button"
                className="text-xs text-primary hover:underline"
                onClick={() => navigate('/customers/helpdesk')}
              >
                Helpdesk
              </button>
            ),
          }}
          bodyClass="divide-y divide-border p-0"
        >
          {openTickets.map((t) => (
            <div key={t.id} className="px-4 py-3">
              <p className="truncate text-sm font-medium text-content">{t.subject}</p>
              <div className="mt-1 flex items-center gap-2 text-xs text-content-muted">
                <StatusTag tone={ticketStatusTone[t.status]}>{t.status}</StatusTag>
                <span>{t.customer}</span>
                <span>· {formatRelativeTime(t.created)}</span>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  )
}
