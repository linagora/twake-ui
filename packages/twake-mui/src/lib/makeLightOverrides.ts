import { menuItemClasses } from '@mui/material/MenuItem'
import { Theme, Components, alpha } from '@mui/material/styles'

import paletteJson from './palette.json'
import { radius } from './radius'
import { PaletteJson } from './types'

const paletteData = paletteJson as PaletteJson

export const makeLightOverrides = (theme: Theme): Components => {
  return {
    MuiButton: {
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
          },
          variants: [
            {
              props: { variant: 'contained', color: 'secondary' },
              style: {
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
              }
            },
            {
              props: { size: 'small' },
              style: {
                padding: '6px 16px'
              }
            },
            {
              props: { size: 'medium' },
              style: {
                padding: '9px 24px'
              }
            },
            {
              props: { size: 'large' },
              style: {
                padding: '12px 32px'
              }
            },
            {
              props: { variant: 'contained', size: 'small' },
              style: {
                paddingTop: '7px',
                paddingBottom: '7px'
              }
            },
            {
              props: { variant: 'contained', size: 'medium' },
              style: {
                paddingTop: '10px',
                paddingBottom: '10px'
              }
            },
            {
              props: { variant: 'contained', size: 'large' },
              style: {
                paddingTop: '13px',
                paddingBottom: '13px'
              }
            }
          ]
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
        outlined: {
          backgroundColor: theme.palette.background.paper,
          borderColor: alpha(paletteData.Grey.A900, 0.28),
          color: alpha(theme.palette.text.primary, 0.9),
          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.04),
            color: theme.palette.primary.main,
            borderColor: alpha(theme.palette.primary.main, 0.32)
          },
          '&.Mui-disabled': {
            backgroundColor: theme.palette.background.paper,
            color: alpha(theme.palette.grey[900], 0.38),
            borderColor: alpha(paletteData.Grey.A900, 0.28)
          }
        }
      }
    },
    MuiTextField: {
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
    },
    MuiOutlinedInput: {
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
          lineHeight: '24px',
          variants: [
            {
              props: { size: 'small' },
              style: {
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '20px',
                minHeight: '26px'
              }
            }
          ]
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
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          '&.MuiInputBase-sizeLarge': {
            fontSize: '16px'
          }
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          '&.MuiOutlinedInput-root': {
            '& .MuiSvgIcon-root': {
              fontSize: '25px'
            },
            '&.MuiInputBase-sizeSmall': {
              '& .MuiSelect-select': {
                padding: '10px 25px 10px 15px',
                fontSize: '14px',
                lineHeight: '20px',
                // Note: :has() selector removed due to jsdom compatibility in tests
                // If SVG is present, padding should be handled via component-level sx prop
                '& svg': {
                  marginRight: '8px'
                }
              }
            }
          }
        }
      }
    },
    MuiAutocomplete: {
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
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: radius.md,
          boxShadow:
            '0 1px 3px 0 rgba(0, 0, 0, 0.30), 0 4px 8px 3px rgba(0, 0, 0, 0.15)',
          maxWidth: '570px'
        },
        paperFullScreen: {
          borderRadius: 0,
          maxWidth: '100%'
        }
      }
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: '12px 32px',
          fontSize: 17,
          fontWeight: 400,
          lineHeight: 1.273,
          letterSpacing: '0'
        }
      }
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: '24px 32px'
        }
      }
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '16px 32px'
        }
      }
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          borderRadius: radius.md,
          boxShadow:
            '0 1px 3px 0 rgba(0, 0, 0, 0.30), 0 4px 8px 3px rgba(0, 0, 0, 0.15)'
        }
      }
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          '&.size-xs': {
            width: 18,
            height: 18,
            fontSize: '9.109px',
            fontWeight: 500,
            lineHeight: '18.219px',
            '& svg': {
              width: '50%',
              height: '50%'
            }
          },
          '&.size-s': {
            width: 28,
            height: 28,
            fontSize: '12.525px',
            fontWeight: 500,
            lineHeight: '18.219px',
            '& svg': {
              width: '50%',
              height: '50%'
            }
          },
          '&.size-m': {
            width: 36,
            height: 36,
            fontSize: '18.219px',
            fontWeight: 500,
            lineHeight: '27.328px',
            '& svg': {
              width: '50%',
              height: '50%'
            }
          },
          '&.size-l': {
            width: 54,
            height: 54,
            fontSize: '27.328px',
            fontWeight: 600,
            lineHeight: '36.438px',
            '& svg': {
              width: '50%',
              height: '50%'
            }
          },
          '&.size-xl': {
            width: 72,
            height: 72,
            fontSize: '36.438px',
            fontWeight: 600,
            lineHeight: '45.547px',
            '& svg': {
              width: '50%',
              height: '50%'
            }
          },
          '&.disabled': {
            color: theme.palette.primary.contrastText,
            background: theme.palette.grey[300],
            '& img': {
              filter: 'grayscale(1) brightness(2)',
              opacity: 0.5
            }
          },
          '&.displayInline': {
            display: 'inline-flex'
          },
          '&.border': {
            border: `2px solid ${theme.palette.background.paper}`
          },
          '&.innerBorder': {
            boxShadow: `inset 0px 0px 0px 1px ${theme.palette.divider}`
          },
          variants: [
            {
              props: { color: 'default' },
              style: {
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.secondary
              }
            }
          ]
        }
      }
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          borderColor: '#AEAEC0',
          '& .MuiToggleButton-root:not(.Mui-selected)': {
            color: '#8C9CAF',
            backgroundColor: alpha('#49454F', 0.08),
            '&:hover': {
              backgroundColor: alpha('#49454F', 0.08)
            },
            '& svg, & .MuiSvgIcon-root': {
              color: '#8C9CAF'
            }
          }
        }
      }
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          color: '#525256',
          '&.Mui-selected': {
            color: '#243B55',
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: 'transparent'
            },
            '& svg, & .MuiSvgIcon-root': {
              color: theme.palette.primary.main
            }
          },
          variants: [
            {
              props: { size: 'medium' },
              style: {
                padding: '9px 24px'
              }
            }
          ]
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: alpha(paletteData.Grey[900], 0.48),
          padding: '4px'
        }
      }
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          '&.MuiCheckbox-sizeSmall': {
            padding: '6px'
          }
        }
      }
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: { invisible: false },
              style: {
                backgroundColor: alpha(
                  theme.palette.text.primary,
                  theme.palette.action.focusOpacity
                )
              }
            }
          ]
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: alpha(theme.palette.grey[900], 0.9)
        },
        caption: {
          // Typography caption overrides will be implemented later
        }
      }
    },
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
          color: alpha(theme.palette.grey[900], 0.9)
        },
        '.MuiDateCalendar-root .MuiPickersCalendarHeader-switchViewButton': {
          padding: '0',
          width: '32px',
          height: '32px',
          color: theme.palette.grey[900]
        },
        '.MuiDateCalendar-root .MuiPickersCalendarHeader-switchViewIcon': {
          fontSize: '15px'
        },
        '.MuiDateCalendar-root .MuiPickersArrowSwitcher-button': {
          padding: '0',
          width: '32px',
          height: '32px',
          color: alpha(theme.palette.grey[900], 0.48)
        },
        '.MuiDateCalendar-root .MuiDayCalendar-weekDayLabel': {
          fontSize: '10px',
          fontStyle: 'normal',
          fontWeight: 500,
          lineHeight: '16px',
          height: '32px',
          width: '32px',
          margin: '0',
          color: alpha(theme.palette.grey[900], 0.48)
        },
        '.MuiDateCalendar-root .MuiPickersDay-root': {
          fontSize: '10px',
          fontStyle: 'normal',
          fontWeight: 500,
          lineHeight: '16px',
          height: '32px',
          width: '32px',
          margin: '0',
          color: alpha(theme.palette.grey[900], 0.9)
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
          color: theme.palette.primary.contrastText,
          background: theme.palette.primary.main,
          '&:hover': {
            background: theme.palette.primary.dark
          },
          '&:focus': {
            background: theme.palette.primary.dark
          }
        },
        '.MuiDateCalendar-root .MuiMonthCalendar-button.Mui-selected[tabindex="0"]':
          {
            color: theme.palette.primary.contrastText,
            background: theme.palette.primary.main,
            '&:hover': {
              background: theme.palette.primary.dark
            },
            '&:focus': {
              background: theme.palette.primary.dark
            }
          },
        '.MuiDateCalendar-root .MuiYearCalendar-root': {
          width: '245px',
          maxWidth: '245px'
        },
        '.MuiDateCalendar-root .MuiYearCalendar-button': {
          fontSize: '14px',
          lineHeight: 1,
          height: '30px',
          width: '55px'
        },
        '.MuiDateCalendar-root .MuiYearCalendar-button[tabindex="0"]': {
          background: 'transparent'
        },
        '.MuiDateCalendar-root .MuiYearCalendar-button.Mui-selected': {
          color: theme.palette.primary.contrastText,
          background: theme.palette.primary.main,
          '&:hover': {
            background: theme.palette.primary.dark
          },
          '&:focus': {
            background: theme.palette.primary.dark
          }
        },
        '.MuiDateCalendar-root .MuiYearCalendar-button.Mui-selected[tabindex="0"]':
          {
            color: theme.palette.primary.contrastText,
            background: theme.palette.primary.main,
            '&:hover': {
              background: theme.palette.primary.dark
            },
            '&:focus': {
              background: theme.palette.primary.dark
            }
          },
        '.MuiButtonBase-root.MuiMenuItem-root.MuiDigitalClock-item.Mui-selected':
          {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark
            }
          },
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
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: radius.md,
          '&&&:hover': {
            backgroundColor: `${alpha(theme.palette.primary.main, theme.palette.action.hoverOpacity)}`
          },
          [`&.${menuItemClasses.selected}`]: {
            backgroundColor: alpha(
              theme.palette.primary.main,
              theme.palette.action.selectedOpacity
            ),
            '&:hover': {
              backgroundColor: alpha(
                theme.palette.primary.main,
                theme.palette.action.selectedOpacity +
                  theme.palette.action.hoverOpacity
              )
            }
          }
        }
      }
    },
    MuiSwipeableDrawer: {
      defaultProps: {
        sx: {
          '& .MuiDrawer-paper': {
            borderTopLeftRadius: radius.md,
            borderTopRightRadius: radius.md,
            '&::before': {
              content: '""',
              display: 'block',
              width: '64px',
              height: '4px',
              backgroundColor: theme.palette.action.disabledBackground,
              borderRadius: radius.md,
              margin: '12px auto',
              marginTop: '30px',
              flexShrink: 0
            }
          }
        }
      }
    }
  }
}
