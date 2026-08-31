import { useState } from 'react'
import { Button, Dialog, Input, Select, Table, type SelectOption } from '@dylan-ds/ui'
import { themeSchemaNames, presetThemeSchema, themeSchemaToCssVars } from '@dylan-ds/tokens'
import type { ThemeSchemaName } from '@dylan-ds/tokens'

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
 * P1 showcase — exercises the golden-five components + runtime theming.
 * Real Eyris screens are rebuilt here in P4.
 */
export function App() {
  const [dark, setDark] = useState(false)
  const [schema, setSchema] = useState<ThemeSchemaName>('default')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [category, setCategory] = useState<SelectOption | null>(null)

  const applyDark = (next: boolean) => {
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
  }

  const applySchema = (next: ThemeSchemaName) => {
    setSchema(next)
    const vars = themeSchemaToCssVars(presetThemeSchema[next][dark ? 'dark' : 'light'])
    for (const [key, value] of Object.entries(vars)) {
      document.documentElement.style.setProperty(key, value)
    }
  }

  return (
    <main className="mx-auto max-w-3xl space-y-10 p-8">
      <header className="space-y-1">
        <p className="font-mono text-xs uppercase tracking-widest text-content-faint">
          Dylan Design System · P1
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-content">Golden components</h1>
        <p className="text-content-muted">Button · Input · Select · Dialog · Table</p>
      </header>

      <section className="flex flex-wrap items-center gap-3 rounded-lg border border-border bg-surface p-4">
        <Button variant={dark ? 'default' : 'solid'} onClick={() => applyDark(!dark)}>
          {dark ? 'Light mode' : 'Dark mode'}
        </Button>
        <label className="flex items-center gap-2 text-sm text-content-muted">
          Schema
          <div className="w-40">
            <Select
              options={themeSchemaNames.map((n) => ({ label: n, value: n }))}
              value={{ label: schema, value: schema }}
              onChange={(o) => o && applySchema(o.value as ThemeSchemaName)}
              isClearable={false}
              aria-label="Theme schema"
            />
          </div>
        </label>
      </section>

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
          <Input prefix="$" suffix=".00" placeholder="0" inputMode="decimal" />
          <Input invalid defaultValue="not-an-email" />
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
    </main>
  )
}
