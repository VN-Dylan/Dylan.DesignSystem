import { useState } from 'react'
import { Button, Dialog, Input, Select, Table, type SelectOption } from '@dylan-ds/ui'
import { PageHeader } from '@/components/shared/PageHeader'

const categories: SelectOption[] = [
  { label: 'Watches', value: 'watches' },
  { label: 'Clothing', value: 'clothing' },
  { label: 'Gadgets', value: 'gadgets' },
  { label: 'Bags', value: 'bags' },
]

const rows = [
  { name: 'Macbook Pro M4', sku: 'NT-110201', price: '$1,189.00', stock: 'High' },
  { name: 'Apple Watch Series 10', sku: 'NT-230984', price: '$420.00', stock: 'High' },
  { name: 'Nova Backpack', sku: 'NT-389121', price: '$145.00', stock: 'Medium' },
  { name: 'Pulse Analog Watch', sku: 'NT-554789', price: '$310.00', stock: 'Out of stock' },
]

/**
 * Quick visual check of the golden-five components against live theming.
 * The full playground is Storybook — this is a smoke screen inside the app.
 */
export function ComponentGalleryView() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [category, setCategory] = useState<SelectOption | null>(null)

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <PageHeader
        title="Component gallery"
        description="Button · Input · Select · Dialog · Table — exercised against the current theme."
      />

      <section className="space-y-4 rounded-lg border border-border bg-surface p-4">
        <h2 className="text-sm font-semibold text-content">Buttons</h2>
        <div className="flex flex-wrap gap-2">
          <Button>Default</Button>
          <Button variant="solid">Solid</Button>
          <Button variant="subtle">Subtle</Button>
          <Button variant="plain">Plain</Button>
          <Button loading>Loading</Button>
        </div>
      </section>

      <section className="grid gap-4 rounded-lg border border-border bg-surface p-4 sm:grid-cols-2">
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-content">Input</h2>
          <Input name="demo-amount" prefix="$" suffix=".00" placeholder="0" inputMode="decimal" />
          <Input name="demo-email" invalid defaultValue="not-an-email" />
        </div>
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-content">Select</h2>
          <Select
            options={categories}
            value={category}
            onChange={setCategory}
            isSearchable
            aria-label="Category"
          />
          <p className="text-xs text-content-muted">Picked: {category?.label ?? '—'}</p>
        </div>
      </section>

      <section className="space-y-3 rounded-lg border border-border bg-surface p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-content">Table</h2>
          <Button size="sm" variant="solid" onClick={() => setDialogOpen(true)}>
            Open dialog
          </Button>
        </div>
        <Table hoverable compact>
          <Table.THead>
            <Table.Tr>
              <Table.Th>Product</Table.Th>
              <Table.Th>SKU</Table.Th>
              <Table.Th>Price</Table.Th>
              <Table.Th>Stock</Table.Th>
            </Table.Tr>
          </Table.THead>
          <Table.TBody>
            {rows.map((r) => (
              <Table.Tr key={r.sku}>
                <Table.Td>{r.name}</Table.Td>
                <Table.Td>{r.sku}</Table.Td>
                <Table.Td>{r.price}</Table.Td>
                <Table.Td>{r.stock}</Table.Td>
              </Table.Tr>
            ))}
          </Table.TBody>
        </Table>
      </section>

      <Dialog isOpen={dialogOpen} onClose={() => setDialogOpen(false)} aria-labelledby="d-title">
        <h2 id="d-title" className="text-lg font-semibold text-content">
          Confirm restock
        </h2>
        <p className="mt-2 text-content-muted">
          Order 50 units of Pulse Analog Watch from the default supplier?
        </p>
        <div className="mt-6 flex justify-end gap-2">
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="solid" onClick={() => setDialogOpen(false)}>
            Place order
          </Button>
        </div>
      </Dialog>
    </div>
  )
}
