import {
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react'
import { forwardRef, useEffect, useId, useState } from 'react'
import { classNames } from '@vn-dylan/utils'
import { Portal } from '../_internal/Portal'
import { composeRefs } from '../_internal/composeRefs'
import { normalizeFloatingPlacement } from '../_internal/floatingPlacement'
import { floatingAutoUpdate, getFloatingMiddleware } from '../_internal/floatingRuntime'
import type { TooltipProps } from './types'
import './Tooltip.scss'

/**
 * Tooltip displays contextual information when the trigger is hovered or
 * focused.
 */
export const Tooltip = forwardRef<HTMLSpanElement, TooltipProps>(function Tooltip(
  {
    disabled = false,
    open = false,
    placement = 'top',
    title = '',
    wrapperClass,
    className,
    children,
    ...rest
  },
  ref,
) {
  const tooltipId = useId()
  const [visible, setVisible] = useState(open)
  const hasContent = title != null && title !== ''

  useEffect(() => {
    setVisible(open)
  }, [open])

  const { refs, floatingStyles, context } = useFloating({
    open: visible && !disabled && hasContent,
    onOpenChange: setVisible,
    placement: normalizeFloatingPlacement(placement),
    whileElementsMounted: floatingAutoUpdate,
    middleware: getFloatingMiddleware(8),
  })

  const hover = useHover(context, { enabled: !disabled && hasContent, move: false })
  const focus = useFocus(context, { enabled: !disabled && hasContent })
  const dismiss = useDismiss(context)
  const role = useRole(context, { role: 'tooltip' })
  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss, role])

  const shown = visible && !disabled && hasContent

  return (
    <>
      <span
        ref={composeRefs(ref, refs.setReference)}
        data-open={shown || undefined}
        className={classNames('dyl-tooltip__wrapper', wrapperClass, className)}
        {...getReferenceProps({
          'aria-describedby': shown ? tooltipId : undefined,
          ...rest,
        })}
      >
        {children}
      </span>
      {shown && (
        <Portal>
          <div
            id={tooltipId}
            ref={refs.setFloating}
            className="dyl-tooltip"
            style={floatingStyles}
            {...getFloatingProps()}
          >
            {title}
          </div>
        </Portal>
      )}
    </>
  )
})
