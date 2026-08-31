import type { RouteObject } from 'react-router-dom'
import { AssetsView } from './AssetsView'
import { CoinDetailView } from './CoinDetailView'
import { CryptoDashboardView } from './CryptoDashboardView'
import { KycView } from './KycView'
import { MarketView } from './MarketView'
import { SpotTradeView } from './SpotTradeView'

/** Routes for the `crypto` area. Placeholders are replaced as screens land. */
export const cryptoRoutes: RouteObject[] = [
  { path: '/crypto/dashboard', element: <CryptoDashboardView /> },
  { path: '/crypto/market', element: <MarketView /> },
  { path: '/crypto/coin/:sym', element: <CoinDetailView /> },
  { path: '/crypto/spot', element: <SpotTradeView /> },
  { path: '/crypto/assets', element: <AssetsView /> },
  { path: '/crypto/kyc', element: <KycView /> },
]
