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

  it('gives one day a tab stop and roves focus with the arrow keys', async () => {
    const user = userEvent.setup()
    render(<Calendar defaultMonth={september} value={new Date(2026, 8, 10)} />)

    const selected = screen.getByRole('button', { name: 'September 10, 2026' })
    expect(selected).toHaveAttribute('tabindex', '0')
    expect(screen.getByRole('button', { name: 'September 11, 2026' })).toHaveAttribute(
      'tabindex',
      '-1',
    )

    selected.focus()
    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('button', { name: 'September 11, 2026' })).toHaveFocus()

    await user.keyboard('{ArrowDown}')
    expect(screen.getByRole('button', { name: 'September 18, 2026' })).toHaveFocus()

    await user.keyboard('{ArrowUp}{ArrowLeft}')
    expect(screen.getByRole('button', { name: 'September 10, 2026' })).toHaveFocus()
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

  describe('month / year picker views', () => {
    it('the header label steps date → month → year, and a pick steps back down', async () => {
      const user = userEvent.setup()
      render(<Calendar defaultMonth={september} />)

      // date -> month
      await user.click(screen.getByRole('button', { name: 'September 2026' }))
      expect(screen.getByRole('button', { name: '2026' })).toBeInTheDocument()
      expect(screen.getByRole('group', { name: 'Months' })).toBeInTheDocument()
      expect(screen.queryByRole('button', { name: 'September 10, 2026' })).not.toBeInTheDocument()

      // month -> year
      await user.click(screen.getByRole('button', { name: '2026' }))
      expect(screen.getByRole('button', { name: '2016–2027' })).toBeInTheDocument()
      expect(screen.getByRole('group', { name: 'Years' })).toBeInTheDocument()

      // pick a year -> drops to month view for that year
      await user.click(screen.getByRole('button', { name: '2020' }))
      expect(screen.getByRole('button', { name: '2020' })).toBeInTheDocument()
      expect(screen.getByRole('group', { name: 'Months' })).toBeInTheDocument()

      // pick a month -> drops to date view for that month
      await user.click(screen.getByRole('button', { name: 'Mar' }))
      expect(screen.getByRole('button', { name: 'March 2020' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'March 10, 2020' })).toBeInTheDocument()
    })

    it('prev/next page by year in month view and by 12 years in year view', async () => {
      const user = userEvent.setup()
      render(<Calendar defaultMonth={september} defaultView="month" />)

      expect(screen.getByRole('button', { name: '2026' })).toBeInTheDocument()
      await user.click(screen.getByRole('button', { name: 'Next year' }))
      expect(screen.getByRole('button', { name: '2027' })).toBeInTheDocument()

      await user.click(screen.getByRole('button', { name: '2027' }))
      expect(screen.getByRole('button', { name: '2016–2027' })).toBeInTheDocument()
      await user.click(screen.getByRole('button', { name: 'Next 12 years' }))
      expect(screen.getByRole('button', { name: '2028–2039' })).toBeInTheDocument()
    })

    it('marks the selected month/year and disables the label at the top of the hierarchy', async () => {
      render(<Calendar defaultMonth={september} defaultView="year" value={new Date(2026, 8, 10)} />)

      expect(screen.getByRole('button', { name: '2026' })).toHaveAttribute('data-selected')
      expect(screen.getByRole('button', { name: '2016–2027' })).toBeDisabled()
    })

    it('enableHeaderLabel=false disables the label but keeps prev/next', async () => {
      const user = userEvent.setup()
      render(<Calendar defaultMonth={september} enableHeaderLabel={false} />)

      expect(screen.getByRole('button', { name: 'September 2026' })).toBeDisabled()
      await user.click(screen.getByRole('button', { name: 'Next month' }))
      expect(screen.getByRole('button', { name: 'October 2026' })).toBeInTheDocument()
    })

    it('roves focus with the arrow keys in the month grid', async () => {
      const user = userEvent.setup()
      render(<Calendar defaultMonth={september} defaultView="month" />)

      const sep = screen.getByRole('button', { name: 'Sep' })
      expect(sep).toHaveAttribute('tabindex', '0')
      sep.focus()
      await user.keyboard('{ArrowRight}')
      expect(screen.getByRole('button', { name: 'Oct' })).toHaveFocus()
      await user.keyboard('{ArrowDown}')
      expect(screen.getByRole('button', { name: 'Dec' })).not.toHaveFocus() // out of bounds, no-op
      expect(screen.getByRole('button', { name: 'Oct' })).toHaveFocus()
      await user.keyboard('{ArrowLeft}{ArrowDown}')
      expect(screen.getByRole('button', { name: 'Dec' })).toHaveFocus()
    })
  })
})
