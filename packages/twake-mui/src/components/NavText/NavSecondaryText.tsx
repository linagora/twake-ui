import { styled, Theme } from '@mui/material/styles'

export const NavSecondaryText = styled('span')(
  ({ theme }: { theme: Theme }) => ({
    display: 'block',
    fontSize: theme.typography.pxToRem(12),
    color: theme.vars.palette.text.secondary,
    lineHeight: 1.5,
    fontWeight: 400
  })
)
