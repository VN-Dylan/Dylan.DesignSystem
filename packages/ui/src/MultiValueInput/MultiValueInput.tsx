import { forwardRef, useRef, useState, type KeyboardEvent } from 'react'
import { classNames, useControllableState } from '@vn-dylan/utils'
import { TbIcons } from '@vn-dylan/icons'
import type { MultiValueInputProps } from './types'
import './MultiValueInput.scss'

/**
 * MultiValueInput lets users commit several text values as removable tags.
 */
export const MultiValueInput = forwardRef<HTMLDivElement, MultiValueInputProps>(
  function MultiValueInput(
    {
      value,
      defaultValue = [],
      onChange,
      placeholder,
      disabled = false,
      maxTags,
      validate,
      onTagAdd,
      onTagRemove,
      invalid = false,
      size = 'md',
      readOnly = false,
      className,
      onClick,
      ...rest
    },
    ref,
  ) {
    const [tags, setTags] = useControllableState<string[]>({ value, defaultValue, onChange })
    const [inputValue, setInputValue] = useState('')
    const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const canEdit = !disabled && !readOnly
    const atLimit = maxTags !== undefined && tags.length >= maxTags

    const addTag = (raw: string) => {
      const nextTag = raw.trim()
      if (!nextTag || !canEdit || atLimit) return
      if (validate && !validate(nextTag)) return

      const next = [...tags, nextTag]
      setTags(next)
      setInputValue('')
      setActiveTagIndex(null)
      onTagAdd?.(nextTag, next)
    }

    const removeTag = (index: number) => {
      if (!canEdit) return
      const removed = tags[index]
      if (removed === undefined) return

      const next = tags.filter((_, tagIndex) => tagIndex !== index)
      setTags(next)
      setActiveTagIndex(next.length === 0 ? null : Math.min(index, next.length - 1))
      onTagRemove?.(removed, next)
    }

    const onInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter' || event.key === ',') {
        event.preventDefault()
        addTag(inputValue)
        return
      }

      if (event.key === 'Backspace' && inputValue === '' && tags.length > 0) {
        event.preventDefault()
        removeTag(tags.length - 1)
        return
      }

      if (event.key === 'ArrowLeft' && inputValue === '' && tags.length > 0) {
        event.preventDefault()
        setActiveTagIndex(tags.length - 1)
      }
    }

    const onTagKeyDown = (event: KeyboardEvent<HTMLSpanElement>, index: number) => {
      if (event.key === 'Backspace' || event.key === 'Delete') {
        event.preventDefault()
        removeTag(index)
        return
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        setActiveTagIndex(index === 0 ? tags.length - 1 : index - 1)
        return
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault()
        if (index === tags.length - 1) {
          setActiveTagIndex(null)
          inputRef.current?.focus()
        } else {
          setActiveTagIndex(index + 1)
        }
      }
    }

    return (
      <div
        ref={ref}
        data-size={size}
        data-invalid={invalid || undefined}
        data-disabled={disabled || undefined}
        data-readonly={readOnly || undefined}
        className={classNames('dyl-multi-value-input', className)}
        onClick={(event) => {
          inputRef.current?.focus()
          onClick?.(event)
        }}
        {...rest}
      >
        {tags.map((tag, index) => (
          <span
            key={`${tag}-${index}`}
            data-active={activeTagIndex === index || undefined}
            className="dyl-multi-value-input__tag"
          >
            <span
              className="dyl-multi-value-input__tag-label"
              tabIndex={canEdit ? 0 : undefined}
              onFocus={() => setActiveTagIndex(index)}
              onKeyDown={(event) => onTagKeyDown(event, index)}
            >
              {tag}
            </span>
            {canEdit && (
              <button
                type="button"
                className="dyl-multi-value-input__remove"
                aria-label={`Remove ${tag}`}
                onClick={(event) => {
                  event.stopPropagation()
                  removeTag(index)
                }}
              >
                <TbIcons.TbX aria-hidden />
              </button>
            )}
          </span>
        ))}
        <input
          ref={inputRef}
          className="dyl-multi-value-input__field"
          value={inputValue}
          placeholder={tags.length === 0 ? placeholder : undefined}
          disabled={disabled}
          readOnly={readOnly || atLimit}
          aria-invalid={invalid || undefined}
          aria-label={placeholder ?? 'Add value'}
          onFocus={() => setActiveTagIndex(null)}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={onInputKeyDown}
        />
      </div>
    )
  },
)
