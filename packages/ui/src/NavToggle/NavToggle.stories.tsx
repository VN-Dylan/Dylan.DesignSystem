import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from '../Button'
import { NavToggle } from './NavToggle'

const meta = {
  title: 'Navigation/NavToggle',
  component: NavToggle,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof NavToggle>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  render: () => {
    const Demo = () => {
      const [collapsed, setCollapsed] = useState(false)
      return (
        <Button
          aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}
          icon={<NavToggle toggled={collapsed} />}
          onClick={() => setCollapsed((value) => !value)}
        />
      )
    }
    return <Demo />
  },
}

export const NavToggleStory: Story = {
  name: 'NavToggle',
  args: { toggled: true },
}
