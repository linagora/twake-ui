import { Theme, Components, alpha } from "@mui/material/styles";
import { buttonOverrides } from "./overrides/buttonOverrides";
import {
  textFieldOverrides,
  outlinedInputOverrides,
  inputBaseOverrides,
} from "./overrides/textFieldOverrides";
import { autocompleteOverrides } from "./overrides/autocompleteOverrides";
import {
  dialogOverrides,
  dialogTitleOverrides,
  dialogContentOverrides,
  dialogActionsOverrides,
} from "./overrides/dialogOverrides";
import { popoverOverrides } from "./overrides/popoverOverrides";

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
    MuiTypography: {
      styleOverrides: {
        root: {
          color: alpha(theme.palette.grey[900], 0.9),
        },
        caption: {
          // Typography caption overrides will be implemented later
        },
      },
    },
  };
};
