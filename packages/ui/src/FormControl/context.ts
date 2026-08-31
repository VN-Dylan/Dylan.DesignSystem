import { createContext, useContext } from 'react'
import type { FormLayout, FormSize } from './types'

export interface FormContextValue {
  layout: FormLayout
  size: FormSize
  labelWidth: string | number
}

export const FormContext = createContext<FormContextValue>({
  layout: 'vertical',
  size: 'md',
  labelWidth: 100,
})

export const useFormContext = () => useContext(FormContext)
