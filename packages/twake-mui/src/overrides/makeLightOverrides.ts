import { Theme, Components } from "@mui/material/styles";
import { buttonOverrides } from "../components/Button/buttonOverrides";
import { textFieldOverrides } from "../components/TextField/textFieldOverrides";
import {
  dialogOverrides,
  dialogTitleOverrides,
  dialogContentOverrides,
  dialogActionsOverrides,
} from "../components/Dialog/dialogOverrides";

export const makeLightOverrides = (theme: Theme): Components => {
  return {
    MuiButton: buttonOverrides(theme),
    MuiTextField: textFieldOverrides(theme),
    MuiDialog: dialogOverrides(theme),
    MuiDialogTitle: dialogTitleOverrides(theme),
    MuiDialogContent: dialogContentOverrides(theme),
    MuiDialogActions: dialogActionsOverrides(theme),
    MuiTypography: {
      styleOverrides: {
        caption: {
          // Typography caption overrides will be implemented later
        },
      },
    },
  };
};
