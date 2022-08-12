import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { styled } from "@mui/material/styles";
import isHotkey from "is-hotkey";
import { useEffect, useMemo, useRef } from "react";
import { Editor, Node, Path, Transforms } from "slate";
import { ReactEditor, useSlateStatic } from "slate-react";
import { HTML } from "../../editor";
import { Code } from "../../spec/common-mark";
import { createParagraphElement } from "../element";
import basicSetup from "./basic-setup";
import language from "./language";

const isModEnter = isHotkey("mod+enter");

const stopPropagation = EditorView.domEventHandlers({
  beforeinput: (event) => {
    event.stopPropagation();
    return false;
  },
  keydown: (event) => {
    event.stopPropagation();
    return false;
  },
});

const CodeMirrorRoot = styled("div")(({ theme }) => ({
  "& .cm-editor": {
    maxHeight: 327,
    "&.cm-focused": {
      outline: "none",
    },
    "& .cm-scroller": {
      fontFamily: "Roboto Mono,Menlo,Consolas,monospace",
      "& .cm-gutters": {
        ...(theme.palette.mode === "light" && {
          backgroundColor: "rgba(246, 246, 246, 0.9)",
        }),
        ...(theme.palette.mode === "dark" && {
          backgroundColor: "rgba(0, 0, 0, 0.65)",
        }),
        border: "none",
        "& .cm-gutter": {
          "& .cm-gutterElement": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            "& .marker-open,.marker-close": {
              fontFamily: "Segoe Fluent Icons",
              fontStyle: "normal",
              fontWeight: 400,
              fontSize: 12,
              lineHeight: "12px",
            },
            "& .marker-open": {
              "&:before": {
                content: '"\\e972"',
              },
            },
            "& .marker-close": {
              "&:before": {
                content: '"\\e974"',
              },
            },
          },
        },
      },
    },
  },
}));

interface CodeMirrorProps extends React.HTMLAttributes<HTMLDivElement> {
  lang: string;
  value: string;
  element: HTML | Code;
}

export default function CodeMirror(props: CodeMirrorProps) {
  const { lang, value, element, ...other } = props;

  const editor = useSlateStatic();

  const elementRef = useRef<HTML | Code>(null);
  // @ts-ignore
  elementRef.current = element;

  const jumpOut = useMemo(() => {
    return EditorView.domEventHandlers({
      keydown: (event) => {
        if (isModEnter(event) && elementRef.current) {
          const path = ReactEditor.findPath(editor, elementRef.current);
          const nextPath = Path.next(path);
          if (
            !Node.has(editor, nextPath) ||
            (Node.has(editor, nextPath) &&
              Editor.isVoid(editor, Node.get(editor, nextPath)))
          ) {
            Transforms.insertNodes(editor, createParagraphElement(), {
              at: nextPath,
            });
          }
          const end = Editor.end(editor, nextPath);
          Transforms.setSelection(editor, { anchor: end, focus: end });
          ReactEditor.focus(editor);
          return true;
        }
      },
    });
  }, []);

  const updateListener = useMemo(() => {
    return EditorView.updateListener.of((update) => {
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
  }, []);

  const view = useMemo(() => {
    return new EditorView({
      state: EditorState.create({
        doc: value,
        extensions: [
          stopPropagation,
          jumpOut,
          updateListener,
          basicSetup,
          language(lang)(),
        ],
      }),
    });
  }, [lang]);

  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = rootRef.current!;
    root.appendChild(view.dom);
    return () => {
      root.removeChild(view.dom);
    };
  }, [view]);

  return <CodeMirrorRoot ref={rootRef} {...other}></CodeMirrorRoot>;
}
