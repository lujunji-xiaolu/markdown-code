import * as React from "react";
import { styled, SxProps, Theme } from "@mui/material/styles";

const CardRoot = styled("div", {
  name: "WinUICard",
  slot: "Root",
})<{ ownerState: { variant: "standard" | "onThinAcrylic" } }>(({ theme, ownerState }) => ({
  border: "1px solid",
  borderRadius: 8,
  ...(theme.palette.mode === "light" && {
    borderColor: "rgba(0, 0, 0, 0.0578)",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.04)",
    ...(ownerState.variant === "standard" && {
      backgroundColor: "rgba(255, 255, 255, 0.7)",
    }),
    ...(ownerState.variant === "onThinAcrylic" && {
      backgroundColor: "rgba(246, 246, 246, 0.9)",
    }),
  }),
  ...(theme.palette.mode === "dark" && {
    borderColor: "rgba(0, 0, 0, 0.1)",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.13)",
    ...(ownerState.variant === "standard" && {
      backgroundColor: "rgba(255, 255, 255, 0.0512)",
    }),
    ...(ownerState.variant === "onThinAcrylic" && {
      backgroundColor: "rgba(0, 0, 0, 0.65)",
    }),
  }),
}));

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "standard" | "onThinAcrylic";
  sx?: SxProps<Theme>;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const { variant = "standard", children, ...other } = props;

  return (
    <CardRoot ref={ref} ownerState={{ variant }} {...other}>
      {children}
    </CardRoot>
  );
});

export default Card;
