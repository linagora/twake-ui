import { styled, Theme } from '@mui/material/styles'

export const NavIndicator = styled('div')(({ theme }: { theme: Theme }) => ({
  width: 10,
  height: 10,
  borderRadius: '50%',
  backgroundColor: theme.vars.palette.error.main
}))
