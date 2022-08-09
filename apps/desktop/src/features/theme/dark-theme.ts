import { createTheme } from "@/lib/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    fill: {
      accent: {
        default: "#60CDFF",
        secondary: "rgba(96, 205, 255, 0.9)",
        tertiary: "rgba(96, 205, 255, 0.8)",
        disabled: "rgba(255, 255, 255, 0.1581)",
      },
      control: {
        default: "rgba(255, 255, 255, 0.0605)",
        secondary: "rgba(255, 255, 255, 0.0837)",
        tertiary: "rgba(255, 255, 255, 0.0326)",
        disabled: "rgba(255, 255, 255, 0.0419)",
      },
      subtle: {
        secondary: "rgba(255, 255, 255, 0.0605)",
        tertiary: "rgba(255, 255, 255, 0.0419)",
      },
    },
    text: {
      primary: "#FFFFFF",
      secondary: "rgba(255, 255, 255, 0.786)",
      tertiary: "rgba(255, 255, 255, 0.5442)",
      disabled: "rgba(255, 255, 255, 0.3628)",
    },
    textOnAccent: {
      primary: "#000000",
      secondary: "rgba(0, 0, 0, 0.5)",
      disabled: "rgba(255, 255, 255, 0.5302)",
    },
    accentText: {
      primary: "#99EBFF",
      secondary: "#99EBFF",
      tertiary: "#60CDFF",
      disabled: "rgba(255, 255, 255, 0.3628)",
    },
  },
  typography: {
    body2: {
      fontFamily: "Segoe UI Variable Static Text, Roboto, Helvetica, Arial, sans-serif",
    },
    caption: {
      fontFamily: "Segoe UI Variable Static Small, Roboto, Helvetica, Arial, sans-serif",
    },
  },
  elevation: {
    control: {
      border: "1px solid rgba(255, 255, 255, 0.093)",
      borderBottomColor: "rgba(255, 255, 255, 0.0698)",
    },
    flyout: "0px 8px 16px rgba(0, 0, 0, 0.26)",
  },
  stroke: {
    control: {
      default: "rgba(255, 255, 255, 0.0698)",
    },
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

export default darkTheme;
