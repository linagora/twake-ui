import { ReactNode } from "react";
import { ThemeOptions } from "@mui/material/styles";

export interface ThemeProviderProps {
  children: ReactNode;
  mode?: "light" | "dark";
  themeOptions?: Partial<ThemeOptions>;
}
