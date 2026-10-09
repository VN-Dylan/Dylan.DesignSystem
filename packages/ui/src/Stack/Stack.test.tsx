import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Stack } from './Stack'

describe('Stack', () => {
  it('uses the base gap and vertical alignment defaults', () => {
    render(<Stack data-testid="stack">Content</Stack>)
    expect(screen.getByTestId('stack')).toHaveAttribute('data-gap', 'base')
    expect(screen.getByTestId('stack')).toHaveAttribute('data-align', 'stretch')
  })

  it('exposes semantic and numeric gaps through data attributes', () => {
    const { rerender } = render(<Stack gap="loose">Content</Stack>)
    expect(screen.getByText('Content')).toHaveAttribute('data-gap', 'loose')
    rerender(<Stack gap={6}>Content</Stack>)
    expect(screen.getByText('Content')).toHaveAttribute('data-gap', '6')
  })

  it('inserts dividers only between children', () => {
    render(
      <Stack divider={<span data-testid="divider" />}>
        <span>One</span>
        <span>Two</span>
        <span>Three</span>
      </Stack>,
    )
    expect(screen.getAllByTestId('divider')).toHaveLength(2)
  })

  it('renders a custom element and forwards its ref', () => {
    const ref = vi.fn()
    render(
      <Stack asElement="section" ref={ref} aria-label="Overview">
        Content
      </Stack>,
    )
    expect(screen.getByRole('region', { name: 'Overview' })).toHaveClass('dyl-stack')
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <Stack>
        <div>One</div>
        <div>Two</div>
      </Stack>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
