import { Children, cloneElement, forwardRef, isValidElement } from 'react'
import { classNames } from '@dylan-ds/utils'
import type { TimelineItemProps, TimelineProps } from './types'
import './Timeline.scss'

const TimelineItem = forwardRef<HTMLLIElement, TimelineItemProps>(function TimelineItem(
  { media, isLast = false, className, children, ...rest },
  ref,
) {
  return (
    <li
      ref={ref}
      data-last={isLast || undefined}
      className={classNames('dyl-timeline__item', className)}
      {...rest}
    >
      <div className="dyl-timeline__gutter" aria-hidden>
        <span className="dyl-timeline__media">
          {media ?? <span className="dyl-timeline__dot" />}
        </span>
        {!isLast && <span className="dyl-timeline__connector" />}
      </div>
      <div className="dyl-timeline__content">{children}</div>
    </li>
  )
})

const TimelineRoot = forwardRef<HTMLUListElement, TimelineProps>(function Timeline(
  { className, children, ...rest },
  ref,
) {
  const items = Children.toArray(children).filter(
    isValidElement,
  ) as React.ReactElement<TimelineItemProps>[]
  return (
    <ul ref={ref} className={classNames('dyl-timeline', className)} {...rest}>
      {items.map((child, index) =>
        cloneElement(child, {
          isLast: child.props.isLast ?? index === items.length - 1,
          key: child.key ?? index,
        }),
      )}
    </ul>
  )
})

/**
 * A chronological list of events. Compose with `Timeline.Item`; the connector
 * on the last item is hidden automatically.
 */
export const Timeline = Object.assign(TimelineRoot, { Item: TimelineItem })
