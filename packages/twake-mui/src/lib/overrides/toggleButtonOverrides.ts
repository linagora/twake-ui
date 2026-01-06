import { Theme, Components, alpha } from "@mui/material/styles";

export const toggleButtonGroupOverrides = (
  theme: Theme
): Components["MuiToggleButtonGroup"] => {
  return {
    styleOverrides: {
      root: {
        borderColor: "#AEAEC0",
        "& .MuiToggleButton-root:not(.Mui-selected)": {
          color: "#8C9CAF",
          backgroundColor: alpha("#49454F", 0.08),
          "&:hover": {
            backgroundColor: alpha("#49454F", 0.08),
          },
          "& svg, & .MuiSvgIcon-root": {
            color: "#8C9CAF",
          },
        },
      },
    },
  };
};

export const toggleButtonOverrides = (
  theme: Theme
): Components["MuiToggleButton"] => {
  return {
    styleOverrides: {
      root: {
        color: "#525256",
        "&.Mui-selected": {
          color: "#243B55",
          backgroundColor: "transparent",
          "&:hover": {
            backgroundColor: "transparent",
          },
          "& svg, & .MuiSvgIcon-root": {
            color: theme.palette.primary.main,
          },
        },
      },
    },
  };
};

