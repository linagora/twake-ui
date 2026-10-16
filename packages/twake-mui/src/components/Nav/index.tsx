import { List } from '@mui/material'
import { styled } from '@mui/material/styles'
import React, { useContext } from 'react'

import { SidebarContext } from '../Sidebar/SidebarContext'

const NavRoot = styled(List, {
  shouldForwardProp: prop => prop !== 'disableMobileView'
})<{ disableMobileView: boolean }>(({ theme, disableMobileView }) => ({
  margin: '24px 0',
  padding: 0,
  ...(!disableMobileView && {
    [theme.breakpoints.down('lg')]: {
      display: 'flex',
      justifyContent: 'space-around',
      margin: '6px 0 4px'
    }
  })
}))

export type NavProps = Omit<
  React.ComponentProps<typeof NavRoot>,
  'disableMobileView'
>

export const Nav = (props: NavProps): React.ReactElement => {
  const disableMobileView = useContext(SidebarContext)
  return (
    <nav>
      <NavRoot {...props} disableMobileView={disableMobileView} />
    </nav>
  )
}
