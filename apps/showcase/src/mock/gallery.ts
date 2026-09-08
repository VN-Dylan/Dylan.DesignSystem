/**
 * Deterministic demo data for the component gallery. No `Math.random`, no
 * `Date.now` — every section imports from here so examples stay stable across
 * renders and visual snapshots.
 */

/** Object literal type (not an `interface`) so it satisfies the library's
 *  `Record<string, unknown>` user shape. */
export type GalleryUser = {
  id: string
  name: string
  role: string
  email: string
  /** Empty string → the avatar falls back to initials. */
  avatar: string
}

export const galleryUsers: GalleryUser[] = [
  { id: 'u1', name: 'Ron Vargas', role: 'Design lead', email: 'ron@dylan.dev', avatar: '' },
  { id: 'u2', name: 'Carolyn Hanson', role: 'Engineer', email: 'carolyn@dylan.dev', avatar: '' },
  { id: 'u3', name: 'Samantha Phillips', role: 'Product', email: 'sam@dylan.dev', avatar: '' },
  { id: 'u4', name: 'Ella Robinson', role: 'Engineer', email: 'ella@dylan.dev', avatar: '' },
  { id: 'u5', name: 'Marcus Lee', role: 'QA', email: 'marcus@dylan.dev', avatar: '' },
]

export interface GalleryProduct {
  id: string
  name: string
  sku: string
  price: number
  stock: 'In stock' | 'Low' | 'Out of stock'
  category: string
}

export const galleryProducts: GalleryProduct[] = [
  {
    id: 'p1',
    name: 'Macbook Pro 14"',
    sku: 'NT-110201',
    price: 1189,
    stock: 'In stock',
    category: 'Laptops',
  },
  {
    id: 'p2',
    name: 'Apple Watch Series 10',
    sku: 'NT-230984',
    price: 420,
    stock: 'In stock',
    category: 'Wearables',
  },
  { id: 'p3', name: 'Nova Backpack', sku: 'NT-389121', price: 145, stock: 'Low', category: 'Bags' },
  {
    id: 'p4',
    name: 'Pulse Analog Watch',
    sku: 'NT-554789',
    price: 310,
    stock: 'Out of stock',
    category: 'Wearables',
  },
  {
    id: 'p5',
    name: 'Aero Wireless Keyboard',
    sku: 'NT-667012',
    price: 99,
    stock: 'In stock',
    category: 'Accessories',
  },
  {
    id: 'p6',
    name: 'Studio Display Stand',
    sku: 'NT-771540',
    price: 240,
    stock: 'Low',
    category: 'Accessories',
  },
]

export const gallerySelectOptions: { label: string; value: string }[] = [
  { label: 'Laptops', value: 'laptops' },
  { label: 'Wearables', value: 'wearables' },
  { label: 'Bags', value: 'bags' },
  { label: 'Accessories', value: 'accessories' },
]

/** Twelve months of two series — feed straight into `<Chart>` / `<ChartCard>`. */
export const galleryChart = {
  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  series: [
    { name: 'Revenue', data: [31, 40, 28, 51, 42, 61, 75, 68, 79, 91, 84, 102] },
    { name: 'Orders', data: [11, 32, 45, 32, 34, 52, 41, 55, 62, 58, 69, 74] },
  ],
}

export const galleryHistogram = [12, 18, 25, 33, 40, 44, 39, 30, 22, 15, 9, 4]

export interface GalleryActivity {
  id: string
  title: string
  detail: string
  /** ISO date — deterministic. */
  at: string
}

export const galleryActivity: GalleryActivity[] = [
  {
    id: 'a1',
    title: 'Deployment succeeded',
    detail: 'v0.1.1 published to GitHub Packages',
    at: '2026-09-08T09:12:00Z',
  },
  {
    id: 'a2',
    title: 'PR merged',
    detail: 'widen React peer range to include v19',
    at: '2026-09-08T08:40:00Z',
  },
  {
    id: 'a3',
    title: 'Review requested',
    detail: 'component gallery scaffold',
    at: '2026-09-07T16:05:00Z',
  },
  {
    id: 'a4',
    title: 'Branch created',
    detail: 'feat/showcase-gallery-landing',
    at: '2026-09-07T15:58:00Z',
  },
]

export const galleryTreeCountries = [
  { code: 'US', name: 'United States', value: 128 },
  { code: 'GB', name: 'United Kingdom', value: 74 },
  { code: 'DE', name: 'Germany', value: 61 },
  { code: 'VN', name: 'Vietnam', value: 52 },
  { code: 'BR', name: 'Brazil', value: 33 },
]
