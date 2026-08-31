import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { NavToggle } from './NavToggle'

describe('NavToggle', () => {
  it('renders untoggled by default', () => {
    render(<NavToggle data-testid="toggle" />)
    expect(screen.getByTestId('toggle')).not.toHaveAttribute('data-toggled')
  })

  it('reflects toggled state', () => {
    render(<NavToggle toggled data-testid="toggle" />)
    expect(screen.getByTestId('toggle')).toHaveAttribute('data-toggled', 'true')
  })

  it('forwards ref', () => {
    const ref = vi.fn()
    render(<NavToggle ref={ref} />)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLSpanElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(<NavToggle toggled />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
