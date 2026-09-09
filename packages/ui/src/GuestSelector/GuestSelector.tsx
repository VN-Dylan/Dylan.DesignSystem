import { forwardRef, useId, useMemo, useState } from 'react'
import { Icon, TbIcons } from '@vn-dylan/icons'
import { classNames, useControllableState } from '@vn-dylan/utils'
import { Button } from '../Button'
import { NumericInputStepper } from '../NumericInputStepper'
import { Popover } from '../Popover'
import type { GuestCategory, GuestCounts, GuestSelectorProps } from './types'
import './GuestSelector.scss'

const DEFAULT_MAX = 16

const DEFAULT_CATEGORIES: GuestCategory[] = [
  { key: 'adults', label: 'Adults', min: 1 },
  { key: 'children', label: 'Children', description: 'Ages 2–12' },
  { key: 'infants', label: 'Infants', description: 'Under 2' },
  { key: 'rooms', label: 'Rooms', min: 1 },
]

const getMin = (category: GuestCategory) => category.min ?? 0
const getMax = (category: GuestCategory) => category.max ?? DEFAULT_MAX

const normalizeCounts = (counts: GuestCounts | undefined, categories: GuestCategory[]) =>
  categories.reduce<GuestCounts>((next, category) => {
    const min = getMin(category)
    const max = getMax(category)
    const value = counts?.[category.key] ?? min
    next[category.key] = Math.min(Math.max(value, min), max)
    return next
  }, {})

const plural = (count: number, singular: string) => `${count} ${singular}${count === 1 ? '' : 's'}`

const formatLabel = (category: GuestCategory, count: number) =>
  plural(count, category.label.toLowerCase().replace(/s$/, ''))

const defaultSummary = (value: GuestCounts, categories: GuestCategory[]) => {
  const parts: string[] = []
  const knownKeys = new Set(['adults', 'children', 'infants', 'rooms'])
  const guestCount = (value.adults ?? 0) + (value.children ?? 0)
  const infantCount = value.infants ?? 0
  const roomCount = value.rooms ?? 0

  if (guestCount > 0) parts.push(plural(guestCount, 'guest'))
  if (infantCount > 0) parts.push(plural(infantCount, 'infant'))
  if (roomCount > 0) parts.push(plural(roomCount, 'room'))

  for (const category of categories) {
    const count = value[category.key] ?? 0
    if (!knownKeys.has(category.key) && count > 0) parts.push(formatLabel(category, count))
  }

  return parts.join(' · ')
}

/**
 * GuestSelector edits guest counts by category from an anchored popover.
 */
export const GuestSelector = forwardRef<HTMLDivElement, GuestSelectorProps>(function GuestSelector(
  {
    categories = DEFAULT_CATEGORIES,
    value,
    defaultValue,
    onChange,
    totalMax,
    renderSummary,
    placeholder = 'Add guests',
    disabled = false,
    placement = 'bottom-start',
    className,
    ...rest
  },
  ref,
) {
  const labelId = useId()
  const [open, setOpen] = useState(false)
  const normalizedDefault = useMemo(
    () => normalizeCounts(defaultValue, categories),
    [categories, defaultValue],
  )
  const [rawCounts, setRawCounts] = useControllableState<GuestCounts>({
    value,
    defaultValue: normalizedDefault,
    onChange,
  })
  const counts = useMemo(() => normalizeCounts(rawCounts, categories), [categories, rawCounts])
  const total = categories.reduce((sum, category) => sum + (counts[category.key] ?? 0), 0)
  const atMinimum = categories.every((category) => counts[category.key] === getMin(category))
  const summary = atMinimum
    ? placeholder
    : (renderSummary?.(counts, categories) ?? defaultSummary(counts, categories))

  const updateCount = (category: GuestCategory, nextValue: number) => {
    const current = counts[category.key] ?? getMin(category)
    const min = getMin(category)
    const max = getMax(category)
    const requested = Math.min(Math.max(nextValue, min), max)
    const availableIncrease =
      totalMax == null || requested <= current ? requested : current + Math.max(totalMax - total, 0)
    const next = Math.min(requested, availableIncrease)

    setRawCounts({
      ...counts,
      [category.key]: next,
    })
  }

  return (
    <div
      ref={ref}
      className={classNames('dyl-guest-selector', className)}
      data-disabled={disabled || undefined}
      {...rest}
    >
      <Popover
        open={open}
        onOpenChange={setOpen}
        placement={placement}
        trigger="click"
        title="Guest selector"
        className="dyl-guest-selector__popover"
        renderTrigger={
          <button
            type="button"
            className="dyl-guest-selector__trigger"
            disabled={disabled}
            data-disabled={disabled || undefined}
          >
            <span className="dyl-guest-selector__summary">{summary}</span>
            <Icon as={TbIcons.TbChevronDown} className="dyl-guest-selector__chevron" aria-hidden />
          </button>
        }
      >
        <div className="dyl-guest-selector__panel" aria-labelledby={labelId}>
          <h2 id={labelId} className="dyl-guest-selector__title">
            Guests
          </h2>
          <div className="dyl-guest-selector__rows">
            {categories.map((category) => {
              const rowLabelId = `${labelId}-${category.key}`
              const valueForCategory = counts[category.key] ?? getMin(category)
              const remaining = totalMax == null ? Infinity : Math.max(totalMax - total, 0)
              const effectiveMax = Math.min(
                getMax(category),
                valueForCategory + (remaining === Infinity ? DEFAULT_MAX : remaining),
              )

              return (
                <div
                  key={category.key}
                  className="dyl-guest-selector__row"
                  role="group"
                  aria-labelledby={rowLabelId}
                >
                  <div className="dyl-guest-selector__row-text">
                    <span id={rowLabelId} className="dyl-guest-selector__label">
                      {category.label}
                    </span>
                    {category.description && (
                      <span className="dyl-guest-selector__description">
                        {category.description}
                      </span>
                    )}
                  </div>
                  <div className="dyl-guest-selector__control">
                    <span className="dyl-guest-selector__count" aria-live="polite">
                      {valueForCategory}
                    </span>
                    <NumericInputStepper
                      value={valueForCategory}
                      min={getMin(category)}
                      max={effectiveMax}
                      onChange={(next) => updateCount(category, next)}
                      disabled={disabled}
                      aria-label={`${category.label} controls`}
                    />
                  </div>
                </div>
              )
            })}
          </div>
          <div className="dyl-guest-selector__actions">
            <Button variant="solid" size="sm" onClick={() => setOpen(false)}>
              Done
            </Button>
          </div>
        </div>
      </Popover>
    </div>
  )
})
