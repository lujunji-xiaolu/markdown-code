import {
  BaseEditor,
  Editor,
  Element,
  Point,
  Range,
  Text,
  Transforms,
} from "slate";
import { ReactEditor } from "slate-react";
import { createParagraphElement } from "./common/element";

export default function withMarkdown(editor: BaseEditor & ReactEditor) {
  const { isVoid, deleteBackward, insertText } = editor;

  editor.isVoid = (element) =>
    element.type === "thematicBreak" ||
    element.type === "html" ||
    element.type === "code" ||
    isVoid(element);

  editor.deleteBackward = (unit) => {
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const match = Editor.above(editor, {
        match: (n) =>
          Element.isElement(n) &&
          (n.type === "heading" ||
            n.type === "blockquote" ||
            n.type === "list"),
      });

      if (match) {
        const [node, path] = match;
        const start = Editor.start(editor, path);
        if (Point.equals(selection.anchor, start)) {
          if ((node as Element).type === "heading") {
            Transforms.setNodes(
              editor,
              { type: "paragraph" },
              {
                at: path,
              }
            );
          } else if ((node as Element).type === "blockquote") {
            Transforms.removeNodes(editor, {
              at: path,
            });
            Transforms.insertNodes(editor, createParagraphElement());
          } else if ((node as Element).type === "list") {
            const match = Editor.above(editor, {
              match: (n) => Element.isElement(n) && n.type === "list",
              at: path,
            });
            Transforms.removeNodes(editor, {
              at: path,
            });
            if (!match) {
              Transforms.insertNodes(editor, createParagraphElement());
            }
          }
          return;
        }
      }
    }

    deleteBackward(unit);
  };

  editor.insertText = (text) => {
    const [nodeEntry] = Editor.nodes(editor, {
      match: (n) =>
        Text.isText(n) &&
        (n.type === "emphasis" ||
          n.type === "strong" ||
          n.type === "inlineCode"),
      mode: "lowest",
    });
    if (nodeEntry && editor.selection) {
      const [, path] = nodeEntry;
      const start = Editor.start(editor, path);
      const end = Editor.end(editor, path);
      if (
        Point.equals(editor.selection.anchor, start) ||
        Point.equals(editor.selection.anchor, end)
      ) {
        Transforms.insertNodes(editor, { type: "text", text });
        return;
      }
    }

    insertText(text);
  };

  return editor;
}
