import { Children, forwardRef, type CSSProperties } from 'react'
import { classNames } from '@dylan-ds/utils'
import { OmittedAvatarTooltip } from './OmittedAvatarTooltip'
import type { AvatarGroupProps, AvatarProps } from './types'
import './Avatar.scss'

const getSizeStyle = (size: AvatarProps['size']) =>
  typeof size === 'number'
    ? ({
        width: size,
        height: size,
        fontSize: size / 2,
      } satisfies CSSProperties)
    : undefined

const AvatarRoot = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  {
    shape = 'rounded-sm',
    size = 'md',
    icon,
    src,
    srcSet,
    alt = '',
    className,
    children,
    style,
    ...rest
  },
  ref,
) {
  const sizeStyle = getSizeStyle(size)

  return (
    <span
      ref={ref}
      data-shape={shape}
      data-size={typeof size === 'number' ? 'custom' : size}
      className={classNames('dyl-avatar', className)}
      style={{ ...sizeStyle, ...style }}
      {...rest}
    >
      {src ? (
        <img className="dyl-avatar__img" src={src} srcSet={srcSet} alt={alt} />
      ) : icon ? (
        <span className="dyl-avatar__icon" aria-hidden>
          {icon}
        </span>
      ) : (
        <span className="dyl-avatar__text">{children}</span>
      )}
    </span>
  )
})

const Group = forwardRef<HTMLDivElement, AvatarGroupProps>(function AvatarGroup(
  {
    chained = false,
    maxCount = 4,
    omittedAvatarContent,
    omittedAvatarProps,
    omittedAvatarTooltip = false,
    omittedAvatarTooltipProps,
    onOmittedAvatarClick,
    className,
    children,
    ...rest
  },
  ref,
) {
  const items = Children.toArray(children)
  const visibleItems = items.slice(0, maxCount)
  const omittedCount = Math.max(items.length - visibleItems.length, 0)
  const omittedContent = omittedAvatarContent ?? (omittedCount > 0 ? `+${omittedCount}` : '')
  const omittedShape = omittedAvatarProps?.shape ?? 'rounded-sm'
  const omittedSize = omittedAvatarProps?.size ?? 'md'
  const omittedSizeStyle = getSizeStyle(omittedSize)
  const omittedAriaLabel = omittedAvatarProps?.['aria-label'] ?? `${omittedCount} more avatars`

  return (
    <div
      ref={ref}
      data-chained={chained || undefined}
      className={classNames('dyl-avatar-group', className)}
      {...rest}
    >
      {visibleItems.map((item, index) => (
        <span className="dyl-avatar-group__item" key={index}>
          {item}
        </span>
      ))}
      {omittedCount > 0 && (
        <OmittedAvatarTooltip
          enabled={omittedAvatarTooltip}
          label={omittedContent}
          tooltipProps={omittedAvatarTooltipProps}
        >
          <span className="dyl-avatar-group__item">
            <button
              type="button"
              data-shape={omittedShape}
              data-size={typeof omittedSize === 'number' ? 'custom' : omittedSize}
              aria-label={omittedAriaLabel}
              className={classNames(
                'dyl-avatar',
                'dyl-avatar--omitted',
                omittedAvatarProps?.className,
              )}
              style={{ ...omittedSizeStyle, ...omittedAvatarProps?.style }}
              onClick={onOmittedAvatarClick}
            >
              <span className="dyl-avatar__text">{omittedContent}</span>
            </button>
          </span>
        </OmittedAvatarTooltip>
      )}
    </div>
  )
})

/**
 * Avatar represents a user or product brand with an image, icon, or initials.
 */
export const Avatar = Object.assign(AvatarRoot, { Group })
