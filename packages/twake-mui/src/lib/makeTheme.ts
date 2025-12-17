import { createTheme, ThemeOptions } from "@mui/material/styles";
import { makePalette } from "./makePalette";
import { makeTypography } from "./makeTypography";
import { makeLightOverrides } from "./makeLightOverrides";
import { makeDarkOverrides } from "./makeDarkOverrides";

const themesCommonConfig: Partial<ThemeOptions> = {
  shape: {
    borderRadius: 6,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 480,
      md: 768,
      lg: 1023,
      xl: 1200,
    },
  },
  zIndex: {
    modal: 1300,
  },
};

export const makeTheme = (mode: "light" | "dark" = "light") => {
  const palette = makePalette(mode);
  const typography = makeTypography();

  const theme = createTheme({
    ...themesCommonConfig,
    palette,
    typography,
  });

  const components =
    mode === "dark" ? makeDarkOverrides(theme) : makeLightOverrides(theme);

  return createTheme({
    ...theme,
    components,
  });
};
