import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { TbChevronDown } from 'react-icons/tb'
import { Collapsible } from './Collapsible'
import { useAccordion } from './useAccordion'

const meta = {
  title: 'Data Display/Collapsible',
  component: Collapsible,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Collapsible>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <Collapsible defaultOpen>
      <Collapsible.Trigger>
        Shipping details <TbChevronDown />
      </Collapsible.Trigger>
      <Collapsible.Content>
        Ships in 2–4 business days. Free returns within 30 days.
      </Collapsible.Content>
    </Collapsible>
  ),
}

export const Controlled: Story = {
  render: () => {
    const Demo = () => {
      const [open, setOpen] = useState(false)
      return (
        <>
          <button className="mb-2 text-sm text-primary" onClick={() => setOpen((o) => !o)}>
            Toggle from outside
          </button>
          <Collapsible open={open} onOpenChange={setOpen}>
            <Collapsible.Trigger>Section</Collapsible.Trigger>
            <Collapsible.Content>Controlled content.</Collapsible.Content>
          </Collapsible>
        </>
      )
    }
    return <Demo />
  },
}

export const CustomTrigger: Story = {
  render: () => (
    <Collapsible>
      <Collapsible.Trigger>
        {({ isOpen }) => (
          <span className="flex w-full items-center justify-between">
            Advanced options
            <span className="text-content-muted">{isOpen ? 'Hide' : 'Show'}</span>
          </span>
        )}
      </Collapsible.Trigger>
      <Collapsible.Content>Custom trigger render prop.</Collapsible.Content>
    </Collapsible>
  ),
}

export const Accordion: Story = {
  render: () => {
    const Demo = () => {
      const acc = useAccordion('a')
      const items = [
        { key: 'a', label: 'First', body: 'First panel content.' },
        { key: 'b', label: 'Second', body: 'Second panel content.' },
        { key: 'c', label: 'Third', body: 'Third panel content.' },
      ]
      return (
        <div className="divide-y divide-border">
          {items.map((it) => (
            <Collapsible
              key={it.key}
              open={acc.isOpen(it.key)}
              onOpenChange={acc.onOpenChange(it.key)}
            >
              <Collapsible.Trigger>
                {it.label} <TbChevronDown />
              </Collapsible.Trigger>
              <Collapsible.Content>{it.body}</Collapsible.Content>
            </Collapsible>
          ))}
        </div>
      )
    }
    return <Demo />
  },
}
