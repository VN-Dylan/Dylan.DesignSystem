import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { GanttChart } from './GanttChart'

const tasks = [
  { id: '1', name: 'Research', start: '2026-01-05', end: '2026-01-09', progress: 100 },
  { id: '2', name: 'Design', start: '2026-01-08', end: '2026-01-15', progress: 50 },
]

describe('GanttChart', () => {
  it('renders a row per task', () => {
    render(<GanttChart tasks={tasks} />)
    expect(screen.getByRole('rowheader', { name: 'Research' })).toBeInTheDocument()
    expect(screen.getByRole('rowheader', { name: 'Design' })).toBeInTheDocument()
  })

  it('positions bars within the shared date window', () => {
    const { container } = render(<GanttChart tasks={tasks} />)
    const bars = container.querySelectorAll('.dyl-gantt__bar')
    expect(bars).toHaveLength(2)
    expect((bars[0] as HTMLElement).style.left).toBe('0%')
  })

  it('renders nothing to lay out with no tasks', () => {
    render(<GanttChart tasks={[]} />)
    expect(screen.getByRole('table', { name: 'Project timeline' })).toBeInTheDocument()
  })

  it('has no axe violations', async () => {
    const { container } = render(<GanttChart tasks={tasks} />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
