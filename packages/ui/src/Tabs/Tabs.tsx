import { forwardRef, useId, type KeyboardEvent } from 'react'
import { classNames, useControllableState } from '@dylan-ds/utils'
import { TabsProvider, useTabsContext } from './context'
import type { TabsProps, TabsTabContentProps, TabsTabListProps, TabsTabNavProps } from './types'
import './Tabs.scss'

const toDomId = (value: string) => value.replace(/[^a-zA-Z0-9_-]/g, '-')

const TabList = forwardRef<HTMLDivElement, TabsTabListProps>(function TabList(
  { className, ...rest },
  ref,
) {
  return (
    <div ref={ref} role="tablist" className={classNames('dyl-tabs__list', className)} {...rest} />
  )
})

const TabNav = forwardRef<HTMLButtonElement, TabsTabNavProps>(function TabNav(
  { value, disabled = false, icon, className, children, onClick, onKeyDown, ...rest },
  ref,
) {
  const context = useTabsContext()
  const selected = context.value === value
  const domValue = toDomId(value)
  const tabId = `${context.baseId}-tab-${domValue}`
  const panelId = `${context.baseId}-panel-${domValue}`

  const move = (event: KeyboardEvent<HTMLButtonElement>) => {
    const list = event.currentTarget.closest('[role="tablist"]')
    const tabs = Array.from(
      list?.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)') ?? [],
    )
    const currentIndex = tabs.indexOf(event.currentTarget)
    if (currentIndex < 0) return

    const lastIndex = tabs.length - 1
    const nextIndex =
      event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? lastIndex
          : event.key === 'ArrowLeft'
            ? currentIndex === 0
              ? lastIndex
              : currentIndex - 1
            : currentIndex === lastIndex
              ? 0
              : currentIndex + 1

    const nextTab = tabs[nextIndex]
    nextTab?.focus()
    nextTab?.click()
  }

  return (
    <button
      ref={ref}
      id={tabId}
      type="button"
      role="tab"
      disabled={disabled}
      aria-selected={selected}
      aria-controls={panelId}
      data-active={selected || undefined}
      data-disabled={disabled || undefined}
      data-tab-value={value}
      tabIndex={selected ? 0 : -1}
      className={classNames('dyl-tabs__nav', className)}
      onClick={(event) => {
        if (!disabled) context.setValue(value)
        onClick?.(event)
      }}
      onKeyDown={(event) => {
        if (
          event.key === 'ArrowRight' ||
          event.key === 'ArrowLeft' ||
          event.key === 'Home' ||
          event.key === 'End'
        ) {
          event.preventDefault()
          move(event)
        }
        onKeyDown?.(event)
      }}
      {...rest}
    >
      {icon != null && (
        <span className="dyl-tabs__icon" aria-hidden>
          {icon}
        </span>
      )}
      <span className="dyl-tabs__label">{children}</span>
    </button>
  )
})

const TabContent = forwardRef<HTMLDivElement, TabsTabContentProps>(function TabContent(
  { value, className, ...rest },
  ref,
) {
  const context = useTabsContext()
  const selected = context.value === value
  const domValue = toDomId(value)

  return (
    <div
      ref={ref}
      id={`${context.baseId}-panel-${domValue}`}
      role="tabpanel"
      aria-labelledby={`${context.baseId}-tab-${domValue}`}
      hidden={!selected}
      data-active={selected || undefined}
      className={classNames('dyl-tabs__content', className)}
      {...rest}
    />
  )
})

const TabsRoot = forwardRef<HTMLDivElement, TabsProps>(function TabsRoot(
  { value, defaultValue, onChange, variant = 'underline', className, children, ...rest },
  ref,
) {
  const baseId = useId()
  const [activeValue, setActiveValue] = useControllableState<string>({
    value,
    defaultValue: defaultValue ?? '',
    onChange,
  })

  return (
    <TabsProvider value={{ value: activeValue, variant, baseId, setValue: setActiveValue }}>
      <div ref={ref} data-variant={variant} className={classNames('dyl-tabs', className)} {...rest}>
        {children}
      </div>
    </TabsProvider>
  )
})

/**
 * Tabs organize related content into switchable panels.
 */
export const Tabs = Object.assign(TabsRoot, { TabList, TabNav, TabContent })
