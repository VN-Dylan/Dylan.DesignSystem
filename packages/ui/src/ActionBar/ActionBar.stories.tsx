import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { ActionBar } from './ActionBar'
import { Button } from '../Button'

const meta = {
  title: 'Feedback/ActionBar',
  component: ActionBar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof ActionBar>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => {
    const Demo = () => {
      const [count, setCount] = useState(0)
      return (
        <>
          <div className="flex gap-2">
            <Button onClick={() => setCount((c) => c + 1)}>Select item ({count})</Button>
            <Button onClick={() => setCount(0)}>Clear</Button>
          </div>
          <ActionBar open={count > 0} onOpenChange={() => setCount(0)}>
            <span className="font-medium">{count} selected</span>
            <span className="flex-1" />
            <Button size="sm" variant="plain" onClick={() => setCount(0)}>
              Cancel
            </Button>
            <Button size="sm" variant="solid">
              Delete
            </Button>
          </ActionBar>
        </>
      )
    }
    return <Demo />
  },
}
