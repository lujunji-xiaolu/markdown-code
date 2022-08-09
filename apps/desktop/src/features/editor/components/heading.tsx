import Typography from "@mui/material/Typography";
import { RenderElementProps } from "slate-react";
import { Heading as IHeading } from "../spec/common-mark";

const Heading = (props: RenderElementProps) => {
  const component = `h${(props.element as IHeading).depth}` as
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6";
  return (
    <Typography component={component} variant={component} {...props.attributes}>
      {props.children}
    </Typography>
  );
};

export default Heading;
