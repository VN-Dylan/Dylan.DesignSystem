import { forwardRef } from 'react'
import { classNames } from '@vn-dylan/utils'
import { Skeleton } from '../Skeleton'
import type { MediaSkeletonProps, TableRowSkeletonProps, TextBlockSkeletonProps } from './types'
import './Loaders.scss'

const count = (value: number) => Array.from({ length: Math.max(0, value) })

/**
 * MediaSkeleton composes avatar, title, and text placeholders.
 */
export const MediaSkeleton = forwardRef<HTMLDivElement, MediaSkeletonProps>(function MediaSkeleton(
  { showAvatar = true, avatarProps, titleProps, textProps, className, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={classNames('dyl-media-skeleton', className)} {...rest}>
      {showAvatar && (
        <Skeleton
          variant="circle"
          {...avatarProps}
          className={classNames('dyl-media-skeleton__avatar', avatarProps?.className)}
        />
      )}
      <div className="dyl-media-skeleton__content">
        <Skeleton
          {...titleProps}
          className={classNames('dyl-media-skeleton__title', titleProps?.className)}
        />
        <Skeleton
          {...textProps}
          className={classNames('dyl-media-skeleton__text', textProps?.className)}
        />
      </div>
    </div>
  )
})

/**
 * TableRowSkeleton renders table body rows for loading states.
 */
export const TableRowSkeleton = forwardRef<HTMLTableSectionElement, TableRowSkeletonProps>(
  function TableRowSkeleton(
    { columns = 1, rows = 10, avatarInColumns = [], avatarProps, className, ...rest },
    ref,
  ) {
    const columnItems = count(columns)

    return (
      <tbody ref={ref} className={classNames('dyl-table-row-skeleton', className)} {...rest}>
        {count(rows).map((_, rowIndex) => (
          <tr key={rowIndex} className="dyl-table-row-skeleton__row">
            {columnItems.map((_, columnIndex) => (
              <td key={columnIndex} className="dyl-table-row-skeleton__cell">
                {avatarInColumns.includes(columnIndex) ? (
                  <div className="dyl-table-row-skeleton__media">
                    <Skeleton
                      variant="circle"
                      {...avatarProps}
                      className={classNames(
                        'dyl-table-row-skeleton__avatar',
                        avatarProps?.className,
                      )}
                    />
                    <Skeleton className="dyl-table-row-skeleton__line" />
                  </div>
                ) : (
                  <Skeleton className="dyl-table-row-skeleton__line" />
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    )
  },
)

/**
 * TextBlockSkeleton renders title and paragraph-line placeholders.
 */
export const TextBlockSkeleton = forwardRef<HTMLDivElement, TextBlockSkeletonProps>(
  function TextBlockSkeleton(
    {
      rowCount = 3,
      title = true,
      titleWidth = '40%',
      lastChildWidth = '60%',
      height,
      className,
      ...rest
    },
    ref,
  ) {
    const rows = count(rowCount)

    return (
      <div ref={ref} className={classNames('dyl-text-block-skeleton', className)} {...rest}>
        {title && (
          <Skeleton width={titleWidth} height={height} className="dyl-text-block-skeleton__title" />
        )}
        {rows.map((_, index) => (
          <Skeleton
            key={index}
            width={index === rows.length - 1 ? lastChildWidth : undefined}
            height={height}
            className="dyl-text-block-skeleton__line"
          />
        ))}
      </div>
    )
  },
)

export const Loaders = Object.assign(MediaSkeleton, {
  MediaSkeleton,
  TableRowSkeleton,
  TextBlockSkeleton,
})
