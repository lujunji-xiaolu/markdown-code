import * as React from "react";
import { styled } from "@mui/material/styles";
import clsx from "clsx";

const ListItemRoot = styled("li", {
  name: "WinUIListItem",
  slot: "Root",
})(({ theme }) => ({
  listStyle: "none",
  boxSizing: "border-box",
  userSelect: "none",
  position: "relative",
  height: 34,
  width: 268,
  padding: "8px 10px",
  margin: "3px 5px",
  borderRadius: theme.shape.borderRadius,
  ...theme.typography.body2,
  color: theme.palette.text.primary,
  transition: theme.transitions.create(["background-color", "color"], {
    duration: theme.transitions.duration.short,
  }),
  "& .WinUIListItem-selector": {
    position: "absolute",
    left: 0,
    display: "none",
    width: 3,
    borderRadius: 999,
    backgroundColor: theme.palette.fill.accent.default,
  },
  "&:hover": {
    backgroundColor: theme.palette.fill.subtle.secondary,
  },
  "&:active": {
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.fill.subtle.tertiary,
    "& .WinUIListItem-selector": {
      top: "calc(50% - 5px)",
      display: "block",
      height: 10,
    },
  },
  "&.Mui-disabled": {
    color: theme.palette.text.disabled,
    pointerEvents: "none",
  },
  "&.Mui-selected": {
    backgroundColor: theme.palette.fill.subtle.secondary,
    "& .WinUIListItem-selector": {
      top: "calc(50% - 8px)",
      display: "block",
      height: 16,
    },
    "&:hover": {
      backgroundColor: theme.palette.fill.subtle.tertiary,
    },
    "&:active": {
      color: theme.palette.text.secondary,
      backgroundColor: theme.palette.fill.subtle.secondary,
      "& .WinUIListItem-selector": {
        top: "calc(50% - 5px)",
        display: "block",
        height: 10,
      },
    },
    "&.Mui-disabled": {
      "& .WinUIListItem-selector": {
        top: "calc(50% - 8px)",
        height: 16,
        backgroundColor: theme.palette.fill.accent.disabled,
      },
      color: theme.palette.text.disabled,
      pointerEvents: "none",
    },
  },
}));

interface ListItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  disabled?: boolean;
  selected?: boolean;
  children?: React.ReactNode;
}

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>((props, ref) => {
  const { disabled = false, selected = false, className, children, ...other } = props;

  return (
    <ListItemRoot
      className={clsx(className, { "Mui-disabled": disabled, "Mui-selected": selected })}
      ref={ref}
      {...other}
    >
      <div className="WinUIListItem-selector"></div>
      {children}
    </ListItemRoot>
  );
});

export default ListItem;
