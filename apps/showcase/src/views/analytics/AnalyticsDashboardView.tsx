import { Card, Table, VectorMap } from '@dylan-ds/ui'
import { Icon, TbIcons } from '@dylan-ds/icons'
import { formatNumber } from '@dylan-ds/utils'
import { PageHeader } from '@/components/shared/PageHeader'
import { KpiCard } from '@/components/shared/KpiCard'
import { ChartCard } from '@/components/shared/ChartCard'
import { analyticsKpis, channels, countries, deviceSplit, months, topPages } from '@/mock/analytics'

/**
 * Web-analytics overview — the reference screen for the analytics area: KPI
 * row, channel trend chart, device split, a country VectorMap and a top-pages
 * table.
 */
export function AnalyticsDashboardView() {
  const regionData = Object.fromEntries(countries.map((c) => [c.code, c.sessions]))

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics dashboard"
        description="Traffic, engagement and acquisition for the last 12 months."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Visitors"
          value={formatNumber(analyticsKpis.visitors.value, 1)}
          delta={analyticsKpis.visitors.delta}
          spark={analyticsKpis.visitors.spark}
          icon={<Icon as={TbIcons.TbUsers} size={18} />}
        />
        <KpiCard
          label="Pageviews"
          value={formatNumber(analyticsKpis.pageviews.value, 1)}
          delta={analyticsKpis.pageviews.delta}
          spark={analyticsKpis.pageviews.spark}
          icon={<Icon as={TbIcons.TbEye} size={18} />}
        />
        <KpiCard
          label="Bounce rate"
          value={`${analyticsKpis.bounceRate.value}%`}
          delta={analyticsKpis.bounceRate.delta}
          spark={analyticsKpis.bounceRate.spark}
          icon={<Icon as={TbIcons.TbArrowBounce} size={18} />}
        />
        <KpiCard
          label="Avg. session"
          value={analyticsKpis.avgSession.value}
          delta={analyticsKpis.avgSession.delta}
          spark={analyticsKpis.avgSession.spark}
          icon={<Icon as={TbIcons.TbClock} size={18} />}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ChartCard
            title="Sessions by channel"
            type="area"
            height={300}
            categories={months}
            series={channels}
            options={{
              chart: { stacked: true },
              stroke: { width: 2 },
              fill: { type: 'gradient', gradient: { opacityFrom: 0.35, opacityTo: 0.05 } },
              legend: { position: 'bottom' },
            }}
          />
        </div>
        <ChartCard
          title="Device split"
          type="donut"
          height={300}
          series={deviceSplit.map((d) => d.value)}
          options={{ labels: deviceSplit.map((d) => d.label), legend: { position: 'bottom' } }}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card
          bordered
          className="lg:col-span-2"
          header={{ content: 'Sessions by country', bordered: true }}
          bodyClass="p-4"
        >
          <VectorMap data={regionData} height={320} aria-label="Sessions by country" />
        </Card>
        <Card bordered header={{ content: 'Top countries', bordered: true }} bodyClass="p-0">
          <Table>
            <Table.TBody>
              {countries.slice(0, 6).map((c) => (
                <Table.Tr key={c.code}>
                  <Table.Td>{c.name}</Table.Td>
                  <Table.Td className="text-end">{formatNumber(c.sessions, 1)}</Table.Td>
                </Table.Tr>
              ))}
            </Table.TBody>
          </Table>
        </Card>
      </div>

      <Card bordered header={{ content: 'Top pages', bordered: true }} bodyClass="p-0">
        <Table hoverable>
          <Table.THead>
            <Table.Tr>
              <Table.Th>Page</Table.Th>
              <Table.Th>Views</Table.Th>
              <Table.Th>Avg. time</Table.Th>
              <Table.Th>Bounce</Table.Th>
            </Table.Tr>
          </Table.THead>
          <Table.TBody>
            {topPages.map((p) => (
              <Table.Tr key={p.path}>
                <Table.Td>
                  <p className="font-medium text-content">{p.title}</p>
                  <p className="text-xs text-content-muted">{p.path}</p>
                </Table.Td>
                <Table.Td>{formatNumber(p.views, 1)}</Table.Td>
                <Table.Td>{p.avgTime}</Table.Td>
                <Table.Td>{p.bounce}%</Table.Td>
              </Table.Tr>
            ))}
          </Table.TBody>
        </Table>
      </Card>
    </div>
  )
}
