import { useNavigate } from 'react-router-dom'
import { Button, Card, Table } from '@vn-dylan/ui'
import { Icon, TbIcons } from '@vn-dylan/icons'
import { formatCurrency } from '@vn-dylan/utils'
import { PageHeader } from '@/components/shared/PageHeader'
import { KpiCard } from '@/components/shared/KpiCard'
import { ChartCard } from '@/components/shared/ChartCard'
import { StatusTag } from '@/components/shared/StatusTag'
import {
  orderTotal,
  recentOrders,
  revenueByMonth,
  salesByCategory,
  salesKpis,
  topProducts,
} from '@/mock/sales'

const ORDER_TONE = {
  paid: 'success',
  pending: 'warning',
  refunded: 'info',
  cancelled: 'error',
} as const

/**
 * Sales overview — the reference screen for the P4 area batches: PageHeader +
 * KPI row + chart cards + two summary tables, all on mock data.
 */
export function SalesDashboardView() {
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      <PageHeader
        title="Sales dashboard"
        description="Revenue, orders and product performance for the last 30 days."
        actions={
          <Button
            variant="solid"
            icon={<Icon as={TbIcons.TbPlus} size={16} />}
            onClick={() => navigate('/sales/orders/new')}
          >
            New order
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Revenue"
          value={formatCurrency(salesKpis.revenue.value)}
          delta={salesKpis.revenue.delta}
          spark={salesKpis.revenue.spark}
          icon={<Icon as={TbIcons.TbCurrencyDollar} size={18} />}
        />
        <KpiCard
          label="Orders"
          value={salesKpis.orders.value.toLocaleString()}
          delta={salesKpis.orders.delta}
          spark={salesKpis.orders.spark}
          icon={<Icon as={TbIcons.TbShoppingBag} size={18} />}
        />
        <KpiCard
          label="Avg. order value"
          value={formatCurrency(salesKpis.avgOrderValue.value)}
          delta={salesKpis.avgOrderValue.delta}
          spark={salesKpis.avgOrderValue.spark}
          icon={<Icon as={TbIcons.TbReceipt} size={18} />}
        />
        <KpiCard
          label="Refund rate"
          value={`${salesKpis.refundRate.value}%`}
          delta={salesKpis.refundRate.delta}
          spark={salesKpis.refundRate.spark}
          icon={<Icon as={TbIcons.TbArrowBackUp} size={18} />}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ChartCard
            title="Revenue vs. last year"
            type="area"
            height={300}
            categories={revenueByMonth.categories}
            series={[
              { name: 'This year', data: revenueByMonth.thisYear },
              { name: 'Last year', data: revenueByMonth.lastYear },
            ]}
            options={{
              stroke: { width: 2, curve: 'smooth' },
              fill: { type: 'gradient', gradient: { opacityFrom: 0.3, opacityTo: 0 } },
              yaxis: { labels: { formatter: (v: number) => `$${v}k` } },
            }}
          />
        </div>
        <ChartCard
          title="Sales by category"
          type="donut"
          height={300}
          series={salesByCategory.map((s) => s.value)}
          options={{ labels: salesByCategory.map((s) => s.label), legend: { position: 'bottom' } }}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card
          bordered
          header={{
            content: 'Top products',
            bordered: true,
            extra: (
              <Button size="xs" variant="plain" onClick={() => navigate('/sales/products')}>
                View all
              </Button>
            ),
          }}
          bodyClass="p-0"
        >
          <Table hoverable>
            <Table.THead>
              <Table.Tr>
                <Table.Th>Product</Table.Th>
                <Table.Th>Sold</Table.Th>
                <Table.Th>Revenue</Table.Th>
              </Table.Tr>
            </Table.THead>
            <Table.TBody>
              {topProducts.map((p) => (
                <Table.Tr
                  key={p.id}
                  className="cursor-pointer"
                  onClick={() => navigate(`/sales/products/${p.id}`)}
                >
                  <Table.Td>{p.name}</Table.Td>
                  <Table.Td>{p.sold.toLocaleString()}</Table.Td>
                  <Table.Td>{formatCurrency(p.sold * p.price)}</Table.Td>
                </Table.Tr>
              ))}
            </Table.TBody>
          </Table>
        </Card>

        <Card
          bordered
          header={{
            content: 'Recent orders',
            bordered: true,
            extra: (
              <Button size="xs" variant="plain" onClick={() => navigate('/sales/orders')}>
                View all
              </Button>
            ),
          }}
          bodyClass="p-0"
        >
          <Table hoverable>
            <Table.THead>
              <Table.Tr>
                <Table.Th>Order</Table.Th>
                <Table.Th>Customer</Table.Th>
                <Table.Th>Total</Table.Th>
                <Table.Th>Status</Table.Th>
              </Table.Tr>
            </Table.THead>
            <Table.TBody>
              {recentOrders.map((o) => (
                <Table.Tr
                  key={o.id}
                  className="cursor-pointer"
                  onClick={() => navigate(`/sales/orders/${o.id}`)}
                >
                  <Table.Td>{o.ref}</Table.Td>
                  <Table.Td>{o.customer}</Table.Td>
                  <Table.Td>{formatCurrency(orderTotal(o))}</Table.Td>
                  <Table.Td>
                    <StatusTag tone={ORDER_TONE[o.status]}>{o.status}</StatusTag>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.TBody>
          </Table>
        </Card>
      </div>
    </div>
  )
}
