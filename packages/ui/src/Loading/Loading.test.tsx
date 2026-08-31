import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Loading } from './Loading'

describe('Loading', () => {
  it('renders children without loader by default', () => {
    render(<Loading>Content</Loading>)
    expect(screen.getByText('Content')).toBeInTheDocument()
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('shows a status when loading', () => {
    render(<Loading loading>Content</Loading>)
    expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument()
    expect(screen.getByText('Content')).toHaveAttribute('aria-busy', 'true')
  })

  it('renders a custom loader', () => {
    render(<Loading loading customLoader={<span>Custom loader</span>} />)
    expect(screen.getByText('Custom loader')).toBeInTheDocument()
  })

  it('renders as a selected element and forwards ref', () => {
    const ref = vi.fn()
    render(
      <Loading asElement="section" ref={ref}>
        Content
      </Loading>,
    )
    expect(screen.getByText('Content').tagName).toBe('SECTION')
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(<Loading loading>Content</Loading>)
    expect(await axe(container)).toHaveNoViolations()
  })
})
