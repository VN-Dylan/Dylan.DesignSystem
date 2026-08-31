import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { TimeInput } from './TimeInput'

const dateAt = (hour: number, minute: number, second = 0) => {
  const date = new Date(2026, 0, 1)
  date.setHours(hour, minute, second, 0)
  return date
}

describe('TimeInput', () => {
  it('renders hour and minute fields from a date', () => {
    render(<TimeInput defaultValue={dateAt(9, 30)} />)
    expect(screen.getByRole('textbox', { name: 'Hour' })).toHaveValue('09')
    expect(screen.getByRole('textbox', { name: 'Minute' })).toHaveValue('30')
  })

  it('updates time fields and calls onChange', async () => {
    const onChange = vi.fn()
    render(<TimeInput defaultValue={dateAt(9, 30)} onChange={onChange} />)
    const minute = screen.getByRole('textbox', { name: 'Minute' })
    await userEvent.clear(minute)
    await userEvent.type(minute, '45')
    expect(onChange).toHaveBeenLastCalledWith(expect.any(Date))
    expect((onChange.mock.lastCall?.[0] as Date).getMinutes()).toBe(45)
  })

  it('supports seconds and 12 hour period', async () => {
    const onChange = vi.fn()
    render(
      <TimeInput defaultValue={dateAt(13, 5, 20)} showSeconds format="12" onChange={onChange} />,
    )
    expect(screen.getByRole('textbox', { name: 'Hour' })).toHaveValue('01')
    expect(screen.getByRole('textbox', { name: 'Second' })).toHaveValue('20')
    expect(screen.getByRole('combobox', { name: 'Period' })).toHaveValue('pm')
    await userEvent.selectOptions(screen.getByRole('combobox', { name: 'Period' }), 'am')
    expect((onChange.mock.lastCall?.[0] as Date).getHours()).toBe(1)
  })

  it('clears the value when clearable', async () => {
    const onChange = vi.fn()
    render(<TimeInput defaultValue={dateAt(9, 30)} onChange={onChange} />)
    await userEvent.click(screen.getByRole('button', { name: 'Clear time' }))
    expect(onChange).toHaveBeenCalledWith(null)
  })

  it('updates range values', async () => {
    const onChange = vi.fn()
    render(
      <TimeInput.TimeInputRange defaultValue={[dateAt(9, 0), dateAt(10, 0)]} onChange={onChange} />,
    )
    const minutes = screen.getAllByRole('textbox', { name: 'Minute' })
    await userEvent.clear(minutes[1]!)
    await userEvent.type(minutes[1]!, '30')
    expect(onChange.mock.lastCall?.[0][1].getMinutes()).toBe(30)
  })

  it('reflects disabled and invalid state', () => {
    render(<TimeInput disabled invalid />)
    expect(screen.getByRole('textbox', { name: 'Hour' })).toBeDisabled()
    expect(screen.getByRole('textbox', { name: 'Hour' })).toHaveAttribute('aria-invalid', 'true')
  })

  it('forwards ref to the root element', () => {
    const ref = vi.fn()
    render(<TimeInput ref={ref} />)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <div>
        <TimeInput defaultValue={dateAt(9, 30)} showSeconds />
        <TimeInput.TimeInputRange defaultValue={[dateAt(9, 0), dateAt(10, 0)]} />
      </div>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
