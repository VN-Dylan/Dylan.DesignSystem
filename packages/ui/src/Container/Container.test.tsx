import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Container } from './Container'

describe('Container', () => {
  it('uses the standard content width and responsive gutter by default', () => {
    render(<Container data-testid="container">Content</Container>)
    expect(screen.getByTestId('container')).toHaveClass('dyl-container')
    expect(screen.getByTestId('container')).toHaveAttribute('data-size', 'default')
    expect(screen.getByTestId('container')).toHaveAttribute('data-gutter')
  })

  it('supports every named width and gutter opt-out', () => {
    const { rerender } = render(<Container size="prose">Content</Container>)
    expect(screen.getByText('Content')).toHaveAttribute('data-size', 'prose')
    rerender(
      <Container size="full" gutter={false}>
        Content
      </Container>,
    )
    expect(screen.getByText('Content')).toHaveAttribute('data-size', 'full')
    expect(screen.getByText('Content')).not.toHaveAttribute('data-gutter')
  })

  it('renders a custom element with native props and forwards its ref', () => {
    const ref = vi.fn()
    render(
      <Container asElement="main" ref={ref} aria-label="Overview">
        Content
      </Container>,
    )
    expect(screen.getByRole('main', { name: 'Overview' })).toHaveClass('dyl-container')
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(<Container>Content</Container>)
    expect(await axe(container)).toHaveNoViolations()
  })
})
