import isHotkey from "is-hotkey";
import isBoolean from "lodash/isBoolean";
import { SetterOrUpdater } from "recoil";
import { BaseEditor, Editor, Element, Node, Path, Transforms } from "slate";
import { ReactEditor } from "slate-react";
import { createParagraphElement } from "./common/element";
import * as rules from "./rules";
import { HTML, List, ListItem } from "./spec/common-mark";
import { ListItemGfm } from "./spec/github-flavored-markdown";

const isEnter = isHotkey("enter");
const isSpace = isHotkey("space");
const isTab = isHotkey("tab");
const isShiftTab = isHotkey("shift+tab");

export default function handleOnKeyDown(
  ev: React.KeyboardEvent<HTMLDivElement>,
  editor: BaseEditor & ReactEditor,
  setAnchorPoint: SetterOrUpdater<{
    x: number;
    y: number;
  } | null>
) {
  if (isSpace(ev)) {
    const nodeEntry = Editor.above(editor, {
      match: (n) => Element.isElement(n) && n.type === "paragraph",
    });
    if (nodeEntry) {
      const [node, path] = nodeEntry;
      const line = Node.string(node);

      if (rules.heading.test(line)) {
        const [, hash] = rules.heading.exec(line)!;
        const depth = hash.length as 1 | 2 | 3 | 4 | 5 | 6;
        editor.deleteBackward("word");
        Transforms.setNodes(
          editor,
          { type: "heading", depth },
          {
            at: path,
          }
        );
        ev.preventDefault();
      } else if (rules.thematicBreak.test(line)) {
        editor.deleteBackward("word");
        Transforms.insertNodes(
          editor,
          {
            type: "thematicBreak",
            children: [{ text: "" }],
          },
          {
            at: path,
          }
        );
        ev.preventDefault();
      } else if (rules.blockquote.test(line)) {
        editor.deleteBackward("word");
        Transforms.setNodes(editor, { type: "blockquote" });
        Transforms.insertNodes(editor, createParagraphElement(), {
          at: path.concat(0),
        });
        ev.preventDefault();
      } else if (rules.list.test(line)) {
        const [, start] = rules.list.exec(line)!;
        Transforms.removeNodes(editor, {
          at: path,
        });
        Transforms.insertNodes(editor, {
          type: "list",
          ordered: start !== undefined,
          start: window.parseInt(start, 10),
          spread: false,
          children: [{ type: "listItem", children: [createParagraphElement()] }],
        });
        ev.preventDefault();
      } else if (rules.listGfm.test(line)) {
        const [, label] = rules.listGfm.exec(line)!;
        const checked = label === "x";
        Transforms.setNodes(
          editor,
          { checked },
          {
            match: (n) => Element.isElement(n) && n.type === "listItem",
          }
        );
        editor.deleteBackward("word");
        ev.preventDefault();
      }
    }
  } else if (isEnter(ev)) {
    const nodeEntry = Editor.above<ListItemGfm>(editor, {
      match: (n) => Element.isElement(n) && n.type === "listItem",
    });
    if (nodeEntry) {
      const [node, path] = nodeEntry;
      Transforms.insertNodes(
        editor,
        {
          type: "listItem",
          checked: isBoolean(node.checked) ? false : undefined,
          children: [createParagraphElement()],
        },
        {
          at: Path.next(path),
        }
      );
      const start = Editor.start(editor, Path.next(path));
      Transforms.setSelection(editor, {
        anchor: start,
        focus: start,
      });
      ev.preventDefault();
      return;
    }

    const HTMLEntry = Editor.above<HTML>(editor, {
      match: (n) => Element.isElement(n) && n.type === "html",
    });
    if (HTMLEntry) {
      Transforms.insertText(editor, "\n");
      ev.preventDefault();
      return;
    }

    Transforms.insertNodes(editor, createParagraphElement());
    ev.preventDefault();
  } else if (isTab(ev)) {
    const nodeEntry = Editor.above<ListItem>(editor, {
      match: (n) => Element.isElement(n) && n.type === "listItem",
    });
    if (nodeEntry) {
      const [node, path] = nodeEntry;
      const list = Node.get(editor, Path.parent(path)) as List<ListItem>;
      const index = path.at(-1)!;
      if (index !== 0 && list.children.length === index + 1) {
        Transforms.removeNodes(editor, {
          at: path,
        });
        Transforms.insertNodes(
          editor,
          {
            type: "list",
            ordered: list.ordered,
            start: null,
            spread: false,
            children: [node],
          },
          {
            at: path,
          }
        );
        const end = Editor.end(editor, path);
        Transforms.setSelection(editor, {
          anchor: end,
          focus: end,
        });
        ev.preventDefault();
      }
    }
  } else if (isShiftTab(ev)) {
    const nodeEntry = Editor.above<ListItem>(editor, {
      match: (n) => Element.isElement(n) && n.type === "listItem",
    });
    if (nodeEntry) {
      const [node, path] = nodeEntry;
      const listPath = Path.parent(path);
      const list = Node.get(editor, listPath) as List<ListItem>;
      const index = path.at(-1)!;
      if (list.children.length === index + 1) {
        if (listPath.length === 1) {
          Transforms.removeNodes(editor, {
            at: path,
          });
          Transforms.insertNodes(editor, node.children, {
            at: Path.next(listPath),
          });
          const end = Editor.end(editor, Path.next(listPath));
          Transforms.setSelection(editor, { anchor: end, focus: end });
        } else {
          Transforms.liftNodes(editor, {
            at: path,
          });
        }
        ev.preventDefault();
      }
    }
  } else if (ev.key === "/") {
    const nodeEntry = Editor.above(editor, {
      match: (n) => Element.isElement(n) && n.type === "paragraph",
    });
    if (nodeEntry) {
      const [node] = nodeEntry;
      const line = Node.string(node);
      if (line.length === 0) {
        const domNode = ReactEditor.toDOMNode(editor, node);
        const { x, y } = domNode.getBoundingClientRect();
        setAnchorPoint({ x, y });
      }
    }
  }
}
