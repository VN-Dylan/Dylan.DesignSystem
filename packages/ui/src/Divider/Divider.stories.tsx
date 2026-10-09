import type { Meta, StoryObj } from '@storybook/react'
import { Stack } from '../Stack'
import { Divider } from './Divider'

const meta = {
  title: 'Common/Divider',
  component: Divider,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
    spacing: { control: 'inline-radio', options: ['none', 'tight', 'base'] },
  },
  args: { orientation: 'horizontal', spacing: 'base' },
} satisfies Meta<typeof Divider>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  render: () => (
    <div className="w-72">
      <p className="text-sm text-content-muted">Content above the divider</p>
      <Divider />
      <p className="text-sm text-content-muted">Content below the divider</p>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="flex h-8 items-center">
      <span className="text-sm text-content-muted">Left content</span>
      <Divider orientation="vertical" />
      <span className="text-sm text-content-muted">Right content</span>
    </div>
  ),
}

export const SpacingVariants: Story = {
  render: () => (
    <Stack gap="base" className="w-72">
      {(['none', 'tight', 'base'] as const).map((spacing) => (
        <div key={spacing}>
          <span className="text-sm text-content-muted">{spacing}</span>
          <Divider spacing={spacing} />
        </div>
      ))}
    </Stack>
  ),
}

export const WithLabel: Story = {
  args: { label: 'Account details' },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
}

export const Decorative: Story = {
  args: { role: 'none', spacing: 'tight' },
}

export const RightToLeft: Story = {
  args: { dir: 'rtl', label: 'تفاصيل الحساب' },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
}

export const DividerStory: Story = {
  name: 'Divider',
  args: { 'aria-label': 'Section divider' },
}
