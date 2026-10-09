import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Avatar } from '../Avatar'
import { Button } from '../Button'
import { List } from './List'

const meta = {
  title: 'Data Display/List',
  component: List,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof List>

export default meta
type Story = StoryObj<typeof meta>

interface Member {
  id: string
  name: string
  email: string
  role: string
  avatar: number
}

const MEMBERS: Member[] = [
  { id: 'm1', name: 'Emma Novak', email: 'emma@dylan.dev', role: 'Owner', avatar: 1 },
  { id: 'm2', name: 'Ben Ortiz', email: 'ben@dylan.dev', role: 'Admin', avatar: 2 },
  { id: 'm3', name: 'Aisha Rahman', email: 'aisha@dylan.dev', role: 'Editor', avatar: 3 },
  { id: 'm4', name: 'Dylan Carter', email: 'dylan@dylan.dev', role: 'Editor', avatar: 4 },
  { id: 'm5', name: 'Grace Lin', email: 'grace@dylan.dev', role: 'Viewer', avatar: 5 },
]

const avatar = (m: Member) => (
  <Avatar size={32} shape="circle" src={`fixtures/avatars/avatar-${m.avatar}.svg`} alt="" />
)

const frame = 'max-w-xl'

/** Rich rows: avatar, title, description, meta and trailing actions. */
export const Basic: Story = {
  render: () => (
    <List
      className={frame}
      bordered
      aria-label="Team members"
      items={MEMBERS}
      getKey={(m) => m.id}
      renderItem={(m) => (
        <List.Item
          prefix={avatar(m)}
          title={m.name}
          description={m.email}
          meta={m.role}
          actions={
            <Button size="sm" variant="plain">
              Manage
            </Button>
          }
        />
      )}
    />
  ),
}

/** `selectionMode="multiple"` — click, Space/Enter, ↑/↓, Home/End, Ctrl+A. */
export const Selectable: Story = {
  render: () => {
    const Demo = () => {
      const [selected, setSelected] = useState<string[]>(['m2'])
      return (
        <div className={frame}>
          <List
            bordered
            aria-label="Pick reviewers"
            selectionMode="multiple"
            selectedKeys={selected}
            onSelectionChange={setSelected}
            disabledKeys={['m5']}
            items={MEMBERS}
            getKey={(m) => m.id}
            renderItem={(m) => <List.Item prefix={avatar(m)} title={m.name} description={m.role} />}
          />
          <p className="mt-2 text-xs text-content-muted">{selected.length} selected</p>
        </div>
      )
    }
    return <Demo />
  },
}

/** Drag rows, or focus the list and press Alt + ↑/↓ on the active row. */
export const Sortable: Story = {
  render: () => {
    const Demo = () => {
      const [items, setItems] = useState(MEMBERS)
      return (
        <List
          className={frame}
          bordered
          aria-label="Priority order"
          sortable
          onReorder={setItems}
          items={items}
          getKey={(m) => m.id}
          renderItem={(m, { index }) => (
            <List.Item prefix={avatar(m)} title={m.name} meta={`#${index + 1}`} />
          )}
        />
      )
    }
    return <Demo />
  },
}

const ROWS = Array.from({ length: 10_000 }, (_, i) => ({
  id: `r${i}`,
  name: `Invoice INV-${String(i + 1).padStart(5, '0')}`,
  amount: ((i * 7919) % 50_000) / 100,
}))

/** 10 000 rows, windowed: only the visible rows (+ overscan) are in the DOM. */
export const Virtualized: Story = {
  render: () => (
    <List
      className={frame}
      bordered
      aria-label="Invoices"
      selectionMode="single"
      virtual={{ itemHeight: 52, height: 360 }}
      items={ROWS}
      getKey={(r) => r.id}
      renderItem={(r) => <List.Item title={r.name} meta={`$${r.amount.toFixed(2)}`} />}
    />
  ),
}

export const LoadingAndEmpty: Story = {
  render: () => (
    <div className="grid max-w-3xl gap-loose sm:grid-cols-2">
      <List
        bordered
        aria-label="Loading"
        loading
        items={[]}
        getKey={() => ''}
        renderItem={() => null}
      />
      <List
        bordered
        aria-label="Empty"
        items={[]}
        getKey={() => ''}
        renderItem={() => null}
        emptyMessage="No members yet."
      />
    </div>
  ),
}
