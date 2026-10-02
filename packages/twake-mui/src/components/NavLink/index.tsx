import { Icon, Dropdown } from '@linagora/twake-icons'
import cx from 'classnames'
import React, { forwardRef, useState } from 'react'

import { NavLinkRoot } from './NavLinkRoot'

export interface NavLinkProps extends React.ComponentPropsWithoutRef<'div'> {
  hasDropdown?: boolean
  selected?: boolean
  onToggle?: React.MouseEventHandler<HTMLDivElement>
}

export const NavLink = forwardRef<HTMLDivElement, NavLinkProps>(
  (
    { hasDropdown, selected, onToggle, onClick, className, children, ...rest },
    ref
  ) => {
    const [open, setOpen] = useState(false)

    const handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
      if (hasDropdown) {
        setOpen(prev => !prev)
        if (onToggle) {
          onToggle(e)
        }
      }
      if (onClick) {
        onClick(e)
      }
    }

    return (
      <NavLinkRoot
        ref={ref}
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            e.currentTarget.click()
          }
        }}
        aria-expanded={hasDropdown ? open : undefined}
        className={cx(className, { active: selected })}
        {...rest}
      >
        {children}
        {hasDropdown && (
          <Icon icon={Dropdown} rotate={open ? 0 : -90} size={14} />
        )}
      </NavLinkRoot>
    )
  }
)

NavLink.displayName = 'NavLink'
