import { useMemo, useState, type FormEvent, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Input, Segment, Select } from '@vn-dylan/ui'
import { Icon, TbIcons } from '@vn-dylan/icons'
import { formatCurrency } from '@vn-dylan/utils'
import { PageHeader } from '@/components/shared/PageHeader'
import { products, TAX_RATE, type Order } from '@/mock/sales'

interface LineItem {
  id: string
  productId: string
  qty: number
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-content">{label}</span>
      {children}
    </label>
  )
}

const productOptions = products.map((product) => ({
  label: `${product.name} (${product.sku})`,
  value: product.id,
}))

/** Controlled mock form for drafting a sales order with live totals. */
export function OrderNewView() {
  const navigate = useNavigate()
  const [customer, setCustomer] = useState('')
  const [email, setEmail] = useState('')
  const [payment, setPayment] = useState<Order['payment']>('card')
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: 'line-1', productId: products[0]?.id ?? '', qty: 1 },
  ])
  const [nextLine, setNextLine] = useState(2)
  const [error, setError] = useState('')

  const totals = useMemo(() => {
    const subtotal = lineItems.reduce((sum, item) => {
      const product = products.find((candidate) => candidate.id === item.productId)
      return sum + (product?.price ?? 0) * item.qty
    }, 0)
    const tax = Math.round(subtotal * TAX_RATE)
    return { subtotal, tax, total: subtotal + tax }
  }, [lineItems])

  const updateLine = (id: string, patch: Partial<LineItem>) => {
    setLineItems((current) =>
      current.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    )
  }

  const addLine = () => {
    setLineItems((current) => [
      ...current,
      { id: `line-${nextLine}`, productId: products[0]?.id ?? '', qty: 1 },
    ])
    setNextLine((current) => current + 1)
  }

  const removeLine = (id: string) => {
    setLineItems((current) => current.filter((item) => item.id !== id))
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!customer.trim() || lineItems.length === 0) {
      setError('Customer and at least one line item are required.')
      return
    }
    navigate('/sales/orders')
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="New order"
        description="Draft a customer order and review totals before saving."
        actions={
          <Button
            icon={<Icon as={TbIcons.TbArrowLeft} size={16} />}
            onClick={() => navigate('/sales/orders')}
          >
            Back
          </Button>
        }
      />

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="space-y-4">
            <Card bordered header={{ content: 'Customer', bordered: true }}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Customer">
                  <Input
                    value={customer}
                    onChange={(event) => {
                      setCustomer(event.target.value)
                      setError('')
                    }}
                    invalid={Boolean(error && !customer.trim())}
                    placeholder="Mara Whitfield"
                  />
                </Field>
                <Field label="Email">
                  <Input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="customer@example.com"
                  />
                </Field>
              </div>
              <div className="mt-4 space-y-1.5">
                <span className="block text-sm font-medium text-content">Payment method</span>
                <Segment
                  value={payment}
                  onChange={(value) => setPayment(String(value) as Order['payment'])}
                  aria-label="Payment method"
                >
                  <Segment.Item value="card">Card</Segment.Item>
                  <Segment.Item value="paypal">PayPal</Segment.Item>
                  <Segment.Item value="transfer">Transfer</Segment.Item>
                </Segment>
              </div>
            </Card>

            <Card
              bordered
              header={{
                content: 'Line items',
                bordered: true,
                extra: (
                  <Button size="xs" icon={<Icon as={TbIcons.TbPlus} size={14} />} onClick={addLine}>
                    Add item
                  </Button>
                ),
              }}
            >
              <div className="space-y-3">
                {lineItems.map((item) => {
                  const product = products.find((candidate) => candidate.id === item.productId)
                  return (
                    <div
                      key={item.id}
                      className="grid gap-3 rounded-md border border-border p-3 md:grid-cols-[minmax(0,1fr)_6rem_8rem_auto] md:items-center"
                    >
                      <Select
                        options={productOptions}
                        value={productOptions.find((option) => option.value === item.productId)}
                        onChange={(option) =>
                          option && updateLine(item.id, { productId: option.value })
                        }
                        isSearchable
                        isClearable={false}
                        aria-label="Product"
                      />
                      <Input
                        type="number"
                        min={1}
                        value={String(item.qty)}
                        onChange={(event) =>
                          updateLine(item.id, { qty: Math.max(1, Number(event.target.value) || 1) })
                        }
                        aria-label="Quantity"
                      />
                      <p className="text-sm font-medium text-content">
                        {formatCurrency((product?.price ?? 0) * item.qty)}
                      </p>
                      <Button
                        icon={<Icon as={TbIcons.TbTrash} size={16} />}
                        onClick={() => removeLine(item.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  )
                })}
                {lineItems.length === 0 && (
                  <p className="rounded-md border border-border bg-surface-sunken p-3 text-sm text-content-muted">
                    Add at least one product to submit this order.
                  </p>
                )}
              </div>
              {error && <p className="mt-3 text-sm text-error">{error}</p>}
            </Card>
          </div>

          <Card bordered header={{ content: 'Summary', bordered: true }}>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-content-muted">Subtotal</dt>
                <dd className="font-medium text-content">{formatCurrency(totals.subtotal)}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-content-muted">Tax 10%</dt>
                <dd className="font-medium text-content">{formatCurrency(totals.tax)}</dd>
              </div>
              <div className="flex justify-between gap-3 border-t border-border pt-3">
                <dt className="font-medium text-content">Total</dt>
                <dd className="text-lg font-semibold text-content">
                  {formatCurrency(totals.total)}
                </dd>
              </div>
            </dl>
          </Card>
        </div>

        <div className="flex justify-end gap-2 border-t border-border pt-4">
          <Button onClick={() => navigate('/sales/orders')}>Cancel</Button>
          <Button type="submit" variant="solid" icon={<Icon as={TbIcons.TbDeviceFloppy} />}>
            Save order
          </Button>
        </div>
      </form>
    </div>
  )
}
