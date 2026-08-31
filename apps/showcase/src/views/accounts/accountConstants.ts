import type { StatusTone } from '@/components/shared/StatusTag'
import type { ActivityType, Invoice, Referee, TeamMember } from '@/mock/account'

export const invoiceStatusTone: Record<Invoice['status'], StatusTone> = {
  paid: 'success',
  due: 'warning',
  void: 'neutral',
}

export const refereeStatusTone: Record<Referee['status'], StatusTone> = {
  invited: 'neutral',
  'signed-up': 'info',
  converted: 'success',
}

export const teamStatusTone: Record<TeamMember['status'], StatusTone> = {
  active: 'success',
  invited: 'info',
  suspended: 'error',
}

export const activityTypeTone: Record<ActivityType, StatusTone> = {
  auth: 'info',
  billing: 'warning',
  settings: 'neutral',
  content: 'success',
  team: 'info',
}

export const fmtDate = (iso: string) =>
  iso === '—'
    ? '—'
    : new Date(iso).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        timeZone: 'UTC',
      })
