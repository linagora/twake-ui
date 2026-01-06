import { Components } from '@mui/material/styles'

import { radius } from '../radius'

export const popoverOverrides = (): Components['MuiPopover'] => {
  return {
    styleOverrides: {
      paper: {
        borderRadius: radius.md,
        boxShadow:
          '0 1px 3px 0 rgba(0, 0, 0, 0.30), 0 4px 8px 3px rgba(0, 0, 0, 0.15)'
      }
    }
  }
}
