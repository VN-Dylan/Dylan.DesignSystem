import { forwardRef, useCallback, useId, useRef } from 'react'
import { classNames, useControllableState } from '@dylan-ds/utils'
import { CollapsibleContext, useCollapsibleContext } from './context'
import type { CollapsibleContentProps, CollapsibleProps, CollapsibleTriggerProps } from './types'
import './Collapsible.scss'

const CollapsibleRoot = forwardRef<HTMLDivElement, CollapsibleProps>(function Collapsible(
  { open, defaultOpen = false, onOpenChange, className, children, ...rest },
  ref,
) {
  const id = useId()
  const [isOpen, setOpen] = useControllableState<boolean>({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  })
  const toggle = useCallback(() => setOpen((prev) => !prev), [setOpen])

  return (
    <CollapsibleContext.Provider
      value={{ isOpen, toggle, contentId: `${id}-content`, triggerId: `${id}-trigger` }}
    >
      <div
        ref={ref}
        data-open={isOpen || undefined}
        className={classNames('dyl-collapsible', className)}
        {...rest}
      >
        {children}
      </div>
    </CollapsibleContext.Provider>
  )
})

const Trigger = forwardRef<HTMLButtonElement, CollapsibleTriggerProps>(function CollapsibleTrigger(
  { children, className, ...rest },
  ref,
) {
  const { isOpen, toggle, contentId, triggerId } = useCollapsibleContext('Collapsible.Trigger')
  return (
    <button
      ref={ref}
      type="button"
      id={triggerId}
      aria-expanded={isOpen}
      aria-controls={contentId}
      className={classNames('dyl-collapsible__trigger', className)}
      onClick={toggle}
      {...rest}
    >
      {typeof children === 'function' ? children({ isOpen, toggle }) : children}
    </button>
  )
})

const Content = forwardRef<HTMLDivElement, CollapsibleContentProps>(function CollapsibleContent(
  { defaultOverflowHidden = true, className, children, ...rest },
  ref,
) {
  const { isOpen, contentId, triggerId } = useCollapsibleContext('Collapsible.Content')
  const innerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={ref}
      id={contentId}
      role="region"
      aria-labelledby={triggerId}
      hidden={!isOpen}
      data-overflow-hidden={defaultOverflowHidden || undefined}
      className={classNames('dyl-collapsible__content', className)}
      {...rest}
    >
      <div ref={innerRef} className="dyl-collapsible__inner">
        {children}
      </div>
    </div>
  )
})

/**
 * Show/hide a region of content, toggled by its trigger. Compose with
 * `Collapsible.Trigger` and `Collapsible.Content`.
 */
export const Collapsible = Object.assign(CollapsibleRoot, { Trigger, Content })
