import { styled } from '@mui/material'
import { Theme } from '@mui/material/styles'

import { Highlight } from './Highlight'

export const DisableHighlight = styled(Highlight)(
  ({ theme }: { theme: Theme }) => ({
    backgroundColor: theme.palette.action.disabled
  })
)
