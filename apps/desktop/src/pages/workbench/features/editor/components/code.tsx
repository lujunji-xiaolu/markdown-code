import Card from "@/components/card";
import Select from "@/components/select";
import {
  autocompletion,
  closeBrackets,
  closeBracketsKeymap,
  completionKeymap,
} from "@codemirror/autocomplete";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { cpp } from "@codemirror/lang-cpp";
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { java } from "@codemirror/lang-java";
import { javascript } from "@codemirror/lang-javascript";
import { json } from "@codemirror/lang-json";
import { markdown } from "@codemirror/lang-markdown";
import { php } from "@codemirror/lang-php";
import { python } from "@codemirror/lang-python";
import { rust } from "@codemirror/lang-rust";
import { xml } from "@codemirror/lang-xml";
import {
  bracketMatching,
  defaultHighlightStyle,
  foldGutter,
  foldKeymap,
  indentOnInput,
  syntaxHighlighting,
} from "@codemirror/language";
import { lintKeymap } from "@codemirror/lint";
import { highlightSelectionMatches, searchKeymap } from "@codemirror/search";
import { EditorState } from "@codemirror/state";
import {
  crosshairCursor,
  drawSelection,
  dropCursor,
  EditorView,
  highlightActiveLine,
  highlightActiveLineGutter,
  highlightSpecialChars,
  keymap,
  lineNumbers,
  rectangularSelection,
} from "@codemirror/view";
import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent } from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import isHotkey from "is-hotkey";
import * as React from "react";
import { Editor, Node, Path, Transforms } from "slate";
import { ReactEditor, RenderElementProps, useSlateStatic } from "slate-react";
import { createParagraphElement } from "../common/element";
import { Code as ICode } from "../spec/common-mark";

const isModEnter = isHotkey("mod+enter");

export const basicSetup = (() => [
  lineNumbers(),
  highlightActiveLineGutter(),
  highlightSpecialChars(),
  history(),
  foldGutter({
    markerDOM: (open) => {
      const icon = document.createElement("span");
      icon.className = `marker-${open ? "open" : "close"}`;
      return icon;
    },
  }),
  drawSelection(),
  dropCursor(),
  EditorState.allowMultipleSelections.of(true),
  indentOnInput(),
  syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
  bracketMatching(),
  closeBrackets(),
  autocompletion(),
  rectangularSelection(),
  crosshairCursor(),
  highlightActiveLine(),
  highlightSelectionMatches(),
  keymap.of([
    ...closeBracketsKeymap,
    ...defaultKeymap,
    ...searchKeymap,
    ...historyKeymap,
    ...foldKeymap,
    ...completionKeymap,
    ...lintKeymap,
  ]),
])();

export const CODE_BLOCK_LANGUAGES = {
  css: "CSS",
  cpp: "C++",
  html: "HTML",
  java: "Java",
  javascript: "JavaScript",
  json: "JSON",
  markdown: "Markdown",
  php: "PHP",
  python: "Python",
  rust: "Rust",
  xml: "XML",
};

const getLanguage = (lang: string) => {
  switch (lang) {
    case "css":
      return css;
    case "cpp":
      return cpp;
    case "html":
      return html;
    case "java":
      return java;
    case "javascript":
      return javascript;
    case "json":
      return json;
    case "markdown":
      return markdown;
    case "php":
      return php;
    case "python":
      return python;
    case "rust":
      return rust;
    case "xml":
      return xml;
    default:
      return javascript;
  }
};

const CodeMirrorParent = styled("div")(({ theme }) => ({
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

export default function Code(props: RenderElementProps) {
  const { element } = props;
  const { lang, value } = element as ICode;

  const editor = useSlateStatic();

  const handleChangeLanguage = (ev: SelectChangeEvent<unknown>) => {
    const selectedLanguage = ev.target.value;
    const path = ReactEditor.findPath(editor, element);
    if (path) {
      Transforms.setNodes(
        editor,
        { lang: selectedLanguage as string },
        {
          at: path,
        }
      );
    }
  };

  const elementRef = React.useRef<ICode>(null);
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
        extensions: [
          EditorView.domEventHandlers({
            beforeinput: (event) => {
              event.stopPropagation();
              return false;
            },
            keydown: (event) => {
              event.stopPropagation();
              if (isModEnter(event) && elementRef.current) {
                const path = ReactEditor.findPath(editor, elementRef.current);
                const nextPath = Path.next(path);
                if (!Node.has(editor, nextPath)) {
                  Transforms.insertNodes(editor, createParagraphElement(), {
                    at: nextPath,
                  });
                }
                const end = Editor.end(editor, nextPath);
                Transforms.setSelection(editor, { anchor: end, focus: end });
                ReactEditor.focus(editor);
                return true;
              }
              return false;
            },
          }),
          basicSetup,
          getLanguage(lang ?? "")(),
          updateListener,
        ],
      }),
    });
  }, [lang]);

  const parentRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const parent = parentRef.current!;
    parent.appendChild(view.dom);
    return () => {
      parent.removeChild(view.dom);
    };
  }, [parentRef.current, view]);

  return (
    <Card variant="onThinAcrylic" {...props.attributes} contentEditable={false}>
      <Select
        contentEditable={false}
        value={lang ?? ""}
        sx={{
          paddingLeft: "8px",
          backgroundColor: "transparent",
          border: "none",
        }}
        onChange={handleChangeLanguage}
      >
        {Object.entries(CODE_BLOCK_LANGUAGES).map(([key, value]) => (
          <MenuItem key={key} value={key}>
            {value}
          </MenuItem>
        ))}
      </Select>
      <CodeMirrorParent ref={parentRef}></CodeMirrorParent>
      {props.children}
    </Card>
  );
}
