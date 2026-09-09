import { forwardRef, useMemo } from 'react'
import { classNames } from '@vn-dylan/utils'
import type { PriceTagProps } from './types'
import './PriceTag.scss'

const formatPrice = (amount: number, currency: string, locale?: string) =>
  new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount)

/**
 * PriceTag formats an amount as a currency price with optional original price
 * and unit suffix.
 */
export const PriceTag = forwardRef<HTMLSpanElement, PriceTagProps>(function PriceTag(
  {
    amount,
    currency = 'USD',
    locale,
    original,
    unit,
    size = 'md',
    align = 'start',
    className,
    ...rest
  },
  ref,
) {
  const formatted = useMemo(() => formatPrice(amount, currency, locale), [amount, currency, locale])
  const formattedOriginal = useMemo(
    () => (original == null ? null : formatPrice(original, currency, locale)),
    [currency, locale, original],
  )
  const discounted = original != null && original > amount && formattedOriginal != null

  return (
    <span
      ref={ref}
      data-size={size}
      data-align={align}
      className={classNames('dyl-price-tag', className)}
      {...rest}
    >
      {discounted && (
        <>
          <s className="dyl-price-tag__original" aria-hidden>
            {formattedOriginal}
          </s>
          <span className="dyl-price-tag__sr">was {formattedOriginal}</span>
        </>
      )}
      <span
        className="dyl-price-tag__amount"
        aria-label={discounted ? `now ${formatted}` : undefined}
      >
        {formatted}
      </span>
      {unit && <span className="dyl-price-tag__unit">{` / ${unit}`}</span>}
    </span>
  )
})
