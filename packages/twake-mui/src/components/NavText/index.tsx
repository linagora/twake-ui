import { SxProps } from '@mui/material'
import { Theme } from '@mui/material/styles'
import React, { useContext } from 'react'

import { SidebarContext } from '../Sidebar/SidebarContext.js'
import { NavPrimaryText } from './NavPrimaryText.js'
import { NavSecondaryText } from './NavSecondaryText.js'
import { NavTertiaryText } from './NavTertiaryText.js'
import { NavTextRoot } from './NavTextRoot.js'

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
