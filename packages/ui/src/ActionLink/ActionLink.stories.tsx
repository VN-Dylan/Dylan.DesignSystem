import type { Meta, StoryObj } from '@storybook/react'
import { ActionLink } from './ActionLink'

const meta = {
  title: 'Common/ActionLink',
  component: ActionLink,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { children: 'Navigate', to: '/docs/documentation/introduction', themeColor: true },
} satisfies Meta<typeof ActionLink>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {}

export const ThemeColor: Story = {
  args: { themeColor: false },
}

export const Hyperlink: Story = {
  args: {
    reloadDocument: true,
    to: 'https://www.google.com/',
    target: '_blank',
  },
}

export const ActionLinkStory: Story = {
  name: 'ActionLink',
  args: { to: { pathName: '/docs/documentation/introduction', search: '?from=storybook' } },
}
