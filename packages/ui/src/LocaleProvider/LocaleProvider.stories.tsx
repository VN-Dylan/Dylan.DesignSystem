import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from '../Button'
import { ConfirmDialog } from '../ConfirmDialog'
import { DataTable } from '../DataTable'
import { Segment } from '../Segment'
import { Select } from '../Select'
import { LocaleProvider } from './LocaleProvider'

const meta = {
  title: 'Primitives/LocaleProvider',
  component: LocaleProvider,
  tags: ['autodocs'],
} satisfies Meta<typeof LocaleProvider>

export default meta
type Story = StoryObj<typeof meta>

const rows = Array.from({ length: 12 }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}` }))

/** Switch the language: built-in strings (table footer, select, dialog buttons) follow. */
export const Switching: Story = {
  render: () => {
    const Demo = () => {
      const [locale, setLocale] = useState('vi')
      const [open, setOpen] = useState(false)
      return (
        <div className="space-y-4">
          <Segment value={locale} onChange={(v) => setLocale(String(v))} size="sm">
            <Segment.Item value="vi">Tiếng Việt</Segment.Item>
            <Segment.Item value="en">English</Segment.Item>
          </Segment>
          <LocaleProvider locale={locale}>
            <div className="max-w-xs">
              <Select options={[{ label: 'A', value: 'a' }]} />
            </div>
            <DataTable
              columns={[{ accessorKey: 'name', header: 'Name' }]}
              data={rows}
              searchable
              pagination
              initialState={{ pageSize: 5 }}
            />
            <Button onClick={() => setOpen(true)}>Confirm</Button>
            <ConfirmDialog
              isOpen={open}
              title="?"
              onCancel={() => setOpen(false)}
              onConfirm={() => setOpen(false)}
              onClose={() => setOpen(false)}
            />
          </LocaleProvider>
        </div>
      )
    }
    return <Demo />
  },
}
