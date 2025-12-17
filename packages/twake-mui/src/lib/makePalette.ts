import { PaletteOptions } from "@mui/material/styles";
import paletteJson from "./palette.json";
import { PaletteJson } from "./types";

const paletteData = paletteJson as PaletteJson;

export const makePalette = (mode: "light" | "dark" = "light"): PaletteOptions => {
  return {
    mode,
    primary: {
      light: paletteData.Primary[300],
      main: paletteData.Primary[600],
      dark: paletteData.Primary[800],
      contrastText: paletteData.Primary.ContrastText,
    },
    secondary: {
      light: paletteData.Secondary[300],
      main: paletteData.Secondary[600],
      dark: paletteData.Secondary[800],
      contrastText: paletteData.Secondary.ContrastText,
    },
    error: {
      light: paletteData.Error[300],
      main: paletteData.Error[600],
      dark: paletteData.Error[800],
      contrastText: paletteData.Error.ContrastText,
    },
    warning: {
      light: paletteData.Warning[300],
      main: paletteData.Warning[500],
      dark: paletteData.Warning[700],
      contrastText: paletteData.Warning.ContrastText,
    },
    success: {
      light: paletteData.Success[300],
      main: paletteData.Success[600],
      dark: paletteData.Success[800],
      contrastText: paletteData.Success.ContrastText,
    },
    info: {
      light: paletteData.Info[300],
      main: paletteData.Info[600],
      dark: paletteData.Info[800],
      contrastText: "#fff",
    },
    grey: {
      50: paletteData.Grey[50],
      100: paletteData.Grey[100],
      200: paletteData.Grey[200],
      300: paletteData.Grey[300],
      400: paletteData.Grey[400],
      500: paletteData.Grey[500],
      600: paletteData.Grey[600],
      700: paletteData.Grey[700],
      800: paletteData.Grey[800],
      900: paletteData.Grey[900],
      A100: paletteData.Grey.A100,
      A200: paletteData.Grey.A200,
      A400: paletteData.Grey.A400,
      A700: paletteData.Grey.A700,
    },
    text: {
      primary: "#000000",
      secondary: "#717D96",
      disabled: "#C5C7CA",
    },
    background: {
      default: "#FFFFFF",
      paper: "#FFFFFF",
    },
    divider: "#E1E3E6",
    action: {
      active: paletteData.Primary["A400"],
      hover: "rgba(246, 126, 53, 0.04)",
      selected: "rgba(246, 126, 53, 0.08)",
      disabled: "rgba(0, 0, 0, 0.32)",
      disabledBackground: "rgba(0, 0, 0, 0.12)",
      focus: "rgba(246, 126, 53, 0.12)",
    },
  };
};
