import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Inline } from './Inline'

describe('Inline', () => {
  it('uses row defaults and exposes wrapping state', () => {
    render(
      <Inline wrap data-testid="inline">
        Content
      </Inline>,
    )
    expect(screen.getByTestId('inline')).toHaveAttribute('data-gap', 'base')
    expect(screen.getByTestId('inline')).toHaveAttribute('data-align', 'center')
    expect(screen.getByTestId('inline')).toHaveAttribute('data-wrap')
  })

  it('supports numeric gaps and divider nodes', () => {
    render(
      <Inline gap={2} divider={<span data-testid="divider" />} data-testid="inline">
        <span>One</span>
        <span>Two</span>
      </Inline>,
    )
    expect(screen.getByTestId('inline')).toHaveAttribute('data-gap', '2')
    expect(screen.getAllByTestId('divider')).toHaveLength(1)
  })

  it('renders a custom element and forwards its ref', () => {
    const ref = vi.fn()
    render(
      <Inline asElement="nav" ref={ref} aria-label="Actions">
        Content
      </Inline>,
    )
    expect(screen.getByRole('navigation', { name: 'Actions' })).toHaveClass('dyl-inline')
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <Inline>
        <span>One</span>
        <span>Two</span>
      </Inline>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
