import { styled } from "@mui/material/styles";
import { DefaultLeaf, RenderLeafProps } from "slate-react";
import InlineCode from "./components/inline-code";

const HeadingMeta = styled("span")(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.tertiary,
  fontStyle: "italic",
}));

export default function renderLeaf(props: RenderLeafProps) {
  const { leaf, attributes, children } = props;

  switch (leaf.type) {
    case "emphasis":
      return <em {...attributes}>{children}</em>;
    case "strong":
      return <strong {...attributes}>{children}</strong>;
    case "inlineCode":
      return <InlineCode {...attributes}>{children}</InlineCode>;
    case "delete":
      return <s {...attributes}>{children}</s>;
    case "headingMeta":
      return <HeadingMeta {...attributes}>{children}</HeadingMeta>;
    default:
      return <DefaultLeaf {...props} />;
  }
}
