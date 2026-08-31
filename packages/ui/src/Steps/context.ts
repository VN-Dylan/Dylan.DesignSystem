import { createContext, useContext } from 'react'
import type { StepsStatus } from './types'

export interface StepsContextValue {
  current: number
  status: StepsStatus
  vertical: boolean
  onChange?: (index: number) => void
}

const StepsContext = createContext<StepsContextValue | null>(null)

export const StepsProvider = StepsContext.Provider

export const useStepsContext = () => {
  const context = useContext(StepsContext)
  if (!context) throw new Error('Steps.Item must be used within Steps')
  return context
}
