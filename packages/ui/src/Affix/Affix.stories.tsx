import type { Meta, StoryObj } from '@storybook/react'
import { Affix } from './Affix'
import { Button } from '../Button'

const meta = {
  title: 'Common/Affix',
  component: Affix,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    offset: { control: 'number' },
  },
} satisfies Meta<typeof Affix>

export default meta
type Story = StoryObj<typeof meta>

const ScrollContent = () => (
  <div className="space-y-8 py-8 text-xl text-content-muted">
    {Array.from({ length: 12 }, (_, index) => (
      <p key={index}>Scroll down</p>
    ))}
  </div>
)

export const Basic: Story = {
  render: () => (
    <div className="flex flex-col justify-between">
      <Affix>
        <Button variant="solid">This will stick to top</Button>
      </Affix>
      <ScrollContent />
    </div>
  ),
}

export const Offset: Story = {
  render: () => (
    <div className="flex flex-col justify-between">
      <Affix offset={80}>
        <Button variant="solid">This will stick to top with offset</Button>
      </Affix>
      <ScrollContent />
    </div>
  ),
}

export const AffixStory: Story = {
  name: 'Affix',
  render: () => (
    <Affix>
      <Button variant="solid">This will stick to top</Button>
    </Affix>
  ),
}
