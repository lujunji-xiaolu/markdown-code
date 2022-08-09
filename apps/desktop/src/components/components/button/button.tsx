import * as React from "react";
import { SxProps, Theme } from "@mui/material/styles";
import ButtonBase from "@mui/material/ButtonBase";
import { styled } from "@mui/material/styles";

interface OwnerState {
  variant: "accent" | "standard";
}

const ButtonRoot = styled(ButtonBase, {
  name: "WinUIButton",
  slot: "Root",
})<{ ownerState: OwnerState }>(({ theme, ownerState }) => ({
  padding: "6px 47.5px",
  borderRadius: theme.shape.borderRadius,
  ...theme.typography.body2,
  transition: theme.transitions.create(
    ["background-color", "border-color", "color"],
    {
      duration: theme.transitions.duration.short,
    }
  ),
  "&:hover": {
    ...(ownerState.variant === "accent" && {
      backgroundColor: theme.palette.fill.accent.secondary,
    }),
    ...(ownerState.variant === "standard" && {
      backgroundColor: theme.palette.fill.control.secondary,
    }),
  },
  "&:active": {
    ...(ownerState.variant === "accent" && {
      color: theme.palette.textOnAccent.secondary,
      backgroundColor: theme.palette.fill.accent.tertiary,
    }),
    ...(ownerState.variant === "standard" && {
      color: theme.palette.text.secondary,
      backgroundColor: theme.palette.fill.control.tertiary,
      border: `1px solid ${theme.stroke.control.default}`,
    }),
  },
  "&.Mui-disabled": {
    ...(ownerState.variant === "accent" && {
      color: theme.palette.textOnAccent.disabled,
      backgroundColor: theme.palette.fill.accent.disabled,
    }),
    ...(ownerState.variant === "standard" && {
      color: theme.palette.text.disabled,
      backgroundColor: theme.palette.fill.control.disabled,
      border: `1px solid ${theme.stroke.control.default}`,
    }),
  },
  ...(ownerState.variant === "accent" && {
    color: theme.palette.textOnAccent.primary,
    backgroundColor: theme.palette.fill.accent.default,
    border: "1px solid transparent",
  }),
  ...(ownerState.variant === "standard" && {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.fill.control.default,
    ...theme.elevation.control,
  }),
}));

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "accent" | "standard";
  disabled?: boolean;
  sx?: SxProps<Theme>;
  endIcon?: React.ReactNode;
  children?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      variant = "accent",
      disabled = false,
      endIcon,
      children,
      ...other
    } = props;

    const ownerState: OwnerState = { variant };

    return (
      <ButtonRoot
        ownerState={ownerState}
        disabled={disabled}
        disableRipple
        ref={ref}
        {...other}
      >
        {children}
        {endIcon}
      </ButtonRoot>
    );
  }
);

export default Button;
