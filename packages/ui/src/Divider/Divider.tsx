import { forwardRef } from 'react'
import { classNames } from '@vn-dylan/utils'
import type { DividerProps } from './types'
import './Divider.scss'

/** Divider creates a visual separation between content sections. */
export const Divider = forwardRef<HTMLDivElement, DividerProps>(function Divider(
  {
    orientation = 'horizontal',
    spacing = 'base',
    label,
    className = '',
    role = 'separator',
    ...rest
  },
  ref,
) {
  const labelled = orientation === 'horizontal' && label != null
  const semantic = role !== 'none' && role !== 'presentation'

  return (
    <div
      ref={ref}
      role={role}
      aria-orientation={semantic ? orientation : undefined}
      data-orientation={orientation}
      data-spacing={spacing}
      data-labelled={labelled || undefined}
      className={classNames('dyl-divider', className)}
      {...rest}
    >
      {labelled && (
        <>
          <span className="dyl-divider__line" aria-hidden />
          <span className="dyl-divider__label">{label}</span>
          <span className="dyl-divider__line" aria-hidden />
        </>
      )}
    </div>
  )
})
