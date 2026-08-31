import type { Meta, StoryObj } from '@storybook/react'
import { Form } from './FormControl'
import { Input } from '../Input'
import { Select } from '../Select'
import { Button } from '../Button'

const meta = {
  title: 'Forms/FormControl',
  component: Form,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Form>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <Form onSubmit={(e) => e.preventDefault()}>
      <Form.Item label="Name" htmlFor="name" asterisk>
        <Input id="name" placeholder="Ada Lovelace" />
      </Form.Item>
      <Form.Item label="Email" htmlFor="email" errorMessage="Enter a valid email address.">
        <Input id="email" invalid defaultValue="not-an-email" />
      </Form.Item>
      <Form.Item label="Role" htmlFor="role" extra="Optional">
        <Select
          id="role"
          options={[
            { label: 'Engineer', value: 'eng' },
            { label: 'Designer', value: 'design' },
          ]}
          aria-label="Role"
        />
      </Form.Item>
      <Button variant="solid" type="submit">
        Save
      </Button>
    </Form>
  ),
}

export const Layouts: Story = {
  render: () => (
    <div className="space-y-8">
      {(['vertical', 'horizontal', 'inline'] as const).map((layout) => (
        <Form key={layout} layout={layout} onSubmit={(e) => e.preventDefault()}>
          <Form.Item label="First name" htmlFor={`${layout}-f`}>
            <Input id={`${layout}-f`} />
          </Form.Item>
          <Form.Item label="Last name" htmlFor={`${layout}-l`}>
            <Input id={`${layout}-l`} />
          </Form.Item>
        </Form>
      ))}
    </div>
  ),
}
