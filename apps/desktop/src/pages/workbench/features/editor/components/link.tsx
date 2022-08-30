import MuiLink from "@mui/material/Link";
import { RenderElementProps } from "slate-react";
import { Link as ILink } from "../spec/common-mark";

export default function Link(props: RenderElementProps) {
  const { element, attributes, children } = props;
  const { url, title } = element as ILink;

  return (
    <MuiLink title={title} href={url} {...attributes}>
      {children}
    </MuiLink>
  );
}
