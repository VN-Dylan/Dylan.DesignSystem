import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Center } from './Center'

describe('Center', () => {
  it('renders centered content and merges classes', () => {
    render(<Center className="custom">Content</Center>)
    expect(screen.getByText('Content')).toHaveClass('dyl-center', 'custom')
  })

  it('renders a custom element and forwards its ref', () => {
    const ref = vi.fn()
    render(
      <Center asElement="section" ref={ref} aria-label="Centered region">
        Content
      </Center>,
    )
    expect(screen.getByRole('region', { name: 'Centered region' })).toHaveClass('dyl-center')
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(<Center>Content</Center>)
    expect(await axe(container)).toHaveNoViolations()
  })
})
