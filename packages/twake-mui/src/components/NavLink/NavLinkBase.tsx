import cx from 'classnames'
import React, { forwardRef } from 'react'

import { NavLinkRoot } from './NavLinkRoot'

export interface NavLinkBaseProps extends React.ComponentPropsWithoutRef<'div'> {
  selected?: boolean
}

export const NavLinkBase = forwardRef<HTMLDivElement, NavLinkBaseProps>(
  ({ selected, onClick, onKeyDown, className, children, ...rest }, ref) => {
    return (
      <NavLinkRoot
        ref={ref}
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
          if (onKeyDown) {
            onKeyDown(e)
          }
          if (!e.defaultPrevented && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault()
            e.currentTarget.click()
          }
        }}
        className={cx(className, { active: selected })}
        {...rest}
      >
        {children}
      </NavLinkRoot>
    )
  }
)
NavLinkBase.displayName = 'NavLinkBase'
