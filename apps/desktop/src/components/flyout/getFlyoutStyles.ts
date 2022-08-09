import { Theme } from "@mui/material/styles";
import noiseAsset from "./NoiseAsset_256.png";

export function getFlyoutStyles(theme: Theme) {
  return {
    border: "1px solid",
    borderRadius: "8px",
    backdropFilter: "blur(60px)",
    ...(theme.palette.mode === "light" && {
      borderColor: "rgba(0, 0, 0, 0.0578)",
      background: `url(${noiseAsset}), rgba(252, 252, 252, 0.85)`,
      backgroundBlendMode: "normal, luminosity",
      boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.14)",
    }),
    ...(theme.palette.mode === "dark" && {
      borderColor: "rgba(0, 0, 0, 0.2)",
      background: `url(${noiseAsset}), linear-gradient(0deg, rgba(44, 44, 44, 0.15), rgba(44, 44, 44, 0.15)), rgba(44, 44, 44, 0.96)`,
      backgroundBlendMode: "normal, color, luminosity",
      boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.26)",
    }),
  };
}
