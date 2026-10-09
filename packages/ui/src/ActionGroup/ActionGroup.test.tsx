import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Button } from '../Button'
import { ActionGroup } from './ActionGroup'

const Footer = (props: Parameters<typeof ActionGroup>[0]) => (
  <ActionGroup aria-label="Form actions" {...props}>
    <ActionGroup.Start>
      <Button tone="danger" variant="plain">
        Delete
      </Button>
    </ActionGroup.Start>
    <Button>Cancel</Button>
    <Button variant="solid">Save</Button>
  </ActionGroup>
)

describe('ActionGroup', () => {
  it('renders a labelled group with actions in reading order', () => {
    render(<Footer />)
    const group = screen.getByRole('group', { name: 'Form actions' })
    const names = screen.getAllByRole('button').map((b) => b.textContent)
    expect(group).toBeInTheDocument()
    expect(names).toEqual(['Delete', 'Cancel', 'Save'])
  })

  it('defaults to end alignment and mobile stacking', () => {
    render(<Footer />)
    const group = screen.getByRole('group')
    expect(group).toHaveAttribute('data-align', 'end')
    expect(group).toHaveAttribute('data-stack', 'true')
    expect(group).not.toHaveAttribute('data-divided')
  })

  it('applies align, divided and stackOnMobile', () => {
    render(<Footer align="between" divided stackOnMobile={false} />)
    const group = screen.getByRole('group')
    expect(group).toHaveAttribute('data-align', 'between')
    expect(group).toHaveAttribute('data-divided', 'true')
    expect(group).not.toHaveAttribute('data-stack')
  })

  it('puts isolated actions in the start slot', () => {
    render(<Footer />)
    expect(screen.getByRole('button', { name: 'Delete' }).parentElement).toHaveClass(
      'dyl-action-group__start',
    )
  })

  it('forwards refs', () => {
    const ref = vi.fn()
    render(<ActionGroup ref={ref} />)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(<Footer />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
