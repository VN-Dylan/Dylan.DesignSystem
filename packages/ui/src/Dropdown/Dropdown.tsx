import {
  safePolygon,
  useClick,
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react'
import {
  cloneElement,
  forwardRef,
  isValidElement,
  useCallback,
  useId,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type ReactElement,
  type SetStateAction,
} from 'react'
import { classNames } from '@dylan-ds/utils'
import { Portal } from '../_internal/Portal'
import { composeRefs } from '../_internal/composeRefs'
import { normalizeDropdownPlacement } from '../_internal/floatingPlacement'
import { floatingAutoUpdate, getFloatingMiddleware } from '../_internal/floatingRuntime'
import { DropdownProvider, useDropdownContext } from './context'
import type {
  DropdownContextMenuProps,
  DropdownItemProps,
  DropdownMenuProps,
  DropdownProps,
} from './types'
import './Dropdown.scss'

type OpenSetter = (next: SetStateAction<boolean>) => void

interface ToggleElementProps extends HTMLAttributes<HTMLElement> {
  disabled?: boolean
}

type ToggleElement = ReactElement<ToggleElementProps> & { ref?: React.Ref<HTMLElement> }

const isToggleElement = (node: React.ReactNode): node is ToggleElement => isValidElement(node)

const makePointRect = (x: number, y: number) => ({
  x,
  y,
  top: y,
  left: x,
  right: x,
  bottom: y,
  width: 0,
  height: 0,
  toJSON: () => ({}),
})

const useDropdownOpen = ({
  onOpen,
  onClose,
  onToggle,
}: Pick<DropdownProps, 'onOpen' | 'onClose' | 'onToggle'>): [boolean, OpenSetter] => {
  const [open, setOpenState] = useState(false)

  const setOpen = useCallback<OpenSetter>(
    (next) => {
      setOpenState((previous) => {
        const resolved = typeof next === 'function' ? next(previous) : next
        if (resolved === previous) return previous
        onToggle?.(resolved)
        if (resolved) onOpen?.()
        else onClose?.()
        return resolved
      })
    },
    [onClose, onOpen, onToggle],
  )

  return [open, setOpen]
}

const DropdownItem = forwardRef<HTMLDivElement, DropdownItemProps>(function DropdownItem(
  {
    active = false,
    disabled = false,
    variant = 'default',
    eventKey,
    onClick,
    onSelect,
    className,
    children,
    onKeyDown,
    ...rest
  },
  ref,
) {
  const context = useDropdownContext()
  const selected = active || (eventKey != null && context?.activeKey === eventKey)
  const interactive = variant === 'default' || variant === 'custom'

  const commit = (event: MouseEvent<HTMLElement>) => {
    if (!interactive || disabled) return
    onClick?.()
    onSelect?.(eventKey ?? '', event)
    context?.onSelect?.(event)
    context?.close()
  }

  if (variant === 'divider') {
    return (
      <div
        ref={ref}
        role="separator"
        className={classNames('dyl-dropdown__divider', className)}
        {...rest}
      />
    )
  }

  if (variant === 'header') {
    return (
      <div
        ref={ref}
        role="presentation"
        className={classNames('dyl-dropdown__header', className)}
        {...rest}
      >
        {children}
      </div>
    )
  }

  return (
    <div
      ref={ref}
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled || undefined}
      data-active={selected || undefined}
      data-disabled={disabled || undefined}
      data-variant={variant}
      className={classNames('dyl-dropdown__item', className)}
      onClick={commit}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          commit(event as unknown as MouseEvent<HTMLElement>)
        }
        onKeyDown?.(event)
      }}
      {...rest}
    >
      {children}
    </div>
  )
})

const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(function DropdownMenu(
  { title, eventKey, placement = 'middle-end-top', className, children, onKeyDown, ...rest },
  ref,
) {
  const parentContext = useDropdownContext()
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const active = eventKey != null && parentContext?.activeKey === eventKey

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: normalizeDropdownPlacement(placement),
    whileElementsMounted: floatingAutoUpdate,
    middleware: getFloatingMiddleware(4),
  })

  const hover = useHover(context, { handleClose: safePolygon(), move: false })
  const click = useClick(context)
  const dismiss = useDismiss(context)
  const role = useRole(context, { role: 'menu' })
  const { getReferenceProps, getFloatingProps } = useInteractions([hover, click, dismiss, role])

  return (
    <>
      <div
        ref={composeRefs(ref, refs.setReference)}
        role="menuitem"
        tabIndex={0}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        data-active={active || undefined}
        className={classNames('dyl-dropdown__item', 'dyl-dropdown__item--submenu', className)}
        {...getReferenceProps({
          ...rest,
          onKeyDown: (event) => {
            if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowRight') {
              event.preventDefault()
              setOpen(true)
            }
            onKeyDown?.(event as unknown as KeyboardEvent<HTMLDivElement>)
          },
        })}
      >
        <span className="dyl-dropdown__item-label">{title}</span>
        <span className="dyl-dropdown__submenu-caret" aria-hidden>
          &gt;
        </span>
      </div>
      {open && (
        <Portal>
          <DropdownProvider value={parentContext}>
            <div
              id={menuId}
              ref={refs.setFloating}
              className="dyl-dropdown__menu"
              style={floatingStyles}
              {...getFloatingProps()}
            >
              {children}
            </div>
          </DropdownProvider>
        </Portal>
      )}
    </>
  )
})

const DropdownRoot = forwardRef<HTMLDivElement, DropdownProps>(function DropdownRoot(
  {
    title,
    renderTitle,
    trigger = 'click',
    placement = 'bottom-start',
    menuClass,
    menuStyle,
    toggleClassName,
    disabled = false,
    activeKey,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onContextMenu,
    onSelect,
    onOpen,
    onClose,
    onToggle,
    className,
    children,
    ...rest
  },
  ref,
) {
  const [open, setOpen] = useDropdownOpen({ onOpen, onClose, onToggle })
  const menuId = useId()

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: normalizeDropdownPlacement(placement),
    whileElementsMounted: floatingAutoUpdate,
    middleware: getFloatingMiddleware(6),
  })

  const click = useClick(context, { enabled: !disabled && trigger === 'click' })
  const hover = useHover(context, {
    enabled: !disabled && trigger === 'hover',
    handleClose: safePolygon(),
    move: false,
  })
  const dismiss = useDismiss(context, { enabled: !disabled })
  const role = useRole(context, { role: 'menu' })
  const { getReferenceProps, getFloatingProps } = useInteractions([click, hover, dismiss, role])

  const contextValue = useMemo(
    () => ({ activeKey, close: () => setOpen(false), onSelect }),
    [activeKey, onSelect, setOpen],
  )

  const commonToggleProps = {
    'aria-haspopup': 'menu' as const,
    'aria-expanded': open,
    'aria-controls': open ? menuId : undefined,
    onClick: (event: MouseEvent<HTMLElement>) => {
      if (disabled) {
        event.preventDefault()
        return
      }
      onClick?.(event)
    },
    onMouseEnter: (event: MouseEvent<HTMLElement>) => {
      if (!disabled) onMouseEnter?.(event)
    },
    onMouseLeave: (event: MouseEvent<HTMLElement>) => {
      if (!disabled) onMouseLeave?.(event)
    },
    onContextMenu: (event: MouseEvent<HTMLElement>) => {
      if (disabled) {
        event.preventDefault()
        return
      }
      onContextMenu?.(event)
      if (trigger === 'context') {
        event.preventDefault()
        setOpen(true)
      }
    },
  }

  const titleNode = renderTitle ?? title
  const toggle = isToggleElement(titleNode) ? (
    cloneElement(
      titleNode,
      getReferenceProps({
        ...titleNode.props,
        ...commonToggleProps,
        ref: composeRefs(titleNode.ref, refs.setReference),
        className: classNames('dyl-dropdown__anchor', toggleClassName, titleNode.props.className),
        disabled: disabled || titleNode.props.disabled,
      }),
    )
  ) : (
    <button
      ref={refs.setReference}
      type="button"
      disabled={disabled}
      className={classNames('dyl-dropdown__toggle', toggleClassName)}
      {...getReferenceProps({
        ...commonToggleProps,
        'aria-label': titleNode == null ? 'Open menu' : undefined,
      })}
    >
      <span className="dyl-dropdown__toggle-label">{titleNode}</span>
      <span className="dyl-dropdown__toggle-caret" aria-hidden>
        &gt;
      </span>
    </button>
  )

  return (
    <DropdownProvider value={contextValue}>
      <div
        ref={ref}
        data-open={open || undefined}
        data-disabled={disabled || undefined}
        className={classNames('dyl-dropdown', className)}
        {...rest}
      >
        {toggle}
      </div>
      {open && (
        <Portal>
          <div
            id={menuId}
            ref={refs.setFloating}
            className={classNames('dyl-dropdown__menu', menuClass)}
            style={{ ...menuStyle, ...floatingStyles }}
            {...getFloatingProps()}
          >
            {children}
          </div>
        </Portal>
      )}
    </DropdownProvider>
  )
})

const DropdownContextMenu = forwardRef<HTMLDivElement, DropdownContextMenuProps>(
  function DropdownContextMenu(
    {
      areaClass,
      areaContent,
      areaRef,
      placement = 'bottom-start',
      menuClass,
      menuStyle,
      disabled = false,
      activeKey,
      onClick,
      onMouseEnter,
      onMouseLeave,
      onSelect,
      onOpen,
      onClose,
      onToggle,
      className,
      children,
      ...rest
    },
    ref,
  ) {
    const [open, setOpen] = useDropdownOpen({ onOpen, onClose, onToggle })
    const menuId = useId()
    const pointRef = useRef({ x: 0, y: 0 })
    const virtualReference = useMemo(
      () => ({
        getBoundingClientRect: () => makePointRect(pointRef.current.x, pointRef.current.y),
      }),
      [],
    )

    const { refs, floatingStyles, context } = useFloating({
      open,
      onOpenChange: setOpen,
      placement: normalizeDropdownPlacement(placement),
      strategy: 'fixed',
      whileElementsMounted: floatingAutoUpdate,
      middleware: getFloatingMiddleware(4),
    })

    const dismiss = useDismiss(context, { enabled: !disabled })
    const role = useRole(context, { role: 'menu' })
    const { getReferenceProps, getFloatingProps } = useInteractions([dismiss, role])

    const contextValue = useMemo(
      () => ({ activeKey, close: () => setOpen(false), onSelect }),
      [activeKey, onSelect, setOpen],
    )

    return (
      <DropdownProvider value={contextValue}>
        <div
          ref={composeRefs(ref, areaRef, refs.setReference)}
          data-open={open || undefined}
          data-disabled={disabled || undefined}
          className={classNames('dyl-dropdown__area', areaClass, className)}
          {...getReferenceProps({
            ...rest,
            onClick: (event) => {
              if (!disabled) onClick?.(event as MouseEvent<HTMLElement>)
            },
            onMouseEnter: (event) => {
              if (!disabled) onMouseEnter?.(event as MouseEvent<HTMLElement>)
            },
            onMouseLeave: (event) => {
              if (!disabled) onMouseLeave?.(event as MouseEvent<HTMLElement>)
            },
            onContextMenu: (event) => {
              event.preventDefault()
              if (disabled) return
              pointRef.current = { x: event.clientX, y: event.clientY }
              refs.setPositionReference(virtualReference)
              setOpen(true)
            },
          })}
        >
          {areaContent}
        </div>
        {open && (
          <Portal>
            <div
              id={menuId}
              ref={refs.setFloating}
              className={classNames('dyl-dropdown__menu', menuClass)}
              style={{ ...menuStyle, ...floatingStyles }}
              {...getFloatingProps()}
            >
              {children}
            </div>
          </Portal>
        )}
      </DropdownProvider>
    )
  },
)

/**
 * Dropdown allows users to select a single item from a floating menu.
 */
export const Dropdown = Object.assign(DropdownRoot, {
  Item: DropdownItem,
  Menu: DropdownMenu,
  ContextMenu: DropdownContextMenu,
})
