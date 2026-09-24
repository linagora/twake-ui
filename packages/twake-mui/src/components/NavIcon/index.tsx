import { Icon, IconProps } from '@linagora/twake-icons'
import { ListItemIcon, ListItemIconProps } from '@mui/material'
import { styled, Theme } from '@mui/material/styles'
import React from 'react'

const NavIconRoot = styled(ListItemIcon)(({ theme }: { theme: Theme }) => ({
  minWidth: 0,
  width: 'auto',
  height: 'auto',
  marginRight: 12,
  color: theme.vars.palette.text.primary,
  [theme.breakpoints.down('lg')]: {
    display: 'block',
    marginRight: 0,
    color: theme.vars.palette.text.secondary,
    '& svg': { margin: '4px auto 5px', width: 16, height: 16 }
  }
}))

export interface NavIconProps extends ListItemIconProps {
  icon: IconProps['icon']
}

export const NavIcon = ({
  icon,
  ...props
}: NavIconProps): React.ReactElement => (
  <NavIconRoot {...props}>
    <Icon icon={icon} aria-hidden="true" focusable="false" />
  </NavIconRoot>
)
