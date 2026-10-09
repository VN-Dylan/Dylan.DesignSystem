import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Grid } from './Grid'

describe('Grid', () => {
  it('keeps utility-class column usage working and uses the base gap', () => {
    render(
      <Grid className="grid-cols-4" data-testid="grid">
        <div>One</div>
      </Grid>,
    )
    expect(screen.getByTestId('grid')).toHaveClass('dyl-grid', 'grid-cols-4')
    expect(screen.getByTestId('grid')).toHaveAttribute('data-gap', 'base')
    expect(screen.getByTestId('grid')).not.toHaveAttribute('data-columns')
  })

  it('maps responsive columns to CSS custom properties', () => {
    render(<Grid columns={{ base: 1, sm: 2, lg: 4 }} data-testid="grid" />)
    const grid = screen.getByTestId('grid')
    expect(grid).toHaveAttribute('data-columns', 'responsive')
    expect(grid.style.getPropertyValue('--dyl-grid-columns-base')).toBe('1')
    expect(grid.style.getPropertyValue('--dyl-grid-columns-sm')).toBe('2')
    expect(grid.style.getPropertyValue('--dyl-grid-columns-lg')).toBe('4')
  })

  it('supports auto-fit child widths from tokens or CSS lengths', () => {
    const { rerender } = render(<Grid minChildWidth={12} data-testid="grid" />)
    expect(screen.getByTestId('grid').style.getPropertyValue('--dyl-grid-min-child-width')).toBe(
      'var(--dyl-space-12)',
    )
    rerender(<Grid minChildWidth="20rem" data-testid="grid" />)
    expect(screen.getByTestId('grid').style.getPropertyValue('--dyl-grid-min-child-width')).toBe(
      '20rem',
    )
  })

  it('renders compound items with responsive spans and row spans', () => {
    render(
      <Grid columns={4}>
        <Grid.Item span={{ base: 1, md: 3 }} rowSpan={2} data-testid="item" />
      </Grid>,
    )
    const item = screen.getByTestId('item')
    expect(item).toHaveClass('dyl-grid__item')
    expect(item).toHaveAttribute('data-span', 'responsive')
    expect(item).toHaveAttribute('data-row-span', '2')
    expect(item.style.getPropertyValue('--dyl-grid-item-span-md')).toBe('3')
  })

  it('renders selected native elements and forwards refs', () => {
    const rootRef = vi.fn()
    const itemRef = vi.fn()
    render(
      <Grid asElement="section" ref={rootRef} aria-label="Results">
        <Grid.Item asElement="article" ref={itemRef}>
          Item
        </Grid.Item>
      </Grid>,
    )
    expect(screen.getByRole('region', { name: 'Results' })).toHaveClass('dyl-grid')
    expect(screen.getByRole('article')).toHaveClass('dyl-grid__item')
    expect(rootRef).toHaveBeenCalledWith(expect.any(HTMLElement))
    expect(itemRef).toHaveBeenCalledWith(expect.any(HTMLElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <Grid columns={2}>
        <Grid.Item>One</Grid.Item>
        <Grid.Item>Two</Grid.Item>
      </Grid>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
