import * as React from "react";
import { ThemeProvider } from "./theme-provider";
import { appWindow } from "@tauri-apps/api/window";
import { listen } from "@tauri-apps/api/event";

interface AutoChangeThemeProps {
  children?: React.ReactNode;
}

export function AutoChangeTheme({ children }: AutoChangeThemeProps) {
  const [mode, setMode] = React.useState<"light" | "dark">("light");

  const initializeMode = async () => {
    const mode = (await appWindow.theme()) as "light" | "dark";
    setMode(mode);
  };

  const listenForThemeChanged = async () => {
    const unlisten = await listen<string>("tauri://theme-changed", (event) => {
      const mode = event.payload as "light" | "dark";
      setMode(mode);
    });
    return unlisten;
  };

  React.useEffect(() => {
    initializeMode();
    const unlisten = listenForThemeChanged();
    return () => {
      unlisten.then((value) => value()).catch(console.error);
    };
  }, []);

  return <ThemeProvider mode={mode}>{children}</ThemeProvider>;
}
