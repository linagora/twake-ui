import { Theme, Components, alpha } from '@mui/material/styles'

import paletteJson from '../palette.json'
import { PaletteJson } from '../types'

const paletteData = paletteJson as PaletteJson

// DatePicker component overrides using nested selectors for higher specificity
export const datePickerOverrides = (theme: Theme): Components => {
  return {
    MuiCssBaseline: {
      styleOverrides: {
        '.MuiDateCalendar-root.MuiDateCalendar-root': {
          width: '230px',
          maxWidth: '230px',
          height: '300px',
          maxHeight: '300px'
        },
        '.MuiDateCalendar-root .MuiDayCalendar-slideTransition': {
          minHeight: '208px'
        },
        '.MuiDateCalendar-root .MuiPickersCalendarHeader-root': {
          padding: '6px 4px',
          maxHeight: '32px',
          minHeight: '32px'
        },
        '.MuiDateCalendar-root .MuiPickersCalendarHeader-label': {
          fontSize: '14px',
          fontStyle: 'normal',
          fontWeight: 600,
          lineHeight: '20px',
          color: alpha(paletteData.Grey[900], 0.9)
        },
        '.MuiDateCalendar-root .MuiPickersCalendarHeader-switchViewButton': {
          padding: '0',
          width: '32px',
          height: '32px',
          color: paletteData.Grey.A900
        },
        '.MuiDateCalendar-root .MuiPickersCalendarHeader-switchViewIcon': {
          fontSize: '15px'
        },
        '.MuiDateCalendar-root .MuiPickersArrowSwitcher-button': {
          padding: '0',
          width: '32px',
          height: '32px',
          color: alpha(paletteData.Grey.A900, 0.48)
        },
        '.MuiDateCalendar-root .MuiDayCalendar-weekDayLabel': {
          fontSize: '10px',
          fontStyle: 'normal',
          fontWeight: 500,
          lineHeight: '16px',
          height: '32px',
          width: '32px',
          margin: '0',
          color: alpha(paletteData.Grey.A900, 0.48)
        },
        '.MuiDateCalendar-root .MuiPickersDay-root': {
          fontSize: '10px',
          fontStyle: 'normal',
          fontWeight: 500,
          lineHeight: '16px',
          height: '32px',
          width: '32px',
          margin: '0',
          color: alpha(paletteData.Grey.A900, 0.9)
        },
        '.MuiDateCalendar-root .MuiPickersDay-root.Mui-selected': {
          backgroundColor: theme.palette.primary.main,
          '&:hover': {
            backgroundColor: theme.palette.primary.dark
          }
        },
        '.MuiDateCalendar-root .MuiButtonBase-root.MuiPickersDay-root.Mui-selected':
          {
            backgroundColor: `${theme.palette.primary.main}`,
            '&:hover': {
              backgroundColor: `${theme.palette.primary.dark}`
            }
          },
        '.MuiDateCalendar-root .MuiMonthCalendar-root': {
          width: '215px'
        },
        '.MuiDateCalendar-root .MuiMonthCalendar-button': {
          fontSize: '14px',
          lineHeight: 1,
          height: '30px',
          width: '55px'
        },
        '.MuiDateCalendar-root .MuiMonthCalendar-button[tabindex="0"]': {
          background: 'transparent'
        },
        '.MuiDateCalendar-root .MuiMonthCalendar-button.Mui-selected': {
          background: theme.palette.primary.main,
          '&:hover': {
            background: theme.palette.primary.dark
          }
        },
        '.MuiDateCalendar-root .MuiMonthCalendar-button.Mui-selected[tabindex="0"]':
          {
            background: theme.palette.primary.main,
            '&:hover': {
              background: theme.palette.primary.dark
            }
          }
      }
    }
  }
}
