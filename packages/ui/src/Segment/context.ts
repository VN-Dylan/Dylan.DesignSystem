import { createContext, useContext } from 'react'
import type { SegmentSelectionType, SegmentSize, SegmentValue } from './types'

export interface SegmentContextValue {
  value: SegmentValue
  selectionType: SegmentSelectionType
  size: SegmentSize
  isActive: (value: string) => boolean
  setValue: (value: string) => void
}

const SegmentContext = createContext<SegmentContextValue | null>(null)

export const SegmentProvider = SegmentContext.Provider

export const useSegmentContext = () => {
  const context = useContext(SegmentContext)
  if (!context) throw new Error('Segment.Item must be used within Segment')
  return context
}
