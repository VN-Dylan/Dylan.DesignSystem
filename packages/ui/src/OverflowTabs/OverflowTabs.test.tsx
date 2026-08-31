import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { OverflowTabs } from './OverflowTabs'

const tabList = [
  { label: 'Overview', value: 'overview' },
  { label: 'Activity', value: 'activity' },
  { label: 'Settings', value: 'settings' },
]

describe('OverflowTabs', () => {
  it('renders every tab and selects on click', async () => {
    const onChange = vi.fn()
    render(
      <OverflowTabs tabList={tabList} defaultValue="overview" onChange={onChange}>
        panel
      </OverflowTabs>,
    )
    expect(screen.getAllByRole('tab')).toHaveLength(3)
    await userEvent.click(screen.getByRole('tab', { name: 'Activity' }))
    expect(onChange).toHaveBeenCalledWith('activity')
  })

  it('reflects the active tab via aria-selected', () => {
    render(<OverflowTabs tabList={tabList} value="settings" />)
    expect(screen.getByRole('tab', { name: 'Settings' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute('aria-selected', 'false')
  })

  it('renders the panel content', () => {
    render(
      <OverflowTabs tabList={tabList} value="overview">
        <span>panel body</span>
      </OverflowTabs>,
    )
    expect(screen.getByRole('tabpanel')).toHaveTextContent('panel body')
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <OverflowTabs tabList={tabList} value="overview">
        panel
      </OverflowTabs>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
