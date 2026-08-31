import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { ActionLink } from './ActionLink'

describe('ActionLink', () => {
  it('renders an anchor with href from string to', () => {
    render(<ActionLink to="/docs">Docs</ActionLink>)
    expect(screen.getByRole('link', { name: 'Docs' })).toHaveAttribute('href', '/docs')
  })

  it('renders an anchor with href from object to', () => {
    render(<ActionLink to={{ pathName: '/docs', search: '?q=a', hash: '#top' }}>Docs</ActionLink>)
    expect(screen.getByRole('link', { name: 'Docs' })).toHaveAttribute('href', '/docs?q=a#top')
  })

  it('uses history replacement for same-origin links when replace is true', async () => {
    const onClick = vi.fn()
    render(
      <ActionLink to="/replacement" replace state={{ from: 'test' }} onClick={onClick}>
        Replace
      </ActionLink>,
    )
    await userEvent.click(screen.getByRole('link', { name: 'Replace' }))
    expect(onClick).toHaveBeenCalledTimes(1)
    expect(window.location.pathname).toBe('/replacement')
    expect(window.history.state).toEqual({ from: 'test' })
  })

  it('applies theme color by default and can disable it', () => {
    const { rerender } = render(<ActionLink to="/docs">Docs</ActionLink>)
    expect(screen.getByRole('link', { name: 'Docs' })).toHaveAttribute('data-theme-color', 'true')

    rerender(
      <ActionLink to="/docs" themeColor={false}>
        Docs
      </ActionLink>,
    )
    expect(screen.getByRole('link', { name: 'Docs' })).not.toHaveAttribute('data-theme-color')
  })

  it('forwards ref to the anchor element', () => {
    const ref = vi.fn()
    render(
      <ActionLink ref={ref} to="/docs">
        Docs
      </ActionLink>,
    )
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLAnchorElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <ActionLink to="/docs" target="_blank">
        Documentation
      </ActionLink>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
