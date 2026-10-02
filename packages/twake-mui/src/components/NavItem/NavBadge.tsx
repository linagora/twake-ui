import { Badge, badgeClasses } from '@mui/material'
import { styled, Theme } from '@mui/material/styles'

export const NavBadge = styled(Badge)(({ theme }: { theme: Theme }) => ({
  [`& .${badgeClasses.badge}`]: {
    border: 'none',
    position: 'static',
    transform: 'none',
    backgroundColor: theme.vars.palette.action.selected,
    color: theme.vars.palette.text.primary,
    fontWeight: 500
  }
}))
