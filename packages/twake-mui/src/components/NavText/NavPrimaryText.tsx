import { styled } from '@mui/material/styles'

export const NavPrimaryText = styled('span', {
  shouldForwardProp: prop => prop !== 'disableMobileView'
})<{ disableMobileView?: boolean }>(({ theme, disableMobileView }) => ({
  fontSize: theme.typography.pxToRem(14),
  fontWeight: 500,
  letterSpacing: '.15px',
  ...(!disableMobileView && {
    [theme.breakpoints.down('lg')]: {
      display: 'block',
      textAlign: 'center',
      whiteSpace: 'nowrap',
      fontSize: theme.typography.pxToRem(12)
    }
  })
}))
