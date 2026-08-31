import { useId } from 'react'
import { TbIcons } from '@dylan-ds/icons'
import { useControllableState } from '@dylan-ds/utils'
import { Button } from '../Button'
import { Input } from '../Input'
import { Select } from '../Select'
import { Segment } from '../Segment'
import type { AdvancedFilterBuilderProps, FilterOperator, FilterQuery, FilterRule } from './types'
import './AdvancedFilterBuilder.scss'

const OPERATOR_LABEL: Record<FilterOperator, string> = {
  eq: 'is',
  ne: 'is not',
  contains: 'contains',
  gt: '>',
  lt: '<',
  gte: '≥',
  lte: '≤',
}

const DEFAULT_OPERATORS: FilterOperator[] = ['eq', 'ne', 'contains']

const emptyQuery: FilterQuery = { combinator: 'and', rules: [] }

/**
 * A visual filter-query builder — a combinator (AND/OR) plus a list of
 * field / operator / value rules.
 *
 * NOTE: single-level only. Nested rule groups are a planned enhancement.
 */
export function AdvancedFilterBuilder({
  fields,
  value,
  defaultValue,
  onChange,
  onApply,
  onReset,
}: AdvancedFilterBuilderProps) {
  const idBase = useId()
  const [query, setQuery] = useControllableState<FilterQuery>({
    value,
    defaultValue: defaultValue ?? emptyQuery,
    onChange,
  })

  const operatorsFor = (fieldValue: string) =>
    fields.find((f) => f.value === fieldValue)?.operators ?? DEFAULT_OPERATORS

  const patch = (next: Partial<FilterQuery>) => setQuery({ ...query, ...next })

  const addRule = () => {
    const field = fields[0]
    if (!field) return
    const rule: FilterRule = {
      id: `${idBase}-${query.rules.length}-${Date.now()}`,
      field: field.value,
      operator: operatorsFor(field.value)[0] ?? 'eq',
      value: '',
    }
    patch({ rules: [...query.rules, rule] })
  }

  const updateRule = (id: string, changes: Partial<FilterRule>) =>
    patch({
      rules: query.rules.map((rule) => (rule.id === id ? { ...rule, ...changes } : rule)),
    })

  const removeRule = (id: string) => patch({ rules: query.rules.filter((rule) => rule.id !== id) })

  return (
    <div className="dyl-filter-builder">
      <div className="dyl-filter-builder__header">
        <span className="dyl-filter-builder__label">Match</span>
        <Segment
          size="sm"
          value={query.combinator}
          onChange={(next) => {
            const picked = Array.isArray(next) ? next[0] : next
            patch({ combinator: picked === 'or' ? 'or' : 'and' })
          }}
        >
          <Segment.Item value="and">All</Segment.Item>
          <Segment.Item value="or">Any</Segment.Item>
        </Segment>
        <span className="dyl-filter-builder__label">of the following</span>
      </div>

      <ul className="dyl-filter-builder__rules">
        {query.rules.map((rule) => (
          <li key={rule.id} className="dyl-filter-builder__rule">
            <Select
              options={fields.map((f) => ({ label: f.label, value: f.value }))}
              value={{
                label: fields.find((f) => f.value === rule.field)?.label ?? rule.field,
                value: rule.field,
              }}
              isClearable={false}
              aria-label="Field"
              onChange={(opt) =>
                opt &&
                updateRule(rule.id, {
                  field: opt.value,
                  operator: operatorsFor(opt.value)[0] ?? 'eq',
                })
              }
            />
            <Select
              options={operatorsFor(rule.field).map((op) => ({
                label: OPERATOR_LABEL[op],
                value: op,
              }))}
              value={{ label: OPERATOR_LABEL[rule.operator], value: rule.operator }}
              isClearable={false}
              aria-label="Operator"
              onChange={(opt) =>
                opt && updateRule(rule.id, { operator: opt.value as FilterOperator })
              }
            />
            <Input
              aria-label="Value"
              value={rule.value}
              onChange={(e) => updateRule(rule.id, { value: e.target.value })}
            />
            <Button
              size="sm"
              shape="circle"
              variant="plain"
              aria-label="Remove rule"
              icon={<TbIcons.TbTrash />}
              onClick={() => removeRule(rule.id)}
            />
          </li>
        ))}
      </ul>

      <div className="dyl-filter-builder__actions">
        <Button size="sm" variant="plain" icon={<TbIcons.TbPlus />} onClick={addRule}>
          Add rule
        </Button>
        <span className="dyl-filter-builder__spacer" />
        <Button
          size="sm"
          onClick={() => {
            setQuery(emptyQuery)
            onReset?.()
          }}
        >
          Reset
        </Button>
        <Button size="sm" variant="solid" onClick={() => onApply?.(query)}>
          Apply
        </Button>
      </div>
    </div>
  )
}
