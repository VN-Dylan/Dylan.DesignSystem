import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Avatar, Button, Card, EmptyState, Input, Timeline } from '@vn-dylan/ui'
import { Icon, TbIcons } from '@vn-dylan/icons'
import { formatCurrency, formatNumber, formatRelativeTime } from '@vn-dylan/utils'
import { KpiCard } from '@/components/shared/KpiCard'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatusTag } from '@/components/shared/StatusTag'
import { getCustomer, type Customer } from '@/mock/customers'
import { customerStatusTone } from './customersConstants'

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  })

const getActivity = (customer: Customer) => [
  {
    title: `Placed order #NT-${customer.orders + 1040}`,
    time: customer.lastSeen,
  },
  {
    title: customer.status === 'churned' ? 'Closed renewal discussion' : 'Renewed subscription',
    time: customer.status === 'churned' ? '2026-03-21' : '2026-08-12',
  },
  {
    title: 'Opened a ticket',
    time: '2026-08-04',
  },
]

/** Customer account overview with contact details, activity and notes. */
export function CustomerOverviewView() {
  const navigate = useNavigate()
  const { id } = useParams()
  const customer = id ? getCustomer(id) : undefined
  const activity = useMemo(() => (customer ? getActivity(customer) : []), [customer])

  if (!customer) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Customer not found"
          description="The requested account does not exist in the mock dataset."
        />
        <Card bordered>
          <EmptyState size={220}>
            <div className="space-y-3 text-center">
              <p className="font-medium text-content">Customer not found</p>
              <Button onClick={() => navigate('/customers/list')}>Back to customers</Button>
            </div>
          </EmptyState>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={customer.name}
        description={`${customer.company} account profile, commercial value and recent touchpoints.`}
        actions={
          <>
            <Avatar size={34} shape="circle" src={customer.avatar} alt={customer.name} />
            <StatusTag tone={customerStatusTone[customer.status]}>{customer.status}</StatusTag>
            <Button icon={<Icon as={TbIcons.TbMessage} size={16} />} onClick={() => undefined}>
              Message
            </Button>
            <Button
              icon={<Icon as={TbIcons.TbArrowLeft} size={16} />}
              onClick={() => navigate('/customers/list')}
            >
              Back
            </Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="LTV" value={formatCurrency(customer.ltv)} />
        <KpiCard label="Orders" value={formatNumber(customer.orders, 0)} />
        <KpiCard label="Customer since" value={fmtDate(customer.since)} />
        <KpiCard label="Last seen" value={formatRelativeTime(customer.lastSeen)} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Card bordered header={{ content: 'Contact', bordered: true }} bodyClass="p-4">
            <dl className="grid gap-4 sm:grid-cols-3">
              {[
                ['Email', customer.email],
                ['Phone', customer.phone],
                ['Location', customer.location],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-xs font-medium uppercase text-content-muted">{label}</dt>
                  <dd className="mt-1 text-sm text-content">{value}</dd>
                </div>
              ))}
            </dl>
          </Card>

          <Card bordered header={{ content: 'Activity', bordered: true }} bodyClass="p-4">
            <Timeline>
              {activity.map((item) => (
                <Timeline.Item key={item.title}>
                  <p className="font-medium text-content">{item.title}</p>
                  <p className="text-sm text-content-muted">{formatRelativeTime(item.time)}</p>
                </Timeline.Item>
              ))}
            </Timeline>
          </Card>
        </div>

        <Card bordered header={{ content: 'Notes', bordered: true }} bodyClass="space-y-3 p-4">
          <Input
            textArea
            rows={8}
            value={`${customer.company} prefers quarterly business reviews and concise rollout summaries.`}
            readOnly
            aria-label="Customer notes"
          />
          <Button disabled>Save</Button>
        </Card>
      </div>
    </div>
  )
}
