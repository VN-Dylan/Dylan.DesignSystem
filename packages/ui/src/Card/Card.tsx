import { forwardRef, type KeyboardEvent } from 'react'
import { classNames } from '@vn-dylan/utils'
import type { CardFooterConfig, CardHeaderConfig, CardProps } from './types'
import './Card.scss'

const isBordered = (part: CardHeaderConfig | CardFooterConfig | undefined) => part?.bordered ?? true

/**
 * Card contains a group of related content with optional header and footer.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    header,
    footer,
    bordered = false,
    clickable = false,
    bodyClass,
    onClick,
    onKeyDown,
    role,
    tabIndex,
    className,
    children,
    ...rest
  },
  ref,
) {
  const interactive = onClick != null

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(e)
    if (e.defaultPrevented || !interactive) return
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      e.currentTarget.click()
    }
  }

  return (
    <div
      ref={ref}
      data-bordered={bordered || undefined}
      data-clickable={clickable || interactive || undefined}
      className={classNames('dyl-card', className)}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={interactive ? 'button' : role}
      tabIndex={interactive ? (tabIndex ?? 0) : tabIndex}
      {...rest}
    >
      {header != null && (
        <div
          className={classNames('dyl-card__header', header.className)}
          data-bordered={isBordered(header) || undefined}
        >
          <div className="dyl-card__header-content">{header.content}</div>
          {header.extra != null && <div className="dyl-card__header-extra">{header.extra}</div>}
        </div>
      )}
      <div className={classNames('dyl-card__body', bodyClass)}>{children}</div>
      {footer != null && (
        <div
          className={classNames('dyl-card__footer', footer.className)}
          data-bordered={isBordered(footer) || undefined}
        >
          {footer.content}
        </div>
      )}
    </div>
  )
})
