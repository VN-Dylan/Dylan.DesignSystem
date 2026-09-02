import { Button, Card, Table } from '@vn-dylan/ui'
import { Icon, TbIcons } from '@vn-dylan/icons'
import { formatNumber, formatRelativeTime } from '@vn-dylan/utils'
import { PageHeader } from '@/components/shared/PageHeader'
import { KpiCard } from '@/components/shared/KpiCard'
import { StatusTag } from '@/components/shared/StatusTag'
import { reports } from '@/mock/analytics'

const scheduledReports = reports.filter((report) => report.schedule !== 'Manual').length

/** Saved analytics reports screen with schedule summary and row actions. */
export function ReportsView() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        description="Scheduled exports and recurring analytics packs."
        actions={
          <Button variant="solid" icon={<Icon as={TbIcons.TbPlus} size={16} />}>
            New report
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <KpiCard
          label="Total reports"
          value={formatNumber(reports.length, 0)}
          icon={<Icon as={TbIcons.TbReportAnalytics} size={18} />}
        />
        <KpiCard
          label="Scheduled"
          value={formatNumber(scheduledReports, 0)}
          icon={<Icon as={TbIcons.TbCalendarTime} size={18} />}
        />
        <KpiCard
          label="Manual"
          value={formatNumber(reports.length - scheduledReports, 0)}
          icon={<Icon as={TbIcons.TbHandClick} size={18} />}
        />
      </div>

      <Card bordered header={{ content: 'Report library', bordered: true }} bodyClass="p-0">
        <Table hoverable>
          <Table.THead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Owner</Table.Th>
              <Table.Th>Schedule</Table.Th>
              <Table.Th>Format</Table.Th>
              <Table.Th>Last run</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.THead>
          <Table.TBody>
            {reports.map((report) => (
              <Table.Tr key={report.id}>
                <Table.Td className="font-medium text-content">{report.name}</Table.Td>
                <Table.Td>{report.owner}</Table.Td>
                <Table.Td>{report.schedule}</Table.Td>
                <Table.Td>
                  <StatusTag tone="neutral">{report.format}</StatusTag>
                </Table.Td>
                <Table.Td>{formatRelativeTime(report.lastRun)}</Table.Td>
                <Table.Td>
                  <div className="flex items-center gap-2">
                    <Button
                      size="xs"
                      aria-label={`Run ${report.name}`}
                      title="Run"
                      icon={<Icon as={TbIcons.TbPlayerPlay} size={14} />}
                    />
                    <Button
                      size="xs"
                      aria-label={`Download ${report.name}`}
                      title="Download"
                      icon={<Icon as={TbIcons.TbDownload} size={14} />}
                    />
                    <Button
                      size="xs"
                      aria-label={`Edit ${report.name}`}
                      title="Edit"
                      icon={<Icon as={TbIcons.TbEdit} size={14} />}
                    />
                  </div>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.TBody>
        </Table>
      </Card>
    </div>
  )
}
