export * from "@mui/material";
export {
  createTheme,
  ThemeProvider,
  styled,
  alpha,
  darken,
  lighten,
  useTheme,
} from "@mui/material/styles";
export { default as Autocomplete } from "@mui/material/Autocomplete";
export { TwakeMuiThemeProvider } from "./components/ThemeProvider";
export { theme } from "./lib/theme";
export type { TwakeTheme } from "./lib/theme";
export { radius } from "./lib/radius";
export { Avatar, default as AvatarDefault } from "./components/Avatar";
export type { AvatarProps } from "./components/Avatar";
export { nameToColor, supportedColors } from "./components/Avatar/helpers";
