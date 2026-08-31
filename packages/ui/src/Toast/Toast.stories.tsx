import type { Meta, StoryObj } from '@storybook/react'
import { Toaster } from './Toaster'
import { Notification } from './Notification'
import { toast } from './store'
import { Button } from '../Button'
import type { NotificationType, ToastPlacement } from './types'

const meta = {
  title: 'Feedback/Toast',
  component: Toaster,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <>
      <Toaster />
      <Button
        variant="solid"
        onClick={() =>
          toast.push(
            <Notification title="Saved" type="success">
              Your changes have been saved.
            </Notification>,
          )
        }
      >
        Show toast
      </Button>
    </>
  ),
}

export const Types: Story = {
  render: () => (
    <>
      <Toaster />
      <div className="flex flex-wrap gap-2">
        {(['info', 'success', 'warning', 'danger'] as NotificationType[]).map((type) => (
          <Button
            key={type}
            onClick={() =>
              toast.push(
                <Notification title={type} type={type}>
                  A {type} notification.
                </Notification>,
              )
            }
          >
            {type}
          </Button>
        ))}
      </div>
    </>
  ),
}

export const Placement: Story = {
  render: () => (
    <>
      <Toaster />
      <div className="grid grid-cols-3 gap-2">
        {(
          [
            'top-start',
            'top-center',
            'top-end',
            'bottom-start',
            'bottom-center',
            'bottom-end',
          ] as ToastPlacement[]
        ).map((placement) => (
          <Button
            key={placement}
            size="sm"
            onClick={() =>
              toast.push(<Notification title={placement}>Placed at {placement}.</Notification>, {
                placement,
              })
            }
          >
            {placement}
          </Button>
        ))}
      </div>
    </>
  ),
}
