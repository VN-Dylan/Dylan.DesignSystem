import type { Meta, StoryObj } from '@storybook/react'
import { Stack } from '../Stack'
import { Section } from './Section'

const meta = {
  title: 'Primitives/Section',
  component: Section,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  argTypes: {
    spacing: { control: 'inline-radio', options: ['base', 'loose', 'none'] },
    tone: { control: 'inline-radio', options: ['default', 'subtle'] },
    containerSize: {
      control: 'select',
      options: ['prose', 'narrow', 'default', 'wide', 'full'],
    },
  },
  args: { spacing: 'base', tone: 'default', contained: true, children: 'Section content' },
} satisfies Meta<typeof Section>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const SpacingVariants: Story = {
  render: () => (
    <Stack gap={0}>
      {(['none', 'base', 'loose'] as const).map((spacing) => (
        <Section key={spacing} spacing={spacing} tone="subtle">
          <strong>{spacing}</strong>
        </Section>
      ))}
    </Stack>
  ),
}

export const Tones: Story = {
  render: () => (
    <Stack gap={0}>
      <Section spacing="none" tone="default">
        Default surface
      </Section>
      <Section spacing="none" tone="subtle">
        Subtle surface
      </Section>
    </Stack>
  ),
}

export const Uncontained: Story = {
  args: { contained: false, children: 'This content is not wrapped in Container.' },
}

export const RightToLeft: Story = {
  args: { dir: 'rtl', tone: 'subtle', children: 'قسم من اليمين إلى اليسار' },
}
