import { styled, Theme } from '@mui/material/styles'
import React from 'react'

export const Sidebar = styled('aside', {
  shouldForwardProp: prop => prop !== 'border'
})<{ border?: boolean }>(
  ({ theme, border }: { theme: Theme; border?: boolean }) => ({
    width: 236,
    flex: '0 0 auto',
    display: 'flex',
    flexDirection: 'column',
    overflowX: 'hidden',
    overflowY: 'auto',
    backgroundColor: theme.palette.background.default,
    ...(border && { borderRight: `1px solid ${theme.palette.divider}` }),
    [theme.breakpoints.down('lg')]: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      height: 52,
      display: 'block',
      border: 0,
      borderTop: `1px solid ${theme.palette.divider}`,
      zIndex: theme.zIndex.appBar
    }
  })
)

export type SidebarProps = React.ComponentProps<typeof Sidebar>
