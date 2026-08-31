import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Typography } from './Typography'

describe('Typography', () => {
  it('renders native heading content', () => {
    render(
      <Typography>
        <h4>Heading 4</h4>
      </Typography>,
    )
    expect(screen.getByRole('heading', { level: 4, name: 'Heading 4' })).toBeInTheDocument()
  })

  it('supports prose and truncate state attributes', () => {
    render(
      <Typography prose truncate>
        The quick brown fox jumps over the lazy dog.
      </Typography>,
    )
    expect(screen.getByText(/quick brown fox/i)).toHaveAttribute('data-prose', 'true')
    expect(screen.getByText(/quick brown fox/i)).toHaveAttribute('data-truncate', 'true')
  })

  it('renders as a selected native element', () => {
    render(<Typography asElement="article">Article body</Typography>)
    expect(screen.getByText('Article body').tagName).toBe('ARTICLE')
  })

  it('forwards ref', () => {
    const ref = vi.fn()
    render(<Typography ref={ref}>Text</Typography>)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <Typography prose>
        <h1>Garlic bread with cheese</h1>
        <p>The quick brown fox jumps over the lazy dog.</p>
        <ul>
          <li>First item</li>
          <li>Second item</li>
        </ul>
      </Typography>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
