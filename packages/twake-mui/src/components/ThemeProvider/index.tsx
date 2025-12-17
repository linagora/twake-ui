import { FC, useMemo } from "react";
import {
  ThemeProvider as MuiThemeProvider,
  Theme,
  createTheme,
} from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { makeTheme } from "../../lib/makeTheme";
import { ThemeProviderProps } from "./types";

export const TwakeMuiThemeProvider: FC<ThemeProviderProps> = ({
  children,
  mode = "light",
  themeOptions,
}) => {
  const theme = useMemo(() => {
    const baseTheme = makeTheme(mode);
    
    if (!themeOptions) {
      return baseTheme;
    }

    return createTheme(baseTheme, themeOptions);
  }, [mode, themeOptions]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
