import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { Tabs } from './Tabs'

const renderTabs = (props?: Partial<Parameters<typeof Tabs>[0]>) =>
  render(
    <Tabs defaultValue="home" {...props}>
      <Tabs.TabList>
        <Tabs.TabNav value="home">Home</Tabs.TabNav>
        <Tabs.TabNav value="profile">Profile</Tabs.TabNav>
        <Tabs.TabNav value="contact" disabled>
          Contact
        </Tabs.TabNav>
      </Tabs.TabList>
      <Tabs.TabContent value="home">Home panel</Tabs.TabContent>
      <Tabs.TabContent value="profile">Profile panel</Tabs.TabContent>
      <Tabs.TabContent value="contact">Contact panel</Tabs.TabContent>
    </Tabs>,
  )

describe('Tabs', () => {
  it('shows the default tab content', () => {
    renderTabs()
    expect(screen.getByRole('tab', { name: 'Home' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tabpanel', { name: 'Home' })).toHaveTextContent('Home panel')
  })

  it('changes active tab when a nav is clicked', async () => {
    const onChange = vi.fn()
    renderTabs({ onChange })

    await userEvent.click(screen.getByRole('tab', { name: 'Profile' }))
    expect(onChange).toHaveBeenCalledWith('profile')
    expect(screen.getByRole('tab', { name: 'Profile' })).toHaveAttribute('aria-selected', 'true')
  })

  it('does not activate disabled tabs', async () => {
    const onChange = vi.fn()
    renderTabs({ onChange })

    await userEvent.click(screen.getByRole('tab', { name: 'Contact' }))
    expect(onChange).not.toHaveBeenCalled()
  })

  it('supports controlled value', () => {
    renderTabs({ value: 'profile' })
    expect(screen.getByRole('tab', { name: 'Profile' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tabpanel', { name: 'Profile' })).toHaveTextContent('Profile panel')
  })

  it('forwards ref to the tabs root', () => {
    const ref = vi.fn()
    render(<Tabs ref={ref} />)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement))
  })

  it('has no axe violations', async () => {
    const { container } = renderTabs()
    expect(await axe(container)).toHaveNoViolations()
  })
})
