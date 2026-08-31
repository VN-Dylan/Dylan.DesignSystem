import { forwardRef, useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { classNames, useControllableState } from '@dylan-ds/utils'
import type { SelectMultiProps, SelectOption, SelectProps } from './types'
import './Select.scss'

interface InternalProps {
  multiple: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValue?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (next: any) => void
  options: SelectOption[]
  size?: SelectProps['size']
  placeholder?: string
  disabled?: boolean
  invalid?: boolean
  isSearchable?: boolean
  isClearable?: boolean
  isLoading?: boolean
  noOptionsMessage?: React.ReactNode
  className?: string
  id?: string
  'aria-label'?: string
}

const asArray = (v: unknown): SelectOption[] =>
  Array.isArray(v) ? v : v ? [v as SelectOption] : []

const SelectBase = forwardRef<HTMLDivElement, InternalProps>(function SelectBase(
  {
    multiple,
    value,
    defaultValue,
    onChange,
    options,
    size = 'md',
    placeholder = 'Select…',
    disabled = false,
    invalid = false,
    isSearchable = false,
    isClearable = true,
    isLoading = false,
    noOptionsMessage = 'No options',
    className,
    id,
    'aria-label': ariaLabel,
  },
  ref,
) {
  const reactId = useId()
  const listboxId = `${id ?? reactId}-listbox`

  const [selected, setSelected] = useControllableState<SelectOption | SelectOption[] | null>({
    value,
    defaultValue: defaultValue ?? (multiple ? [] : null),
    onChange,
  })

  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)

  const rootRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  const selectedList = asArray(selected)
  const selectedValues = new Set(selectedList.map((o) => o.value))

  const filtered = useMemo(() => {
    if (!query) return options
    const q = query.toLowerCase()
    return options.filter((o) => o.label.toLowerCase().includes(q))
  }, [options, query])

  useEffect(() => {
    if (!open) return
    const onDocClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [open])

  useEffect(() => {
    if (open && isSearchable) searchRef.current?.focus()
    if (!open) setQuery('')
  }, [open, isSearchable])

  const commit = (option: SelectOption) => {
    if (option.disabled) return
    if (multiple) {
      const current = selectedList
      const next = selectedValues.has(option.value)
        ? current.filter((o) => o.value !== option.value)
        : [...current, option]
      setSelected(next)
    } else {
      setSelected(option)
      setOpen(false)
    }
  }

  const clear = () => setSelected(multiple ? [] : null)

  const onKeyDown = (e: KeyboardEvent) => {
    if (disabled) return
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      if (!open) {
        setOpen(true)
        return
      }
      setActiveIndex((i) => {
        const dir = e.key === 'ArrowDown' ? 1 : -1
        const len = filtered.length
        if (len === 0) return 0
        return (i + dir + len) % len
      })
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (open && filtered[activeIndex]) commit(filtered[activeIndex]!)
      else setOpen(true)
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  const triggerLabel =
    selectedList.length === 0
      ? placeholder
      : multiple
        ? `${selectedList.length} selected`
        : selectedList[0]!.label

  return (
    <div
      ref={ref ?? rootRef}
      className={classNames('dyl-select', className)}
      data-size={size}
      data-open={open || undefined}
      data-invalid={invalid || undefined}
      data-disabled={disabled || undefined}
    >
      <button
        type="button"
        className="dyl-select__trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        aria-label={ariaLabel}
        aria-invalid={invalid || undefined}
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onKeyDown}
      >
        <span
          className={classNames(
            'dyl-select__value',
            selectedList.length === 0 && 'dyl-select__value--placeholder',
          )}
        >
          {triggerLabel}
        </span>
        {isClearable && selectedList.length > 0 && !disabled && (
          <span
            role="button"
            tabIndex={-1}
            aria-label="Clear selection"
            className="dyl-select__clear"
            onClick={(e) => {
              e.stopPropagation()
              clear()
            }}
          >
            ×
          </span>
        )}
        <span className="dyl-select__caret" aria-hidden>
          ▾
        </span>
      </button>

      {open && (
        <div className="dyl-select__menu">
          {isSearchable && (
            <input
              ref={searchRef}
              className="dyl-select__search"
              placeholder="Search…"
              aria-label="Filter options"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setActiveIndex(0)
              }}
              onKeyDown={onKeyDown}
            />
          )}
          <ul
            id={listboxId}
            role="listbox"
            aria-label={ariaLabel ?? placeholder}
            aria-multiselectable={multiple}
            className="dyl-select__list"
          >
            {isLoading ? (
              <li className="dyl-select__empty">Loading…</li>
            ) : filtered.length === 0 ? (
              <li className="dyl-select__empty">{noOptionsMessage}</li>
            ) : (
              filtered.map((option, index) => {
                const isSelected = selectedValues.has(option.value)
                return (
                  <li
                    key={option.value}
                    role="option"
                    aria-selected={isSelected}
                    aria-disabled={option.disabled || undefined}
                    className="dyl-select__option"
                    data-active={index === activeIndex || undefined}
                    data-selected={isSelected || undefined}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => commit(option)}
                  >
                    {multiple && (
                      <span className="dyl-select__checkbox" aria-hidden>
                        {isSelected ? '✓' : ''}
                      </span>
                    )}
                    {option.label}
                  </li>
                )
              })
            )}
          </ul>
        </div>
      )}
    </div>
  )
})

/** Single-select combobox. */
export const Select = forwardRef<HTMLDivElement, SelectProps>(function Select(props, ref) {
  return <SelectBase ref={ref} multiple={false} {...props} />
}) as React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLDivElement>> & {
  Multi: React.ForwardRefExoticComponent<SelectMultiProps & React.RefAttributes<HTMLDivElement>>
}

/** Multi-select combobox. */
Select.Multi = forwardRef<HTMLDivElement, SelectMultiProps>(function SelectMulti(props, ref) {
  return <SelectBase ref={ref} multiple {...props} />
})
