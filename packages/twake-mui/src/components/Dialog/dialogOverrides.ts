import { Theme, Components } from "@mui/material/styles";

export const dialogOverrides = (theme: Theme): Components["MuiDialog"] => {
  return {
    styleOverrides: {
      paper: {
        // Dialog paper overrides will be implemented later
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
        // DialogTitle overrides will be implemented later
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
        // DialogContent overrides will be implemented later
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
        // DialogActions overrides will be implemented later
      },
    },
  };
};
