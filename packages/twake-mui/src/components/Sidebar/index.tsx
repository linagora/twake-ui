import { SxProps } from '@mui/material'
import { styled, Theme } from '@mui/material/styles'
import React from 'react'

export interface SidebarProps extends React.ComponentPropsWithoutRef<'aside'> {
  sx?: SxProps<Theme>
}

export const Sidebar: React.FC<SidebarProps> = styled('aside')(
  ({ theme }: { theme: Theme }) => ({
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
      height: 52,
      boxSizing: 'content-box',
      display: 'block',
      borderTop: `1px solid ${theme.vars.palette.divider}`,
      zIndex: theme.zIndex.appBar
    }
  })
)
