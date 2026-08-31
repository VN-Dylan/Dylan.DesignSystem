import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { EmptyState } from './EmptyState'

describe('EmptyState', () => {
  it('renders the default wave variant with content', () => {
    render(<EmptyState illustration={<span data-testid="illustration" />}>No data</EmptyState>)
    expect(screen.getByText('No data').closest('.dyl-empty-state')).toHaveAttribute(
      'data-variant',
      'wave',
    )
    expect(screen.getByTestId('illustration')).toBeInTheDocument()
  })

  it('supports variants, custom size, and offset', () => {
    render(
      <EmptyState variant="dots" size={200} offset={-10} data-testid="empty">
        Empty
      </EmptyState>,
    )
    const empty = screen.getByTestId('empty')
    const canvas = empty.querySelector('.dyl-empty-state__canvas') as HTMLElement
    const content = empty.querySelector('.dyl-empty-state__content') as HTMLElement
    expect(empty).toHaveAttribute('data-variant', 'dots')
    expect(canvas.style.width).toContain('200')
    expect(content.style.marginTop).toContain('-10')
  })

  it('forwards ref to the root element', () => {
    const ref = vi.fn()
    render(<EmptyState ref={ref}>Empty</EmptyState>)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <EmptyState illustration={<span aria-hidden>0</span>}>
        <p>No results</p>
      </EmptyState>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
