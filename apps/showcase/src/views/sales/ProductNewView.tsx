import { useState, type FormEvent, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Input, Segment, Select } from '@dylan-ds/ui'
import { Icon, TbIcons } from '@dylan-ds/icons'
import { PageHeader } from '@/components/shared/PageHeader'
import type { Product } from '@/mock/sales'
import { productCategoryOptions } from './salesConstants'

interface ProductForm {
  name: string
  sku: string
  category: Product['category']
  price: string
  stock: string
  status: Extract<Product['status'], 'draft' | 'active'>
  description: string
}

const initialForm: ProductForm = {
  name: '',
  sku: '',
  category: 'Watches',
  price: '',
  stock: '0',
  status: 'draft',
  description: '',
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-content">{label}</span>
      {children}
      {error && <span className="block text-xs text-error">{error}</span>}
    </label>
  )
}

/** Controlled mock form for creating a sales product. */
export function ProductNewView() {
  const navigate = useNavigate()
  const [form, setForm] = useState<ProductForm>(initialForm)
  const [errors, setErrors] = useState<Partial<Record<'name' | 'sku' | 'price', string>>>({})

  const update = (patch: Partial<ProductForm>) => setForm((current) => ({ ...current, ...patch }))

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const nextErrors: Partial<Record<'name' | 'sku' | 'price', string>> = {}
    if (!form.name.trim()) nextErrors.name = 'Name is required.'
    if (!form.sku.trim()) nextErrors.sku = 'SKU is required.'
    if (!form.price.trim() || Number(form.price) <= 0) {
      nextErrors.price = 'Enter a price greater than zero.'
    }
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) navigate('/sales/products')
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="New product"
        description="Create a catalog item for the sales workspace."
        actions={
          <Button
            icon={<Icon as={TbIcons.TbArrowLeft} size={16} />}
            onClick={() => navigate('/sales/products')}
          >
            Back
          </Button>
        }
      />

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <Card bordered header={{ content: 'Product information', bordered: true }}>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" error={errors.name}>
                <Input
                  value={form.name}
                  onChange={(event) => update({ name: event.target.value })}
                  invalid={Boolean(errors.name)}
                  placeholder="Aurora Chrono Watch"
                />
              </Field>
              <Field label="SKU" error={errors.sku}>
                <Input
                  value={form.sku}
                  onChange={(event) => update({ sku: event.target.value.toUpperCase() })}
                  invalid={Boolean(errors.sku)}
                  placeholder="AUR-CHR-13"
                />
              </Field>
              <Field label="Category">
                <Select
                  options={productCategoryOptions}
                  value={productCategoryOptions.find((option) => option.value === form.category)}
                  onChange={(option) =>
                    option && update({ category: option.value as Product['category'] })
                  }
                  isClearable={false}
                  aria-label="Category"
                />
              </Field>
              <Field label="Price" error={errors.price}>
                <Input
                  type="number"
                  value={form.price}
                  onChange={(event) => update({ price: event.target.value })}
                  invalid={Boolean(errors.price)}
                  min={0}
                  prefix="$"
                />
              </Field>
              <Field label="Stock">
                <Input
                  type="number"
                  value={form.stock}
                  onChange={(event) => update({ stock: event.target.value })}
                  min={0}
                />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Description">
                  <Input
                    textArea
                    rows={5}
                    value={form.description}
                    onChange={(event) => update({ description: event.target.value })}
                    placeholder="Brief merchandising notes for storefront and support teams."
                  />
                </Field>
              </div>
            </div>
          </Card>

          <Card bordered header={{ content: 'Visibility', bordered: true }}>
            <div className="space-y-3">
              <Segment
                value={form.status}
                onChange={(value) => update({ status: String(value) as ProductForm['status'] })}
                aria-label="Product status"
              >
                <Segment.Item value="draft">Draft</Segment.Item>
                <Segment.Item value="active">Active</Segment.Item>
              </Segment>
              <p className="text-sm text-content-muted">
                Draft products stay hidden from storefront reporting until activated.
              </p>
            </div>
          </Card>
        </div>

        <div className="flex justify-end gap-2 border-t border-border pt-4">
          <Button onClick={() => navigate('/sales/products')}>Cancel</Button>
          <Button type="submit" variant="solid" icon={<Icon as={TbIcons.TbDeviceFloppy} />}>
            Save product
          </Button>
        </div>
      </form>
    </div>
  )
}
