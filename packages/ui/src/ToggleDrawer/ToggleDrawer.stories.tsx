import type { Meta, StoryObj } from '@storybook/react'
import { useRef } from 'react'
import { Button } from '../Button'
import { ToggleDrawer } from './ToggleDrawer'
import type { ToggleDrawerPlacement, ToggleDrawerRef } from './types'

const meta = {
  title: 'Navigation/ToggleDrawer',
  component: ToggleDrawer,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof ToggleDrawer>

export default meta
type Story = StoryObj<typeof meta>

const DrawerContent = () => (
  <div className="space-y-4">
    <h5 className="font-semibold">Navigation</h5>
    <ul className="space-y-2 text-sm">
      {['Home', 'Dashboard', 'Settings', 'Profile'].map((item) => (
        <li key={item} className="rounded-md p-2 hover:bg-surface-sunken">
          {item}
        </li>
      ))}
    </ul>
  </div>
)

export const Basic: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <ToggleDrawer title="Menu">
        <DrawerContent />
      </ToggleDrawer>
      <span className="text-sm text-content-muted">Click the toggle button to open the drawer</span>
    </div>
  ),
}

export const Placement: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      {(['left', 'right', 'top', 'bottom'] as ToggleDrawerPlacement[]).map((placement) => (
        <ToggleDrawer key={placement} placement={placement} title={`${placement} drawer`}>
          <DrawerContent />
        </ToggleDrawer>
      ))}
    </div>
  ),
}

export const ToggleDrawerStory: Story = {
  name: 'ToggleDrawer',
  args: { title: 'Menu', children: <DrawerContent /> },
}

export const ToggleDrawerRefStory: Story = {
  name: 'ToggleDrawerRef',
  render: () => {
    const Demo = () => {
      const drawerRef = useRef<ToggleDrawerRef>(null)
      return (
        <div className="flex items-center gap-3">
          <ToggleDrawer ref={drawerRef} title="Menu">
            <DrawerContent />
          </ToggleDrawer>
          <Button onClick={() => drawerRef.current?.handleOpenDrawer()}>Open with ref</Button>
        </div>
      )
    }
    return <Demo />
  },
}
