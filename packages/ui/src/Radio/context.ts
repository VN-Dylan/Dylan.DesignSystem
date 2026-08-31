import { createContext, useContext } from 'react'
import type { MouseEvent } from 'react'
import type { RadioValue } from './types'

export interface RadioGroupContextValue {
  value?: RadioValue
  name: string
  disabled?: boolean
  color?: string
  radioClass?: string
  setValue: (value: RadioValue, event: MouseEvent<HTMLInputElement>) => void
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null)

export const RadioGroupProvider = RadioGroupContext.Provider

export const useRadioGroupContext = () => useContext(RadioGroupContext)
