import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { AvailabilityCalendar } from './AvailabilityCalendar'

const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate())

const addDays = (date: Date, amount: number) => {
  const next = new Date(date)
  next.setDate(next.getDate() + amount)
  return startOfDay(next)
}

const addMonths = (date: Date, amount: number) => {
  const next = new Date(date.getFullYear(), date.getMonth(), 1)
  next.setMonth(next.getMonth() + amount)
  return next
}

const formatMonthLabel = (date: Date) =>
  new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(date)

const formatDayLabel = (date: Date) =>
  new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)

const setupDesktop = () => {
  Object.defineProperty(window, 'innerWidth', { configurable: true, writable: true, value: 1024 })
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: query.includes('768'),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
  window.dispatchEvent(new Event('resize'))
}

describe('AvailabilityCalendar', () => {
  beforeEach(() => {
    setupDesktop()
  })

  it('renders two month panels at desktop width', () => {
    const month = startOfDay(new Date())
    render(<AvailabilityCalendar />)
    expect(screen.getByRole('button', { name: formatMonthLabel(month) })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: formatMonthLabel(addMonths(month, 1)) }),
    ).toBeInTheDocument()
  })

  it('selects check-in then check-out and emits the ordered pair', async () => {
    const today = startOfDay(new Date())
    const start = addDays(today, 4)
    const end = addDays(today, 2)
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<AvailabilityCalendar minDate={today} onChange={onChange} />)

    await user.click(screen.getByRole('button', { name: formatDayLabel(start) }))
    await user.click(screen.getByRole('button', { name: formatDayLabel(end) }))

    expect(onChange).toHaveBeenLastCalledWith([end, start])
  })

  it('does not select a blocked date', async () => {
    const today = startOfDay(new Date())
    const blockedDate = addDays(today, 3)
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <AvailabilityCalendar minDate={today} blockedDates={[blockedDate]} onChange={onChange} />,
    )

    const blocked = screen.getByRole('button', { name: formatDayLabel(blockedDate) })
    expect(blocked).toBeDisabled()
    await user.click(blocked)
    expect(onChange).not.toHaveBeenCalled()
  })

  it('keeps the start selected and shows a hint when the range is too short', async () => {
    const today = startOfDay(new Date())
    const start = addDays(today, 3)
    const end = addDays(today, 5)
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<AvailabilityCalendar minDate={today} minNights={3} onChange={onChange} />)

    await user.click(screen.getByRole('button', { name: formatDayLabel(start) }))
    await user.click(screen.getByRole('button', { name: formatDayLabel(end) }))

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenLastCalledWith([start, null])
    expect(screen.getByRole('status')).toHaveTextContent('Minimum stay is 3 nights')
    expect(screen.getByRole('button', { name: formatDayLabel(start) })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
  })

  it('prevents a range from spanning a blocked night', () => {
    const today = startOfDay(new Date())
    const start = addDays(today, 3)
    const blockedDate = addDays(today, 5)
    const candidateEnd = addDays(today, 7)
    render(
      <AvailabilityCalendar
        minDate={today}
        defaultValue={[start, null]}
        blockedDates={[blockedDate]}
      />,
    )

    expect(screen.getByRole('button', { name: formatDayLabel(candidateEnd) })).toBeDisabled()
  })

  it('reflects the summed nightly price in the footer', () => {
    const today = startOfDay(new Date())
    const start = addDays(today, 2)
    const middle = addDays(today, 3)
    const end = addDays(today, 5)
    render(
      <AvailabilityCalendar
        minDate={today}
        defaultValue={[start, end]}
        priceForDate={(date) => (date.getTime() === middle.getTime() ? 150 : 100)}
        currency="USD"
        locale="en-US"
      />,
    )

    expect(screen.getByText('$350')).toBeInTheDocument()
  })

  it('forwards ref to the wrapper element', () => {
    const ref = vi.fn()
    render(<AvailabilityCalendar ref={ref} />)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement))
  })

  it('has no axe violations', async () => {
    const today = startOfDay(new Date())
    const { container } = render(
      <AvailabilityCalendar
        minDate={today}
        defaultValue={[addDays(today, 2), addDays(today, 5)]}
        priceForDate={() => 100}
      />,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
