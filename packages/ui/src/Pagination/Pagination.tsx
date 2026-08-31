import { forwardRef, useEffect, useMemo, useState } from 'react'
import { classNames } from '@dylan-ds/utils'
import { Icon, TbIcons } from '@dylan-ds/icons'
import type { PaginationProps } from './types'
import './Pagination.scss'

type PageToken = number | 'start-ellipsis' | 'end-ellipsis'

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

const getPageTokens = (current: number, totalPages: number): PageToken[] => {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, index) => index + 1)

  const tokens: PageToken[] = [1]
  const start = Math.max(2, current - 1)
  const end = Math.min(totalPages - 1, current + 1)

  if (start > 2) tokens.push('start-ellipsis')
  for (let page = start; page <= end; page += 1) tokens.push(page)
  if (end < totalPages - 1) tokens.push('end-ellipsis')
  tokens.push(totalPages)

  return tokens
}

/**
 * Pagination divides content into pages and lets users navigate between them.
 */
export const Pagination = forwardRef<HTMLDivElement, PaginationProps>(function Pagination(
  { currentPage, displayTotal = false, onChange, pageSize = 1, total = 5, className, ...rest },
  ref,
) {
  const isControlled = currentPage !== undefined
  const [internalPage, setInternalPage] = useState(currentPage ?? 1)
  const pageCount = Math.max(1, Math.ceil(total / Math.max(1, pageSize)))
  const page = clamp(isControlled ? currentPage : internalPage, 1, pageCount)
  const tokens = useMemo(() => getPageTokens(page, pageCount), [page, pageCount])

  useEffect(() => {
    if (isControlled) setInternalPage(currentPage)
  }, [currentPage, isControlled])

  const commit = (nextPage: number) => {
    const resolved = clamp(nextPage, 1, pageCount)
    if (resolved === page) return
    if (!isControlled) setInternalPage(resolved)
    onChange?.(resolved)
  }

  return (
    <nav
      ref={ref}
      aria-label="Pagination"
      className={classNames('dyl-pagination', className)}
      {...rest}
    >
      {displayTotal && <span className="dyl-pagination__total">Total {total} items</span>}
      <div className="dyl-pagination__pages">
        <button
          type="button"
          className="dyl-pagination__control"
          aria-label="Previous page"
          disabled={page === 1}
          onClick={() => commit(page - 1)}
        >
          <Icon as={TbIcons.TbChevronLeft} />
        </button>
        {tokens.map((token) =>
          typeof token === 'number' ? (
            <button
              key={token}
              type="button"
              className="dyl-pagination__page"
              aria-label={`Page ${token}`}
              aria-current={token === page ? 'page' : undefined}
              data-active={token === page || undefined}
              onClick={() => commit(token)}
            >
              {token}
            </button>
          ) : (
            <span key={token} className="dyl-pagination__ellipsis" aria-hidden>
              ...
            </span>
          ),
        )}
        <button
          type="button"
          className="dyl-pagination__control"
          aria-label="Next page"
          disabled={page === pageCount}
          onClick={() => commit(page + 1)}
        >
          <Icon as={TbIcons.TbChevronRight} />
        </button>
      </div>
    </nav>
  )
})
