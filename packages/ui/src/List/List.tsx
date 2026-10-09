import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type DragEvent,
  type ForwardedRef,
  type KeyboardEvent,
  type ReactElement,
  type Ref,
} from 'react'
import { classNames, useControllableState } from '@vn-dylan/utils'
import { Icon, TbIcons } from '@vn-dylan/icons'
import { composeRefs } from '../_internal/composeRefs'
import type { ListItemProps, ListProps } from './types'
import './List.scss'

const EMPTY: string[] = []

const moveItem = <T,>(items: T[], from: number, to: number) => {
  const next = items.slice()
  const [moved] = next.splice(from, 1)
  next.splice(to, 0, moved as T)
  return next
}

function ListInner<T>(
  {
    items,
    getKey,
    renderItem,
    selectionMode = 'none',
    selectedKeys,
    defaultSelectedKeys = EMPTY,
    onSelectionChange,
    disabledKeys = EMPTY,
    sortable = false,
    onReorder,
    virtual,
    divided = true,
    bordered = false,
    loading = false,
    loadingRows = 3,
    emptyMessage = 'No items',
    className,
    style,
    onKeyDown,
    ...rest
  }: ListProps<T>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const baseId = useId()
  const viewportRef = useRef<HTMLDivElement>(null)
  const selectable = selectionMode !== 'none'
  const interactive = selectable || sortable
  const keys = useMemo(() => items.map(getKey), [items, getKey])
  const disabled = useMemo(() => new Set(disabledKeys), [disabledKeys])
  const optionId = (key: string) => `${baseId}-option-${key}`

  const [selection, setSelection] = useControllableState<string[]>({
    value: selectedKeys,
    defaultValue: defaultSelectedKeys,
    onChange: onSelectionChange,
  })
  const selectedSet = useMemo(() => new Set(selection), [selection])

  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [announcement, setAnnouncement] = useState('')
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [drop, setDrop] = useState<{ index: number; edge: 'before' | 'after' } | null>(null)
  const [scrollTop, setScrollTop] = useState(0)

  // Keep the active row valid when items change.
  useEffect(() => {
    if (activeIndex != null && activeIndex >= items.length) {
      setActiveIndex(items.length ? items.length - 1 : null)
    }
  }, [activeIndex, items.length])

  /* ------------------------------------------------------------ selection */
  const toggle = useCallback(
    (key: string) => {
      if (!selectable || disabled.has(key)) return
      if (selectionMode === 'single') setSelection([key])
      else
        setSelection(
          selectedSet.has(key) ? selection.filter((k) => k !== key) : [...selection, key],
        )
    },
    [disabled, selectable, selection, selectedSet, selectionMode, setSelection],
  )

  /* ----------------------------------------------------------- navigation */
  const step = (from: number, delta: number) => {
    let index = from
    for (let i = 0; i < items.length; i++) {
      index = Math.min(items.length - 1, Math.max(0, index + delta))
      if (!disabled.has(keys[index]!)) return index
      if (index === 0 || index === items.length - 1) break
    }
    return from
  }
  const firstEnabled = () => keys.findIndex((k) => !disabled.has(k))
  const lastEnabled = () => {
    for (let i = keys.length - 1; i >= 0; i--) if (!disabled.has(keys[i]!)) return i
    return -1
  }

  const reorder = (from: number, to: number) => {
    if (from === to || to < 0 || to >= items.length) return
    onReorder?.(moveItem(items, from, to), { from, to })
    setActiveIndex(to)
    setAnnouncement(`Moved to position ${to + 1} of ${items.length}`)
  }

  const pageSize = virtual ? Math.max(1, Math.floor(viewportHeight() / virtual.itemHeight)) : 10
  function viewportHeight() {
    return viewportRef.current?.clientHeight ?? 0
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event)
    if (!interactive || event.defaultPrevented || items.length === 0) return
    const current = activeIndex ?? -1
    const key = activeIndex != null ? keys[activeIndex] : undefined

    if (sortable && event.altKey && (event.key === 'ArrowUp' || event.key === 'ArrowDown')) {
      event.preventDefault()
      if (activeIndex != null)
        reorder(activeIndex, activeIndex + (event.key === 'ArrowUp' ? -1 : 1))
      return
    }

    const moves: Record<string, () => number> = {
      ArrowDown: () => (current < 0 ? firstEnabled() : step(current, 1)),
      ArrowUp: () => (current < 0 ? lastEnabled() : step(current, -1)),
      Home: firstEnabled,
      End: lastEnabled,
      PageDown: () => step(Math.max(current, 0), pageSize),
      PageUp: () => step(Math.max(current, 0), -pageSize),
    }
    const move = moves[event.key]
    if (move) {
      event.preventDefault()
      const next = move()
      if (next >= 0) setActiveIndex(next)
      return
    }
    if ((event.key === ' ' || event.key === 'Enter') && key != null && selectable) {
      event.preventDefault()
      toggle(key)
      return
    }
    if (
      event.key.toLowerCase() === 'a' &&
      (event.ctrlKey || event.metaKey) &&
      selectionMode === 'multiple'
    ) {
      event.preventDefault()
      setSelection(keys.filter((k) => !disabled.has(k)))
    }
  }

  /* -------------------------------------------------------- virtualizing */
  const overscan = virtual?.overscan ?? 4
  const viewportPx = viewportHeight()
  const range = virtual
    ? {
        start: Math.max(0, Math.floor(scrollTop / virtual.itemHeight) - overscan),
        end: Math.min(
          items.length,
          Math.ceil((scrollTop + (viewportPx || virtual.itemHeight * 10)) / virtual.itemHeight) +
            overscan,
        ),
      }
    : { start: 0, end: items.length }

  // Keep the keyboard-active row in view.
  useEffect(() => {
    if (activeIndex == null) return
    const viewport = viewportRef.current
    if (!viewport) return
    if (virtual) {
      const top = activeIndex * virtual.itemHeight
      if (top < viewport.scrollTop) viewport.scrollTop = top
      else if (top + virtual.itemHeight > viewport.scrollTop + viewport.clientHeight)
        viewport.scrollTop = top + virtual.itemHeight - viewport.clientHeight
      setScrollTop(viewport.scrollTop)
      return
    }
    const node = document.getElementById(optionId(keys[activeIndex]!))
    node?.scrollIntoView?.({ block: 'nearest' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex])

  /* -------------------------------------------------------- drag & drop */
  const dragHandlers = (index: number) =>
    sortable
      ? {
          draggable: true,
          onDragStart: (e: DragEvent<HTMLDivElement>) => {
            e.dataTransfer.effectAllowed = 'move'
            e.dataTransfer.setData('text/plain', keys[index]!)
            setDragIndex(index)
          },
          onDragOver: (e: DragEvent<HTMLDivElement>) => {
            if (dragIndex == null) return
            e.preventDefault()
            e.dataTransfer.dropEffect = 'move'
            const rect = e.currentTarget.getBoundingClientRect()
            const edge = e.clientY - rect.top > rect.height / 2 ? 'after' : 'before'
            if (drop?.index !== index || drop.edge !== edge) setDrop({ index, edge })
          },
          onDrop: (e: DragEvent<HTMLDivElement>) => {
            e.preventDefault()
            if (dragIndex != null && drop) {
              let to = drop.edge === 'after' ? drop.index + 1 : drop.index
              if (dragIndex < to) to -= 1
              reorder(dragIndex, to)
            }
            setDragIndex(null)
            setDrop(null)
          },
          onDragEnd: () => {
            setDragIndex(null)
            setDrop(null)
          },
        }
      : {}

  /* -------------------------------------------------------------- render */
  const activeKey = activeIndex != null ? keys[activeIndex] : undefined
  const rowStyle: CSSProperties | undefined = virtual ? { height: virtual.itemHeight } : undefined

  const rows = []
  for (let index = range.start; index < range.end; index++) {
    const item = items[index] as T
    const key = keys[index]!
    const isSelected = selectable && selectedSet.has(key)
    const isDisabled = disabled.has(key)
    rows.push(
      <div
        key={key}
        id={optionId(key)}
        role={interactive ? 'option' : 'listitem'}
        aria-selected={selectable ? isSelected : undefined}
        aria-disabled={isDisabled || undefined}
        aria-setsize={virtual ? items.length : undefined}
        aria-posinset={virtual ? index + 1 : undefined}
        data-active={(interactive && activeIndex === index) || undefined}
        data-selected={isSelected || undefined}
        data-dragging={dragIndex === index || undefined}
        data-drop={drop?.index === index ? drop.edge : undefined}
        className="dyl-list__row"
        style={rowStyle}
        onClick={() => {
          if (!interactive || isDisabled) return
          setActiveIndex(index)
          toggle(key)
        }}
        {...dragHandlers(index)}
      >
        {sortable && <span className="dyl-list__handle" aria-hidden />}
        {selectionMode === 'multiple' && (
          <span className="dyl-list__check" data-checked={isSelected || undefined} aria-hidden>
            {isSelected && <Icon as={TbIcons.TbCheck} size={12} />}
          </span>
        )}
        <div className="dyl-list__row-content">
          {renderItem(item, {
            selected: isSelected,
            active: activeIndex === index,
            dragging: dragIndex === index,
            index,
          })}
        </div>
      </div>,
    )
  }

  const body = loading ? (
    Array.from({ length: loadingRows }, (_, i) => (
      <div key={i} className="dyl-list__row dyl-list__skeleton" aria-hidden>
        <span className="dyl-list__skeleton-avatar" />
        <span className="dyl-list__skeleton-lines">
          <span />
          <span />
        </span>
      </div>
    ))
  ) : items.length === 0 ? (
    <div className="dyl-list__empty">{emptyMessage}</div>
  ) : virtual ? (
    <div
      role="presentation"
      style={{
        paddingTop: range.start * virtual.itemHeight,
        paddingBottom: (items.length - range.end) * virtual.itemHeight,
      }}
    >
      {rows}
    </div>
  ) : (
    rows
  )

  return (
    <div
      ref={composeRefs(viewportRef, ref)}
      role={interactive ? 'listbox' : 'list'}
      aria-multiselectable={selectionMode === 'multiple' || undefined}
      aria-activedescendant={activeKey ? optionId(activeKey) : undefined}
      aria-busy={loading || undefined}
      tabIndex={interactive ? 0 : undefined}
      data-divided={divided || undefined}
      data-bordered={bordered || undefined}
      data-interactive={interactive || undefined}
      data-virtual={virtual ? true : undefined}
      className={classNames('dyl-list', className)}
      style={virtual ? { ...style, height: virtual.height } : style}
      onKeyDown={handleKeyDown}
      onFocus={() => {
        if (interactive && activeIndex == null) {
          const first = selection.length ? keys.indexOf(selection[0]!) : firstEnabled()
          if (first >= 0) setActiveIndex(first)
        }
      }}
      onScroll={virtual ? (e) => setScrollTop(e.currentTarget.scrollTop) : undefined}
      {...rest}
    >
      {body}
      {sortable && (
        <span className="dyl-list__live" aria-live="polite">
          {announcement}
        </span>
      )}
    </div>
  )
}

const ListRoot = forwardRef(ListInner) as <T>(
  props: ListProps<T> & { ref?: Ref<HTMLDivElement> },
) => ReactElement | null

const Item = forwardRef<HTMLDivElement, ListItemProps>(function ListItem(
  { prefix, title, description, meta, actions, className, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={classNames('dyl-list-item', className)} {...rest}>
      {prefix != null && <div className="dyl-list-item__prefix">{prefix}</div>}
      <div className="dyl-list-item__body">
        <div className="dyl-list-item__title">{title}</div>
        {description != null && <div className="dyl-list-item__description">{description}</div>}
      </div>
      {meta != null && <div className="dyl-list-item__meta">{meta}</div>}
      {actions != null && (
        // Keep row selection from firing when an action is used.
        <div className="dyl-list-item__actions" onClick={(e) => e.stopPropagation()}>
          {actions}
        </div>
      )}
    </div>
  )
})

/**
 * List renders a vertical collection of rows. Plain by default; turns into a
 * keyboard-navigable listbox with `selectionMode`, reorders with `sortable`
 * (drag or Alt + ↑/↓) and windows large data sets with `virtual`.
 * Compose rows with `List.Item`.
 */
export const List = Object.assign(ListRoot, { Item })
