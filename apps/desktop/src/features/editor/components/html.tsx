import { html } from "@codemirror/lang-html";
import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import CodeIcon from "@mui/icons-material/Code";
import PreviewIcon from "@mui/icons-material/Preview";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import DOMPurify from "dompurify";
import * as React from "react";
import { Transforms } from "slate";
import { ReactEditor, RenderElementProps, useSlateStatic } from "slate-react";
import { HTML as IHTML } from "../spec/common-mark";
import { basicSetup } from "./code";

const CodeMirrorParent = styled("div")({
  "& .cm-editor": {
    maxHeight: 327,
  },
});

export default function HTML(props: RenderElementProps) {
  const { element } = props;
  const { value } = element as IHTML;

  const [preview, setPreview] = React.useState(true);

  const handleViewChange = () => {
    setPreview(!preview);
  };

  const editor = useSlateStatic();

  const elementRef = React.useRef<IHTML>(null);
  // @ts-ignore
  elementRef.current = element;

  const view = React.useMemo(() => {
    const updateListener = EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        const value = update.state.doc.toString();
        if (elementRef.current) {
          const path = ReactEditor.findPath(editor, elementRef.current);
          Transforms.setNodes(
            editor,
            { value },
            {
              at: path,
            }
          );
        }
      }
    });
    return new EditorView({
      state: EditorState.create({
        doc: value,
        // extensions: [keymap.of(defaultKeymap)],
        extensions: [basicSetup, html(), updateListener],
      }),
    });
  }, []);

  const parentRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const parent = parentRef.current!;

    parent.appendChild(view.dom);

    const stopPropagation = (e: Event) => e.stopPropagation();
    parent.addEventListener("beforeinput", stopPropagation);
    parent.addEventListener("keydown", stopPropagation);

    return () => {
      parent.removeChild(view.dom);
      parent.removeEventListener("beforeinput", stopPropagation);
      parent.removeEventListener("keydown", stopPropagation);
    };
  }, [parentRef.current]);

  return (
    <div {...props.attributes} contentEditable={false}>
      <IconButton contentEditable={false} onClick={handleViewChange}>
        {preview ? <CodeIcon /> : <PreviewIcon />}
      </IconButton>
      {/* @ts-ignore */}
      <style-isolation>
        <div dangerouslySetInnerHTML={{ __html: preview ? DOMPurify.sanitize(value) : "" }}></div>
        {/* @ts-ignore */}
      </style-isolation>
      <CodeMirrorParent
        ref={parentRef}
        style={{ display: preview ? "none" : "block" }}
      ></CodeMirrorParent>
      {props.children}
    </div>
  );
}
