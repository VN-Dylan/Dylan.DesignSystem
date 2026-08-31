import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { Calendar, RangeCalendar } from './Calendar'

const september = new Date(2026, 8, 1)

describe('Calendar', () => {
  it('renders a real month grid and navigates months', async () => {
    render(<Calendar defaultMonth={september} />)

    expect(screen.getByRole('button', { name: 'September 2026' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'September 10, 2026' })).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'Next month' }))
    expect(screen.getByRole('button', { name: 'October 2026' })).toBeInTheDocument()
  })

  it('selects a single date and forwards ref', async () => {
    const onChange = vi.fn()
    const ref = vi.fn()

    render(<Calendar ref={ref} defaultMonth={september} onChange={onChange} />)
    await userEvent.click(screen.getByRole('button', { name: 'September 10, 2026' }))

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange.mock.calls[0]![0]).toEqual(new Date(2026, 8, 10))
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement))
  })

  it('honors disabledDate and min/max constraints', async () => {
    const onChange = vi.fn()
    render(
      <Calendar
        defaultMonth={september}
        disabledDate={(date) => date.getDate() === 10}
        minDate={new Date(2026, 8, 5)}
        maxDate={new Date(2026, 8, 20)}
        onChange={onChange}
      />,
    )

    expect(screen.getByRole('button', { name: 'September 4, 2026' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'September 10, 2026' })).toBeDisabled()
    await userEvent.click(screen.getByRole('button', { name: 'September 12, 2026' }))
    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it('supports multiple date selection', async () => {
    const onChange = vi.fn()
    render(<Calendar defaultMonth={september} multipleSelection onChange={onChange} />)

    await userEvent.click(screen.getByRole('button', { name: 'September 8, 2026' }))
    await userEvent.click(screen.getByRole('button', { name: 'September 9, 2026' }))

    expect(onChange).toHaveBeenLastCalledWith([new Date(2026, 8, 8), new Date(2026, 8, 9)])
  })

  it('selects a date range', async () => {
    const onChange = vi.fn()
    render(<RangeCalendar defaultMonth={september} onChange={onChange} />)

    await userEvent.click(screen.getByRole('button', { name: 'September 8, 2026' }))
    await userEvent.click(screen.getByRole('button', { name: 'September 12, 2026' }))

    expect(onChange).toHaveBeenLastCalledWith([new Date(2026, 8, 8), new Date(2026, 8, 12)])
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <RangeCalendar
        defaultMonth={september}
        value={[new Date(2026, 8, 8), new Date(2026, 8, 12)]}
      />,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
