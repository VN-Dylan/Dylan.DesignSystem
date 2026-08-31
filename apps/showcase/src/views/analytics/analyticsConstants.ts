import type { StatusTone } from '@/components/shared/StatusTag'
import type { Plan, Subscription } from '@/mock/analytics'

export const subscriptionStatusTone: Record<Subscription['status'], StatusTone> = {
  active: 'success',
  trialing: 'info',
  'past-due': 'warning',
  cancelled: 'error',
}

export const subscriptionStatusLabel: Record<Subscription['status'], string> = {
  active: 'Active',
  trialing: 'Trialing',
  'past-due': 'Past due',
  cancelled: 'Cancelled',
}

export const planTone: Record<Plan, StatusTone> = {
  Free: 'neutral',
  Pro: 'info',
  Team: 'warning',
  Enterprise: 'success',
}
