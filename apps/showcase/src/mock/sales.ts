/**
 * Mock data for the `sales` showcase area. No backend — everything here is
 * static and deterministic so screenshots stay stable.
 */

export interface Product {
  id: string
  name: string
  sku: string
  category: 'Watches' | 'Audio' | 'Wearables' | 'Bags' | 'Accessories'
  price: number
  stock: number
  status: 'active' | 'draft' | 'archived'
  sold: number
  rating: number
}

export interface OrderItem {
  productId: string
  name: string
  qty: number
  price: number
}

export interface Order {
  id: string
  ref: string
  customer: string
  email: string
  date: string
  total: number
  status: 'paid' | 'pending' | 'refunded' | 'cancelled'
  payment: 'card' | 'paypal' | 'transfer'
  items: OrderItem[]
}

export const products: Product[] = [
  {
    id: 'p-01',
    name: 'Aurora Chrono Watch',
    sku: 'AUR-CHR-01',
    category: 'Watches',
    price: 420,
    stock: 128,
    status: 'active',
    sold: 934,
    rating: 4.7,
  },
  {
    id: 'p-02',
    name: 'Pulse Analog Watch',
    sku: 'PLS-ANL-02',
    category: 'Watches',
    price: 310,
    stock: 0,
    status: 'active',
    sold: 611,
    rating: 4.4,
  },
  {
    id: 'p-03',
    name: 'Nimbus ANC Headphones',
    sku: 'NMB-ANC-03',
    category: 'Audio',
    price: 249,
    stock: 54,
    status: 'active',
    sold: 1203,
    rating: 4.8,
  },
  {
    id: 'p-04',
    name: 'Echo Buds Pro',
    sku: 'ECH-BUD-04',
    category: 'Audio',
    price: 149,
    stock: 210,
    status: 'active',
    sold: 1788,
    rating: 4.5,
  },
  {
    id: 'p-05',
    name: 'Trailband Fitness Tracker',
    sku: 'TRB-FIT-05',
    category: 'Wearables',
    price: 99,
    stock: 96,
    status: 'active',
    sold: 2044,
    rating: 4.2,
  },
  {
    id: 'p-06',
    name: 'Vertex Smart Ring',
    sku: 'VTX-RNG-06',
    category: 'Wearables',
    price: 279,
    stock: 37,
    status: 'draft',
    sold: 0,
    rating: 0,
  },
  {
    id: 'p-07',
    name: 'Nova Everyday Backpack',
    sku: 'NVA-BKP-07',
    category: 'Bags',
    price: 145,
    stock: 143,
    status: 'active',
    sold: 877,
    rating: 4.6,
  },
  {
    id: 'p-08',
    name: 'Carry Weekender Duffel',
    sku: 'CRY-DFL-08',
    category: 'Bags',
    price: 189,
    stock: 61,
    status: 'active',
    sold: 402,
    rating: 4.3,
  },
  {
    id: 'p-09',
    name: 'Braided USB-C Cable',
    sku: 'BRD-USB-09',
    category: 'Accessories',
    price: 19,
    stock: 540,
    status: 'active',
    sold: 5231,
    rating: 4.1,
  },
  {
    id: 'p-10',
    name: 'MagSafe Travel Charger',
    sku: 'MAG-CHG-10',
    category: 'Accessories',
    price: 59,
    stock: 12,
    status: 'active',
    sold: 1655,
    rating: 4.4,
  },
  {
    id: 'p-11',
    name: 'Aurora Chrono Watch — Gold',
    sku: 'AUR-CHR-11',
    category: 'Watches',
    price: 468,
    stock: 44,
    status: 'active',
    sold: 288,
    rating: 4.9,
  },
  {
    id: 'p-12',
    name: 'Legacy Field Watch',
    sku: 'LGC-FLD-12',
    category: 'Watches',
    price: 205,
    stock: 73,
    status: 'archived',
    sold: 1290,
    rating: 4.0,
  },
]

export const orders: Order[] = [
  {
    id: 'o-1001',
    ref: '#NT-1001',
    customer: 'Mara Whitfield',
    email: 'mara@example.com',
    date: '2026-08-28',
    total: 666,
    status: 'paid',
    payment: 'card',
    items: [
      { productId: 'p-01', name: 'Aurora Chrono Watch', qty: 1, price: 420 },
      { productId: 'p-04', name: 'Echo Buds Pro', qty: 1, price: 149 },
      { productId: 'p-10', name: 'MagSafe Travel Charger', qty: 1, price: 59 },
      { productId: 'p-09', name: 'Braided USB-C Cable', qty: 2, price: 19 },
    ],
  },
  {
    id: 'o-1002',
    ref: '#NT-1002',
    customer: 'Devin Alvarez',
    email: 'devin@example.com',
    date: '2026-08-28',
    total: 249,
    status: 'pending',
    payment: 'paypal',
    items: [{ productId: 'p-03', name: 'Nimbus ANC Headphones', qty: 1, price: 249 }],
  },
  {
    id: 'o-1003',
    ref: '#NT-1003',
    customer: 'Priya Nair',
    email: 'priya@example.com',
    date: '2026-08-27',
    total: 334,
    status: 'paid',
    payment: 'card',
    items: [
      { productId: 'p-07', name: 'Nova Everyday Backpack', qty: 1, price: 145 },
      { productId: 'p-05', name: 'Trailband Fitness Tracker', qty: 1, price: 99 },
      { productId: 'p-05', name: 'Trailband Fitness Tracker', qty: 1, price: 90 },
    ],
  },
  {
    id: 'o-1004',
    ref: '#NT-1004',
    customer: 'Sam Okafor',
    email: 'sam@example.com',
    date: '2026-08-27',
    total: 189,
    status: 'refunded',
    payment: 'transfer',
    items: [{ productId: 'p-08', name: 'Carry Weekender Duffel', qty: 1, price: 189 }],
  },
  {
    id: 'o-1005',
    ref: '#NT-1005',
    customer: 'Elise Fontaine',
    email: 'elise@example.com',
    date: '2026-08-26',
    total: 936,
    status: 'paid',
    payment: 'card',
    items: [{ productId: 'p-11', name: 'Aurora Chrono Watch — Gold', qty: 2, price: 468 }],
  },
  {
    id: 'o-1006',
    ref: '#NT-1006',
    customer: 'Tobias Lindqvist',
    email: 'tobias@example.com',
    date: '2026-08-26',
    total: 78,
    status: 'cancelled',
    payment: 'paypal',
    items: [
      { productId: 'p-10', name: 'MagSafe Travel Charger', qty: 1, price: 59 },
      { productId: 'p-09', name: 'Braided USB-C Cable', qty: 1, price: 19 },
    ],
  },
  {
    id: 'o-1007',
    ref: '#NT-1007',
    customer: 'Hannah Cole',
    email: 'hannah@example.com',
    date: '2026-08-25',
    total: 447,
    status: 'paid',
    payment: 'card',
    items: [{ productId: 'p-04', name: 'Echo Buds Pro', qty: 3, price: 149 }],
  },
  {
    id: 'o-1008',
    ref: '#NT-1008',
    customer: 'Marco Bianchi',
    email: 'marco@example.com',
    date: '2026-08-25',
    total: 205,
    status: 'pending',
    payment: 'transfer',
    items: [{ productId: 'p-12', name: 'Legacy Field Watch', qty: 1, price: 205 }],
  },
  {
    id: 'o-1009',
    ref: '#NT-1009',
    customer: 'Yuki Tanaka',
    email: 'yuki@example.com',
    date: '2026-08-24',
    total: 1245,
    status: 'paid',
    payment: 'card',
    items: [{ productId: 'p-03', name: 'Nimbus ANC Headphones', qty: 5, price: 249 }],
  },
  {
    id: 'o-1010',
    ref: '#NT-1010',
    customer: 'Grace Mensah',
    email: 'grace@example.com',
    date: '2026-08-24',
    total: 164,
    status: 'paid',
    payment: 'paypal',
    items: [
      { productId: 'p-07', name: 'Nova Everyday Backpack', qty: 1, price: 145 },
      { productId: 'p-09', name: 'Braided USB-C Cable', qty: 1, price: 19 },
    ],
  },
]

export const getProduct = (id: string): Product | undefined => products.find((p) => p.id === id)
export const getOrder = (id: string): Order | undefined => orders.find((o) => o.id === id)

/** Last 12 months, revenue in USD thousands. */
export const revenueByMonth = {
  categories: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
  thisYear: [182, 201, 234, 288, 196, 214, 243, 268, 291, 305, 322, 358],
  lastYear: [150, 168, 190, 240, 172, 181, 205, 219, 238, 246, 261, 279],
}

export const salesByCategory = [
  { label: 'Watches', value: 41 },
  { label: 'Audio', value: 27 },
  { label: 'Wearables', value: 16 },
  { label: 'Bags', value: 10 },
  { label: 'Accessories', value: 6 },
]

export const salesKpis = {
  revenue: { value: 358_400, delta: 11.8, spark: [279, 261, 305, 322, 331, 344, 358] },
  orders: { value: 1_284, delta: 6.2, spark: [980, 1010, 1102, 1140, 1190, 1225, 1284] },
  avgOrderValue: { value: 279, delta: 3.1, spark: [250, 255, 261, 268, 271, 274, 279] },
  refundRate: { value: 1.9, delta: -0.4, spark: [2.6, 2.5, 2.4, 2.2, 2.1, 2.0, 1.9] },
}

export const topProducts = [...products]
  .filter((p) => p.status === 'active')
  .sort((a, b) => b.sold * b.price - a.sold * a.price)
  .slice(0, 5)

export const recentOrders = orders.slice(0, 6)
