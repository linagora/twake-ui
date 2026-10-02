import { SxProps } from '@mui/material'
import { Theme } from '@mui/material/styles'
import React from 'react'

import { NavPrimaryText } from './NavPrimaryText'
import { NavSecondaryText } from './NavSecondaryText'
import { NavTertiaryText } from './NavTertiaryText'
import { NavTextRoot } from './NavTextRoot'

export interface NavTextProps extends React.ComponentPropsWithoutRef<'div'> {
  sx?: SxProps<Theme>
  secondaryText?: React.ReactNode
  tertiaryText?: React.ReactNode
  tertiaryIcon?: React.ReactNode
}

export const NavText = React.forwardRef<HTMLDivElement, NavTextProps>(
  (
    { secondaryText, tertiaryText, tertiaryIcon, children, sx, ...rest },
    ref
  ) => {
    return (
      <NavTextRoot ref={ref} sx={sx} {...rest}>
        <NavPrimaryText>{children}</NavPrimaryText>
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
