import * as React from "react";
import { styled, SxProps, Theme } from "@mui/material/styles";
import { getFlyoutStyles } from "./getFlyoutStyles";

const FlyoutRoot = styled("div", {
  name: "Flyout",
  slot: "Root",
})(({ theme }) => ({
  ...getFlyoutStyles(theme),
}));

interface FlyoutProps {
  sx?: SxProps<Theme>;
  children?: React.ReactNode;
}

const Flyout = React.forwardRef<HTMLDivElement, FlyoutProps>((props, ref) => {
  const { children, ...other } = props;

  return (
    <FlyoutRoot ref={ref} {...other}>
      {children}
    </FlyoutRoot>
  );
});

export default Flyout;
