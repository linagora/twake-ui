import { Divider, ListItem } from '@mui/material'
import cx from 'classnames'
import React, { forwardRef } from 'react'

import { NavBadge } from './NavBadge'
import { NavIndicator } from './NavIndicator'
import { NavItemActions } from './NavItemActions'
import { NavItemRoot } from './NavItemRoot'

export interface NavItemProps extends React.ComponentProps<typeof ListItem> {
  variant?: 'primary' | 'secondary' | 'tertiary'
  selected?: boolean
  badge?: React.ReactNode
  hasIndicator?: boolean
  divider?: boolean
}

export const NavItem = forwardRef<HTMLLIElement, NavItemProps>((props, ref) => {
  const {
    variant = 'primary',
    selected,
    children,
    className,
    badge,
    hasIndicator,
    secondaryAction,
    divider,
    ...rest
  } = props

  return (
    <>
      <NavItemRoot
        ref={ref}
        variant={variant}
        className={cx(className, selected && 'Mui-selected')}
        {...rest}
      >
        {children}
        {(hasIndicator || badge || secondaryAction) && (
          <NavItemActions>
            {hasIndicator && <NavIndicator />}
            {badge && <NavBadge badgeContent={badge} />}
            {secondaryAction}
          </NavItemActions>
        )}
      </NavItemRoot>
      {divider && <Divider className="u-mt-half u-mh-1" />}
    </>
  )
})

NavItem.displayName = 'NavItem'
