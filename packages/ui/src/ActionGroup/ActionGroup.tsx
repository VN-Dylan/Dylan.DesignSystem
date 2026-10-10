import { forwardRef } from 'react'
import { classNames } from '@vn-dylan/utils'
import type { ActionGroupProps, ActionGroupStartProps } from './types'
import './ActionGroup.scss'

const ActionGroupRoot = forwardRef<HTMLDivElement, ActionGroupProps>(function ActionGroup(
  { align = 'end', stackOnMobile = true, divided = false, sticky = false, className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      role="group"
      data-align={align}
      data-stack={stackOnMobile || undefined}
      data-divided={divided || sticky || undefined}
      data-sticky={sticky || undefined}
      className={classNames('dyl-action-group', className)}
      {...rest}
    />
  )
})

const Start = forwardRef<HTMLDivElement, ActionGroupStartProps>(function ActionGroupStart(
  { className, ...rest },
  ref,
) {
  return <div ref={ref} className={classNames('dyl-action-group__start', className)} {...rest} />
})

/**
 * ActionGroup fixes where actions go. Write children in reading order —
 * secondary first, primary last — and put destructive actions in
 * `ActionGroup.Start` so they sit apart from Save/Cancel.
 */
export const ActionGroup = Object.assign(ActionGroupRoot, { Start })
