import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Popover } from './Popover'
import { Button } from '../Button'

const content = (
  <div className="flex flex-col gap-y-4">
    <div>
      <h6 className="mb-2 font-semibold">Cumulative Growth Analysis</h6>
      <p className="text-content-muted">
        This report tracks the overall, long-term expansion of community engagement.
      </p>
    </div>
  </div>
)

const meta = {
  title: 'Feedback/Popover',
  component: Popover,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'right',
        'right-start',
        'right-end',
        'left',
        'left-start',
        'left-end',
      ],
    },
    trigger: { control: 'inline-radio', options: ['click', 'hover'] },
  },
  args: { title: 'Click me', children: content },
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {}

export const Placement: Story = {
  render: () => (
    <div className="grid max-w-2xl grid-cols-1 gap-4 md:grid-cols-5">
      <div />
      <Popover title="Top start" placement="top-start">
        {content}
      </Popover>
      <Popover title="Top" placement="top">
        {content}
      </Popover>
      <Popover title="Top end" placement="top-end">
        {content}
      </Popover>
      <div />
      <Popover title="Left start" placement="left-start">
        {content}
      </Popover>
      <div />
      <div />
      <div />
      <Popover title="Right start" placement="right-start">
        {content}
      </Popover>
      <Popover title="Left" placement="left">
        {content}
      </Popover>
      <div />
      <div />
      <div />
      <Popover title="Right" placement="right">
        {content}
      </Popover>
      <Popover title="Left end" placement="left-end">
        {content}
      </Popover>
      <div />
      <div />
      <div />
      <Popover title="Right end" placement="right-end">
        {content}
      </Popover>
      <div />
      <Popover title="Bottom start" placement="bottom-start">
        {content}
      </Popover>
      <Popover title="Bottom" placement="bottom">
        {content}
      </Popover>
      <Popover title="Bottom end" placement="bottom-end">
        {content}
      </Popover>
      <div />
    </div>
  ),
}

export const CustomizeTrigger: Story = {
  name: 'Customize Trigger',
  render: () => (
    <Popover title="Click me" renderTrigger={<Button>Custom Trigger</Button>}>
      {content}
    </Popover>
  ),
}

export const Width: Story = {
  render: () => (
    <Popover title="Click me" width={360} placement="bottom-start">
      <div className="space-y-4">
        <h5 className="text-base font-semibold">Daily standup call</h5>
        <p className="text-content-muted">
          A short meeting where team members synchronize work and share updates.
        </p>
        <div className="flex justify-end">
          <Button>Join Meeting</Button>
        </div>
      </div>
    </Popover>
  ),
}

export const Controlled: Story = {
  render: () => {
    const Demo = () => {
      const [open, setOpen] = useState(false)
      return (
        <Popover
          title={open ? 'Close details' : 'Open details'}
          open={open}
          onOpenChange={setOpen}
          placement="bottom-start"
        >
          {content}
        </Popover>
      )
    }
    return <Demo />
  },
}

export const PopoverStory: Story = {
  name: 'Popover',
  args: { open: true },
}
