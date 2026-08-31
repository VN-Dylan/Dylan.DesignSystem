import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { Button } from './Button'

describe('Button', () => {
  it('renders a button with its label', () => {
    render(<Button>Save</Button>)
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
  })

  it('fires onClick', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Go</Button>)
    await userEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('does not fire onClick when disabled or loading', async () => {
    const onClick = vi.fn()
    const { rerender } = render(
      <Button onClick={onClick} disabled>
        Go
      </Button>,
    )
    await userEvent.click(screen.getByRole('button'))
    rerender(
      <Button onClick={onClick} loading>
        Go
      </Button>,
    )
    await userEvent.click(screen.getByRole('button'))
    expect(onClick).not.toHaveBeenCalled()
  })

  it('exposes aria-busy while loading', () => {
    render(<Button loading>Go</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true')
  })

  it('accepts a className callback receiving interaction state', () => {
    render(
      <Button className={({ unclickable }) => (unclickable ? 'is-off' : 'is-on')} disabled>
        Go
      </Button>,
    )
    expect(screen.getByRole('button')).toHaveClass('is-off')
  })

  it('forwards ref to the button element', () => {
    const ref = vi.fn()
    render(<Button ref={ref}>Go</Button>)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLButtonElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <div>
        <Button>Default</Button>
        <Button variant="solid">Solid</Button>
        <Button aria-label="Call" shape="circle" icon={<span />} />
      </div>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
