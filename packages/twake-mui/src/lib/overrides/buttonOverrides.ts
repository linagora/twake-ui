import { Theme, Components, alpha } from '@mui/material/styles'

import paletteJson from '../palette.json'
import { radius } from '../radius'
import { PaletteJson } from '../types'

const paletteData = paletteJson as PaletteJson

export const buttonOverrides = (theme: Theme): Components['MuiButton'] => {
  return {
    styleOverrides: {
      root: {
        borderRadius: radius.pill,
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none'
        },
        '&:active': {
          boxShadow: 'none'
        },
        '&:focus': {
          boxShadow: 'none'
        }
      },
      contained: {
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none'
        },
        '&:active': {
          boxShadow: 'none'
        },
        '&:focus': {
          boxShadow: 'none'
        }
      },
      containedSecondary: {
        backgroundColor: theme.palette.secondary.main,
        color: alpha(theme.palette.text.primary, 0.9),
        borderRadius: radius.sm,
        '&:hover': {
          backgroundColor: paletteData.Secondary[700],
          color: alpha(theme.palette.text.primary, 0.9)
        },
        '&.Mui-disabled': {
          backgroundColor: theme.palette.action.disabledBackground
        }
      },
      outlined: {
        backgroundColor: '#fff',
        borderColor: alpha(paletteData.Grey.A900, 0.28),
        color: alpha(theme.palette.text.primary, 0.9),
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.main, 0.04),
          color: theme.palette.primary.main,
          borderColor: alpha(theme.palette.primary.main, 0.32)
        },
        '&.Mui-disabled': {
          backgroundColor: '#fff',
          color: alpha(theme.palette.grey[900], 0.38),
          borderColor: alpha(paletteData.Grey.A900, 0.28)
        }
      },
      text: {
        // Text button overrides
      },
      sizeSmall: {
        padding: '6px 16px'
      },
      containedSizeSmall: {
        paddingTop: '7px',
        paddingBottom: '7px'
      },
      sizeMedium: {
        padding: '8px 24px'
      },
      containedSizeMedium: {
        paddingTop: '9px',
        paddingBottom: '9px'
      },
      sizeLarge: {
        padding: '12px 32px'
      },
      containedSizeLarge: {
        paddingTop: '13px',
        paddingBottom: '13px'
      }
    }
  }
}
