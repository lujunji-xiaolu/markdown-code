import { DefaultLeaf, RenderLeafProps } from "slate-react";
import InlineCode from "../components/inline-code";

export default function renderLeaf(props: RenderLeafProps) {
  const { leaf, attributes, children } = props;

  switch (leaf.type) {
    case "emphasis":
      return <em {...attributes}>{children}</em>;
    case "strong":
      return <strong {...attributes}>{children}</strong>;
    case "inlineCode":
      return <InlineCode {...attributes}>{children}</InlineCode>;
    default:
      return <DefaultLeaf {...props} />;
  }
}
