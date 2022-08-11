import { rootDirState } from "@/pages/workbench/atoms/explorer";
import { html } from "@codemirror/lang-html";
import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import CodeIcon from "@mui/icons-material/Code";
import PreviewIcon from "@mui/icons-material/Preview";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { sep } from "@tauri-apps/api/path";
import DOMPurify from "dompurify";
import parse, { attributesToProps, Element } from "html-react-parser";
import * as React from "react";
import { useRecoilValue } from "recoil";
import { Transforms } from "slate";
import { ReactEditor, RenderElementProps, useSlateStatic } from "slate-react";
import { HTML as IHTML } from "../spec/common-mark";
import { basicSetup } from "./code";
import { convertFileSrc } from "@tauri-apps/api/tauri";

function getImageSrc(src: string, rootDirPath?: string) {
  const EXT_REG = /\.(jpeg|jpg|png|gif|svg|webp)(?=\?|$)/i;
  // http[s] (domain or IPv4 or localhost or IPv6) [port] /not-white-space
  const URL_REG =
    /^http(s)?:\/\/([a-z0-9\-._~]+\.[a-z]{2,}|[0-9.]+|localhost|\[[a-f0-9.:]+\])(:[0-9]{1,5})?\/[\S]+/i;
  const DATA_URL_REG =
    /^data:image\/[\w+-]+(;[\w-]+=[\w-]+|;base64)*,[a-zA-Z0-9+/]+={0,2}$/;
  const imageExtension = EXT_REG.test(src);
  const isUrl = URL_REG.test(src);

  if (imageExtension) {
    if (isUrl) {
      return src;
    }
    if (rootDirPath) {
      return convertFileSrc(rootDirPath.concat(sep, src));
    }
  }

  if (isUrl && !imageExtension) {
    return src;
  }

  const isDataUrl = DATA_URL_REG.test(src);
  if (isDataUrl) {
    return src;
  }

  return "";
}

const HTMLRoot = styled("div")({
  position: "relative",
  overflow: "hidden",
  "& .preview-toggle-button": {
    position: "absolute",
    top: 0,
    right: 0,
    display: "none",
    zIndex: 1,
  },
  "&:hover": {
    "& .preview-toggle-button": {
      display: "block",
    },
  },
});

const CodeMirrorParent = styled("div")({
  "& .cm-editor": {
    maxHeight: 327,
  },
});

export default function HTML(props: RenderElementProps) {
  const { element } = props;
  const { value } = element as IHTML;

  const rootDir = useRecoilValue(rootDirState);

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
    <HTMLRoot {...props.attributes} contentEditable={false}>
      <IconButton
        className="preview-toggle-button"
        contentEditable={false}
        onClick={handleViewChange}
      >
        {preview ? <CodeIcon /> : <PreviewIcon />}
      </IconButton>
      {preview && (
        <style-isolation>
          <div>
            {parse(DOMPurify.sanitize(value), {
              replace: (domNode) => {
                if (
                  domNode instanceof Element &&
                  domNode.tagName === "img" &&
                  domNode.attribs
                ) {
                  const { src, ...other } = attributesToProps(domNode.attribs);
                  return (
                    <img src={getImageSrc(src, rootDir?.path)} {...other} />
                  );
                }
              },
            })}
          </div>
        </style-isolation>
      )}
      <CodeMirrorParent
        ref={parentRef}
        style={{ display: preview ? "none" : "block" }}
      ></CodeMirrorParent>
      {props.children}
    </HTMLRoot>
  );
}
