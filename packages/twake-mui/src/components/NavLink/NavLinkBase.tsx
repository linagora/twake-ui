import cx from 'classnames'
import React, { forwardRef, useContext } from 'react'

import { SidebarContext } from '../Sidebar/SidebarContext'
import { NavLinkRoot } from './NavLinkRoot'

export interface NavLinkBaseProps extends React.ComponentPropsWithoutRef<'div'> {
  selected?: boolean
}

export const NavLinkBase = forwardRef<HTMLDivElement, NavLinkBaseProps>(
  ({ selected, onClick, onKeyDown, className, children, ...rest }, ref) => {
    const disableMobileView = useContext(SidebarContext)

    return (
      <NavLinkRoot
        ref={ref}
        disableMobileView={disableMobileView}
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
          if (onKeyDown) {
            onKeyDown(e)
          }
          if (
            e.target === e.currentTarget &&
            !e.defaultPrevented &&
            (e.key === 'Enter' || e.key === ' ')
          ) {
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
