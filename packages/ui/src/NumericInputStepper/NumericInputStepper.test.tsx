import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { NumericInputStepper } from './NumericInputStepper'

describe('NumericInputStepper', () => {
  it('increments and decrements by step', async () => {
    const onChange = vi.fn()
    const { rerender } = render(<NumericInputStepper value={5} step={2} onChange={onChange} />)
    await userEvent.click(screen.getByRole('button', { name: 'Increase value' }))
    expect(onChange).toHaveBeenCalledWith(7)
    rerender(<NumericInputStepper value={5} step={2} onChange={onChange} />)
    await userEvent.click(screen.getByRole('button', { name: 'Decrease value' }))
    expect(onChange).toHaveBeenCalledWith(3)
  })

  it('honors min and max constraints', async () => {
    const onChange = vi.fn()
    render(<NumericInputStepper value={10} min={0} max={10} onChange={onChange} />)
    expect(screen.getByRole('button', { name: 'Increase value' })).toBeDisabled()
    await userEvent.click(screen.getByRole('button', { name: 'Increase value' }))
    expect(onChange).not.toHaveBeenCalled()
  })

  it('forwards ref to the root element', () => {
    const ref = vi.fn()
    render(<NumericInputStepper ref={ref} />)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(<NumericInputStepper aria-label="Quantity controls" />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
