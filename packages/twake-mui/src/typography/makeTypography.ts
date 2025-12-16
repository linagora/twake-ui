import { TypographyVariantsOptions } from "@mui/material/styles";

export const makeTypography = (): TypographyVariantsOptions => {
  return {
    fontFamily: [
      '"Inter"',
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    h1: {
      fontSize: 45,
      fontWeight: 600,
      lineHeight: 1.087,
      letterSpacing: "0",
    },
    h2: {
      fontSize: 32,
      fontWeight: 600,
      lineHeight: 1.313,
      letterSpacing: "0",
    },
    h3: {
      fontSize: 24,
      fontWeight: 600,
      lineHeight: 1.167,
      letterSpacing: "0",
    },
    h4: {
      fontSize: 22,
      fontWeight: 600,
      lineHeight: 1.167,
      letterSpacing: "0",
    },
    h5: {
      fontSize: 16,
      fontWeight: 500,
      lineHeight: 1.313,
      letterSpacing: "0.15px",
    },
    h6: {
      fontSize: 14,
      fontWeight: 500,
      lineHeight: 1.313,
      letterSpacing: "0.1px",
    },
    subtitle1: {
      fontSize: 14,
      fontWeight: 500,
      lineHeight: 1.358,
      letterSpacing: "0.1px",
    },
    subtitle2: {
      fontSize: 14,
      fontWeight: 600,
      lineHeight: 1.334,
      letterSpacing: "0.25px",
    },
    body1: {
      fontSize: 16,
      fontWeight: 400,
      lineHeight: 1.313,
      letterSpacing: "-0.15px",
    },
    body2: {
      fontSize: 14,
      fontWeight: 500,
      lineHeight: 1.313,
      letterSpacing: "0.25px",
    },
    button: {
      fontSize: 16,
      fontWeight: 500,
      lineHeight: 1.313,
      textTransform: "none",
      letterSpacing: "0",
    },
    caption: {
      fontSize: 13,
      fontWeight: 400,
      lineHeight: 1.4,
      letterSpacing: "0",
    },
    overline: {
      fontSize: 11,
      fontWeight: 500,
      lineHeight: "16px",
      letterSpacing: "0.5px",
      textTransform: "none",
    },
  };
};
