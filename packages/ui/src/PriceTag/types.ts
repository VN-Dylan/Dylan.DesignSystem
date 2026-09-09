import type { HTMLAttributes } from 'react'

export type PriceTagSize = 'sm' | 'md' | 'lg'
export type PriceTagAlign = 'start' | 'center' | 'end'

export interface PriceTagProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** Price amount to format. */
  amount: number
  /** ISO 4217 currency code. @default 'USD' */
  currency?: string
  /** Locale passed to Intl.NumberFormat. Defaults to the runtime locale. */
  locale?: string
  /** Original amount. Rendered struck through when greater than amount. */
  original?: number
  /** Unit suffix, for example "night". */
  unit?: string
  /** Visual size. @default 'md' */
  size?: PriceTagSize
  /** Inline alignment. */
  align?: PriceTagAlign
}
