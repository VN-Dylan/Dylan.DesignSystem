import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { NumericInput } from './NumericInput'

describe('NumericInput', () => {
  it('formats thousand separators and reports numeric payloads', async () => {
    const onValueChange = vi.fn()
    render(<NumericInput aria-label="Amount" thousandSeparator onValueChange={onValueChange} />)
    await userEvent.type(screen.getByRole('textbox', { name: 'Amount' }), '1234')
    expect(screen.getByRole('textbox')).toHaveValue('1,234')
    expect(onValueChange).toHaveBeenLastCalledWith({
      value: '1234',
      formattedValue: '1,234',
      floatValue: 1234,
    })
  })

  it('limits and pads decimal values', async () => {
    render(<NumericInput aria-label="Amount" decimalScale={2} fixedDecimalScale />)
    await userEvent.type(screen.getByRole('textbox', { name: 'Amount' }), '12.345')
    expect(screen.getByRole('textbox')).toHaveValue('12.34')
  })

  it('blocks negative values when allowNegative is false', async () => {
    render(<NumericInput aria-label="Amount" allowNegative={false} />)
    await userEvent.type(screen.getByRole('textbox', { name: 'Amount' }), '-12')
    expect(screen.getByRole('textbox')).toHaveValue('12')
  })

  it('forwards ref to the input element', () => {
    const ref = vi.fn()
    render(<NumericInput aria-label="Amount" ref={ref} />)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(<NumericInput aria-label="Amount" inputPrefix="$" />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
