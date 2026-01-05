import { Theme, Components } from "@mui/material/styles";

export const avatarOverrides = (theme: Theme): Components["MuiAvatar"] => {
  return {
    styleOverrides: {
      root: {
        fontWeight: 600,
        "&.size-xs": {
          width: 18,
          height: 18,
          fontSize: "9.109px",
          fontWeight: 500,
          lineHeight: "18.219px",
          "& svg": {
            width: "50%",
            height: "50%",
          },
        },
        "&.size-s": {
          width: 28,
          height: 28,
          fontSize: "12.525px",
          fontWeight: 500,
          lineHeight: "18.219px",
          "& svg": {
            width: "50%",
            height: "50%",
          },
        },
        "&.size-m": {
          width: 36,
          height: 36,
          fontSize: "18.219px",
          fontWeight: 500,
          lineHeight: "27.328px",
          "& svg": {
            width: "50%",
            height: "50%",
          },
        },
        "&.size-l": {
          width: 54,
          height: 54,
          fontSize: "27.328px",
          fontWeight: 600,
          lineHeight: "36.438px",
          "& svg": {
            width: "50%",
            height: "50%",
          },
        },
        "&.size-xl": {
          width: 72,
          height: 72,
          fontSize: "36.438px",
          fontWeight: 600,
          lineHeight: "45.547px",
          "& svg": {
            width: "50%",
            height: "50%",
          },
        },
        "&.disabled": {
          color: theme.palette.primary.contrastText,
          background: theme.palette.grey[300],
          "& img": {
            filter: "grayscale(1) brightness(2)",
            opacity: 0.5,
          },
        },
        "&.displayInline": {
          display: "inline-flex",
        },
        "&.border": {
          border: `2px solid ${theme.palette.background.paper}`,
        },
        "&.innerBorder": {
          boxShadow: `inset 0px 0px 0px 1px ${theme.palette.divider}`,
        },
      },
      colorDefault: {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.secondary,
      },
    },
  };
};

