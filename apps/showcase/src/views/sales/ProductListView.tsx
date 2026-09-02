import { useCallback, useEffect, useMemo, useState, type MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, DataTable, Input, Segment, Select } from '@vn-dylan/ui'
import type { ColumnDef, DataTableSort, SelectOption } from '@vn-dylan/ui'
import { Icon, TbIcons } from '@vn-dylan/icons'
import { formatCurrency } from '@vn-dylan/utils'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatusTag } from '@/components/shared/StatusTag'
import { products, type Product } from '@/mock/sales'
import { productCategoryOptions, productStatusTone } from './salesConstants'

const allCategoryOption = { label: 'All categories', value: 'all' }
const categoryOptions: SelectOption[] = [allCategoryOption, ...productCategoryOptions]
const pageSize = 8

const compareProducts = (sort: DataTableSort) => (a: Product, b: Product) => {
  const direction = sort.order === 'desc' ? -1 : 1
  if (sort.key === 'price') return (a.price - b.price) * direction
  if (sort.key === 'stock') return (a.stock - b.stock) * direction
  if (sort.key === 'sold') return (a.sold - b.sold) * direction
  return 0
}

/** Product catalog list with filtering, selection, sorting and client-side paging. */
export function ProductListView() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<SelectOption>(allCategoryOption)
  const [status, setStatus] = useState('all')
  const [sort, setSort] = useState<DataTableSort>({ key: '', order: '' })
  const [pageIndex, setPageIndex] = useState(1)
  const [selectedRows, setSelectedRows] = useState<Product[]>([])

  useEffect(() => {
    setPageIndex(1)
  }, [query, category, status])

  const filteredProducts = useMemo(() => {
    const lowered = query.trim().toLowerCase()
    return products.filter((product) => {
      const matchesQuery =
        lowered.length === 0 ||
        product.name.toLowerCase().includes(lowered) ||
        product.sku.toLowerCase().includes(lowered)
      const matchesCategory = category.value === 'all' || product.category === category.value
      const matchesStatus = status === 'all' || product.status === status
      return matchesQuery && matchesCategory && matchesStatus
    })
  }, [category.value, query, status])

  const sortedProducts = useMemo(() => {
    if (!sort.key || !sort.order) return filteredProducts
    return [...filteredProducts].sort(compareProducts(sort))
  }, [filteredProducts, sort])

  const pageRows = useMemo(
    () => sortedProducts.slice((pageIndex - 1) * pageSize, pageIndex * pageSize),
    [pageIndex, sortedProducts],
  )

  const columns = useMemo<ColumnDef<Product, unknown>[]>(
    () => [
      {
        id: 'product',
        header: 'Product',
        enableSorting: false,
        cell: ({ row }) => (
          <div className="min-w-52">
            <p className="font-medium text-content">{row.original.name}</p>
            <p className="text-xs text-content-muted">{row.original.sku}</p>
          </div>
        ),
      },
      {
        accessorKey: 'category',
        header: 'Category',
        enableSorting: false,
      },
      {
        accessorKey: 'price',
        header: 'Price',
        cell: ({ row }) => formatCurrency(row.original.price),
      },
      {
        accessorKey: 'stock',
        header: 'Stock',
        cell: ({ row }) =>
          row.original.stock === 0 ? (
            <StatusTag tone="error">Out of stock</StatusTag>
          ) : (
            <span className={row.original.stock < 20 ? 'font-medium text-warning' : undefined}>
              {row.original.stock.toLocaleString('en-US')}
            </span>
          ),
      },
      {
        accessorKey: 'sold',
        header: 'Sold',
        cell: ({ row }) => row.original.sold.toLocaleString('en-US'),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        enableSorting: false,
        cell: ({ row }) => (
          <StatusTag tone={productStatusTone[row.original.status]}>{row.original.status}</StatusTag>
        ),
      },
      {
        accessorKey: 'rating',
        header: 'Rating',
        enableSorting: false,
        cell: ({ row }) => (row.original.rating > 0 ? `${row.original.rating.toFixed(1)} ★` : '-'),
      },
    ],
    [],
  )

  const handleSort = useCallback((nextSort: DataTableSort) => {
    setSort(nextSort)
  }, [])

  const handleTableClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      const target = event.target as HTMLElement
      if (target.closest('button,input,select,a,[role="button"],.dyl-data-table__select-cell')) {
        return
      }
      const row = target.closest('tbody tr')
      const rowGroup = row?.parentElement
      if (!row || !rowGroup) return
      const index = Array.from(rowGroup.children).indexOf(row)
      const product = pageRows[index]
      if (product) navigate(`/sales/products/${product.id}`)
    },
    [navigate, pageRows],
  )

  return (
    <div className="space-y-6">
      <PageHeader
        title="Products"
        description="Manage catalog pricing, availability and merchandising status."
        actions={
          <Button
            variant="solid"
            icon={<Icon as={TbIcons.TbPlus} size={16} />}
            onClick={() => navigate('/sales/products/new')}
          >
            New product
          </Button>
        }
      />

      <Card bordered bodyClass="space-y-4 p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-center">
          <div className="lg:w-72">
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search name or SKU"
              prefix={<Icon as={TbIcons.TbSearch} size={16} />}
              aria-label="Search products"
            />
          </div>
          <div className="lg:w-52">
            <Select
              options={categoryOptions}
              value={category}
              onChange={(option) => setCategory(option ?? allCategoryOption)}
              isClearable={false}
              aria-label="Category"
            />
          </div>
          <Segment
            value={status}
            onChange={(value) => setStatus(String(value))}
            size="sm"
            aria-label="Product status"
            className="lg:ml-auto"
          >
            <Segment.Item value="all">All</Segment.Item>
            <Segment.Item value="active">Active</Segment.Item>
            <Segment.Item value="draft">Draft</Segment.Item>
            <Segment.Item value="archived">Archived</Segment.Item>
          </Segment>
        </div>

        {selectedRows.length > 0 && (
          <div className="flex items-center justify-between rounded-md border border-border bg-surface-sunken px-3 py-2 text-sm text-content">
            <span>{selectedRows.length} selected</span>
            <Button size="xs" disabled>
              Bulk archive
            </Button>
          </div>
        )}

        <div onClick={handleTableClick}>
          <DataTable<Product>
            columns={columns}
            data={pageRows}
            selectable
            onSelectChange={setSelectedRows}
            pagingData={{ pageIndex, pageSize, total: sortedProducts.length }}
            pageSizeOptions={[8, 16, 24]}
            onPaginationChange={setPageIndex}
            onSort={handleSort}
            emptyMessage="No products match the current filters."
          />
        </div>
      </Card>
    </div>
  )
}
