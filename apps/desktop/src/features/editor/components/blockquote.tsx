import { styled } from "@mui/material/styles";
import { RenderElementProps } from "slate-react";

const BlockquoteRoot = styled("blockquote")({
  borderLeft: " 2px solid #ddd",
  padding: "10px 20px 10px 16px",
  margin: "8px 0px",
  color: "#aaa",
});

export default function Blockquote(props: RenderElementProps) {
  const { attributes, children } = props;
  return <BlockquoteRoot {...attributes}>{children}</BlockquoteRoot>;
}
