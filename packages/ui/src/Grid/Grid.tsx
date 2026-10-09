import { forwardRef, type CSSProperties } from 'react'
import { classNames } from '@vn-dylan/utils'
import type { GridColumns, GridItemProps, GridProps } from './types'
import './Grid.scss'

type CustomProperties = CSSProperties & Record<`--dyl-${string}`, string | number | undefined>

const responsiveProperties = (
  prefix: '--dyl-grid-columns' | '--dyl-grid-item-span',
  value: GridColumns,
) => {
  if (typeof value === 'number') return { [`${prefix}-base`]: value } as CustomProperties

  return Object.fromEntries(
    Object.entries(value).map(([breakpoint, breakpointValue]) => [
      `${prefix}-${breakpoint}`,
      breakpointValue,
    ]),
  ) as CustomProperties
}

const GridRoot = forwardRef<HTMLElement, GridProps>(function Grid(
  { asElement: Element = 'div', columns, minChildWidth, gap = 'base', className, style, ...rest },
  ref,
) {
  const layoutStyle: CustomProperties = {
    ...(columns == null ? {} : responsiveProperties('--dyl-grid-columns', columns)),
    ...(minChildWidth == null
      ? {}
      : {
          '--dyl-grid-min-child-width':
            typeof minChildWidth === 'number' ? `var(--dyl-space-${minChildWidth})` : minChildWidth,
        }),
    ...style,
  }

  return (
    <Element
      ref={ref}
      data-columns={
        columns == null ? undefined : typeof columns === 'number' ? columns : 'responsive'
      }
      data-min-child-width={minChildWidth == null ? undefined : true}
      data-gap={gap}
      className={classNames('dyl-grid', className)}
      style={layoutStyle}
      {...rest}
    />
  )
})

const GridItem = forwardRef<HTMLElement, GridItemProps>(function GridItem(
  { asElement: Element = 'div', span = 1, rowSpan = 1, className, style, ...rest },
  ref,
) {
  const itemStyle: CustomProperties = {
    ...responsiveProperties('--dyl-grid-item-span', span),
    '--dyl-grid-item-row-span': rowSpan,
    ...style,
  }

  return (
    <Element
      ref={ref}
      data-span={typeof span === 'number' ? span : 'responsive'}
      data-row-span={rowSpan}
      className={classNames('dyl-grid__item', className)}
      style={itemStyle}
      {...rest}
    />
  )
})

/** Grid provides token-based gaps, responsive columns, and compound grid items. */
export const Grid = Object.assign(GridRoot, { Item: GridItem })
