import { createContext, useContext } from 'react'
import type { MouseEvent } from 'react'
import type { CheckboxValue } from './types'

export interface CheckboxGroupContextValue {
  value: CheckboxValue[]
  name?: string
  disabled?: boolean
  color?: string
  checkboxClass?: string
  setValue: (value: CheckboxValue, checked: boolean, event: MouseEvent<HTMLInputElement>) => void
}

const CheckboxGroupContext = createContext<CheckboxGroupContextValue | null>(null)

export const CheckboxGroupProvider = CheckboxGroupContext.Provider

export const useCheckboxGroupContext = () => useContext(CheckboxGroupContext)
