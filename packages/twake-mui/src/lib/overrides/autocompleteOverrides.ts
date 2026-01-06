import { Components } from '@mui/material/styles'

import { radius } from '../radius'

export const autocompleteOverrides = (): Components['MuiAutocomplete'] => {
  return {
    styleOverrides: {
      root: {
        // Using "&&" to increase CSS specificity
        '&&': {
          '& .MuiOutlinedInput-root': {
            paddingLeft: '16px',
            borderRadius: radius.sm,
            '& fieldset.MuiOutlinedInput-notchedOutline': {
              borderRadius: radius.sm
            }
          }
        }
      },
      // Styling for chips in Autocomplete
      tag: {
        margin: '2px'
      }
    }
  }
}
