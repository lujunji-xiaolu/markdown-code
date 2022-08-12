import { anchorPointState } from "@/atoms";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { useSetRecoilState } from "recoil";
import { BaseEditor, Descendant } from "slate";
import { Editable, ReactEditor, Slate } from "slate-react";
import ContextMenu from "./features/context-menu";
import handleOnKeyDown from "./handle-on-key-down";
import HoveringToolbar from "./features/hovering-toolbar";
import renderElement from "./render/render-element";
import renderLeaf from "./render/render-leaf";
import {
  Blockquote,
  Code,
  Emphasis,
  Heading,
  HTML as HTMLBase,
  InlineCode,
  Link,
  List,
  Paragraph,
  Strong,
  ThematicBreak,
} from "./spec/common-mark";
import { ListItemGfm } from "./spec/github-flavored-markdown";

export interface HTML extends HTMLBase {
  preview: boolean;
}

export interface PlainText extends Text {
  type: "text";
}

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element:
      | Paragraph
      | Heading
      | ThematicBreak
      | Blockquote
      | List<ListItemGfm>
      | ListItemGfm
      | HTML
      | Code
      | Link;
    Text: PlainText | Emphasis | Strong | InlineCode;
  }
}

const StyledEditable = styled(Editable)({
  width: "100%",
  padding: 30,
});

interface MarkdownEditorProps {
  editor: BaseEditor & ReactEditor;
  value: Descendant[];
}

export default function MarkdownEditor(props: MarkdownEditorProps) {
  const { editor, value } = props;

  const setAnchorPoint = useSetRecoilState(anchorPointState);

  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> =
    React.useCallback((ev) => {
      handleOnKeyDown(ev, editor, setAnchorPoint);
    }, []);

  return (
    <Slate editor={editor} value={value}>
      <HoveringToolbar />
      <ContextMenu />
      <StyledEditable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={onKeyDown}
      />
    </Slate>
  );
}
