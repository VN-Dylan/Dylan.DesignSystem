import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Container } from './Container'

describe('Container', () => {
  it('renders a div by default', () => {
    render(<Container data-testid="container">Content</Container>)
    expect(screen.getByTestId('container').tagName).toBe('DIV')
    expect(screen.getByTestId('container')).toHaveClass('dyl-container')
  })

  it('renders a custom element with native props', () => {
    render(
      <Container asElement="section" aria-label="Overview">
        Content
      </Container>,
    )
    expect(screen.getByRole('region', { name: 'Overview' })).toHaveClass('dyl-container')
  })

  it('forwards ref to the rendered element', () => {
    const ref = vi.fn()
    render(
      <Container asElement="main" ref={ref}>
        Content
      </Container>,
    )
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(<Container>Content</Container>)
    expect(await axe(container)).toHaveNoViolations()
  })
})
