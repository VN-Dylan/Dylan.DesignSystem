import { createContext, useContext } from 'react'
import type { InputGroupSize } from './types'

export interface InputGroupContextValue {
  size?: InputGroupSize
}

export const InputGroupContext = createContext<InputGroupContextValue | null>(null)

export const useInputGroupContext = () => useContext(InputGroupContext)
