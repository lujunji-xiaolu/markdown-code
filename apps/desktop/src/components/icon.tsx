import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";
import * as React from "react";

export interface IconProps extends SvgIconProps {
  prefix?: string;
  name: string;
}

const Icon = React.forwardRef<SVGSVGElement, IconProps>(function (props, ref) {
  const { prefix = "icon", name, ...other } = props;

  return (
    <SvgIcon ref={ref} {...other}>
      <use href={`#${prefix}-${name}`} />
    </SvgIcon>
  );
});

export default Icon;
