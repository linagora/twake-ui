import {
  Bottom,
  CheckCircle,
  CheckSquare,
  Icon,
  IconProps,
  Info,
  RadioChecked,
  RadioUnchecked,
  Spinner,
  Warning,
  WarningCircle
} from '@linagora/twake-icons'
import { alertClasses } from '@mui/material/Alert'
import { buttonClasses } from '@mui/material/Button'
import { checkboxClasses } from '@mui/material/Checkbox'
import { dialogTitleClasses } from '@mui/material/DialogTitle'
import { formHelperTextClasses } from '@mui/material/FormHelperText'
import { formLabelClasses } from '@mui/material/FormLabel'
import { menuItemClasses } from '@mui/material/MenuItem'
import { outlinedInputClasses } from '@mui/material/OutlinedInput'
import { radioClasses } from '@mui/material/Radio'
import { selectClasses } from '@mui/material/Select'
import { switchClasses } from '@mui/material/Switch'
import { tabClasses } from '@mui/material/Tab'
import { tabsClasses } from '@mui/material/Tabs'
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

// cozy-ui tints every colour but primary at 8%, primary at 25%
const buttonGhostColors = [
  'secondary',
  'success',
  'error',
  'warning',
  'info'
] as const

// cozy-ui's select caret, at the 16px twake icons render
const SelectIcon: React.FC<Omit<IconProps, 'icon'>> = props => (
  <Icon icon={Bottom} {...props} />
)

const radioColors = [
  'primary',
  'secondary',
  'success',
  'error',
  'warning',
  'info'
] as const

export const overrides: NonNullable<ThemeOptions['components']> = {
  MuiButton: {
    defaultProps: {
      variant: 'contained',
      disableElevation: true,
      loadingPosition: 'end',
      loadingIndicator: (
        <Icon icon={Spinner} spin aria-hidden focusable="false" />
      )
    },
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: radius.pill,
        lineHeight: 'normal',
        minHeight: 40,
        padding: '10px 24px',
        variants: [
          {
            props: { variant: 'outlined' },
            style: { padding: '5px 15px', borderColor: 'currentColor' }
          },
          {
            props: { variant: 'text' },
            style: { minWidth: 'auto', padding: '10px 8px' }
          },
          {
            props: { variant: 'ghost' },
            style: {
              padding: '5px 15px',
              color: theme.vars.palette.text.primary,
              backgroundColor: theme.alpha(
                theme.vars.palette.primary.main,
                0.25
              ),
              '@media (hover: hover)': {
                '&:hover': {
                  backgroundColor: theme.alpha(
                    theme.vars.palette.primary.main,
                    0.32
                  )
                }
              },
              [`&.${buttonClasses.disabled}`]: {
                backgroundColor: 'transparent',
                border: `1px solid ${theme.vars.palette.action.disabledBackground}`
              }
            }
          },
          ...buttonGhostColors.map(color => ({
            props: { variant: 'ghost' as const, color },
            style: {
              color: theme.vars.palette[color].main,
              backgroundColor: theme.alpha(
                theme.vars.palette[color].main,
                0.08
              ),
              '@media (hover: hover)': {
                '&:hover': {
                  backgroundColor: theme.alpha(
                    theme.vars.palette[color].main,
                    0.16
                  )
                }
              }
            }
          })),
          // Vertical paddings sit 1px under cozy-ui's so the outlined border
          // still fits the fixed heights cozy-ui forces (36, 40, 48).
          {
            props: { size: 'small' },
            style: {
              minHeight: 36,
              padding: '9px 16px',
              fontSize: theme.typography.pxToRem(13)
            }
          },
          {
            props: { size: 'small', variant: 'text' },
            style: { padding: '8px 16px' }
          },
          {
            props: { size: 'large' },
            style: {
              minHeight: 48,
              padding: '13px 32px',
              fontSize: theme.typography.pxToRem(15)
            }
          },
          {
            props: { size: 'large', variant: 'text' },
            style: { padding: '14px 10px' }
          }
        ]
      }),
      // Keep the end spinner where cozy-ui's inline endIcon sat, i.e. at the
      // horizontal padding of each variant and size.
      loadingIndicator: {
        variants: [
          { props: { loadingPosition: 'end' }, style: { right: 24 } },
          {
            props: { loadingPosition: 'end', variant: 'outlined' },
            style: { right: 15 }
          },
          {
            props: { loadingPosition: 'end', variant: 'ghost' },
            style: { right: 15 }
          },
          {
            props: { loadingPosition: 'end', variant: 'text' },
            style: { right: 8 }
          },
          {
            props: { loadingPosition: 'end', size: 'small' },
            style: { right: 16 }
          },
          {
            props: { loadingPosition: 'end', size: 'large' },
            style: { right: 32 }
          },
          {
            props: { loadingPosition: 'end', size: 'large', variant: 'text' },
            style: { right: 10 }
          }
        ]
      }
    }
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: radius.sm,
        [`&.${outlinedInputClasses.disabled}`]: {
          background: theme.vars.palette.background.contrast
        },
        [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
          borderColor: theme.vars.palette.text.disabled
        },
        [`&.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]:
          {
            borderWidth: 1
          },
        [`&.${outlinedInputClasses.error} .${outlinedInputClasses.notchedOutline}`]:
          {
            borderColor: theme.alpha(
              theme.vars.palette.error.main,
              theme.vars.palette.border.opacity
            )
          },
        [`&.${outlinedInputClasses.error}:hover .${outlinedInputClasses.notchedOutline}, &.${outlinedInputClasses.error}.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]:
          {
            borderColor: theme.vars.palette.error.main
          },
        variants: [
          {
            props: ({ ownerState }) => !!ownerState.startAdornment,
            style: { paddingLeft: 16 }
          },
          {
            props: ({ ownerState }) => !!ownerState.endAdornment,
            style: { paddingRight: 16 }
          },
          {
            props: ({ ownerState }) => !!ownerState.multiline,
            style: { padding: '16.5px 16px' }
          },
          {
            props: ({ ownerState }) =>
              !!ownerState.multiline && ownerState.size === 'small',
            style: { padding: '12.5px 16px' }
          }
        ]
      }),
      notchedOutline: ({ theme }) => ({
        borderColor: theme.vars.palette.border.main,
        transition: theme.transitions.create('border-color', {
          duration: theme.transitions.duration.shorter
        })
      }),
      // 16px gutters, and a 48px small field where MUI has 40px
      input: {
        variants: [
          {
            props: ({ ownerState }) =>
              !ownerState.multiline && !ownerState.startAdornment,
            style: { paddingLeft: 16 }
          },
          {
            props: ({ ownerState }) =>
              !ownerState.multiline && !ownerState.endAdornment,
            style: { paddingRight: 16 }
          },
          {
            props: ({ ownerState }) =>
              !ownerState.multiline && ownerState.size === 'small',
            style: { paddingTop: 12.5, paddingBottom: 12.5 }
          }
        ]
      }
    }
  },
  MuiInputLabel: {
    styleOverrides: {
      root: ({ theme }) => ({
        variants: [
          {
            props: ({ ownerState }) =>
              ownerState.variant === 'outlined' &&
              ownerState.size === 'small' &&
              !ownerState.shrink,
            style: { transform: 'translate(14px, 12px) scale(1)' }
          },
          {
            // cozy-ui keeps the resting label grey even in error
            props: ({ ownerState }) =>
              ownerState.variant === 'outlined' && !ownerState.shrink,
            style: {
              [`&.${formLabelClasses.error}`]: {
                color: theme.vars.palette.text.secondary
              }
            }
          }
        ]
      })
    }
  },
  MuiFormLabel: {
    styleOverrides: {
      root: ({ theme }) => ({
        [`&.${formLabelClasses.disabled}.${formLabelClasses.error}`]: {
          color: theme.vars.palette.text.disabled
        }
      })
    }
  },
  MuiFormHelperText: {
    styleOverrides: {
      root: ({ theme }) => ({
        fontStyle: 'italic',
        fontSize: theme.typography.pxToRem(14),
        marginTop: 4,
        [`&.${formHelperTextClasses.disabled}.${formHelperTextClasses.error}`]:
          {
            color: theme.vars.palette.text.disabled
          }
      })
    }
  },
  MuiSelect: {
    defaultProps: { IconComponent: SelectIcon },
    styleOverrides: {
      icon: ({ theme }) => ({
        right: 14,
        top: 'calc(50% - 8px)',
        color: theme.vars.palette.text.icon,
        [`&.${selectClasses.disabled}`]: {
          color: theme.vars.palette.text.disabled
        }
      }),
      outlined: {
        '&&': { paddingRight: 39 }
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
    defaultProps: { disableEnforceFocus: true },
    styleOverrides: {
      paper: ({ theme }) => ({
        width: '100%',
        '&.small': {
          maxWidth: 480,
          [theme.breakpoints.down('lg')]: {
            margin: 16,
            padding: '0 8px 8px',
            height: 'auto',
            maxHeight: 'calc(100% - 32px)',
            borderRadius: 6
          }
        },
        '&.medium': { maxWidth: 544 },
        '&.large': { maxWidth: 800 },
        '&.full': { maxWidth: '100%' }
      }),
      paperFullScreen: {
        '&.small, &.medium, &.large': { maxWidth: '100%' }
      }
    }
  },
  MuiDialogTitle: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...theme.typography.h3,
        boxSizing: 'border-box',
        width: '100%',
        padding: '1.5rem 2rem',
        [theme.breakpoints.down('md')]: {
          ...theme.typography.h4,
          padding: '0.75rem 1rem'
        },
        // padding base + button width + button margin
        '&.dialogTitleWithBack': {
          paddingLeft: '4rem',
          [theme.breakpoints.down('md')]: { paddingLeft: '3rem' }
        },
        '&.dialogTitleWithClose': {
          paddingRight: '4rem',
          [theme.breakpoints.down('md')]: { paddingRight: '3rem' }
        }
      })
    }
  },
  MuiDialogContent: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: '24px 32px 0',
        [theme.breakpoints.down('md')]: { padding: '24px 16px 0' },
        // MUI drops the top padding after a title, cozy-ui keeps it
        [`.${dialogTitleClasses.root} + &`]: { paddingTop: 24 }
      })
    }
  },
  MuiDialogActions: {
    styleOverrides: {
      root: ({ theme }) => ({
        margin: '16px 32px',
        padding: 0,
        [theme.breakpoints.down('md')]: {
          margin: '8px 16px',
          '& button': { flexGrow: 1 }
        },
        '& > :not(style) ~ :not(style)': { marginLeft: 4 }
      })
    }
  },
  MuiDivider: {
    defaultProps: { textAlign: 'left' },
    styleOverrides: {
      root: {
        variants: [
          {
            props: { variant: 'inset' },
            style: { marginLeft: 64 }
          },
          {
            props: ({ ownerState }) =>
              !!ownerState.children &&
              ownerState.textAlign === 'left' &&
              ownerState.orientation !== 'vertical',
            style: {
              '&::before': { width: 0 },
              '&::after': { width: '100%' }
            }
          }
        ]
      },
      wrapper: ({ theme }) => ({
        ...theme.typography.body2,
        paddingLeft: 8,
        paddingRight: 8,
        variants: [
          {
            props: { textAlign: 'left', orientation: 'horizontal' },
            style: { paddingLeft: 0 }
          }
        ]
      })
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
    defaultProps: { checkedIcon: <Icon icon={CheckSquare} /> },
    styleOverrides: {
      root: ({ theme }) => ({
        padding: 8,
        // MUI colours an indeterminate box on its own, cozy-ui only once it is
        // also checked
        [`&.${checkboxClasses.indeterminate}:not(.${checkboxClasses.checked}):not(.${checkboxClasses.disabled})`]:
          {
            color: theme.vars.palette.text.secondary
          },
        '& svg.twake-icon': {
          boxSizing: 'content-box',
          width: 18,
          height: 18,
          padding: 3
        },
        variants: [
          {
            props: { size: 'small' },
            style: {
              padding: 6,
              '& svg.twake-icon': { width: 16, height: 16, padding: 2 }
            }
          }
        ]
      })
    }
  },
  MuiRadio: {
    defaultProps: {
      icon: <Icon icon={RadioUnchecked} />,
      checkedIcon: <Icon icon={RadioChecked} />
    },
    styleOverrides: {
      root: ({ theme }) => ({
        padding: 12,
        '& svg': { fill: theme.vars.palette.border.main },
        variants: [
          ...radioColors.map(color => ({
            props: { color },
            style: {
              [`&.${radioClasses.checked} svg`]: {
                fill: theme.vars.palette[color].main
              }
            }
          })),
          {
            props: { disabled: true },
            style: {
              '& svg': {
                borderRadius: '50%',
                backgroundColor: theme.vars.palette.background.contrast
              },
              [`&.${radioClasses.checked} svg`]: {
                fill: theme.vars.palette.text.disabled
              }
            }
          }
        ]
      })
    }
  },
  MuiSnackbar: {
    defaultProps: {
      anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
      autoHideDuration: 2000
    }
  },
  MuiSnackbarContent: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: '4px 12px',
        backgroundColor: theme.vars.palette.grey[600]
      })
    }
  },
  MuiSwitch: {
    styleOverrides: {
      root: {
        width: 56,
        height: 40,
        padding: '6px 1px',
        justifyContent: 'center'
      },
      switchBase: ({ theme }) => ({
        padding: 5,
        top: 5,
        left: 5,
        color: theme.vars.palette.text.icon,
        [`&.${switchClasses.checked}`]: { transform: 'translateX(15px)' },
        [`&.${switchClasses.checked} + .${switchClasses.track}`]: {
          opacity: 1
        },
        [`&.${switchClasses.disabled}, &.${switchClasses.checked}.${switchClasses.disabled}`]:
          {
            color: theme.vars.palette.grey[400]
          },
        [`&.${switchClasses.disabled} + .${switchClasses.track}, &.${switchClasses.checked}.${switchClasses.disabled} + .${switchClasses.track}`]:
          {
            opacity: 1,
            backgroundColor: theme.vars.palette.action.disabledBackground
          },
        // The Switch wrapper draws its own thumb so it can hold an icon
        '& .switchThumb': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 20,
          height: 20,
          borderRadius: '50%',
          boxShadow: theme.vars.shadows[1],
          backgroundColor: theme.vars.palette.common.white
        },
        [`&.${switchClasses.disabled} .switchThumb, &.${switchClasses.disabled} .${switchClasses.thumb}`]:
          {
            backgroundColor: theme.vars.palette.background.default
          },
        variants: [
          {
            // cozy-ui draws the secondary colour as success
            props: { color: 'secondary' },
            style: {
              [`&.${switchClasses.checked}`]: {
                color: theme.vars.palette.success.main
              },
              [`&.${switchClasses.checked} + .${switchClasses.track}`]: {
                backgroundColor: theme.vars.palette.success.main
              }
            }
          }
        ]
      }),
      thumb: ({ theme }) => ({
        backgroundColor: theme.vars.palette.common.white
      }),
      track: ({ theme }) => ({
        width: 44,
        height: '100%',
        borderRadius: 100,
        opacity: 1,
        backgroundColor: theme.vars.palette.text.disabled
      })
    }
  },
  MuiTabs: {
    styleOverrides: {
      root: ({ theme }) => ({
        '&.segmented': {
          borderRadius: 99,
          backgroundColor: theme.vars.palette.background.contrast,
          overflow: 'visible',
          minHeight: 40,
          [`& .${tabsClasses.indicator}`]: {
            top: 1,
            height: 'calc(100% - 2px)',
            transform: 'scale(0.99)',
            borderRadius: 99,
            zIndex: 0,
            boxShadow: theme.vars.shadows[1],
            backgroundColor: theme.vars.palette.background.paper
          },
          [`& .${tabsClasses.fixed}`]: { overflow: 'visible !important' },
          [`& .${tabsClasses.scrollButtons}`]: { borderRadius: 99 },
          [`& .${tabClasses.root}`]: {
            ...theme.typography.body2,
            textTransform: 'initial',
            zIndex: 1,
            borderRadius: 99,
            minHeight: 40,
            [`&.${tabClasses.selected}`]: {
              color: theme.vars.palette.text.primary
            }
          }
        },
        [`&.narrowed .${tabClasses.root}`]: { minWidth: 'auto' },
        variants: [
          {
            // cozy-ui stretches standard tabs across the width on mobile
            props: { variant: 'standard' },
            style: {
              [theme.breakpoints.down('md')]: {
                [`& .${tabClasses.root}`]: {
                  flexShrink: 1,
                  flexGrow: 1,
                  flexBasis: 0,
                  maxWidth: 'none'
                }
              }
            }
          }
        ]
      })
    }
  },
  MuiTab: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...theme.typography.subtitle2,
        minWidth: 72,
        padding: '6px 12px',
        [theme.breakpoints.up('sm')]: { minWidth: 160 },
        [`&:hover:not(.${tabClasses.selected}):not(.${tabClasses.disabled})`]: {
          color: theme.vars.palette.text.primary,
          opacity: 1
        },
        [`&:focus:not(.${tabClasses.selected}):not(.${tabClasses.disabled})`]: {
          color: theme.vars.palette.text.primary
        }
      })
    }
  },
  MuiTypography: {
    styleOverrides: {
      root: ({ theme }) => ({
        variants: [
          {
            // cozy-ui greys captions unless a colour is asked for
            props: ({ ownerState }) =>
              ownerState.variant === 'caption' && !ownerState.color,
            style: { color: theme.vars.palette.text.secondary }
          }
        ]
      })
    }
  },
  MuiAlert: {
    // cozy-ui's 16px icons; the icon padding below centres them on the first
    // line of the message.
    defaultProps: {
      iconMapping: {
        primary: <Icon icon={Info} />,
        secondary: <Icon icon={Info} />,
        success: <Icon icon={CheckCircle} />,
        warning: <Icon icon={Warning} />,
        error: <Icon icon={WarningCircle} />,
        info: <Icon icon={Info} />
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
      message: {
        flex: 'auto',
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap'
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
        width: '100%',
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
  },
  MuiTableHead: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: theme.vars.palette.background.paper
      })
    }
  },
  MuiTableRow: {
    styleOverrides: {
      root: ({ theme }) => ({
        '&.new': {
          backgroundColor: theme.vars.palette.action.hover
        },
        '&.disabled': {
          pointerEvents: 'none',
          opacity: 0.5
        }
      })
    }
  },
  MuiTableCell: {
    styleOverrides: {
      root: {
        padding: '8px 4px'
      },
      head: ({ theme }) => ({
        ...theme.typography.subtitle2,
        color: theme.vars.palette.text.secondary,
        lineHeight: 1.292
      }),
      body: ({ theme }) => ({
        color: theme.vars.palette.text.secondary,
        // We want cell's sizes to be 2rem of content plus padding and border (49px).
        // CssBaseline makes Twake apps border-box, where 2rem would be the total
        // height, so the cell opts back into content-box to keep the same row.
        boxSizing: 'content-box',
        height: '2rem'
      }),
      sizeSmall: ({ theme }) => ({
        ...theme.typography.subtitle2,
        // restated because the root padding above beats MUI's own size variant
        padding: '0 16px',
        outline: `1px solid ${theme.vars.palette.background.default}`,
        borderBottom: 'none',
        backgroundColor: theme.vars.palette.background.default
      }),
      paddingCheckbox: {
        width: 32,
        padding: 0
      },
      stickyHeader: ({ theme }) => ({
        backgroundColor: theme.vars.palette.background.paper
      })
    }
  },
  MuiTableSortLabel: {
    styleOverrides: {
      root: {
        padding: '8px 0'
      },
      icon: {
        fontSize: 14
      }
    }
  }
}
