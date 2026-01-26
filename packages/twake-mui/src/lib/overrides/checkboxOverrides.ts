import { Components } from '@mui/material/styles'

export const checkboxOverrides = (): Components['MuiCheckbox'] => {
  return {
    styleOverrides: {
      root: {
        '&.MuiCheckbox-sizeSmall': {
          padding: '6px'
        }
      }
    }
  }
}
