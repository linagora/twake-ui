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
            },
            '&.MuiInputBase-sizeSmall': {
              paddingTop: '8px',
              paddingBottom: '8px',
              paddingLeft: '16px',
              '& .MuiAutocomplete-input': {
                padding: '0px 4px 0px 8px'
              }
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
