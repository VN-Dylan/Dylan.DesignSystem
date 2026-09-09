import type { ReactNode } from 'react'
import { Button, Card, Reveal, Stagger } from '@vn-dylan/ui'
import { Icon, TbIcons } from '@vn-dylan/icons'
import { runMarketingAction, type MarketingAction } from './actions'

export interface PricingPlan {
  name: string
  price: ReactNode
  period?: string
  description?: string
  features: string[]
  cta: MarketingAction
  featured?: boolean
}

export interface PricingTableProps {
  plans: PricingPlan[]
}

/**
 * Responsive pricing comparison for marketing pages, with a lifted featured
 * plan and token-only card styling.
 */
export function PricingTable({ plans }: PricingTableProps) {
  return (
    <Reveal>
      <Stagger className="grid gap-4 md:grid-cols-3">
        {plans.map((plan) => (
          <Stagger.Item key={plan.name}>
            <Card
              bordered
              className={
                plan.featured ? 'h-full border-primary shadow-lg ring-2 ring-primary' : 'h-full'
              }
              bodyClass="flex h-full flex-col p-5"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-content">{plan.name}</h3>
                    {plan.description && (
                      <p className="mt-1 text-sm text-content-muted">{plan.description}</p>
                    )}
                  </div>
                  {plan.featured && (
                    <span className="rounded-full bg-primary-subtle px-3 py-1 text-xs font-medium text-primary">
                      Popular
                    </span>
                  )}
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold tracking-tight text-content">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="pb-1 text-sm text-content-muted">{plan.period}</span>
                  )}
                </div>
              </div>

              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-2 text-sm text-content-muted">
                    <Icon as={TbIcons.TbCheck} className="mt-1 shrink-0 text-success" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="mt-6"
                variant={plan.featured ? 'solid' : 'default'}
                block
                onClick={() => runMarketingAction(plan.cta)}
              >
                {plan.cta.label}
              </Button>
            </Card>
          </Stagger.Item>
        ))}
      </Stagger>
    </Reveal>
  )
}
