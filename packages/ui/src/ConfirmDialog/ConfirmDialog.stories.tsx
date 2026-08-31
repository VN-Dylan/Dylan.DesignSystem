import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from '../Button'
import { Radio } from '../Radio'
import { ConfirmDialog } from './ConfirmDialog'
import type { ConfirmDialogType } from './types'

type DialogTypeKey = 'Info' | 'Success' | 'Warning' | 'Danger'

const dialogType: Record<
  DialogTypeKey,
  {
    type: ConfirmDialogType
    title: string
    children: string
    confirmText: string
  }
> = {
  Info: {
    type: 'info',
    title: 'Note',
    children: 'Just some information for you!',
    confirmText: 'Okay',
  },
  Success: {
    type: 'success',
    title: 'Complete!',
    children: 'Just some success message for you!',
    confirmText: 'All Good',
  },
  Warning: {
    type: 'warning',
    title: 'Warning',
    children: 'Just some warning message for you!',
    confirmText: 'Understand',
  },
  Danger: {
    type: 'danger',
    title: 'Delete',
    children: 'Are you sure you want to delete?',
    confirmText: 'Delete',
  },
}

const meta = {
  title: 'Feedback/ConfirmDialog',
  component: ConfirmDialog,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof ConfirmDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  render: () => {
    const Demo = () => {
      const [selected, setSelected] = useState<DialogTypeKey>('Info')
      const [open, setOpen] = useState(false)
      const current = dialogType[selected]

      return (
        <div className="flex flex-col gap-6">
          <Radio.Group value={selected} onChange={(value) => setSelected(value as DialogTypeKey)}>
            {Object.keys(dialogType).map((value) => (
              <Radio key={value} value={value}>
                {value}
              </Radio>
            ))}
          </Radio.Group>
          <div>
            <Button onClick={() => setOpen(true)}>Trigger</Button>
          </div>
          <ConfirmDialog
            isOpen={open}
            type={current.type}
            title={current.title}
            confirmText={current.confirmText}
            onClose={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            onConfirm={() => setOpen(false)}
          >
            <p>{current.children}</p>
          </ConfirmDialog>
        </div>
      )
    }
    return <Demo />
  },
}

export const ConfirmDialogStory: Story = {
  name: 'ConfirmDialog',
  args: {
    isOpen: true,
    title: 'Note',
    children: <p>Just some information for you!</p>,
  },
}
