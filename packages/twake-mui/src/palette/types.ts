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
