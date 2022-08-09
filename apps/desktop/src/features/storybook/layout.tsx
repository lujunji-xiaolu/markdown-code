import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import { ThemeProvider } from "@/features/theme";

interface ThemeModeToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function ThemeModeToggle(props: ThemeModeToggleProps) {
  return (
    <Tooltip title={props.checked ? "Turn on the light" : "Turn off the light"}>
      <IconButton
        color="primary"
        disableTouchRipple
        onClick={() => props.onChange(!props.checked)}
      >
        {props.checked ? (
          <LightModeOutlined fontSize="small" />
        ) : (
          <DarkModeOutlined fontSize="small" />
        )}
      </IconButton>
    </Tooltip>
  );
}

interface LayoutProps {
  children?: React.ReactNode;
}

export function Layout(props: LayoutProps) {
  const [mode, setMode] = React.useState<"light" | "dark">("light");

  const darkMode = mode === "dark";

  const { children } = props;

  return (
    <ThemeProvider mode={mode}>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          backgroundColor: darkMode ? "#1c1c1c" : "#fafafa",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <ThemeModeToggle
            checked={darkMode}
            onChange={(checked) => setMode(checked ? "dark" : "light")}
          />
        </Box>
        <Container>{children}</Container>
      </Box>
    </ThemeProvider>
  );
}
