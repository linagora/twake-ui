import { styled } from '@mui/material/styles'

export const NavPrimaryText = styled('span', {
  shouldForwardProp: prop => prop !== 'disableMobileView'
})<{ disableMobileView?: boolean }>(({ theme, disableMobileView }) => ({
  fontSize: theme.typography.pxToRem(14),
  fontWeight: 500,
  lineHeight: 1.313,
  letterSpacing: '.25px',
  ...(!disableMobileView && {
    [theme.breakpoints.down('lg')]: {
      display: 'block',
      textAlign: 'center',
      whiteSpace: 'nowrap',
      fontSize: theme.typography.pxToRem(12),
      // The design line height is for the sidebar, the bottom bar keeps its rows
      lineHeight: 'inherit'
    }
  })
}))
