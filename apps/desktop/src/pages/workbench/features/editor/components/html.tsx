import Paper from "@mui/material/Paper";
import { rootDirState } from "@/pages/workbench/atoms/explorer";
import "@/pages/workbench/components/style-isolation";
import { styled } from "@mui/material/styles";
import { sep } from "@tauri-apps/api/path";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import DOMPurify from "dompurify";
import parse, { attributesToProps, Element } from "html-react-parser";
import * as React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ReactEditor, RenderElementProps, useSlateStatic } from "slate-react";
import { contextMenuState } from "../atoms";
import CodeMirror from "../common/code-mirror";
import { HTML as IHTML } from "../editor";

const HTMLStyle = styled("div")({
  "& img": {
    verticalAlign: "middle",
  },
});

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
  overflow: "hidden",
});

export default function HTML(props: RenderElementProps) {
  const { element } = props;
  const { value, preview } = element as IHTML;

  const editor = useSlateStatic();

  const rootDir = useRecoilValue(rootDirState);
  const setContextMenu = useSetRecoilState(contextMenuState);
  const handleContextMenu: React.MouseEventHandler<HTMLDivElement> = (
    event
  ) => {
    event.preventDefault();
    setContextMenu({
      anchorPoint: { x: event.clientX, y: event.clientY },
      path: ReactEditor.findPath(editor, element),
    });
  };

  return (
    <HTMLRoot
      {...props.attributes}
      contentEditable={false}
      onContextMenu={handleContextMenu}
    >
      {preview && (
        <style-isolation>
          <HTMLStyle>
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
          </HTMLStyle>
        </style-isolation>
      )}
      <Paper sx={{ display: preview ? "none" : "block" }}>
        <CodeMirror
          element={element as IHTML}
          value={value}
          lang="html"
        ></CodeMirror>
      </Paper>
      {props.children}
    </HTMLRoot>
  );
}
