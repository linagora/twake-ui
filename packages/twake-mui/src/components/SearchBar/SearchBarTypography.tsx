import { Typography, styled } from '@mui/material'

export const SearchBarTypography = styled(Typography, {
  shouldForwardProp: prop => prop !== 'hasIcon'
})<{ hasIcon: boolean }>(({ hasIcon }) => ({
  color: 'currentColor',
  opacity: 0.42,
  paddingLeft: !hasIcon ? '1rem' : undefined
}))
