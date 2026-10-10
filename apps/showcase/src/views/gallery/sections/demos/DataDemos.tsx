import { useMemo, useState } from 'react'
import {
  Avatar,
  Button,
  Combobox,
  DataTable,
  List,
  Select,
  Table,
  TreeList,
  type ColumnDef,
  type ComboboxOption,
  type SelectOption,
  type TreeNode,
} from '@vn-dylan/ui'
import { Icon, TbIcons } from '@vn-dylan/icons'
import { Demo } from '@/views/gallery/components/Demo'
import { galleryProducts, galleryUsers, type GalleryProduct } from '@/mock/gallery'

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

/* ------------------------------------------------------------------ List */

const invoices = Array.from({ length: 5_000 }, (_, i) => ({
  id: `inv-${i}`,
  number: `INV-${String(i + 1).padStart(5, '0')}`,
  amount: ((i * 7919) % 90_000) / 100,
}))

export function ListDemos() {
  const [selected, setSelected] = useState<string[]>([galleryUsers[1]!.id])
  const [order, setOrder] = useState(galleryUsers)

  return (
    <>
      <Demo
        title="List — rich rows"
        description="Prefix, title, description, meta and trailing actions."
        code={`<List
  aria-label="Team"
  bordered
  items={users}
  getKey={(u) => u.id}
  renderItem={(u) => (
    <List.Item
      prefix={<Avatar src={u.avatar} />}
      title={u.name}
      description={u.email}
      meta={u.role}
      actions={<Button size="sm" variant="plain">Manage</Button>}
    />
  )}
/>`}
      >
        <List
          className="w-full max-w-prose"
          bordered
          aria-label="Team"
          items={galleryUsers}
          getKey={(u) => u.id}
          renderItem={(u) => (
            <List.Item
              prefix={
                <Avatar size={32} shape="circle">
                  {u.name.slice(0, 1)}
                </Avatar>
              }
              title={u.name}
              description={u.email}
              meta={u.role}
              actions={
                <Button size="sm" variant="plain">
                  Manage
                </Button>
              }
            />
          )}
        />
      </Demo>

      <Demo
        title="List — selectable & sortable"
        description="Multiple selection (↑/↓, Space, Ctrl+A) · drag or Alt + ↑/↓ to reorder."
        code={`<List selectionMode="multiple" selectedKeys={keys} onSelectionChange={setKeys} … />
<List sortable onReorder={setItems} … />`}
      >
        <Demo.Grid>
          <List
            bordered
            aria-label="Reviewers"
            selectionMode="multiple"
            selectedKeys={selected}
            onSelectionChange={setSelected}
            items={galleryUsers}
            getKey={(u) => u.id}
            renderItem={(u) => <List.Item title={u.name} description={u.role} />}
          />
          <List
            bordered
            aria-label="Priority order"
            sortable
            onReorder={setOrder}
            items={order}
            getKey={(u) => u.id}
            renderItem={(u, { index }) => <List.Item title={u.name} meta={`#${index + 1}`} />}
          />
        </Demo.Grid>
      </Demo>

      <Demo
        title="List — virtualized"
        description="5 000 rows; only the visible window is rendered."
        code={`<List virtual={{ itemHeight: 48, height: 320 }} items={invoices} … />`}
      >
        <List
          className="w-full max-w-md"
          bordered
          aria-label="Invoices"
          selectionMode="single"
          virtual={{ itemHeight: 48, height: 320 }}
          items={invoices}
          getKey={(r) => r.id}
          renderItem={(r) => <List.Item title={r.number} meta={`$${r.amount.toFixed(2)}`} />}
        />
      </Demo>
    </>
  )
}

/* -------------------------------------------------------------- TreeList */

const folder = <Icon as={TbIcons.TbFolder} size={16} />
const file = <Icon as={TbIcons.TbFileText} size={16} />

const files: TreeNode[] = [
  {
    id: 'src',
    label: 'src',
    icon: folder,
    children: [
      {
        id: 'components',
        label: 'components',
        icon: folder,
        children: [
          { id: 'button', label: 'Button.tsx', icon: file },
          { id: 'dialog', label: 'Dialog.tsx', icon: file },
          { id: 'list', label: 'List.tsx', icon: file },
        ],
      },
      { id: 'index', label: 'index.ts', icon: file },
    ],
  },
  {
    id: 'docs',
    label: 'docs',
    icon: folder,
    children: [{ id: 'layout', label: 'Layout.mdx', icon: file }],
  },
  { id: 'readme', label: 'README.md', icon: file },
]

const regions: TreeNode[] = [
  { id: 'apac', label: 'Asia Pacific', hasChildren: true },
  { id: 'emea', label: 'Europe, Middle East & Africa', hasChildren: true },
  { id: 'amer', label: 'Americas', hasChildren: true },
]

const loadOffices = (node: TreeNode) =>
  new Promise<TreeNode[]>((resolve) =>
    setTimeout(
      () =>
        resolve(
          ['HQ', 'Sales office', 'Support hub'].map((name, i) => ({
            id: `${node.id}-${i}`,
            label: `${name} · ${String(node.label)}`,
          })),
        ),
      500,
    ),
  )

export function TreeListDemos() {
  const [checked, setChecked] = useState<string[]>(['button', 'dialog'])
  return (
    <>
      <Demo
        title="TreeList — navigation & search"
        description="Click / Enter selects, ←/→ collapse and expand, search keeps matching branches open."
        code={`<TreeList
  aria-label="Files"
  nodes={nodes}
  selectable
  searchable
  defaultExpandedKeys={['src']}
/>`}
      >
        <div className="w-full max-w-sm rounded-lg border border-border bg-surface p-3">
          <TreeList
            aria-label="Files"
            nodes={files}
            selectable
            searchable
            searchPlaceholder="Filter files"
            defaultExpandedKeys={['src', 'components']}
            defaultSelectedKey="list"
          />
        </div>
      </Demo>

      <Demo
        title="TreeList — checkable & lazy"
        description="Tri-state checkboxes (parent is mixed when some children are checked) · children loaded on first expand."
        code={`<TreeList checkable checkedKeys={keys} onCheckedChange={setKeys} nodes={nodes} />
<TreeList nodes={[{ id: 'apac', label: 'APAC', hasChildren: true }]} loadChildren={fetchChildren} />`}
      >
        <Demo.Grid>
          <div className="rounded-lg border border-border bg-surface p-3">
            <TreeList
              aria-label="Files to publish"
              nodes={files}
              checkable
              checkedKeys={checked}
              onCheckedChange={setChecked}
              defaultExpandedKeys={['src', 'components']}
            />
          </div>
          <div className="rounded-lg border border-border bg-surface p-3">
            <TreeList aria-label="Offices" nodes={regions} checkable loadChildren={loadOffices} />
          </div>
        </Demo.Grid>
      </Demo>
    </>
  )
}

/* ---------------------------------------------------- DataTable advanced */

const productColumns: ColumnDef<GalleryProduct, unknown>[] = [
  { accessorKey: 'name', header: 'Product', enableHiding: false },
  { accessorKey: 'category', header: 'Category' },
  { accessorKey: 'price', header: 'Price', cell: ({ row }) => usd.format(row.original.price) },
  { accessorKey: 'stock', header: 'Stock' },
]

interface BudgetLine {
  id: string
  name: string
  owner: string
  budget: number
  children?: BudgetLine[]
}

const budget: BudgetLine[] = [
  {
    id: 'eng',
    name: 'Engineering',
    owner: 'Carolyn Hanson',
    budget: 3_200_000,
    children: [
      {
        id: 'platform',
        name: 'Platform',
        owner: 'Ron Vargas',
        budget: 1_400_000,
        children: [
          { id: 'infra', name: 'Infrastructure', owner: 'Samantha Phillips', budget: 700_000 },
          { id: 'data', name: 'Data', owner: 'Carolyn Hanson', budget: 700_000 },
        ],
      },
      { id: 'product-eng', name: 'Product engineering', owner: 'Ron Vargas', budget: 1_800_000 },
    ],
  },
  {
    id: 'design',
    name: 'Design',
    owner: 'Ron Vargas',
    budget: 640_000,
    children: [{ id: 'brand', name: 'Brand', owner: 'Samantha Phillips', budget: 280_000 }],
  },
  { id: 'ops', name: 'Operations', owner: 'Samantha Phillips', budget: 410_000 },
]

const budgetColumns: ColumnDef<BudgetLine, unknown>[] = [
  { accessorKey: 'name', header: 'Team', enableHiding: false },
  { accessorKey: 'owner', header: 'Owner' },
  { accessorKey: 'budget', header: 'Budget', cell: ({ row }) => usd.format(row.original.budget) },
]

const allCategories: SelectOption = { label: 'All categories', value: 'all' }

export function DataTableAdvancedDemos() {
  const [category, setCategory] = useState<SelectOption>(allCategories)
  const categoryOptions = useMemo<SelectOption[]>(
    () => [
      allCategories,
      ...Array.from(new Set(galleryProducts.map((p) => p.category))).map((c) => ({
        label: c,
        value: c,
      })),
    ],
    [],
  )
  const rows = useMemo(
    () => galleryProducts.filter((p) => category.value === 'all' || p.category === category.value),
    [category.value],
  )
  const [open, setOpen] = useState<Record<string, boolean>>({ src: true })
  const folders: {
    id: string
    name: string
    size: string
    children?: { id: string; name: string; size: string }[]
  }[] = [
    {
      id: 'src',
      name: 'src',
      size: '1.2 MB',
      children: [
        { id: 'ui', name: 'ui', size: '840 KB' },
        { id: 'index', name: 'index.ts', size: '2 KB' },
      ],
    },
    { id: 'readme', name: 'README.md', size: '4 KB' },
  ]

  return (
    <>
      <Demo
        title="DataTable — toolbar, columns & paging"
        description="Search, filter slot, Columns menu; header ⋮ to pin / move / hide; drag headers to reorder; rows-per-page + pagination at the end."
        code={`<DataTable
  columns={columns}
  data={rows}
  searchable
  filters={<Select … />}
  pagination
  pageSizeOptions={[3, 6]}
  initialState={{ columnPinning: { left: ['name'] } }}
/>`}
      >
        <div className="w-full rounded-lg border border-border bg-surface p-card">
          <DataTable<GalleryProduct>
            columns={productColumns}
            data={rows}
            searchable
            searchPlaceholder="Search products"
            filters={
              <Select
                options={categoryOptions}
                value={category}
                onChange={(o) => setCategory(o ?? allCategories)}
                isClearable={false}
                aria-label="Category"
              />
            }
            pagination
            pageSizeOptions={[3, 6]}
            initialState={{ columnPinning: { left: ['name'] } }}
          />
        </div>
      </Demo>

      <Demo
        title="DataTable — tree rows"
        description="getSubRows: expand per row or from the header; search keeps ancestors; selecting a parent selects its children."
        code={`<DataTable
  columns={columns}
  data={teams}
  getRowId={(t) => t.id}
  getSubRows={(t) => t.children}
  selectable
  searchable
  initialState={{ expanded: { eng: true } }}
/>`}
      >
        <div className="w-full rounded-lg border border-border bg-surface p-card">
          <DataTable<BudgetLine>
            columns={budgetColumns}
            data={budget}
            getRowId={(t) => t.id}
            getSubRows={(t) => t.children}
            selectable
            searchable
            searchPlaceholder="Search teams"
            initialState={{ expanded: { eng: true } }}
          />
        </div>
      </Demo>

      <Demo
        title="Table — TreeCell"
        description="Static hierarchy; the consumer owns which rows are open."
        code={`<Table.TreeCell level={depth} expandable expanded={open} onToggle={toggle}>
  {name}
</Table.TreeCell>`}
      >
        <div className="w-full max-w-md rounded-lg border border-border bg-surface p-4">
          <Table hoverable>
            <Table.THead>
              <Table.Tr>
                <Table.Th>Name</Table.Th>
                <Table.Th>Size</Table.Th>
              </Table.Tr>
            </Table.THead>
            <Table.TBody>
              {folders.flatMap((item) => [
                <Table.Tr key={item.id}>
                  <Table.TreeCell
                    expandable={Boolean(item.children)}
                    expanded={Boolean(open[item.id])}
                    onToggle={() => setOpen((o) => ({ ...o, [item.id]: !o[item.id] }))}
                    toggleLabel={item.name}
                  >
                    {item.name}
                  </Table.TreeCell>
                  <Table.Td>{item.size}</Table.Td>
                </Table.Tr>,
                ...(open[item.id] && item.children
                  ? item.children.map((child) => (
                      <Table.Tr key={child.id}>
                        <Table.TreeCell level={1}>{child.name}</Table.TreeCell>
                        <Table.Td>{child.size}</Table.Td>
                      </Table.Tr>
                    ))
                  : []),
              ])}
            </Table.TBody>
          </Table>
        </div>
      </Demo>
    </>
  )
}

/* -------------------------------------------------------------- Combobox */

const countries: ComboboxOption[] = [
  'Australia',
  'Brazil',
  'Canada',
  'Denmark',
  'France',
  'Germany',
  'India',
  'Japan',
  'Mexico',
  'Singapore',
  'Spain',
  'Vietnam',
].map((name) => ({ value: name.toLowerCase(), label: name }))

const people = Array.from({ length: 300 }, (_, i) => {
  const first = ['Ron', 'Carolyn', 'Samantha', 'Linh', 'Kenji', 'Sara'][i % 6]!
  const last = ['Vargas', 'Hanson', 'Phillips', 'Nguyen', 'Sato', 'Rossi'][Math.floor(i / 6) % 6]!
  return {
    value: `p${i}`,
    label: `${first} ${last}`,
    description: `${first}.${last}${i}@dylan.dev`.toLowerCase(),
  }
})

const searchPeople = (query: string, { signal }: { signal: AbortSignal }) =>
  new Promise<ComboboxOption[]>((resolve, reject) => {
    const timer = setTimeout(() => {
      const q = query.toLowerCase()
      resolve(people.filter((p) => p.label.toLowerCase().includes(q)).slice(0, 15))
    }, 400)
    signal.addEventListener('abort', () => {
      clearTimeout(timer)
      reject(new DOMException('Aborted', 'AbortError'))
    })
  })

export function ComboboxDemos() {
  const [markets, setMarkets] = useState<ComboboxOption[]>([countries[11]!, countries[7]!])
  return (
    <>
      <Demo
        title="Combobox — static & tags"
        description="Type to filter; multiple picks become removable tags (Backspace removes the last)."
        code={`<Combobox aria-label="Country" options={countries} />
<Combobox aria-label="Markets" multiple options={countries} value={value} onChange={setValue} />`}
      >
        <Demo.Stack>
          <Combobox aria-label="Country" placeholder="Choose a country" options={countries} />
          <Combobox
            aria-label="Markets"
            placeholder="Add markets"
            multiple
            maxTags={3}
            options={countries}
            value={markets}
            onChange={setMarkets}
          />
        </Demo.Stack>
      </Demo>

      <Demo
        title="Combobox — async search"
        description="loadOptions is debounced and aborts stale requests; shows loading, empty and min-length states."
        code={`<Combobox
  aria-label="Recipients"
  multiple
  minQueryLength={2}
  loadOptions={(query, { signal }) => api.searchPeople(query, { signal })}
/>`}
      >
        <Demo.Stack>
          <Combobox
            aria-label="Owner"
            placeholder="Search 300 people (min. 2 characters)"
            loadOptions={searchPeople}
            minQueryLength={2}
          />
          <Combobox
            aria-label="Recipients"
            placeholder="Add recipients"
            multiple
            loadOptions={searchPeople}
          />
        </Demo.Stack>
      </Demo>
    </>
  )
}
