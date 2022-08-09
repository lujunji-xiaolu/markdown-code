import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import { Root, Content, Text } from "mdast";
import { Descendant } from "slate";

function transform(node: Content): unknown {
  switch (node.type) {
    case "paragraph":
      return {
        type: "paragraph",
        children: node.children.map((child) => transform(child)),
      };
    case "heading":
      return {
        type: "heading",
        depth: node.depth,
        children: node.children.map((child) => transform(child)),
      };
    case "thematicBreak":
      return {
        type: "thematicBreak",
        children: [{ text: "" }],
      };
    case "blockquote":
      return {
        type: "blockquote",
        children: node.children.map((child) => transform(child)),
      };
    case "list":
      return {
        type: "list",
        ordered: node.ordered,
        start: node.start,
        spread: node.spread,
        children: node.children.map((child) => transform(child)),
      };
    case "listItem":
      return {
        type: "listItem",
        checked: node.checked ?? undefined,
        spread: node.spread,
        children: node.children.map((child) => transform(child)),
      };
    case "html":
      return {
        type: "html",
        value: node.value,
        children: [{ text: "" }],
      };
    case "code":
      return {
        type: "code",
        lang: node.lang,
        meta: node.meta,
        value: node.value,
        children: [
          {
            text: "",
          },
        ],
      };
    case "emphasis":
      return { type: "emphasis", text: (node.children[0] as Text).value };
    case "strong":
      return { type: "strong", text: (node.children[0] as Text).value };
    case "inlineCode":
      return { type: "inlineCode", text: node.value };
    case "link":
      return {
        type: "link",
        url: node.url,
        title: node.title,
        children: node.children.map((child) => transform(child)),
      };
    case "text":
      return { type: "text", text: node.value };
    case "delete":
      return { type: "delete", text: (node.children[0] as Text).value };
    case "image":
      return {
        type: "image",
        title: node.title,
        url: node.url,
        alt: node.alt,
        children: [{ text: "" }],
      };
    case "table":
      return {
        type: "table",
        align: node.align,
        children: node.children.map((child) => transform(child)),
      };
    case "tableRow":
      return { type: "tableRow", children: node.children.map((child) => transform(child)) };
    case "tableCell":
      return { type: "tableCell", children: node.children.map((child) => transform(child)) };
    default:
      console.log(node);
      break;
  }
  return node;
}

export function deserialize(markdown: string) {
  const tree = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(function () {
      this.Compiler = function (root: Root) {
        return root.children.map((child) => transform(child));
      };
    })
    .processSync(markdown);
  return tree.result as Descendant[];
}
