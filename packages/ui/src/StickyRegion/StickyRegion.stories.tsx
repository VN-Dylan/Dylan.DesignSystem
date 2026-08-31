import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { StickyRegion } from './StickyRegion'

const meta = {
  title: 'Primitives/StickyRegion',
  component: StickyRegion,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof StickyRegion>

export default meta
type Story = StoryObj<typeof meta>

const Items = () => (
  <div className="mt-4 space-y-4">
    {Array.from({ length: 10 }).map((_, index) => (
      <p key={index} className="rounded-md bg-surface-sunken p-4 text-sm text-content">
        Content item {index + 1}
      </p>
    ))}
  </div>
)

export const Basic: Story = {
  render: () => (
    <div className="h-64 w-96 overflow-auto rounded-md border border-border">
      <div className="p-4">
        <p className="mb-4 text-sm text-content-muted">Scroll down to see the sticky header.</p>
        <StickyRegion className="border-b border-border bg-surface p-4">
          <h5 className="font-semibold">Sticky Header</h5>
        </StickyRegion>
        <Items />
      </div>
    </div>
  ),
}

export const StickyHeader: Story = Basic

export const WithOffsetAndCallback: Story = {
  name: 'With Offset & Callback',
  render: () => {
    const Demo = () => {
      const [sticky, setSticky] = useState(false)

      return (
        <div className="h-64 w-96 overflow-auto rounded-md border border-border">
          <div className="p-4">
            <p className="mb-4 text-sm text-content-muted">This region has an offset callback.</p>
            <StickyRegion
              offsetTop={10}
              onStickyChange={setSticky}
              className="rounded-lg border border-border bg-surface p-2"
              stickyClassName="rounded-b"
            >
              <h5 className="font-semibold">{sticky ? 'Now Sticky' : 'Not Sticky Yet'}</h5>
            </StickyRegion>
            <Items />
          </div>
        </div>
      )
    }
    return <Demo />
  },
}

export const NotStickyYet: Story = {
  render: () => (
    <StickyRegion triggerOffset={500} className="rounded-md border border-border bg-surface p-4">
      Not sticky yet
    </StickyRegion>
  ),
}

export const StickyRegionStory: Story = {
  name: 'StickyRegion',
  args: { children: 'Sticky region' },
}
