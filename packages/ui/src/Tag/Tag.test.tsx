import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Tag } from './Tag'

describe('Tag', () => {
  it('renders tag content', () => {
    render(<Tag>Basic Tag</Tag>)
    expect(screen.getByText('Basic Tag')).toBeInTheDocument()
  })

  it('renders boolean prefix and suffix dots', () => {
    render(
      <Tag prefix suffix>
        Category
      </Tag>,
    )
    const tag = screen.getByText('Category').closest('.dyl-tag')
    expect(tag).toHaveAttribute('data-prefix', 'true')
    expect(tag).toHaveAttribute('data-suffix', 'true')
    expect(tag?.querySelectorAll('.dyl-tag__dot')).toHaveLength(2)
  })

  it('renders custom affixes', () => {
    render(
      <Tag
        prefix={<span data-testid="prefix">+</span>}
        suffix={<span data-testid="suffix">x</span>}
      >
        Tag
      </Tag>,
    )
    expect(screen.getByTestId('prefix')).toBeInTheDocument()
    expect(screen.getByTestId('suffix')).toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = vi.fn()
    render(<Tag ref={ref}>Tag</Tag>)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLSpanElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <div>
        <Tag>Basic Tag</Tag>
        <Tag prefix suffix>
          Affix Tag
        </Tag>
      </div>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
