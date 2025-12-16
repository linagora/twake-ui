import { ReactNode, FC } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { theme } from "./theme";

interface ThemeProviderProps {
  children: ReactNode;
}

export const TwakeMuiThemeProvider: FC<ThemeProviderProps> = ({
  children,
}) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export { theme } from "./theme";
export type { TwakeTheme } from "./theme";
