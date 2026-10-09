import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Spacer } from './Spacer'

describe('Spacer', () => {
  it('fills available space by default', () => {
    render(<Spacer data-testid="spacer" />)
    expect(screen.getByTestId('spacer')).toHaveClass('dyl-spacer')
    expect(screen.getByTestId('spacer')).not.toHaveAttribute('data-size')
    expect(screen.getByTestId('spacer')).toHaveAttribute('aria-hidden', 'true')
  })

  it('exposes a fixed spacing key', () => {
    render(<Spacer size={8} data-testid="spacer" />)
    expect(screen.getByTestId('spacer')).toHaveAttribute('data-size', '8')
  })

  it('renders a custom element and forwards its ref', () => {
    const ref = vi.fn()
    render(<Spacer asElement="span" ref={ref} data-testid="spacer" />)
    expect(screen.getByTestId('spacer').tagName).toBe('SPAN')
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(<Spacer />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
