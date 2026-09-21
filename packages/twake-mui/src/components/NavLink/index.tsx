import {
  ListItemButton,
  ListItemButtonProps,
  listItemButtonClasses,
  listItemIconClasses
} from '@mui/material'
import { styled, Theme } from '@mui/material/styles'

export type NavLinkProps = ListItemButtonProps

// Cast keeps ListItemButton's `component` generic (react-router NavLink etc.)
export const NavLink = styled(ListItemButton)(
  ({ theme }: { theme: Theme }) => ({
    margin: '0 16px',
    padding: '0 8px',
    height: '100%',
    borderRadius: 8,
    lineHeight: 1.375,
    color: theme.vars.palette.text.primary,
    [`&.${listItemButtonClasses.selected}, &.active`]: {
      color: theme.vars.palette.primary.main,
      backgroundColor: theme.vars.palette.action.selected,
      '&:hover': { backgroundColor: theme.vars.palette.action.selected },
      [`& .${listItemIconClasses.root}`]: {
        color: theme.vars.palette.primary.main
      }
    },
    [theme.breakpoints.down('lg')]: {
      display: 'block',
      height: 'auto',
      margin: 0,
      padding: 0,
      textAlign: 'center',
      fontSize: theme.typography.pxToRem(11),
      lineHeight: '12px',
      color: theme.vars.palette.text.secondary,
      [`&.${listItemButtonClasses.selected}, &.active`]: {
        color: theme.vars.palette.text.primary,
        backgroundColor: 'transparent',
        [`& .${listItemIconClasses.root}`]: {
          color: theme.vars.palette.text.primary
        }
      }
    }
  })
) as typeof ListItemButton
