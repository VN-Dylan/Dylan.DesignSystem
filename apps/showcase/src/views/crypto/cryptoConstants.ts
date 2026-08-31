import type { StatusTone } from '@/components/shared/StatusTag'
import type { Trade } from '@/mock/crypto'

export const tradeStatusTone: Record<Trade['status'], StatusTone> = {
  filled: 'success',
  open: 'info',
  cancelled: 'neutral',
}

/** Format a fiat price, adapting decimals to the magnitude. */
export const formatPrice = (value: number) =>
  value >= 100
    ? value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      })
    : value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 4,
      })

export const formatCompactUsd = (value: number) =>
  `$${new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(value)}`
