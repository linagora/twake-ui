import { Theme, Components, alpha } from '@mui/material/styles'

import { accordionOverrides } from './overrides/accordionOverrides'
import { autocompleteOverrides } from './overrides/autocompleteOverrides'
import { avatarOverrides } from './overrides/avatarOverrides'
import { buttonOverrides } from './overrides/buttonOverrides'
import { checkboxOverrides } from './overrides/checkboxOverrides'
import { datePickerOverrides } from './overrides/datePickerOverrides'
import {
  dialogOverrides,
  dialogTitleOverrides,
  dialogContentOverrides,
  dialogActionsOverrides
} from './overrides/dialogOverrides'
import { iconButtonOverrides } from './overrides/iconButtonOverrides'
import { popoverOverrides } from './overrides/popoverOverrides'
import {
  textFieldOverrides,
  outlinedInputOverrides,
  inputBaseOverrides,
  selectOverrides
} from './overrides/textFieldOverrides'
import {
  toggleButtonGroupOverrides,
  toggleButtonOverrides
} from './overrides/toggleButtonOverrides'

export const makeDarkOverrides = (theme: Theme): Components => {
  const datePickerOverridesResult = datePickerOverrides(theme)
  const accordionOverridesResult = accordionOverrides(theme)

  return {
    MuiButton: buttonOverrides(theme),
    MuiTextField: textFieldOverrides(),
    MuiOutlinedInput: outlinedInputOverrides(),
    MuiInputBase: inputBaseOverrides(),
    MuiSelect: selectOverrides(),
    MuiAutocomplete: autocompleteOverrides(),
    MuiDialog: dialogOverrides(),
    MuiDialogTitle: dialogTitleOverrides(),
    MuiDialogContent: dialogContentOverrides(),
    MuiDialogActions: dialogActionsOverrides(),
    MuiPopover: popoverOverrides(),
    MuiAvatar: avatarOverrides(theme),
    MuiToggleButtonGroup: toggleButtonGroupOverrides(),
    MuiToggleButton: toggleButtonOverrides(theme),
    MuiIconButton: iconButtonOverrides(),
    MuiCheckbox: checkboxOverrides(),
    MuiTypography: {
      styleOverrides: {
        root: {
          color: alpha(theme.palette.grey[50], 0.9)
        },
        caption: {
          // Typography caption overrides will be implemented later
        }
      }
    },
    ...datePickerOverridesResult,
    MuiAccordion: accordionOverridesResult.MuiAccordion,
    MuiAccordionSummary: accordionOverridesResult.MuiAccordionSummary,
    MuiCssBaseline: {
      styleOverrides: {
        ...((datePickerOverridesResult.MuiCssBaseline?.styleOverrides as Record<
          string,
          unknown
        >) || {}),
        ...((accordionOverridesResult.MuiCssBaseline?.styleOverrides as Record<
          string,
          unknown
        >) || {})
      }
    }
  }
}
