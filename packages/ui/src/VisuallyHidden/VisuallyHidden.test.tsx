import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { VisuallyHidden } from './VisuallyHidden'

describe('VisuallyHidden', () => {
  it('renders its content in the accessibility tree', () => {
    render(<VisuallyHidden>Skip to content</VisuallyHidden>)
    expect(screen.getByText('Skip to content')).toBeInTheDocument()
  })

  it('renders the requested element', () => {
    render(<VisuallyHidden as="h2">Section</VisuallyHidden>)
    expect(screen.getByRole('heading', { name: 'Section' })).toBeInTheDocument()
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <p>
        Rating <VisuallyHidden>4 out of 5</VisuallyHidden> ★★★★☆
      </p>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
