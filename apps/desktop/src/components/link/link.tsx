import * as React from "react";
import { styled } from "@mui/material/styles";
import clsx from "clsx";

const LinkRoot = styled("a", {
  name: "WinUILink",
  slot: "Root",
})(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.accentText.primary,
  "&:hover": {
    color: theme.palette.accentText.tertiary,
    textDecoration: "none",
  },
  "&:active": {
    color: theme.palette.accentText.secondary,
    textDecoration: "none",
  },
  "&.Mui-disabled": {
    color: theme.palette.accentText.disabled,
  },
}));

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  disabled?: boolean;
  children?: React.ReactNode;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  const { disabled, children, onClick, ...other } = props;

  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault();
    if (onClick instanceof Function) onClick(event);
  };

  return (
    <LinkRoot
      className={clsx({ "Mui-disabled": disabled })}
      ref={ref}
      {...other}
      onClick={handleClick}
    >
      {children}
    </LinkRoot>
  );
});

export default Link;
