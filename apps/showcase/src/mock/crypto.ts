/**
 * Mock data for the `crypto` showcase area. Static and deterministic — not
 * real market data.
 */

export interface Coin {
  symbol: string
  name: string
  price: number
  change24h: number
  change7d: number
  marketCap: number
  volume24h: number
  supply: number
  /** 24 hourly points for the sparkline. */
  spark: number[]
}

const wave = (base: number, amp: number, drift: number) =>
  Array.from({ length: 24 }, (_, i) =>
    Number((base + Math.sin(i / 3) * amp + (i / 23) * drift).toFixed(2)),
  )

export const coins: Coin[] = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 68_420.31,
    change24h: 2.14,
    change7d: -3.8,
    marketCap: 1_351_000_000_000,
    volume24h: 28_400_000_000,
    supply: 19_740_000,
    spark: wave(67800, 900, 620),
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    price: 3_512.77,
    change24h: 3.42,
    change7d: 1.6,
    marketCap: 422_000_000_000,
    volume24h: 14_100_000_000,
    supply: 120_200_000,
    spark: wave(3440, 70, 72),
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    price: 168.05,
    change24h: -1.27,
    change7d: 8.9,
    marketCap: 78_600_000_000,
    volume24h: 3_900_000_000,
    supply: 467_000_000,
    spark: wave(170, 6, -2),
  },
  {
    symbol: 'BNB',
    name: 'BNB',
    price: 592.4,
    change24h: 0.86,
    change7d: -0.4,
    marketCap: 87_300_000_000,
    volume24h: 1_600_000_000,
    supply: 147_000_000,
    spark: wave(588, 8, 4),
  },
  {
    symbol: 'XRP',
    name: 'XRP',
    price: 0.58,
    change24h: -2.63,
    change7d: -5.1,
    marketCap: 32_400_000_000,
    volume24h: 1_200_000_000,
    supply: 55_900_000_000,
    spark: wave(0.6, 0.02, -0.02),
  },
  {
    symbol: 'ADA',
    name: 'Cardano',
    price: 0.44,
    change24h: 1.05,
    change7d: 2.2,
    marketCap: 15_600_000_000,
    volume24h: 420_000_000,
    supply: 35_400_000_000,
    spark: wave(0.435, 0.01, 0.005),
  },
  {
    symbol: 'DOGE',
    name: 'Dogecoin',
    price: 0.121,
    change24h: 4.81,
    change7d: 12.4,
    marketCap: 17_800_000_000,
    volume24h: 980_000_000,
    supply: 146_000_000_000,
    spark: wave(0.114, 0.006, 0.007),
  },
  {
    symbol: 'AVAX',
    name: 'Avalanche',
    price: 27.9,
    change24h: -0.42,
    change7d: 3.7,
    marketCap: 11_200_000_000,
    volume24h: 340_000_000,
    supply: 401_000_000,
    spark: wave(27.7, 0.8, 0.2),
  },
]

export const getCoin = (symbol: string) =>
  coins.find((c) => c.symbol.toLowerCase() === symbol.toLowerCase())

export const portfolioKpis = {
  totalValue: { value: 128_940, delta: 4.6, spark: [118, 121, 119, 124, 126, 125, 129] },
  pnl24h: { value: 3_210, delta: 2.55 },
  bestPerformer: 'DOGE',
  worstPerformer: 'XRP',
}

export interface Holding {
  symbol: string
  amount: number
  costBasis: number
}

export const holdings: Holding[] = [
  { symbol: 'BTC', amount: 1.24, costBasis: 52_000 },
  { symbol: 'ETH', amount: 12.5, costBasis: 2_900 },
  { symbol: 'SOL', amount: 180, costBasis: 120 },
  { symbol: 'DOGE', amount: 45_000, costBasis: 0.08 },
]

export const allocation = [
  { label: 'BTC', value: 66 },
  { label: 'ETH', value: 24 },
  { label: 'SOL', value: 7 },
  { label: 'DOGE', value: 3 },
]

export interface Trade {
  id: string
  pair: string
  side: 'buy' | 'sell'
  price: number
  amount: number
  time: string
  status: 'filled' | 'open' | 'cancelled'
}

export const recentTrades: Trade[] = [
  {
    id: 'tr-01',
    pair: 'BTC/USDT',
    side: 'buy',
    price: 68_120,
    amount: 0.15,
    time: '2026-08-31T09:41:00Z',
    status: 'filled',
  },
  {
    id: 'tr-02',
    pair: 'ETH/USDT',
    side: 'sell',
    price: 3_540,
    amount: 2.0,
    time: '2026-08-31T08:12:00Z',
    status: 'filled',
  },
  {
    id: 'tr-03',
    pair: 'SOL/USDT',
    side: 'buy',
    price: 165.2,
    amount: 20,
    time: '2026-08-30T22:03:00Z',
    status: 'filled',
  },
  {
    id: 'tr-04',
    pair: 'BTC/USDT',
    side: 'sell',
    price: 69_400,
    amount: 0.05,
    time: '2026-08-30T14:55:00Z',
    status: 'open',
  },
  {
    id: 'tr-05',
    pair: 'DOGE/USDT',
    side: 'buy',
    price: 0.118,
    amount: 10_000,
    time: '2026-08-29T19:20:00Z',
    status: 'cancelled',
  },
]

/** Order-book snapshot for the spot-trade screen. */
export const orderBook = {
  asks: [
    { price: 68_460, size: 0.42 },
    { price: 68_450, size: 1.1 },
    { price: 68_440, size: 0.6 },
    { price: 68_430, size: 2.3 },
    { price: 68_425, size: 0.9 },
  ],
  bids: [
    { price: 68_415, size: 1.4 },
    { price: 68_410, size: 0.7 },
    { price: 68_400, size: 3.1 },
    { price: 68_390, size: 0.5 },
    { price: 68_380, size: 1.8 },
  ],
}

export type KycStep = 'email' | 'identity' | 'address' | 'review'

export const kycProgress: { step: KycStep; label: string; status: 'done' | 'active' | 'todo' }[] = [
  { step: 'email', label: 'Verify email', status: 'done' },
  { step: 'identity', label: 'Identity document', status: 'done' },
  { step: 'address', label: 'Proof of address', status: 'active' },
  { step: 'review', label: 'Compliance review', status: 'todo' },
]

/** Region distribution for the VectorMap on the crypto dashboard. */
export const usersByRegion: Record<string, number> = {
  US: 4200,
  GB: 1800,
  DE: 1500,
  SG: 2600,
  JP: 2100,
  BR: 900,
  IN: 3100,
  AU: 700,
  AE: 1200,
  KR: 1600,
}
