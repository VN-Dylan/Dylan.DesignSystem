import { forwardRef, useId, useMemo, useState, type KeyboardEvent, type ReactElement } from 'react'
import { useDismiss, useFloating, useInteractions } from '@floating-ui/react'
import { classNames, useControllableState } from '@vn-dylan/utils'
import { Portal } from '../_internal/Portal'
import { composeRefs } from '../_internal/composeRefs'
import { floatingAutoUpdate, getFloatingMiddleware } from '../_internal/floatingRuntime'
import { Input } from '../Input'
import type { AutoCompleteProps } from './types'
import './AutoComplete.scss'

function AutoCompleteInner<T>(
  {
    data = [],
    optionKey,
    value,
    defaultValue,
    onInputChange,
    onOptionSelected,
    renderOption,
    className,
    placeholder,
    disabled = false,
    onFocus,
    onKeyDown,
    ...rest
  }: AutoCompleteProps<T>,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const baseId = useId()
  const [inputValue, setInputValue] = useControllableState({
    value,
    defaultValue: defaultValue ?? '',
    onChange: onInputChange,
  })
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)

  const filtered = useMemo(() => {
    const query = inputValue.trim().toLowerCase()
    if (!query) return data
    return data.filter((option) => optionKey(option).toLowerCase().includes(query))
  }, [data, inputValue, optionKey])

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: 'bottom-start',
    whileElementsMounted: floatingAutoUpdate,
    middleware: getFloatingMiddleware(4),
  })
  const dismiss = useDismiss(context)
  const { getFloatingProps } = useInteractions([dismiss])

  const hasOptions = filtered.length > 0
  const listboxId = `${baseId}-listbox`
  const activeOptionId = hasOptions ? `${baseId}-option-${activeIndex}` : undefined
  const resolvedClassName =
    typeof className === 'function' ? className({ open: open && hasOptions }) : className

  const commit = (option: T) => {
    setInputValue(optionKey(option))
    onOptionSelected?.(option)
    setOpen(false)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      setOpen(true)
      setActiveIndex((current) => {
        if (filtered.length === 0) return -1
        const direction = event.key === 'ArrowDown' ? 1 : -1
        const next = current + direction
        return ((next % filtered.length) + filtered.length) % filtered.length
      })
    } else if (event.key === 'Enter' && open && activeIndex >= 0 && filtered[activeIndex]) {
      event.preventDefault()
      commit(filtered[activeIndex]!)
    } else if (event.key === 'Escape') {
      setOpen(false)
    }
    onKeyDown?.(event)
  }

  return (
    <div className="dyl-autocomplete">
      <Input
        {...rest}
        ref={composeRefs(ref, refs.setReference)}
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={open && hasOptions}
        aria-controls={open && hasOptions ? listboxId : undefined}
        aria-activedescendant={open ? activeOptionId : undefined}
        disabled={disabled}
        placeholder={placeholder}
        value={inputValue}
        className={classNames('dyl-autocomplete__input', resolvedClassName)}
        onFocus={(event) => {
          setOpen(true)
          onFocus?.(event)
        }}
        onChange={(event) => {
          setInputValue(event.currentTarget.value)
          setActiveIndex(-1)
          setOpen(true)
        }}
        onKeyDown={handleKeyDown}
      />
      {open && hasOptions && (
        <Portal>
          <div
            ref={refs.setFloating}
            className="dyl-autocomplete__menu"
            style={floatingStyles}
            {...getFloatingProps()}
          >
            <ul id={listboxId} role="listbox" className="dyl-autocomplete__list">
              {filtered.map((option, index) => (
                <li
                  id={`${baseId}-option-${index}`}
                  key={`${optionKey(option)}-${index}`}
                  role="option"
                  aria-selected={index === activeIndex}
                  className="dyl-autocomplete__option"
                  data-active={index === activeIndex || undefined}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => commit(option)}
                >
                  {renderOption ? renderOption(option) : optionKey(option)}
                </li>
              ))}
            </ul>
          </div>
        </Portal>
      )}
    </div>
  )
}

/**
 * AutoComplete filters suggestions as the user types and commits an option
 * back into the input when selected.
 */
export const AutoComplete = forwardRef(AutoCompleteInner) as <T>(
  props: AutoCompleteProps<T> & React.RefAttributes<HTMLInputElement>,
) => ReactElement
