import { Theme, Components, alpha } from '@mui/material/styles'

import { autocompleteOverrides } from './overrides/autocompleteOverrides'
import { avatarOverrides } from './overrides/avatarOverrides'
import { buttonOverrides } from './overrides/buttonOverrides'
import {
  dialogOverrides,
  dialogTitleOverrides,
  dialogContentOverrides,
  dialogActionsOverrides
} from './overrides/dialogOverrides'
import { popoverOverrides } from './overrides/popoverOverrides'
import {
  textFieldOverrides,
  outlinedInputOverrides,
  inputBaseOverrides
} from './overrides/textFieldOverrides'
import {
  toggleButtonGroupOverrides,
  toggleButtonOverrides
} from './overrides/toggleButtonOverrides'

export const makeLightOverrides = (theme: Theme): Components => {
  return {
    MuiButton: buttonOverrides(theme),
    MuiTextField: textFieldOverrides(theme),
    MuiOutlinedInput: outlinedInputOverrides(theme),
    MuiInputBase: inputBaseOverrides(theme),
    MuiAutocomplete: autocompleteOverrides(theme),
    MuiDialog: dialogOverrides(theme),
    MuiDialogTitle: dialogTitleOverrides(theme),
    MuiDialogContent: dialogContentOverrides(theme),
    MuiDialogActions: dialogActionsOverrides(theme),
    MuiPopover: popoverOverrides(theme),
    MuiAvatar: avatarOverrides(theme),
    MuiToggleButtonGroup: toggleButtonGroupOverrides(theme),
    MuiToggleButton: toggleButtonOverrides(theme),
    MuiTypography: {
      styleOverrides: {
        root: {
          color: alpha(theme.palette.grey[900], 0.9)
        },
        caption: {
          // Typography caption overrides will be implemented later
        }
      }
    }
  }
}
