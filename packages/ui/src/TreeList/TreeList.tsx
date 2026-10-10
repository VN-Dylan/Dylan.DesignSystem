import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ForwardedRef,
  type KeyboardEvent,
  type ReactElement,
  type ReactNode,
  type Ref,
} from 'react'
import { classNames, useControllableState } from '@vn-dylan/utils'
import { Icon, TbIcons } from '@vn-dylan/icons'
import { composeRefs } from '../_internal/composeRefs'
import { Input } from '../Input'
import { Spinner } from '../Spinner'
import type { TreeCheckState, TreeListProps, TreeNode } from './types'
import { useUiMessages } from '../LocaleProvider'
import './TreeList.scss'

const EMPTY: string[] = []

interface IndexEntry<TData> {
  node: TreeNode<TData>
  parentId: string | null
  level: number
}

interface VisibleRow<TData> {
  node: TreeNode<TData>
  level: number
  posInSet: number
  setSize: number
  expandable: boolean
  expanded: boolean
}

const textOf = <TData,>(node: TreeNode<TData>) =>
  node.searchText ?? (typeof node.label === 'string' ? node.label : '')

const highlight = (label: ReactNode, query: string): ReactNode => {
  if (!query || typeof label !== 'string') return label
  const at = label.toLowerCase().indexOf(query.toLowerCase())
  if (at < 0) return label
  return (
    <>
      {label.slice(0, at)}
      <mark className="dyl-tree-list__match">{label.slice(at, at + query.length)}</mark>
      {label.slice(at + query.length)}
    </>
  )
}

function TreeListInner<TData>(
  {
    nodes,
    expandedKeys,
    defaultExpandedKeys = EMPTY,
    onExpandedChange,
    checkable = false,
    checkedKeys,
    defaultCheckedKeys = EMPTY,
    onCheckedChange,
    selectable = false,
    selectedKey,
    defaultSelectedKey = null,
    onSelect,
    loadChildren,
    searchable = false,
    searchPlaceholder: searchPlaceholderProp,
    emptyMessage: emptyMessageProp,
    className,
    onKeyDown,
    ...rest
  }: TreeListProps<TData>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const t = useUiMessages('treeList')
  const searchPlaceholder = searchPlaceholderProp ?? t.search
  const emptyMessage = emptyMessageProp ?? t.empty
  const baseId = useId()
  const treeRef = useRef<HTMLDivElement>(null)
  const itemId = (id: string) => `${baseId}-node-${id}`

  const [expanded, setExpanded] = useControllableState<string[]>({
    value: expandedKeys,
    defaultValue: defaultExpandedKeys,
    onChange: onExpandedChange,
  })
  const [checked, setChecked] = useControllableState<string[]>({
    value: checkedKeys,
    defaultValue: defaultCheckedKeys,
    onChange: onCheckedChange,
  })
  const [selected, setSelected] = useControllableState<string | null>({
    value: selectedKey,
    defaultValue: defaultSelectedKey,
  })
  const [loaded, setLoaded] = useState<Record<string, TreeNode<TData>[]>>({})
  const [loading, setLoading] = useState<Set<string>>(() => new Set())
  const [failed, setFailed] = useState<Set<string>>(() => new Set())
  const [query, setQuery] = useState('')
  const [activeId, setActiveId] = useState<string | null>(null)

  const childrenOf = useCallback(
    (node: TreeNode<TData>) => node.children ?? loaded[node.id],
    [loaded],
  )

  /* ---------------------------------------------------------------- index */
  const index = useMemo(() => {
    const map = new Map<string, IndexEntry<TData>>()
    const walk = (list: TreeNode<TData>[], parentId: string | null, level: number) => {
      for (const node of list) {
        map.set(node.id, { node, parentId, level })
        const kids = childrenOf(node)
        if (kids) walk(kids, node.id, level + 1)
      }
    }
    walk(nodes, null, 1)
    return map
  }, [nodes, childrenOf])

  const expandedSet = useMemo(() => new Set(expanded), [expanded])
  const checkedSet = useMemo(() => new Set(checked), [checked])

  /* --------------------------------------------------------------- search */
  const trimmed = query.trim().toLowerCase()
  const searchView = useMemo(() => {
    if (!trimmed) return null
    const visible = new Set<string>()
    const open = new Set<string>()
    index.forEach(({ node }, id) => {
      if (!textOf(node).toLowerCase().includes(trimmed)) return
      visible.add(id)
      let parent = index.get(id)?.parentId ?? null
      while (parent) {
        visible.add(parent)
        open.add(parent)
        parent = index.get(parent)?.parentId ?? null
      }
    })
    return { visible, open }
  }, [index, trimmed])

  /* ------------------------------------------------------------ flatten */
  const rows = useMemo(() => {
    const out: VisibleRow<TData>[] = []
    const walk = (list: TreeNode<TData>[], level: number) => {
      const shown = searchView ? list.filter((n) => searchView.visible.has(n.id)) : list
      shown.forEach((node, i) => {
        const kids = childrenOf(node)
        const expandable = Boolean(kids?.length || (node.hasChildren && !kids))
        const isOpen = searchView ? searchView.open.has(node.id) : expandedSet.has(node.id)
        out.push({
          node,
          level,
          posInSet: i + 1,
          setSize: shown.length,
          expandable,
          expanded: isOpen,
        })
        if (isOpen && kids) walk(kids, level + 1)
      })
    }
    walk(nodes, 1)
    return out
  }, [nodes, childrenOf, expandedSet, searchView])

  useEffect(() => {
    if (activeId && !rows.some((r) => r.node.id === activeId)) setActiveId(rows[0]?.node.id ?? null)
  }, [rows, activeId])

  /* ------------------------------------------------------------ checking */
  const checkState = useCallback(
    (node: TreeNode<TData>): TreeCheckState => {
      const kids = childrenOf(node)
      if (!kids?.length) return checkedSet.has(node.id) ? 'checked' : 'unchecked'
      let all = true
      let none = true
      for (const kid of kids) {
        const state = checkState(kid)
        if (state !== 'checked') all = false
        if (state !== 'unchecked') none = false
      }
      return all ? 'checked' : none ? 'unchecked' : 'mixed'
    },
    [checkedSet, childrenOf],
  )

  const toggleCheck = (node: TreeNode<TData>) => {
    if (node.disabled) return
    const next = new Set(checked)
    const target = checkState(node) !== 'checked'
    const walk = (n: TreeNode<TData>) => {
      if (!n.disabled) {
        if (target) next.add(n.id)
        else next.delete(n.id)
      }
      childrenOf(n)?.forEach(walk)
    }
    walk(node)
    let parent = index.get(node.id)?.parentId ?? null
    while (parent) {
      const kids = childrenOf(index.get(parent)!.node) ?? []
      if (kids.every((k) => next.has(k.id))) next.add(parent)
      else next.delete(parent)
      parent = index.get(parent)?.parentId ?? null
    }
    setChecked(Array.from(next))
  }

  /* ----------------------------------------------------------- expanding */
  const load = async (node: TreeNode<TData>) => {
    if (!loadChildren || loading.has(node.id)) return
    setLoading((s) => new Set(s).add(node.id))
    setFailed((s) => {
      const n = new Set(s)
      n.delete(node.id)
      return n
    })
    try {
      const kids = await loadChildren(node)
      setLoaded((l) => ({ ...l, [node.id]: kids }))
      // A checked parent passes its state to children it had not loaded yet.
      if (checkedSet.has(node.id))
        setChecked(Array.from(new Set([...checked, ...kids.map((k) => k.id)])))
    } catch {
      setFailed((s) => new Set(s).add(node.id))
    } finally {
      setLoading((s) => {
        const n = new Set(s)
        n.delete(node.id)
        return n
      })
    }
  }

  const setOpen = (row: VisibleRow<TData>, open: boolean) => {
    if (!row.expandable || searchView) return
    const id = row.node.id
    if (open && !expandedSet.has(id)) {
      setExpanded([...expanded, id])
      if (!childrenOf(row.node) && row.node.hasChildren) void load(row.node)
    } else if (!open && expandedSet.has(id)) {
      setExpanded(expanded.filter((k) => k !== id))
    }
  }

  /* ----------------------------------------------------------- activate */
  const activate = (node: TreeNode<TData>) => {
    if (node.disabled) return
    if (selectable) {
      setSelected(node.id)
      onSelect?.(node.id, node)
    } else if (checkable) {
      toggleCheck(node)
    }
  }

  /* ------------------------------------------------------------ keyboard */
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event)
    if (event.defaultPrevented || rows.length === 0) return
    const at = rows.findIndex((r) => r.node.id === activeId)
    const row = at >= 0 ? rows[at] : undefined
    const go = (i: number) => {
      const target = rows[Math.max(0, Math.min(rows.length - 1, i))]
      if (target) setActiveId(target.node.id)
    }
    const keys: Record<string, () => void> = {
      ArrowDown: () => go(at + 1),
      ArrowUp: () => go(at < 0 ? rows.length - 1 : at - 1),
      Home: () => go(0),
      End: () => go(rows.length - 1),
      ArrowRight: () => {
        if (!row?.expandable) return
        if (!row.expanded) setOpen(row, true)
        else go(at + 1)
      },
      ArrowLeft: () => {
        if (!row) return
        if (row.expanded) setOpen(row, false)
        else {
          const parent = index.get(row.node.id)?.parentId
          if (parent) setActiveId(parent)
        }
      },
      Enter: () => row && activate(row.node),
      ' ': () => row && (checkable ? toggleCheck(row.node) : activate(row.node)),
    }
    const handler = keys[event.key]
    if (handler) {
      event.preventDefault()
      handler()
    }
  }

  useEffect(() => {
    if (activeId) document.getElementById(itemId(activeId))?.scrollIntoView?.({ block: 'nearest' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId])

  /* -------------------------------------------------------------- render */
  return (
    <div className={classNames('dyl-tree-list', className)}>
      {searchable && (
        <Input
          type="search"
          className="dyl-tree-list__search"
          placeholder={searchPlaceholder}
          aria-label={searchPlaceholder}
          prefix={<Icon as={TbIcons.TbSearch} size={16} aria-hidden />}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      )}
      <div
        ref={composeRefs(treeRef, ref)}
        role="tree"
        tabIndex={0}
        aria-multiselectable={checkable || undefined}
        aria-activedescendant={activeId ? itemId(activeId) : undefined}
        className="dyl-tree-list__tree"
        onKeyDown={handleKeyDown}
        onFocus={() => {
          if (!activeId && rows[0]) setActiveId(selected ?? rows[0].node.id)
        }}
        {...rest}
      >
        {rows.length === 0 && <div className="dyl-tree-list__empty">{emptyMessage}</div>}
        {rows.map((row) => {
          const { node } = row
          const state = checkable ? checkState(node) : undefined
          const isLoading = loading.has(node.id)
          return (
            <div
              key={node.id}
              id={itemId(node.id)}
              role="treeitem"
              aria-level={row.level}
              aria-posinset={row.posInSet}
              aria-setsize={row.setSize}
              aria-expanded={row.expandable ? row.expanded : undefined}
              aria-selected={selectable ? selected === node.id : undefined}
              aria-checked={state ? (state === 'mixed' ? 'mixed' : state === 'checked') : undefined}
              aria-disabled={node.disabled || undefined}
              aria-busy={isLoading || undefined}
              data-active={activeId === node.id || undefined}
              className="dyl-tree-list__node"
              style={{ ['--dyl-tree-level' as string]: row.level - 1 }}
              onClick={() => {
                setActiveId(node.id)
                activate(node)
              }}
            >
              <span
                className="dyl-tree-list__toggle"
                data-expandable={row.expandable || undefined}
                aria-hidden
                onClick={(e) => {
                  if (!row.expandable) return
                  e.stopPropagation()
                  setActiveId(node.id)
                  setOpen(row, !row.expanded)
                }}
              >
                {isLoading ? (
                  <Spinner size={12} />
                ) : (
                  row.expandable && <Icon as={TbIcons.TbChevronRight} size={14} />
                )}
              </span>
              {checkable && (
                <span
                  className="dyl-tree-list__check"
                  data-state={state}
                  aria-hidden
                  onClick={(e) => {
                    e.stopPropagation()
                    setActiveId(node.id)
                    toggleCheck(node)
                  }}
                >
                  {state === 'checked' && <Icon as={TbIcons.TbCheck} size={12} />}
                  {state === 'mixed' && <Icon as={TbIcons.TbMinus} size={12} />}
                </span>
              )}
              {node.icon != null && <span className="dyl-tree-list__icon">{node.icon}</span>}
              <span className="dyl-tree-list__label">{highlight(node.label, query.trim())}</span>
              {failed.has(node.id) && (
                <button
                  type="button"
                  tabIndex={-1}
                  className="dyl-tree-list__retry"
                  onClick={(e) => {
                    e.stopPropagation()
                    void load(node)
                  }}
                >
                  Retry
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/**
 * TreeList shows hierarchical data as an accessible ARIA tree: expand with
 * click or ←/→, tri-state checkboxes (`checkable`), single selection
 * (`selectable`), lazy children (`loadChildren`) and search that keeps the
 * ancestors of every match and opens their branches.
 */
export const TreeList = forwardRef(TreeListInner) as <TData = unknown>(
  props: TreeListProps<TData> & { ref?: Ref<HTMLDivElement> },
) => ReactElement | null
