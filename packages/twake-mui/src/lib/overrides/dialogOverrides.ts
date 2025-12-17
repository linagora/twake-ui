import { Theme, Components } from "@mui/material/styles";
import { radius } from "../radius";

export const dialogOverrides = (theme: Theme): Components["MuiDialog"] => {
  return {
    styleOverrides: {
      paper: {
        borderRadius: radius.md,
        boxShadow:
          "0 1px 3px 0 rgba(0, 0, 0, 0.30), 0 4px 8px 3px rgba(0, 0, 0, 0.15)",
      },
    },
  };
};

export const dialogTitleOverrides = (
  theme: Theme
): Components["MuiDialogTitle"] => {
  return {
    styleOverrides: {
      root: {
        padding: "11px 32px",
      },
    },
  };
};

export const dialogContentOverrides = (
  theme: Theme
): Components["MuiDialogContent"] => {
  return {
    styleOverrides: {
      root: {
        padding: "24px 32px",
      },
    },
  };
};

export const dialogActionsOverrides = (
  theme: Theme
): Components["MuiDialogActions"] => {
  return {
    styleOverrides: {
      root: {
        padding: "16px 32px",
      },
    },
  };
};
