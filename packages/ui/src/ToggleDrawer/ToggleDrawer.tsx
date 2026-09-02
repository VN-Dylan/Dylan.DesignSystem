import { forwardRef, useImperativeHandle, useState } from 'react'
import { classNames } from '@vn-dylan/utils'
import { Button } from '../Button'
import { Drawer } from '../Drawer'
import { NavToggle } from '../NavToggle'
import type { ToggleDrawerProps, ToggleDrawerRef } from './types'
import './ToggleDrawer.scss'

/**
 * ToggleDrawer pairs a navigation toggle button with a modal drawer panel.
 */
export const ToggleDrawer = forwardRef<ToggleDrawerRef, ToggleDrawerProps>(function ToggleDrawer(
  { placement = 'left', title, className, children, ...rest },
  ref,
) {
  const [open, setOpen] = useState(false)

  useImperativeHandle(
    ref,
    () => ({
      handleOpenDrawer: () => setOpen(true),
      handleCloseDrawer: () => setOpen(false),
    }),
    [],
  )

  return (
    <div className={classNames('dyl-toggle-drawer', className)} {...rest}>
      <Button
        aria-expanded={open}
        aria-label="Toggle drawer"
        icon={<NavToggle toggled={open} />}
        onClick={() => setOpen((value) => !value)}
      />
      <Drawer
        isOpen={open}
        placement={placement}
        title={title}
        aria-label={title == null ? 'Navigation drawer' : undefined}
        onClose={() => setOpen(false)}
      >
        {children}
      </Drawer>
    </div>
  )
})
