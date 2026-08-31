import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { PatternInput } from './PatternInput'

describe('PatternInput', () => {
  it('formats typed values with the pattern', async () => {
    const onValueChange = vi.fn()
    render(<PatternInput aria-label="Code" format="### ###" onValueChange={onValueChange} />)
    await userEvent.type(screen.getByRole('textbox', { name: 'Code' }), '123456')
    expect(screen.getByRole('textbox')).toHaveValue('123 456')
    expect(onValueChange).toHaveBeenLastCalledWith({
      value: '123456',
      formattedValue: '123 456',
      floatValue: 123456,
    })
  })

  it('supports empty mask formatting', () => {
    render(<PatternInput aria-label="Code" format="##-##" allowEmptyFormatting mask="_" />)
    expect(screen.getByRole('textbox')).toHaveValue('__-__')
  })

  it('forwards ref to the input element', () => {
    const ref = vi.fn()
    render(<PatternInput aria-label="Code" ref={ref} />)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(<PatternInput aria-label="Card number" format="#### ####" />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
