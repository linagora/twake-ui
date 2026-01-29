import { Theme, Components, alpha } from '@mui/material/styles'

import paletteJson from '../palette.json'
import { PaletteJson } from '../types'

const paletteData = paletteJson as PaletteJson

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const accordionOverrides = (theme: Theme): Components => {
  return {
    MuiAccordion: {
      styleOverrides: {
        root: {
          '&::before': {
            display: 'none'
          }
        }
      }
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          padding: '0',
          minHeight: '32px',
          '&.Mui-expanded': {
            minHeight: '32px'
          }
        },
        content: {
          fontSize: '14px',
          fontWeight: 500,
          lineHeight: '20px',
          color: alpha(paletteData.Grey[900], 0.9),
          margin: 0,
          '&.Mui-expanded': {
            margin: 0
          }
        },
        expandIconWrapper: {
          padding: '4px',
          color: alpha(paletteData.Grey[900], 0.48),
          borderRadius: '50%',
          '&:hover': {
            backgroundColor: alpha(paletteData.Primary.A400 as string, 0.04)
          }
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        '.MuiAccordion-root .MuiListItem-root': {
          padding: '0',
          borderRadius: '4px',
          '&:hover': {
            backgroundColor: alpha(paletteData.Grey.A900, 0.04)
          }
        },
        '.MuiAccordion-root .MuiListItem-root label': {
          fontSize: '14px',
          fontStyle: 'normal',
          fontWeight: 400,
          color: alpha(paletteData.Grey[900], 0.9)
        }
      }
    }
  }
}
