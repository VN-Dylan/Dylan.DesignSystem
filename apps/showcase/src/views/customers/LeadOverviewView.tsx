import { useNavigate, useParams } from 'react-router-dom'
import { Button, Card, EmptyState, Table } from '@vn-dylan/ui'
import { Icon, TbIcons } from '@vn-dylan/icons'
import { formatCurrency } from '@vn-dylan/utils'
import { KpiCard } from '@/components/shared/KpiCard'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatusTag } from '@/components/shared/StatusTag'
import { getLead, leadStageOrder, type LeadStage } from '@/mock/customers'
import { leadStageLabel, leadStageTone } from './customersConstants'

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  })

const getStageClass = (stage: LeadStage, current: LeadStage) => {
  if (stage === current) return 'border-primary bg-primary text-primary-fg'
  if (current === 'won' && stage !== 'lost') return 'border-success bg-success-subtle text-success'
  if (current === 'lost' && stage === 'lost') return 'border-error bg-error-subtle text-error'
  return 'border-border bg-surface-sunken text-content-muted'
}

/** Lead overview with stage status, commercial detail and pipeline progress. */
export function LeadOverviewView() {
  const navigate = useNavigate()
  const { id } = useParams()
  const lead = id ? getLead(id) : undefined

  if (!lead) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Lead not found"
          description="The requested lead is not in the pipeline."
        />
        <Card bordered>
          <EmptyState size={220}>
            <div className="space-y-3 text-center">
              <p className="font-medium text-content">Lead not found</p>
              <Button onClick={() => navigate('/customers/leads')}>Back to leads</Button>
            </div>
          </EmptyState>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={lead.name}
        description={lead.company}
        actions={
          <>
            <StatusTag tone={leadStageTone[lead.stage]}>{leadStageLabel[lead.stage]}</StatusTag>
            <Button icon={<Icon as={TbIcons.TbArrowUpRight} size={16} />} onClick={() => undefined}>
              Advance stage
            </Button>
            <Button
              icon={<Icon as={TbIcons.TbArrowLeft} size={16} />}
              onClick={() => navigate('/customers/leads')}
            >
              Back
            </Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Value" value={formatCurrency(lead.value)} />
        <KpiCard label="Owner" value={lead.owner} />
        <KpiCard label="Source" value={lead.source} />
        <KpiCard label="Created" value={fmtDate(lead.created)} />
      </div>

      <Card
        bordered
        header={{ content: 'Opportunity detail', bordered: true }}
        bodyClass="space-y-5 p-4"
      >
        <p className="text-sm leading-6 text-content-muted">{lead.note}</p>

        <Table>
          <Table.TBody>
            {[
              ['Email', lead.email],
              ['Owner', lead.owner],
              ['Source', lead.source],
              ['Stage', leadStageLabel[lead.stage]],
              ['Created', fmtDate(lead.created)],
            ].map(([label, value]) => (
              <Table.Tr key={label}>
                <Table.Td className="font-medium text-content-muted">{label}</Table.Td>
                <Table.Td>{value}</Table.Td>
              </Table.Tr>
            ))}
          </Table.TBody>
        </Table>

        <div className="grid gap-2 sm:grid-cols-3 xl:grid-cols-6">
          {leadStageOrder.map((stage) => (
            <div
              key={stage}
              className={`rounded-md border px-3 py-2 text-center text-xs font-medium ${getStageClass(
                stage,
                lead.stage,
              )}`}
            >
              {leadStageLabel[stage]}
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
