import { forwardRef, useState } from 'react'
import { classNames } from '@vn-dylan/utils'
import type { ButtonProps } from './types'
import './Button.scss'

/**
 * Button triggers an action or event. It is the design system's reference
 * component — the pattern every other component follows (see RECIPE.md).
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'default',
    size = 'md',
    shape = 'round',
    block = false,
    active = false,
    loading = false,
    disabled = false,
    icon,
    iconAlignment = 'start',
    clickFeedback = true,
    className,
    children,
    type = 'button',
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    ...rest
  },
  ref,
) {
  const [pressed, setPressed] = useState(false)

  const unclickable = disabled || loading
  const iconOnly = icon != null && (children == null || children === '')

  const resolvedClassName =
    typeof className === 'function'
      ? className({ active: active || pressed, unclickable })
      : className

  const spinner = (
    <span className="dyl-btn__spinner" aria-hidden>
      <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
        <path
          d="M21 12a9 9 0 0 0-9-9"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </span>
  )

  const iconNode = loading ? spinner : icon ? <span className="dyl-btn__icon">{icon}</span> : null

  return (
    <button
      ref={ref}
      type={type}
      disabled={unclickable}
      aria-busy={loading || undefined}
      data-variant={variant}
      data-size={size}
      data-shape={shape}
      data-active={active || pressed || undefined}
      data-icon-only={iconOnly || undefined}
      className={classNames(
        'dyl-btn',
        block && 'dyl-btn--block',
        clickFeedback && 'dyl-btn--feedback',
        resolvedClassName,
      )}
      onMouseDown={(e) => {
        if (clickFeedback && !unclickable) setPressed(true)
        onMouseDown?.(e)
      }}
      onMouseUp={(e) => {
        setPressed(false)
        onMouseUp?.(e)
      }}
      onMouseLeave={(e) => {
        setPressed(false)
        onMouseLeave?.(e)
      }}
      {...rest}
    >
      {iconAlignment === 'start' && iconNode}
      {children != null && children !== '' && <span className="dyl-btn__label">{children}</span>}
      {iconAlignment === 'end' && iconNode}
    </button>
  )
})
