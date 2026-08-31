import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { OtpInput } from './OtpInput'

describe('OtpInput', () => {
  it('renders the requested number of fields', () => {
    render(<OtpInput length={4} />)
    expect(screen.getAllByRole('textbox')).toHaveLength(4)
  })

  it('updates value and advances focus as digits are entered', async () => {
    const onChange = vi.fn()
    render(<OtpInput length={4} onChange={onChange} />)
    await userEvent.type(screen.getByLabelText('Digit 1'), '12')
    expect(onChange).toHaveBeenLastCalledWith('12')
    // each digit auto-advances, so focus lands on the field after the last one filled
    expect(screen.getByLabelText('Digit 3')).toHaveFocus()
  })

  it('pastes sequential digits from the focused field', async () => {
    const onChange = vi.fn()
    render(<OtpInput length={4} onChange={onChange} />)
    await userEvent.click(screen.getByLabelText('Digit 1'))
    await userEvent.paste('9876')
    expect(onChange).toHaveBeenLastCalledWith('9876')
  })

  it('marks fields invalid and disables them', () => {
    render(<OtpInput length={2} invalid disabled />)
    expect(screen.getByLabelText('Digit 1')).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByLabelText('Digit 1')).toBeDisabled()
  })

  it('forwards ref to the root element', () => {
    const ref = vi.fn()
    render(<OtpInput ref={ref} />)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(<OtpInput length={4} />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
