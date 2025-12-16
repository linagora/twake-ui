import { createTheme, ThemeOptions } from "@mui/material/styles";
import { makePalette } from "../palette/makePalette";
import { makeTypography } from "../typography/makeTypography";
import { makeLightOverrides } from "../overrides/makeLightOverrides";

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

export const makeTheme = () => {
  const palette = makePalette();
  const typography = makeTypography();

  const theme = createTheme({
    ...themesCommonConfig,
    palette,
    typography,
  });

  const components = makeLightOverrides(theme);

  return createTheme({
    ...theme,
    components,
  });
};
