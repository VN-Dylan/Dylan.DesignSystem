import { useMemo } from 'react'
import { Card, Table } from '@vn-dylan/ui'
import { Icon, TbIcons } from '@vn-dylan/icons'
import { formatCurrency, formatNumber } from '@vn-dylan/utils'
import { PageHeader } from '@/components/shared/PageHeader'
import { KpiCard } from '@/components/shared/KpiCard'
import { ChartCard } from '@/components/shared/ChartCard'
import { StatusTag } from '@/components/shared/StatusTag'
import {
  activeAccountCount,
  arpu,
  months,
  revenueSeries,
  subscriptions,
  totalMrr,
  type Plan,
} from '@/mock/analytics'
import { planTone, subscriptionStatusLabel, subscriptionStatusTone } from './analyticsConstants'

const formatKCurrency = (value: number) => `$${value.toLocaleString('en-US')}k`

/** Revenue analysis screen with actuals, plan mix and account MRR. */
export function RevenueView() {
  const totalRevenue = revenueSeries.actual.reduce((sum, value) => sum + value, 0)
  const revenueByPlan = useMemo(() => {
    const totals = subscriptions.reduce<Record<Plan, number>>(
      (acc, subscription) => {
        acc[subscription.plan] += subscription.mrr
        return acc
      },
      { Free: 0, Pro: 0, Team: 0, Enterprise: 0 },
    )

    return Object.entries(totals).map(([plan, total]) => ({ plan: plan as Plan, total }))
  }, [])
  const accountsByMrr = useMemo(() => [...subscriptions].sort((a, b) => b.mrr - a.mrr), [])

  return (
    <div className="space-y-6">
      <PageHeader
        title="Revenue"
        description="Monthly revenue actuals, plan concentration and account contribution."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Revenue YTD"
          value={formatKCurrency(totalRevenue)}
          icon={<Icon as={TbIcons.TbCurrencyDollar} size={18} />}
        />
        <KpiCard
          label="Monthly recurring revenue"
          value={formatCurrency(totalMrr)}
          icon={<Icon as={TbIcons.TbReceipt2} size={18} />}
        />
        <KpiCard
          label="Active accounts"
          value={formatNumber(activeAccountCount, 0)}
          icon={<Icon as={TbIcons.TbBuildingStore} size={18} />}
        />
        <KpiCard
          label="ARPU"
          value={formatCurrency(arpu)}
          icon={<Icon as={TbIcons.TbUserDollar} size={18} />}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ChartCard
            title="Monthly revenue"
            type="bar"
            height={320}
            categories={months}
            series={[{ name: 'Revenue', data: revenueSeries.actual }]}
            options={{
              plotOptions: { bar: { borderRadius: 4, columnWidth: '52%' } },
              yaxis: {
                labels: { formatter: (value: number) => formatKCurrency(Math.round(value)) },
              },
            }}
          />
        </div>
        <ChartCard
          title="Revenue by plan"
          type="donut"
          height={320}
          series={revenueByPlan.map((item) => item.total)}
          options={{
            labels: revenueByPlan.map((item) => item.plan),
            legend: { position: 'bottom' },
            tooltip: { y: { formatter: (value: number) => formatCurrency(value) } },
          }}
        />
      </div>

      <Card bordered header={{ content: 'Revenue by account', bordered: true }} bodyClass="p-0">
        <Table hoverable>
          <Table.THead>
            <Table.Tr>
              <Table.Th>Account</Table.Th>
              <Table.Th>Plan</Table.Th>
              <Table.Th>Seats</Table.Th>
              <Table.Th>MRR</Table.Th>
              <Table.Th>Status</Table.Th>
            </Table.Tr>
          </Table.THead>
          <Table.TBody>
            {accountsByMrr.map((subscription) => (
              <Table.Tr key={subscription.id}>
                <Table.Td className="font-medium text-content">{subscription.account}</Table.Td>
                <Table.Td>
                  <StatusTag tone={planTone[subscription.plan]}>{subscription.plan}</StatusTag>
                </Table.Td>
                <Table.Td>{formatNumber(subscription.seats, 0)}</Table.Td>
                <Table.Td>{formatCurrency(subscription.mrr)}</Table.Td>
                <Table.Td>
                  <StatusTag tone={subscriptionStatusTone[subscription.status]}>
                    {subscriptionStatusLabel[subscription.status]}
                  </StatusTag>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.TBody>
        </Table>
      </Card>
    </div>
  )
}
