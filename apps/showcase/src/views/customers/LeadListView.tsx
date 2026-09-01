import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge, Button, Card } from '@dylan-ds/ui'
import { Icon, TbIcons } from '@dylan-ds/icons'
import { formatCurrency, formatNumber } from '@dylan-ds/utils'
import { KpiCard } from '@/components/shared/KpiCard'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatusTag } from '@/components/shared/StatusTag'
import { leadStageOrder, leads, type LeadStage } from '@/mock/customers'
import { leadStageLabel } from './customersConstants'

const openStages: LeadStage[] = ['new', 'contacted', 'qualified', 'proposal']

/** Kanban pipeline grouped by lead stage with account value cards. */
export function LeadListView() {
  const navigate = useNavigate()
  const summary = useMemo(() => {
    const won = leads.filter((lead) => lead.stage === 'won').length
    const lost = leads.filter((lead) => lead.stage === 'lost').length
    const openValue = leads
      .filter((lead) => openStages.includes(lead.stage))
      .reduce((sum, lead) => sum + lead.value, 0)
    return {
      openValue,
      winRate: won + lost === 0 ? 0 : Math.round((won / (won + lost)) * 100),
    }
  }, [])

  return (
    <div className="space-y-6">
      <PageHeader
        title="Leads"
        description="Pipeline cards by stage, owner and estimated value."
        actions={
          <Button
            variant="solid"
            icon={<Icon as={TbIcons.TbPlus} size={16} />}
            onClick={() => undefined}
          >
            New lead
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <KpiCard label="Open pipeline" value={formatCurrency(summary.openValue)} />
        <KpiCard label="Win rate" value={`${formatNumber(summary.winRate, 0)}%`} />
      </div>

      <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
        {leadStageOrder.map((stage) => {
          const stageLeads = leads.filter((lead) => lead.stage === stage)
          return (
            <Card
              key={stage}
              bordered
              header={{
                content: leadStageLabel[stage],
                bordered: true,
                extra: <Badge content={stageLeads.length} />,
              }}
              bodyClass="space-y-3 p-3"
            >
              {stageLeads.length === 0 ? (
                <p className="rounded-md border border-border bg-surface-sunken p-3 text-sm text-content-muted">
                  No leads in this stage.
                </p>
              ) : (
                stageLeads.map((lead) => (
                  <Card
                    key={lead.id}
                    bordered
                    clickable
                    bodyClass="space-y-3 p-3"
                    onClick={() => navigate(`/customers/leads/${lead.id}/overview`)}
                  >
                    <div>
                      <h2 className="text-sm font-semibold text-content">{lead.name}</h2>
                      <p className="text-xs text-content-muted">{lead.company}</p>
                    </div>
                    <p className="font-medium text-content">{formatCurrency(lead.value)}</p>
                    <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 text-xs text-content-muted">
                      <span className="truncate">{lead.owner}</span>
                      <StatusTag tone="neutral">{lead.source}</StatusTag>
                    </div>
                  </Card>
                ))
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
