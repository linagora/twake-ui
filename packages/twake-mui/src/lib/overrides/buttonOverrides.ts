import { Theme, Components } from "@mui/material/styles";
import { radius } from "../radius";

export const buttonOverrides = (theme: Theme): Components["MuiButton"] => {
  return {
    styleOverrides: {
      root: {
        borderRadius: radius.pill,
        boxShadow: "none",
        "&:hover": {
          boxShadow: "none",
        },
        "&:active": {
          boxShadow: "none",
        },
        "&:focus": {
          boxShadow: "none",
        },
      },
      contained: {
        boxShadow: "none",
        "&:hover": {
          boxShadow: "none",
        },
        "&:active": {
          boxShadow: "none",
        },
        "&:focus": {
          boxShadow: "none",
        },
      },
      outlined: {
        // Outlined button overrides
      },
      text: {
        // Text button overrides
      },
      sizeSmall: {
        padding: "6px 16px",
      },
      containedSizeSmall: {
        paddingTop: "7px",
        paddingBottom: "7px",
      },
      sizeMedium: {
        padding: "8px 24px",
      },
      containedSizeMedium: {
        paddingTop: "9px",
        paddingBottom: "9px",
      },
      sizeLarge: {
        padding: "12px 32px",
      },
      containedSizeLarge: {
        paddingTop: "13px",
        paddingBottom: "13px",
      },
    },
  };
};
