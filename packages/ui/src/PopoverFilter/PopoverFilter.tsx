import { useMemo, useState } from 'react'
import { TbIcons } from '@vn-dylan/icons'
import { classNames, useControllableState } from '@vn-dylan/utils'
import { Popover } from '../Popover'
import { Checkbox } from '../Checkbox'
import { Input } from '../Input'
import { Button } from '../Button'
import type { PopoverFilterProps } from './types'
import './PopoverFilter.scss'

/**
 * A popover with a searchable checkbox list — the standard column/list filter.
 */
export function PopoverFilter({
  data,
  value,
  defaultValue = [],
  onChange,
  title = 'Filter',
  placement = 'bottom-start',
  inputPlaceholder = 'Search…',
  showReset = true,
  width = 240,
  renderTrigger,
}: PopoverFilterProps) {
  const [selected, setSelected] = useControllableState<string[]>({
    value,
    defaultValue,
    onChange,
  })
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q ? data.filter((o) => o.label.toLowerCase().includes(q)) : data
  }, [data, query])

  const toggle = (optionValue: string) => {
    setSelected(
      selected.includes(optionValue)
        ? selected.filter((v) => v !== optionValue)
        : [...selected, optionValue],
    )
  }

  const trigger = renderTrigger ? (
    renderTrigger({ count: selected.length, open })
  ) : (
    <Button size="sm" variant="default" icon={<TbIcons.TbFilter />}>
      {title}
      {selected.length > 0 && <span className="dyl-popover-filter__count">{selected.length}</span>}
    </Button>
  )

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      placement={placement}
      width={typeof width === 'number' ? width : undefined}
      renderTrigger={trigger}
      aria-label={typeof title === 'string' ? title : 'Filter'}
    >
      <div className="dyl-popover-filter">
        {title != null && <p className="dyl-popover-filter__title">{title}</p>}
        <Input
          size="sm"
          prefix={<TbIcons.TbSearch />}
          placeholder={inputPlaceholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="dyl-popover-filter__list" role="group" aria-label={String(title)}>
          {filtered.length === 0 ? (
            <p className="dyl-popover-filter__empty">No matches</p>
          ) : (
            filtered.map((option) => (
              <Checkbox
                key={option.value}
                checked={selected.includes(option.value)}
                onChange={() => toggle(option.value)}
              >
                {option.label}
              </Checkbox>
            ))
          )}
        </div>
        {showReset && (
          <button
            type="button"
            className={classNames('dyl-popover-filter__reset')}
            disabled={selected.length === 0}
            onClick={() => setSelected([])}
          >
            Reset
          </button>
        )}
      </div>
    </Popover>
  )
}
