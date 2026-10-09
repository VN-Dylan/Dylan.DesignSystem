import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Section } from './Section'

describe('Section', () => {
  it('uses base spacing, default tone, and a contained layout by default', () => {
    render(<Section data-testid="section">Content</Section>)
    const section = screen.getByTestId('section')
    expect(section).toHaveAttribute('data-spacing', 'base')
    expect(section).toHaveAttribute('data-tone', 'default')
    expect(section.querySelector('.dyl-container')).toBeInTheDocument()
  })

  it('supports spacing, tone, container width, and uncontained content', () => {
    const { rerender } = render(
      <Section spacing="loose" tone="subtle" containerSize="wide" data-testid="section">
        Content
      </Section>,
    )
    expect(screen.getByTestId('section')).toHaveAttribute('data-spacing', 'loose')
    expect(screen.getByTestId('section').querySelector('.dyl-container')).toHaveAttribute(
      'data-size',
      'wide',
    )
    rerender(
      <Section contained={false} data-testid="section">
        Content
      </Section>,
    )
    expect(screen.getByTestId('section').querySelector('.dyl-container')).not.toBeInTheDocument()
  })

  it('renders a custom element and forwards its ref', () => {
    const ref = vi.fn()
    render(
      <Section asElement="article" ref={ref}>
        Content
      </Section>,
    )
    expect(screen.getByRole('article')).toHaveClass('dyl-section')
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(<Section aria-label="Overview">Content</Section>)
    expect(await axe(container)).toHaveNoViolations()
  })
})
