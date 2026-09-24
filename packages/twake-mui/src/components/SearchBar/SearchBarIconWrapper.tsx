import { styled } from '@mui/material'
import { Theme } from '@mui/material/styles'

export const SearchBarIconWrapper = styled('div')(
  ({ theme }: { theme: Theme }) => ({
    color: theme.palette.text.secondary,
    padding: '0 1rem',
    display: 'flex'
  })
)
