import type { HTMLAttributes, ReactNode } from 'react'

export interface TreeNode<TData = unknown> {
  /** Unique id across the whole tree. */
  id: string
  /** Visible label. A string label is searchable and highlighted automatically. */
  label: ReactNode
  /** Text used for search when `label` is not a string. */
  searchText?: string
  /** Leading icon. */
  icon?: ReactNode
  /** Known children. Leave `undefined` with `hasChildren` to load them lazily. */
  children?: TreeNode<TData>[]
  /** The node has children that `loadChildren` will fetch on first expand. */
  hasChildren?: boolean
  /** Cannot be selected, checked or focused. */
  disabled?: boolean
  /** Arbitrary payload. */
  data?: TData
}

export type TreeCheckState = 'checked' | 'unchecked' | 'mixed'

export interface TreeListProps<TData = unknown>
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect' | 'children'> {
  /** Top-level nodes. */
  nodes: TreeNode<TData>[]
  /** Accessible name of the tree. */
  'aria-label'?: string

  /** Controlled expanded node ids. */
  expandedKeys?: string[]
  /** Initial expanded ids when uncontrolled. @default [] */
  defaultExpandedKeys?: string[]
  onExpandedChange?: (keys: string[]) => void

  /** Show tri-state checkboxes: checking a parent checks its descendants. @default false */
  checkable?: boolean
  /** Controlled fully-checked ids (parents included when all their children are checked). */
  checkedKeys?: string[]
  /** Initial checked ids when uncontrolled. @default [] */
  defaultCheckedKeys?: string[]
  onCheckedChange?: (keys: string[]) => void

  /** Single selection on click / Enter. @default false */
  selectable?: boolean
  /** Controlled selected id. */
  selectedKey?: string | null
  defaultSelectedKey?: string | null
  onSelect?: (key: string, node: TreeNode<TData>) => void

  /** Lazily fetch the children of a node with `hasChildren` on its first expand. */
  loadChildren?: (node: TreeNode<TData>) => Promise<TreeNode<TData>[]>

  /** Show a search box that filters the tree and opens matching branches. @default false */
  searchable?: boolean
  /** @default 'Search…' */
  searchPlaceholder?: string
  /** Shown when nothing matches the search. @default 'No matches' */
  emptyMessage?: ReactNode
}
