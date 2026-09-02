import { useMemo } from 'react'
import { Card, GrowShrinkTag, Table } from '@vn-dylan/ui'
import { Icon, TbIcons } from '@vn-dylan/icons'
import { formatCurrency, formatNumber } from '@vn-dylan/utils'
import { PageHeader } from '@/components/shared/PageHeader'
import { KpiCard } from '@/components/shared/KpiCard'
import { ChartCard } from '@/components/shared/ChartCard'
import { getCoin, holdings, portfolioCost, portfolioPnl, portfolioValue } from '@/mock/crypto'
import { formatPrice } from './cryptoConstants'

/** Crypto asset holdings screen with allocation, value and unrealised P&L. */
export function AssetsView() {
  const holdingRows = useMemo(
    () =>
      holdings
        .map((holding) => {
          const coin = getCoin(holding.symbol)
          const value = coin ? holding.amount * coin.price : 0
          const cost = holding.amount * holding.costBasis
          const pnl = value - cost
          const pnlPercent = cost > 0 ? (pnl / cost) * 100 : 0
          return { ...holding, coin, value, cost, pnl, pnlPercent }
        })
        .filter((holding) => holding.coin != null),
    [],
  )
  const totalValue = portfolioValue
  const totalCost = portfolioCost
  const pnl = portfolioPnl
  const pnlPercent = totalCost > 0 ? (pnl / totalCost) * 100 : 0

  return (
    <div className="space-y-6">
      <PageHeader title="Assets" description="Portfolio holdings, cost basis and current value." />

      <div className="grid gap-4 sm:grid-cols-3">
        <KpiCard
          label="Total value"
          value={formatCurrency(totalValue)}
          icon={<Icon as={TbIcons.TbWallet} size={18} />}
        />
        <KpiCard
          label="Total cost"
          value={formatCurrency(totalCost)}
          icon={<Icon as={TbIcons.TbReceipt} size={18} />}
        />
        <KpiCard
          label="Unrealised P&L"
          value={
            <span className="flex flex-wrap items-center gap-2">
              {formatCurrency(pnl)}
              <GrowShrinkTag value={pnlPercent} suffix="%">
                {pnlPercent.toFixed(2)}
              </GrowShrinkTag>
            </span>
          }
          icon={<Icon as={TbIcons.TbTrendingUp} size={18} />}
        />
      </div>

      <ChartCard
        title="Holdings by current value"
        type="donut"
        height={320}
        series={holdingRows.map((holding) => holding.value)}
        options={{
          labels: holdingRows.map((holding) => holding.symbol),
          legend: { position: 'bottom' },
          tooltip: { y: { formatter: (value: number) => formatCurrency(value) } },
        }}
      />

      <Card bordered header={{ content: 'Holdings', bordered: true }} bodyClass="p-0">
        <Table hoverable>
          <Table.THead>
            <Table.Tr>
              <Table.Th>Asset</Table.Th>
              <Table.Th>Amount</Table.Th>
              <Table.Th>Avg cost</Table.Th>
              <Table.Th>Price</Table.Th>
              <Table.Th>Value</Table.Th>
              <Table.Th>P&L</Table.Th>
            </Table.Tr>
          </Table.THead>
          <Table.TBody>
            {holdingRows.map((holding) => (
              <Table.Tr key={holding.symbol}>
                <Table.Td>
                  <p className="font-semibold text-content">{holding.symbol}</p>
                  <p className="text-xs text-content-muted">{holding.coin?.name}</p>
                </Table.Td>
                <Table.Td>{formatNumber(holding.amount, 2)}</Table.Td>
                <Table.Td>{formatPrice(holding.costBasis)}</Table.Td>
                <Table.Td>{holding.coin ? formatPrice(holding.coin.price) : '-'}</Table.Td>
                <Table.Td>{formatCurrency(holding.value)}</Table.Td>
                <Table.Td>
                  <GrowShrinkTag value={holding.pnlPercent} suffix="%">
                    {holding.pnlPercent.toFixed(2)}
                  </GrowShrinkTag>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.TBody>
        </Table>
      </Card>
    </div>
  )
}
