import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { ReactionEmojiPicker } from './ReactionEmojiPicker'

const meta = {
  title: 'Feedback/ReactionEmojiPicker',
  component: ReactionEmojiPicker,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof ReactionEmojiPicker>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => {
    const Demo = () => {
      const [picked, setPicked] = useState<string[]>([])
      return (
        <div className="flex items-center gap-2">
          {picked.map((e, i) => (
            <span key={i} className="text-lg">
              {e}
            </span>
          ))}
          <ReactionEmojiPicker onSelect={(e) => setPicked((p) => [...p, e])} />
        </div>
      )
    }
    return <Demo />
  },
}
