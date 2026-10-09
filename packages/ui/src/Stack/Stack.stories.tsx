import type { Meta, StoryObj } from '@storybook/react'
import { Divider } from '../Divider'
import { Stack } from './Stack'

const meta = {
  title: 'Primitives/Stack',
  component: Stack,
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
  args: { gap: 'base', children: ['First', 'Second', 'Third'] },
} satisfies Meta<typeof Stack>

export default meta
type Story = StoryObj<typeof meta>

const itemClass = 'rounded-md border border-border bg-surface-sunken p-4 text-content'
const gaps = ['tight', 'base', 'loose', 'group', 0, 1, 2, 3, 4, 6, 8, 12, 16, 24] as const

export const Playground: Story = {
  render: (args) => (
    <Stack {...args}>
      <div className={itemClass}>First</div>
      <div className={itemClass}>Second</div>
      <div className={itemClass}>Third</div>
    </Stack>
  ),
}

export const GapVariants: Story = {
  render: () => (
    <Stack gap="group">
      {gaps.map((gap) => (
        <Stack key={gap} gap={gap}>
          <strong>{String(gap)}</strong>
          <div className={itemClass}>Item</div>
          <div className={itemClass}>Item</div>
        </Stack>
      ))}
    </Stack>
  ),
}

export const AlignmentAndDivider: Story = {
  render: () => (
    <Stack align="center" divider={<Divider spacing="none" />}>
      <div className={itemClass}>Short</div>
      <div className={itemClass}>A wider stack item</div>
      <div className={itemClass}>Medium</div>
    </Stack>
  ),
}

export const RightToLeft: Story = {
  render: () => (
    <Stack dir="rtl" asElement="section" aria-label="RTL stack">
      <div className={itemClass}>العنصر الأول</div>
      <div className={itemClass}>العنصر الثاني</div>
    </Stack>
  ),
}
