import type { Meta, StoryObj } from '@storybook/react'
import { Divider } from '../Divider'
import { Inline } from './Inline'

const meta = {
  title: 'Primitives/Inline',
  component: Inline,
  tags: ['autodocs'],
  argTypes: {
    gap: {
      control: 'select',
      options: ['tight', 'base', 'loose', 'group', 0, 1, 2, 3, 4, 6, 8, 12, 16, 24],
    },
    align: { control: 'inline-radio', options: ['start', 'center', 'end', 'stretch', 'baseline'] },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
    },
  },
  args: { gap: 'base', align: 'center', wrap: false },
} satisfies Meta<typeof Inline>

export default meta
type Story = StoryObj<typeof meta>

const itemClass = 'rounded-md border border-border bg-surface-sunken p-4 text-content'
const gaps = ['tight', 'base', 'loose', 'group', 0, 1, 2, 3, 4, 6, 8, 12, 16, 24] as const

export const Playground: Story = {
  render: (args) => (
    <Inline {...args}>
      <div className={itemClass}>First</div>
      <div className={itemClass}>Second</div>
      <div className={itemClass}>Third</div>
    </Inline>
  ),
}

export const GapVariants: Story = {
  render: () => (
    <Inline wrap gap="group">
      {gaps.map((gap) => (
        <Inline key={gap} gap={gap} divider={<Divider orientation="vertical" spacing="none" />}>
          <strong>{String(gap)}</strong>
          <span>Item</span>
        </Inline>
      ))}
    </Inline>
  ),
}

export const WrappedAndJustified: Story = {
  render: () => (
    <Inline wrap justify="between" className="max-w-narrow">
      <div className={itemClass}>First item</div>
      <div className={itemClass}>Second item</div>
      <div className={itemClass}>Third item</div>
    </Inline>
  ),
}

export const RightToLeft: Story = {
  render: () => (
    <Inline dir="rtl" asElement="nav" aria-label="RTL actions">
      <div className={itemClass}>السابق</div>
      <div className={itemClass}>التالي</div>
    </Inline>
  ),
}
