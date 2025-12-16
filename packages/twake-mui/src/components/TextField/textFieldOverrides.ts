import { Theme, Components } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";

export const textFieldOverrides = (theme: Theme): Components["MuiTextField"] => {
  return {
    styleOverrides: {
      root: {
        // TextField overrides will be implemented later
      },
    },
  };
};
