import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { Collapsible } from './Collapsible'

const Basic = (props: Parameters<typeof Collapsible>[0]) => (
  <Collapsible {...props}>
    <Collapsible.Trigger>Toggle</Collapsible.Trigger>
    <Collapsible.Content>Panel body</Collapsible.Content>
  </Collapsible>
)

describe('Collapsible', () => {
  it('is closed by default and toggles open', async () => {
    render(<Basic />)
    const trigger = screen.getByRole('button', { name: 'Toggle' })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByText('Panel body')).not.toBeVisible()
    await userEvent.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText('Panel body')).toBeVisible()
  })

  it('respects defaultOpen', () => {
    render(<Basic defaultOpen />)
    expect(screen.getByText('Panel body')).toBeVisible()
  })

  it('supports controlled usage', async () => {
    const onOpenChange = vi.fn()
    render(<Basic open={false} onOpenChange={onOpenChange} />)
    await userEvent.click(screen.getByRole('button', { name: 'Toggle' }))
    expect(onOpenChange).toHaveBeenCalledWith(true)
    expect(screen.queryByText('Panel body')).not.toBeVisible()
  })

  it('wires trigger and content with aria', () => {
    render(<Basic defaultOpen />)
    const trigger = screen.getByRole('button', { name: 'Toggle' })
    const region = screen.getByRole('region')
    expect(trigger).toHaveAttribute('aria-controls', region.id)
    expect(region).toHaveAttribute('aria-labelledby', trigger.id)
  })

  it('has no axe violations', async () => {
    const { container } = render(<Basic defaultOpen />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
