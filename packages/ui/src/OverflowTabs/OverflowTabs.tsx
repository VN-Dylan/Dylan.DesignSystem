import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { TbIcons } from '@vn-dylan/icons'
import { classNames, useControllableState } from '@vn-dylan/utils'
import { Dropdown } from '../Dropdown'
import type { OverflowTabsProps } from './types'
import './OverflowTabs.scss'

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

/**
 * A tab strip that measures itself and moves the tabs that don't fit into a
 * "More" dropdown, so every tab stays reachable at any width.
 */
export function OverflowTabs({
  tabList,
  value,
  defaultValue,
  onChange,
  tabListClass,
  tabNavClass,
  children,
}: OverflowTabsProps) {
  const [active, setActive] = useControllableState<string>({
    value,
    defaultValue: defaultValue ?? tabList[0]?.value ?? '',
    onChange,
  })

  const stripRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map())
  const moreRef = useRef<HTMLDivElement>(null)
  const [visibleCount, setVisibleCount] = useState(tabList.length)

  const measure = useCallback(() => {
    const strip = stripRef.current
    // No layout yet (SSR / jsdom / display:none) — keep every tab visible.
    if (!strip || strip.clientWidth === 0) {
      setVisibleCount(tabList.length)
      return
    }
    const available = strip.clientWidth - (moreRef.current?.offsetWidth ?? 0) - 8
    let used = 0
    let count = 0
    for (const tab of tabList) {
      const node = tabRefs.current.get(tab.value)
      if (!node) break
      used += node.offsetWidth + 4
      if (used > available) break
      count += 1
    }
    setVisibleCount(Math.max(1, Math.min(tabList.length, count)))
  }, [tabList])

  useIsoLayoutEffect(() => {
    measure()
  }, [measure])

  useEffect(() => {
    const strip = stripRef.current
    if (!strip || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(() => measure())
    ro.observe(strip)
    return () => ro.disconnect()
  }, [measure])

  const overflow = tabList.slice(visibleCount)

  return (
    <div className="dyl-overflow-tabs">
      <div
        ref={stripRef}
        className={classNames('dyl-overflow-tabs__strip', tabListClass)}
        role="tablist"
        aria-label="Tabs"
      >
        {tabList.map((tab, index) => (
          <button
            key={tab.value}
            ref={(node) => {
              if (node) tabRefs.current.set(tab.value, node)
              else tabRefs.current.delete(tab.value)
            }}
            type="button"
            role="tab"
            aria-selected={active === tab.value}
            disabled={tab.disabled}
            hidden={index >= visibleCount}
            data-active={active === tab.value || undefined}
            className={classNames('dyl-overflow-tabs__tab', tabNavClass)}
            onClick={() => setActive(tab.value)}
          >
            {tab.label}
          </button>
        ))}

        <div ref={moreRef} className="dyl-overflow-tabs__more" hidden={overflow.length === 0}>
          <Dropdown
            placement="bottom-end"
            renderTitle={
              <button type="button" className="dyl-overflow-tabs__more-button">
                More <TbIcons.TbChevronDown />
              </button>
            }
          >
            {overflow.map((tab) => (
              <Dropdown.Item
                key={tab.value}
                eventKey={tab.value}
                active={active === tab.value}
                disabled={tab.disabled}
                onSelect={() => setActive(tab.value)}
              >
                {tab.label}
              </Dropdown.Item>
            ))}
          </Dropdown>
        </div>
      </div>

      {children != null && (
        <div className="dyl-overflow-tabs__panel" role="tabpanel">
          {children}
        </div>
      )}
    </div>
  )
}
