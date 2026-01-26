import { Components } from '@mui/material/styles'

import { radius } from '../radius'

export const textFieldOverrides = (): Components['MuiTextField'] => {
  return {
    defaultProps: {
      size: 'medium'
    },
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: radius.sm,
          '& fieldset': {
            borderRadius: radius.sm
          }
        }
      }
    }
  }
}

export const outlinedInputOverrides = (): Components['MuiOutlinedInput'] => {
  return {
    styleOverrides: {
      root: {
        borderRadius: radius.sm,
        '&.Mui-focused fieldset': {
          borderWidth: '1px'
        },
        '& input::placeholder': {
          color: '#8C9CAF',
          opacity: 1
        },
        '& .MuiSvgIcon-root': {
          fontSize: '18px'
        }
      },
      input: {
        padding: '11px 16px', // Default medium: 48px height
        height: 'auto',
        lineHeight: '24px'
      },
      inputSizeSmall: {
        padding: '8px 16px',
        fontSize: '14px',
        fontWeight: 400,
        lineHeight: '20px',
        minHeight: '26px'
      }
    },
    variants: [
      {
        props: { size: 'large' },
        style: {
          '& .MuiOutlinedInput-input': {
            padding: '14px 16px' // Large: 54px height
          }
        }
      }
    ]
  }
}

export const inputBaseOverrides = (): Components['MuiInputBase'] => {
  return {
    styleOverrides: {
      root: {
        '&.MuiInputBase-sizeLarge': {
          fontSize: '16px'
        }
      }
    }
  }
}

export const selectOverrides = (): Components['MuiSelect'] => {
  return {
    styleOverrides: {
      root: {
        '&.MuiOutlinedInput-root': {
          '&.MuiInputBase-sizeSmall': {
            '& .MuiSelect-select': {
              padding: '11px 16px',
              '&:has(svg)': {
                padding: '9px 16px'
              }
            }
          }
        }
      }
    }
  }
}
