import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { Switcher } from './Switcher'

describe('Switcher', () => {
  it('renders an accessible switch', () => {
    render(<Switcher aria-label="Notifications" />)
    expect(screen.getByRole('switch', { name: 'Notifications' })).toBeInTheDocument()
  })

  it('toggles unchecked and calls onChange', async () => {
    const onChange = vi.fn()
    render(<Switcher onChange={onChange} aria-label="Notifications" />)
    await userEvent.click(screen.getByRole('switch', { name: 'Notifications' }))
    expect(screen.getByRole('switch', { name: 'Notifications' })).toBeChecked()
    expect(onChange).toHaveBeenCalledWith(true, expect.any(Object))
  })

  it('does not toggle when readOnly', async () => {
    const onChange = vi.fn()
    render(<Switcher readOnly onChange={onChange} aria-label="Notifications" />)
    await userEvent.click(screen.getByRole('switch', { name: 'Notifications' }))
    expect(screen.getByRole('switch', { name: 'Notifications' })).not.toBeChecked()
    expect(onChange).not.toHaveBeenCalled()
  })

  it('disables interaction while disabled or loading', () => {
    const { rerender } = render(<Switcher disabled aria-label="Notifications" />)
    expect(screen.getByRole('switch', { name: 'Notifications' })).toBeDisabled()
    rerender(<Switcher isLoading aria-label="Notifications" />)
    expect(screen.getByRole('switch', { name: 'Notifications' })).toBeDisabled()
    expect(screen.getByRole('switch', { name: 'Notifications' })).toHaveAttribute(
      'aria-busy',
      'true',
    )
  })

  it('accepts a className callback receiving state', () => {
    render(
      <Switcher
        checked
        aria-label="Notifications"
        className={({ checked }) => (checked ? 'is-on' : 'is-off')}
      />,
    )
    expect(screen.getByRole('switch', { name: 'Notifications' }).closest('label')).toHaveClass(
      'is-on',
    )
  })

  it('forwards ref to the input element', () => {
    const ref = vi.fn()
    render(<Switcher ref={ref} aria-label="Notifications" />)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <div>
        <Switcher aria-label="Notifications" checkedContent="On" unCheckedContent="Off" />
        <Switcher aria-label="Loading" isLoading />
      </div>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
