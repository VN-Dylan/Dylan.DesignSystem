import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { Input } from './Input'

describe('Input', () => {
  it('renders a text input by default', () => {
    render(<Input aria-label="Name" />)
    expect(screen.getByRole('textbox', { name: 'Name' })).toHaveAttribute('type', 'text')
  })

  it('renders a textarea when textArea is set', () => {
    render(<Input textArea aria-label="Bio" />)
    expect(screen.getByRole('textbox', { name: 'Bio' }).tagName).toBe('TEXTAREA')
  })

  it('accepts typed input', async () => {
    const onChange = vi.fn()
    render(<Input aria-label="Q" onChange={onChange} />)
    await userEvent.type(screen.getByRole('textbox'), 'abc')
    expect(onChange).toHaveBeenCalledTimes(3)
    expect(screen.getByRole('textbox')).toHaveValue('abc')
  })

  it('marks aria-invalid when invalid', () => {
    render(<Input aria-label="Email" invalid />)
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('renders prefix and suffix affixes', () => {
    render(<Input aria-label="Price" prefix="$" suffix=".00" />)
    expect(screen.getByText('$')).toBeInTheDocument()
    expect(screen.getByText('.00')).toBeInTheDocument()
  })

  it('disables interaction', async () => {
    render(<Input aria-label="X" disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('forwards ref', () => {
    const ref = vi.fn()
    render(<Input aria-label="X" ref={ref} />)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <label>
        Search
        <Input prefix="🔍" />
      </label>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
