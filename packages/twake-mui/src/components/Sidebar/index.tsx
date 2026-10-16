import {
  Drawer,
  DrawerProps,
  GlobalStyles,
  SxProps,
  Theme
} from '@mui/material'
import { styled } from '@mui/material/styles'
import React from 'react'

import { SidebarContext } from './SidebarContext'
import { useBreakpoints } from '../../hooks/useBreakpoints'

export const SIDEBAR_MOBILE_HEIGHT = '--sidebarHeight'

export interface SidebarProps extends React.ComponentPropsWithoutRef<'aside'> {
  sx?: SxProps<Theme>
  /** Mobile presentation: a bottom bar or a temporary left drawer. */
  anchor?: 'bottom' | 'left'
  open?: boolean
  onClose?: DrawerProps['onClose']
}

const SidebarRoot = styled('aside', {
  shouldForwardProp: prop => prop !== 'anchor'
})<{ anchor: SidebarProps['anchor'] }>(({ theme, anchor }) => ({
  width: 236,
  flex: '0 0 auto',
  display: 'flex',
  flexDirection: 'column',
  overflowX: 'hidden',
  overflowY: 'auto',
  backgroundColor: theme.vars.palette.background.default,
  ...(anchor === 'bottom' && {
    [theme.breakpoints.down('lg')]: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      height: `var(${SIDEBAR_MOBILE_HEIGHT}, 52px)`,
      boxSizing: 'content-box',
      display: 'block',
      borderTop: `1px solid ${theme.vars.palette.divider}`,
      zIndex: theme.zIndex.appBar
    }
  })
}))

const SidebarDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: 300,
    maxWidth: 'calc(100vw - 56px)',
    backgroundColor: theme.vars.palette.background.default
  }
}))

export const Sidebar = ({
  children,
  anchor = 'bottom',
  open = false,
  onClose,
  sx,
  ...rest
}: SidebarProps): React.ReactElement => {
  const { isDesktop } = useBreakpoints()

  return (
    <SidebarContext.Provider value={anchor === 'left'}>
      {anchor === 'bottom' && (
        <GlobalStyles
          styles={{ ':root': { [SIDEBAR_MOBILE_HEIGHT]: '52px' } }}
        />
      )}
      {anchor === 'left' && !isDesktop ? (
        <SidebarDrawer
          {...rest}
          variant="temporary"
          anchor="left"
          open={open}
          onClose={onClose}
          sx={sx}
        >
          {children}
        </SidebarDrawer>
      ) : (
        <SidebarRoot anchor={anchor} sx={sx} {...rest}>
          {children}
        </SidebarRoot>
      )}
    </SidebarContext.Provider>
  )
}
