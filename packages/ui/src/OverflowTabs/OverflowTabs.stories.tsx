import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { OverflowTabs } from './OverflowTabs'

const meta = {
  title: 'Navigation/OverflowTabs',
  component: OverflowTabs,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof OverflowTabs>

export default meta
type Story = StoryObj<typeof meta>

const tabList = [
  { label: 'Overview', value: 'overview' },
  { label: 'Activity', value: 'activity' },
  { label: 'Settings', value: 'settings' },
  { label: 'Members', value: 'members' },
  { label: 'Integrations', value: 'integrations' },
  { label: 'Billing', value: 'billing' },
  { label: 'Audit log', value: 'audit' },
]

export const Basic: Story = {
  render: () => {
    const Demo = () => {
      const [value, setValue] = useState('overview')
      return (
        <div className="max-w-md resize-x overflow-auto rounded border border-dashed border-border p-2">
          <OverflowTabs tabList={tabList} value={value} onChange={setValue}>
            <p className="pt-2 text-content-muted">Panel: {value}</p>
          </OverflowTabs>
        </div>
      )
    }
    return <Demo />
  },
}
