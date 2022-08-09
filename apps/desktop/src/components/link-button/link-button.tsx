import * as React from "react";
import ButtonBase from "@mui/material/ButtonBase";
import { styled } from "@mui/material/styles";

const LinkButtonRoot = styled(ButtonBase, {
  name: "WinUILinkButton",
  slot: "Root",
})(({ theme }) => ({
  padding: "5px 10px",
  borderRadius: theme.shape.borderRadius,
  ...theme.typography.body2,
  color: theme.palette.accentText.primary,
  transition: theme.transitions.create(["background-color", "color"], {
    duration: theme.transitions.duration.short,
  }),
  "&:hover": {
    color: theme.palette.accentText.secondary,
    backgroundColor: theme.palette.fill.subtle.secondary,
  },
  "&:active": {
    color: theme.palette.accentText.tertiary,
    backgroundColor: theme.palette.fill.subtle.tertiary,
  },
  "&.Mui-disabled": {
    color: theme.palette.accentText.disabled,
  },
}));

interface LinkButtonProps {
  disabled?: boolean;
  children?: React.ReactNode;
}

const LinkButton = React.forwardRef<HTMLButtonElement, LinkButtonProps>(
  (props, ref) => {
    const { disabled, children } = props;

    return (
      <LinkButtonRoot disabled={disabled} disableRipple ref={ref}>
        {children}
      </LinkButtonRoot>
    );
  }
);

export default LinkButton;
