import { Card, Table } from '@dylan-ds/ui'
import { Icon, TbIcons } from '@dylan-ds/icons'
import { PageHeader } from '@/components/shared/PageHeader'
import { KpiCard } from '@/components/shared/KpiCard'
import { ChartCard } from '@/components/shared/ChartCard'
import { revenueSeries } from '@/mock/analytics'

const formatK = (value: number) => `$${value}k`

const forecastMonths = revenueSeries.labels
  .map((label, index) => ({
    label,
    lower: revenueSeries.lower[index],
    mid: revenueSeries.forecast[index],
    upper: revenueSeries.upper[index],
  }))
  .filter((month) => month.mid != null && !revenueSeries.actual.includes(month.mid))

const projectedEoyRevenue = [...revenueSeries.forecast]
  .reverse()
  .find((value): value is number => value != null)

/** Revenue forecast screen with projected trend, confidence KPIs and month detail. */
export function ForecastView() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Revenue forecast"
        description="Forward revenue projection with confidence bounds for the close of year."
      />

      <ChartCard
        title="Actual vs forecast"
        type="line"
        height={360}
        categories={revenueSeries.labels}
        series={[
          { name: 'Actual', data: revenueSeries.actual },
          { name: 'Forecast', data: revenueSeries.forecast },
          { name: 'Lower bound', data: revenueSeries.lower },
          { name: 'Upper bound', data: revenueSeries.upper },
        ]}
        options={{
          stroke: { curve: 'smooth', dashArray: [0, 6, 3, 3], width: [3, 3, 1, 1] },
          legend: { position: 'bottom' },
          yaxis: { labels: { formatter: (value: number) => formatK(Math.round(value)) } },
        }}
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <KpiCard
          label="Projected EOY revenue"
          value={projectedEoyRevenue ? formatK(projectedEoyRevenue) : '-'}
          icon={<Icon as={TbIcons.TbChartLine} size={18} />}
        />
        <KpiCard
          label="Forecast confidence"
          value="+/- 12%"
          icon={<Icon as={TbIcons.TbTargetArrow} size={18} />}
        />
        <KpiCard
          label="Months projected"
          value={forecastMonths.length}
          icon={<Icon as={TbIcons.TbCalendarStats} size={18} />}
        />
      </div>

      <Card bordered header={{ content: 'Forecast months', bordered: true }} bodyClass="p-0">
        <Table hoverable>
          <Table.THead>
            <Table.Tr>
              <Table.Th>Month</Table.Th>
              <Table.Th>Lower</Table.Th>
              <Table.Th>Mid</Table.Th>
              <Table.Th>Upper</Table.Th>
            </Table.Tr>
          </Table.THead>
          <Table.TBody>
            {forecastMonths.map((month) => (
              <Table.Tr key={month.label}>
                <Table.Td className="font-medium text-content">{month.label}</Table.Td>
                <Table.Td>{month.lower != null ? formatK(month.lower) : '-'}</Table.Td>
                <Table.Td>{month.mid != null ? formatK(month.mid) : '-'}</Table.Td>
                <Table.Td>{month.upper != null ? formatK(month.upper) : '-'}</Table.Td>
              </Table.Tr>
            ))}
          </Table.TBody>
        </Table>
      </Card>
    </div>
  )
}
