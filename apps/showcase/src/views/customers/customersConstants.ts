import type { StatusTone } from '@/components/shared/StatusTag'
import type { CustomerStatus, LeadStage, TicketPriority, TicketStatus } from '@/mock/customers'

export const customerStatusTone: Record<CustomerStatus, StatusTone> = {
  active: 'success',
  inactive: 'warning',
  churned: 'error',
}

export const leadStageTone: Record<LeadStage, StatusTone> = {
  new: 'neutral',
  contacted: 'info',
  qualified: 'warning',
  proposal: 'warning',
  won: 'success',
  lost: 'error',
}

export const leadStageLabel: Record<LeadStage, string> = {
  new: 'New',
  contacted: 'Contacted',
  qualified: 'Qualified',
  proposal: 'Proposal',
  won: 'Won',
  lost: 'Lost',
}

export const ticketStatusTone: Record<TicketStatus, StatusTone> = {
  open: 'warning',
  pending: 'info',
  resolved: 'success',
}

export const ticketPriorityTone: Record<TicketPriority, StatusTone> = {
  low: 'neutral',
  medium: 'info',
  high: 'warning',
  urgent: 'error',
}
