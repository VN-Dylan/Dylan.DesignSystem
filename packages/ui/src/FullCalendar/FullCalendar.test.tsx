import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { FullCalendar } from './FullCalendar'

const month = new Date(2026, 0, 1)
const day = (n: number) => new Date(2026, 0, n)

describe('FullCalendar', () => {
  it('renders the month title and a 6-week grid', () => {
    render(<FullCalendar defaultMonth={month} />)
    expect(screen.getByRole('heading', { name: 'January 2026' })).toBeInTheDocument()
    expect(screen.getAllByRole('gridcell')).toHaveLength(42)
  })

  it('navigates between months', async () => {
    const onMonthChange = vi.fn()
    render(<FullCalendar defaultMonth={month} onMonthChange={onMonthChange} />)
    await userEvent.click(screen.getByRole('button', { name: 'Next month' }))
    expect(screen.getByRole('heading', { name: 'February 2026' })).toBeInTheDocument()
    expect(onMonthChange).toHaveBeenCalled()
  })

  it('shows events on their day and fires onEventClick', async () => {
    const onEventClick = vi.fn()
    render(
      <FullCalendar
        defaultMonth={month}
        events={[{ id: 'e1', title: 'Launch', start: day(10) }]}
        onEventClick={onEventClick}
      />,
    )
    await userEvent.click(screen.getByText('Launch'))
    expect(onEventClick).toHaveBeenCalledWith(expect.objectContaining({ id: 'e1' }))
  })

  it('fires onDateClick', async () => {
    const onDateClick = vi.fn()
    render(<FullCalendar defaultMonth={month} onDateClick={onDateClick} />)
    await userEvent.click(screen.getByRole('gridcell', { name: /15/ }))
    expect(onDateClick).toHaveBeenCalled()
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <FullCalendar defaultMonth={month} events={[{ id: 'e', title: 'X', start: day(3) }]} />,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
