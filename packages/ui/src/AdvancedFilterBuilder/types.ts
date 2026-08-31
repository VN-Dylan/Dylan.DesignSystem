export type FilterCombinator = 'and' | 'or'
export type FilterOperator = 'eq' | 'ne' | 'contains' | 'gt' | 'lt' | 'gte' | 'lte'

export interface FilterFieldDef {
  label: string
  value: string
  /** Operators offered for this field. Defaults to a text set. */
  operators?: FilterOperator[]
}

export interface FilterRule {
  id: string
  field: string
  operator: FilterOperator
  value: string
}

export interface FilterQuery {
  combinator: FilterCombinator
  rules: FilterRule[]
}

export interface AdvancedFilterBuilderProps {
  /** Fields the user can filter on. */
  fields: FilterFieldDef[]
  /** Current query (controlled). */
  value?: FilterQuery
  /** Initial query for uncontrolled usage. */
  defaultValue?: FilterQuery
  /** Called on every edit. */
  onChange?: (query: FilterQuery) => void
  /** Called when the Apply button is pressed. */
  onApply?: (query: FilterQuery) => void
  /** Called when the Reset button is pressed. */
  onReset?: () => void
}
