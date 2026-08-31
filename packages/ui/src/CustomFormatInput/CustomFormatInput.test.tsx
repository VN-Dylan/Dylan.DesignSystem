import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { CustomFormatInput } from './CustomFormatInput'

describe('CustomFormatInput', () => {
  it('formats typed numeric values', async () => {
    const onValueChange = vi.fn()
    render(
      <CustomFormatInput
        aria-label="Amount"
        format={(value) => (value ? `$${value}` : '')}
        onValueChange={onValueChange}
      />,
    )
    await userEvent.type(screen.getByRole('textbox', { name: 'Amount' }), '123')
    expect(screen.getByRole('textbox')).toHaveValue('$123')
    expect(onValueChange).toHaveBeenLastCalledWith({
      value: '123',
      formattedValue: '$123',
      floatValue: 123,
    })
  })

  it('uses removeFormatting before updating value', async () => {
    render(
      <CustomFormatInput
        aria-label="Code"
        removeFormatting={(value) => value.replace(/[^\d]/g, '')}
        format={(value) => value.replace(/^(\d{2})(\d+)/, '$1/$2')}
      />,
    )
    await userEvent.type(screen.getByRole('textbox', { name: 'Code' }), '1234')
    expect(screen.getByRole('textbox')).toHaveValue('12/34')
  })

  it('forwards ref to the input element', () => {
    const ref = vi.fn()
    render(<CustomFormatInput aria-label="Amount" ref={ref} />)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(<CustomFormatInput aria-label="Amount" inputPrefix="$" />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
