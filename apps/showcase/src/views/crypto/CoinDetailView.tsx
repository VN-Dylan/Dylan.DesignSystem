import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Card, EmptyState, GrowShrinkTag, Input, Segment } from '@dylan-ds/ui'
import { Icon, TbIcons } from '@dylan-ds/icons'
import { formatCurrency, formatNumber } from '@dylan-ds/utils'
import { PageHeader } from '@/components/shared/PageHeader'
import { KpiCard } from '@/components/shared/KpiCard'
import { ChartCard } from '@/components/shared/ChartCard'
import { getCoin } from '@/mock/crypto'
import { formatCompactUsd, formatPrice } from './cryptoConstants'

/** Coin detail screen with price metrics, 24h chart and a mock order ticket. */
export function CoinDetailView() {
  const navigate = useNavigate()
  const { sym } = useParams()
  const coin = sym ? getCoin(sym) : undefined
  const [side, setSide] = useState('buy')
  const [amount, setAmount] = useState('1')
  const numericAmount = Number(amount) || 0
  const total = useMemo(() => (coin ? numericAmount * coin.price : 0), [coin, numericAmount])

  if (!coin) {
    return (
      <div className="space-y-6">
        <PageHeader title="Coin not found" description="The requested market does not exist." />
        <Card bordered>
          <EmptyState size={220}>
            <div className="space-y-3 text-center">
              <p className="font-medium text-content">Coin not found</p>
              <Button onClick={() => navigate('/crypto/market')}>Back to market</Button>
            </div>
          </EmptyState>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={`${coin.name} (${coin.symbol})`}
        description="Spot price, market metrics and a mock buy/sell ticket."
        actions={
          <>
            <span className="text-lg font-semibold text-content">{formatPrice(coin.price)}</span>
            <GrowShrinkTag value={coin.change24h} suffix="%" />
            <Button
              icon={<Icon as={TbIcons.TbArrowLeft} size={16} />}
              onClick={() => navigate('/crypto/market')}
            >
              Back
            </Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Market cap" value={formatCompactUsd(coin.marketCap)} />
        <KpiCard label="24h volume" value={formatCompactUsd(coin.volume24h)} />
        <KpiCard label="Circulating supply" value={formatNumber(coin.supply, 1)} />
        <KpiCard label="7d change" value={<GrowShrinkTag value={coin.change7d} suffix="%" />} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ChartCard
            title={`${coin.symbol} price - 24h`}
            type="area"
            height={340}
            categories={coin.spark.map((_, index) => `${index}:00`)}
            series={[{ name: coin.symbol, data: coin.spark }]}
            options={{
              stroke: { width: 2, curve: 'smooth' },
              fill: { type: 'gradient', gradient: { opacityFrom: 0.3, opacityTo: 0 } },
              yaxis: { labels: { formatter: (value: number) => formatPrice(value) } },
            }}
          />
        </div>

        <Card bordered header={{ content: 'Buy / Sell', bordered: true }} bodyClass="space-y-4 p-4">
          <Segment
            value={side}
            onChange={(value) => setSide(String(value))}
            aria-label="Order side"
          >
            <Segment.Item value="buy">Buy</Segment.Item>
            <Segment.Item value="sell">Sell</Segment.Item>
          </Segment>
          <Input
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            inputMode="decimal"
            aria-label="Amount"
            suffix={coin.symbol}
          />
          <div className="rounded-md border border-border bg-surface-sunken p-3">
            <p className="text-xs text-content-muted">Estimated total</p>
            <p className="mt-1 text-lg font-semibold text-content">{formatCurrency(total)}</p>
          </div>
          <Button variant="solid" block disabled>
            Place order
          </Button>
        </Card>
      </div>
    </div>
  )
}
