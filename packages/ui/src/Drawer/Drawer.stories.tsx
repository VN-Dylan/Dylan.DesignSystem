import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Drawer } from './Drawer'
import { Button } from '../Button'
import type { DrawerPlacement } from './types'

const meta = {
  title: 'Feedback/Drawer',
  component: Drawer,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => {
    const Demo = () => {
      const [open, setOpen] = useState(false)
      return (
        <>
          <Button variant="solid" onClick={() => setOpen(true)}>
            Open drawer
          </Button>
          <Drawer
            isOpen={open}
            onClose={() => setOpen(false)}
            title="Filters"
            footer={
              <div className="flex justify-end gap-2">
                <Button onClick={() => setOpen(false)}>Reset</Button>
                <Button variant="solid" onClick={() => setOpen(false)}>
                  Apply
                </Button>
              </div>
            }
          >
            <p className="text-content-muted">Drawer body content goes here.</p>
          </Drawer>
        </>
      )
    }
    return <Demo />
  },
}

export const Placement: Story = {
  render: () => {
    const Demo = () => {
      const [placement, setPlacement] = useState<DrawerPlacement | null>(null)
      return (
        <>
          <div className="flex flex-wrap gap-2">
            {(['top', 'right', 'bottom', 'left'] as const).map((p) => (
              <Button key={p} onClick={() => setPlacement(p)}>
                {p}
              </Button>
            ))}
          </div>
          <Drawer
            isOpen={placement !== null}
            placement={placement ?? 'right'}
            onClose={() => setPlacement(null)}
            title={`Placement: ${placement}`}
          >
            <p className="text-content-muted">Slides from the {placement} edge.</p>
          </Drawer>
        </>
      )
    }
    return <Demo />
  },
}
