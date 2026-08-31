import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Grid } from './Grid'

describe('Grid', () => {
  it('renders grid children and merges className', () => {
    render(
      <Grid className="grid-cols-3" data-testid="grid">
        <div>One</div>
        <div>Two</div>
      </Grid>,
    )
    expect(screen.getByTestId('grid')).toHaveClass('dyl-grid', 'grid-cols-3')
    expect(screen.getByText('One')).toBeInTheDocument()
  })

  it('renders as a selected native element', () => {
    render(<Grid asElement="section">Grid section</Grid>)
    expect(screen.getByText('Grid section').tagName).toBe('SECTION')
  })

  it('forwards ref', () => {
    const ref = vi.fn()
    render(<Grid ref={ref}>Grid</Grid>)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <Grid className="grid-cols-2">
        <div>One</div>
        <div>Two</div>
      </Grid>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
