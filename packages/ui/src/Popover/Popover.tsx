import {
  safePolygon,
  useClick,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react'
import {
  cloneElement,
  forwardRef,
  isValidElement,
  type CSSProperties,
  type ReactElement,
} from 'react'
import { classNames, useControllableState } from '@dylan-ds/utils'
import { Portal } from '../_internal/Portal'
import { composeRefs } from '../_internal/composeRefs'
import { normalizeFloatingPlacement } from '../_internal/floatingPlacement'
import { floatingAutoUpdate, getFloatingMiddleware } from '../_internal/floatingRuntime'
import type { PopoverProps } from './types'
import './Popover.scss'

interface TriggerElementProps {
  className?: string
}

type TriggerElement = ReactElement<TriggerElementProps> & { ref?: React.Ref<HTMLElement> }

const isTriggerElement = (node: PopoverProps['renderTrigger']): node is TriggerElement =>
  isValidElement(node)

/**
 * Popover renders flexible floating content anchored to a trigger.
 */
export const Popover = forwardRef<HTMLDivElement, PopoverProps>(function Popover(
  {
    open,
    placement = 'bottom',
    onOpenChange,
    renderTrigger,
    title = '',
    trigger = 'click',
    width,
    className,
    style,
    children,
    ...rest
  },
  ref,
) {
  const [visible, setVisible] = useControllableState({
    value: open,
    defaultValue: false,
    onChange: onOpenChange,
  })

  const { refs, floatingStyles, context } = useFloating({
    open: visible,
    onOpenChange: setVisible,
    placement: normalizeFloatingPlacement(placement),
    whileElementsMounted: floatingAutoUpdate,
    middleware: getFloatingMiddleware(8),
  })

  const click = useClick(context, { enabled: trigger === 'click' })
  const hover = useHover(context, {
    enabled: trigger === 'hover',
    handleClose: safePolygon(),
    move: false,
  })
  const focus = useFocus(context, { enabled: trigger === 'hover' })
  const dismiss = useDismiss(context)
  const role = useRole(context, { role: 'dialog' })
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    hover,
    focus,
    dismiss,
    role,
  ])

  const panelStyle = {
    ...style,
    ...floatingStyles,
    width: width ?? style?.width,
  } satisfies CSSProperties

  const triggerNode = renderTrigger ?? title

  const reference = isTriggerElement(triggerNode) ? (
    cloneElement(
      triggerNode,
      getReferenceProps({
        ...triggerNode.props,
        ref: composeRefs(triggerNode.ref, refs.setReference),
        'aria-haspopup': 'dialog',
        'aria-expanded': visible,
        className: classNames('dyl-popover__anchor', triggerNode.props.className),
      }),
    )
  ) : (
    <button
      ref={refs.setReference}
      type="button"
      className="dyl-popover__trigger"
      {...getReferenceProps({
        'aria-haspopup': 'dialog',
        'aria-expanded': visible,
        'aria-label': title === '' ? 'Toggle popover' : undefined,
      })}
    >
      {triggerNode}
    </button>
  )

  return (
    <>
      {reference}
      {visible && (
        <Portal>
          <div
            ref={composeRefs(ref, refs.setFloating)}
            tabIndex={-1}
            className={classNames('dyl-popover', className)}
            style={panelStyle}
            aria-label={typeof title === 'string' && title ? title : undefined}
            {...getFloatingProps(rest)}
          >
            {children}
          </div>
        </Portal>
      )}
    </>
  )
})
