import { forwardRef } from 'react'
import { classNames } from '@dylan-ds/utils'
import type { BadgeProps } from './types'
import './Badge.scss'

const getBadgeContent = (content: BadgeProps['content'], maxCount: number) => {
  if (typeof content === 'number' && content > maxCount) return `${maxCount}+`
  return content
}

/**
 * Badge highlights an item's notification count or status.
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { content, maxCount = 99, innerClass, badgeStyle, className, children, ...rest },
  ref,
) {
  const hasChildren = children != null
  const resolvedContent = getBadgeContent(content, maxCount)
  const isDot = resolvedContent == null || resolvedContent === ''

  return (
    <span
      ref={ref}
      data-inline={!hasChildren || undefined}
      className={classNames('dyl-badge', className)}
      {...rest}
    >
      {hasChildren && <span className="dyl-badge__child">{children}</span>}
      <span
        className={classNames('dyl-badge__inner', innerClass)}
        data-dot={isDot || undefined}
        style={badgeStyle}
        aria-hidden={isDot || undefined}
      >
        {!isDot && resolvedContent}
      </span>
    </span>
  )
})
