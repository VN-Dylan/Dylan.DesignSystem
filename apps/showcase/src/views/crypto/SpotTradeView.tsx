import { useMemo, useState } from 'react'
import { Button, Card, Input, Select, Segment, Table } from '@dylan-ds/ui'
import type { SelectOption } from '@dylan-ds/ui'
import { Icon, TbIcons } from '@dylan-ds/icons'
import { formatRelativeTime } from '@dylan-ds/utils'
import { PageHeader } from '@/components/shared/PageHeader'
import { ChartCard } from '@/components/shared/ChartCard'
import { StatusTag } from '@/components/shared/StatusTag'
import { coins, orderBook, recentTrades } from '@/mock/crypto'
import { formatPrice, tradeStatusTone } from './cryptoConstants'

const pairOptions: SelectOption[] = coins.map((coin) => ({
  label: `${coin.symbol}/USDT`,
  value: coin.symbol,
}))

const maxBookSize = Math.max(
  ...orderBook.asks.map((row) => row.size),
  ...orderBook.bids.map((row) => row.size),
)

const quickAmounts = [25, 50, 75, 100]

/** Spot trading screen with price chart, order book, order form and recent trades. */
export function SpotTradeView() {
  const [pair, setPair] = useState<SelectOption>(pairOptions[0]!)
  const [side, setSide] = useState('buy')
  const [price, setPrice] = useState(String(coins[0]!.price))
  const [amount, setAmount] = useState('0.10')
  const coin = coins.find((item) => item.symbol === pair.value) ?? coins[0]!
  const total = useMemo(() => (Number(price) || 0) * (Number(amount) || 0), [amount, price])
  const midPrice = (orderBook.asks[orderBook.asks.length - 1]!.price + orderBook.bids[0]!.price) / 2

  return (
    <div className="space-y-6">
      <PageHeader
        title="Spot trade"
        description="Mock limit-order workspace for the selected USDT market."
        actions={
          <div className="w-56">
            <Select
              options={pairOptions}
              value={pair}
              onChange={(option) => {
                const next = option ?? pairOptions[0]!
                const nextCoin = coins.find((item) => item.symbol === next.value) ?? coins[0]!
                setPair(next)
                setPrice(String(nextCoin.price))
              }}
              isClearable={false}
              aria-label="Trading pair"
            />
          </div>
        }
      />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.5fr)_minmax(18rem,0.8fr)_minmax(18rem,0.8fr)]">
        <ChartCard
          title={`${coin.symbol}/USDT`}
          type="area"
          height={360}
          categories={coin.spark.map((_, index) => `${index}:00`)}
          series={[{ name: coin.symbol, data: coin.spark }]}
          options={{
            stroke: { width: 2, curve: 'smooth' },
            fill: { type: 'gradient', gradient: { opacityFrom: 0.3, opacityTo: 0 } },
            yaxis: { labels: { formatter: (value: number) => formatPrice(value) } },
          }}
        />

        <Card bordered header={{ content: 'Order book', bordered: true }} bodyClass="space-y-1 p-4">
          {[...orderBook.asks].map((row) => {
            const width = `${Math.round((row.size / maxBookSize) * 100)}%`
            return (
              <div
                key={`ask-${row.price}`}
                className="relative overflow-hidden rounded-md px-2 py-1"
              >
                <span
                  className="absolute inset-y-1 end-0 rounded bg-error-subtle"
                  style={{ width }}
                />
                <div className="relative flex justify-between text-sm">
                  <span className="font-medium text-error">{formatPrice(row.price)}</span>
                  <span className="text-content">{row.size}</span>
                </div>
              </div>
            )
          })}
          <div className="my-2 rounded-md border border-border bg-surface-sunken px-3 py-2 text-center text-sm font-semibold text-content">
            {formatPrice(midPrice)}
          </div>
          {orderBook.bids.map((row) => {
            const width = `${Math.round((row.size / maxBookSize) * 100)}%`
            return (
              <div
                key={`bid-${row.price}`}
                className="relative overflow-hidden rounded-md px-2 py-1"
              >
                <span
                  className="absolute inset-y-1 end-0 rounded bg-success-subtle"
                  style={{ width }}
                />
                <div className="relative flex justify-between text-sm">
                  <span className="font-medium text-success">{formatPrice(row.price)}</span>
                  <span className="text-content">{row.size}</span>
                </div>
              </div>
            )
          })}
        </Card>

        <Card
          bordered
          header={{ content: 'Limit order', bordered: true }}
          bodyClass="space-y-4 p-4"
        >
          <Segment
            value={side}
            onChange={(value) => setSide(String(value))}
            aria-label="Order side"
          >
            <Segment.Item value="buy">Buy</Segment.Item>
            <Segment.Item value="sell">Sell</Segment.Item>
          </Segment>
          <Input
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            inputMode="decimal"
            aria-label="Limit price"
            prefix={<Icon as={TbIcons.TbCurrencyDollar} size={16} />}
          />
          <Input
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            inputMode="decimal"
            aria-label="Amount"
            suffix={coin.symbol}
          />
          <div className="grid grid-cols-4 gap-2">
            {quickAmounts.map((percent) => (
              <Button key={percent} size="xs" onClick={() => setAmount(String(percent / 100))}>
                {percent}%
              </Button>
            ))}
          </div>
          <div className="rounded-md border border-border bg-surface-sunken p-3">
            <p className="text-xs text-content-muted">Order total</p>
            <p className="mt-1 text-lg font-semibold text-content">{formatPrice(total)}</p>
          </div>
          <Button variant="solid" block disabled>
            {side === 'buy' ? 'Buy' : 'Sell'} {coin.symbol}
          </Button>
        </Card>
      </div>

      <Card bordered header={{ content: 'Recent trades', bordered: true }} bodyClass="p-0">
        <Table hoverable>
          <Table.THead>
            <Table.Tr>
              <Table.Th>Pair</Table.Th>
              <Table.Th>Side</Table.Th>
              <Table.Th>Price</Table.Th>
              <Table.Th>Amount</Table.Th>
              <Table.Th>Time</Table.Th>
              <Table.Th>Status</Table.Th>
            </Table.Tr>
          </Table.THead>
          <Table.TBody>
            {recentTrades.map((trade) => (
              <Table.Tr key={trade.id}>
                <Table.Td className="font-medium text-content">{trade.pair}</Table.Td>
                <Table.Td>
                  <span
                    className={
                      trade.side === 'buy' ? 'font-medium text-success' : 'font-medium text-error'
                    }
                  >
                    {trade.side.toUpperCase()}
                  </span>
                </Table.Td>
                <Table.Td>{formatPrice(trade.price)}</Table.Td>
                <Table.Td>{trade.amount}</Table.Td>
                <Table.Td>{formatRelativeTime(trade.time)}</Table.Td>
                <Table.Td>
                  <StatusTag tone={tradeStatusTone[trade.status]}>{trade.status}</StatusTag>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.TBody>
        </Table>
      </Card>
    </div>
  )
}
