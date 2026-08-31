import type { StatusTone } from '@/components/shared/StatusTag'
import type { AttendanceState, EmployeeStatus, LeaveStatus, PayrollRun } from '@/mock/hrm'

export const employeeStatusTone: Record<EmployeeStatus, StatusTone> = {
  active: 'success',
  'on-leave': 'info',
  probation: 'warning',
  notice: 'error',
}

export const employeeStatusLabel: Record<EmployeeStatus, string> = {
  active: 'Active',
  'on-leave': 'On leave',
  probation: 'Probation',
  notice: 'Notice',
}

export const leaveStatusTone: Record<LeaveStatus, StatusTone> = {
  pending: 'warning',
  approved: 'success',
  rejected: 'error',
}

export const payrollStatusTone: Record<PayrollRun['status'], StatusTone> = {
  paid: 'success',
  processing: 'info',
  draft: 'neutral',
}

export const attendanceStateClass: Record<AttendanceState, string> = {
  present: 'bg-success-subtle text-success',
  remote: 'bg-info-subtle text-info',
  leave: 'bg-warning-subtle text-warning',
  absent: 'bg-error-subtle text-error',
}
