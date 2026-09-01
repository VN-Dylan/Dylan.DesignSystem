import { forwardRef } from 'react'
import type {
  ComponentType,
  ForwardRefExoticComponent,
  KeyboardEvent,
  ReactNode,
  RefAttributes,
} from 'react'
import { classNames } from '../functions/classNames'

export interface WithHeaderItemProps {
  /** Give the item hover affordance (adds `dyl-header-item--hoverable`). @default true */
  hoverable?: boolean
  /** Fired on click and on Enter / Space. */
  onClick?: () => void
  className?: string
  children?: ReactNode
}

/**
 * Wrap a component as a clickable, keyboard-operable item for the app header
 * bar (notifications button, language switcher, the user menu trigger, …).
 * Adds `role="button"`, a tab stop, Enter/Space activation and the
 * `dyl-header-item` class hook; the template supplies the visuals.
 *
 * @example
 * const NotificationBell = withHeaderItem(Bell)
 * <NotificationBell onClick={openPanel} />
 */
export function withHeaderItem<P extends object>(
  Component: ComponentType<P>,
): ForwardRefExoticComponent<P & WithHeaderItemProps & RefAttributes<HTMLDivElement>> {
  const Wrapped = forwardRef<HTMLDivElement, P & WithHeaderItemProps>(
    ({ hoverable = true, onClick, className, children, ...rest }, ref) => {
      const activate = () => onClick?.()
      const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          activate()
        }
      }

      return (
        <div
          ref={ref}
          role="button"
          tabIndex={0}
          className={classNames(
            'dyl-header-item',
            hoverable && 'dyl-header-item--hoverable',
            className,
          )}
          onClick={activate}
          onKeyDown={onKeyDown}
        >
          <Component {...(rest as P)}>{children}</Component>
        </div>
      )
    },
  )

  Wrapped.displayName = `withHeaderItem(${Component.displayName || Component.name || 'Component'})`
  return Wrapped as ForwardRefExoticComponent<
    P & WithHeaderItemProps & RefAttributes<HTMLDivElement>
  >
}

export default withHeaderItem
