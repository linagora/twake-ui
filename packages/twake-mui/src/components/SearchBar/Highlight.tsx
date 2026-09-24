import { styled } from '@mui/material'
import { Theme } from '@mui/material/styles'

export const Highlight = styled('span')(({ theme }: { theme: Theme }) => ({
  overflow: 'hidden',
  position: 'absolute',
  top: -1,
  right: -1,
  bottom: -1,
  left: -1,
  borderRadius: 'inherit',
  opacity: 0,
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.short
  })
}))
