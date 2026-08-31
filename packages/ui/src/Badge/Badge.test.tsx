import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Badge } from './Badge'

describe('Badge', () => {
  it('renders badge content', () => {
    render(<Badge content={9} />)
    expect(screen.getByText('9')).toBeInTheDocument()
  })

  it('caps numeric content with maxCount', () => {
    render(<Badge content={100} maxCount={9} />)
    expect(screen.getByText('9+')).toBeInTheDocument()
  })

  it('renders dot mode when content is empty', () => {
    const { container } = render(<Badge />)
    expect(container.querySelector('.dyl-badge__inner')).toHaveAttribute('data-dot')
  })

  it('wraps children and positions the badge', () => {
    render(
      <Badge content="New">
        <span>Inbox</span>
      </Badge>,
    )
    expect(screen.getByText('Inbox')).toBeInTheDocument()
    expect(screen.getByText('New')).not.toHaveAttribute('data-dot')
  })

  it('applies inner class and badge style', () => {
    render(
      <Badge
        content={1}
        innerClass="is-custom"
        badgeStyle={{ insetInlineEnd: 'var(--dyl-badge-test)' }}
      />,
    )
    expect(screen.getByText('1')).toHaveClass('is-custom')
    expect(screen.getByText('1')).toHaveStyle({ insetInlineEnd: 'var(--dyl-badge-test)' })
  })

  it('forwards ref to the badge wrapper', () => {
    const ref = vi.fn()
    render(<Badge ref={ref} content={1} />)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLSpanElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <div>
        <Badge content={3}>
          <span>Messages</span>
        </Badge>
        <Badge />
      </div>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
