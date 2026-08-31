import { useState } from 'react'

/**
 * Single-open accordion helper for a list of `Collapsible`s.
 *
 * @example
 * const acc = useAccordion('a')
 * <Collapsible open={acc.isOpen('a')} onOpenChange={acc.onOpenChange('a')}>
 */
export function useAccordion(initial: string | null = null) {
  const [openKey, setOpenKey] = useState(initial)
  return {
    isOpen: (key: string) => openKey === key,
    onOpenChange: (key: string) => (next: boolean) => setOpenKey(next ? key : null),
  }
}
