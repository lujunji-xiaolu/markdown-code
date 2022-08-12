import Typography from "@mui/material/Typography";
import { DefaultElement, RenderElementProps } from "slate-react";
import Blockquote from "../components/blockquote";
import Code from "../components/code";
import Heading from "../components/heading";
import HTML from "../components/html";
import Link from "../components/link";
import List from "../components/list";
import ListItem from "../components/list-item";
import ThematicBreak from "../components/thematic-break";

const Paragraph = (props: RenderElementProps) => (
  <Typography component="p" {...props.attributes}>
    {props.children}
  </Typography>
);

const Table = (props: RenderElementProps) => (
  <table {...props.attributes}>
    <tbody>{props.children}</tbody>
  </table>
);

const TableRow = (props: RenderElementProps) => (
  <tr {...props.attributes}>{props.children}</tr>
);

const TableData = (props: RenderElementProps) => (
  <td {...props.attributes}>{props.children}</td>
);

export default function renderElement(props: RenderElementProps) {
  switch (props.element.type) {
    case "paragraph":
      return <Paragraph {...props} />;
    case "heading":
      return <Heading {...props} />;
    case "thematicBreak":
      return <ThematicBreak {...props} />;
    case "blockquote":
      return <Blockquote {...props} />;
    case "list":
      return <List {...props} />;
    case "listItem":
      return <ListItem {...props} />;
    case "html":
      return <HTML {...props} />;
    case "code":
      return <Code {...props} />;
    case "link":
      return <Link {...props} />;
    default:
      return <DefaultElement {...props} />;
  }
}
