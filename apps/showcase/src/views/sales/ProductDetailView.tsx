import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Card, EmptyState, Table, Tabs } from '@dylan-ds/ui'
import { Icon, TbIcons } from '@dylan-ds/icons'
import { formatCurrency, formatNumber } from '@dylan-ds/utils'
import { ChartCard } from '@/components/shared/ChartCard'
import { KpiCard } from '@/components/shared/KpiCard'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatusTag } from '@/components/shared/StatusTag'
import { getProduct, type Product } from '@/mock/sales'
import { productStatusTone } from './salesConstants'

const weekLabels = Array.from({ length: 12 }, (_, index) => `Wk ${index + 1}`)
const weekShape = [0.72, 0.8, 0.77, 0.92, 0.88, 1.04, 0.97, 1.1, 1.05, 1.18, 1.12, 1.24]

const getWeeklyUnits = (product: Product) => {
  const base = Math.max(2, Math.round(product.sold / 120))
  return weekShape.map((weight, index) =>
    Math.max(product.status === 'draft' ? 0 : 1, Math.round(base * weight + (index % 3) * 2)),
  )
}

/** Product detail screen with metrics, attributes, sales trend and review placeholder. */
export function ProductDetailView() {
  const navigate = useNavigate()
  const { id } = useParams()
  const product = id ? getProduct(id) : undefined
  const weeklyUnits = useMemo(() => (product ? getWeeklyUnits(product) : []), [product])

  if (!product) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Product not found"
          description="The requested catalog item does not exist."
        />
        <Card bordered>
          <EmptyState size={220}>
            <div className="space-y-3 text-center">
              <p className="font-medium text-content">Product not found</p>
              <Button onClick={() => navigate('/sales/products')}>Back to products</Button>
            </div>
          </EmptyState>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={product.name}
        description={`${product.sku} in ${product.category}`}
        actions={
          <>
            <StatusTag tone={productStatusTone[product.status]}>{product.status}</StatusTag>
            <Button
              icon={<Icon as={TbIcons.TbEdit} size={16} />}
              onClick={() => navigate('/sales/products/new')}
            >
              Edit
            </Button>
            <Button
              icon={<Icon as={TbIcons.TbArrowLeft} size={16} />}
              onClick={() => navigate('/sales/products')}
            >
              Back
            </Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Price" value={formatCurrency(product.price)} />
        <KpiCard label="In stock" value={formatNumber(product.stock, 0)} />
        <KpiCard label="Units sold" value={formatNumber(product.sold, 0)} />
        <KpiCard label="Rating" value={product.rating > 0 ? product.rating.toFixed(1) : '-'} />
      </div>

      <Card bordered bodyClass="p-4">
        <Tabs defaultValue="overview">
          <Tabs.TabList>
            <Tabs.TabNav value="overview">Overview</Tabs.TabNav>
            <Tabs.TabNav value="sales">Sales</Tabs.TabNav>
            <Tabs.TabNav value="reviews">Reviews</Tabs.TabNav>
          </Tabs.TabList>
          <Tabs.TabContent value="overview" className="space-y-4 pt-4">
            <p className="max-w-3xl text-sm leading-6 text-content-muted">
              {product.name} is a {product.category.toLowerCase()} item tracked in the sales catalog
              with live inventory, pricing and order performance metrics.
            </p>
            <Table>
              <Table.TBody>
                <Table.Tr>
                  <Table.Td className="font-medium text-content-muted">SKU</Table.Td>
                  <Table.Td>{product.sku}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td className="font-medium text-content-muted">Category</Table.Td>
                  <Table.Td>{product.category}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td className="font-medium text-content-muted">Price</Table.Td>
                  <Table.Td>{formatCurrency(product.price)}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td className="font-medium text-content-muted">Stock</Table.Td>
                  <Table.Td>{formatNumber(product.stock, 0)}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td className="font-medium text-content-muted">Status</Table.Td>
                  <Table.Td>
                    <StatusTag tone={productStatusTone[product.status]}>{product.status}</StatusTag>
                  </Table.Td>
                </Table.Tr>
              </Table.TBody>
            </Table>
          </Tabs.TabContent>
          <Tabs.TabContent value="sales" className="pt-4">
            <ChartCard
              title="Weekly units"
              type="area"
              height={280}
              categories={weekLabels}
              series={[{ name: 'Units', data: weeklyUnits }]}
              options={{
                stroke: { width: 2, curve: 'smooth' },
                fill: { type: 'gradient', gradient: { opacityFrom: 0.3, opacityTo: 0 } },
              }}
            />
          </Tabs.TabContent>
          <Tabs.TabContent value="reviews" className="pt-4">
            <EmptyState size={180}>
              <div className="text-center">
                <p className="font-medium text-content">No reviews in the mock dataset</p>
                <p className="text-sm text-content-muted">
                  Customer review details land in a later batch.
                </p>
              </div>
            </EmptyState>
          </Tabs.TabContent>
        </Tabs>
      </Card>
    </div>
  )
}
