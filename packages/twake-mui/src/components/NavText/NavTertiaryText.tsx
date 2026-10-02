import { styled, Theme } from '@mui/material/styles'

export const NavTertiaryText = styled('span')(
  ({ theme }: { theme: Theme }) => ({
    display: 'flex',
    alignItems: 'center',
    fontSize: theme.typography.pxToRem(11),
    color: theme.vars.palette.text.secondary,
    lineHeight: 1.5,
    fontWeight: 400,
    '& svg': {
      width: 14,
      height: 14,
      marginRight: 4,
      color: 'inherit',
      fill: 'currentColor'
    }
  })
)
