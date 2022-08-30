import createTheme from "@mui/material/styles/createTheme";
import MuiThemeProvider from "@mui/material/styles/ThemeProvider";
import { listen } from "@tauri-apps/api/event";
import { appWindow } from "@tauri-apps/api/window";
import * as React from "react";

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "transparent",
        },
      },
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "transparent",
        },
      },
    },
  },
});

interface ThemeProviderProps {
  children?: React.ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [darkMode, setDarkMode] = React.useState(false);

  React.useEffect(() => {
    appWindow.theme().then((theme) => setDarkMode(theme === "dark"));
    const unlisten = listen<"light" | "dark">(
      "tauri://theme-changed",
      (event) => setDarkMode(event.payload === "dark")
    );
    return () => {
      unlisten.then((unlistenFn) => unlistenFn());
    };
  }, []);

  return (
    <MuiThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      {children}
    </MuiThemeProvider>
  );
}
