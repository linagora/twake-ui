import { TypographyVariantsOptions } from "@mui/material/styles";

export type TypographyOptions = TypographyVariantsOptions;

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
  caption: TypographyConfig;
  overline: TypographyConfig;
}

export type MakeTypography = () => TypographyOptions;
