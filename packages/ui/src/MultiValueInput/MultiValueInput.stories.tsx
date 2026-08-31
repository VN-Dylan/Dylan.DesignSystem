import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { MultiValueInput } from './MultiValueInput'

const meta = {
  title: 'Forms/MultiValueInput',
  component: MultiValueInput,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof MultiValueInput>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    placeholder: 'Type and press Enter to add tags',
    defaultValue: ['React', 'TypeScript'],
  },
}

export const Controlled: Story = {
  render: () => {
    const Demo = () => {
      const [tags, setTags] = useState<string[]>(['JavaScript', 'CSS'])
      return (
        <div className="space-y-4">
          <MultiValueInput value={tags} onChange={setTags} placeholder="Add skills..." />
          <p className="text-sm text-content-muted">Current tags: {tags.join(', ') || 'None'}</p>
        </div>
      )
    }
    return <Demo />
  },
}

export const WithValidation: Story = {
  render: () => {
    const Demo = () => {
      const [error, setError] = useState('')
      const validateEmail = (tag: string) => {
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(tag)
        setError(isValid ? '' : 'Please enter a valid email address')
        return isValid
      }

      return (
        <div className="space-y-2">
          <MultiValueInput
            placeholder="Enter email addresses..."
            validate={validateEmail}
            defaultValue={['user@example.com']}
            invalid={error !== ''}
          />
          {error && <p className="text-sm text-error">{error}</p>}
        </div>
      )
    }
    return <Demo />
  },
}

export const MaxTags: Story = {
  render: () => (
    <div className="space-y-2">
      <MultiValueInput
        placeholder="Add up to 5 tags..."
        maxTags={5}
        defaultValue={['Tag 1', 'Tag 2', 'Tag 3']}
      />
      <p className="text-sm text-content-muted">Maximum 5 tags allowed</p>
    </div>
  ),
}

export const MultiValueInputDemo: Story = {
  name: 'MultiValueInput',
  args: { placeholder: 'Add values', size: 'md' },
}
