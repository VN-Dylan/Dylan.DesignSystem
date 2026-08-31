import { forwardRef } from 'react'
import type { KeyboardEvent, Ref } from 'react'
import { classNames, useControllableState } from '@dylan-ds/utils'
import { SegmentProvider, useSegmentContext } from './context'
import type { SegmentItemProps, SegmentProps, SegmentValue } from './types'
import './Segment.scss'

const asArray = (value: SegmentValue): string[] =>
  Array.isArray(value) ? value : value ? [value] : []

const Item = forwardRef<HTMLElement, SegmentItemProps>(function SegmentItem(
  { children, disabled = false, size, value, className, onClick, onKeyDown, ...rest },
  ref,
) {
  const context = useSegmentContext()
  const active = context.isActive(value)
  const itemSize = size ?? context.size

  const selectItem = () => {
    if (!disabled) context.setValue(value)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      selectItem()
    }
    onKeyDown?.(event)
  }

  const sharedProps = {
    'data-active': active || undefined,
    'data-disabled': disabled || undefined,
    'data-size': itemSize,
    className: classNames('dyl-segment__item', className),
  }

  if (typeof children === 'function') {
    return (
      <div
        ref={ref as Ref<HTMLDivElement>}
        {...sharedProps}
        className={classNames('dyl-segment__item-shell', className)}
        {...rest}
      >
        {children({
          active,
          disabled,
          value,
          ref: value,
          onSegmentItemClick: selectItem,
        })}
      </div>
    )
  }

  const isSingle = context.selectionType === 'single'

  return (
    <button
      ref={ref as Ref<HTMLButtonElement>}
      type="button"
      role={isSingle ? 'radio' : undefined}
      aria-checked={isSingle ? active : undefined}
      aria-pressed={isSingle ? undefined : active}
      disabled={disabled}
      onClick={(event) => {
        selectItem()
        onClick?.(event)
      }}
      onKeyDown={handleKeyDown}
      {...sharedProps}
      {...rest}
    >
      {children}
    </button>
  )
})

const SegmentRoot = forwardRef<HTMLDivElement, SegmentProps>(function SegmentRoot(
  {
    defaultValue,
    onChange,
    selectionType = 'single',
    size = 'md',
    value,
    className,
    children,
    ...rest
  },
  ref,
) {
  const multiple = selectionType === 'multiple'
  const [selected, setSelected] = useControllableState<SegmentValue>({
    value,
    defaultValue: defaultValue ?? (multiple ? [] : ''),
    onChange,
  })

  const isActive = (itemValue: string) =>
    multiple ? asArray(selected).includes(itemValue) : selected === itemValue

  const setValue = (itemValue: string) => {
    if (multiple) {
      const current = asArray(selected)
      setSelected(
        current.includes(itemValue)
          ? current.filter((value) => value !== itemValue)
          : [...current, itemValue],
      )
      return
    }
    setSelected(itemValue)
  }

  return (
    <SegmentProvider value={{ value: selected, selectionType, size, isActive, setValue }}>
      <div
        ref={ref}
        role={multiple ? 'group' : 'radiogroup'}
        data-selection-type={selectionType}
        data-size={size}
        className={classNames('dyl-segment', className)}
        {...rest}
      >
        {children}
      </div>
    </SegmentProvider>
  )
})

/**
 * Segments display a group of related options that can be toggled on or off.
 */
export const Segment = Object.assign(SegmentRoot, { Item })
