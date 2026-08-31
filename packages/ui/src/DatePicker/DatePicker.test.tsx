import { describe, expect, it, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { DatePicker } from './DatePicker'

const september = new Date(2026, 8, 1)

describe('DatePicker', () => {
  it('opens a calendar and commits a selected date', async () => {
    const onChange = vi.fn()
    render(
      <DatePicker
        aria-label="Booking date"
        defaultMonth={september}
        placeholder="Pick a date"
        onChange={onChange}
      />,
    )

    await userEvent.click(screen.getByLabelText('Booking date'))
    expect(await screen.findByRole('dialog')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'September 10, 2026' }))

    expect(onChange).toHaveBeenCalledWith(new Date(2026, 8, 10))
    expect(screen.getByLabelText('Booking date')).toHaveValue('2026-09-10')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('clears the selected date', async () => {
    const onChange = vi.fn()
    render(
      <DatePicker
        aria-label="Booking date"
        defaultValue={new Date(2026, 8, 10)}
        onChange={onChange}
      />,
    )

    await userEvent.click(screen.getByRole('button', { name: 'Clear date' }))
    expect(onChange).toHaveBeenCalledWith(null)
    expect(screen.getByLabelText('Booking date')).toHaveValue('')
  })

  it('does not open when disabled', async () => {
    render(<DatePicker aria-label="Booking date" disabled />)
    await userEvent.click(screen.getByLabelText('Booking date'))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('allows typing a date when inputtable', async () => {
    const onChange = vi.fn()
    render(<DatePicker aria-label="Booking date" inputtable onChange={onChange} />)

    await userEvent.type(screen.getByLabelText('Booking date'), '2026-09-12')
    expect(onChange).toHaveBeenLastCalledWith(new Date(2026, 8, 12))
  })

  it('selects a date range', async () => {
    const onChange = vi.fn()
    render(
      <DatePicker.DatePickerRange
        aria-label="Trip dates"
        defaultMonth={september}
        onChange={onChange}
      />,
    )

    await userEvent.click(screen.getByLabelText('Trip dates'))
    await userEvent.click(screen.getByRole('button', { name: 'September 10, 2026' }))
    await userEvent.click(screen.getByRole('button', { name: 'September 12, 2026' }))

    expect(onChange).toHaveBeenLastCalledWith([new Date(2026, 8, 10), new Date(2026, 8, 12)])
    expect(screen.getByLabelText('Trip dates')).toHaveValue('2026-09-10 ~ 2026-09-12')
  })

  it('supports date time selection with TimeInput', async () => {
    const onChange = vi.fn()
    render(
      <DatePicker.DateTimepicker
        aria-label="Meeting time"
        defaultMonth={september}
        onChange={onChange}
      />,
    )

    await userEvent.click(screen.getByLabelText('Meeting time'))
    await userEvent.click(screen.getByRole('button', { name: 'September 10, 2026' }))
    const dialog = await screen.findByRole('dialog')
    await userEvent.clear(within(dialog).getByRole('textbox', { name: 'Hour' }))
    await userEvent.type(within(dialog).getByRole('textbox', { name: 'Hour' }), '09')
    await userEvent.clear(within(dialog).getByRole('textbox', { name: 'Minute' }))
    await userEvent.type(within(dialog).getByRole('textbox', { name: 'Minute' }), '30')
    await userEvent.click(within(dialog).getByRole('button', { name: 'ok' }))

    expect(onChange).toHaveBeenCalled()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('forwards ref to the input element', () => {
    const ref = vi.fn()
    render(<DatePicker aria-label="Booking date" ref={ref} />)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement))
  })

  it('has no axe violations', async () => {
    const { baseElement } = render(
      <main>
        <DatePicker.DatePickerRange
          aria-label="Trip dates"
          defaultOpen
          defaultMonth={september}
          defaultValue={[new Date(2026, 8, 10), new Date(2026, 8, 12)]}
        />
      </main>,
    )
    expect(await axe(baseElement)).toHaveNoViolations()
  })
})
