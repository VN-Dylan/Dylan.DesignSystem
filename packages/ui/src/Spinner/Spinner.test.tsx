import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Spinner } from './Spinner'

describe('Spinner', () => {
  it('renders a status indicator by default', () => {
    render(<Spinner />)
    expect(screen.getByRole('status', { name: 'Loading' })).toHaveAttribute('aria-busy', 'true')
  })

  it('stops spinning when isSpining is false', () => {
    render(<Spinner isSpining={false} aria-label="Idle" />)
    expect(screen.getByRole('status', { name: 'Idle' })).not.toHaveAttribute('aria-busy')
    expect(screen.getByRole('status', { name: 'Idle' })).not.toHaveAttribute('data-spining')
  })

  it('applies numeric and string sizes', () => {
    const { rerender } = render(<Spinner size={30} />)
    expect(screen.getByRole('status').style.width).toContain('30')
    expect(screen.getByRole('status').style.height).toContain('30')

    rerender(<Spinner size="3rem" />)
    expect(screen.getByRole('status')).toHaveStyle({ width: '3rem', height: '3rem' })
  })

  it('renders a custom indicator component', () => {
    const Indicator = () => <svg data-testid="custom-indicator" />
    render(<Spinner indicator={Indicator} />)
    expect(screen.getByTestId('custom-indicator')).toBeInTheDocument()
  })

  it('accepts a className callback receiving spinner state', () => {
    render(<Spinner className={({ spinning }) => (spinning ? 'is-spinning' : 'is-static')} />)
    expect(screen.getByRole('status')).toHaveClass('is-spinning')
  })

  it('forwards ref to the status element', () => {
    const ref = vi.fn()
    render(<Spinner ref={ref} />)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLSpanElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <div>
        <Spinner />
        <Spinner isSpining={false} aria-label="Idle loading indicator" />
      </div>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
