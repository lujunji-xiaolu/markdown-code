import * as React from "react";
import { styled, SxProps, Theme } from "@mui/material/styles";

const icons = {
  ChevronDownMed: '"\\e972"',
  ChevronRightMed: '"\\e974"',
  Search: '"\\e721"',
  More: '"\\e712"',
  Clear: '"\\e894"',
  AcceptMedium: '"\\f78c"',
};

const SegoeFluentIconRoot = styled("span", {
  name: "SegoeFluentIcon",
  slot: "Root",
})<{ ownerState: { content: string } }>(({ ownerState }) => ({
  fontFamily: "Segoe Fluent Icons",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: 12,
  lineHeight: "12px",
  "&:before": {
    content: ownerState.content,
  },
}));

interface SegoeFluentIconProps {
  name: keyof typeof icons;
  className?: string;
  sx?: SxProps<Theme>;
}

const SegoeFluentIcon = React.forwardRef<HTMLSpanElement, SegoeFluentIconProps>((props, ref) => {
  const { name, ...other } = props;

  const content = icons[name] ?? "";

  return <SegoeFluentIconRoot ownerState={{ content }} ref={ref} {...other} />;
});

export default SegoeFluentIcon;
