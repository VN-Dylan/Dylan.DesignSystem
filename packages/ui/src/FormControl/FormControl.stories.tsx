import type { Meta, StoryObj } from '@storybook/react'
import { Form } from './FormControl'
import { Input } from '../Input'
import { Select } from '../Select'
import { ActionGroup } from '../ActionGroup'
import { Button } from '../Button'

const meta = {
  title: 'Forms/FormControl',
  component: Form,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof Form>

export default meta
type Story = StoryObj<typeof meta>

const narrow: Story['decorators'] = [(Story) => <div className="max-w-md">{Story()}</div>]

export const Basic: Story = {
  decorators: narrow,
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
      <ActionGroup divided aria-label="Form actions">
        <Button>Cancel</Button>
        <Button variant="solid" type="submit">
          Save
        </Button>
      </ActionGroup>
    </Form>
  ),
}

export const Layouts: Story = {
  decorators: narrow,
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

/** Titled groups on a responsive grid; `span` widens an item, `hint` adds helper text. */
export const Groups: Story = {
  decorators: [(Story) => <div className="max-w-3xl">{Story()}</div>],
  render: () => (
    <Form onSubmit={(e) => e.preventDefault()}>
      <Form.Group title="Contact" description="Who we talk to at this account." columns={2}>
        <Form.Item label="Full name" asterisk>
          <Input placeholder="Ada Lovelace" />
        </Form.Item>
        <Form.Item label="Email" asterisk errorMessage="Enter a valid email address.">
          <Input type="email" invalid defaultValue="ada@" />
        </Form.Item>
        <Form.Item label="Phone" hint="Include the country code.">
          <Input type="tel" />
        </Form.Item>
      </Form.Group>
      <Form.Group title="Account" columns={2} divided>
        <Form.Item label="Plan">
          <Select
            options={[
              { label: 'Starter', value: 'starter' },
              { label: 'Business', value: 'business' },
            ]}
          />
        </Form.Item>
        <Form.Item label="Seats">
          <Input inputMode="numeric" defaultValue="5" />
        </Form.Item>
        <Form.Item label="Notes" span="full" extra="Optional">
          <Input textArea rows={3} />
        </Form.Item>
      </Form.Group>
      <ActionGroup divided aria-label="Form actions">
        <Button>Cancel</Button>
        <Button variant="solid" type="submit">
          Save
        </Button>
      </ActionGroup>
    </Form>
  ),
}
