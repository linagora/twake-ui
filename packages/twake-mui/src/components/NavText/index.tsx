import { SxProps } from '@mui/material'
import { Theme } from '@mui/material/styles'
import React, { useContext } from 'react'

import { NavPrimaryText } from './NavPrimaryText'
import { NavSecondaryText } from './NavSecondaryText'
import { NavTertiaryText } from './NavTertiaryText'
import { NavTextRoot } from './NavTextRoot'
import { SidebarContext } from '../Sidebar/SidebarContext'

export interface NavTextProps extends React.ComponentPropsWithoutRef<'div'> {
  sx?: SxProps<Theme>
  secondaryText?: React.ReactNode
  tertiaryText?: React.ReactNode
  tertiaryIcon?: React.ReactNode
}

const NavText = React.forwardRef<HTMLDivElement, NavTextProps>(
  (
    { secondaryText, tertiaryText, tertiaryIcon, children, sx, ...rest },
    ref
  ) => {
    const disableMobileView = useContext(SidebarContext)

    return (
      <NavTextRoot ref={ref} sx={sx} {...rest}>
        <NavPrimaryText disableMobileView={disableMobileView}>
          {children}
        </NavPrimaryText>
        {secondaryText && <NavSecondaryText>{secondaryText}</NavSecondaryText>}
        {(tertiaryText || tertiaryIcon) && (
          <NavTertiaryText>
            {tertiaryIcon}
            {tertiaryText}
          </NavTertiaryText>
        )}
      </NavTextRoot>
    )
  }
)

NavText.displayName = 'NavText'

export default NavText
