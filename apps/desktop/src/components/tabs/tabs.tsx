import * as React from "react";
import { styled, SxProps, Theme } from "@mui/material/styles";

const TabsRoot = styled("div", {
  name: "WinUITabs",
  slot: "Root",
})({
  display: "flex",
  height: 31,
  padding: "0px 10px",
});

interface TabsProps {
  sx?: SxProps<Theme>;
  children?: React.ReactNode;
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>((props, ref) => {
  const { children, ...other } = props;

  return (
    <TabsRoot ref={ref} {...other}>
      {children}
    </TabsRoot>
  );
});

export default Tabs;
