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

export const makeDarkOverrides = (theme: Theme): Components => {
  return {
    MuiButton: buttonOverrides(theme),
    MuiTextField: textFieldOverrides(),
    MuiOutlinedInput: outlinedInputOverrides(),
    MuiInputBase: inputBaseOverrides(),
    MuiAutocomplete: autocompleteOverrides(),
    MuiDialog: dialogOverrides(),
    MuiDialogTitle: dialogTitleOverrides(),
    MuiDialogContent: dialogContentOverrides(),
    MuiDialogActions: dialogActionsOverrides(),
    MuiPopover: popoverOverrides(),
    MuiAvatar: avatarOverrides(theme),
    MuiToggleButtonGroup: toggleButtonGroupOverrides(),
    MuiToggleButton: toggleButtonOverrides(theme),
    MuiTypography: {
      styleOverrides: {
        root: {
          color: alpha(theme.palette.grey[50], 0.9)
        },
        caption: {
          // Typography caption overrides will be implemented later
        }
      }
    }
  }
}
