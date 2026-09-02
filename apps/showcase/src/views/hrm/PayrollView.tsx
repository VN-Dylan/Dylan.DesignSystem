import { Button, Card, Table } from '@vn-dylan/ui'
import { Icon, TbIcons } from '@vn-dylan/icons'
import { formatCurrency } from '@vn-dylan/utils'
import { ChartCard } from '@/components/shared/ChartCard'
import { KpiCard } from '@/components/shared/KpiCard'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatusTag } from '@/components/shared/StatusTag'
import { payrollKpis, payrollRuns } from '@/mock/hrm'
import { payrollStatusTone } from './hrmConstants'

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  })

/** Payroll overview with compensation KPIs, net-pay trend and run history. */
export function PayrollView() {
  const chartRuns = [...payrollRuns].sort((a, b) => a.payDate.localeCompare(b.payDate))

  return (
    <div className="space-y-6">
      <PageHeader
        title="Payroll"
        description="Monthly payroll totals, upcoming run and historical payments."
        actions={
          <Button
            variant="solid"
            icon={<Icon as={TbIcons.TbPlayerPlay} size={16} />}
            onClick={() => undefined}
          >
            Run payroll
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Monthly net" value={formatCurrency(payrollKpis.monthlyNet)} />
        <KpiCard label="Monthly gross" value={formatCurrency(payrollKpis.monthlyGross)} />
        <KpiCard label="Avg. salary" value={formatCurrency(payrollKpis.avgSalary)} />
        <KpiCard label="Next run" value={fmtDate(payrollKpis.nextRun)} />
      </div>

      <ChartCard
        title="Net pay by period"
        type="bar"
        height={280}
        categories={chartRuns.map((run) => run.period)}
        series={[{ name: 'Net pay', data: chartRuns.map((run) => run.net) }]}
        options={{
          plotOptions: { bar: { borderRadius: 4, columnWidth: '40%' } },
          yaxis: {
            labels: { formatter: (value: number) => `$${Math.round(value / 1000)}k` },
          },
          tooltip: { y: { formatter: (value: number) => formatCurrency(value) } },
        }}
      />

      <Card bordered header={{ content: 'Payroll runs', bordered: true }} bodyClass="p-0">
        <Table hoverable>
          <Table.THead>
            <Table.Tr>
              <Table.Th>Period</Table.Th>
              <Table.Th>Pay date</Table.Th>
              <Table.Th>Headcount</Table.Th>
              <Table.Th>Gross</Table.Th>
              <Table.Th>Deductions</Table.Th>
              <Table.Th>Net</Table.Th>
              <Table.Th>Status</Table.Th>
            </Table.Tr>
          </Table.THead>
          <Table.TBody>
            {payrollRuns.map((run) => (
              <Table.Tr key={run.id}>
                <Table.Td className="font-medium text-content">{run.period}</Table.Td>
                <Table.Td>{fmtDate(run.payDate)}</Table.Td>
                <Table.Td>{run.headcount}</Table.Td>
                <Table.Td>{formatCurrency(run.gross)}</Table.Td>
                <Table.Td>{formatCurrency(run.deductions)}</Table.Td>
                <Table.Td>{formatCurrency(run.net)}</Table.Td>
                <Table.Td>
                  <StatusTag tone={payrollStatusTone[run.status]}>{run.status}</StatusTag>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.TBody>
        </Table>
      </Card>
    </div>
  )
}
