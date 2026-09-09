export interface MarketingAction {
  label: string
  onClick?: () => void
  href?: string
}

export const runMarketingAction = ({ href, onClick }: MarketingAction) => {
  if (onClick) {
    onClick()
    return
  }

  if (href && typeof window !== 'undefined') {
    window.location.href = href
  }
}
