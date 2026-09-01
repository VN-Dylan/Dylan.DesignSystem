import { useNavigate } from 'react-router-dom'
import { Card, GrowShrinkTag, Table, VectorMap } from '@dylan-ds/ui'
import { Icon, TbIcons } from '@dylan-ds/icons'
import { formatCurrency } from '@dylan-ds/utils'
import { PageHeader } from '@/components/shared/PageHeader'
import { KpiCard } from '@/components/shared/KpiCard'
import { ChartCard } from '@/components/shared/ChartCard'
import {
  allocation,
  coins,
  portfolioKpis,
  portfolioValue,
  recentTrades,
  usersByRegion,
} from '@/mock/crypto'
import { formatCompactUsd, formatPrice } from './cryptoConstants'

/**
 * Crypto portfolio overview — the reference screen for the crypto area:
 * portfolio KPIs, allocation donut, a price chart, a market table, a regional
 * VectorMap and recent trades.
 */
export function CryptoDashboardView() {
  const navigate = useNavigate()
  const btc = coins[0]!
  const topMovers = [...coins].sort((a, b) => b.change24h - a.change24h).slice(0, 6)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Crypto dashboard"
        description="Portfolio value, market movement and account activity."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Portfolio value"
          value={formatCurrency(portfolioValue)}
          delta={portfolioKpis.totalValue.delta}
          icon={<Icon as={TbIcons.TbWallet} size={18} />}
        />
        <KpiCard
          label="24h P&L"
          value={formatCurrency(portfolioKpis.pnl24h.value)}
          delta={portfolioKpis.pnl24h.delta}
          icon={<Icon as={TbIcons.TbTrendingUp} size={18} />}
        />
        <KpiCard
          label="Best performer"
          value={portfolioKpis.bestPerformer.symbol}
          delta={portfolioKpis.bestPerformer.delta}
          icon={<Icon as={TbIcons.TbArrowUpRight} size={18} />}
        />
        <KpiCard
          label="Worst performer"
          value={portfolioKpis.worstPerformer.symbol}
          delta={portfolioKpis.worstPerformer.delta}
          icon={<Icon as={TbIcons.TbArrowDownRight} size={18} />}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ChartCard
            title={`${btc.name} — last 24h`}
            type="area"
            height={300}
            categories={btc.spark.map((_, i) => `${i}:00`)}
            series={[{ name: btc.symbol, data: btc.spark }]}
            options={{
              stroke: { width: 2, curve: 'smooth' },
              fill: { type: 'gradient', gradient: { opacityFrom: 0.3, opacityTo: 0 } },
              yaxis: { labels: { formatter: (v: number) => `$${Math.round(v).toLocaleString()}` } },
            }}
          />
        </div>
        <ChartCard
          title="Allocation"
          type="donut"
          height={300}
          series={allocation.map((a) => a.value)}
          options={{ labels: allocation.map((a) => a.label), legend: { position: 'bottom' } }}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card
          bordered
          className="lg:col-span-2"
          header={{
            content: 'Top movers (24h)',
            bordered: true,
            extra: (
              <button
                type="button"
                className="text-xs text-primary hover:underline"
                onClick={() => navigate('/crypto/market')}
              >
                Full market
              </button>
            ),
          }}
          bodyClass="p-0"
        >
          <Table hoverable>
            <Table.THead>
              <Table.Tr>
                <Table.Th>Coin</Table.Th>
                <Table.Th>Price</Table.Th>
                <Table.Th>24h</Table.Th>
                <Table.Th>Market cap</Table.Th>
              </Table.Tr>
            </Table.THead>
            <Table.TBody>
              {topMovers.map((c) => (
                <Table.Tr
                  key={c.symbol}
                  className="cursor-pointer"
                  onClick={() => navigate(`/crypto/coin/${c.symbol.toLowerCase()}`)}
                >
                  <Table.Td>
                    <span className="font-medium text-content">{c.symbol}</span>{' '}
                    <span className="text-xs text-content-muted">{c.name}</span>
                  </Table.Td>
                  <Table.Td>{formatPrice(c.price)}</Table.Td>
                  <Table.Td>
                    <GrowShrinkTag value={c.change24h} suffix="%" />
                  </Table.Td>
                  <Table.Td>{formatCompactUsd(c.marketCap)}</Table.Td>
                </Table.Tr>
              ))}
            </Table.TBody>
          </Table>
        </Card>

        <Card
          bordered
          header={{ content: 'Recent trades', bordered: true }}
          bodyClass="divide-y divide-border p-0"
        >
          {recentTrades.map((t) => (
            <div key={t.id} className="flex items-center justify-between px-4 py-3 text-sm">
              <div>
                <p className="font-medium text-content">
                  <span className={t.side === 'buy' ? 'text-success' : 'text-error'}>
                    {t.side.toUpperCase()}
                  </span>{' '}
                  {t.pair}
                </p>
                <p className="text-xs text-content-muted">
                  {t.amount} @ {formatPrice(t.price)}
                </p>
              </div>
              <span className="text-xs capitalize text-content-muted">{t.status}</span>
            </div>
          ))}
        </Card>
      </div>

      <Card bordered header={{ content: 'Users by region', bordered: true }} bodyClass="p-4">
        <VectorMap data={usersByRegion} height={340} aria-label="Users by region" />
      </Card>
    </div>
  )
}
