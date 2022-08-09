import * as React from "react";
import ButtonBase, { ButtonBaseProps } from "@mui/material/ButtonBase";
import { styled } from "@mui/material/styles";

const IconButtonRoot = styled(ButtonBase, {
  name: "WinUIIconButton",
  slot: "Root",
})(({ theme }) => ({
  width: 30,
  height: 22,
  borderRadius: 4,
  color: theme.palette.text.secondary,
  transition: theme.transitions.create(["background-color"], {
    duration: theme.transitions.duration.short,
  }),
  "&:hover": {
    backgroundColor: theme.palette.fill.subtle.secondary,
  },
  "&:active": {
    backgroundColor: theme.palette.fill.subtle.tertiary,
  },
  "&.Mui-disabled": {
    color: theme.palette.text.disabled,
  },
}));

interface IconButtonProps extends Omit<ButtonBaseProps, "disableRipple"> {}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>((props, ref) => {
  const { children, ...other } = props;

  return (
    <IconButtonRoot disableRipple ref={ref} {...other}>
      {children}
    </IconButtonRoot>
  );
});

export default IconButton;
