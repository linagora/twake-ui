import { ListItem, listItemButtonClasses } from '@mui/material'
import { styled, Theme } from '@mui/material/styles'
import React from 'react'

export const NavItem = styled(ListItem, {
  shouldForwardProp: prop => prop !== 'secondary'
})<{ secondary?: boolean }>(
  ({ theme, secondary }: { theme: Theme; secondary?: boolean }) => ({
    padding: 0,
    height: 36,
    minHeight: 0,
    [theme.breakpoints.down('lg')]: {
      display: 'block',
      height: 'auto',
      margin: '0 12px',
      flex: '0 0 40px'
    },
    ...(secondary && {
      height: 'auto',
      margin: '3px 0',
      [theme.breakpoints.down('lg')]: { display: 'none' },
      [`& .${listItemButtonClasses.root}`]: {
        margin: '0 16px 0 2.8rem',
        padding: '8px 16px',
        height: 'auto',
        fontSize: theme.typography.pxToRem(14),
        [`&.${listItemButtonClasses.selected}, &.active`]: {
          color: theme.vars.palette.secondary.contrastText,
          backgroundColor: theme.vars.palette.secondary.main
        }
      }
    })
  })
)

export type NavItemProps = React.ComponentProps<typeof NavItem>
