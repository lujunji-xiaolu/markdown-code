import * as React from "react";
import {
  MenuItem as InternalMenuItem,
  MenuItemProps as InternalMenuItemProps,
} from "@szhsin/react-menu";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const MenuItemRoot = styled(InternalMenuItem, {
  name: "WinUIMenuItem",
  slot: "Root",
})(({ theme }) => ({
  position: "relative",
  boxSizing: "border-box",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  height: 34,
  width: 268,
  padding: "8px 10px",
  margin: "3px 5px",
  borderRadius: theme.shape.borderRadius,
  ...theme.typography.body2,
  color: theme.palette.text.primary,
  cursor: "pointer",
  listStyle: "none",
  userSelect: "none",
  transition: theme.transitions.create(["background-color", "color"], {
    duration: theme.transitions.duration.short,
  }),
  "&.szh-menu__item--hover": {
    backgroundColor: theme.palette.fill.subtle.secondary,
  },
  "&:active": {
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.fill.subtle.tertiary,
  },
  "&.szh-menu__item--disabled": {
    color: theme.palette.text.disabled,
    pointerEvents: "none",
    "& .WinUIMenuItem-hintText": {
      color: theme.palette.text.disabled,
    },
  },
  "&:focus": {
    outline: "none",
  },
  "&.szh-menu__item--type-radio::before": {
    content: '""',
    width: 4,
    height: 4,
    margin: "0px 18px 0px 6px",
    backgroundColor: theme.palette.text.primary,
    borderRadius: 999,
    opacity: 0,
  },
  "&.szh-menu__item--type-checkbox::before": {
    content: '"\\e73e"',
    fontFamily: "Segoe Fluent Icons",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 12,
    lineHeight: "12px",
    margin: "0px 12px 0px 4px",
    color: theme.palette.text.primary,
    opacity: 0,
  },
  "&.szh-menu__item--checked::before": {
    opacity: 1,
  },
}));

const HintText = styled("span")(({ theme }) => ({
  ...theme.typography.caption,
  color: theme.palette.text.secondary,
}));

interface MenuItemProps extends InternalMenuItemProps {
  hintText?: string;
  children?: React.ReactNode;
}

const MenuItem = React.forwardRef<HTMLLIElement, MenuItemProps>((props, ref) => {
  const { hintText, children, ...other } = props;

  return (
    <MenuItemRoot ref={ref} {...other}>
      <Typography variant="body2" sx={{ flex: 1 }}>
        {children}
      </Typography>
      {hintText && <HintText className="WinUIMenuItem-hintText">{hintText}</HintText>}
    </MenuItemRoot>
  );
});

export default MenuItem;
