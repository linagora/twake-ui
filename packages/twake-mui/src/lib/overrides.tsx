import InfoOutlined from '@mui/icons-material/InfoOutlined'
import { alertClasses } from '@mui/material/Alert'
import { menuItemClasses } from '@mui/material/MenuItem'
import {
  CSSObject,
  Theme,
  ThemeOptions,
  alpha,
  darken
} from '@mui/material/styles'
import React from 'react'

import { radius } from './radius'
import AccordionExpandIcon from '../components/AccordionExpandIcon'

const alertSeverities = [
  'primary',
  'secondary',
  'success',
  'error',
  'warning',
  'info'
] as const

const alertIconColor = (
  severity: (typeof alertSeverities)[number],
  theme: Theme
): string | undefined => {
  if (severity === 'primary') return theme.vars.palette.primary.main
  if (severity === 'secondary') return theme.vars.palette.text.primary
  return undefined
}

const alertSeverityVariants = alertSeverities.flatMap(severity => [
  {
    props: { colorSeverity: severity, variant: 'standard' as const },
    style: ({ theme }: { theme: Theme }): CSSObject => ({
      color: theme.vars.palette.text.primary,
      backgroundColor: theme.alpha(theme.vars.palette[severity].main, 0.12),
      ...theme.applyStyles('dark', {
        backgroundColor: theme.alpha(theme.vars.palette[severity].main, 0.24)
      }),
      [`& .${alertClasses.icon}`]: { color: alertIconColor(severity, theme) },
      [`& .${alertClasses.action} button[title="Close"]`]: {
        color: theme.vars.palette.text.secondary
      }
    })
  },
  {
    props: { colorSeverity: severity, variant: 'outlined' as const },
    style: ({ theme }: { theme: Theme }): CSSObject => ({
      color: theme.vars.palette.text.primary,
      border: `1px solid ${theme.vars.palette[severity].main}`,
      [`& .${alertClasses.icon}`]: { color: alertIconColor(severity, theme) }
    })
  },
  {
    props: { colorSeverity: severity, variant: 'filled' as const },
    style: ({ theme }: { theme: Theme }): CSSObject => ({
      color: theme.vars.palette[severity].contrastText,
      backgroundColor: theme.vars.palette[severity].main
    })
  }
])

const avatarSizes = {
  xs: [16, 8, 10],
  s: [24, 11, 16],
  m: [32, 16, 20],
  l: [48, 24, 28],
  xl: [64, 32, 36]
}

const makeAvatarSizes = (theme: Theme): CSSObject =>
  Object.fromEntries(
    Object.entries(avatarSizes).map(([size, [box, font, icon]]) => [
      `&.size-${size}`,
      {
        width: box,
        height: box,
        fontSize: theme.typography.pxToRem(font),
        '& svg': { width: icon, height: icon }
      }
    ])
  )

export const overrides: NonNullable<ThemeOptions['components']> = {
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
            style: ({ theme }) => ({
              backgroundColor: theme.palette.secondary.main,
              color: alpha(theme.palette.text.primary, 0.9),
              borderRadius: radius.sm,
              '&:hover': {
                backgroundColor: theme.palette.secondary.dark,
                color: alpha(theme.palette.text.primary, 0.9)
              },
              '&.Mui-disabled': {
                backgroundColor: theme.palette.action.disabledBackground
              }
            })
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
      outlined: ({ theme }) => ({
        backgroundColor: theme.palette.background.paper,
        borderColor: alpha(theme.palette.grey[900], 0.28),
        color: alpha(theme.palette.text.primary, 0.9),
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.main, 0.04),
          color: theme.palette.primary.main,
          borderColor: alpha(theme.palette.primary.main, 0.32)
        },
        '&.Mui-disabled': {
          backgroundColor: theme.palette.background.paper,
          color: alpha(theme.palette.grey[900], 0.38),
          borderColor: alpha(theme.palette.grey[900], 0.28)
        }
      })
    }
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: radius.sm,
        '&.Mui-focused fieldset': {
          borderWidth: '1px'
        },
        '& input::placeholder': {
          color: theme.palette.secondary.dark,
          opacity: 1
        },
        '& .MuiSvgIcon-root': {
          fontSize: '18px'
        }
      }),
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
      root: ({ theme }) => ({
        ...theme.typography.h3,
        padding: '12px 32px',
        [theme.breakpoints.down('sm')]: {
          ...theme.typography.h4
        }
      })
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
  MuiChip: {
    styleOverrides: {
      root: {
        '&.square': {
          borderRadius: radius.md
        }
      }
    }
  },
  MuiBadge: {
    defaultProps: {
      overlap: 'circular',
      showZero: true
    },
    styleOverrides: {
      badge: ({ theme }) => ({
        boxSizing: 'content-box',
        height: 14,
        minWidth: 14,
        padding: 0,
        border: `2px solid ${theme.palette.background.paper}`,
        borderRadius: '100%',
        fontSize: theme.typography.pxToRem(10)
      }),
      dot: {
        height: 8,
        minWidth: 8
      },
      anchorOriginTopRightRectangular: {
        transform: 'scale(1) translate(37%, -37%)'
      },
      anchorOriginBottomRightRectangular: {
        transform: 'scale(1) translate(37%, 37%)'
      },
      anchorOriginBottomLeftRectangular: {
        transform: 'scale(1) translate(-37%, 37%)'
      },
      anchorOriginTopLeftRectangular: {
        transform: 'scale(1) translate(-37%, -37%)'
      }
    }
  },
  MuiAvatar: {
    styleOverrides: {
      root: ({ theme }) => ({
        fontWeight: 600,
        ...makeAvatarSizes(theme),
        '&.disabled': {
          color: theme.vars.palette.primary.contrastText,
          // cozy-ui's legacy `silver`, the same in both modes
          background: '#d6d8da',
          '& img': {
            filter: 'grayscale(1) brightness(2)',
            opacity: 0.5
          }
        },
        '&.displayInline': {
          display: 'inline-flex'
        },
        '&.border': {
          border: `2px solid ${theme.vars.palette.background.paper}`
        },
        '&.innerBorder': {
          boxShadow: `inset 0 0 0 1px ${theme.vars.palette.border.main}`
        }
      }),
      colorDefault: ({ theme }) => ({
        backgroundColor: theme.vars.palette.background.paper,
        color: theme.vars.palette.text.secondary
      })
    }
  },
  MuiAvatarGroup: {
    styleOverrides: {
      root: ({ theme }) => ({
        '& > div:last-child': {
          boxShadow: `inset 0 0 0 1px ${theme.vars.palette.border.main}`
        }
      }),
      avatar: ({ theme }) => ({
        border: `2px solid ${theme.vars.palette.background.paper}`
      })
    }
  },
  MuiToggleButtonGroup: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderColor: theme.palette.secondary.dark,
        '& .MuiToggleButton-root:not(.Mui-selected)': {
          color: theme.palette.text.secondary,
          backgroundColor: alpha(theme.palette.text.secondary, 0.08),
          '& svg, & .MuiSvgIcon-root': {
            color: theme.palette.text.secondary
          }
        }
      })
    }
  },
  MuiToggleButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: theme.palette.text.primary,
        '&.Mui-selected': {
          color: theme.palette.text.primary,
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
      })
    }
  },
  MuiIconButton: {
    defaultProps: { size: 'large' },
    styleOverrides: {
      root: ({ theme }) => ({
        variants: [
          {
            props: { color: 'default' },
            style: {
              color: theme.palette.text.secondary
            }
          },
          {
            props: { size: 'xsmall' },
            style: {
              padding: '5px'
            }
          },
          {
            props: { size: 'small' },
            style: {
              padding: '8px'
            }
          },
          {
            props: { size: 'medium' },
            style: {
              padding: '12px'
            }
          },
          {
            props: { size: 'large' },
            style: {
              padding: '16px'
            }
          }
        ]
      })
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
  MuiAlert: {
    // MUI maps an icon to its own four severities only. Reuse its info icon for
    // the two it does not know; the per-severity fallback keeps the rest.
    defaultProps: {
      iconMapping: {
        primary: <InfoOutlined fontSize="inherit" />,
        secondary: <InfoOutlined fontSize="inherit" />
      }
    },
    styleOverrides: {
      root: {
        padding: '8px 16px',
        variants: alertSeverityVariants
      },
      icon: {
        paddingTop: '9px'
      },
      action: {
        alignItems: 'center',
        paddingTop: 0
      }
    }
  },
  MuiAlertTitle: {
    styleOverrides: {
      root: {
        fontWeight: 'bold'
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
    defaultProps: { expandIcon: <AccordionExpandIcon /> },
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: theme.palette.grey[100],
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: '0.875rem',
        minHeight: '3.5rem',
        padding: 0,
        color: theme.palette.text.primary,
        '&.Mui-expanded': {
          minHeight: '3.5rem'
        }
      }),
      expandIconWrapper: {
        order: 0,
        '&&': {
          marginLeft: '0.3125rem'
        },
        transform: 'rotate(-90deg)',
        '&.Mui-expanded': {
          marginLeft: '0.3125rem',
          transform: 'rotate(0deg)'
        }
      },
      content: {
        margin: '0.75rem 0',
        paddingLeft: '0.5rem',
        paddingRight: '0.25rem',
        order: 1,
        '& > :last-child': {
          paddingRight: 0
        },
        '&.Mui-expanded': {
          margin: '0.75rem 0'
        }
      }
    }
  },
  MuiFab: {
    defaultProps: { size: 'medium' },
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 28,
        width: 96,
        height: 96,
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.paper,
        '&:hover': {
          backgroundColor: darken(theme.palette.background.paper, 0.05)
        },
        '@media (hover: none)': {
          backgroundColor: theme.palette.background.paper
        }
      }),
      primary: ({ theme }) => ({
        color: theme.palette.primary.dark,
        backgroundColor: theme.palette.primary.light,
        '&:hover': {
          backgroundColor: darken(theme.palette.primary.light, 0.05)
        },
        '@media (hover: none)': {
          backgroundColor: theme.palette.primary.light
        }
      }),
      extended: {
        borderRadius: 16,
        width: 'auto',
        height: 56,
        minWidth: 56,
        padding: '0 20px',
        '&.MuiFab-sizeSmall': {
          borderRadius: 16,
          width: 'auto',
          height: 42,
          minWidth: 42,
          padding: '0 12px'
        },
        '&.MuiFab-sizeMedium': {
          borderRadius: 16,
          width: 'auto',
          height: 48,
          minWidth: 48,
          padding: '0 16px'
        }
      },
      sizeSmall: {
        borderRadius: 12,
        width: 40,
        height: 40
      },
      sizeMedium: {
        borderRadius: 16,
        width: 56,
        height: 56
      }
    }
  },
  MuiTooltip: {
    defaultProps: { arrow: true },
    styleOverrides: {
      tooltip: ({ theme }) => ({
        backgroundColor: alpha(theme.palette.grey[800], 0.9),
        fontSize: '1rem',
        lineHeight: 1.3,
        borderRadius: '4px',
        padding: '8px 12px'
      })
    }
  },
  MuiMenuItem: {
    styleOverrides: {
      root: ({ theme }) => ({
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
      })
    }
  }
}
