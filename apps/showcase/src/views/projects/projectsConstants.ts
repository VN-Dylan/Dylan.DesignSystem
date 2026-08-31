import type { StatusTone } from '@/components/shared/StatusTag'
import type { ProjectStatus, TaskPriority, TaskStatus } from '@/mock/projects'

export const projectStatusTone: Record<ProjectStatus, StatusTone> = {
  'on-track': 'success',
  'at-risk': 'warning',
  delayed: 'error',
  completed: 'info',
}

export const projectStatusLabel: Record<ProjectStatus, string> = {
  'on-track': 'On track',
  'at-risk': 'At risk',
  delayed: 'Delayed',
  completed: 'Completed',
}

export const taskPriorityTone: Record<TaskPriority, StatusTone> = {
  low: 'neutral',
  medium: 'info',
  high: 'warning',
  urgent: 'error',
}

export const taskStatusTone: Record<TaskStatus, StatusTone> = {
  backlog: 'neutral',
  'in-progress': 'warning',
  review: 'info',
  done: 'success',
}

export const taskStatusLabel: Record<TaskStatus, string> = {
  backlog: 'Backlog',
  'in-progress': 'In progress',
  review: 'Review',
  done: 'Done',
}
