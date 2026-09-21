import { SxProps } from '@mui/material'
import { styled, Theme } from '@mui/material/styles'
import React from 'react'

export interface NavTextProps extends React.ComponentPropsWithoutRef<'span'> {
  sx?: SxProps<Theme>
}

// Explicit annotation: declaration emit for styled('span') otherwise
// widens the element props to the whole JSX.IntrinsicElements map.
export const NavText: React.FC<NavTextProps> = styled('span')(
  ({ theme }: { theme: Theme }) => ({
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 500,
    letterSpacing: '.15px',
    [theme.breakpoints.down('lg')]: {
      display: 'block',
      textAlign: 'center',
      whiteSpace: 'nowrap',
      fontSize: theme.typography.pxToRem(12)
    }
  })
)
