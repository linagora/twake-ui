import { Icon, IconProps } from '@linagora/twake-icons'
import { ListItemIcon, ListItemIconProps } from '@mui/material'
import { styled } from '@mui/material/styles'
import React, { useContext } from 'react'

import { SidebarContext } from '../Sidebar/SidebarContext'

const NavIconRoot = styled(ListItemIcon, {
  shouldForwardProp: prop => prop !== 'disableMobileView'
})<{ disableMobileView?: boolean }>(({ theme, disableMobileView }) => ({
  minWidth: 0,
  width: 'auto',
  height: 'auto',
  marginRight: 12,
  color: theme.vars.palette.text.primary,
  ...(!disableMobileView && {
    [theme.breakpoints.down('lg')]: {
      display: 'block',
      marginRight: 0,
      color: theme.vars.palette.text.secondary,
      '& svg': { margin: '4px auto 5px', width: 16, height: 16 }
    }
  })
}))

export interface NavIconProps extends ListItemIconProps {
  icon: IconProps['icon']
}

export const NavIcon = ({
  icon,
  ...props
}: NavIconProps): React.ReactElement => {
  const disableMobileView = useContext(SidebarContext)

  return (
    <NavIconRoot disableMobileView={disableMobileView} {...props}>
      <Icon icon={icon} aria-hidden="true" focusable="false" />
    </NavIconRoot>
  )
}
