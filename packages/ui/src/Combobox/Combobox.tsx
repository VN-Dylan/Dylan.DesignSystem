import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { useDismiss, useFloating, useInteractions } from '@floating-ui/react'
import { classNames, useControllableState } from '@vn-dylan/utils'
import { Icon, TbIcons } from '@vn-dylan/icons'
import { Portal } from '../_internal/Portal'
import { composeRefs } from '../_internal/composeRefs'
import { floatingAutoUpdate, getFloatingMiddleware } from '../_internal/floatingRuntime'
import { Spinner } from '../Spinner'
import type { ComboboxOption, ComboboxProps } from './types'
import './Combobox.scss'

type Status = 'idle' | 'loading' | 'error'
const NONE: ComboboxOption[] = []

/**
 * Combobox: a text field that searches a list of options — static (`options`)
 * or remote (`loadOptions`, debounced, stale requests aborted) — and picks one
 * value or, with `multiple`, several shown as removable tags in the field.
 * Follows the WAI-ARIA 1.2 combobox pattern.
 */
export const Combobox = forwardRef<HTMLInputElement, ComboboxProps>(function Combobox(props, ref) {
  const {
    options = NONE,
    loadOptions,
    debounce = 300,
    minQueryLength = 0,
    renderOption,
    clearable = true,
    invalid = false,
    emptyMessage = 'No results',
    loadingMessage = 'Loading…',
    errorMessage = 'Could not load options',
    className,
    disabled = false,
    placeholder,
    multiple,
    value: _value,
    defaultValue: _defaultValue,
    onChange: _onChange,
    onKeyDown,
    onFocus,
    onBlur,
    'aria-label': ariaLabel,
    maxTags,
    ...rest
  } = props as ComboboxProps & { maxTags?: number }

  const baseId = useId()
  const listboxId = `${baseId}-listbox`
  const optionId = (i: number) => `${baseId}-option-${i}`
  const inputRef = useRef<HTMLInputElement>(null)

  /* ---------------------------------------------------------------- value */
  const [selection, setSelection] = useControllableState<ComboboxOption[]>({
    value: multiple
      ? (props.value as ComboboxOption[] | undefined)
      : props.value === undefined
        ? undefined
        : props.value
          ? [props.value as ComboboxOption]
          : [],
    defaultValue: multiple
      ? ((props.defaultValue as ComboboxOption[] | undefined) ?? [])
      : props.defaultValue
        ? [props.defaultValue as ComboboxOption]
        : [],
    onChange: (next) => {
      if (multiple) (props.onChange as ((o: ComboboxOption[]) => void) | undefined)?.(next)
      else (props.onChange as ((o: ComboboxOption | null) => void) | undefined)?.(next[0] ?? null)
    },
  })
  const selectedValues = useMemo(() => new Set(selection.map((o) => o.value)), [selection])
  const single = multiple ? undefined : selection[0]

  /* ---------------------------------------------------------------- query */
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [editing, setEditing] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [remote, setRemote] = useState<ComboboxOption[]>(NONE)
  const [status, setStatus] = useState<Status>('idle')
  const [reloadToken, setReloadToken] = useState(0)

  const tooShort = query.trim().length < minQueryLength
  const results = useMemo(() => {
    if (loadOptions) return remote
    const q = query.trim().toLowerCase()
    return q ? options.filter((o) => o.label.toLowerCase().includes(q)) : options
  }, [loadOptions, remote, options, query])

  // Remote search: debounce, abort superseded requests, keep only the latest.
  useEffect(() => {
    if (!loadOptions || !open) return
    if (tooShort) {
      setRemote(NONE)
      setStatus('idle')
      return
    }
    const controller = new AbortController()
    setStatus('loading')
    const timer = setTimeout(() => {
      loadOptions(query.trim(), { signal: controller.signal })
        .then((found) => {
          if (controller.signal.aborted) return
          setRemote(found)
          setStatus('idle')
        })
        .catch(() => {
          if (!controller.signal.aborted) setStatus('error')
        })
    }, debounce)
    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [loadOptions, open, query, tooShort, debounce, reloadToken])

  useEffect(() => setActiveIndex(-1), [results])

  /* ------------------------------------------------------------- floating */
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: (next) => {
      setOpen(next)
      if (!next) closeEditing()
    },
    placement: 'bottom-start',
    whileElementsMounted: floatingAutoUpdate,
    middleware: getFloatingMiddleware(4),
  })
  const dismiss = useDismiss(context)
  const { getFloatingProps } = useInteractions([dismiss])

  /* ------------------------------------------------------------- actions */
  function closeEditing() {
    setEditing(false)
    setQuery('')
  }

  const pick = (option: ComboboxOption) => {
    if (option.disabled) return
    if (multiple) {
      setSelection(
        selectedValues.has(option.value)
          ? selection.filter((o) => o.value !== option.value)
          : [...selection, option],
      )
      setQuery('')
      inputRef.current?.focus()
    } else {
      setSelection([option])
      setOpen(false)
      closeEditing()
    }
  }

  const remove = (option: ComboboxOption) =>
    setSelection(selection.filter((o) => o.value !== option.value))

  const clear = () => {
    setSelection([])
    setQuery('')
    inputRef.current?.focus()
  }

  const moveActive = useCallback(
    (direction: 1 | -1) => {
      if (results.length === 0) return
      let next = activeIndex
      for (let i = 0; i < results.length; i++) {
        next = (next + direction + results.length) % results.length
        if (!results[next]!.disabled) break
      }
      setActiveIndex(next)
    },
    [activeIndex, results],
  )

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(event)
    if (event.defaultPrevented) return
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp':
        event.preventDefault()
        if (!open) setOpen(true)
        else moveActive(event.key === 'ArrowDown' ? 1 : -1)
        break
      case 'Enter':
        if (open && activeIndex >= 0 && results[activeIndex]) {
          event.preventDefault()
          pick(results[activeIndex]!)
        }
        break
      case 'Escape':
        if (open) {
          event.preventDefault()
          setOpen(false)
          closeEditing()
        } else if (query) setQuery('')
        break
      case 'Backspace':
        if (multiple && query === '' && selection.length) remove(selection[selection.length - 1]!)
        break
    }
  }

  /* -------------------------------------------------------------- render */
  const inputValue = multiple || editing ? query : (single?.label ?? '')
  const shownTags = multiple && maxTags != null ? selection.slice(0, maxTags) : selection
  const hiddenTags = multiple ? selection.length - shownTags.length : 0
  const hasValue = selection.length > 0

  let panel: ReactNode
  if (tooShort && loadOptions) {
    panel = (
      <div className="dyl-combobox__status">
        Type at least {minQueryLength} character{minQueryLength === 1 ? '' : 's'}
      </div>
    )
  } else if (status === 'loading' && results.length === 0) {
    panel = (
      <div className="dyl-combobox__status">
        <Spinner size={14} /> {loadingMessage}
      </div>
    )
  } else if (status === 'error') {
    panel = (
      <div className="dyl-combobox__status" data-tone="error">
        {errorMessage}
        <button
          type="button"
          className="dyl-combobox__retry"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => setReloadToken((t) => t + 1)}
        >
          Retry
        </button>
      </div>
    )
  } else if (results.length === 0) {
    panel = <div className="dyl-combobox__status">{emptyMessage}</div>
  }

  return (
    <div
      ref={refs.setReference}
      className={classNames('dyl-combobox', className)}
      data-multiple={multiple || undefined}
      data-disabled={disabled || undefined}
      data-invalid={invalid || undefined}
      data-open={open || undefined}
      onMouseDown={(e) => {
        if (e.target !== inputRef.current && !disabled) {
          e.preventDefault()
          inputRef.current?.focus()
          setOpen(true)
        }
      }}
    >
      {multiple &&
        shownTags.map((option) => (
          <span key={option.value} className="dyl-combobox__tag">
            <span className="dyl-combobox__tag-label">{option.label}</span>
            <button
              type="button"
              tabIndex={-1}
              className="dyl-combobox__tag-remove"
              aria-label={`Remove ${option.label}`}
              disabled={disabled}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={() => remove(option)}
            >
              <Icon as={TbIcons.TbX} size={12} aria-hidden />
            </button>
          </span>
        ))}
      {hiddenTags > 0 && <span className="dyl-combobox__more">+{hiddenTags}</span>}

      <input
        {...rest}
        ref={composeRefs(ref, inputRef)}
        type="text"
        role="combobox"
        aria-label={ariaLabel}
        aria-autocomplete="list"
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        aria-activedescendant={open && activeIndex >= 0 ? optionId(activeIndex) : undefined}
        aria-invalid={invalid || undefined}
        aria-busy={status === 'loading' || undefined}
        autoComplete="off"
        disabled={disabled}
        placeholder={multiple && hasValue ? undefined : placeholder}
        className="dyl-combobox__input"
        value={inputValue}
        onChange={(e) => {
          setQuery(e.target.value)
          setEditing(true)
          setOpen(true)
        }}
        onFocus={(e) => {
          onFocus?.(e)
          setOpen(true)
        }}
        onBlur={(e) => {
          onBlur?.(e)
          if (!refs.floating.current?.contains(e.relatedTarget as Node | null)) {
            setOpen(false)
            closeEditing()
          }
        }}
        onKeyDown={handleKeyDown}
      />

      {status === 'loading' && results.length > 0 && (
        <Spinner size={14} className="dyl-combobox__spinner" />
      )}
      {clearable && hasValue && !disabled && (
        <button
          type="button"
          tabIndex={-1}
          className="dyl-combobox__clear"
          aria-label="Clear selection"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={clear}
        >
          <Icon as={TbIcons.TbX} size={14} aria-hidden />
        </button>
      )}
      <Icon as={TbIcons.TbSelector} size={16} className="dyl-combobox__caret" aria-hidden />

      {open && (
        <Portal>
          <div
            ref={refs.setFloating}
            className="dyl-combobox__menu"
            style={{
              ...floatingStyles,
              minWidth: refs.reference.current
                ? (refs.reference.current as HTMLElement).getBoundingClientRect().width
                : undefined,
            }}
            {...getFloatingProps()}
          >
            <ul
              id={listboxId}
              role="listbox"
              aria-label={ariaLabel}
              aria-multiselectable={multiple || undefined}
              className="dyl-combobox__list"
            >
              {!tooShort &&
                status !== 'error' &&
                results.map((option, index) => {
                  const selected = selectedValues.has(option.value)
                  return (
                    <li
                      key={option.value}
                      id={optionId(index)}
                      role="option"
                      aria-selected={selected}
                      aria-disabled={option.disabled || undefined}
                      data-active={index === activeIndex || undefined}
                      className="dyl-combobox__option"
                      onMouseEnter={() => setActiveIndex(index)}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => pick(option)}
                    >
                      {renderOption ? (
                        renderOption(option, { selected })
                      ) : (
                        <span className="dyl-combobox__option-text">
                          <span>{option.label}</span>
                          {option.description && (
                            <span className="dyl-combobox__option-desc">{option.description}</span>
                          )}
                        </span>
                      )}
                      {selected && (
                        <Icon
                          as={TbIcons.TbCheck}
                          size={16}
                          className="dyl-combobox__check"
                          aria-hidden
                        />
                      )}
                    </li>
                  )
                })}
            </ul>
            {panel}
          </div>
        </Portal>
      )}
      <span className="dyl-combobox__live" aria-live="polite">
        {open && status === 'idle' && !tooShort ? `${results.length} results` : ''}
      </span>
    </div>
  )
})
