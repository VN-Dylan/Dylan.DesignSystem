import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Dialog } from './Dialog'
import { ActionGroup } from '../ActionGroup'
import { Button } from '../Button'

const meta = {
  title: 'Feedback/Dialog',
  component: Dialog,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => {
    const Demo = () => {
      const [open, setOpen] = useState(false)
      return (
        <>
          <Button variant="solid" onClick={() => setOpen(true)}>
            Open dialog
          </Button>
          <Dialog
            isOpen={open}
            onClose={() => setOpen(false)}
            title="Delete project"
            footer={
              <ActionGroup>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button variant="solid" tone="danger" onClick={() => setOpen(false)}>
                  Delete
                </Button>
              </ActionGroup>
            }
          >
            <p className="text-content-muted">
              This permanently removes the project and its history. This action cannot be undone.
            </p>
          </Dialog>
        </>
      )
    }
    return <Demo />
  },
}

export const NonDismissable: Story = {
  render: () => {
    const Demo = () => {
      const [open, setOpen] = useState(false)
      return (
        <>
          <Button onClick={() => setOpen(true)}>Open (Esc / backdrop disabled)</Button>
          <Dialog
            isOpen={open}
            onClose={() => setOpen(false)}
            closable={false}
            shouldCloseOnEsc={false}
            shouldCloseOnOverlayClick={false}
            aria-label="Confirm"
            footer={
              <ActionGroup>
                <Button variant="solid" onClick={() => setOpen(false)}>
                  Got it
                </Button>
              </ActionGroup>
            }
          >
            <p>You must choose an option to continue.</p>
          </Dialog>
        </>
      )
    }
    return <Demo />
  },
}

/** Content taller than the device: the panel stops at the viewport, the body scrolls, and the footer stays visible. */
export const LongContent: Story = {
  render: () => {
    const Demo = () => {
      const [open, setOpen] = useState(false)
      return (
        <>
          <Button variant="solid" onClick={() => setOpen(true)}>
            Open long dialog
          </Button>
          <Dialog
            isOpen={open}
            onClose={() => setOpen(false)}
            title="Terms of service"
            footer={
              <ActionGroup>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button variant="solid" onClick={() => setOpen(false)}>
                  Accept
                </Button>
              </ActionGroup>
            }
          >
            <div className="space-y-4 text-sm text-content-muted">
              {Array.from({ length: 30 }, (_, index) => (
                <p key={index}>
                  {index + 1}. The service is provided as is. Usage is subject to the policies
                  published by the workspace owner and may change without notice.
                </p>
              ))}
            </div>
          </Dialog>
        </>
      )
    }
    return <Demo />
  },
}
