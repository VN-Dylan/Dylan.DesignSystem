import { forwardRef } from 'react'
import { useDebounce } from '@vn-dylan/utils'
import { Input } from '../Input'
import type { DebounceInputProps, DebounceInputChangeEvent } from './types'
import './DebounceInput.scss'

/**
 * DebounceInput wraps Input and delays onChange until typing pauses.
 */
export const DebounceInput = forwardRef<HTMLInputElement | HTMLTextAreaElement, DebounceInputProps>(
  function DebounceInput({ wait = 500, onChange, ...rest }, ref) {
    const debouncedChange = useDebounce((event: DebounceInputChangeEvent) => {
      onChange?.(event)
    }, wait)

    return <Input ref={ref} onChange={debouncedChange} {...rest} />
  },
)
