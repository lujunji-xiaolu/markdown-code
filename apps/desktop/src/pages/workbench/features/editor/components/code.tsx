import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent } from "@mui/material/Select";
import { Transforms } from "slate";
import { ReactEditor, RenderElementProps, useSlateStatic } from "slate-react";
import CodeMirror from "../common/code-mirror";
import { Code as ICode } from "../spec/common-mark";

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

  return (
    <Paper {...props.attributes} contentEditable={false}>
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
      <CodeMirror
        element={element as ICode}
        value={value}
        lang={lang ?? "javascript"}
      ></CodeMirror>
      {props.children}
    </Paper>
  );
}
