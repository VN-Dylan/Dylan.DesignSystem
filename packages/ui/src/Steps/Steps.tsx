import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from 'react'
import { classNames } from '@vn-dylan/utils'
import { Icon, TbIcons } from '@vn-dylan/icons'
import { StepsProvider, useStepsContext } from './context'
import type { StepsItemProps, StepsProps, StepsStatus } from './types'
import './Steps.scss'

interface StepsItemInternalProps extends StepsItemProps {
  __index?: number
}

const getItemStatus = (index: number, current: number, status: StepsStatus): StepsStatus => {
  if (index < current) return 'complete'
  if (index === current) return status
  return 'pending'
}

const renderMarker = (status: StepsStatus, index: number, customIcon?: ReactNode | string) => {
  if (customIcon != null) return customIcon
  if (status === 'complete') return <Icon as={TbIcons.TbCheck} />
  if (status === 'error') return '!'
  return index + 1
}

const StepItem = forwardRef<HTMLLIElement, StepsItemInternalProps>(function StepItem(
  { __index = 0, customIcon, description, title, className, children, ...rest },
  ref,
) {
  const context = useStepsContext()
  const itemStatus = getItemStatus(__index, context.current, context.status)
  const isCurrent = __index === context.current
  const clickable = context.onChange != null
  const label = title ?? children ?? `Step ${__index + 1}`

  const content = (
    <>
      <span className="dyl-steps__marker" aria-hidden>
        {renderMarker(itemStatus, __index, customIcon)}
      </span>
      <span className="dyl-steps__body">
        <span className="dyl-steps__title">{label}</span>
        {context.vertical && description != null && (
          <span className="dyl-steps__description">{description}</span>
        )}
      </span>
    </>
  )

  return (
    <li
      ref={ref}
      data-status={itemStatus}
      data-current={isCurrent || undefined}
      data-clickable={clickable || undefined}
      className={classNames('dyl-steps__item', className)}
      {...rest}
    >
      {clickable ? (
        <button
          type="button"
          className="dyl-steps__control"
          aria-current={isCurrent ? 'step' : undefined}
          onClick={() => context.onChange?.(__index)}
        >
          {content}
        </button>
      ) : (
        <div className="dyl-steps__control" aria-current={isCurrent ? 'step' : undefined}>
          {content}
        </div>
      )}
    </li>
  )
})

const StepsRoot = forwardRef<HTMLOListElement, StepsProps>(function StepsRoot(
  { current = 0, onChange, status = 'in-progress', vertical = false, className, children, ...rest },
  ref,
) {
  let index = 0
  const indexedChildren = Children.map(children, (child) => {
    if (!isValidElement(child)) return child
    const next = cloneElement(child as ReactElement<StepsItemInternalProps>, { __index: index })
    index += 1
    return next
  })

  return (
    <StepsProvider value={{ current, status, vertical, onChange }}>
      <ol
        ref={ref}
        data-status={status}
        data-vertical={vertical || undefined}
        className={classNames('dyl-steps', className)}
        {...rest}
      >
        {indexedChildren}
      </ol>
    </StepsProvider>
  )
})

/**
 * Steps displays progress through a sequence of tasks.
 */
export const Steps = Object.assign(StepsRoot, { Item: StepItem })
