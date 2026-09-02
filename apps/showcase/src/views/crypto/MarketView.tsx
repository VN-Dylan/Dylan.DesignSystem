import { useCallback, useEffect, useMemo, useState, type MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Chart, DataTable, GrowShrinkTag, Input, Segment } from '@vn-dylan/ui'
import type { ColumnDef } from '@vn-dylan/ui'
import { Icon, TbIcons } from '@vn-dylan/icons'
import { PageHeader } from '@/components/shared/PageHeader'
import { coins, type Coin } from '@/mock/crypto'
import { formatCompactUsd, formatPrice } from './cryptoConstants'

type MarketSort = 'marketCap' | 'change24h' | 'change7d'

const pageSize = 8

const sortCoins = (sort: MarketSort) => (a: Coin, b: Coin) => b[sort] - a[sort]

/** Crypto market screen with search, sort segments, paging and coin sparklines. */
export function MarketView() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<MarketSort>('marketCap')
  const [pageIndex, setPageIndex] = useState(1)

  useEffect(() => {
    setPageIndex(1)
  }, [query, sort])

  const sortedCoins = useMemo(() => {
    const lowered = query.trim().toLowerCase()
    return coins
      .filter(
        (coin) =>
          lowered.length === 0 ||
          coin.symbol.toLowerCase().includes(lowered) ||
          coin.name.toLowerCase().includes(lowered),
      )
      .sort(sortCoins(sort))
  }, [query, sort])

  const pageRows = useMemo(
    () => sortedCoins.slice((pageIndex - 1) * pageSize, pageIndex * pageSize),
    [pageIndex, sortedCoins],
  )

  const columns = useMemo<ColumnDef<Coin, unknown>[]>(
    () => [
      {
        id: 'coin',
        header: 'Coin',
        enableSorting: false,
        cell: ({ row }) => (
          <div className="min-w-40">
            <p className="font-semibold text-content">{row.original.symbol}</p>
            <p className="text-xs text-content-muted">{row.original.name}</p>
          </div>
        ),
      },
      {
        accessorKey: 'price',
        header: 'Price',
        enableSorting: false,
        cell: ({ row }) => formatPrice(row.original.price),
      },
      {
        accessorKey: 'change24h',
        header: '24h',
        enableSorting: false,
        cell: ({ row }) => <GrowShrinkTag value={row.original.change24h} suffix="%" />,
      },
      {
        accessorKey: 'change7d',
        header: '7d',
        enableSorting: false,
        cell: ({ row }) => <GrowShrinkTag value={row.original.change7d} suffix="%" />,
      },
      {
        accessorKey: 'marketCap',
        header: 'Market cap',
        enableSorting: false,
        cell: ({ row }) => formatCompactUsd(row.original.marketCap),
      },
      {
        accessorKey: 'volume24h',
        header: 'Volume',
        enableSorting: false,
        cell: ({ row }) => formatCompactUsd(row.original.volume24h),
      },
      {
        id: 'spark',
        header: 'Trend',
        enableSorting: false,
        cell: ({ row }) => (
          <div className="w-28">
            <Chart
              type="area"
              height={40}
              series={[{ name: row.original.symbol, data: row.original.spark }]}
              options={{
                chart: { sparkline: { enabled: true } },
                stroke: { width: 2 },
                tooltip: { enabled: false },
              }}
            />
          </div>
        ),
      },
    ],
    [],
  )

  const handleTableClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      const target = event.target as HTMLElement
      if (target.closest('button,input,select,a,[role="button"],.dyl-data-table__select-cell')) {
        return
      }
      const row = target.closest('tbody tr')
      const rowGroup = row?.parentElement
      if (!row || !rowGroup) return
      const index = Array.from(rowGroup.children).indexOf(row)
      const coin = pageRows[index]
      if (coin) navigate(`/crypto/coin/${coin.symbol.toLowerCase()}`)
    },
    [navigate, pageRows],
  )

  return (
    <div className="space-y-6">
      <PageHeader title="Market" description="Search coins and compare market movement." />

      <Card bordered bodyClass="space-y-4 p-4">
        <div className="grid gap-3 lg:grid-cols-[minmax(16rem,1fr)_22rem]">
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search symbol or name"
            prefix={<Icon as={TbIcons.TbSearch} size={16} />}
            aria-label="Search market"
          />
          <Segment
            value={sort}
            onChange={(value) => setSort(String(value) as MarketSort)}
            size="sm"
            aria-label="Sort market"
          >
            <Segment.Item value="marketCap">Market cap</Segment.Item>
            <Segment.Item value="change24h">24h</Segment.Item>
            <Segment.Item value="change7d">7d</Segment.Item>
          </Segment>
        </div>

        <div onClick={handleTableClick}>
          <DataTable<Coin>
            columns={columns}
            data={pageRows}
            pagingData={{ pageIndex, pageSize, total: sortedCoins.length }}
            pageSizeOptions={[8, 16, 24]}
            onPaginationChange={setPageIndex}
            emptyMessage="No coins match the current filters."
          />
        </div>
      </Card>
    </div>
  )
}
