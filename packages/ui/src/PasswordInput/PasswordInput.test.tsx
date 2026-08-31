import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { PasswordInput } from './PasswordInput'

describe('PasswordInput', () => {
  it('renders a password input by default', () => {
    render(<PasswordInput aria-label="Password" />)
    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password')
  })

  it('toggles visibility and reports changes', async () => {
    const onVisibleChange = vi.fn()
    render(<PasswordInput aria-label="Password" onVisibleChange={onVisibleChange} />)
    await userEvent.click(screen.getByRole('button', { name: 'Show password' }))
    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'text')
    expect(onVisibleChange).toHaveBeenCalledWith(true)
    await userEvent.click(screen.getByRole('button', { name: 'Hide password' }))
    expect(onVisibleChange).toHaveBeenCalledWith(false)
  })

  it('forwards ref to the input element', () => {
    const ref = vi.fn()
    render(<PasswordInput aria-label="Password" ref={ref} />)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(<PasswordInput aria-label="Password" />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
