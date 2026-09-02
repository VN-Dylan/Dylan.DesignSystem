import { useState } from 'react'
import { Button, Card, Segment } from '@vn-dylan/ui'
import { Icon, TbIcons } from '@vn-dylan/icons'
import { formatCurrency } from '@vn-dylan/utils'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatusTag } from '@/components/shared/StatusTag'
import { plans, type Plan } from '@/mock/account'

const displayPrice = (plan: Plan, billingPeriod: 'monthly' | 'yearly') => {
  if (plan.id === 'enterprise') return 'Custom'
  if (plan.id === 'free') return '$0'
  const price = billingPeriod === 'yearly' ? plan.price * 10 : plan.price
  return `${formatCurrency(price)}/${billingPeriod === 'yearly' ? 'yr' : plan.cadence}`
}

/** Plan comparison screen with monthly and yearly price display. */
export function PricingView() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')

  return (
    <div className="space-y-6">
      <PageHeader
        title="Plans & pricing"
        description="Compare workspace plans and billing cadence."
        actions={
          <Segment
            value={billingPeriod}
            onChange={(value) => setBillingPeriod(String(value) as 'monthly' | 'yearly')}
            size="sm"
            aria-label="Billing period"
          >
            <Segment.Item value="monthly">Monthly</Segment.Item>
            <Segment.Item value="yearly">Yearly</Segment.Item>
          </Segment>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            bordered
            className={plan.highlighted ? 'border-primary ring-1 ring-primary' : undefined}
            bodyClass="flex h-full flex-col p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-content">{plan.name}</h2>
                <p className="mt-1 text-sm text-content-muted">{plan.tagline}</p>
              </div>
              {plan.highlighted && <StatusTag tone="info">Popular</StatusTag>}
            </div>
            <div className="mt-5">
              <p className="text-3xl font-semibold tracking-tight text-content">
                {displayPrice(plan, billingPeriod)}
              </p>
              {billingPeriod === 'yearly' && plan.price > 0 && (
                <p className="mt-1 text-xs text-success">2 months free</p>
              )}
            </div>
            <ul className="mt-5 flex-1 space-y-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex gap-2 text-sm text-content-muted">
                  <Icon as={TbIcons.TbCheck} size={16} className="mt-0.5 shrink-0 text-success" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Button
              className="mt-6"
              variant={plan.highlighted ? 'solid' : 'default'}
              disabled={plan.current}
              icon={
                <Icon
                  as={plan.id === 'enterprise' ? TbIcons.TbMessage : TbIcons.TbArrowUpRight}
                  size={16}
                />
              }
            >
              {plan.current
                ? 'Current plan'
                : plan.id === 'enterprise'
                  ? 'Contact sales'
                  : 'Upgrade'}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
