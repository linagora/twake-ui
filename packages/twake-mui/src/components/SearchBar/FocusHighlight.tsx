import { styled } from '@mui/material'
import { Theme } from '@mui/material/styles'

import { Highlight } from './Highlight'

export const FocusHighlight = styled(Highlight)(
  ({ theme }: { theme: Theme }) => ({
    pointerEvents: 'none',
    backgroundColor: theme.palette.action.hover
  })
)
