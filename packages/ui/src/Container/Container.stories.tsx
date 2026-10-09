import type { Meta, StoryObj } from '@storybook/react'
import { Stack } from '../Stack'
import { Container } from './Container'

const meta = {
  title: 'Common/Container',
  component: Container,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['prose', 'narrow', 'default', 'wide', 'full'],
    },
  },
  args: { asElement: 'div', size: 'default', gutter: true },
} satisfies Meta<typeof Container>

export default meta
type Story = StoryObj<typeof meta>

const contentClass = 'border border-border bg-surface-sunken p-4 text-sm text-content'

export const Example: Story = {
  render: (args) => (
    <Container {...args}>
      <div className={contentClass}>Content</div>
    </Container>
  ),
}

export const Sizes: Story = {
  render: () => (
    <Stack gap="loose">
      {(['prose', 'narrow', 'default', 'wide', 'full'] as const).map((size) => (
        <Container key={size} size={size}>
          <div className={contentClass}>{size}</div>
        </Container>
      ))}
    </Stack>
  ),
}

export const WithoutGutter: Story = {
  render: () => (
    <Container gutter={false}>
      <div className={contentClass}>No page gutter</div>
    </Container>
  ),
}

export const RightToLeft: Story = {
  render: () => (
    <Container dir="rtl" asElement="section" aria-label="RTL container">
      <div className={contentClass}>محتوى من اليمين إلى اليسار</div>
    </Container>
  ),
}

export const ContainerStory: Story = {
  name: 'Container',
  render: () => (
    <Container asElement="section" aria-label="Container section">
      <div className={contentClass}>Content</div>
    </Container>
  ),
}
