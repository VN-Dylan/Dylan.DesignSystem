import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { StickyRegion } from './StickyRegion'

describe('StickyRegion', () => {
  it('renders children and default data attributes', () => {
    render(<StickyRegion>Header</StickyRegion>)
    expect(screen.getByText('Header')).toBeInTheDocument()
    expect(screen.getByText('Header')).toHaveAttribute('data-shadow', 'true')
  })

  it('uses triggerOffset to enter sticky state and calls back', () => {
    const onStickyChange = vi.fn()
    Object.defineProperty(window, 'scrollY', { value: 20, configurable: true })

    render(
      <div>
        <StickyRegion
          triggerOffset={10}
          onStickyChange={onStickyChange}
          stickyClassName="is-sticky"
        >
          Header
        </StickyRegion>
      </div>,
    )

    fireEvent.scroll(window)
    expect(screen.getByText('Header')).toHaveAttribute('data-sticky', 'true')
    expect(screen.getByText('Header')).toHaveClass('is-sticky')
    expect(onStickyChange).toHaveBeenCalledWith(true)
  })

  it('forwards ref to the container', () => {
    const ref = vi.fn()
    render(<StickyRegion ref={ref}>Header</StickyRegion>)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(<StickyRegion>Header</StickyRegion>)
    expect(await axe(container)).toHaveNoViolations()
  })
})
