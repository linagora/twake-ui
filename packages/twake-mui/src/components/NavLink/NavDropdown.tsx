import { Icon, Dropdown } from '@linagora/twake-icons'
import { useTheme } from '@mui/material/styles'
import React, { forwardRef } from 'react'

import { NavLinkBase, NavLinkBaseProps } from './NavLinkBase'

export interface NavDropdownProps extends NavLinkBaseProps {
  open?: boolean
  onToggle?: React.MouseEventHandler<HTMLDivElement>
}

export const NavDropdown = forwardRef<HTMLDivElement, NavDropdownProps>(
  ({ open, onToggle, onClick, children, ...rest }, ref) => {
    const theme = useTheme()
    
    const handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
      if (onToggle) {
        onToggle(e)
      }
      if (onClick) {
        onClick(e)
      }
    }

    return (
      <NavLinkBase
        ref={ref}
        onClick={handleClick}
        aria-expanded={open}
        {...rest}
      >
        {children}
        <Icon
          className="u-ml-half"
          icon={Dropdown}
          rotate={open ? 0 : -90}
          size={14}
          color={theme.vars.palette.text.primary}
        />
      </NavLinkBase>
    )
  }
)
NavDropdown.displayName = 'NavDropdown'
