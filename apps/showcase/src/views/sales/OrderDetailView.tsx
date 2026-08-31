import { useNavigate, useParams } from 'react-router-dom'
import { Button, Card, EmptyState, Table, Timeline } from '@dylan-ds/ui'
import { Icon, TbIcons } from '@dylan-ds/icons'
import { formatCurrency, formatRelativeTime } from '@dylan-ds/utils'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatusTag } from '@/components/shared/StatusTag'
import { getOrder } from '@/mock/sales'
import { formatPayment, orderStatusTone } from './salesConstants'

/** Sales order detail screen with line items, customer, payment and timeline cards. */
export function OrderDetailView() {
  const navigate = useNavigate()
  const { id } = useParams()
  const order = id ? getOrder(id) : undefined

  if (!order) {
    return (
      <div className="space-y-6">
        <PageHeader title="Order not found" description="The requested order does not exist." />
        <Card bordered>
          <EmptyState size={220}>
            <div className="space-y-3 text-center">
              <p className="font-medium text-content">Order not found</p>
              <Button onClick={() => navigate('/sales/orders')}>Back to orders</Button>
            </div>
          </EmptyState>
        </Card>
      </div>
    )
  }

  const subtotal = order.items.reduce((sum, item) => sum + item.price * item.qty, 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax

  return (
    <div className="space-y-6">
      <PageHeader
        title={order.ref}
        description={`Placed ${formatRelativeTime(order.date)} by ${order.customer}`}
        actions={
          <>
            <StatusTag tone={orderStatusTone[order.status]}>{order.status}</StatusTag>
            <Button icon={<Icon as={TbIcons.TbPrinter} size={16} />}>Print</Button>
            <Button
              icon={<Icon as={TbIcons.TbArrowLeft} size={16} />}
              onClick={() => navigate('/sales/orders')}
            >
              Back
            </Button>
          </>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <Card bordered header={{ content: 'Items', bordered: true }} bodyClass="p-0">
          <Table>
            <Table.THead>
              <Table.Tr>
                <Table.Th>Product</Table.Th>
                <Table.Th>Qty</Table.Th>
                <Table.Th>Unit price</Table.Th>
                <Table.Th>Line total</Table.Th>
              </Table.Tr>
            </Table.THead>
            <Table.TBody>
              {order.items.map((item, index) => (
                <Table.Tr key={`${item.productId}-${index}`}>
                  <Table.Td>{item.name}</Table.Td>
                  <Table.Td>{item.qty}</Table.Td>
                  <Table.Td>{formatCurrency(item.price)}</Table.Td>
                  <Table.Td>{formatCurrency(item.price * item.qty)}</Table.Td>
                </Table.Tr>
              ))}
            </Table.TBody>
            <Table.TFoot>
              <Table.Tr>
                <Table.Td colSpan={3}>Subtotal</Table.Td>
                <Table.Td>{formatCurrency(subtotal)}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td colSpan={3}>Tax 10%</Table.Td>
                <Table.Td>{formatCurrency(tax)}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td colSpan={3}>Total</Table.Td>
                <Table.Td>{formatCurrency(total)}</Table.Td>
              </Table.Tr>
            </Table.TFoot>
          </Table>
        </Card>

        <div className="space-y-4">
          <Card bordered header={{ content: 'Customer', bordered: true }}>
            <div className="space-y-1">
              <p className="font-medium text-content">{order.customer}</p>
              <p className="text-sm text-content-muted">{order.email}</p>
            </div>
          </Card>
          <Card bordered header={{ content: 'Payment', bordered: true }}>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-content-muted">Method</dt>
                <dd className="font-medium text-content">{formatPayment(order.payment)}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-content-muted">Status</dt>
                <dd>
                  <StatusTag tone={orderStatusTone[order.status]}>{order.status}</StatusTag>
                </dd>
              </div>
            </dl>
          </Card>
          <Card bordered header={{ content: 'Timeline', bordered: true }}>
            <Timeline>
              <Timeline.Item media={<Icon as={TbIcons.TbShoppingCart} size={16} />}>
                <p className="font-medium text-content">Order placed</p>
                <p className="text-sm text-content-muted">{order.date}</p>
              </Timeline.Item>
              <Timeline.Item media={<Icon as={TbIcons.TbCreditCard} size={16} />}>
                <p className="font-medium text-content">Payment confirmed</p>
                <p className="text-sm text-content-muted">{formatPayment(order.payment)}</p>
              </Timeline.Item>
              <Timeline.Item media={<Icon as={TbIcons.TbPackage} size={16} />}>
                <p className="font-medium text-content">Preparing</p>
                <p className="text-sm text-content-muted">Ready for fulfilment review</p>
              </Timeline.Item>
            </Timeline>
          </Card>
        </div>
      </div>
    </div>
  )
}
