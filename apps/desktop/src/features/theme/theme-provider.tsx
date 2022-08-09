import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import lightTheme from "./light-theme";
import darkTheme from "./dark-theme";

interface ThemeProviderProps {
  mode: "light" | "dark";
  children?: React.ReactNode;
}

export function ThemeProvider(props: ThemeProviderProps) {
  const { mode, children } = props;

  const theme = mode === "dark" ? darkTheme : lightTheme;

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}
