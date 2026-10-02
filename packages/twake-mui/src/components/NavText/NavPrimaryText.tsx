import { styled, Theme } from '@mui/material/styles'

export const NavPrimaryText = styled('span')(({ theme }: { theme: Theme }) => ({
  fontSize: theme.typography.pxToRem(14),
  fontWeight: 500,
  letterSpacing: '.15px',
  [theme.breakpoints.down('lg')]: {
    display: 'block',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    fontSize: theme.typography.pxToRem(12)
  }
}))
