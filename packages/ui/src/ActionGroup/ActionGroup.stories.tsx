import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../Button'
import { Card } from '../Card'
import { Stack } from '../Stack'
import { ActionGroup } from './ActionGroup'

const meta = {
  title: 'Layout/ActionGroup',
  component: ActionGroup,
  tags: ['autodocs'],
  argTypes: {
    align: { control: 'inline-radio', options: ['end', 'start', 'between', 'center'] },
  },
  args: { align: 'end', stackOnMobile: true, divided: false },
} satisfies Meta<typeof ActionGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <ActionGroup {...args} aria-label="Form actions">
      <ActionGroup.Start>
        <Button tone="danger" variant="plain">
          Delete
        </Button>
      </ActionGroup.Start>
      <Button>Cancel</Button>
      <Button variant="solid">Save</Button>
    </ActionGroup>
  ),
}

/** Edit form: Delete isolated at the start, Cancel then Save at the end. */
export const FormFooter: Story = {
  render: () => (
    <Card className="max-w-2xl">
      <Stack gap="loose">
        <Stack gap="tight">
          <h3 className="font-semibold text-content">Edit project</h3>
          <p className="text-sm text-content-muted">Changes are saved to the workspace.</p>
        </Stack>
        <ActionGroup divided aria-label="Form actions">
          <ActionGroup.Start>
            <Button tone="danger" variant="plain">
              Delete project
            </Button>
          </ActionGroup.Start>
          <Button>Cancel</Button>
          <Button variant="solid">Save changes</Button>
        </ActionGroup>
      </Stack>
    </Card>
  ),
}

/** Destructive confirmation: the primary action itself is the danger action. */
export const DestructiveConfirm: Story = {
  render: () => (
    <ActionGroup aria-label="Confirm delete">
      <Button>Cancel</Button>
      <Button variant="solid" tone="danger">
        Delete
      </Button>
    </ActionGroup>
  ),
}

/** Every variant × tone, for reference. */
export const Tones: Story = {
  render: () => (
    <Stack gap="base">
      {(['primary', 'danger', 'success'] as const).map((tone) => (
        <ActionGroup key={tone} align="start" stackOnMobile={false} aria-label={tone}>
          {(['solid', 'default', 'subtle', 'plain', 'link'] as const).map((variant) => (
            <Button key={variant} tone={tone} variant={variant}>
              {tone} {variant}
            </Button>
          ))}
        </ActionGroup>
      ))}
    </Stack>
  ),
}

export const RTL: Story = {
  render: () => (
    <div dir="rtl">
      <ActionGroup aria-label="Form actions">
        <ActionGroup.Start>
          <Button tone="danger" variant="plain">
            Delete
          </Button>
        </ActionGroup.Start>
        <Button>Cancel</Button>
        <Button variant="solid">Save</Button>
      </ActionGroup>
    </div>
  ),
}
