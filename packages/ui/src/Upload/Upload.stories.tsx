import type { Meta, StoryObj } from '@storybook/react'
import { Upload } from './Upload'

const meta = {
  title: 'Forms/Upload',
  component: Upload,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Upload>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: { tip: 'PNG, JPG or PDF up to 5MB.' },
}

export const DragAndDrop: Story = {
  args: { draggable: true, tip: 'Up to 3 files.', uploadLimit: 3 },
}

export const Disabled: Story = {
  args: { disabled: true, draggable: true },
}

export const WithValidation: Story = {
  args: {
    accept: 'image/*',
    tip: 'Images only.',
    beforeUpload: (file) => file.type.startsWith('image/'),
  },
}
