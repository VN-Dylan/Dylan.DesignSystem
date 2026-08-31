import { forwardRef } from 'react'
import { classNames } from '@dylan-ds/utils'
import type { StatisticCardProps } from './types'
import './StatisticCard.scss'

/**
 * StatisticCard displays statistical data with optional header and footer
 * sections.
 */
export const StatisticCard = forwardRef<HTMLDivElement, StatisticCardProps>(function StatisticCard(
  { inset = false, header, footer, bodyClass, className, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      data-inset={inset || undefined}
      className={classNames('dyl-statistic-card', className)}
      {...rest}
    >
      {header != null && <div className="dyl-statistic-card__header">{header}</div>}
      <div className={classNames('dyl-statistic-card__body', bodyClass)}>{children}</div>
      {footer != null && <div className="dyl-statistic-card__footer">{footer}</div>}
    </div>
  )
})
