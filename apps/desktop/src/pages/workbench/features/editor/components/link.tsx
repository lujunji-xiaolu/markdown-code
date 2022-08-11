import InternalLink from "@/components/link";
import { RenderElementProps } from "slate-react";
import { Link as ILink } from "../spec/common-mark";

export default function Link(props: RenderElementProps) {
  const { element, attributes, children } = props;
  const { url, title } = element as ILink;

  console.log(url, title);

  return (
    <InternalLink title={title} href={url} {...attributes}>
      {children}
    </InternalLink>
  );
}
