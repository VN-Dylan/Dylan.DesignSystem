import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Dialog } from './Dialog'
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
          <Dialog isOpen={open} onClose={() => setOpen(false)} aria-labelledby="dlg-title">
            <h2 id="dlg-title" className="text-lg font-semibold">
              Delete project
            </h2>
            <p className="mt-2 text-content-muted">
              This permanently removes the project and its history. This action cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-2">
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button
                variant="solid"
                className="!border-error !bg-error hover:!brightness-95"
                onClick={() => setOpen(false)}
              >
                Delete
              </Button>
            </div>
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
          >
            <p>You must choose an option to continue.</p>
            <div className="mt-4 flex justify-end">
              <Button variant="solid" onClick={() => setOpen(false)}>
                Got it
              </Button>
            </div>
          </Dialog>
        </>
      )
    }
    return <Demo />
  },
}
