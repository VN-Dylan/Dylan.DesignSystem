import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Switcher } from './Switcher'

const meta = {
  title: 'Forms/Switcher',
  component: Switcher,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Switcher>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => <Switcher defaultChecked aria-label="Notifications" />,
}

export const Content: Story = {
  render: () => <Switcher defaultChecked checkedContent="On" unCheckedContent="Off" />,
}

export const Disabled: Story = {
  render: () => (
    <div className="space-y-4">
      <Switcher disabled aria-label="Disabled" />
      <Switcher disabled defaultChecked aria-label="Checked disabled" />
    </div>
  ),
}

export const Loading: Story = {
  render: () => {
    const Demo = () => {
      const [checked, setChecked] = useState(false)
      const [isLoading, setIsLoading] = useState(false)
      return (
        <Switcher
          checked={checked}
          isLoading={isLoading}
          aria-label="Loading switcher"
          onChange={(next) => {
            setIsLoading(true)
            setTimeout(() => {
              setChecked(next)
              setIsLoading(false)
            }, 1000)
          }}
        />
      )
    }
    return <Demo />
  },
}

export const Colors: Story = {
  render: () => (
    <div className="space-y-4">
      <Switcher defaultChecked toggledClass="bg-success" aria-label="Success switcher" />
      <Switcher defaultChecked toggledClass="bg-error" aria-label="Error switcher" />
    </div>
  ),
}

export const Controlled: Story = {
  render: () => {
    const Demo = () => {
      const [checked, setChecked] = useState(false)
      return <Switcher checked={checked} onChange={setChecked} aria-label="Controlled switcher" />
    }
    return <Demo />
  },
}

export const SwitcherStory: Story = {
  name: 'Switcher',
  args: { 'aria-label': 'Switcher' },
}
