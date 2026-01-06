import { TypographyVariantsOptions } from "@mui/material/styles";

// Palette Types
export interface PaletteColor {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  ContrastText?: string;
  A400?: string;
}

export interface GreyPalette {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  A100: string;
  A200: string;
  A400: string;
  A700: string;
  A900: string;
}

export interface TextPalette {
  primary: string;
  secondary: string;
  secondaryContainer: string;
  disabled: string;
  hint: string;
  icon: string;
}

export interface BackgroundPalette {
  default: string;
  paper: string;
  contrast: string;
}

export interface ActionPalette {
  active: string;
  hover: string;
  selected: string;
  disabled: string;
  disabledBackground: string;
  focus: string;
}

export interface BorderPalette {
  main: string;
  disabled: string;
  ghost: string;
}

export interface PaletteJson {
  Primary: PaletteColor;
  Secondary: PaletteColor;
  Error: PaletteColor;
  Warning: PaletteColor;
  Success: PaletteColor;
  Info: Omit<PaletteColor, "ContrastText">;
  Grey: GreyPalette;
}

// Typography Types
export type TypographyOptions = TypographyVariantsOptions;

declare module "@mui/material/TextField" {
  interface TextFieldPropsSizeOverrides {
    large: true;
  }
}

declare module "@mui/material/InputBase" {
  interface InputBasePropsSizeOverrides {
    large: true;
  }
}

export interface TypographyConfig {
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number | string;
  lineHeight?: number | string;
  letterSpacing?: string;
  textTransform?: "none" | "uppercase" | "lowercase" | "capitalize";
}

export interface TypographyVariants {
  h1: TypographyConfig;
  h2: TypographyConfig;
  h3: TypographyConfig;
  h4: TypographyConfig;
  h5: TypographyConfig;
  h6: TypographyConfig;
  subtitle1: TypographyConfig;
  subtitle2: TypographyConfig;
  body1: TypographyConfig;
  body2: TypographyConfig;
  button: TypographyConfig;
  buttonLarge: TypographyConfig;
  buttonSmall: TypographyConfig;
  caption: TypographyConfig;
  overline: TypographyConfig;
}

export type MakeTypography = () => TypographyOptions;
