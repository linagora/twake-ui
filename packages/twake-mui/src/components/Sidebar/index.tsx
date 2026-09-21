import { GlobalStyles, SxProps } from '@mui/material'
import { styled, Theme } from '@mui/material/styles'
import React from 'react'

export const SIDEBAR_MOBILE_HEIGHT = '--sidebarHeight'

const makeSidebarHeightCSSVar = (
  <GlobalStyles styles={{ ':root': { [SIDEBAR_MOBILE_HEIGHT]: '52px' } }} />
)

export interface SidebarProps extends React.ComponentPropsWithoutRef<'aside'> {
  sx?: SxProps<Theme>
}

const SidebarRoot = styled('aside')(({ theme }: { theme: Theme }) => ({
  width: 236,
  flex: '0 0 auto',
  display: 'flex',
  flexDirection: 'column',
  overflowX: 'hidden',
  overflowY: 'auto',
  backgroundColor: theme.vars.palette.background.default,
  [theme.breakpoints.down('lg')]: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    height: `var(${SIDEBAR_MOBILE_HEIGHT})`,
    boxSizing: 'content-box',
    display: 'block',
    borderTop: `1px solid ${theme.vars.palette.divider}`,
    zIndex: theme.zIndex.appBar
  }
}))

export const Sidebar: React.FC<SidebarProps> = props => (
  <>
    {makeSidebarHeightCSSVar}
    <SidebarRoot {...props} />
  </>
)
