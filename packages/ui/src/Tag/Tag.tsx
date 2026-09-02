import { forwardRef, isValidElement } from 'react'
import { classNames } from '@vn-dylan/utils'
import type { TagProps } from './types'
import './Tag.scss'

const renderAffix = (
  affix: TagProps['prefix'],
  className: string | undefined,
  placement: 'prefix' | 'suffix',
) => {
  if (affix === false || affix == null) return null
  if (affix === true) {
    return (
      <span
        className={classNames('dyl-tag__dot', `dyl-tag__dot--${placement}`, className)}
        aria-hidden
      />
    )
  }
  return (
    <span
      className={`dyl-tag__affix dyl-tag__affix--${placement}`}
      aria-hidden={isValidElement(affix)}
    >
      {affix}
    </span>
  )
}

/**
 * Compact keyword label with optional prefix and suffix affixes.
 */
export const Tag = forwardRef<HTMLSpanElement, TagProps>(function Tag(
  { prefix = false, prefixClass, suffix = false, suffixClass, className, children, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      data-prefix={Boolean(prefix) || undefined}
      data-suffix={Boolean(suffix) || undefined}
      className={classNames('dyl-tag', className)}
      {...rest}
    >
      {renderAffix(prefix, prefixClass, 'prefix')}
      <span className="dyl-tag__label">{children}</span>
      {renderAffix(suffix, suffixClass, 'suffix')}
    </span>
  )
})
