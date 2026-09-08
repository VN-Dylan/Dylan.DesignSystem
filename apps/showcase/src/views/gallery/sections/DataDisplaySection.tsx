import { useCallback, useMemo, useState } from 'react'
import {
  AdvancedFilterBuilder,
  Avatar,
  Badge,
  Button,
  Card,
  Carousel,
  Collapsible,
  DataTable,
  FileIcon,
  GrowShrinkTag,
  IconFrame,
  PopoverFilter,
  SegmentProgressBar,
  StatisticCard,
  SyntaxHighlighter,
  Table,
  Tag,
  Timeline,
  type ColumnDef,
  type DataTableSort,
  type FilterFieldDef,
  type FilterQuery,
} from '@vn-dylan/ui'
import { HiIcons, Icon, TbIcons } from '@vn-dylan/icons'
import { Demo } from '@/views/gallery/components/Demo'
import { SectionShell } from '@/views/gallery/sections/SectionShell'
import {
  galleryActivity,
  galleryProducts,
  gallerySelectOptions,
  type GalleryProduct,
} from '@/mock/gallery'

const formatUsd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const productColumns: ColumnDef<GalleryProduct, unknown>[] = [
  { accessorKey: 'name', header: 'Product' },
  { accessorKey: 'category', header: 'Category' },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => formatUsd.format(row.original.price),
  },
  {
    accessorKey: 'stock',
    header: 'Stock',
    cell: ({ row }) => <Tag>{row.original.stock}</Tag>,
  },
]

const filterFields: FilterFieldDef[] = [
  { label: 'Product name', value: 'name' },
  { label: 'Stock status', value: 'stock' },
  { label: 'Price', value: 'price', operators: ['gt', 'lt', 'gte', 'lte'] },
]

const syntaxSnippet = `import { Button } from '@vn-dylan/ui'

export function SaveAction() {
  return <Button variant="solid">Save</Button>
}
`

const bashSnippet = `pnpm add @vn-dylan/ui
pnpm storybook`

const sortProducts = (products: GalleryProduct[], sort: DataTableSort) => {
  if (!sort.key || !sort.order) return products
  return [...products].sort((a, b) => {
    const key = sort.key as keyof GalleryProduct
    const first = a[key]
    const second = b[key]
    const result =
      typeof first === 'number' && typeof second === 'number'
        ? first - second
        : String(first).localeCompare(String(second))
    return sort.order === 'asc' ? result : -result
  })
}

/** Data Display category page with table, card, tag and read-only container demos. */
export function DataDisplaySection() {
  const [tableSort, setTableSort] = useState<'asc' | 'desc'>('asc')
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(3)
  const [dataTableSort, setDataTableSort] = useState<DataTableSort>({ key: '', order: '' })
  const [productFilter, setProductFilter] = useState<string[]>(['laptops'])
  const [advancedQuery, setAdvancedQuery] = useState<FilterQuery>({
    combinator: 'and',
    rules: [{ id: 'rule-1', field: 'name', operator: 'contains', value: 'watch' }],
  })
  const [appliedFilter, setAppliedFilter] = useState('Waiting for Apply')

  const sortedProducts = useMemo(
    () =>
      [...galleryProducts].sort((a, b) =>
        tableSort === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
      ),
    [tableSort],
  )

  const pagedProducts = useMemo(() => {
    const sorted = sortProducts(galleryProducts, dataTableSort)
    return sorted.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
  }, [dataTableSort, pageIndex, pageSize])

  const handleDataTableSort = useCallback((next: DataTableSort) => {
    setDataTableSort(next)
    setPageIndex(1)
  }, [])

  return (
    <SectionShell slug="data-display">
      <Demo
        title="Table - product summary"
        description="Compound table pieces for lightweight read-only data."
        code={`<Table>
  <Table.THead>
    <Table.Tr>
      <Table.Th>Product</Table.Th>
      <Table.Th>SKU</Table.Th>
      <Table.Th>Stock</Table.Th>
    </Table.Tr>
  </Table.THead>
  <Table.TBody>{rows.map((row) => <Table.Tr key={row.id}>...</Table.Tr>)}</Table.TBody>
</Table>`}
      >
        <div className="w-full overflow-x-auto">
          <Table>
            <Table.THead>
              <Table.Tr>
                <Table.Th>Product</Table.Th>
                <Table.Th>SKU</Table.Th>
                <Table.Th>Stock</Table.Th>
              </Table.Tr>
            </Table.THead>
            <Table.TBody>
              {galleryProducts.slice(0, 4).map((product) => (
                <Table.Tr key={product.id}>
                  <Table.Td>{product.name}</Table.Td>
                  <Table.Td>{product.sku}</Table.Td>
                  <Table.Td>{product.stock}</Table.Td>
                </Table.Tr>
              ))}
            </Table.TBody>
          </Table>
        </div>
      </Demo>

      <Demo
        title="Table - compact sortable"
        description="Compact rows with a controlled sortable header."
        code={`<Table compact hoverable>
  <Table.Th sortable sortDirection={direction} onSort={toggleDirection}>
    Product
  </Table.Th>
</Table>`}
      >
        <div className="w-full overflow-x-auto">
          <Table compact hoverable>
            <Table.THead>
              <Table.Tr>
                <Table.Th
                  sortable
                  sortDirection={tableSort}
                  onSort={() => setTableSort((next) => (next === 'asc' ? 'desc' : 'asc'))}
                >
                  Product
                </Table.Th>
                <Table.Th>Category</Table.Th>
                <Table.Th>Price</Table.Th>
              </Table.Tr>
            </Table.THead>
            <Table.TBody>
              {sortedProducts.slice(0, 4).map((product) => (
                <Table.Tr key={product.id}>
                  <Table.Td>{product.name}</Table.Td>
                  <Table.Td>{product.category}</Table.Td>
                  <Table.Td>{formatUsd.format(product.price)}</Table.Td>
                </Table.Tr>
              ))}
            </Table.TBody>
          </Table>
        </div>
      </Demo>

      <Demo
        title="DataTable - client paged"
        description="TanStack columns with local paging over galleryProducts."
        code={`<DataTable
  columns={columns}
  data={page}
  pagingData={{ pageIndex, pageSize, total: products.length }}
  onPaginationChange={setPageIndex}
  onPageSizeChange={setPageSize}
  onSort={setSort}
/>`}
      >
        <Demo.Stack>
          <div className="w-full overflow-x-auto">
            <DataTable
              columns={productColumns}
              data={pagedProducts}
              pagingData={{ pageIndex, pageSize, total: galleryProducts.length }}
              pageSizeOptions={[3, 6]}
              onPaginationChange={setPageIndex}
              onPageSizeChange={(next) => {
                setPageSize(next)
                setPageIndex(1)
              }}
              onSort={handleDataTableSort}
            />
          </div>
        </Demo.Stack>
      </Demo>

      <Demo
        title="DataTable - loading"
        description="Empty grid with the built-in loading overlay."
        code={`<DataTable columns={columns} data={[]} loading />`}
      >
        <div className="w-full overflow-x-auto">
          <DataTable columns={productColumns} data={[]} loading />
        </div>
      </Demo>

      <Demo
        title="Card - basic"
        code={`<Card>
  <h5>Card title</h5>
  <p>Supporting copy...</p>
</Card>`}
      >
        <Demo.Grid>
          <Card>
            <h5 className="mb-2 font-semibold text-content">Inventory health</h5>
            <p className="text-sm text-content-muted">
              Six products are shown from static gallery data for repeatable snapshots.
            </p>
          </Card>
          <Card clickable onClick={() => undefined}>
            <h5 className="mb-2 font-semibold text-content">Clickable card</h5>
            <p className="text-sm text-content-muted">
              Uses the component's clickable state and pointer affordance.
            </p>
          </Card>
        </Demo.Grid>
      </Demo>

      <Demo
        title="Card - header and footer"
        code={`<Card
  header={{ content: 'Release note', extra: <Tag>Draft</Tag> }}
  footer={{ content: <Button size="sm">Open</Button> }}
>
  Body content
</Card>`}
      >
        <Card
          className="w-full max-w-sm"
          header={{
            content: 'Release note',
            extra: (
              <Tag prefix prefixClass="bg-success">
                Ready
              </Tag>
            ),
          }}
          footer={{
            content: (
              <div className="flex justify-end gap-2">
                <Button size="sm">Preview</Button>
                <Button size="sm" variant="solid">
                  Publish
                </Button>
              </div>
            ),
          }}
        >
          <p className="text-sm text-content-muted">
            Header and footer slots can hold plain text or composed controls.
          </p>
        </Card>
      </Demo>

      <Demo
        title="StatisticCard - totals"
        code={`<StatisticCard>
  <h4>1,862</h4>
  <span>Total orders</span>
</StatisticCard>`}
      >
        <Demo.Grid>
          <StatisticCard>
            <div>
              <h4 className="text-2xl font-semibold text-content">1,862</h4>
              <span className="text-sm text-content-muted">Total orders</span>
            </div>
          </StatisticCard>
          <StatisticCard inset>
            <div>
              <h4 className="text-2xl font-semibold text-content">{formatUsd.format(1862)}</h4>
              <span className="text-sm text-content-muted">Total revenue</span>
            </div>
          </StatisticCard>
        </Demo.Grid>
      </Demo>

      <Demo
        title="StatisticCard - header and footer"
        code={`<StatisticCard header="Sales" footer={<Button size="sm">View report</Button>}>
  <h4>$1,862</h4>
</StatisticCard>`}
      >
        <StatisticCard
          className="w-full max-w-sm"
          header={
            <div className="flex items-center justify-between">
              <span className="font-medium text-content">Sales</span>
              <Button
                size="sm"
                shape="circle"
                aria-label="More sales actions"
                icon={<Icon as={TbIcons.TbDotsVertical} size={16} />}
              />
            </div>
          }
          footer={
            <div className="flex items-center justify-between text-sm text-content-muted">
              <span>vs yesterday</span>
              <GrowShrinkTag value={12.5} suffix="%" />
            </div>
          }
        >
          <h4 className="text-2xl font-semibold text-content">{formatUsd.format(1862)}</h4>
        </StatisticCard>
      </Demo>

      <Demo
        title="Badge - count, overflow and dot"
        code={`<Badge content={9}>
  <Avatar icon={<Icon as={TbIcons.TbUser} />} />
</Badge>
<Badge content={100} maxCount={99} />
<Badge />`}
      >
        <Demo.Row>
          <Badge content={9}>
            <Avatar icon={<Icon as={TbIcons.TbUser} size={16} />} />
          </Badge>
          <Badge content="New">
            <Avatar icon={<Icon as={TbIcons.TbBell} size={16} />} />
          </Badge>
          <Badge content={100} maxCount={99} />
          <Badge innerClass="bg-info" />
        </Demo.Row>
      </Demo>

      <Demo
        title="Tag - affixes and custom surfaces"
        code={`<Tag prefix>Basic</Tag>
<Tag prefix={<Icon as={HiIcons.HiPlusCircle} />}>Created</Tag>
<Tag suffix>Closed</Tag>`}
      >
        <Demo.Row>
          <Tag prefix>Queued</Tag>
          <Tag prefix prefixClass="bg-success">
            Active
          </Tag>
          <Tag prefix={<Icon as={HiIcons.HiPlusCircle} size={16} className="text-info" />}>
            Created
          </Tag>
          <Tag suffix suffixClass="bg-error">
            Blocked
          </Tag>
          <Tag className="rounded-full border-0 bg-primary-subtle text-primary">Featured</Tag>
        </Demo.Row>
      </Demo>

      <Demo
        title="GrowShrinkTag"
        description="Positive, negative and neutral deltas."
        code={`<GrowShrinkTag value={12.5} suffix="%" />
<GrowShrinkTag value={-8.3} suffix="%" />
<GrowShrinkTag value={0} suffix="%" />`}
      >
        <Demo.Row>
          <GrowShrinkTag value={12.5} suffix="%" />
          <GrowShrinkTag value={-8.3} suffix="%" />
          <GrowShrinkTag value={0} suffix="%" />
          <GrowShrinkTag value={25} showIcon={false} prefix="+" suffix=" units" />
        </Demo.Row>
      </Demo>

      <Demo
        title="SegmentProgressBar"
        description="Segmented progress plus a denser custom bar."
        code={`<SegmentProgressBar segments={40} percent={80} />
<SegmentProgressBar segments={50} percent={70} height={32} gap={2} filledClass="bg-primary" />`}
      >
        <Demo.Stack>
          {[0, 40, 80, 100].map((percent) => (
            <div key={percent}>
              <p className="mb-2 text-sm text-content-muted">{percent}%</p>
              <SegmentProgressBar segments={40} percent={percent} />
            </div>
          ))}
          <SegmentProgressBar
            segments={50}
            percent={70}
            height={32}
            gap={2}
            filledClass="bg-primary"
          />
        </Demo.Stack>
      </Demo>

      <Demo
        title="Timeline - activity feed"
        code={`<Timeline>
  <Timeline.Item media={<IconFrame>...</IconFrame>}>Deployment succeeded</Timeline.Item>
</Timeline>`}
      >
        <Timeline>
          {galleryActivity.slice(0, 3).map((item, index) => (
            <Timeline.Item
              key={item.id}
              media={
                <IconFrame>
                  <Icon
                    as={
                      index === 0
                        ? TbIcons.TbCheck
                        : index === 1
                          ? TbIcons.TbGitMerge
                          : TbIcons.TbMessage
                    }
                    size={16}
                  />
                </IconFrame>
              }
            >
              <p className="font-medium text-content">{item.title}</p>
              <p className="text-sm text-content-muted">{item.detail}</p>
            </Timeline.Item>
          ))}
        </Timeline>
      </Demo>

      <Demo
        title="Collapsible - controlled trigger"
        code={`<Collapsible defaultOpen>
  <Collapsible.Trigger>Shipping details</Collapsible.Trigger>
  <Collapsible.Content>Ships in 2-4 business days.</Collapsible.Content>
</Collapsible>`}
      >
        <Demo.Stack>
          <Collapsible defaultOpen>
            <Collapsible.Trigger>
              Shipping details <Icon as={TbIcons.TbChevronDown} size={16} />
            </Collapsible.Trigger>
            <Collapsible.Content>
              Ships in 2-4 business days. Free returns within 30 days.
            </Collapsible.Content>
          </Collapsible>
          <Collapsible>
            <Collapsible.Trigger>
              {({ isOpen }) => (
                <span className="flex w-full items-center justify-between gap-3">
                  Advanced options
                  <span className="text-content-muted">{isOpen ? 'Hide' : 'Show'}</span>
                </span>
              )}
            </Collapsible.Trigger>
            <Collapsible.Content>Custom trigger render prop.</Collapsible.Content>
          </Collapsible>
        </Demo.Stack>
      </Demo>

      <Demo
        title="Carousel - loop"
        code={`<Carousel opts={{ loop: true }}>
  <Carousel.Content>
    <Carousel.Item>Slide</Carousel.Item>
  </Carousel.Content>
  <Carousel.Previous />
  <Carousel.Next />
</Carousel>`}
      >
        <div className="w-full max-w-sm">
          <Carousel opts={{ loop: true }}>
            <Carousel.Content>
              {[1, 2, 3].map((slide) => (
                <Carousel.Item key={slide}>
                  <div className="flex h-40 items-center justify-center rounded-md bg-surface text-3xl font-bold text-content-muted">
                    {slide}
                  </div>
                </Carousel.Item>
              ))}
            </Carousel.Content>
            <div className="mt-3 flex justify-center gap-2">
              <Carousel.Previous />
              <Carousel.Next />
            </div>
          </Carousel>
        </div>
      </Demo>

      <Demo
        title="FileIcon - extension mapping"
        code={`<FileIcon name="report.pdf" />
<FileIcon name="budget.xlsx" />
<FileIcon name="unknown.bin" />`}
      >
        <Demo.Row>
          {[
            'photo.png',
            'clip.mp4',
            'song.mp3',
            'report.pdf',
            'budget.xlsx',
            'deck.pptx',
            'app.tsx',
            'unknown.bin',
          ].map((name) => (
            <div key={name} className="flex flex-col items-center gap-1">
              <FileIcon name={name} />
              <span className="text-xs text-content-muted">{name}</span>
            </div>
          ))}
        </Demo.Row>
      </Demo>

      <Demo
        title="PopoverFilter - controlled"
        description="Multi-select filter popover with the default trigger."
        code={`<PopoverFilter
  data={options}
  value={value}
  onChange={setValue}
  title="Category"
/>`}
      >
        <Demo.Stack>
          <PopoverFilter
            data={gallerySelectOptions}
            value={productFilter}
            onChange={setProductFilter}
            title="Category"
            inputPlaceholder="Search categories"
          />
          <p className="text-sm text-content-muted">
            Selected: {productFilter.join(', ') || 'none'}
          </p>
        </Demo.Stack>
      </Demo>

      <Demo
        title="AdvancedFilterBuilder"
        description="Controlled query editor with apply feedback."
        code={`<AdvancedFilterBuilder
  fields={fields}
  value={query}
  onChange={setQuery}
  onApply={handleApply}
/>`}
      >
        <div className="w-full max-w-2xl space-y-3">
          <AdvancedFilterBuilder
            fields={filterFields}
            value={advancedQuery}
            onChange={setAdvancedQuery}
            onApply={(next) => setAppliedFilter(JSON.stringify(next, null, 2))}
            onReset={() => setAppliedFilter('Reset pressed')}
          />
          <pre className="overflow-auto rounded-md bg-surface p-3 text-xs text-content-muted">
            {appliedFilter}
          </pre>
        </div>
      </Demo>

      <Demo
        title="SyntaxHighlighter - languages"
        code={`<SyntaxHighlighter language="tsx" showLineNumbers>
  {source}
</SyntaxHighlighter>`}
      >
        <Demo.Grid>
          <SyntaxHighlighter language="tsx" showLineNumbers>
            {syntaxSnippet}
          </SyntaxHighlighter>
          <SyntaxHighlighter language="bash">{bashSnippet}</SyntaxHighlighter>
        </Demo.Grid>
      </Demo>
    </SectionShell>
  )
}
