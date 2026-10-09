import type { Meta, StoryObj } from '@storybook/react'
import { Inline } from '../Inline'
import { Spacer } from './Spacer'

const meta = {
  title: 'Primitives/Spacer',
  component: Spacer,
  tags: ['autodocs'],
  argTypes: { size: { control: 'select', options: [undefined, 0, 1, 2, 3, 4, 6, 8, 12, 16, 24] } },
} satisfies Meta<typeof Spacer>

export default meta
type Story = StoryObj<typeof meta>

const itemClass = 'rounded-md bg-primary p-2 text-primary-fg'
const sizes = [0, 1, 2, 3, 4, 6, 8, 12, 16, 24] as const

export const Flexible: Story = {
  render: () => (
    <Inline className="w-full">
      <span className={itemClass}>Start</span>
      <Spacer />
      <span className={itemClass}>End</span>
    </Inline>
  ),
}

export const FixedSizes: Story = {
  render: () => (
    <div className="grid gap-base">
      {sizes.map((size) => (
        <Inline key={size} gap={0}>
          <span className="w-8 text-sm text-content-muted">{size}</span>
          <Spacer size={size} />
          <span className={itemClass}>End</span>
        </Inline>
      ))}
    </div>
  ),
}

export const RightToLeft: Story = {
  render: () => (
    <Inline dir="rtl" className="w-full">
      <span className={itemClass}>البداية</span>
      <Spacer />
      <span className={itemClass}>النهاية</span>
    </Inline>
  ),
}
