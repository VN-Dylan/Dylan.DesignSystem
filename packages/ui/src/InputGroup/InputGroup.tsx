import { forwardRef } from 'react'
import { classNames } from '@dylan-ds/utils'
import { InputGroupContext, useInputGroupContext } from './context'
import type { InputGroupAddonProps, InputGroupProps } from './types'
import './InputGroup.scss'

const Addon = forwardRef<HTMLSpanElement, InputGroupAddonProps>(function InputGroupAddon(
  { size, className, ...rest },
  ref,
) {
  const inherited = useInputGroupContext()?.size

  return (
    <span
      ref={ref}
      data-size={size ?? inherited}
      className={classNames('dyl-input-group__addon', className)}
      {...rest}
    />
  )
})

const InputGroupRoot = forwardRef<HTMLDivElement, InputGroupProps>(function InputGroup(
  { size, className, children, ...rest },
  ref,
) {
  return (
    <InputGroupContext.Provider value={{ size }}>
      <div
        ref={ref}
        data-size={size}
        className={classNames('dyl-input-group', className)}
        {...rest}
      >
        {children}
      </div>
    </InputGroupContext.Provider>
  )
})

/**
 * InputGroup chains input-related controls into one row.
 */
export const InputGroup = Object.assign(InputGroupRoot, { Addon })
