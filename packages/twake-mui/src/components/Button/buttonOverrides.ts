import { Theme, Components } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";

export const buttonOverrides = (theme: Theme): Components["MuiButton"] => {
  return {
    styleOverrides: {
      root: {
        // Button overrides will be implemented later
      },
      contained: {
        // Contained button overrides
      },
      outlined: {
        // Outlined button overrides
      },
      text: {
        // Text button overrides
      },
    },
  };
};
