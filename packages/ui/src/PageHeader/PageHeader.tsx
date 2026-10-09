import { forwardRef } from 'react'
import { classNames } from '@vn-dylan/utils'
import { Inline } from '../Inline'
import { Stack } from '../Stack'
import type { PageHeaderProps } from './types'
import './PageHeader.scss'

/** PageHeader composes breadcrumbs, title copy, back navigation, and page actions. */
export const PageHeader = forwardRef<HTMLElement, PageHeaderProps>(function PageHeader(
  { title, description, actions, breadcrumb, back, as: Heading = 'h1', className, ...rest },
  ref,
) {
  return (
    <header ref={ref} className={classNames('dyl-page-header', className)} {...rest}>
      <Stack gap="base">
        {breadcrumb != null && <div className="dyl-page-header__breadcrumb">{breadcrumb}</div>}
        <Inline align="start" justify="between" wrap gap="base">
          <Inline align="start" gap="base" className="dyl-page-header__lead">
            {back != null && <div className="dyl-page-header__back">{back}</div>}
            <Stack gap="tight" className="dyl-page-header__copy">
              <Heading className="dyl-page-header__title">{title}</Heading>
              {description != null && (
                <div className="dyl-page-header__description">{description}</div>
              )}
            </Stack>
          </Inline>
          {actions != null && (
            <Inline gap="tight" wrap className="dyl-page-header__actions">
              {actions}
            </Inline>
          )}
        </Inline>
      </Stack>
    </header>
  )
})
