import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { PageHeader } from './PageHeader'

describe('PageHeader', () => {
  it('renders title and description with an h1 by default', () => {
    render(<PageHeader title="Account" description="Manage your account." />)
    expect(screen.getByRole('heading', { level: 1, name: 'Account' })).toBeInTheDocument()
    expect(screen.getByText('Manage your account.')).toHaveClass('dyl-page-header__description')
  })

  it('renders all slots and a selected heading level', () => {
    render(
      <PageHeader
        as="h2"
        title="Account"
        breadcrumb={<nav aria-label="Breadcrumb">Home / Account</nav>}
        back={<button type="button">Back</button>}
        actions={<button type="button">Save</button>}
      />,
    )
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
  })

  it('merges classes, spreads native props, and forwards its ref', () => {
    const ref = vi.fn()
    render(<PageHeader ref={ref} title="Account" className="custom" aria-label="Page heading" />)
    expect(screen.getByRole('banner', { name: 'Page heading' })).toHaveClass(
      'dyl-page-header',
      'custom',
    )
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <PageHeader
        title="Account"
        description="Manage your account."
        actions={<button type="button">Save</button>}
      />,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
