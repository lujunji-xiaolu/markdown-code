import * as React from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@/components/icon-button";
import SegoeFluentIcon from "@/components/segoe-fluent-icon";
import { styled } from "@mui/material/styles";
import clsx from "clsx";

const TabRoot = styled("div", {
  name: "Tab",
  slot: "Root",
})(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  width: 240,
  height: 32,
  padding: "5px 5px 5px 8px",
  borderRadius: "8px 8px 0px 0px",
  border: "1px solid transparent",
  color: theme.palette.text.secondary,
  cursor: "pointer",
  transition: theme.transitions.create(["background-color", "border-color", "color"], {
    duration: theme.transitions.duration.short,
  }),
  "&:hover": {
    backgroundColor: theme.palette.fill.subtle.secondary,
  },
  "&:active": {
    backgroundColor: theme.palette.fill.subtle.tertiary,
  },
  "&.Mui-selected": {
    color: theme.palette.text.primary,
    ...(theme.palette.mode === "light" && {
      borderColor: "rgba(0, 0, 0, 0.0578)",
      borderBottomColor: "rgba(255, 255, 255, 0.7)",
      // boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.04)",
      backgroundColor: "rgba(255, 255, 255, 0.7)",
    }),
    ...(theme.palette.mode === "dark" && {
      borderColor: "rgba(0, 0, 0, 0.1)",
      borderBottomColor: "rgba(255, 255, 255, 0.0512)",
      // boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.13)",
      backgroundColor: "rgba(255, 255, 255, 0.0512)",
    }),
  },
  zIndex: 1,
}));

interface TabProps extends React.HTMLAttributes<HTMLDivElement> {
  selected?: boolean;
  onClose: () => void;
}

const Tab = React.forwardRef<HTMLDivElement, TabProps>((props, ref) => {
  const { selected = false, className, children, onClose, ...other } = props;

  const handleClose: React.MouseEventHandler<HTMLButtonElement> = (ev) => {
    ev.stopPropagation();
    onClose();
  };

  return (
    <TabRoot className={clsx(className, { "Mui-selected": selected })} ref={ref} {...other}>
      <Typography variant="body2" color="inherit" sx={{ flex: 1 }}>
        {children}
      </Typography>
      <IconButton onClick={handleClose}>
        <SegoeFluentIcon name="Clear" />
      </IconButton>
    </TabRoot>
  );
});

export default Tab;
