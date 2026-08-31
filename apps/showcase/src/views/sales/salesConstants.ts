import type { SelectOption } from '@dylan-ds/ui'
import type { StatusTone } from '@/components/shared/StatusTag'
import type { Order, Product } from '@/mock/sales'

export const productCategoryOptions: SelectOption[] = [
  { label: 'Watches', value: 'Watches' },
  { label: 'Audio', value: 'Audio' },
  { label: 'Wearables', value: 'Wearables' },
  { label: 'Bags', value: 'Bags' },
  { label: 'Accessories', value: 'Accessories' },
]

export const productStatusTone: Record<Product['status'], StatusTone> = {
  active: 'success',
  draft: 'warning',
  archived: 'neutral',
}

export const orderStatusTone: Record<Order['status'], StatusTone> = {
  paid: 'success',
  pending: 'warning',
  refunded: 'info',
  cancelled: 'error',
}

export const orderStatusOptions: SelectOption[] = [
  { label: 'Paid', value: 'paid' },
  { label: 'Pending', value: 'pending' },
  { label: 'Refunded', value: 'refunded' },
  { label: 'Cancelled', value: 'cancelled' },
]

export const paymentOptions: SelectOption[] = [
  { label: 'Card', value: 'card' },
  { label: 'PayPal', value: 'paypal' },
  { label: 'Transfer', value: 'transfer' },
]

export const formatPayment = (payment: Order['payment']) =>
  payment === 'paypal' ? 'PayPal' : payment.charAt(0).toUpperCase() + payment.slice(1)
