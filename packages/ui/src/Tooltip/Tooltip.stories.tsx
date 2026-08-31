import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip } from './Tooltip'
import { Button } from '../Button'

const meta = {
  title: 'Feedback/Tooltip',
  component: Tooltip,
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
  },
  args: { title: 'Tooltip message', children: <span className="cursor-pointer">Hover me</span> },
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {}

export const Customize: Story = {
  render: () => (
    <Tooltip
      title={
        <span>
          <strong className="font-semibold">Status:</strong> ready for review
        </span>
      }
      wrapperClass="items-center"
    >
      <Button>Custom content</Button>
    </Tooltip>
  ),
}

export const Placement: Story = {
  render: () => (
    <div className="grid max-w-2xl grid-cols-1 gap-4 md:grid-cols-5">
      <div />
      <Tooltip title="Top start" placement="top-start">
        <button
          className="w-full rounded-md border border-border bg-surface px-4 py-2 text-center text-sm text-content hover:bg-surface-sunken"
          type="button"
        >
          Top start
        </button>
      </Tooltip>
      <Tooltip title="Top" placement="top">
        <button
          className="w-full rounded-md border border-border bg-surface px-4 py-2 text-center text-sm text-content hover:bg-surface-sunken"
          type="button"
        >
          Top
        </button>
      </Tooltip>
      <Tooltip title="Top end" placement="top-end">
        <button
          className="w-full rounded-md border border-border bg-surface px-4 py-2 text-center text-sm text-content hover:bg-surface-sunken"
          type="button"
        >
          Top end
        </button>
      </Tooltip>
      <div />
      <Tooltip title="Left start" placement="left-start">
        <button
          className="w-full rounded-md border border-border bg-surface px-4 py-2 text-center text-sm text-content hover:bg-surface-sunken"
          type="button"
        >
          Left start
        </button>
      </Tooltip>
      <div />
      <div />
      <div />
      <Tooltip title="Right start" placement="right-start">
        <button
          className="w-full rounded-md border border-border bg-surface px-4 py-2 text-center text-sm text-content hover:bg-surface-sunken"
          type="button"
        >
          Right start
        </button>
      </Tooltip>
      <Tooltip title="Left" placement="left">
        <button
          className="w-full rounded-md border border-border bg-surface px-4 py-2 text-center text-sm text-content hover:bg-surface-sunken"
          type="button"
        >
          Left
        </button>
      </Tooltip>
      <div />
      <div />
      <div />
      <Tooltip title="Right" placement="right">
        <button
          className="w-full rounded-md border border-border bg-surface px-4 py-2 text-center text-sm text-content hover:bg-surface-sunken"
          type="button"
        >
          Right
        </button>
      </Tooltip>
      <Tooltip title="Left end" placement="left-end">
        <button
          className="w-full rounded-md border border-border bg-surface px-4 py-2 text-center text-sm text-content hover:bg-surface-sunken"
          type="button"
        >
          Left end
        </button>
      </Tooltip>
      <div />
      <div />
      <div />
      <Tooltip title="Right end" placement="right-end">
        <button
          className="w-full rounded-md border border-border bg-surface px-4 py-2 text-center text-sm text-content hover:bg-surface-sunken"
          type="button"
        >
          Right end
        </button>
      </Tooltip>
      <div />
      <Tooltip title="Bottom start" placement="bottom-start">
        <button
          className="w-full rounded-md border border-border bg-surface px-4 py-2 text-center text-sm text-content hover:bg-surface-sunken"
          type="button"
        >
          Bottom start
        </button>
      </Tooltip>
      <Tooltip title="Bottom" placement="bottom">
        <button
          className="w-full rounded-md border border-border bg-surface px-4 py-2 text-center text-sm text-content hover:bg-surface-sunken"
          type="button"
        >
          Bottom
        </button>
      </Tooltip>
      <Tooltip title="Bottom end" placement="bottom-end">
        <button
          className="w-full rounded-md border border-border bg-surface px-4 py-2 text-center text-sm text-content hover:bg-surface-sunken"
          type="button"
        >
          Bottom end
        </button>
      </Tooltip>
      <div />
    </div>
  ),
}

export const TooltipStory: Story = {
  name: 'Tooltip',
  args: { open: true },
}
