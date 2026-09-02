import { forwardRef } from 'react'
import { HiIcons, Icon } from '@vn-dylan/icons'
import { classNames } from '@vn-dylan/utils'
import type { GrowShrinkTagProps } from './types'
import './GrowShrinkTag.scss'

const getTrend = (value: number) => {
  if (value > 0) return 'grow'
  if (value < 0) return 'shrink'
  return 'neutral'
}

const iconByTrend = {
  grow: HiIcons.HiArrowTrendingUp,
  shrink: HiIcons.HiArrowTrendingDown,
  neutral: HiIcons.HiMinus,
}

/**
 * GrowShrinkTag displays numeric growth or decline with directional styling.
 */
export const GrowShrinkTag = forwardRef<HTMLSpanElement, GrowShrinkTagProps>(function GrowShrinkTag(
  { value = 0, showIcon = true, prefix, suffix, className, children, ...rest },
  ref,
) {
  const trend = getTrend(value)

  return (
    <span
      ref={ref}
      data-trend={trend}
      className={classNames('dyl-grow-shrink-tag', className)}
      {...rest}
    >
      {showIcon && (
        <span className="dyl-grow-shrink-tag__icon" aria-hidden>
          <Icon as={iconByTrend[trend]} />
        </span>
      )}
      {prefix != null && <span className="dyl-grow-shrink-tag__affix">{prefix}</span>}
      <span className="dyl-grow-shrink-tag__value">{children ?? value}</span>
      {suffix != null && <span className="dyl-grow-shrink-tag__affix">{suffix}</span>}
    </span>
  )
})
